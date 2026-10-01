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
1. **Move work to the PC** (the cloud session has only 4 CPUs, so workflows run 2 agents at a time; measured 2026-10-01: 251 agent-minutes took 126 min). On the PC, start Claude Code in `C:\Users\jorda\Projects\ledger-and-lot` and have it run `tools/pc-setup.ps1`. The script pulls `main`, installs Playwright and Chromium for QA, installs the Claude CLI if missing, runs the checks, and prints how many agents run at once (logical CPUs − 2, max 16; assumed). `-Launch` starts `claude remote-control`, so the phone app can drive the PC session; `-NoSleep` stops sleep while plugged in.
2. Present the V1 build summary: draft structure in DESIGN.md plus `docs/research/dfw-v1.md`. Two calls are needed from the user: the start date (proposed Fri 1 Jan 2027, so the fiscal year equals the calendar year) and trade areas (a store sells to its grid cell, plus neighbouring cells for apparel and electronics, not the whole 8.48M metro). Then build V1 step 1 on the user's go: shell + books + clock + Savings scenario + one convenience store + grocery + Books tab.
3. Enable GitHub Pages (Settings → Pages → main) once V1 exists.

## Research status
`docs/research/dfw-v1.md` + `docs/research/dfw-v1-data.json` hold 518 rows across 11 topics. The checker confirmed 512, corrected 6 and lowered the tier on 8. Each topic lists what was "Not found" (114 items, mostly nice-to-haves). The final reviewer agent was killed by an interrupt; its gap ranking was not produced. Lesson: an interrupt kills a running background workflow, so do not interrupt during one, or run it on the PC.

## Could NOT verify (2026-10-01)
- `tools/pc-setup.ps1` was tested on Linux with PowerShell 7.5.3 and stubs for the Windows-only commands. It parses, uses no PowerShell-7-only syntax, and the git, Node and `npm ci` steps ran clean. The Chromium launch, Claude CLI, checks, CPU-count and power steps were **not** executed. First real run is on the PC.
- The C&W DFW $24.78 rent basis (NNN vs gross) remains unverified (see the lease section).

## Opening move
If this session runs on the PC and the node_modules folder is missing, run `tools/pc-setup.ps1` first. Then present the V1 build summary and wait for "go".
