#!/usr/bin/env node
/*
 * front-office deskcheck — headless smoke + NaN + books-audit + balance probe
 * for single-file desk-sim games.
 *
 * Usage:
 *   node deskcheck.js /path/to/game.html [options]
 *
 * Options:
 *   --months N              advances per scenario (default 40; each = 28 days ≈ 3.1 sim years)
 *   --scenarios a,b,c       scenario <select> values (default: read the select's own <option>s)
 *   --scenario-select ID    id of the scenario <select> (default sScenario)
 *   --name-input ID         id of the name <input> (default sName)
 *   --start-act NAME        data-act of the Start button (default newGame)
 *   --play FILE.js          per-tick "competent player" body; enables the economy probe
 *
 * Exit 0 = clean, 2 = defects found (console/pageerror/audit/NaN/save-reload), 3 = harness failure.
 * Assumes front-office conventions: global G, advanceDays(n), switchTab(k), VIEWS map,
 * data-act delegation, start screen with scenario <select>, auditBooks(), and either
 * continueGame() or loadGame()+enterApp() (loadGame should route through migrate()).
 * On a game without auditBooks() the audit is skipped, not failed.
 * Supersedes the old deep-sim-qa simtest.js, which printed NaN findings without failing the exit code.
 */
const { chromium } = require('playwright');

function arg(flag, def) { const i = process.argv.indexOf(flag); return i > -1 ? process.argv[i + 1] : def; }
const FILE = process.argv[2];
if (!FILE) { console.error('usage: node deskcheck.js <game.html> [--months N] [--scenarios a,b] [--play play.js]'); process.exit(3); }
const filePath = FILE.startsWith('file://') ? FILE : 'file://' + require('path').resolve(FILE);
const MONTHS = parseInt(arg('--months', '40'), 10);
const SCEN_SELECT = arg('--scenario-select', 'sScenario');
const NAME_INPUT = arg('--name-input', 'sName');
const START_ACT = arg('--start-act', 'newGame');
const scenArg = arg('--scenarios', '');
const playFile = arg('--play', '');
const playCode = playFile ? require('fs').readFileSync(playFile, 'utf8') : '';

// destructive actions the blind exerciser must never click
const DENY = ['wipeSave', 'wipeSaveYes', 'newGame', 'continueGame', 'importSave', 'exportSave'];

(async () => {
  const errs = [];
  let browser;
  try { browser = await chromium.launch({ headless: true }); }
  catch (e) { browser = await chromium.launch({ headless: true, executablePath: '/opt/pw-browsers/chromium/chrome-linux/chrome' }); }
  const page = await browser.newPage();
  page.on('console', m => { if (m.type() === 'error') errs.push('console:' + m.text()); });
  page.on('pageerror', e => errs.push('pageerror:' + e.message));

  await page.goto(filePath, { waitUntil: 'load' });
  let scenarios = scenArg ? scenArg.split(',') : await page.evaluate((sel) => {
    const s = document.getElementById(sel);
    return s ? Array.from(s.options).map(o => o.value) : [''];
  }, SCEN_SELECT);
  if (!scenarios.length) scenarios = [''];

  const out = [];
  for (const sc of scenarios) {
    await page.goto(filePath, { waitUntil: 'load' });
    await page.evaluate(({ sc, SCEN_SELECT, NAME_INPUT, START_ACT }) => {
      const sel = document.getElementById(SCEN_SELECT); if (sel && sc) sel.value = sc;
      const nm = document.getElementById(NAME_INPUT); if (nm) nm.value = 'QA ' + (sc || 'run');
      if (typeof window[START_ACT] === 'function') { try { window[START_ACT](); return; } catch (e) {} }
      const b = document.querySelector('[data-act="' + START_ACT + '"]'); if (b) b.click();
    }, { sc, SCEN_SELECT, NAME_INPUT, START_ACT });

    const report = await page.evaluate(({ MONTHS, DENY, playCode }) => {
      const clicked = new Set();
      const play = playCode ? new Function(playCode) : null;
      const cashTrace = [], auditFails = [];
      const runAudit = (tag) => {
        try {
          if (typeof auditBooks === 'function') {
            const a = auditBooks();
            if (a && a.length) auditFails.push(tag + ': ' + a.join(' | '));
          }
        } catch (e) { auditFails.push(tag + ': audit threw ' + e.message); }
      };
      const advance = () => {
        if (typeof advanceDays === 'function') { advanceDays(28); return; }
        const b = document.querySelector('[data-act="advanceDays"][data-a="28"]'); if (b) b.click();
      };
      const tabsList = () => (typeof VIEWS === 'object' && VIEWS) ? Object.keys(VIEWS)
        : Array.from(document.querySelectorAll('[data-act="switchTab"]')).map(b => b.getAttribute('data-a'));
      runAudit('start');
      for (let i = 0; i < MONTHS; i++) {
        advance();
        if (typeof G !== 'undefined' && G && G.gameOver) { if ('cash' in G) cashTrace.push(Math.round(G.cash)); break; }
        if (play) { try { play(); } catch (e) {} }
        if (i % 3 === 2) runAudit('m' + (i + 1));           // quarterly books audit
        // blind exercise: a few untried, non-destructive buttons in the current view
        const btns = Array.from(document.querySelectorAll('#view [data-act]'));
        let n = 0;
        for (const b of btns) {
          const act = b.getAttribute('data-act');
          if (DENY.indexOf(act) > -1) continue;
          const key = act + '|' + (b.getAttribute('data-a') || '');
          if (clicked.has(key)) continue;
          clicked.add(key); try { b.click(); } catch (e) {}
          if (++n >= 3) break;
        }
        const tl = tabsList(); if (tl.length && typeof switchTab === 'function') { try { switchTab(tl[i % tl.length]); } catch (e) {} }
        if (typeof G !== 'undefined' && G && 'cash' in G) cashTrace.push(Math.round(G.cash));
      }
      // visit every tab, open a detail row
      const tl = tabsList();
      tl.forEach(t => { try { if (typeof switchTab === 'function') switchTab(t); } catch (e) {} });
      const row = document.querySelector('#view tr.tap, #view [data-act^="open"]');
      if (row) { try { row.click(); } catch (e) {} }
      runAudit('end');
      // NaN / Infinity scan of G
      const bad = [];
      if (typeof G !== 'undefined') (function scan(o, p) {
        if (o == null) return;
        if (typeof o === 'number') { if (!isFinite(o)) bad.push(p); return; }
        if (typeof o === 'object') { for (const k in o) scan(o[k], p + '.' + k); }
      })(G, 'G');
      const R = { nan: bad.slice(0, 25), audit: auditFails.slice(0, 12) };
      if (typeof G !== 'undefined' && G) {
        R.y = G.year; R.w = G.week; R.cash = Math.round(G.cash);   // no R.debt: liabilities come from the books below
        R.gameOver = !!G.gameOver;
        if (cashTrace.length) { R.minCash = Math.min.apply(null, cashTrace); R.lastCash = cashTrace[cashTrace.length - 1]; R.peakCash = Math.max.apply(null, cashTrace); }
        // books summary, if the statements exist
        try {
          if (typeof balanceSheet === 'function') { const b = balanceSheet(); R.books = { assets: Math.round(b.assets), liab: Math.round(b.liab), equity: Math.round(b.equity + b.ni), gap: b.gap }; }
          if (typeof niYTD === 'function') { R.books = R.books || {}; R.books.niYTD = Math.round(niYTD()); }
        } catch (e) { R.booksErr = e.message; }
      }
      function nz2(x) { x = +x; return isFinite(x) ? x : 0; }
      return R;
    }, { MONTHS, DENY, playCode });

    if (report.audit && report.audit.length) errs.push('audit[' + (sc || 'default') + ']:' + report.audit.join(' ; '));
    if (report.nan && report.nan.length) errs.push('nan[' + (sc || 'default') + ']:' + report.nan.slice(0, 5).join(','));

    // save -> reload -> continue
    await page.evaluate(() => { try { if (typeof saveGame === 'function') saveGame(); } catch (e) {} });
    await page.goto(filePath, { waitUntil: 'load' });
    const cont = await page.evaluate(() => {
      try {
        if (typeof continueGame === 'function') continueGame();
        else if (typeof loadGame === 'function') { loadGame(); if (typeof enterApp === 'function') enterApp(); }
        return { ok: typeof G !== 'undefined' && !!G, tab: (typeof G !== 'undefined' && G) ? G.tab : null };
      } catch (e) { return { ok: false, err: e.message }; }
    });
    if (!cont.ok) errs.push('save-reload[' + (sc || 'default') + '] failed' + (cont.err ? ': ' + cont.err : ''));
    out.push({ scenario: sc, report, continue: cont });
  }

  await browser.close();
  console.log(JSON.stringify(out, null, 2));
  console.log('ERRORS(' + errs.length + '):' + JSON.stringify(errs.slice(0, 40), null, 2));
  process.exit(errs.length ? 2 : 0);
})().catch(e => { console.error('HARNESS FAILURE', e); process.exit(3); });
