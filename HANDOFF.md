# HANDOFF — Ledger & Lot

**Current version:** none yet. No build exists; the project is at research and design stage.
**Live at:** not deployed.
**Folder:** `C:\Users\jorda\Projects\ledger-and-lot` (git `main` tracks origin https://github.com/jordanpadron1212-art/ledger-and-lot, public; pushing from the shell works with stored credentials)

## What this is
A Capitalism Lab–style business sim as one self-contained HTML file. It is spreadsheet and data driven, with a simple city-grid map, a modern-day US setting and real double-entry books. The simulation model mirrors Capitalism Lab's data model and goes deeper (`docs/DECISIONS.md` D09). The user is supplying the UI layout for mobile and PC (D10).

## File state (2026-09-30)
```
docs/DECISIONS.md                    D01–D18
docs-check.json                      docs-check config (ignores PC-only docs/reference/ refs)
docs/research/caplab-mechanics.md    CapLab rating/quality formulas, firm units, finance rules, player complaints
docs/research/finance-macro.md       rates, spreads, default rates, taxes, equity, macro cycle, banking (FRED/S&P/NBER)
docs/research/retail-labor.md        margins, opex, rents, land/construction, BLS wages, spending, elasticities, ads
docs/research/supply-production.md   commodities, freight, farm/mine economics, 25-product BOM table, factory overhead
qa/docs-check.js                     doc-integrity checker (project-folder skill)
qa/deskcheck.js, qa/inventory.js     game QA harness scripts (front-office skill); unused until a build exists
```

## What happened this session
The user first asked about modding Capitalism Lab (installed at `%LOCALAPPDATA%\Capitalism Lab`). Mods can only reach data tables (.dbf), art (.RES) and `[SPECIAL RULES]` script switches; finance screens and core logic are compiled into CapMain.exe. So the user chose to build their own game (D01). Four research agents gathered sourced, tiered figures (T1 exact / T2 range / T3 estimate). Every row in `docs/research/` carries a source URL and year.

Key anchors for the design, found in `docs/research/caplab-mechanics.md`:
- **Rating:** QR·QC/60 + BR·BC/60 + (StdPr−SellPr)·PC/StdPr, with concern weights summing to 100. Source is the Cap II manual.
- **Quality:** the input qualities weighted by their recipe weights, plus the tech weight × (own tech ÷ world-top tech). The tech weight is 100 minus the summed input weights.
- **Biggest player complaints:** no cash-flow statement, an inconsistent profit definition, no per-product contribution margin, and market size and stock price that are black boxes. Our game's whole pitch is fixing these.

## Genuinely still open
- **Layout:** received. It is the bull-sim shell (D11). V1 builds the PC layout only (D16).
- **Done 2026-09-30:** the GitHub repo was created by the user and pushed. GitHub Pages is not enabled yet; turn it on once site/index.html exists. The `gh` CLI is not installed.
- **Unfinished research:** 9 of the 25 product BOM rows are T3 placeholders; the demand-split formula between competitors is unpublished (we must design it); Census industry cost data needs an API key; the industrial rent figure was not parsed from its PDF.
- **Decided against:** modding CapMain.exe (D01); copying CapLab data rows (D08).

## Could NOT verify this session
- Research figures were gathered by subagents. I did not spot-check their source URLs.
- Stale copies of the research files remain in `Documents\GitHub\ledger-and-lot` (the first location). Windows Controlled Folder Access blocks shell tools from deleting them, so the user should delete that folder manually.

## Session 2026-10-01 (cloud)
- **V1 scope signed off.** D12: the 15 products. D13: the three scenarios; Scenario 1 is deliberately tight. D14: **daily tick**, with books closing at calendar month end (cadence is in `docs/DESIGN.md`). D15: Dallas–Fort Worth, lease-only.
- **PC only for V1 (D16).** 1280px and wider; the phone layout comes in a later dedicated pass. **Source as fragments, one shipped file (D17;** D02 wording superseded).
- **Engine rules taken from the user's `mobile-sim-factory` repo (D18).** That repo is docs-only, with no code to reuse.
- `docs-check.json` added: REFS now ignores the PC-only `docs/reference/` paths.
- **One branch only: `main`** (CLAUDE.md). The stray `claude/kind-bardeen-13gves` branch was fast-forwarded into `main` and deleted.

## Next, in order
1. Finish the DFW research pass → `docs/research/dfw-v1.md`. Gaps: fit-out cost, triple-net charges, lease deposits, weekday sales split, monthly seasonality, ad response.
2. Present the V1 build summary and get the user's go. Then build V1 into site/index.html from src/ fragments (D17).
3. Enable GitHub Pages (Settings → Pages → main) once V1 exists.

## Opening move
Check whether `docs/research/dfw-v1.md` exists. If it does, present the V1 build summary and wait for "go". If it doesn't, finish the research first.
