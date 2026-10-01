# HANDOFF — Ledger & Lot

**Current version:** none yet. No build exists; the project is at research and design stage.
**Live at:** not deployed.
**Folder:** `C:\Users\jorda\Projects\ledger-and-lot` (git initialised locally on `main`, no remote yet)

## What this is
A Capitalism Lab–style business sim as one self-contained HTML file. It is spreadsheet and data driven, with a simple city-grid map, a modern-day US setting and real double-entry books. The simulation model mirrors Capitalism Lab's data model and goes deeper (`docs/DECISIONS.md` D09). The user is supplying the UI layout for mobile and PC (D10).

## File state (2026-09-30)
```
docs/DECISIONS.md                    D01–D10
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
- **Needs the user:** the UI layout for mobile and PC. They said they will provide it. Nothing gets built before it arrives.
- **Needs the user:** a GitHub repo name and visibility. They said "we will create a new github repo" together. The `gh` CLI is not installed; git is.
- **Unfinished research:** 9 of the 25 product BOM rows are T3 placeholders; the demand-split formula between competitors is unpublished (we must design it); Census industry cost data needs an API key; the industrial rent figure was not parsed from its PDF.
- **Decided against:** modding CapMain.exe (D01); copying CapLab data rows (D08).

## Could NOT verify this session
- Research figures were gathered by subagents. I did not spot-check their source URLs.
- Stale copies of the research files remain in `Documents\GitHub\ledger-and-lot` (the first location). Windows Controlled Folder Access blocks shell tools from deleting them, so the user should delete that folder manually.

## Next, in order
1. Layout received: it is the user's Bucking Bull Genetics Sim shell (D11, `docs/DESIGN.md`). The V1 scope and screen mapping were proposed on 2026-09-30 and are awaiting the user's sign-off.
2. Build V1: one city, buy wholesale and sell retail, the CapLab rating model, a Books tab with real statements, save/load.
3. Create the GitHub repo with the user and push.

## Opening move
Ask the user for the layout (or check whether they already sent it), then propose V1.
