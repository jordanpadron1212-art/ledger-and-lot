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
- **Phone (reference only: deferred to the mobile pass, not built in V1, D16):**
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

## Ledger & Lot mapping (signed off 2026-10-01)
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

Top-bar stat cells: Date (real calendar date), Cash, Firms, Products, Credit. Advance buttons `▸ Day` / `▸ Week` / `▸ Month` (D14). Status bar: `DATE · CASH · NET · FIRMS`.

## V1 scope (signed off 2026-10-01, D12–D15)
**Fantasy:** one city and enough cash for a store or two. Stock from wholesalers, set prices, advertise, beat the local competitors, don't run out of cash.

**Platform (D16):** PC only, 1280px and wider, verified at 1280×800 and 1920×1080. **Source (D17):** fragments composed into one shipped HTML file. **Engine rules (D18):** seeded RNG streams, a real-engine what-if, a golden test, loud saves with a 2 MB gate, one consolidated GL entry per day plus a sales sub-ledger, and named phase lists.

**Daily tick (`▸ Day`; `▸ Week` / `▸ Month` run 7 or to-month-end daily ticks), D14.** Real calendar months.
Cadence: daily = sales, deliveries, spoilage, cash · biweekly = payroll · monthly = rent, utilities, interest, depreciation, books close · quarterly = tax payments · yearly = year-end close.

**Tick steps (daily unless noted):**
1. **Rating.** Per product × city, every seller gets a CapLab rating: `QR·QC/60 + BR·BC/60 + (StdPr−SellPr)·PC/StdPr` (`docs/research/caplab-mechanics.md`). Share is split by rating; the formula is ours to design because CapLab's is unpublished.
2. **Market size** = population × per-capita category spend (BLS CE shares) × city wage index. It is shown to the player, unlike CapLab.
3. Stores sell, capped by stock, sales-unit capacity and staff.
4. Purchase units restock from the wholesaler. Wholesale = retail × (1 − Census ARTS gross margin for the category).
5. Costs post on their cadence: wages biweekly (BLS OEWS + ~19% retail benefits), rent monthly (DFW metro retail rent), utilities, ads, interest.
6. Brand grows with ad spend and decays without it.
7. Month close (calendar month end): depreciation, interest accrual, credit-rating update. All money moves through `post()`.

**Player decisions:** lease a store on a plot (type, size; building comes in a later pass, D15) · the 3×3 unit layout (purchase/sales/advertising) and the product range · prices, with a what-if of expected share · ad budget, staffing, training · borrow or repay (limit set by credit rating).

**Tabs:** Company (incl. Financials: IS/BS/**cash flow**, every line drillable) · Firms (grid; drill → 3×3 units + firm P&L) · Products · Markets (size, shares, ratings, "why you're winning or losing") · Map · Finance (loans, rating, runway) · Ledger (journal, search, export) · Settings.

**Products (D12):**
- Grocery: bread, milk, eggs, coffee, soda, frozen pizza
- Apparel: jeans, t-shirts, sneakers
- Electronics: smartphone, laptop, TV
- Drugstore: shampoo, cosmetics, generic medicine

**Scenarios:**
1. Savings start: $250k cash, no debt.
2. SBA start: $150k own funds + $500k loan.
3. Inherited mess: a rundown supermarket, stale stock, weak brand, debt near its limit.

Hardcore mode (bankruptcy ends the run) or normal mode (bailout).

**User answers (2026-10-01):** products as listed (D12); the three scenarios as listed, with Scenario 1 deliberately tight, enough for a convenience store or small drugstore but not apparel (D13); daily tick with monthly close (D14); Dallas–Fort Worth with real metro numbers on an abstract grid map (D15). V1 is lease-only; building comes in a later pass.

**Mobile pass (D16):** phone nav, grid list mode and 360px verification; the user picks when.

**Later passes, in order:** factories + recipes → farms/mines/oil → multi-city + freight → AI corporations → R&D/tech → stocks/bonds/takeovers.
