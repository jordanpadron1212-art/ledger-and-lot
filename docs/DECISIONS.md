# DECISIONS — Ledger & Lot

Append-only. One entry per decision. Search, don't read whole.
Format: `**Dnn · YYYY-MM-DD · Rule as a sentence.**` then why / Rejected / Measured.

**D01 · 2026-09-30 · We build our own game rather than modding Capitalism Lab.**
The user wants to change finance screens and business logic, which are compiled into CapMain.exe; the CapLab mod system only exposes data tables (.dbf), art (.RES) and `[SPECIAL RULES]` script switches. Rejected: binary-patching CapMain.exe (fragile, breaks every update, likely against ToS). Measured: n/a.

**D02 · 2026-09-30 · The game is one self-contained HTML file with no build step, frameworks or CDNs.**
Runs on PC and phone by opening a file or a URL; saves are `JSON.stringify(G)` in the browser plus export. Rejected: a game engine (Unity/Godot) or a React app — heavier, and fights the spreadsheet-first design. Measured: n/a.

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
