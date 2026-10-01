# DESIGN — Ledger & Lot

Intent, not reality. When the build disagrees with this file, that is a RECONCILE, not an edit here.

## Layout source (D11)
The shell copies the user's own game, **Bucking Bull Genetics Sim**: https://jordanpadron1212-art.github.io/rodeogenetics-sim/ (build 5.81, read 2026-09-30).
A local copy is kept for reference at `docs/reference/rodeogenetics-sim.html`. It is 4.2 MB and git-ignored, because it already lives in the user's rodeogenetics-sim repo.

### Shell anatomy (observed at 1440×900 and 375×812)
- **Theme:** OOTP-27 "black" skin. `--bg #050506`, `--panel #0f0f0f`, hairline `rgba(255,255,255,.10)`, text `#ececec`, dim `#8c8c8c`, pos `#22ab6d`, neg `#ef4d56`, warn `#eaa032`, radius 0, no shadows. Condensed sans, tabular numerals.
- **Top bar (PC):**
  - Left: logo, the ACCOUNT name, and labelled stat cells (Date `Y1W1`, Season, Rep, the core-entity counts).
  - Right: `▸ Week` / `▸ Month` advance buttons, save, zoom `− 100% +`, the theme toggle and an avatar.
- **Left icon rail (PC):** icon + short label per tab, with Inbox and Settings pinned to the bottom.
- **Status bar (PC, bottom):** a green dot and a state label, then `Y1 W1 · SEASON · CASH · NET · HEAD`, with the brand on the right.
- **Phone:**
  - The top stat strip stays.
  - The rail becomes a dropdown nav trigger ("Company ▾") next to `− + save ▸Week ▸Month`.
  - Panels stack, and tables become row lists with labelled mini-fields (`PWR 50 PTS 0 … VALUE $1,700`) plus a Sort pill row and a `⊞ Grid` toggle.
  - The terminal tab is blocked below 1280px.
- **Company page (home), equity-research style:**
  - Ticker chip `DRBB`, the company name and subtitle, and on the right a big value with its weekly change.
  - A KPI row: CASH, DEBT, ENT. VALUE, HEAD, CREDIT.
  - Sub-tabs: OVERVIEW · FINANCIALS · SEGMENTS · PEERS.
  - On Overview: an Equity–Net Worth chart (Season/Year/All, hidden under 600px), Business Segments, a two-column **Key Statistics** table and a Key Assets grid.
- **Tables:** the shared grid with column presets per view, Sort pills, Grid/List toggle, and +/− density.
- **Toasts:** dark card bottom-left with the build/update message.

## Ledger & Lot mapping (proposed, awaiting user sign-off)
| Bull sim | Ledger & Lot |
|---|---|
| Company (overview) | Company. Same page: ticker, KPI row, Overview/Financials/Segments/Peers, Key Stats, Key Assets = top firms |
| Livestock | Firms. Every store, factory, farm and mine as one grid; drill into a firm opens its 3×3 unit layout |
| Breeding / Genetics | Products. Catalog, recipes, quality build-up, tech |
| Rodeos / Standings | Markets. Per city × product: market size, shares, ratings, competitors |
| Divisions | Divisions / subsidiaries (later pass) |
| Ranch | Map. City grid, plots, land prices |
| Market | Finance. Loans, bonds, stocks, takeovers |
| Activity | Activity / ledger journal |
| Terminal | Terminal. Dense multi-panel desk view, PC only |
| Inbox / Settings | same |

Top-bar stat cells: Date `Y1 W1`, Cash, Firms, Products, Credit. Status bar: `Y1 W1 · CASH · NET · FIRMS`.
