# DFW V1 research: city, lease, labour and tax inputs

Inputs for V1 (D13–D15): the Dallas–Fort Worth metro, leased stores, a daily tick and biweekly payroll.
Tiers follow `docs/research/retail-labor.md`: **T1** is an exact figure from an official or primary document, **T2** is a range or a derived figure with a stated tolerance, and **T3** is an estimate. A T3 must not drive an engine constant without a flag.
**Status:** in progress (2026-10-01). Rows marked UNCONFIRMED came from search summaries and are not to be used until a primary page confirms them.

## 1. Retail rent and market (shopping centers)

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| DFW retail asking rent | 24.78 | $/sf/yr | T1 | C&W US Retail MarketBeat Q2 2026 https://assets.cushmanwakefield.com/-/media/cw/marketbeat-pdfs/2026/q2/us-reports/national/q22026usretailmarketbeat.pdf | Q2 2026 (preliminary) | Trend: Q2'25 24.22 · Q3'25 24.42 · Q4'25 24.57 · Q1'26 24.70. **Rent basis (NNN vs gross) is not stated in the report.** Assumed NNN, the US shopping-center convention; see §2 |
| US retail asking rent (same report) | 25.65 | $/sf/yr | T1 | same | Q2 2026p | DFW = 0.966× the US average |
| Texas peers | Austin 31.24 · Houston 24.55 · San Antonio 23.47 | $/sf/yr | T1 | same | Q2 2026p | For multi-city passes |
| DFW retail vacancy | 7.2 (Q2'25: 7.0) | % | T1 | same | Q2 2026p | Above the US 6.0%. C&W cites DFW among the largest vacancy increases, from new construction pulled forward |
| DFW shopping-center inventory | 186,390,979 | sf | T1 | same | Q2 2026p | Deliveries YTD 2026: 588,992 sf · under construction: 1,047,116 sf |
| DFW net absorption by quarter | 176,166 · 148,319 · 267,667 · 408,037 · −11,560 | sf | T1 | same | Q2'25 → Q2'26 | |
| Report coverage | community/neighborhood, power/regional and strip centers | — | T1 | same, Methodology | 2026 | **Excludes malls, outlet centers and freestanding retail.** V1 plots are strip or neighborhood-center leases, which matches the coverage |

## 2. Lease costs beyond base rent

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| NNN pass-through charges (CAM + tax + insurance), retail | ~4–8 | $/sf/yr | T3 | Blog/broker summaries via search (e.g. https://blog.tenantbase.com/how-much-does-retail-space-cost-in-2026) | 2026 | **Lead only. Replace with a primary or broker-survey source** |
| Tenant fit-out, second-generation retail | ~50–120 | $/sf | T3 | Contractor blogs via search (e.g. https://terrapincg.com/news/tenant-improvement-buildout-costs-commercial-retail-2026) | 2026 | **Lead only.** RLB's retail construction range (retail-labor §3) is shell plus fit-out, not fit-out alone |
| Security deposit | ~1–2 | months of rent | T3 | Legal/broker explainers via search (e.g. https://www.austintenantadvisors.com/blog/understanding-commercial-lease-security-deposits-in-texas/) | — | **Lead only.** Higher for start-ups |

## 3. Labour

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| DFW mean hourly wage, all occupations | 33.96 (US 33.54) | $/hr | T1 | BLS, Occupational Employment and Wages in Dallas-Fort Worth-Arlington, May 2025 https://www.bls.gov/regions/southwest/news-release/occupationalemploymentandwages_dallasfortworth.htm | May 2025 | DFW/US index = **1.0125** |
| DFW mean hourly wage, sales & related | 26.74 (US 26.43) | $/hr | T1 | same | May 2025 | DFW/US index = **1.0117** |
| DFW food prep & serving | 15.74 | $/hr | T1 | same | May 2025 | |
| DFW retail occupation wages (cashier, salesperson, supervisor, stocker) | national median × 1.0117 | $/hr | T2 (derived) | National medians: retail-labor §4a × the sales-group index above | May 2025 | BLS metro detail tables (oes_19100) returned 403 to automated fetch. **Replace with direct metro rows when reachable** |
| Pay frequency, all private establishments | weekly 27.0 · **biweekly 43.0** · semimonthly 19.8 · monthly 10.3 | % of establishments | T1 | BLS CES, Length of pay periods https://www.bls.gov/ces/publications/length-pay-period.htm | Feb 2023 | V1 uses biweekly (D14) |
| Pay frequency, 1–9 employees | 24.1 · 39.0 · 22.5 · 14.5 | % (same order) | T1 | same | Feb 2023 | A single V1 store is in this band |
| Pay frequency, 10–19 employees | 34.0 · 46.5 · 15.9 · 3.7 | % (same order) | T1 | same | Feb 2023 | |
| Pay frequency, trade/transport/utilities | 30.5 · 44.1 · 16.0 · 9.5 | % (same order) | T1 | same | Feb 2023 | Retail alone is not published separately |

## 4. Texas business taxes

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Franchise ("margin") tax rate, retail/wholesale | 0.375 | % of taxable margin | T1 | Texas Comptroller https://comptroller.texas.gov/taxes/franchise/ | 2026–2027 reports | Texas has no corporate income tax (assumed, from the rate structure; verify) |
| Franchise tax rate, other entities | 0.75 | % of taxable margin | T1 | same | 2026–2027 | |
| No-tax-due threshold | 2,650,000 | $ annualized total revenue | T1 | same | 2026–2027 | A Scenario 1 store sits below it, so it owes no franchise tax but still files |
| EZ computation | 0.331% of revenue, if revenue ≤ $20M | — | T1 | same | 2026–2027 | |
| Report due | May 15 | — | T1 | same | annual | Next business day if a weekend or holiday |
| Margin computation options | — | — | **open** | FAQ URL returned 404 | — | Commonly lowest of 70% of revenue, revenue − COGS, revenue − compensation, or revenue − $1M (assumed; verify) |

## 5. Demand timing

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Share of people purchasing goods/services, weekday vs weekend | 2024: 38.4 vs 43.4 · 2025: 39.3 vs 40.5 | % per day | **UNCONFIRMED** | BLS ATUS Table 2 (search summary only) https://www.bls.gov/news.release/atus.t02.htm | 2024–25 | Do not use until confirmed against the table |
| Monthly seasonality by category | — | — | **open** | Census Monthly Retail Trade, not seasonally adjusted | — | Not fetched yet |

## 6. Still open
Primary sources still needed:
- NNN charges, fit-out cost and deposit (to replace the §2 leads);
- the Texas margin computation;
- the ATUS weekday/weekend split;
- the monthly seasonality index for grocery (4451), clothing (448), electronics (443) and pharmacy (44611);
- DFW population (Census);
- ad cost and response for brand building.
