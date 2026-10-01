#!/usr/bin/env node
/**
 * Code inventory for a single-file HTML game (front-office conventions).
 * Usage: node inventory.js path/to/game.html
 *
 * Prints the counts that BECOME the test plan, and flags:
 *   - functions declared but never referenced anywhere else
 *   - ACTIONS keys with no data-act reference in the markup/strings
 *   - data-act references with no ACTIONS key        (BROKEN: tapping throws)
 *   - VIEWS keys whose function does not exist
 *   - ECON/constants keys never read
 *
 * Recognises every object-literal shape the house method uses for ACTIONS/VIEWS/ECON:
 *   const ACTIONS={advanceDays,switchTab};            // shorthand properties (the house default)
 *   const ACTIONS={ advanceDays: function(n){...} };  // key: function
 *   const ACTIONS={ advanceDays(n){...} };            // method shorthand
 *   const ACTIONS={ advanceDays: (n)=>{...} };        // arrow
 *   const ACTIONS={ advanceDays: advanceDaysImpl };   // reference
 * Blocks are found by brace matching, so one-line and multi-line literals both work.
 *
 * Heuristic by design: it parses a single-file game, not arbitrary JS. Treat output as a
 * checklist to verify, not a verdict. Exit 1 only when it cannot read the file.
 */
const fs = require('fs');
const path = process.argv[2];
if (!path) { console.error('usage: node inventory.js <game.html>'); process.exit(1); }

const html = fs.readFileSync(path, 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
if (!scripts.length) { console.error('no <script> block found'); process.exit(1); }
const js = scripts.join('\n');

// ---- helpers -------------------------------------------------------------------------
function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:\\'"`])\/\/[^\n]*/g, '$1');
}
// Return the text inside the balanced {...} that starts at openIdx (which must be '{').
function braceBlock(s, openIdx) {
  let depth = 0, i = openIdx, q = null;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return s.slice(openIdx + 1, i); }
  }
  return null;
}
// Split an object-literal body on top-level commas, returning the leading identifier of each entry.
function literalKeys(body) {
  const keys = []; let depth = 0, start = 0, q = null;
  const push = (seg) => {
    const m = seg.trim().match(/^(?:async\s+)?(?:get\s+|set\s+)?['"]?([A-Za-z_$][\w$]*)['"]?\s*(?:[:(,]|$)/);
    if (m) keys.push(m[1]);
  };
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{' || c === '(' || c === '[') depth++;
    else if (c === '}' || c === ')' || c === ']') depth--;
    else if (c === ',' && depth === 0) { push(body.slice(start, i)); start = i + 1; }
  }
  push(body.slice(start));
  return [...new Set(keys)];
}
// Find `const|let|var|window. NAME = {` for the first NAME in candidates; return its keys.
function findLiteral(src, candidates) {
  for (const name of candidates) {
    const re = new RegExp('(?:(?:var|const|let)\\s+|window\\.)' + name + '\\s*=\\s*\\{');
    const m = src.match(re);
    if (!m) continue;
    const open = src.indexOf('{', m.index + m[0].length - 1);
    const body = braceBlock(src, open);
    if (body == null) continue;
    const keys = literalKeys(body);
    if (keys.length) return { name, keys, body };
  }
  return null;
}
const count = (src, re) => (src.match(re) || []).length;

// ---- inventory ------------------------------------------------------------------------
const clean = stripComments(js);
const fns = [...new Set([...clean.matchAll(/^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm)].map(x => x[1]))];

const actionsLit = findLiteral(clean, ['ACTIONS', 'ACTS', 'HANDLERS', 'ACTION_MAP', 'actions']);
const actions = actionsLit ? actionsLit.keys : [];
const viewsLit = findLiteral(clean, ['VIEWS', 'views']);
const views = viewsLit ? viewsLit.keys : [];
const constLit = findLiteral(clean, ['ECON', 'K', 'CONST', 'CONSTANTS', 'TUNING', 'CFG', 'CONFIG']);
const consts = constLit ? constLit.keys : [];

// data-act references: in markup and in JS string literals (template strings, concatenation, escaped quotes)
const dataActs = [...new Set([...html.matchAll(/data-act=\\?["']([A-Za-z_$][\w$]*)/g)].map(x => x[1]))];

// ---- analysis -------------------------------------------------------------------------
const deadFns = fns.filter(f => count(clean, new RegExp('\\b' + f.replace(/\$/g, '\\$') + '\\b', 'g')) <= 1);
const orphanActs = actions.filter(a => !dataActs.includes(a));
const noHandler = dataActs.filter(a => !actions.includes(a));
const viewsMissingFn = views.filter(v => {
  // value may be a function reference (shorthand `v` or `v: ref`) or an inline function; only flag a bare reference that does not exist
  const re = new RegExp('(?:^|[,])\\s*' + v + '\\s*(?::\\s*([A-Za-z_$][\\w$]*)\\s*)?(?=,|\\s*$)', 'm');
  const m = viewsLit && viewsLit.body.match(re);
  if (!m) return false;                                  // inline function or something we cannot classify
  const ref = m[1] || v;
  return !fns.includes(ref) && !new RegExp('(?:var|const|let)\\s+' + ref + '\\b').test(clean);
});
const deadConsts = constLit
  ? consts.filter(k => count(clean, new RegExp('\\b' + constLit.name + '\\.' + k + '\\b', 'g')) === 0)
  : [];

// ---- report ---------------------------------------------------------------------------
console.log('=== INVENTORY (this is the test plan) ===');
console.log('functions:', fns.length,
  '| actions:', actions.length + (actionsLit ? ' (' + actionsLit.name + ')' : ''),
  '| data-acts:', dataActs.length,
  '| views:', views.length + (viewsLit ? ' (' + viewsLit.name + ')' : ''),
  '| constants:', consts.length + (constLit ? ' (' + constLit.name + ')' : ''));

// Be loud about what could NOT be inventoried — silence must never imply coverage.
const gaps = [];
if (!actions.length && dataActs.length)
  gaps.push(dataActs.length + ' UI actions exist but no handler map was recognised — find it and '
    + 'enumerate it by hand, or the coverage suite will silently skip every handler.');
if (!views.length)
  gaps.push('no VIEWS map recognised — enumerate the tab router by hand.');
if (!consts.length)
  gaps.push('no constants block (ECON/CFG/...) recognised — if the game has one, dead tuning values will not be flagged.');
gaps.push('validators and migrate() steps are NOT inventoried by this script — enumerate every import/validation path by hand and check the shape it asserts against what the code dereferences.');
console.log('\n!! INVENTORY GAPS — these are NOT clean results, they are unknowns:');
gaps.forEach(g => console.log('   -', g));

function report(label, list, why) {
  console.log('\n' + label + ':', list.length, list.length ? '' : '(clean)');
  if (list.length) { list.forEach(x => console.log('   -', x)); console.log('  ^', why); }
}
report('NEVER-REFERENCED functions', deadFns, 'dead code, or a path that lost its last caller in a refactor');
report('ACTIONS with no data-act reference', orphanActs, 'legacy handler, a UI path that was removed, or an action only reached from the command palette/keyboard (confirm)');
report('data-acts with NO handler', noHandler, 'BROKEN: tapping this throws');
report('VIEWS keys whose function does not exist', viewsMissingFn, 'BROKEN: switching to this tab renders the crash fallback');
report('UNUSED constants', deadConsts, 'left from a removed formula; confirm before deleting');

console.log('\nNext: exercise every action, assert every pure function against an independent');
console.log('calculation, and check every VALIDATOR against the shape the code now dereferences.');
