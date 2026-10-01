# DECISIONS — Ledger & Lot

Append-only. One entry per decision. Search, don't read whole.
Format: `**Dnn · YYYY-MM-DD · Rule as a sentence.**` then why / Rejected / Measured.

**D01 · 2026-09-30 · We build our own game rather than modding Capitalism Lab.**
The user wants to change finance screens and business logic, which are compiled into CapMain.exe; the CapLab mod system only exposes data tables (.dbf), art (.RES) and `[SPECIAL RULES]` script switches. Rejected: binary-patching CapMain.exe (fragile, breaks every update, likely against ToS). Measured: n/a.

**D02 · 2026-09-30 · The game is one self-contained HTML file with no build step, frameworks or CDNs.**
Runs on PC and phone by opening a file or a URL; saves are `JSON.stringify(G)` in the browser plus export. Rejected: a game engine (Unity/Godot) or a React app — heavier, and fights the spreadsheet-first design. Measured: n/a.
SUPERSEDED BY D17 (wording only): "no build step" now means no runtime build. Source is authored as fragments and composed into the one shipped file.

**D03 · 2026-09-30 · Setting is modern day (US-calibrated numbers), scope balanced like Capitalism Lab.**
User's choice: retail, manufacturing, raw materials and finance all in play. Rejected: historical climb from ~1950; fictional world; finance-only or operations-only focus. Measured: n/a.

**D04 · 2026-09-30 · Visual shell is the dark trading-desk look.**
User's choice; dense, tabular numerals, flash-on-change. Rejected: light Excel-like spreadsheet look. Measured: n/a.

**D05 · 2026-09-30 · Every dollar moves through a double-entry `post()`; statements are views over the ledger.**
The user's core complaint is CapLab's finance screens; real, drillable books are the differentiator. Rejected: tracking cash as a single mutable number. Measured: n/a.

**D06 · 2026-09-30 · The map is a simple grid of cities with plots, not a rendered city.**
User asked for "spreadsheet data type game and maybe a simple map"; distance drives freight cost. Rejected: CapLab-style 3D/isometric city. Measured: n/a.

**D07 · 2026-09-30 · Project lives at C:\Users\jorda\Projects\ledger-and-lot; a GitHub repo will be created later with the user.**
User asked for a new folder now and a repo afterwards; Documents is under Windows Controlled Folder Access, which blocks git/node/shell writes. Rejected: Documents\GitHub (CFA blocks git); the Capitalism Lab install folder (game updates may touch it). Measured: n/a.

**D08 · 2026-09-30 · Capitalism Lab data is a design reference only; no CapLab data rows, art or text ship in our game.**
Our numbers are derived from public sources (BLS, Census, FRED, USDA, EIA) and tiered T1/T2/T3. Rejected: importing CapLab's .dbf product/recipe tables. Measured: n/a.

**D09 · 2026-09-30 · The simulation model mirrors Capitalism Lab's data model and goes deeper.**
User: "play exactly like cap lab as far as the data goes … even deeper". Same kinds of entities and fields (products with price/quality/brand concern weights, recipes with input quality weights, firms built from linked units, tech tree, cities with population and wages), extended with real books and more data per entity. Rejected: a simplified abstract model. Measured: n/a.

**D10 · 2026-09-30 · The user supplies the UI layout for mobile and PC; we build to it.**
User said they will provide the layout. This replaces the default desk-shell layout pass; the dark desk look (D04) applies only where their layout leaves styling open. Rejected: designing our own layout first. Measured: n/a.

**D11 · 2026-09-30 · The UI shell is the user's Bucking Bull Genetics Sim layout (OOTP black skin), adapted to business entities.**
The user pointed at their own game as "the same layout". It brings the icon rail, the top stat bar with Week/Month advance, the equity-research Company page, a phone dropdown nav and grid↔list tables. Details are in `docs/DESIGN.md`. This narrows D04: the "desk dark" look means that black OOTP skin, not the default desk shell. Rejected: the front-office default desk shell. Measured: reference build 5.81, 4.2 MB.
SUPERSEDED BY D19 (wording only): the bull sim is the inspiration, not a template to copy.

**D12 · 2026-10-01 · V1 sells 15 products in four specialty categories: grocery (bread, milk, eggs, coffee, soda, frozen pizza), apparel (jeans, t-shirts, sneakers), electronics (smartphone, laptop, TV), drugstore (shampoo, cosmetics, generic medicine).**
User accepted the proposal. Each store holds 4 products per floor, so a full grocery range needs a second floor. Rejected: a wider catalog in V1. Measured: n/a.

**D13 · 2026-10-01 · V1 has three starts: $250k savings, $150k plus a $500k SBA loan, or an inherited struggling supermarket; hardcore or normal mode.**
User accepted. Scenario 1 is deliberately tight. At average turns, a 4,000 sf apparel store needs about $256k of inventory at cost ($741k COGS ÷ 2.9 turns, ARTS T1), which is more than the whole $250k. A convenience store needs about $115k ($1.5M ÷ 13 turns). The store-build screen shows the capital each format needs. Rejected: raising Scenario 1 so that any store is affordable. Measured: derived from retail-labor §1/§2a/§2b.

**D14 · 2026-10-01 · The game advances one day per tick, on real calendar months; the books close at calendar month end.**
User chose a daily tick over the proposed weekly one. Cadence: daily sales, deliveries, spoilage and cash; biweekly payroll; monthly rent, utilities, interest, depreciation and close; quarterly tax; yearly close. Top bar shows `▸ Day` / `▸ Week` / `▸ Month`. Every posting hits the ledger the same day; the close only locks the statements. Rejected: weekly tick; the 4-4-5 retail calendar (unnecessary once ticks are days). Measured: n/a.

**D15 · 2026-10-01 · V1's city is Dallas–Fort Worth, with real metro figures on an abstract plot grid; V1 stores are leased only.**
User accepted. Rejected: a fictional city; buying land and building in V1 (land plus construction at $155–350/sf is out of reach of every start). Measured: n/a.

**D16 · 2026-10-01 · V1 targets PC only (1280px and wider); the phone layout comes in a dedicated later pass.**
User's call; it suits this game. The pitch is drillable three-statement books and wide market tables, which need width. V1 ships no phone layout at all: it is left out, not hidden. Every table still renders through the one grid engine, and all styling goes through `:root` tokens, so the mobile pass adds the phone nav, the grid's list mode and 360px checks in one place instead of reworking every tab. This is a deliberate exception to front-office's phone-first law, for this game only. Visual QA runs at 1280×800 and 1920×1080; 1280 is also the terminal tab's existing minimum. Rejected: phone-first V1 (doubles visual QA, and the statements cannot show comparison columns at 360px); a multi-file React app for PC (see D17). Measured: n/a.

**D17 · 2026-10-01 · The source is authored as fragments in src/; tools/compose.js joins them into site/index.html, the one shipped file. SUPERSEDES D02 (wording only).**
The shipped game stays one self-contained HTML file, with no runtime build, framework or CDN. The compose step is dev-time only. It concatenates the fragments, syntax-checks the joined script, and checks that every `data-act` has an `ACTIONS` key (front-office speed.md §2: never hand-edit a file past ~3,000 lines). The `jordanpadron1212-art/mobile-sim-factory` repo was reviewed for this. It is docs-only, with no code to reuse, and its planned stack is React 19 + TypeScript + Vite + pnpm. Rejected: adopting that stack, because it would require building the factory first and rewriting the bull-sim shell (D11), which is plain HTML. File size is not the constraint: the bull sim ships as one 4.2 MB file. Measured: n/a.

**D18 · 2026-10-01 · Engine rules adopted from mobile-sim-factory: seeded RNG streams, a real-engine what-if, a golden test, loud saves with a size gate, a consolidated daily ledger, and named phase lists.**
1. **Seeded RNG.** sfc32 with named streams (`demand`, `rivals`, `events`, …). The 4×u32 state lives in `G`, and the sim never calls `Math.random`. Same seed, same game. Front-office's `ri/rf/pick/gauss` keep their signatures but draw from the streams.
2. **What-if runs the real engine.** Price and stock previews run the real daily phases on `structuredClone(G)`, with the RNG streams forked from the live state. The preview is then exactly the outcome if nothing else changes.
3. **Golden test.** A fixed seed is run for 3 sim years, then a hash of `G` is taken. An unexplained change to that hash fails QA. deskcheck catches crashes, NaN and audit failures, but not silent behaviour drift.
4. **Saves never fail silently.** A save failure shows a toast and offers an export. The soak test measures save size at years 1, 3 and 5 and fails above 2 MB. This matters because Ledger & Lot and the bull sim share one browser storage quota on `jordanpadron1212-art.github.io` (verified: same origin). The ~5 MB localStorage limit is assumed.
5. **One consolidated ledger entry per day.** The general ledger gets one consolidated sales/COGS entry per day. Store × product detail goes to a sales sub-ledger, which feeds the segment reports. Estimate: posting per product would add ~1 MB per store per year, against ~0.07 MB per year consolidated.
6. **Named phase lists.** The daily, biweekly, monthly, quarterly and yearly steps are each an ordered named array, so the order "close before new charges" is visible and testable.
Rejected:
- Integer-cent money (front-office `r2()` with a 2¢ audit is enough; Impact: negligible).
- The factory's 256-entry journal cap (front-office already keeps 2 years of journal).
- IBM Plex fonts and the menu nav (they conflict with the D11 shell).
- IndexedDB from day one (the deskcheck harness saves synchronously; switch only if the size gate trips).
Measured: n/a.

**D19 · 2026-10-01 · The bull sim is the layout idea, not a template: V1 follows its concepts and is built from front-office's shell. SUPERSEDES D11 (wording only).**
User: "it does not have to be exactly like the bull sim but just the idea of it." The concepts kept are:
- a left icon rail;
- a top bar with a date/stat strip and the advance buttons;
- an equity-research Company page (ticker, KPI row, Overview/Financials/Segments/Peers);
- a bottom status bar;
- a black, flat, zero-radius, hairline, tabular-numeral skin.
The build uses front-office's hand-rolled grid and books engine. None of the bull sim's libraries are lifted. Measured on build 5.81 (4,230,376 bytes): ag-Grid 1,645,991 B, TradingView Lightweight Charts 163,701 B, game script 1,684,095 B, terminal 265,554 B, CSS 423,535 B. The bull sim also keeps cash as a literal (`G.cash`, `G.debt`), with no `post()`; front-office's books law replaces that here. Rejected: a pixel copy of the bull-sim CSS and markup; lifting ag-Grid (front-office table law: hand-rolled grid, no 1.6 MB library). Measured: the sizes above, by script block.
