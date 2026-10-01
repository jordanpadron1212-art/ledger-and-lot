#!/usr/bin/env node
'use strict';
/* docs-check.js — structural validator for a project documentation folder.
   Every check is a string/structural comparison with a definite yes/no answer.
   No semantic matching, no judgement. Node stdlib only.
   Usage: node docs-check.js [projectRoot] [--json] [--quiet]                  */

const fs = require('fs');
const path = require('path');

const DEFAULTS = {
  artifact: 'site/index.html',
  // widened from BUILD\s*[:=]\s*["'](...)["'] so it also matches a build-log
  // array:  const BUILD = [ "Build 0.10 · ..." ]
  versionPattern: 'BUILD\\s*[:=]\\s*\\[?\\s*["\']([^"\']+)["\']',
  volatile: ['HANDOFF.md', 'docs/ROADMAP.md', 'docs/CHANGELOG.md'],
  measuredHome: 'HANDOFF.md',
  decisionsFile: 'docs/DECISIONS.md',
  changelogFile: 'docs/CHANGELOG.md',
  archiveDir: 'archive',
  graveyardDir: '_to_delete',
  // exact strings REFS must not report (template placeholders such as
  // `bush-league-vN.html`). Literal equality only — no globs, no guessing.
  ignoreRefs: []
};

const EXTS = ['.md', '.js', '.py', '.html', '.css', '.json', '.txt', '.cmd', '.sh'];
const SKIP_DIRS = new Set(['node_modules', '.git', '.svn', 'dist', 'build']);
const VER = /\d+(?:\.\d+)+/;                       // version-shaped token
const BAD_CHARS = /[\s()<>*|,$"'\[\]#?=&%!;:{}\\@^~]|…|·|—|–/;
const SEG = /^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)*$/;

/* ------------------------------------------------------------------ helpers */
const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');
const QUIET = args.includes('--quiet');
const ROOT = path.resolve(args.find(a => !a.startsWith('--')) || '.');

function readCfg(root) {
  const cfg = Object.assign({}, DEFAULTS);
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(root, 'docs-check.json'), 'utf8'));
    for (const k of Object.keys(DEFAULTS)) if (raw[k] !== undefined) cfg[k] = raw[k];
  } catch (_) { /* absent or unparseable -> defaults */ }
  return cfg;
}

function walk(root) {
  const rel = new Set(), base = new Map();
  (function rec(dir, pre) {
    let ents = [];
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { /* unreadable */ }
    for (const e of ents) {
      if (e.name.startsWith('.') || SKIP_DIRS.has(e.name)) continue;
      const r = pre ? pre + '/' + e.name : e.name;
      rel.add(r);
      if (e.isDirectory()) { rel.add(r + '/'); rec(path.join(dir, e.name), r); }
      else if (!base.has(e.name)) base.set(e.name, r);
    }
  })(root, '');
  return { rel, base };
}

const cache = new Map();
function lines(rel) {                                    // rel path -> string[] | null
  if (cache.has(rel)) return cache.get(rel);
  let v = null;
  try { v = fs.readFileSync(path.join(ROOT, rel), 'utf8').split(/\r?\n/); } catch (_) { /* unreadable */ }
  cache.set(rel, v);
  return v;
}
const mtime = p => { try { return fs.statSync(path.join(ROOT, p)).mtimeMs; } catch (_) { return null; } };
const R = (name, status, reason, detail) => ({ name, status, reason, detail: detail || [] });

/* numeric, segment-by-segment. A lexical compare gets 0.9 vs 0.10 backwards. */
function cmpVer(a, b) {
  const A = String(a).split('.'), B = String(b).split('.');
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const x = Number(A[i]), y = Number(B[i]);
    const p = Number.isFinite(x) ? x : 0, q = Number.isFinite(y) ? y : 0;
    if (p !== q) return p < q ? -1 : 1;
  }
  return 0;
}

/* the artifact's own version marker -> {v} or {err} */
function artifactVersion(cfg, tree) {
  const art = cfg.artifact;
  if (!tree.rel.has(art)) return { err: `no artifact at ${art}` };
  const L = lines(art); if (!L) return { err: `cannot read ${art}` };
  let re; try { re = new RegExp(cfg.versionPattern); } catch (_) { return { err: 'bad versionPattern' }; }
  const m = re.exec(L.join('\n'));
  const t = m && m[1] ? VER.exec(m[1]) : null;
  return t ? { v: t[0] } : { err: `no version token via versionPattern in ${art}` };
}

/* highest version-shaped token in any heading of a doc -> {v, line} or null */
function newestHeadingVersion(rel) {
  let best = null, ln = 0;
  (lines(rel) || []).forEach((s, i) => {
    if (!/^#{1,6}\s/.test(s)) return;
    const t = VER.exec(s.replace(/\d{4}-\d{2}-\d{2}/g, ''));      // never read a date as a version
    if (t && (best === null || cmpVer(t[0], best) > 0)) { best = t[0]; ln = i + 1; }
  });
  return best === null ? null : { v: best, line: ln };
}

/* live lines = [{n, text}] with fenced code blocks stripped */
function liveLines(rel) {
  const out = []; let fence = false;
  (lines(rel) || []).forEach((s, i) => {
    if (/^\s*(```|~~~)/.test(s)) fence = !fence;
    else if (!fence) out.push({ n: i + 1, text: s });
  });
  return out;
}

/* ------------------------------------------------------------- 1. VERSION  */
function checkVersion(cfg, tree) {
  const art = cfg.artifact, home = cfg.measuredHome;
  const a = artifactVersion(cfg, tree);
  if (a.err) return R('VERSION', 'SKIP', a.err);
  const av = a.v;

  const H = lines(home); if (!H) return R('VERSION', 'SKIP', `no ${home}`);
  const head = H.slice(0, 40);
  let cv = null, cl = 0;
  for (const near of [/current build/i, /\bbuild\b|\bversion\b/i]) {     // most specific first
    head.forEach((s, i) => { if (cv || !near.test(s)) return; const t = VER.exec(s); if (t) { cv = t[0]; cl = i + 1; } });
    if (cv) break;
  }
  if (!cv) return R('VERSION', 'SKIP', `no version token near build/version words in ${home}:1-40`);
  if (av === cv) return R('VERSION', 'PASS', `${art} ${av} == ${home} ${cv}`);
  return R('VERSION', 'FAIL', `${art} says ${av}, ${home} claims ${cv}`,
    [`${art}  version marker -> ${av}`, `${home}:${cl}  claims -> ${cv}`]);
}

/* ------------------------------------------------------------- 2. REFS     */
function refCandidate(s) {
  if (!s || BAD_CHARS.test(s) || s.includes('://')) return null;
  if (/^[-/~]/.test(s)) return null;                    // flags, absolute paths
  if (s.endsWith('/')) return SEG.test(s.slice(0, -1)) ? s : null;   // dir ref
  if (!EXTS.includes(path.extname(s).toLowerCase())) return null;    // must have a known ext
  return SEG.test(s) ? s : null;
}

function checkRefs(cfg, tree, mds) {
  if (!mds.length) return R('REFS', 'SKIP', 'no .md files');
  const ignore = new Set(cfg.ignoreRefs || []);
  const missing = [], seen = new Set();
  for (const md of mds) {
    for (const { n, text } of liveLines(md)) {
      const re = /`([^`\n]+)`/g; let m;
      while ((m = re.exec(text))) {
        const ref = refCandidate(m[1].trim());
        if (!ref || ignore.has(ref)) continue;
        const clean = ref.replace(/^\.\//, '');
        if (tree.rel.has(clean) || tree.rel.has(clean.replace(/\/$/, ''))) continue;
        // single-segment names resolve by basename anywhere but the graveyard
        const b = clean.includes('/') ? null : tree.base.get(clean);
        if (b && !b.startsWith(cfg.graveyardDir + '/')) continue;
        const key = md + ':' + n + ':' + clean;
        if (seen.has(key)) continue;
        seen.add(key);
        missing.push(`${md}:${n}  ${clean}`);
      }
    }
  }
  if (!missing.length) return R('REFS', 'PASS', 'every backtick path ref resolves');
  return R('REFS', 'FAIL', `${missing.length} backtick path ref(s) do not exist`, missing);
}

/* ------------------------------------------------------------- 3. MEASURED */
const CELLS = row => row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(c => c.trim());
const isSep = s => /^\s*\|[\s:|-]+\|\s*$/.test(s);

function checkMeasured(cfg, tree, mds) {
  if (!mds.length) return R('MEASURED', 'SKIP', 'no .md files');
  const hits = [];
  for (const md of mds) {
    const L = lines(md); if (!L) continue;
    for (let i = 0; i + 1 < L.length; i++) {
      if (!/^\s*\|/.test(L[i]) || !isSep(L[i + 1])) continue;
      const cells = CELLS(L[i]);
      const anchor = cells.some(c => /source|target|real|expected/i.test(c));
      if (!anchor) continue;
      let qualifies = cells.some(c => /measur|claim/i.test(c));
      if (!qualifies) {                       // nearest heading within 3 lines above
        for (let j = i - 1; j >= 0 && j >= i - 3; j--) {
          if (!L[j].trim()) continue;
          if (/^#{1,6}\s/.test(L[j])) qualifies = /measur|claim/i.test(L[j]);
          break;
        }
      }
      if (qualifies) { hits.push(`${md}:${i + 1}  ${L[i].trim().slice(0, 70)}`); break; }
    }
  }
  if (hits.length <= 1) return R('MEASURED', 'PASS', `${hits.length} measured-figures table`);
  return R('MEASURED', 'FAIL', `measured-figures table in ${hits.length} files (home is ${cfg.measuredHome})`, hits);
}

/* ------------------------------------------------------------- 4. SUPERSESSION */
const ENTRY = /^(?:\*\*|#{2,3}\s+)((?:ADR-)?D?\d+[a-z]?)\s*[·:-]/;

function entryBody(L, id) {                 // lines of the entry that declares <id>
  const start = L.findIndex(s => { const m = ENTRY.exec(s); return m && m[1] === id; });
  if (start < 0) return null;
  let end = start + 1;
  while (end < L.length && !ENTRY.test(L[end]) && !/^#{1,3}\s/.test(L[end])) end++;
  return L.slice(start, end).join('\n');
}

function checkSupersession(cfg, tree, mds) {
  if (!mds.length) return R('SUPERSESSION', 'SKIP', 'no .md files');
  const fails = [], warns = [];
  const text = new Map(mds.map(m => [m, (lines(m) || []).join('\n')]));

  for (const md of mds) {
    const L = lines(md); if (!L) continue;
    for (let i = 0; i < L.length; i++) {
      const line = L[i];
      /* hard form: SUPERSEDES <ID> */
      const hard = /\bsupersedes\s+((?:ADR-)?D?\d+[a-z]?)\b/i.exec(line);
      if (hard) {
        const id = hard[1];
        const bodies = mds.map(t => entryBody(lines(t) || [], id)).filter(b => b !== null);
        if (bodies.length && !bodies.some(b => /SUPERSEDED\s*BY/i.test(b)))
          fails.push(`${md}:${i + 1}  SUPERSEDES ${id} — ${id}'s entry has no "SUPERSEDED BY" line`);
      }
      /* soft form: replaces/supersedes ... naming another .md, or quoting a section title */
      const soft = /\b(replaces|supersedes|supersede)\b/i.exec(line);
      if (!soft) continue;
      const self = path.basename(md);
      const pointsBack = t =>
        /SUPERSEDED/i.test(text.get(t) || '') || (text.get(t) || '').includes(self);

      const named = line.match(/[A-Za-z0-9_.-]+\.md\b/g) || [];
      for (const nm of new Set(named)) {
        if (nm === self) continue;
        const t = mds.find(x => path.basename(x) === nm);
        if (!t || pointsBack(t)) continue;
        warns.push(`${md}:${i + 1}  names ${nm} as replaced, but ${nm} has no SUPERSEDED / "${self}" pointer`);
      }
      /* quoted section titles, only when the verb precedes the quote */
      const qs = [...line.matchAll(/["“]([^"“”]{8,90})["”]/g)];
      for (const q of qs) {
        if (q.index < soft.index) continue;              // verb must come first
        const phrase = q[1].trim();
        if (!/\s/.test(phrase)) continue;                // needs >= 2 words
        for (const t of mds) {
          if (t === md || !(text.get(t) || '').includes(phrase)) continue;
          if (pointsBack(t)) continue;
          warns.push(`${md}:${i + 1}  claims to replace "${phrase.slice(0, 46)}" — still present in ${t}, no pointer back`);
        }
      }
    }
  }
  if (fails.length) return R('SUPERSESSION', 'FAIL', `${fails.length} unmatched SUPERSEDES`, fails.concat(warns));
  if (warns.length) return R('SUPERSESSION', 'WARN', `${warns.length} soft supersession(s) with no pointer back`, warns);
  return R('SUPERSESSION', 'PASS', 'supersession pointers matched');
}

/* ------------------------------------------------------------- 5. ARCHIVE  */
function checkArchive(cfg, tree) {
  const cl = cfg.changelogFile;
  if (!tree.rel.has(cl)) return R('ARCHIVE', 'SKIP', `no changelog at ${cl}`);
  if (!tree.rel.has(cfg.archiveDir)) return R('ARCHIVE', 'SKIP', `no ${cfg.archiveDir}/ directory`);
  const versions = new Map();
  (lines(cl) || []).forEach((s, i) => {
    if (!/^#{1,6}\s/.test(s)) return;
    const v = VER.exec(s.replace(/\d{4}-\d{2}-\d{2}/g, ''));
    if (v && !versions.has(v[0])) versions.set(v[0], i + 1);
  });
  if (!versions.size) return R('ARCHIVE', 'SKIP', 'no version strings in changelog headings');
  let names = [];
  try { names = fs.readdirSync(path.join(ROOT, cfg.archiveDir)); } catch (_) {}
  const missing = [...versions].filter(([v]) => !names.some(n => n.includes(v)))
    .map(([v, ln]) => `${cl}:${ln}  ${v} — nothing in ${cfg.archiveDir}/ contains "${v}"`);
  if (!missing.length) return R('ARCHIVE', 'PASS', `${versions.size} changelog version(s) all archived`);
  return R('ARCHIVE', 'FAIL', `${missing.length}/${versions.size} changelog version(s) not in ${cfg.archiveDir}/`, missing);
}

/* ------------------------------------------------------------- 6. STALE    */
function checkStale(cfg, tree) {
  if (!tree.rel.has(cfg.artifact)) return R('STALE', 'SKIP', `no artifact at ${cfg.artifact}`);
  const am = mtime(cfg.artifact);
  if (am == null) return R('STALE', 'SKIP', 'cannot stat artifact');
  const present = cfg.volatile.filter(v => tree.rel.has(v));
  if (!present.length) return R('STALE', 'SKIP', 'no volatile docs present');
  const old = present.map(v => [v, mtime(v)]).filter(([, m]) => m != null && m < am)
    .map(([v, m]) => `${v}  ${Math.round((am - m) / 1000)}s older than ${cfg.artifact}`);
  if (!old.length) return R('STALE', 'PASS', `${present.length} volatile doc(s) newer than the build`);
  return R('STALE', 'FAIL', `${old.length}/${present.length} volatile doc(s) older than the build`, old);
}

/* ------------------------------------------------------------- 8. RECORDED
   The artifact's own version vs the newest version the docs record. Artifact
   behind a doc = a pass was recorded that the build never picked up (FAIL).
   Artifact ahead of a doc = the doc is lagging (WARN; STALE may cover it).
   Versions compare numerically by segment — 0.10 is above 0.9, not below.   */
function checkRecorded(cfg, tree) {
  const a = artifactVersion(cfg, tree);
  if (a.err) return R('RECORDED', 'SKIP', a.err);
  const srcs = [cfg.decisionsFile, cfg.changelogFile]
    .filter(f => tree.rel.has(f))
    .map(f => [f, newestHeadingVersion(f)])
    .filter(([, h]) => h);
  if (srcs.length < 2) return R('RECORDED', 'SKIP', 'no version-shaped heading in decisions and/or changelog');
  const behind = [], ahead = [];
  for (const [f, h] of srcs) {
    const c = cmpVer(a.v, h.v);
    if (c < 0) behind.push(`${f}:${h.line}  records ${h.v}, artifact marker is ${a.v} — that pass was never recorded in the build`);
    else if (c > 0) ahead.push(`${f}:${h.line}  newest recorded is ${h.v}, artifact is ${a.v} — doc lagging the build`);
  }
  if (behind.length) return R('RECORDED', 'FAIL', `${cfg.artifact} ${a.v} is behind ${behind.length} doc(s)`, behind.concat(ahead));
  if (ahead.length) return R('RECORDED', 'WARN', `${ahead.length} doc(s) behind ${cfg.artifact} ${a.v}`, ahead);
  return R('RECORDED', 'PASS', `artifact, decisions and changelog all newest at ${a.v}`);
}

/* ------------------------------------------------------------- 9. GRAVEYARD
   Folder law 5: every file parked in the graveyard carries a provenance line.
   Directories count by their own name; their contents are not descended into,
   so a dated batch folder needs one line, not one per file.                  */
function checkGraveyard(cfg, tree) {
  const g = cfg.graveyardDir;
  if (!tree.rel.has(g)) return R('GRAVEYARD', 'SKIP', `no ${g}/ directory`);
  let ents = [];
  try { ents = fs.readdirSync(path.join(ROOT, g), { withFileTypes: true }); } catch (_) { /* unreadable */ }
  const names = ents.map(e => e.name).filter(n => n !== 'README.txt' && !n.startsWith('.'));
  if (!names.length) return R('GRAVEYARD', 'PASS', `${g}/ is empty`);
  const readme = lines(g + '/README.txt');
  if (!readme) return R('GRAVEYARD', 'FAIL', `${g}/ holds ${names.length} entr(ies) and has no README.txt`,
    names.map(n => `${g}/${n}  no provenance — ${g}/README.txt does not exist`));
  const txt = readme.join('\n');
  const bad = names.filter(n => !txt.includes(n));
  if (!bad.length) return R('GRAVEYARD', 'PASS', `${names.length} entr(ies), all with provenance`);
  return R('GRAVEYARD', 'FAIL', `${bad.length}/${names.length} entr(ies) not named in ${g}/README.txt`,
    bad.map(n => `${g}/${n}  no line in ${g}/README.txt`));
}

/* ------------------------------------------------------------- 7. DATED    */
function checkDated(cfg, tree) {
  const df = cfg.decisionsFile;
  if (!tree.rel.has(df)) return R('DATED', 'SKIP', `no ${df}`);
  const entries = (lines(df) || []).map((s, i) => [s, i + 1])
    .filter(([s]) => /^\*\*(D\d+[a-z]?)\s*[·:-]/.test(s) || /^#{2,3}\s+(D\d+[a-z]?)\s*[·:-]/.test(s));
  const total = entries.length;
  const bad = entries.filter(([s]) => !/\d{4}-\d{2}-\d{2}/.test(s))
    .map(([s, n]) => `${df}:${n}  ${s.trim().slice(0, 72)}`);
  if (!total) return R('DATED', 'SKIP', `no decision entry lines in ${df}`);
  if (!bad.length) return R('DATED', 'PASS', `${total} entries, all dated`);
  return R('DATED', 'FAIL', `${bad.length}/${total} entries have no ISO date on the entry line`, bad.slice(0, 10));
}

/* ------------------------------------------------------------------ main   */
if (args.includes('--selftest')) {          // proves the version comparator
  const T = [['0.9', '0.10', -1], ['0.10', '0.9', 1], ['1.2', '1.10', -1], ['1.10', '1.2', 1],
    ['2.0', '10.0', -1], ['10.0', '2.0', 1], ['0.9', '0.9', 0], ['1.0', '1.0.0', 0],
    ['1.0.1', '1.0', 1], ['0.10', '0.10', 0]];
  let bad = 0;
  for (const [a, b, e] of T) {
    const g = cmpVer(a, b), ok = g === e; if (!ok) bad++;
    process.stdout.write(`${ok ? 'ok  ' : 'FAIL'}  cmpVer(${a}, ${b}) = ${g}, expected ${e}\n`);
  }
  process.stdout.write(`— ${T.length - bad}/${T.length} version-comparison cases pass\n`);
  process.exit(bad ? 1 : 0);
}
const t0 = process.hrtime.bigint();
const cfg = readCfg(ROOT);
const tree = fs.existsSync(ROOT) ? walk(ROOT) : { rel: new Set(), base: new Map() };
/* the graveyard is dead by definition — its docs are not the project's claims */
const mds = [...tree.rel].filter(f => f.endsWith('.md') && !f.startsWith(cfg.graveyardDir + '/')).sort();
const results = [checkVersion(cfg, tree), checkRecorded(cfg, tree), checkRefs(cfg, tree, mds),
  checkMeasured(cfg, tree, mds), checkSupersession(cfg, tree, mds), checkArchive(cfg, tree),
  checkStale(cfg, tree), checkDated(cfg, tree), checkGraveyard(cfg, tree)];
const ms = Number(process.hrtime.bigint() - t0) / 1e6;
const nFail = results.filter(r => r.status === 'FAIL').length;

if (JSON_OUT) {
  process.stdout.write(JSON.stringify({ root: ROOT, ms: +ms.toFixed(2), checks: results, fail: nFail }, null, 2) + '\n');
} else {
  const tally = s => results.filter(r => r.status === s).length;
  for (const r of results) {
    if (QUIET && r.status === 'PASS') continue;
    process.stdout.write(`${r.status.padEnd(5)} ${r.name.padEnd(13)} ${r.reason}\n`);
    if (r.status === 'PASS') continue;
    for (const d of r.detail.slice(0, 40)) process.stdout.write(`        ${d}\n`);
    if (r.detail.length > 40) process.stdout.write(`        … ${r.detail.length - 40} more\n`);
  }
  process.stdout.write(`— ${tally('PASS')} pass · ${tally('FAIL')} fail · ${tally('WARN')} warn · ${tally('SKIP')} skip · ${ms.toFixed(1)}ms · ${path.basename(ROOT)}\n`);
}
process.exit(nFail ? 1 : 0);
