# Capitalism Lab / Capitalism II — Mechanics Research

Purpose: understand the *mechanics* of Enlight's Capitalism II / Capitalism Lab (Trevor Chan) so that Ledger & Lot can design its own spreadsheet-driven equivalent. Nothing here is code or assets from the game. Local data tables were read only to describe their **schema and aggregate statistics**.

Compiled 2026-09-30.

## Source key and confidence labels

| Tag | Meaning |
|---|---|
| **[MANUAL]** | Official *Capitalism II User Manual* (Enlight, 2001), shipped on Steam: <https://cdn.cloudflare.steamstatic.com/steam/apps/638200/manuals/Cap2_manual.pdf>. Page numbers are the printed page numbers. Capitalism Lab is built on the Cap II engine, so most core rules carry over, but Cap Lab has changed some numbers. |
| **[OFFICIAL]** | capitalismlab.com feature, FAQ, or modding pages (URL given inline). |
| **[DEV]** | A statement by Enlight staff (usually "David", the Community Manager) on the official forum <https://www.capitalism2.com/forum/>. |
| **[COMMUNITY]** | Player findings or guides. Treat as empirical, not authoritative. |
| **[DATA]** | Derived from the local `Data\*.DBF` tables (Capitalism Lab install). |
| **[INFERRED]** | My own inference by cross-checking sources and data. It is flagged wherever it appears. |

Exact formulas are rarely published. Only two are: the overall product rating formula and the manufactured quality formula, both in the Cap II manual. Everything else is described qualitatively or measured empirically by players.

---

## 1. Consumer purchase model

### 1.1 Overall rating (published formula)

[MANUAL p.111–112, "Calculating the Overall Rating"]. The manual says the formula is "for your reference only":

```
Rating = (QR × QC)/60 + (BR × BC)/60 + ((StdPr − SellPr) × PC)/StdPr
```

- QR = quality rating (0–100). QC = quality concern.
- BR = brand rating. BC = brand concern.
- StdPr = the product's standard price. The manual describes it as "predefined… for the internal calculations only and is not displayed". It corresponds to `PRICE` (+ `RD_PREMIUM`) in the product table, adjusted for city wage and inflation; see §1.4.
- SellPr = the selling price. PC = price concern.
- The concerns are percentages and "their sum is always 100%" [MANUAL p.77, p.111]. This holds for all 147 rows of the local table, where PRICE_CN + QUALITY_CN + BRAND_CN = 100 [DATA].

How the formula behaves:
- Quality and brand contribute linearly, scaled by their concern weights. The /60 normalises each term so that a strong product lands near the 0–100 display range.
- The price term is **zero at the standard price**. It is positive when you sell below standard and negative when you sell above. A 10% discount adds 0.1 × PC rating points.
- Brand rating = brand awareness (0–100) + brand loyalty (0–100) [MANUAL p.37, 113]. Loyalty can be **negative** [MANUAL p.115].
- Concerns "vary slightly from city to city because of cultural variations" [MANUAL p.112].

Worked example from the manual (p.28): a bed with brand 24, quality 89 and price $325 has an overall rating of 75. Competitor beds are cheaper with lower brand and quality, and rate 71. The UI shows each product's rating next to the **city average** for the same product.

Rating bar UI [MANUAL p.25–26]: a stacked bar with yellow = price attractiveness, green = quality and orange = brand. The segment sizes show *why* consumers buy the product. A heavily discounted product can show only a yellow bar.

### 1.2 How demand is split between competitors

Not published as a formula. What is documented:
- "Most people will prefer a product with a higher overall rating… There is always a group of consumers who are more price-sensitive and will buy a lower-cost product even if it has a lower overall rating" [MANUAL p.112]. This implies a probabilistic, logit-like share by rating plus a price-sensitive segment, **not** winner-take-all.
- **Local competitors** are off-map firms in every city. They appear as the white slice of the market-share pie and are "sometimes… the major competing force". They have average price, quality, brand and rating per product per city [MANUAL p.75–76, 120]. In effect this is a background market that the player competes against.
- The COO pricing policy targets ratings relative to the competition: Normal is about equal to competitors, Aggressive about +10 points and Very Aggressive about +20 points [MANUAL p.125]. Cap Lab replaced this with a slider from "Maximize Profit Margin" through "Balanced" to "Maximize Market Share" ([OFFICIAL] <https://www.capitalismlab.com/improvements/management-policies/>). Both versions make **relative rating** the pricing lever.
- [COMMUNITY] A Steam guide says to undercut local competitors' overall rating by about 7 points to grab share, then hold about 2–3 points of advantage once you have 50%+ share. It also notes that lowering price is useless if your units are at 100% utilisation (<https://steamcommunity.com/sharedfiles/filedetails/?id=2969285443>).
- Market share = your sales ÷ total sales of that product in the city over the period ([COMMUNITY] <https://www.capitalism2.com/forum/viewtopic.php?f=11&t=3992>).
- **Store-level factors** add to product rating: location traffic index, retail demand bonus, specialisation and chain size (see §3).
- **Supply caps sales.** Sales unit capacity and stock limit how much demand is realised. The UI shows supply (blue) against demand (red) bars [MANUAL p.25, 37–40].

### 1.3 Market size: population, wages and necessity

- Per-capita demand: `DEMAND` is "the annual demand from a single consumer for the product on average" (range 0.001–999) ([OFFICIAL] modding docs <https://www.capitalismlab.com/mod/advanced-modding/advanced-modding-products/>). City market potential is therefore roughly population × DEMAND × modifiers [INFERRED].
- **Population** "directly affects the total demand" [MANUAL p.42]. In the data, city populations range from 14 to 90 in table units (mean 43) across 139 cities [DATA].
- **Necessity index** (0–10 in the data, shown ×10 as 0–100 in game) [OFFICIAL modding]. "The demand for necessary goods is fairly constant, because people must buy them even if the price… is not attractive. Conversely, the demand for non-necessary goods is influenced mainly by the attractiveness of the goods. Therefore, cutting the price does not always result in decreased profit" [MANUAL p.77]. In other words, **necessity lowers price elasticity**. With Complex City Economy, "Products with a high necessity index (e.g. toothpaste) are less affected by Spending Level than those with a low necessity index (e.g. cars)" [MANUAL p.29].
- **Spending Level** (consumer ability and willingness to spend) and **Salary Level** (labour cost) vary by city. **Economic climate** has five states: Boom, Prosperous, Normal, Recession and Panic. Boom raises demand and also wages. Firm openings stimulate a city's economy, and mass closures can push it into recession [MANUAL p.29–30].
- `WAGE_RATE` per city ranges from 20 to 95 (mean 68) [DATA]. [COMMUNITY]: "Cities with a high wage rate will spend more on expensive items with a low necessity index" (<https://www.capitalism2.com/forum/viewtopic.php?t=4355>). Players complain that **total market size is not shown transparently** in that same thread.
- Product life-cycle fields: `OUTBY` (phased out by another product), `OUTSPEED`, `OUTREMAIN` (residual demand after phase-out) and `OBSOLETE` (continuous annual demand decline) [OFFICIAL modding]. Example from the data: Mobile Phone is phased out by Camera Phone (speed 10), and Camera Phone by Smart Phone (speed 20) [DATA].

### 1.4 Price fields

- `PRICE` is the standard price. `RD_PREMIUM` is "the component of the product price that is NOT affected by inflation nor wage rates". Example: a smartphone with PRICE 600 + RD_PREMIUM 200 has a standard price of 800 [OFFICIAL modding]. The inflation/wage-indexed part is therefore PRICE, and the premium stays fixed.
- There is an upper limit on the selling price you can set [MANUAL p.27].

---

## 2. Firm and building model

### 2.1 The 3×3 layout

- Every operating firm has a **3×3 grid of 9 unit slots** [MANUAL p.31]. Cap Lab's multi-floor retail option (Subsidiary DLC) allows up to **3 floors**, each a new 3×3 grid, with overhead rising in proportion to the number of floors ([OFFICIAL] <https://www.capitalismlab.com/subsidiary-dlc/multiple-floors-system-retail-stores/>).
- Units are **linked** along grid adjacencies by double-clicking the link line. Goods flow only along links: "Without the linkage, both of the units will become idle" [MANUAL p.23]. An advertising unit linked to a sales or manufacturing unit advertises that product [MANUAL p.32].
- The **Layout Library** saves and pastes layouts. Combined with **Auto Link** (unsupplied purchase units find suppliers on their own) and COO delegation, this is the scaling mechanism [MANUAL p.24, 130].
- Firm **size** (S/M/L for factories and farms) changes setup cost, monthly cost, capacity, productivity and headcount per unit [MANUAL p.21, 31].

### 2.2 Unit catalogue (Cap II numbers) [MANUAL p.31–64]

| Unit | Where | Setup | Workers | Levels? |
|---|---|---|---|---|
| Purchasing | retail, factory, farm | $50k | 2 / 4 | yes |
| Sales | all producing firms + retail | $100k | 4 / 8 | yes |
| Inventory (buffer, several× capacity, low cost) | most | $50k | 1 | **no** |
| Advertising | most | $5k | 1 | **no** (the CMO boosts efficiency instead) |
| Manufacturing | factory | $300k | 6 / 12 / 24 by S/M/L | yes |
| Private labeling (rebrand others' goods) | dept store, factory | $100k | 6 | yes |
| R&D | R&D centre (max 9) | — | — | yes |
| Crop growing / Livestock raising / Livestock processing | farm | $100k | 16 | yes (different curves) |
| Mining / Logging / Oil extraction | mine, camp, well | — | — | yes |

Labour: every worker costs a flat **$2,000/month** in Cap II [MANUAL p.23]. Executives cost six figures.

### 2.3 Unit level, training and capacity [MANUAL p.23, 39–41, 49, 59, 61, 63]

- Levels run from 1 to 9. Workers become "experienced" through training spend and **utilisation**: "Workers who work to their capacity will learn faster than workers who are idle". When all of a unit's workers are experienced, the unit gains a level.
- A per-firm **Training slider** sets spending on training and equipment. It is reported as its own expense line.
- Level is **lost** when the unit changes product, and when new production tech is applied (the size of the loss depends on the tech gap). In Cap Lab, product-class expertise prevents the tech-upgrade loss (§6).
- Standard curve (Purchasing, Sales, Manufacturing, Private labeling, Livestock raising, raw-material units):

| Level | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| Productivity | 100% | 130% | 160% | 200% | 250% | 300% | 360% | 430% | 500% |
| Capacity | 100% | 125% | 175% | 200% | 250% | 300% | 375% | 437% | 500% |

- Crop growing capacity runs 100% → 500% in +50% steps. Livestock processing runs 100% → 260% in +20% steps.
- **Bottleneck diagnosis table** [MANUAL p.41], a useful pattern for our UI:

| Supply vs demand | Utilisation | Diagnosis |
|---|---|---|
| S < D | 100% | capacity at peak |
| S > D | 100% | capacity at peak |
| S < D | < 100% | insufficient supply |
| S > D | < 100% | low demand |

### 2.4 Operating costs (Cap II) [MANUAL p.43–66]

| Firm | Setup | Monthly |
|---|---|---|
| Discount Megastore | $1.8M | $180k |
| Department store / Supermarket / Auto / Hardware / Furniture | $1.0M | $100k |
| Other specialty stores | $0.5M | $50k |
| Factory S/M/L | $0.75M / $1.5M / $2.5M | $50k / $100k / $180k |
| Farm S/M/L | $0.75M / $1.0M / $1.8M | $50k / $100k / $180k |
| R&D centre | $1.5M | $100k |
| Mine / Oil well | $5M | $300k |
| Logging camp | $1.5M | $100k |
| Apartment | $5–10M | $100–200k |
| Commercial building | $10–18M | $200–360k |
| Headquarters | $3M | $100k |

Building cost = land + construction [MANUAL p.21].

Freight cost grows with distance and with the product's `FREIGHT` index (1–100). Cap Lab adds freight categories with cost indexes: GENERAL 100, REFRIG 120, BULK 80 [DATA Freight_Cat]. "Cargo units" hold roughly equal *value*, so one cargo might be a few cars or thousands of shampoos [MANUAL p.34].

---

## 3. Retail

- **Store types.** Cap II has 17 (table above). Cap Lab's `Retail_Store_Products.DBF` maps **17 store build codes** to product classes [DATA]:
  - Single-class specialists: Apparel, Auto, Footwear, Furniture, Leather, Sport, Toy.
  - Multi-class specialists: Computer (Commun, Computer, Software), Cosmetic, Drug, Electronics (5 classes), Jewelry & Watch, Supermarket (7), Convenience (6).
  - Generalists: Department (23 classes), Discount (20) and General store (24, includes Auto).
- **Product slots.** Up to 4 products per store per floor, so up to 12 with 3 floors ([OFFICIAL] multi-floor page; [COMMUNITY] <https://www.ctnet.co.uk/capitalism-lab-retail-guide/>). A common layout is 1 purchase unit feeding 2 sales units.
- **Specialisation bonus.** "speciality stores will enjoy greater demand for its products than… an adjacent department store", at the cost of flexibility [MANUAL p.44]. [COMMUNITY] measured a specialty store selling about 2× a department store at the same location, and drug stores 3–8× at first, settling above 2× (Steam guide above). [COMMUNITY] also reports that discount, general and department stores do not get the specialty "increase in demand", but megastores (4×4 footprint versus 2×2) have far higher volume at lower margin (<https://www.capitalism2.com/forum/viewtopic.php?t=5589>).
- **Customer Traffic Index (0–100).** Every location has one. "Stores in high-traffic areas see greater demand." It is highest at the city centre and falls toward the edges [MANUAL p.42]. **Retail Demand Bonus** (stars) "magnifies the effect of customer traffic" and rises with (1) specialising in one product class, (2) building more stores of the same type in the city (chain recognition, which also benefits existing stores) and (3) high-traffic sites ([OFFICIAL] <https://www.capitalismlab.com/new-content/retail-simulation-enhancement/>). No formula is published. [COMMUNITY] estimates about 3 traffic points ≈ +1 overall rating point (<https://www.capitalism2.com/forum/viewtopic.php?t=8783>).
- **Shopping malls** (Service DLC): mall traffic comes from area traffic, service firms (for example restaurants), product range breadth and the average rating of all tenants. The boost is shared by every store, so "the mix is the strategy". Lease renewal alerts fire when rent is 10% or more above market ([OFFICIAL] <https://www.capitalismlab.com/shopping-mall/>). `Service_Firm_Products.DBF` has a `TRAFFIC_EF` field (traffic effect per service class); it is empty in this install [DATA].
- **Site selection checklist** [MANUAL p.42]: competitor strength, city population, land cost, freight from suppliers and availability of central sites.
- **Pricing guidance**: "If the rating is too low then your best bet is to immediately lower the price" ([OFFICIAL] Beginners Guide <https://www.capitalismlab.com/beginners-guide-gameplay-basics/>). In Cap II the COO "stops the purchase if the cost is higher than the selling price" [MANUAL p.124]. Cap Lab adds a "Never sell products below costs" policy toggle.
- **Private labeling** puts your brand on bought goods. It is useful under a Corporate or Range brand strategy, but inferior quality "will damage the entire brand" [MANUAL p.45–46].
- **E-commerce** (Digital Age): there is a customizable cap on e-commerce share, with a reference level below 20% of total retail ([OFFICIAL] <https://www.capitalismlab.com/version100/>). `Product_Freight.DBF` has an `ECOMMERCE` Y/N flag per product [DATA].

---

## 4. Production

### 4.1 Recipes [DATA Manufacturing.DBF]

- 110 recipes, one per output product (no alternative recipes). Each has up to 3 inputs, and each input has a quantity and a **quality weight** (`IQUA1..3`).
- Input count: 23 recipes use 1 input, 41 use 2 and 46 use 3.
- `OQTY`: units produced per batch (1 to 300; for example Cola = 50 per batch from 1 aluminium + 5 corn syrup).
- `PROD_SPEED`: 100 for 103 recipes and 200–400 for 7. Car = 300.
- Natural resources [DATA Natural_Resources.DBF]: 10 items (aluminium, coal, chemical, gold, iron, lithium, silica, silver, timber, oil). Fields:
  - `FIRMTYPE` (MINE, FOREST, OIL) and `SPEED`
  - `RES_COST`, `RES_QTY` (reserve size) and `MAX_SITE`
  - `CONVERSION`, for example 2000 lb per ton
  - `QUALITY_LO` / `QUALITY_HI`: deposit quality rolls 50–90, or 50–100 for gold, silver and oil
- Farms [DATA]:
  - 12 crops, each with `SOW` and `HARVEST` months plus `TEMP` and `RAIN` suitability.
  - 4 livestock types, each producing up to 3 products (for example cattle → beef, milk, leather).
  - Livestock product `SPEED` with seasonal `SMONTH`–`EMONTH` (wool only in months 6–10).
  - Crop and livestock quality rises with **unit level**, not tech [MANUAL p.60, 113].

### 4.2 Quality formula (published) [MANUAL p.47–48, 97]

```
ProductQuality = Σ_i (InputQuality_i × w_i)  +  TechWeight × (FactoryTech / WorldTopTech)
where Σ w_i + TechWeight = 100%
```

Manual example (textiles): cotton quality 71 at 50% weight gives 35.5. Tech 30 against a world top of 100 at 50% weight gives 15. Quality ≈ 50.

- **"A high production level does not guarantee a high quality rating"**. Tech quality is *relative to the world's top tech*. The top tech starts at 100 for every product and ratchets up when anyone releases higher tech, so "launching a new product with an unprecedented technology level… can cause existing products to become inferior" [MANUAL p.48].
- [DATA + INFERRED, confirmed against three official examples] The `IQUA` columns are the input quality weights, and **TechWeight = 100 − ΣIQUA**:

| Product | ΣIQUA | TechWeight | Official check |
|---|---|---|---|
| Car | 30+30+10 = 70 | 30% | matches manual: "30% … Production Technology and 70% … raw materials" |
| Mobile phone | 15+5 = 20 | 80% | matches beginners guide: "80% of the quality is determined by Production Tech" |
| Textile | 50 | 50% | matches the manual example |

  Across all 110 recipes the tech weight runs from 10% to 100% (mean 60%, median 60%). About 40% of recipes are 50% tech.
- `TECH_IMPT` (0–9) on semi-products is "used by AI companies in the game only" [OFFICIAL modding]. It is a hint for AI R&D priority.
- Production speed = recipe `PROD_SPEED` × unit productivity (level table) × firm size [INFERRED from MANUAL p.21, 49].
- Manufacturing units auto-select their output from whatever inputs arrive. If several outputs are possible, a Set Production button appears [MANUAL p.47].

---

## 5. Brand and advertising

### 5.1 Brand structure [MANUAL p.113–118; OFFICIAL <https://www.capitalismlab.com/resources/gameplay-faq/brand/>]

- **Brand rating = Awareness (0–100) + Loyalty (0–100, can go negative).**
- Each component is "the percentage of the city population aware/loyal × their average level", so brand is **per city**.
- Awareness rises with heavy advertising, long time on sale, wide distribution and a large customer base [MANUAL p.114].
- Loyalty "cannot exist without the prior purchase and use". It rises faster when awareness is higher, rises with satisfaction (quality) and requires *consistent* quality. Bad experiences make it fall or go negative. **Brand scope** dilutes loyalty: the more products under one brand, the less "dedicated" the brand looks [MANUAL p.114–115].
- **Brand strategies:**
  - **Corporate**: one brand for everything. Cheap to launch new products, but loyalty suffers and a weak product damages all of them.
  - **Range**: one brand per product class. The same trade-offs, to a lesser degree.
  - **Unique**: one brand per product. No cross-contamination, but every product needs its own advertising.

  Switching strategy **resets every brand rating to 0**. A merger into a Unique-brand acquirer also resets acquired products' brands [MANUAL p.89, 108, 115–118].
- The HQ **Public Relations** department spends on corporate brand awareness and loyalty and only works under the Corporate strategy. It "helps to lessen the effects of negative brand loyalty" [MANUAL p.68].

### 5.2 Advertising [MANUAL p.32–33, 117–120]

- An advertising unit links to a product and then to a **media firm** (TV, radio or newspaper; these are buyable firms). It has a monthly spend slider per product.
- Media metrics: CPM (cost per thousand), Rating Points (reach ÷ coverage, as %), daily and monthly frequency. "A person must be exposed to an advertisement at least three or four times before the person can recognize the brand", so too little frequency does nothing. The player balances **frequency vs reach vs duration**.
- Saturating ads "may have a negative effect on brand loyalty if you cannot satisfy the increase in demand" [MANUAL p.34].
- The four-scenario matrix [MANUAL p.119–120]:

| | Little advertising | Heavy advertising |
|---|---|---|
| **Low quality** | stays low, negative loyalty | early spike, then decay; loyalty low or negative |
| **High quality** | slow organic build | high awareness, high loyalty, high demand |

- **Decay and maintenance** [COMMUNITY] (<https://www.capitalism2.com/forum/viewtopic.php?t=8281>):
  - Spending at or below a population-scaled *maintenance* level only offsets erosion; brand stays flat, or at 0 if it never started.
  - Growth needs spending **above** maintenance.
  - Bigger cities need proportionally more.
  - AI Unique-brand competitors spend $1–4M per month per product.
- Media firms themselves set a content budget (which drives rating points) and next month's CPM [MANUAL p.72].

---

## 6. Technology and R&D

- **Production tech** is per product per corporation. Its quality effect is relative to the world top tech (§4.2). Units must be explicitly **upgraded** to new tech, which costs unit levels [MANUAL p.49–50, 55].
- **R&D gain table** [MANUAL p.54]:

| Duration | 6 mo | 1 yr | 2 yr | 3 yr | 5 yr | 10 yr |
|---|---|---|---|---|---|---|
| Tech gain | 1 | 3 | 7 | 11 | 20 | 50 |

- **Team size** (linked R&D units, 1–9) has diminishing returns. Example: a 3-unit team for 5 years gains 20 × 240% = 48.

| Units | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| Multiplier | 100% | 170% | 240% | 295% | 350% | 390% | 430% | 455% | 480% |

- Modifiers:
  - +20% per R&D unit level.
  - **Catch-up**: research is faster when a competitor already has higher tech, through diffusion and reverse engineering [MANUAL p.55].
  - Cap Lab boosts catch-up when a competitor is above 100 and you are far behind ([OFFICIAL] <https://www.capitalismlab.com/subsidiary-dlc/product-customization/>).
- **New product invention**: `CANINV_YR` (first year it can be researched), `INVENT_YR` (years to invent) and `PARENT1/2` prerequisites [OFFICIAL modding]. 16 of 147 products have invention requirements, for example Smart Phone (can invent from 2000, 30 years) and HUD glasses [DATA].
- **Buying technology**: the CTO or CEO office can "Offer to Acquire a Technology" from a rival at a negotiated price. The tech becomes available immediately, and units still need upgrading [MANUAL p.70]. You can also sell your own tech [MANUAL p.17].
- **Technology Disruption** (Cap Lab option): all tech levels decay 10% per year. It is incompatible with Product Customization ([OFFICIAL] <https://www.capitalismlab.com/new-features/technology-disruption/>).
- **Product Class Expertise** (Cap Lab): each expertise point in a class gives +1% R&D performance for that class, and applying tech in that class does not lower unit levels.
- **Knowledge Points** (renamed from Skill Points in V10): earned by completing goals and spent on executive expertise and on import/export deals. They can be turned off, and the initial amount and amount per goal are configurable ([OFFICIAL] <https://www.capitalismlab.com/new-features/product-class-expertise/>, <https://www.capitalismlab.com/version100/>). `Product_Classes.DBF` has an `EXPERTISE` Y/N flag per class [DATA].
- **Digital Age DLC**: separate software and internet tech trees. `Tech.DBF` has 50 techs (29 SOFTWARE, 21 INTERNET) with `CANINV_YR` and up to 2 parents with minimum parent levels (`PARENT1_LV`). This makes a true tech DAG rather than the flat per-product levels used for goods [DATA].

---

## 7. Finance

### 7.1 Statements and reports (Cap II baseline) [MANUAL p.85–93]

- **Balance sheet.**
  - Assets: Cash, Inventory, Business Assets (buildings and facilities), Land & Natural Resources, Stocks owned.
  - Liabilities: Bank Loans only (bonds are added by the Banking DLC).
  - Equity: Common Stock (up on issue, down on buyback) and Retained Earnings.
  - Columns: Total, YTD change, Last-year change.
- **Income statement.** Columns: current month, last month, YTD, lifetime.
  - Operating revenue.
  - Operating expenses: Cost of Sales, Salaries, Operating Overhead, Advertising, Training & New Equipment, Write-offs.
  - **Operating profit.**
  - Other profit: Stock Return, Increase in Asset Value (land revaluation), Loan Interest.
  - **Net profit**.
- **Net profit includes mark-to-market stock gains and land revaluation**, so the game declares that "when we refer to profit or earnings, it always means the operating profit" [MANUAL p.88]. **Loan interest sits below operating profit**, which caused real player confusion (§10).
- **Ratios page ("Statements")**: Net worth, market value, ROE, ROA, dividend yield, total return, operating and net margin, inventory turnover, asset turnover and equity-to-assets [MANUAL p.91–92]. V10 adds ROA on market value versus acquisition cost and total leasable area ([OFFICIAL] V10 page).
- **Firm-level income statement** is available via the "$" button on a firm [MANUAL p.93]. Product-level reporting shows annual revenue and **gross** profit only [MANUAL p.84].
- Graphs: 12-month and 30-year history for expenses, net profit, revenue, net worth, operating profit and stock price. 10-year history for cash, inventory, assets, land, stocks, loans, dividends, salaries, advertising, training and write-offs [MANUAL p.84–85].

### 7.2 Loans and credit (Cap II / base Cap Lab)

- Borrowing and repaying happen at the government Bank or Investment Bank.
- **Credit limit "determined by two factors: the equity and profitability of your corporation"**.
- The interest rate is **floating** ("fluctuates from time to time") [MANUAL p.109].
- [OFFICIAL] Beginners Guide: you can "effectively double your starting capital by borrowing up to 100% of your current assets".
- [COMMUNITY] about 10% per year; the limit grows with profit.
- **Out of cash**: you are forced to choose between borrowing, issuing shares, selling stocks, closing firms or declaring bankruptcy. Bankruptcy liquidates land and stocks, repays loans first, and passes any remainder to shareholders [MANUAL p.109–110].

### 7.3 Equity [MANUAL p.101–108]

- **EPS uses operating profit**, not net profit, "because of game design considerations… not affected by the price fluctuation of stocks that the corporation owns". P/E = price ÷ EPS.
- **Stock price**: "The market determines the stock price" [MANUAL p.101]. [DEV] it is "determined mainly by the profitability and the net worth of the company", where profitability means operating profit (<https://www.capitalism2.com/forum/viewtopic.php?t=4854>). Other influences:
  - The Investor Relations budget raises stock attractiveness [MANUAL p.69].
  - The economic state matters, unless Cap Lab's "Alternative Stock Sim" is on, which also bans trading between parent and subsidiaries ([OFFICIAL] <https://www.capitalismlab.com/new-content/stock-market-enhancement/>).
  - Cap Lab has a $1.00 minimum bid; below it an automatic **reverse split** happens.
- **Issuing shares**: the issue price must be at or below the current price. The maximum issue size depends on profitability and issue price. There is a cooldown ("cannot be issued too frequently"). The manual warns about the dilution and takeover risk [MANUAL p.107–108].
- **Buyback**: reduces shares outstanding, which raises EPS and the controlling percentage. Example: 50% of 1,000,000 shares becomes 52.63% after a 5% buyback [MANUAL p.104–105].
- **Tender offer**: needed when all shares are held privately. The bid must exceed market. Some holders never sell [MANUAL p.105]. [COMMUNITY] direct buyout asks are at least 50% above market.
- **Dividends**: set as a **payout ratio** (DPS = EPS × ratio) in the HQ Financial Department, paid annually, starting at 0 [MANUAL p.108].
- **Control thresholds**:
  - More than 50% gives **control**: the acquirer's chairman becomes chairman and gets access to the target's cash for stock investment. Below 50% control is lost immediately; if nobody holds 50%, the CEO controls.
  - Mutual control goes to whoever initiated first.
  - 75% or more allows a **merger**, paid in cash or with new shares (dilution can flip control). The target's assets and technologies are consolidated [MANUAL p.106–108].
  - Single player: you lose if taken over (50%). Multiplayer: you lose at 75% plus a merger [MANUAL p.15].
- **Anti-manipulation rules**: a controlled corporation cannot buy stock you personally own, and so on [MANUAL p.107].
- **Personal vs corporate wealth**: the player has personal cash, stocks and mansions. The CEO salary cap is tied to last year's profit [MANUAL p.69–70].

### 7.4 Banking & Finance DLC (Cap Lab)

- **Player-run banks** ([OFFICIAL] <https://www.capitalismlab.com/bank-simulation/>, <https://www.capitalismlab.com/banking-dlc/bank-deposits/>):
  - A Bank HQ plus branches.
  - Deposits: savings accounts (lowest rate) and time deposits from 6 months to 5 years (longer terms pay more).
  - Deposit volume depends on deposit rate, service quality rating, bank brand and branch location.
  - Loans are assets and deposits are liabilities; the spread is net interest income.
  - **Capital ratio** = equity ÷ total assets.
  - Loan defaults rise in slowdowns (an "economic impact of loans" setting).
- Borrowing comes from AI banks, often competitor-owned. Settings include initial interest spread, personal savings rate modifier and per-company deposit caps ([COMMUNITY review] <https://www.ctnet.co.uk/capitalism-lab-banking-finance-dlc-an-introduction/>).
- **Corporate bonds** ([OFFICIAL] <https://www.capitalismlab.com/banking-dlc/corporate-bonds/>):
  - Terms of 5, 10, 15 or 20 years.
  - Coupon rises with term and with worse credit. Example: 5-year at 5.5%, 10-year at 6.5%.
  - **Credit rating AAA…D on 10 grades** (AAA, AA, A, BBB investment grade; BB through D junk), based on **cash flow and debt-to-equity**.
  - Must be redeemed at maturity.
  - Secondary market prices move with the **central bank rate** and issuer health.
  - Municipal and sovereign (treasury) bonds are also investable.
- Other DLC features: insurance companies (float investing), venture capitalists, stock splits, special dividends, a global stock market of real large-caps, and buying bankrupt competitors.
- `Stocks.dbf` holds 30 real-world large-caps with price, P/E, dividend yield, book value and market cap fields for the global market [DATA].

---

## 8. Real estate and city

- **Land value** rises with traffic and building density and falls when firms close and traffic drops. It is revalued on the balance sheet and flows through "Increase in Asset Value" into net profit [MANUAL p.21, 87].
- Cap Lab / City Economic Simulation DLC adds more drivers ([OFFICIAL] <https://www.capitalismlab.com/resources/building-real-estate-empire/>, <https://www.capitalismlab.com/ces-dlc/new-game-settings/>):
  - Proximity to community and sports facilities, retail and other firms.
  - Traffic, inflation, real wage growth, GDP growth and economic state.
  - Offices, apartments and retail lift land value more than factories.
  - A Land Price Index setting (100 = normal).
  - Land can be bought and sold as a standalone investment (land plots).
- **Apartments** (player sets rent). Occupancy rises with economic climate, spending level and land value, and falls as rent rises. The report shows a 12-month profit and occupancy graph, land and building cost, estimated market value and **annual ROI** [MANUAL p.66–67]. Cap Lab rents also respond to facilities, green space and shopping convenience; housing prices rise in booms.
- **Commercial buildings** work the same way, with corporate tenants.
- The HQ **Real Estate Department** automates rent setting ([OFFICIAL] <https://www.capitalismlab.com/improvements/headquarters/>).
- **Media firms** (TV, radio, newspaper) start city-owned and can be bought. They earn ad revenue, with a content budget and CPM to set [MANUAL p.71–72].
- Cap Lab's CES DLC lets the player run the city as mayor, with commercial and apartment demand settings and new minimap modes.

---

## 9. Corporate structure and executives

- **HQ** is a 3×3 grid of departments; duplicates add nothing [MANUAL p.67–69].
  - Financial (dividend ratio), HR (corporate training programs), PR (Corporate brand only) and Investor Relations (stock).
  - The COO, CMO and CTO each have an office.
  - Cap Lab adds Real Estate, Community Engagement (donations as a % of operating profit) and a CEO office that auto-adjusts prices and ads for inflation ([OFFICIAL] HQ page).
- **COO** [MANUAL p.121–127]:
  - Manages delegated firms: pricing per policy, supplier search, ads, training and stopping loss-making purchases.
  - Cannot add or remove units.
  - Policies: pricing, internal sale, look for better supplies (own firms only or any firm) and better retail products. Cap Lab adds freight concern, never-sell-below-cost and low-supply tolerance.
  - **Expertise** (retail, farm, manufacturing, R&D, raw materials) adds +1 unit level per 20 points to the firms the COO manages. Example: a level 3 unit with a 40-expertise COO becomes level 5. The bonus is lost if delegation ends.
  - Advertising expertise doubles awareness gain at 100. Training expertise doubles training efficiency at 100.
- **CMO** improves advertising efficiency, and in Cap Lab sets ad budgets across units within a budget limit.
- **CTO** runs R&D centres (project choice and duration), applies R&D expertise and buys tech.
- **Salaries** depend on expertise, a hidden personal preference, corporate profitability and the person's attitude toward you. Officers ask for raises and may resign. Severance = weekly salary × years served, plus one month [MANUAL p.122–123].
- **AI personalities** [MANUAL p.93, 127–129]:
  - Main character: Conservative, Moderate, Aggressive or Very Aggressive.
  - 0–100 concerns: R&D, training, upgrade frequency, advertising, dividends, stock investing, takeovers, strengthening ownership, enduring losses to avoid layoffs, buying from own firms.
  - AI strategies: Diversified, Retail-focused, Production-focused or Stock-focused.
  - Cap Lab allows up to 20 AI companies in survival mode and 149 AI persons.
  - [COMMUNITY] AI rarely enters a market where you hold 50% or more unless it has a big quality or brand edge.
- **Subsidiaries** (Subsidiary DLC; [OFFICIAL] <https://www.capitalismlab.com/subsidiary-dlc/subsidiary-control/>, <https://www.capitalismlab.com/subsidiary-dlc/subsidiary-financial-management/>):
  - AI-CEO-led companies that can IPO.
  - Ownership tiers:

| Ownership | What it allows |
|---|---|
| 50% or more | appears on the financial management screen |
| 75% or more | direct control: C-suite, layouts, prices, brand strategy, building firms, internal-sale overrides |
| 100% | capital injection |

  - Share issuance to the parent is available to any controlled subsidiary.
  - Firms can be transferred between parent and subsidiary.
  - Dividend payout ratio can be set by the player or delegated to the subsidiary's CEO.
- **Game score**: wealth, market value of controlled corporations, industries and products dominated, and difficulty. The score decays after 50 years [MANUAL p.96]. The "dominate all industries" goal uses the Dominance report.

---

## 10. What players praise and criticise

### Praised
- **Depth and realism of the supply chain economy.** "The deepest pure business sim available". It is used in university business courses. Its modular DLCs let players layer complexity ([COMMUNITY] <https://strategygame.org/best-economic-simulation-games/>; [OFFICIAL] testimonials <https://www.capitalismlab.com/buy-game/testimonials/>).
- **Delegation** (COO, layout library, auto-link) reduces micromanagement; reviewers praise "minimal micromanagement through delegation" ([COMMUNITY] <https://www.ctnet.co.uk/review-of-capitalism-lab-2021/>). Other players say there is far too much micromanagement, so opinion is split.
- **Customisation and modding**: custom games, scripts, DBF modding and in-client mod browsing.
- **Transparent core trade-offs**: concerns, the rating bar and the published quality formula make price, quality and brand decisions legible.
- **Analysis Mode for factories** (Cap Lab) is praised as a fix. It consolidates input cost, freight, quality, stock and supply/demand onto one screen and filters suppliers to those offering the specific input ([OFFICIAL] <https://www.capitalismlab.com/analysis-mode-factories/>). This tells us the original per-unit drilling was a pain point.

### Criticised
- **Dated, quirky UI**: "functional but dated" graphics, an interface that is "quirky, more than difficult to use" and a steep learning curve (ctnet review above). Forum polls ask for scalable UI, larger minimaps, better tooltips and hover highlighting, and native resolutions; one modder called the UX "painful" (<https://www.capitalism2.com/forum/viewtopic.php?t=5192&start=10>, <https://www.capitalism2.com/forum/viewtopic.php?t=5784>).
- **No cash flow statement.** A forum poll got **42–0** in favour (<https://www.capitalism2.com/forum/viewtopic.php?t=5135>). The proposal asked for standard operating, investing and financing sections. The developer forwarded it to the dev team. One dissenter noted that cash flow statements matter less in a game without much depreciation or amortisation.
- **Profit vs cash mismatch confuses players** (<https://www.capitalism2.com/forum/viewtopic.php?p=8901>):
  - A mining company showed losses on the P&L graph while gaining cash each month, because of non-cash reserve depletion and depreciation.
  - A company showed green operating profit while losing cash, because **loan interest is excluded from operating profit** and therefore from the toolbar P&L graph.
  - The request was "a complete breakdown of cash flow chart". The developer explained that the graph excludes non-operating items on purpose.
- **Market size is opaque.** Players cannot see total city demand or how population, wages and necessity translate into it (<https://www.capitalism2.com/forum/viewtopic.php?t=4355>). Traffic Index effects are undocumented (<https://www.capitalism2.com/forum/viewtopic.php?t=8783>).
- **Rating mechanics are opaque in practice.** Players reverse-engineer thresholds such as "overall rating at 448% or more is where demand really picks up" (<https://www.capitalism2.com/forum/viewtopic.php?t=4151>). Brand stuck at 0 confuses new players because the maintenance spend threshold is invisible (<https://www.capitalism2.com/forum/viewtopic.php?t=8281>).
- **Product profitability stops at gross profit.** The product report shows revenue and gross profit only. Firm P&L exists but there is no product × firm × city contribution view [MANUAL p.84]. Players flip between Firm Summary, Corporate Detail and Product Detail screens to answer "is this product line making money?".
- **Net profit mixes in mark-to-market noise** (stock returns and land revaluation). The game itself tells players to ignore it and use operating profit [MANUAL p.88], so the headline "profit" figures disagree across screens.
- **Accounting bugs and edge cases.** Threads report cash leakage and incorrect profit (<https://www.capitalism2.com/forum/viewtopic.php?t=331>) and an unexplained insurance cash outflow (<https://capitalism2.com/forum/viewtopic.php?t=8978>). Players cannot audit where the cash went because there is no ledger.
- **Stock price is a black box**: "mainly profitability and net worth" with no visible model, and players found exploits (<https://www.capitalism2.com/forum/viewtopic.php?p=17752>).
- **Always-online requirement** and a small community are mentioned in some reviews.

---

## 11. Local data folder: schema summary [DATA]

Path: `C:\Users\jorda\AppData\Local\Capitalism Lab\Data\` (dBase III .dbf plus a few .txt files). Parsed read-only with a minimal Python reader. Numeric values are stored as space- or NUL-padded text.

| Table | Rows | Fields (type/len) and meaning |
|---|---|---|
| `Product_Types_High_Prices.DBF` | 147 | CLASS C8, CODE C8, NAME C21, PRICE N11.1 (std price), RD_PREMIUM N7.1 (price part not indexed to inflation/wage), FREIGHT N3 (freight index 1–100), UNIT/UNITS C (unit names), DEMAND N7.3 (annual per-capita demand), NECESSITY N1 (0–10, ×10 in game), PRICE_CN/QUALITY_CN/BRAND_CN N2 (concerns, sum 100), CANINV_YR N4 (first year researchable), INVENT_YR N3 (years to invent), TECH_IMPT N1 (AI hint for semis), IMPORT C1 ('N' = never imported), PARENT1/2 C8 (prereqs), OUTBY C8 (successor), OUTSPEED N2, OUTREMAIN N2, OBSOLETE N2 |
| `Product_Classes.DBF` | 30 | CLASS, NAME, LOCALCOMP N3 (local-competitor strength: 50 for consumer classes, 0 for raw/semi/farm), MEGACLASS C8, FARMRELATE N3 (0–100 farm-relatedness), EXPERTISE C1 (Y = eligible for class expertise) |
| `Product_Mega_Classes.dbf` | 7 | Fashion; Food & Beverage; Healthcare & Beauty; Electronics & Appliances; Luxury; Software; Semi Products |
| `Manufacturing.DBF` | 110 | CLASS, OUTPUT, OQTY (output per batch), INPUT1–3 + IQTY1–3 (qty) + IQUA1–3 (quality weight %), PROD_SPEED |
| `Tech.DBF` | 50 | CLASS (SOFTWARE 29 / INTERNET 21), CODE, NAME, CANINV_YR, PARENT1/2 + PARENT1_LV/2_LV (prereq tech and min level) |
| `Retail_Store_Products.DBF` | 101 | BUILDCODE → ITEMCODE (store type → product class), 17 store types |
| `Natural_Resources.DBF` | 10 | ITEM_CODE, FIRMTYPE (MINE/FOREST/OIL), SPEED, TERA_TYPE, RES_COST, RES_QTY, MAX_SITE, DISCOVERY, RAW_UNIT, CONVERSION, QUALITY_LO/HI, ELECT_FIRM/CONV (electricity hooks, unused here) |
| `Farm_Crops.DBF` | 12 | PLANT_CODE, ITEM_CODE, SOW, HARVEST (months), TEMP, RAIN (climate suitability) |
| `Farm_Livestock.DBF` | 4 | LSTOCK, PRODUCT1–3 |
| `Farm_Livestock_Products.DBF` | 8 | ITEM_CODE, SPEED, SMONTH, EMONTH (seasonal window) |
| `Product_Freight.DBF` / `Freight_Cat.dbf` | 153 / 4 | product → freight category (GENERAL 100, REFRIG 120, BULK 80, …); ECOMMERCE Y/N |
| `Cities.DBF` | 139 | NAME, COUNTRY, POPULATION N3 (14–90, mean 43), GLOBE_LOCX/Y, LAT/LON, WAGE_RATE (20–95, mean 68) |
| `Stocks.dbf` | 30 | real-world large caps: price, PE, dividend yield, book value, market cap |
| `Buildings.dbf`, `Service_Firm_Products.DBF` | 0 | schema only: building setup/expense/space/electric; service class TRAFFIC_EF |

### Product summary stats

- **147 products**: 91 consumer goods and 56 intermediate goods (24 SEMI, 12 PSEMI plant products, 10 RAW, 4 LSTOCK, 3 LSEMI, 3 PLANT). There are 30 classes.
- **Concern weights**: every row sums to 100.
  - All intermediate and raw classes are a flat **40/40/20** (price/quality/brand).
  - Consumer classes range as follows:
    - Price 20–40: Cosmetics avg 20; Jewelry 40.
    - Quality 15–45: Cigarettes 15; Software 45.
    - Brand 20–60: Jewelry 20; Cosmetics 50; Cigarettes 60.
  - Typical class averages (P/Q/B):

| Class | Price | Quality | Brand |
|---|---|---|---|
| Electronics, Appliances, Phones, Cars, Photo | 30 | 40 | 30 |
| Furniture | 35 | 40 | 25 |
| Toys | 35 | 40 | 25 |
| Beverages | 29 | 29 | 43 |
| Tobacco | 25 | 28 | 48 |
| Cosmetics | 20 | 30 | 50 |
| Apparel | 29 | 33 | 39 |

- **Necessity**: 0 for all intermediates. For consumer goods:
  - Drugs and detergents: 9.
  - Body care: about 9.
  - Food: about 8.
  - Apparel: 4.
  - Electronics: about 3.
  - Toys: 2.
  - Cars and jewelry: 1.
- **Per-capita annual demand** ranges from 0.001 to 50. Cola is the highest at 50, then gum 30 and chocolate 23.
- **Standard prices** range from $0.30 (coconut) to $17,000 (a semi) and $30,000 (electric car).
- **Recipes**: the implied tech weight (100 − ΣIQUA) has mean and median 60% and ranges from 10% to 100%.

---

## Design takeaways for Ledger & Lot

### Keep (proven, legible mechanics)

1. **Concern-weighted rating.** Per product, keep (price, quality, brand) concern weights that sum to 100. Make the price term relative to an indexed standard price, and the quality and brand terms linear. It is spreadsheet-friendly, explainable and tunable per product row. Keep a city-level cultural jitter on concerns.
2. **Necessity as an elasticity dial.** High necessity means demand is insensitive to price and the economy; low necessity means demand is driven by rating and spending level. Market size = population × per-capita demand × spending-level modifier, with the modifier dampened by necessity.
3. **Relative quality via world top tech.** Quality = Σ input quality × weight + tech weight × (own tech ÷ world top tech). Making competitors' R&D erode your quality is excellent tension, and it is a single row per recipe in a sheet.
4. **Unit-level curve and bottleneck matrix.** Capacity and productivity multipliers per level (1.0 → 5.0), learning driven by utilisation and training spend, and level loss on change. Show the 2×2 supply/demand × utilisation diagnosis directly in the UI.
5. **Brand as awareness + loyalty, with scope dilution and quality feedback.** Keep the Corporate/Range/Unique trade-off and the low-quality-plus-heavy-ads trap.
6. **Ownership thresholds.** Keep 50% control, 75% merger and full control, and 100% capital injection. They are simple and create takeover drama.
7. **Background "local competitors"** per city, so markets are never empty and the player always has a benchmark (average price, quality, brand and rating).

### Improve: finance and reporting (our differentiator)

1. **Real double-entry ledger underneath everything.** Every cash movement should be a journal entry with a source tag (firm, unit, product, city, counterparty). The forum bug threads about cash leakage and unexplained outflows exist because players cannot audit. Let them click any number and drill down to the entries behind it.
2. **Three-statement model, including cash flow.** The 42–0 poll is the clearest demand signal we found. Provide an indirect cash flow statement (Operating, Investing, Financing) with a reconciliation from net income to change in cash. Show non-cash items explicitly: depreciation, depletion and revaluation.
3. **One profit definition per label, shown consistently.** Cap Lab's operating profit excludes interest, and its net profit includes unrealised stock and land gains, which confuses players. Adopt a standard waterfall: Revenue → Gross Profit → Contribution → EBITDA → EBIT → **Interest** → EBT → Tax → Net Income. Keep **unrealised revaluation in Other Comprehensive Income or a separate memo**, not in headline profit. The toolbar sparkline should be selectable (EBIT, Net Income or Free Cash Flow) and should default to cash.
4. **Segment and contribution reporting.** A pivotable product × firm × city × month P&L down to contribution margin. Allocate freight, unit salaries, ad spend and an overhead share, not just gross profit. This answers "is this product line making money?" on one screen.
5. **Variance and "why" panels.** For each product in each city, decompose rating changes into price, quality and brand deltas (rating attribution). Decompose profit changes into volume, price, mix and cost (price/volume/mix variance). For stock price, show the valuation model's inputs (EPS, book value per share, growth, sector multiple, sentiment) and how each moved.
6. **Expose market size and the demand curve.** Show total city demand per product, our share and local competitors' share. Offer a what-if preview: "at price X your expected rating is Y and expected units are Z". This is the most-requested missing transparency.
7. **Make thresholds visible.** Show brand maintenance spend versus growth spend, credit limit drivers (equity, profitability, coverage), credit rating drivers (cash flow, D/E) with notch distance to the next grade, issuance capacity and cooldowns, and takeover exposure (largest holders, distance to 50% and 75%).
8. **Debt and capital schedule.** One table listing every loan and bond with rate type, coupon, maturity, next payment, covenants and refinancing need, plus a 24-month cash runway projection.
9. **Comparable periods everywhere.** Month, last month, YTD, last year and lifetime columns, as Cap II already does, plus % change and sparklines. CSV and clipboard export, since the audience thinks in spreadsheets.
10. **Consolidation done right.** Subsidiaries need entity-level statements, intercompany elimination, minority interest and a consolidated view. Cap Lab exposes subsidiaries mainly through operational screens.
11. **Factory "analysis mode" as the default.** Show the recipe, input costs including freight, the quality build-up and the supplier comparison on one screen. Cap Lab had to retrofit this.
12. **Alerts with links.** For example, a supplier above our sell price, a unit at 100% with S > D, brand spend below maintenance, a covenant breach, a lease 10% above market, or cash runway under 3 months. Each alert should deep-link to the fixing screen.

### Simplify or drop

- Keep the 3×3 link grid as an *optional* view. Model the firm as a graph of units in a table (unit, type, input links, output links, level, utilisation) so that a spreadsheet can author layouts.
- Drop flat $2,000 wages in favour of the city wage index, which is already in the data concept.
- Replace undocumented magic numbers (traffic index effect, demand bonus stars) with published formulas in an in-game "Mechanics" glossary. Transparency is part of our pitch.
