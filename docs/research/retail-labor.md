# Retail & Labor Economics — Reference Data (US, 2022–2026)

Compiled 2026-09-30 for the Ledger & Lot simulation. Every row has a tier:

- **T1** = exact figure from an official document (government table, SEC filing, or the publisher's own report). "T1-derived" = arithmetic on T1 tables; the formula is in Notes.
- **T2** = from a credible industry survey or benchmark. Treat it as a range, with the tolerance noted.
- **T3** = estimate. The derivation is in Notes.

Key raw sources were downloaded and parsed directly: Census ARTS xlsx (gmper, bes, sales, invent), the BLS OEWS public API (May 2025), Cushman & Wakefield Q2-2026 national MarketBeat PDFs, and the RLB Q1-2025 Quarterly Cost Report PDF.

---

## 1. Gross margin % by retail category

Main source: **Census Annual Retail Trade Survey (ARTS), 2022 benchmarked, "Estimated Annual Gross Margin as a Percentage of Sales"**. URL: https://www2.census.gov/programs-surveys/arts/tables/2022benchmarked/gmper.xlsx (index page: https://www.census.gov/data/tables/2022/econ/arts/2022benchmarked/annual-report.html). ARTS ended with data year 2022. Census has folded it into the Annual Integrated Economic Survey (AIES), so 2022 is the latest kind-of-business gross margin series.

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| All retail | 31.1 | % of sales | T1 | Census ARTS gmper.xlsx (above) | 2022 | 30.6 in 2021; 29.3 in 2019 |
| All retail excl. motor vehicles | 32.9 | % of sales | T1 | same | 2022 | |
| Grocery stores (NAICS 4451) | 28.0 | % | T1 | same | 2022 | 26.6–28.0 over 2017–22 |
| Beer, wine & liquor stores (4453) | 31.1 | % | T1 | same | 2022 | |
| Clothing stores (4481) | 50.6 | % | T1 | same | 2022 | 42.5 in 2020 (markdowns), 52.0 in 2021 |
| Family clothing (44814) | 45.3 | % | T1 | same | 2022 | Men's clothing 60.3 |
| Shoe stores (4482) | 50.9 | % | T1 | same | 2022 | |
| Electronics & appliance stores (443) | 29.4 | % | T1 | same | 2022 | 28.8–33.4 over 2017–22 |
| Furniture & home furnishings (442) | 51.0 | % | T1 | same | 2022 | |
| Health & personal care stores (446) | 32.9 | % | T1 | same | 2022 | |
| Pharmacies & drug stores (44611) | 28.0 | % | T1 | same | 2022 | 23.8–28.0 over 2017–22 |
| Building materials & garden (444) | 35.6 | % | T1 | same | 2022 | Hardware/home improvement proxy |
| Building material & supplies dealers (4441) | 36.0 | % | T1 | same | 2022 | |
| Department stores (4522) | 42.0 | % | T1 | same | 2022 | Volatile: 28.5 (2020) to 45.0 (2021) |
| Warehouse clubs & supercenters (452311) | 24.3 | % | T1 | same | 2022 | |
| All other general merchandise, incl. dollar stores (452319) | 39.4 | % | T1 | same | 2022 | |
| General merchandise, total (452) | 26.8 | % | T1 | same | 2022 | |
| Auto parts, accessories & tire stores (4413) | 48.1 | % | T1 | same | 2022 | |
| Automobile dealers (4411) | 21.8 | % | T1 | same | 2022 | 16–19 before 2021 |
| Sporting goods, hobby, musical instr. (4511) | 44.6 | % | T1 | same | 2022 | |
| Miscellaneous store retailers (453) | 53.6 | % | T1 | same | 2022 | Gifts, office supplies, pets, etc. |
| E-commerce / mail order (4541) | 39.6 | % | T1 | same | 2022 | |
| Gasoline stations (447) | 18.6 | % | T1 | same | 2021 | 2022 suppressed ("S") |
| Jewelry (Signet Jewelers, largest US chain) | 39.5 | % of sales | T1 | Signet FY2026 10-K https://www.sec.gov/Archives/edgar/data/832988/000083298826000055/sig-20260131.htm | FY ending Jan 2026 | Single-firm proxy. Census does not publish NAICS 44831 GM. Independent jewelers run about 45–50% (T3) |
| Convenience stores, inside-store GM | ~33–47 | % of inside sales | T2 (low confidence) | NACS SOI 2025 via https://www.paytronix.com/blog/how-much-do-convenience-stores-make ; https://www.cspdailynews.com/company-news/c-store-foodservice-merchandise-sales-surpass-340b-2025 | 2025 | The blog cites "~47%". Historical NACS merchandise margin is ~33–34% (T3 recollection). Foodservice = 28.5% of in-store sales but 38.9% of in-store gross profit, so food GM is about 55–60%. Fuel margin is separate (cents per gallon) |
| Restaurants: food & bev cost, limited-service | 32.4 | % of sales (median) | T2 (±3 pp) | National Restaurant Association, 2025 Restaurant Operations Data Abstract https://restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/restaurant-operators-kept-food-cost-ratios-in-check-in-2024/ | 2024 | Survey of >900 operators. This is a food-cost ratio, so GM ≈ 67.6% |
| Restaurants: food & bev cost, full-service | 32.0 | % of sales (median) | T2 (±3 pp) | same | 2024 | Historical average ~34% |
| Restaurants: labor cost, full-service | 36.5 | % of sales (median) | T2 (±4 pp) | https://whipplewood.com/insights/financial-benchmarks-for-restaurants/ (citing NRA data) | 2024 | Prime cost (food + labor) is ~60–65% |

## 2. Retail operating cost structure

### 2a. Expense ratios from ARTS (T1-derived)

Sources: ARTS 2022 Detailed Operating Expenses https://www2.census.gov/programs-surveys/arts/tables/2022/bes.xlsx, plus ARTS 2022 sales.xlsx and invent.xlsx (same folder) and gmper.xlsx (2022 non-benchmarked, for consistency with bes).

Formulas:
- Expense % = expense ÷ sales.
- Inventory turnover = sales × (1 − GM%) ÷ average of end-2021 and end-2022 inventory.

Firms with paid employees only. "S" = suppressed by Census.

| Kind of business (NAICS) | Sales 2022 ($B) | Total opex % sales | Payroll % | Fringe % | Rent (land/bldg lease) % | Advertising % | Electricity % | D&A % | Inventory turns (COGS/avg inv) | Sales ÷ avg inventory |
|---|---|---|---|---|---|---|---|---|---|---|
| Retail total | 7,041 | 21.7 | 9.6 | 1.8 | 1.4 | S | 0.3 | 1.2 | 6.9 | 10.2 |
| Auto dealers (4411) | 1,293 | 12.1 | 6.5 | 1.0 | 0.8 | 0.8 | 0.1 | 0.3 | 7.6 | 9.8 |
| Auto parts & tire (4413) | 124 | 31.6 | 17.1 | 2.9 | 1.8 | 0.8 | 0.4 | 1.5 | 2.7 | 5.2 |
| Furniture & home furnishings (442) | 144 | 36.6 | 14.4 | 2.3 | 4.0 | 2.9 | 0.5 | S | 3.4 | 6.9 |
| Electronics & appliance (443) | 93 | 22.9 | 9.9 | 1.9 | 2.0 | 1.5 | 0.3 | 1.1 | 5.9 | 8.4 |
| Building mat. & garden (444) | 512 | 23.3 | 11.2 | 2.3 | 1.3 | 0.6 | 0.3 | 1.4 | 4.3 | 6.7 |
| Grocery (4451) | 858 | 22.6 | 10.7 | 2.7 | S | S | S | 1.5 | 13.0 | 18.0 |
| Beer, wine, liquor (4453) | 70 | 20.4 | 7.7 | S | S | S | S | 0.7 | 5.1 | 7.4 |
| Pharmacies & drug stores (44611) | 336 | 19.0 | 9.7 | S | 1.5 | 0.4 | S | 0.9 | 8.0 | 11.2 |
| Gasoline stations (447) | 736 | 12.2 | 4.4 | 0.7 | 0.9 | 0.1 | 0.4 | 1.3 | n/a | n/a |
| Clothing & accessories (448) | 303 | 33.8 | 12.9 | S | S | 2.3 | S | S | 2.9 | 5.8 |
| Shoe stores (4482) | 40 | 37.9 | 13.0 | 2.1 | S | 2.8 | S | 2.3 | 3.0 | 6.2 |
| Sporting goods/hobby/music/books (451) | 103 | 34.0 | 13.8 | 2.4 | 4.2 | 1.7 | 0.7 | 1.7 | 2.5 | 4.6 |
| Department stores (4521) | 136 | 25.7 | 12.5 | 2.5 | 0.8 | 1.5 | 0.5 | 2.3 | 4.3 | 6.6 |
| Warehouse clubs & supercenters (45291) | 626 | 17.3 | 9.1 | 1.8 | 0.2 | 0.5 | 0.3 | 1.2 | n/a | n/a |
| Other general merch. / dollar (45299) | 100 | 24.9 | 11.2 | 1.7 | 3.2 | 0.4 | 0.3 | 2.0 | n/a | n/a |
| Misc. store retailers (453) | 171 | 35.6 | 15.0 | S | S | S | S | S | n/a | n/a |
| E-commerce (4541) | 1,117 | 28.5 | S | S | S | S | S | S | 6.9 | 11.5 |

Notes on the ARTS ratios:
- **The ARTS rent line understates true occupancy cost.** Owners (Home Depot owns about 90% of its space) and finance-lease accounting move costs into depreciation and interest. Use the CoStar occupancy-cost % (section 2b) for gameplay rent burden.
- Bes.xlsx uses 2017-Census-based weights. GM for these turnover calculations comes from the matching 2022 non-benchmarked gmper.xlsx and differs from the benchmarked table by ≤0.6 pp.
- Fringe ("other fringe" includes payroll taxes) of 1.8% of sales is about 19% of payroll. ECEC (section 4b) puts benefits at about 43% of wages for all private industry, so retail fringe is relatively thin.

### 2b. Sales per sq ft, occupancy cost, store sizes

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Apparel sales/sf; occupancy cost | 375; 7.5 | $/sf/yr; % of sales | T2 (±25%) | CoStar/Datex via https://www.slantcre.com/data/retail-benchmarks | Q3'23–Q2'24 | Occupancy = rent + CAM + tax as % of tenant sales |
| Supermarket sales/sf; occupancy | 550; 3.5 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Department store sales/sf; occupancy | 200; 6.0 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Dollar store sales/sf; occupancy | 300; 4.0 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Home improvement sales/sf; occupancy | 350; 5.5 | $/sf; % | T2 | same | Q3'23–Q2'24 | Big-box leader (Home Depot) is far higher, see below |
| Home goods sales/sf; occupancy | 300; 7.0 | $/sf; % | T2 | same | Q3'23–Q2'24 | Furniture proxy |
| Sporting goods sales/sf; occupancy | 275; 6.8 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Shoes sales/sf; occupancy | 350; 7.0 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Specialty retail sales/sf; occupancy | 325; 7.8 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Beauty supplies sales/sf; occupancy | 936; 5.0 | $/sf; % | T2 | same (Datex) | Q3'23–Q2'24 | |
| Restaurant (full-service) sales/sf; occupancy | 550; 8.0 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Fast food sales/sf; occupancy | 774; 6.2 | $/sf; % | T2 | same (Datex) | Q3'23–Q2'24 | |
| Pet supplies sales/sf; occupancy | 325; 6.5 | $/sf; % | T2 | same | Q3'23–Q2'24 | |
| Home Depot sales per retail sq ft | 599.92 | $/sf/yr | T1 | HD FY2025 results https://ir.homedepot.com/news-releases/2026/02-24-2026-110040985 | FY2025 | |
| Home Depot avg store size | 104,000 (+24,000 garden) | sq ft | T1 | HD 10-K https://www.sec.gov/Archives/edgar/data/354950/000035495025000085/hd-20250202.htm | FY2024 | About 90% of space owned |
| AutoZone sales per avg sq ft | 374 | $/sf/yr | T1 | AZO FY2025 10-K https://www.sec.gov/Archives/edgar/data/866787/000110465925102611/azo-20250830x10k.htm | FY2025 | |
| AutoZone avg store size | 6,767 | sq ft | T1 | same | FY2025 | |
| Walmart U.S. Supercenter avg size | 178,000 | sq ft | T1 | Walmart FY2026 10-K https://www.sec.gov/Archives/edgar/data/104169/000010416926000055/wmt-20260131.htm | FY2026 | Neighborhood Market ~42,000 (T3 recollection) |
| Target typical store | ~125,000 | sq ft | T2 | https://corporate.target.com/about/locations/inside-our-stores | 2024–25 | Small formats 12–40k |
| Best Buy big-box | 35,000–40,000 | sq ft | T2 | Statista / Best Buy corporate (search summary) https://corporate.bestbuy.com/2022/small-format-store/ | 2022 | Small format ~5,000 |
| Supermarket avg size | 42,453 | sq ft | T2 | FMI Supermarket Facts https://www.fmi.org/our-research/food-industry-facts | 2024 | 45,575 supermarkets; avg weekly sales $711,806 |
| Supermarket weekly sales per sf of selling area | 18.55 (2024); 19.59 (2025) | $/sf/week | T2 | same | 2024/25 | About $965–1,020 per selling sf per year |
| Convenience store avg in-store sales | ~2.25 | $M/store/yr | T2 | NACS via https://www.cspdailynews.com/company-news/c-store-foodservice-merchandise-sales-surpass-340b-2025 | 2025 | $341.2B ÷ 151,975 stores |
| Convenience store size | 2,500–5,000 | sq ft | T3 | Industry convention (NACS: legacy ~2,500–3,000; new-builds 4,000–5,500) | — | Not sourced from a fetched document |
| Drugstore (CVS/Walgreens) size | 10,000–15,000 | sq ft | T3 | Company descriptions (recollection) | — | |
| Department store (anchor) size | 80,000–200,000 | sq ft | T3 | Typical mall-anchor range | — | |
| Apparel specialty (mall in-line) | 3,000–10,000 | sq ft | T3 | Typical mall in-line range | — | |

## 3. Commercial real estate

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Retail (shopping center) asking rent, US avg | 25.65 | $/sf/yr | T1 | Cushman & Wakefield US Retail MarketBeat Q2 2026 https://assets.cushmanwakefield.com/-/media/cw/marketbeat-pdfs/2026/q2/us-reports/national/q22026usretailmarketbeat.pdf | Q2 2026 | +2.2% YoY; vacancy 6.0% |
| Retail rent, highest markets | Hawaii 52.73; Miami 43.92; San Francisco 42.30; NYC metro 42.27; San Jose 41.54; Orange County 39.59 | $/sf/yr | T1 | same | Q2 2026 | |
| Retail rent, lowest markets | Akron 13.72; Syracuse 14.06; Buffalo 14.91; Tulsa 15.33; Des Moines 15.37; Pittsburgh 15.57 | $/sf/yr | T1 | same | Q2 2026 | High/low ratio ≈ 3.8× |
| Prime street retail (Manhattan) | several hundred to >1,000 | $/sf/yr | T3 | C&W Manhattan Retail MarketBeat (not fetched) https://www.cushmanwakefield.com/en/united-states/insights/us-marketbeats/new-york-city-area-marketbeats/manhattan-retail | — | Use for "luxury corridor" outliers |
| Industrial asking rent, US avg (NNN) | 10.32 | $/sf/yr | T1 | C&W US Industrial MarketBeat Q2 2026 https://assets.cushmanwakefield.com/-/media/cw/marketbeat-pdfs/2026/q2/us-reports/national/q22026usindustrialmarketbeat.pdf | Q2 2026 | +2.9% YoY; vacancy 6.9%. Taken from search summary; PDF not parsed |
| Industrial in-place rent, US avg | 9.31 | $/sf/yr | T2 | CommercialEdge National Industrial Report https://www.commercialcafe.com/blog/national-industrial-report/ | Aug 2026 | Avg industrial sale price $138/sf YTD (LA $297, Cincinnati $85) |
| Warehouse/distribution rent, low-cost metros | Atlanta 7.38; Houston 7.67; DFW 9.19 | $/sf/yr | T1 | C&W local MarketBeats Q2 2026 (e.g. https://www.cushmanwakefield.com/en/united-states/insights/us-marketbeats/houston-marketbeats/industrial) | Q2 2026 | |
| Industrial rent, high-cost metros | Boston 16.06 (record); Inland Empire/LA/Bay Area ~15–25 | $/sf/yr | T1 / T3 | C&W Boston MarketBeat https://www.cushmanwakefield.com/en/united-states/insights/us-marketbeats/boston-marketbeats/industrial | Q2 2026 | Boston is T1. The CA range is T3 |
| Office asking rent, US avg (gross, all classes) | 38.38 | $/sf/yr | T1 | C&W US Office MarketBeat Q2 2026 https://assets.cushmanwakefield.com/-/media/cw/marketbeat-pdfs/2026/q2/us-reports/national/q2-2026-office-marketbeat.pdf | Q2 2026 | Class A $44.17; vacancy 20.1%. CBRE gives $37.58 (https://www.cbre.com/insights/figures/q2-2026-us-office-market-report) |
| Office rent by region | Northeast 46.64; West 42.18; South 34.82; Midwest 27.57 | $/sf/yr | T1 | same | Q2 2026 | |
| Office rent, highest | NY Midtown South 81.14; NY Midtown 76.98; San Francisco 70.31; San Mateo 68.26; Miami 66.40 | $/sf/yr | T1 | same | Q2 2026 | All classes |
| Office rent, lowest | Rochester 17.50; Detroit 19.78; Syracuse 19.20; New Orleans 20.58 | $/sf/yr | T1 | same | Q2 2026 | |
| Farm real estate (land + buildings), US avg | 4,350 | $/acre | T1 | USDA NASS Land Values 2025 Summary https://www.nass.usda.gov/Publications/Todays_Reports/reports/land0825.pdf | 2025 | +4.3% YoY |
| Cropland, US avg | 5,830 | $/acre | T1 | same | 2025 | Range: Montana $1,320 to Rhode Island $32,900 |
| Pasture, US avg | 1,920 | $/acre | T1 | same | 2025 | |
| Industrial land, US "average" | ~75,000 | $/acre | T2 (very wide; ±10×) | Aggregator figure https://www.duckfund.com/blogs-re/how-much-is-commercial-land-worth | 2025 | No official national index exists |
| Industrial land, rural/exurban | 20,000–150,000 | $/acre | T3 | Bracketed by USDA cropland (lower bound) and Newmark's Columbus example: farmland ~$30k going to >$150k when rezoned (https://www.nmrk.com/perspectives/land-scarcity-and-the-increase-in-industrial-land-prices-throughout-ohio-and-nationally, 403 on fetch) | 2025 | |
| Industrial land, major-metro infill | 500,000–4,000,000+ | $/acre | T3 | Loudoun Co. VA data-center land >$4M/acre (search summary) | 2025 | Roughly $11–90/sf |
| Commercial (retail pad) land, suburban | 250,000–1,500,000 | $/acre | T3 | Derived: ~$6–35/sf typical suburban pad pricing; scaled from industrial land and retail rent levels | — | Gameplay band |
| Commercial land, dense urban core | 5,000,000–50,000,000+ | $/acre | T3 | Derived: $100–1,000+/sf land in Manhattan/SF cores | — | Gameplay band |
| Construction hard cost, office (prime) | 250–940 (typ. 340–575) | $/sf GFA | T2 | RLB Quarterly Construction Cost Report Q1 2025 https://www.rlb.com/wp-content/uploads/sites/4/2023/04/Q1-2025-QCR.pdf | Q1 2025 | Low: Miami/LA/Phoenix ~250–265. High: NYC 405–940 |
| Construction, office (secondary) | 160–585 (typ. 205–365) | $/sf | T2 | same | Q1 2025 | |
| Construction, retail shopping center | 170–700 (typ. 200–460) | $/sf | T2 | same | Q1 2025 | |
| Construction, retail strip | 120–740 (typ. 155–350) | $/sf | T2 | same | Q1 2025 | Phoenix 120–205; NYC 370–740 |
| Construction, warehouse | 80–325 (typ. 125–235) | $/sf | T2 | same | Q1 2025 | Las Vegas/Miami/Phoenix 80–165; SF 150–255; Portland 240–325 |
| Construction, factory / light manufacturing | 150–300 (complex plants 250–450+) | $/sf | T2 (±30%) | https://colonyconstruction.com/industrial-facility-construction-cost-usa-2026-guide/ | 2026 | RLB has no manufacturing category. Semiconductor/pharma fabs cost far more |
| Construction, parking garage (ground) | 55–240 | $/sf | T2 | RLB Q1 2025 (above) | Q1 2025 | Useful for mall/office parking |

## 4. Wages and payroll burden

### 4a. BLS OEWS, May 2025 (national, all industries)

Source: BLS OEWS via the BLS Public Data API, series OEUN0000000000000{SOC}{08,03,13,04}. Landing page: https://www.bls.gov/oes/current/oes_nat.htm. Data year = May 2025. All values are T1.

| Occupation (SOC) | Median hourly ($) | Mean hourly ($) | Median annual ($) | Mean annual ($) |
|---|---|---|---|---|
| All occupations (00-0000) | 24.51 | 33.54 | 50,980 | 69,770 |
| Chief executives (11-1011) | 102.88 | 129.63 | 213,990 | 269,630 |
| General & operations managers (11-1021) | 50.85 | 64.87 | 105,770 | 134,940 |
| Marketing managers (11-2021) | 80.19 | 85.47 | 166,790 | 177,770 |
| Industrial production managers (11-3051) | 60.61 | 64.50 | 126,060 | 134,170 |
| Accountants & auditors (13-2011) | 40.23 | 45.56 | 83,680 | 94,750 |
| Software developers (15-1252) | 65.38 | 71.20 | 135,980 | 148,100 |
| First-line supervisors, retail sales (41-1011), "store manager" proxy | 23.33 | 25.66 | 48,520 | 53,380 |
| Retail salespersons (41-2031) | 17.03 | 17.94 | 35,410 | 37,310 |
| Cashiers (41-2011) | 15.81 | 15.95 | 32,880 | 33,180 |
| Stockers & order fillers (53-7065) | 17.95 | 19.01 | 37,330 | 39,540 |
| Laborers & freight/stock movers (53-7062) | 19.35 | 20.32 | 40,240 | 42,260 |
| Fast food & counter workers (35-3023) | 15.00 | 15.46 | 31,200 | 32,150 |
| Misc. assemblers & fabricators (51-2090) | 21.47 | 22.43 | 44,650 | 46,660 |
| Machinists (51-4041) | 28.24 | 28.52 | 58,750 | 59,320 |
| Maintenance & repair workers, general (49-9071) | 23.84 | 25.86 | 49,590 | 53,780 |
| Heavy & tractor-trailer truck drivers (53-3032) | 28.19 | 28.71 | 58,640 | 59,710 |
| Farmworkers, crop/nursery/greenhouse (45-2092) | 17.15 | 18.09 | 35,660 | 37,630 |
| Farmworkers, farm/ranch animals (45-2093) | 17.63 | 18.88 | 36,670 | 39,260 |
| Continuous mining machine operators (47-5041) | 29.72 | 31.27 | 61,810 | 65,050 |
| Excavating & loading machine operators, surface mining (47-5022) | 27.61 | 28.81 | 57,430 | 59,930 |
| Construction laborers (47-2061) | 22.66 | 25.02 | 47,120 | 52,030 |

Notes:
- "Store manager" has no dedicated SOC. Department/store managers at large chains usually code to 11-1021 or 41-1011. Use 41-1011 for small stores and 11-1021 for big boxes.
- The CEO OEWS figure excludes most equity compensation. Large-cap CEO total pay is far higher (T3: $10–20M).

### 4b. Employer payroll burden (BLS ECEC)

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Private industry total compensation | 46.89 | $/hour worked | T1 | BLS ECEC https://www.bls.gov/news.release/ecec.nr0.htm | Jun 2026 | |
| Wages share / benefits share | 70.0 / 30.0 | % of compensation | T1 | same | Jun 2026 | Benefits = 42.9% on top of wages ($14.07 ÷ $32.82) |
| Private benefits detail: paid leave / supplemental / insurance / retirement / legally required | 3.44 / 1.84 / 3.44 / 1.54 / 3.31 | $/hour | T1 | BLS ECEC June 2025 https://www.bls.gov/news.release/archives/ecec_09122025.pdf | Jun 2025 | Total $13.58 on $32.07 wages. Legally required (FICA, FUTA/SUTA, workers' comp) = 10.3% of wages |
| Retail effective burden (benefits ÷ payroll) | ~19 | % of payroll | T1-derived | ARTS 2022 bes.xlsx: fringe 124,959 ÷ payroll 672,708 | 2022 | Retail runs thin benefits, mostly statutory taxes |
| Suggested gameplay burden | retail/food service 18–25; manufacturing/office 35–45 | % on top of wages | T3 | Bracketed by the two rows above | — | |

## 5. Consumer side

### 5a. Household spending shares (BLS Consumer Expenditure Survey 2024)

Source: BLS Consumer Expenditures 2024, release of Dec 19, 2025: https://www.bls.gov/news.release/cesan.nr0.htm (PDF https://www.bls.gov/news.release/pdf/cesan.pdf). Average annual expenditure is $78,535; average pre-tax income is $104,207. All rows T1 (shares marked "T1-derived" are $ ÷ total).

| Category | $/consumer unit/yr | Share of total spending | Tier |
|---|---|---|---|
| Food at home | 6,224 | 7.9% | T1 |
| Food away from home | 3,945 | 5.0% | T1 |
| Alcoholic beverages | 643 | 0.8% | T1 |
| Housing (incl. utilities, furnishings) | 26,266 | 33.4% | T1 |
| Apparel & services | 2,001 | 2.5% | T1 |
| Transportation (total) | 13,318 | 17.0% | T1 |
|  of which vehicle purchases | 5,337 | 6.8% | T1-derived |
|  of which gasoline & motor oil | 2,411 | 3.1% | T1-derived |
| Healthcare | 6,197 | 7.9% | T1 |
| Entertainment | 3,609 | 4.6% | T1 |
| Personal care | 978 | 1.2% | T1 |
| Education | 1,569 | 2.0% | T1 |
| Tobacco | 352 | 0.4% | T1 |
| Cash contributions | 2,292 | 2.9% | T1 |
| Personal insurance & pensions | 9,797 | 12.5% | T1 |

### 5b. Income, population, regional wages

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Real median household income | 83,730 | $ | T1 | Census P60-286 Income in the US: 2024 https://www2.census.gov/library/publications/2025/demo/p60-286.pdf | 2024 | Census reports that 2025 set a new high (https://www.census.gov/library/stories/2026/09/median-household-income.html); 2025 value not captured |
| Metro population: New York | 20,112,448 | persons | T1 | Census Vintage 2025 metro estimates https://www.census.gov/newsroom/press-releases/2026/2025-popest-metro-micro-counties.html | Jul 2025 | Taken from search summary of the release |
| Metro population: Los Angeles | 12,844,441 | persons | T1 | same | Jul 2025 | |
| Metro population: Chicago | 9,434,123 | persons | T1 | same | Jul 2025 | |
| Metro population: Dallas–Fort Worth | 8,477,157 | persons | T1 | same | Jul 2025 | +123,557 YoY |
| Metro population: Houston | 7,904,627 | persons | T1 | same | Jul 2025 | +126,720 YoY |
| Median hourly wage, all occupations, by metro | San Jose 40.41; San Francisco 35.70; New York 29.53; Chicago 26.31; Dallas 24.73; Houston 23.76; Jackson MS 20.60; Brownsville TX 17.54 | $/hr | T1 | BLS OEWS May 2025 metro (API series OEUM{area}000000000000 08) https://www.bls.gov/oes/current/oessrcma.htm | May 2025 | US = 24.51. Wage index: San Jose 1.65, Brownsville 0.72 (2.3× spread) |
| Retail salesperson median hourly, by metro | San Jose 21.26; San Francisco 21.08; New York 18.40; Chicago 17.22; Dallas 16.06; Houston 15.07; Jackson MS 13.98; Brownsville 13.36 | $/hr | T1 | same | May 2025 | US = 17.03. Low-wage jobs compress: 1.6× spread vs 2.3× for all jobs |

### 5c. Price elasticity of demand (own-price, absolute values unless signed)

| Category | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Food & non-alcoholic beverages (range across categories) | 0.27–0.81 | |ε| | T2 | Andreyeva, Long & Brownell, AJPH 100(2):216-222 (review of 160 studies) https://scholars.duke.edu/display/pub963616 | 2010 | |
| Food away from home, soft drinks, juice, meats | 0.7–0.8 | |ε| | T2 | same | 2010 | Most elastic food groups. Staples (eggs, fats, sweets) sit near 0.3–0.5 |
| Cigarettes | −0.4 (adult consensus); −0.48 meta mean (SD 0.43) | ε | T2 | Gallet & List (2003), Health Econ. https://onlinelibrary.wiley.com/doi/abs/10.1002/hec.765 | 2003 | |
| Alcohol, overall | −0.5 | ε | T2 | Wagenaar et al. 2009; Gallet 2007; Fogarty 2010 (meta-analyses) https://www.researchgate.net/publication/227360326_The_Demand_for_Alcohol_A_Meta-Analysis_of_Elasticities | 2007–2010 | |
| Beer / wine / spirits | −0.46 / −0.69 / −0.80 | ε | T2 | Wagenaar et al. (2009) Addiction meta-analysis | 2009 | Gallet 2007: −0.36 / −0.70 / −0.68 |
| Automobiles (market-level) | −0.3 to −1.3 (short-run −1.2 to −1.5) | ε | T2 (wide) | Survey via https://www.federalreserve.gov/pubs/feds/2005/200525/200525pap.pdf and search summary | various | Single model/brand elasticity can be −3 to −5 (BLP-style estimates) |
| Apparel (category-level) | −0.5 to −1.0 | ε | T3 | Derived from the classic Houthakker–Taylor-era range for clothing as a semi-necessity. No authoritative recent US meta-analysis found | — | Brand-level apparel is much more elastic (−2 to −3) |
| Consumer electronics | −1.5 to −2.5 | ε | T3 / T2 lower bound | Search-surfaced industry estimates (up to −2.5); LBNL appliance study https://eta.lbl.gov/publications/estimating-price-elasticity-using | — | Highly elastic at product level |

## 6. Advertising

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Marketing budget, average (large firms) | 7.7 | % of revenue | T2 | Gartner CMO Spend Survey 2025 https://www.campaignlive.com/article/marketing-budgets-hold-77-2025-gartner-cmo-survey/1920581 | 2025 | n = 402 CMOs, mostly >$1B revenue. Half report ≤6%; "big spenders" >10.5% |
| Marketing budget, CPG | ~18 | % of revenue | T2 (low confidence) | The CMO Survey (Deloitte/Duke) via https://www.sender.net/marketing-glossary/marketing-budget/statistics/ | 2025 | Aggregator citation |
| Marketing budget, manufacturing/industrial | 5–7.5 | % of revenue | T2 | same | 2025 | |
| Marketing budget, energy | ~3.2 | % of revenue | T2 | same | 2025 | |
| Marketing budget, tech/software | 11–15 | % of revenue | T2 | same | 2025 | |
| Purchased advertising, retailers (media spend only) | 0.4–2.9 (furniture 2.9; shoes 2.8; apparel 2.3; electronics 1.5; dept stores 1.5; auto parts 0.8; home improvement 0.6; supercenters 0.5; drugstores 0.4) | % of sales | T1-derived | ARTS 2022 bes.xlsx (section 2a) | 2022 | Counts only purchased ad services. Excludes in-house staff, so it is lower than "marketing budget" |
| Linear TV CPM, national broadcast | ~43 | $ per 1,000 adult impressions | T2 | https://www.tvscientific.com/insight/tv-advertising-cost (citing 2024–25 upfront season) | 2024–25 | |
| Linear TV CPM, cable | ~21 | $ | T2 | same | 2024–25 | |
| CTV / streaming CPM | 20–40 (typ. ~25); premium direct 45–65 | $ | T2 | https://adwave.com/resources/average-ctv-cpm-q4-2025 | Q4 2025 | |
| Meta (Facebook/Instagram) CPM, median | 15.06 | $ | T2 (±50%; seasonal: Nov peak $28) | https://www.triplewhale.com/blog/facebook-ads-benchmarks (and similar) | Aug 2025–Jul 2026 | |
| Google display CPM | 4–8 | $ | T2 | https://www.theremnantagency.com/comparing-cpm-across-digital-and-traditional-media/ | 2025 | |
| Radio CPM | 4.78 avg (top-50 markets); range 4–12 | $ | T2 | Westwood One via https://www.adamsoutdoor.com/blog/billboard-cpm-how-out-of-home-advertising-compares-to-tv-radio-and-digital-cpm-in-2026/ | 2026 | |
| Magazine (print) CPM | 13–55 | $ | T2 | same / https://www.theremnantagency.com/comparing-cpm-across-digital-and-traditional-media/ | 2025 | |
| Newspaper CPM | 45–196 | $ | T2 | Solomon Partners June 2025 benchmark (via search) | 2025 | |
| Outdoor billboard CPM | 2–10 (static); OOH overall 2–16 | $ | T2 | https://www.adamsoutdoor.com/blog/billboard-cpm-how-out-of-home-advertising-compares-to-tv-radio-and-digital-cpm-in-2026/ | 2026 | |

---

## Gaps and caveats

1. **ARTS stops at 2022.** Census moved retail into AIES, and kind-of-business gross margin/expense tables for 2023+ were not found. Margins are fairly stable year to year (±1–2 pp), except department stores and apparel.
2. **Jewelry and convenience-store gross margins** are not published by Census. Jewelry uses Signet as a single-firm proxy. The convenience-store inside GM is low confidence: a 33–47% spread between sources. The NACS SOI report itself is paywalled.
3. **Rent as % of sales**: the ARTS lease line is distorted by ownership and lease accounting. Use the CoStar occupancy-cost % (3.5–10%) for gameplay.
4. **Store sizes** for c-stores, drugstores, department stores and apparel specialty are T3. Best Buy and Target sizes are T2 (company descriptions, not 10-K tables).
5. **Commercial/industrial land per acre** has no official national series. Only USDA farmland is T1, and urban/industrial land bands are T3. The Newmark industrial-land article returned 403.
6. **Factory construction cost** is not in RLB. It uses a contractor guide (T2, wide).
7. **Apparel and electronics elasticities**: no authoritative recent US meta-analysis was retrieved, so these are T3.
8. **Ad spend by industry**: the per-sector figures are second-hand (aggregator citing The CMO Survey). The primary CMO Survey tables were not fetched.
9. **ECEC by industry** (retail trade vs manufacturing benefit share) was not pulled. Only the private-industry aggregate and the ARTS-derived retail fringe ratio are given.
10. **The C&W industrial national PDF** was not parsed directly. The $10.32 comes from a search summary that attributes it to that PDF, and C&W's press release confirms the 6.9% vacancy.
11. **2025 median household income** (Census, released Sept 2026) is reported as a new high, but the exact value was not captured.
