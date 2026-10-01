# Corporate Finance & Macro — Reference Numbers

Compiled 2026-09-30 for the Ledger & Lot simulation (US, 2024–2026 data).

**Tiers:** T1 = exact figure from an official document or dataset. T2 = from a credible survey or distribution; a range or tolerance is given. T3 = estimate; the Notes column says how it was derived.

**FRED-derived statistics:** the series were downloaded as `fredgraph.csv?id=<SERIES>` on 2026-09-30 and the min/max/mean/sd were computed locally. Means are simple averages of all observations in the window (daily, monthly or quarterly as the series is published). That is a T1 dataset with a deterministic calculation, so they are tagged T1.

---

## 1. Policy and market rates

### Current values (late Sep 2026)

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Fed funds target range | 3.75–4.00 | % | T1 | Fed Implementation Note https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm | 2026-09-16 | +25 bp hike, the first since 2023. Dot-plot median 4.1% at end-2026 |
| Interest on reserve balances (IORB) | 3.90 | % | T1 | same | 2026-09-16 | |
| Discount (primary credit) rate | 4.00 | % | T1 | same | 2026-09-16 | |
| ON RRP rate | 3.75 | % | T1 | same | 2026-09-16 | Floor of the range |
| Effective fed funds (monthly avg) | 3.63 | % | T1 | FRED FEDFUNDS https://fred.stlouisfed.org/series/FEDFUNDS | 2026-08 | Before the hike |
| SOFR | 3.88 | % | T1 | FRED SOFR https://fred.stlouisfed.org/series/SOFR | 2026-09-29 | Base rate for floating corporate loans |
| Bank prime loan rate | 7.00 | % | T1 | FRED DPRIME https://fred.stlouisfed.org/series/DPRIME | 2026-09-28 | Rule: prime = fed funds upper bound + 3.00 |
| 2-yr Treasury (CMT) | 4.89 | % | T1 | FRED DGS2 https://fred.stlouisfed.org/series/DGS2 | 2026-09-29 | |
| 10-yr Treasury (CMT) | 5.26 | % | T1 | FRED DGS10 https://fred.stlouisfed.org/series/DGS10 | 2026-09-29 | |
| 10y–2y spread | 0.41 | pp | T1 | FRED T10Y2Y https://fred.stlouisfed.org/series/T10Y2Y | 2026-09-30 | |
| Moody's Aaa corporate yield | 5.88 | % | T1 | FRED AAA https://fred.stlouisfed.org/series/AAA | 2026-08 | Monthly |
| Moody's Baa corporate yield | 6.32 | % | T1 | FRED BAA https://fred.stlouisfed.org/series/BAA | 2026-08 | Monthly |

### Historical ranges for the macro-cycle model (1990-01 to 2025-12)

| Item | Min (date) | Max (date) | Mean | SD | Unit | Tier | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| Effective fed funds (monthly) | 0.05 (2020-04) | 8.29 (1990-06) | 2.88 | 2.34 | % | T1 | FRED FEDFUNDS | ZIRP spells were 2008-12 to 2015-12 and 2020-03 to 2022-03 |
| Prime rate (monthly) | 3.25 (2009-01) | 10.11 (1990-01) | 5.90 | 2.23 | % | T1 | FRED MPRIME https://fred.stlouisfed.org/series/MPRIME | |
| 2-yr Treasury (daily) | 0.09 (2021-02-05) | 9.05 (1990-05-02) | 3.24 | 2.27 | % | T1 | FRED DGS2 | |
| 10-yr Treasury (daily) | 0.52 (2020-08-04) | 9.09 (1990-05-02) | 4.25 | 1.94 | % | T1 | FRED DGS10 | |
| 10y–2y spread (daily) | −1.08 (2023-07-03) | 2.91 | 1.01 | — | pp | T1 | FRED T10Y2Y | Negative = inverted. Inversion preceded each recession |
| Moody's Aaa yield (monthly) | 2.14 | 9.56 | 5.60 | — | % | T1 | FRED AAA | |
| Moody's Baa yield (monthly) | 3.16 | 10.74 | 6.54 | — | % | T1 | FRED BAA | |
| Baa − 10y Treasury (daily) | 1.22 (1995-01) | 6.16 (2008-12-04) | 2.29 | 0.71 | pp | T1 | FRED BAA10Y https://fred.stlouisfed.org/series/BAA10Y | Best long-history credit-stress proxy |
| Aaa − 10y Treasury (daily) | 0.52 (1990-09) | 3.20 (2020-03-20) | 1.35 | 0.45 | pp | T1 | FRED AAA10Y https://fred.stlouisfed.org/series/AAA10Y | |

---

## 2. Corporate borrowing

### Corporate bond option-adjusted spreads (ICE BofA, over Treasuries)

| Rating | OAS now | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| AAA | 0.41 | % | T1 | FRED BAMLC0A1CAAA https://fred.stlouisfed.org/series/BAMLC0A1CAAA | 2026-09-29 | |
| AA | 0.60 | % | T1 | FRED BAMLC0A2CAA https://fred.stlouisfed.org/series/BAMLC0A2CAA | 2026-09-29 | |
| A | 0.71 | % | T1 | FRED BAMLC0A3CA https://fred.stlouisfed.org/series/BAMLC0A3CA | 2026-09-29 | |
| BBB | 1.02 | % | T1 | FRED BAMLC0A4CBBB https://fred.stlouisfed.org/series/BAMLC0A4CBBB | 2026-09-29 | |
| BB | 1.89 | % | T1 | FRED BAMLH0A1HYBB https://fred.stlouisfed.org/series/BAMLH0A1HYBB | 2026-09-29 | Widened from 1.59 on 09-23 |
| B | 3.16 | % | T1 | FRED BAMLH0A2HYB https://fred.stlouisfed.org/series/BAMLH0A2HYB | 2026-09-29 | |
| CCC & lower | 11.57 | % | T1 | FRED BAMLH0A3HYC https://fred.stlouisfed.org/series/BAMLH0A3HYC | 2026-09-29 | |
| IG master index | 0.84 (range 0.74–1.33, mean 0.92, Oct-2023 to Dec-2025) | % | T1 | FRED BAMLC0A0CM https://fred.stlouisfed.org/series/BAMLC0A0CM | 2026-09-29 | FRED now keeps only about 3 years of ICE history |
| HY master index | 3.08 (range 2.59–4.61, mean 3.20, Oct-2023 to Dec-2025) | % | T1 | FRED BAMLH0A0HYM2 https://fred.stlouisfed.org/series/BAMLH0A0HYM2 | 2026-09-29 | The 4.61 peak was the Apr-2025 tariff shock |
| Long-run cycle multipliers for OAS | Tight ≈ 0.75×, average 1.0×, recession peak ≈ 2.5–3× (IG) / 2.5–4× (HY) | × | T3 | Derived from the BAA10Y history above: min 1.22, mean 2.29, max 6.16 | 1990–2025 | Use to scale every rating's spread with the cycle |
| Implied default spread by rating (synthetic) | AAA 0.40, AA 0.55, A+ 0.70, A 0.78, A− 0.89, BBB 1.11, BB+ 1.38, BB 1.84, B+ 2.75, B 3.21, B− 5.09, CCC 8.85, CC 12.61, C 16.00, D 19.00 | % | T2 | Damodaran ratings.html https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ratings.html | Jan-2026 | Full notch ladder. ±25% vs. live OAS |

### Bank and SBA loans

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| SBA 7(a) max variable spread, loan ≤ $50k | Base + 6.5 | pp | T1 | SBA https://www.sba.gov/partners/lenders/7a-loan-program/terms-conditions-eligibility | 2026 | Base = WSJ prime (or optional peg) |
| SBA 7(a) max spread, $50,001–$250k | Base + 6.0 | pp | T1 | same | 2026 | |
| SBA 7(a) max spread, $250,001–$350k | Base + 4.5 | pp | T1 | same | 2026 | |
| SBA 7(a) max spread, > $350k | Base + 3.0 | pp | T1 | same | 2026 | With 7.00 prime the cap is 10.00% |
| SBA 7(a) max loan / guaranty | $5M; 85% (≤ $150k) / 75% (> $150k); max guaranty $3.75M | $ / % | T1 | same | 2026 | |
| Typical SBA 7(a) pricing actually charged (> $350k) | Prime + 1.75 to 2.50 | pp | T2 | Capbench https://www.capbench.com/sba-7a/current-rates | 2026 | Lenders rarely charge the cap |
| Small-business bank loan rates (KC Fed survey) | 6.37–10.98 | % | T2 | KC Fed SBLS https://www.kansascityfed.org/surveys/small-business-lending-survey/small-business-lending-q1-2026/ | Q1-2026 | Range across loan types and urban/rural banks. Median term loans were high-6% to low-7% in Q4-2025 |
| Leveraged loan (BB/B) spread | SOFR + 300–500 bp; index OAS ≈ 417–453 bp | bp | T2 | Fidelity Q2-2026 leveraged loan review https://institutional.fidelity.com/app/proxy/content?literatureURL=%2F9898326.PDF ; Polen 2026 mid-year https://www.polencapital.com/sites/default/files/2026%20High%20Yield%20and%20Leveraged%20Loan%20Mid-Year%20Review%20and%20Outlook_Opportunity%20Beneath%20the%20Surface.pdf | 2026 | B− premium widest since 2020 |
| Investment-grade corporate revolver / term loan | SOFR + 100–150 bp | bp | T3 | Estimate: IG bond OAS ~0.8–1.0 pp plus a small bank-loan premium. Typical drawn pricing on A/BBB revolvers | 2026 | Replace if an LPC/LSEG source becomes available |
| Simple game rule for the loan rate | Large corp: SOFR + (rating spread); small biz: prime + 1.5–3.0 | — | T3 | Synthesised from the rows above | 2026 | |

### Annual default rates by rating (S&P Global, global corporates, 1981–2024)

Source: S&P Global Ratings, *2024 Annual Global Corporate Default and Rating Transition Study*, Table 24 (27 Mar 2025). PDF mirror: https://maalot.co.il/Publications/FTS20250331162126.pdf ; article: https://www.spglobal.com/ratings/en/research/articles/250327-default-transition-and-recovery-2024-annual-global-corporate-default-and-rating-transition-study-13452126 . **Tier T1.**

| Rating | 1-yr avg | 3-yr cum | 5-yr cum | 10-yr cum | 15-yr cum | 2024 actual 1-yr |
|---|---|---|---|---|---|---|
| AAA | 0.00 | 0.13 | 0.34 | 0.67 | 0.86 | 0.00 |
| AA | 0.02 | 0.11 | 0.28 | 0.65 | 0.90 | 0.00 |
| A | 0.05 | 0.19 | 0.39 | 1.03 | 1.56 | 0.00 |
| BBB | 0.14 | 0.67 | 1.36 | 2.86 | 4.01 | 0.05 |
| BB | 0.56 | 3.12 | 5.75 | 10.44 | 13.05 | 0.17 |
| B | 2.93 | 10.46 | 15.60 | 22.02 | 25.11 | 1.72 |
| CCC/C | 26.12 | 41.32 | 46.53 | 50.43 | 52.30 | 28.36 |
| Investment grade | 0.08 | 0.37 | 0.77 | 1.69 | 2.38 | — |
| Speculative grade | 3.54 | 9.55 | 13.64 | 19.15 | 21.93 | 3.9 (global SG) |
| All rated | 1.50 | 4.13 | 6.00 | 8.67 | 10.07 | — |

All values are %. Recession behaviour: the CCC/C one-year rate ranged from 13.84% to 49.46% over 1981–2024 (Table 4, same study). The per-rating 2008 values in that table did not extract cleanly from the PDF. For the cycle model, multiply SG default rates by about 2–3× in recessions (T3, from the Table 4 min/max).

### Loan covenants and leverage norms

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Max total leverage covenant (Debt/EBITDA), bank/middle-market loans | 3.00–3.50× (some 3.75–4.00× with step-ups) | × | T2 | SEC-filed credit agreements, e.g. Big Lots 2018 https://www.sec.gov/Archives/edgar/data/0000768835/000076883518000090/exhibit101-2018creditagree.htm ; Proskauer covenants primer https://www.proskauer.com/uploads/proskauer-university-financial-covenants-both-parts | 2018–2026 | ±0.5× |
| Min fixed-charge coverage covenant | 1.25–1.75× (1.50× common) | × | T2 | same; Sidley 2026 https://www.sidley.com/en/insights/newsupdates/2026/03/financial-covenants-in-private-credit-transactions | 2026 | Large syndicated deals are often covenant-lite |
| Min interest-coverage covenant (EBITDA/interest) | 2.5–3.0× | × | T3 | Estimate consistent with the leverage caps above at prevailing rates | — | |
| Leveraged-lending supervisory flag | Total Debt/EBITDA > 6.0× | × | T1 | OCC Comptroller's Handbook, Leveraged Lending https://www.occ.treas.gov/publications-and-resources/publications/comptrollers-handbook/files/leveraged-lending/pub-ch-leveraged-lending.pdf | 2013 guidance | "Raises concerns" threshold |
| Middle-market definition | Revenue ≤ $500M; EBITDA ≤ $50M | $ | T2 | NAIC leveraged loan primer https://content.naic.org/sites/default/files/capital-markets-primer-leveraged-bank-loans.pdf | — | |

---

## 3. Ratings model — ratio thresholds

### S&P financial-risk-profile ratios (Corporate Methodology, standard volatility table)

Source: S&P Corporate Methodology criteria, e.g. https://www.maalot.co.il/Publications/MT20240214173645.PDF . **Tier T1.**

| Profile | FFO/Debt % | Debt/EBITDA × | Debt/Capital % | Approx. rating anchor (with a "satisfactory" business risk) |
|---|---|---|---|---|
| 1 Minimal | > 60 | < 1.5 | < 25 | a+ / a |
| 2 Modest | 45–60 | 1.5–2.0 | 25–35 | a− / bbb+ |
| 3 Intermediate | 30–45 | 2–3 | 35–45 | bbb |
| 4 Significant | 20–30 | 3–4 | 45–50 | bb+ |
| 5 Aggressive | 12–20 | 4–5 | 50–60 | bb |
| 6 Highly leveraged | < 12 | > 5 | > 60 | b+ / b |

The anchor column is T2: it comes from S&P's business-risk/financial-risk anchor matrix. With an "excellent" business risk the anchor shifts about 2–3 notches up, and with "weak" business risk about 2–3 notches down.

### Median ratios by rating (US industrials)

| Rating | Debt/EBITDA (×) | EBITDA/Interest (×) | Tier | Source | Year |
|---|---|---|---|---|---|
| AAA | 0.4 | 32.0 | T2 | S&P CreditStats: 2007 Adjusted Key U.S. Industrial Ratios (NY PSC exhibit) https://documents.dps.ny.gov/public/Common/ViewDoc.aspx?DocRefId=%7B238C10EF-93D4-4221-B6A7-D1B320E8E27C%7D | 2005–07 medians |
| AA | 1.2 | 19.5 | T2 | same | 2005–07 |
| A | 1.5 | 13.5 | T2 | same | 2005–07 |
| BBB | 2.3 | 7.8 | T2 | same | 2005–07 |
| BB | 3.2 | 4.8 | T2 | same | 2005–07 |
| B | 5.5 | 2.3 | T2 | same | 2005–07 |
| CCC | 8.6 | 1.1 | T2 | same | 2005–07 |

These medians are old but structurally stable; use a tolerance of about ±25%. Coverage medians in the low-rate 2010s ran higher.

### Interest coverage (EBIT/interest) to synthetic rating — large non-financial firms

Source: Damodaran (Jan 2026) https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ratings.html . **Tier T2.** This is a simple, game-ready lookup.

| EBIT / Interest | Rating | EBIT / Interest | Rating |
|---|---|---|---|
| ≥ 8.5 | AAA | 2.0–2.25 | BB |
| 6.5–8.5 | AA | 1.75–2.0 | B+ |
| 5.5–6.5 | A+ | 1.5–1.75 | B |
| 4.25–5.5 | A | 1.25–1.5 | B− |
| 3.0–4.25 | A− | 0.8–1.25 | CCC |
| 2.5–3.0 | BBB | 0.65–0.8 | CC |
| 2.25–2.5 | BB+ | 0.2–0.65 | C |
| | | < 0.2 | D |

---

## 4. Taxes and depreciation

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Federal corporate income tax | 21 | % | T1 | IRC §11(b); Tax Foundation https://taxfoundation.org/data/all/global/corporate-tax-rates-by-country-2025/ | 2025–26 | Flat rate |
| Combined federal + state statutory rate | 25.57 | % | T1 | Tax Foundation, Corporate Tax Rates by Country 2025 (same URL) | 2025 | State tax is deductible federally, hence < 21 + 6.5 |
| Average top state corporate rate (states with CIT) | 6.5 (median 6.5) | % | T2 | Tax Foundation state CIT 2025 https://taxfoundation.org/data/all/state/state-corporate-income-tax-rates-brackets-2025/ | 2025 | Range 0 (e.g. SD, WY) to ~11.5 (NJ incl. surtax) |
| Employer Social Security (OASDI) | 6.2 on wages ≤ $184,500 | % | T1 | IRS Pub 15 (2026) https://www.irs.gov/pub/irs-pdf/p15.pdf | 2026 | Employee pays a matching 6.2% |
| Employer Medicare | 1.45, no cap | % | T1 | same | 2026 | +0.9% employee-only above $200k |
| FUTA | 6.0 gross; 0.6 net after the 5.4% state credit, on first $7,000 per employee | % | T1 | same | 2026 | Max $42 per employee per year |
| SUTA, US avg rate on total wages | 0.38 | % | T1 | DOL ETA, Significant Measures of State UI Tax Systems 2024 https://oui.doleta.gov/unemploy/pdf/sigmeasures/sigmeasuitaxsys24.pdf | 2024 | Avg on taxable wages 1.67%. About $286 per covered employee |
| SUTA statutory range | ~0.0–12+ | % | T2 | same; Gusto 2025 https://gusto.com/resources/articles/taxes/sui-tax-rates | 2025 | Experience-rated. New employer ≈ 2.7% typical |
| Game total employer payroll burden | ≈ 8.0–8.5 | % of wages | T3 | 6.2 + 1.45 + ~0.4 SUTA + small FUTA | 2026 | Excludes benefits and workers' comp |
| Avg combined state + local sales tax | 7.53 | % | T1 | Tax Foundation midyear 2026 https://taxfoundation.org/data/all/state/2026-sales-tax-rates-midyear/ | 2026 | Population-weighted. Highest LA 10.13%. Zero in NH, OR, MT, DE, AK (state level) |
| MACRS nonresidential real property | 39 yr, straight-line, mid-month | — | T1 | IRS Pub 946 https://www.irs.gov/publications/p946 | current | |
| MACRS residential rental property | 27.5 yr, SL, mid-month | — | T1 | same | current | |
| MACRS land improvements | 15 yr, 150% DB | — | T1 | same | current | |
| MACRS machinery / office furniture / fixtures | 7 yr, 200% DB, half-year | — | T1 | same | current | Asset class 00.11 and most manufacturing classes |
| MACRS autos, light trucks, computers | 5 yr, 200% DB, half-year | — | T1 | same | current | |
| MACRS heavy trucks (tractor units), certain tools | 3 yr | — | T1 | same | current | |
| Bonus depreciation | 100%, permanent, for property acquired after 2025-01-19 (≤ 20-yr class) | % | T1 | OBBBA (signed 2025-07-04); RSM summary https://rsmus.com/insights/services/business-tax/obba-tax-bonus-depreciation.html | 2025+ | Buildings (39-yr) are not eligible |
| §179 expensing limit | $2.5M; phase-out from $4.0M | $ | T1 | same; BDO https://www.bdo.com/insights/tax/one-big-beautiful-bill-act-expands-100-depreciation-expensing-opportunities | 2025+ | Indexed for inflation |
| Book (GAAP) depreciation convention | Straight-line over useful life: buildings 30–40 yr, machinery 7–15 yr, vehicles 5 yr, computers 3–5 yr | yr | T2 | Common GAAP practice (10-K PP&E policy notes) | — | Book ≠ tax → deferred tax liability. A good double-entry hook |

---

## 5. Equity market

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| S&P 500 total return, arithmetic mean | 11.94 | %/yr | T1 | Damodaran histretSP https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html | 1928–2025 | Geometric 10.08% |
| S&P 500 return, 1976–2025 | 12.84 arith / 11.35 geo | %/yr | T1 | same | 1976–2025 | |
| S&P 500 annual return SD | 18.23 | % | T1 | same | 1928–2025 | |
| 3-month T-bill mean | 3.68 | %/yr | T1 | same | 1928–2025 | |
| 10-yr T-bond total return mean | 5.31 | %/yr | T1 | same | 1928–2025 | |
| Baa corporate bond return mean | 6.17 | %/yr | T1 | same | 1928–2025 | |
| Historical ERP (stocks − T-bills) | 8.26 arith / 6.45 geo | % | T1 | same | 1928–2025 | Stocks − T-bonds ≈ 6.6 arith |
| Implied ERP (forward-looking, FCFE) | 4.23 (start 2026); 2020–25 range 4.2–5.9; 1960–2025 avg ~4.05 | % | T1 | Damodaran histimpl https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histimpl.html | 2026 | Use for cost of equity: rf + β × 4.2–4.5 |
| S&P 500 forward 12-month P/E | 19.1 (5-yr avg 19.8; 10-yr avg 19.0) | × | T1 | FactSet Earnings Insight 11-Sep-2026 https://advantage.factset.com/hubfs/Website/Resources%20Section/Research%20Desk/Earnings%20Insight/EarningsInsight_091126.pdf | 2026-09 | |
| S&P 500 trailing 12-month P/E | 25.9 (5-yr 24.4; 10-yr 23.6) | × | T1 | same | 2026-09 | |
| Sector forward P/E, high end | Cons. Discretionary 23.0; Industrials 22.8 | × | T1 | same | 2026-09 | |
| Sector forward P/E, low end | Energy 14.1; Financials 15.0 | × | T1 | same | 2026-09 | |
| Sector forward P/E (other sectors) | Range 15–23; Info Tech typically ~25–28 | × | T3 | Bounded by the FactSet extremes above; the full chart was not machine-readable | 2026 | Bank 13, Grocery 14, Utility 18, Food 17 forward (Damodaran Jan-2026 pedata https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/pedata.html, T2) |
| S&P 500 net profit margin | 14.9 est. Q3-26 (5-yr avg 12.4) | % | T1 | FactSet (same) | 2026 | |
| S&P 500 dividend yield | 1.04–1.06 | % | T2 | GuruFocus https://www.gurufocus.com/economic_indicators/150/sp-500-dividend-yield ; Multpl https://www.multpl.com/s-p-500-dividend-yield/table/by-year | 2026-09 | Near the all-time low. Long-run median since 1871 ≈ 4.2% |
| Dividend payout ratio (US market aggregate) | 34.8 (ex-financials 36.7) | % of NI | T2 | Damodaran divfund https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/divfund.html | Jan-2026 | Utilities 65%, oil majors 68%, software 21%, semis 16%. Buybacks are roughly equal to dividends in size |
| IPO gross spread, $30–160M deals | 7.0 (93% of deals exactly 7%) | % of proceeds | T1 | Jay Ritter, IPO Underwriting Stats through 2025 https://site.warrington.ufl.edu/ritter/files/IPOs-Underwriting.pdf | 2001–2025 | |
| IPO gross spread, all deals mean | 6.62 (median 7.00) | % | T1 | same | 2001–2025 | $200M–$1B mean 6.42%. ≥ $1B mean 4.44% |
| IPO first-day return (underpricing) | 19.1 mean | % | T1 | same | 2001–2025 | Plus other direct costs ~1–2% of proceeds (T3) |
| Takeover (control) premium, US public targets | Median ~27 (all sectors, 10-yr); 29 (2024); 31 (2025 YTD) | % over unaffected price | T2 | Goldman Sachs fairness analyses in SEC proxies, e.g. https://www.sec.gov/Archives/edgar/data/1858257/000114036125029188/ny20049415x7_ex-c18.htm | 2014–2025 | Range ±10 pp. Tech 10-yr median 30%. The game can draw from N(30%, 15%) floored at 10% |

---

## 6. Macro cycle

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Avg recession (contraction) length | 10.3 | months | T1 | NBER https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions | 1945–2020 | 17.0 months over 1854–2020 |
| Avg expansion length | 64.2 | months | T1 | same | 1945–2020 | Last: Apr-2020 trough, no NBER peak declared as of Sep-2026 |
| Number of recessions since 1945 | 13 (incl. 1945) | count | T1 | FRED USREC https://fred.stlouisfed.org/series/USREC | 1945–2020 | ≈ 1 every 6.2 yr, so p(recession start) ≈ 1.4% per month |
| Recession durations | 8,11,10,8,10,11,16,6,16,8,8,18,2 | months | T1 | FRED USREC (months flagged) | 1945–2020 | Min 2 (2020), max 18 (2008–09) |
| Real GDP growth (annual avg), 1948–2025 | mean 3.14, SD 2.30, min −2.58, max 8.69 | % | T1 | FRED GDPC1 https://fred.stlouisfed.org/series/GDPC1 | 1948–2025 | Calendar-year average levels |
| Real GDP growth, 1990–2025 | mean 2.51, SD 1.69 | % | T1 | same | 1990–2025 | Quarterly SAAR: mean 2.59, SD 4.37 |
| Real GDP growth, recent | 2022 2.43; 2023 2.92; 2024 2.95; 2025 2.34 | % | T1 | same | 2022–25 | |
| CPI inflation (YoY) long run | 1948–2025 mean 3.52, SD 2.87; 1990–2025 mean 2.70, SD 1.60 | % | T1 | FRED CPIAUCSL https://fred.stlouisfed.org/series/CPIAUCSL | | Max 14.6 (1980), min −3.0 |
| CPI Dec/Dec | 2021 7.17; 2022 6.40; 2023 3.32; 2024 2.87; 2025 2.65 | % | T1 | same | | |
| CPI YoY latest | 3.71 | % | T1 | same | 2026-08 | 2026 range 3.3–4.3 (peak May) |
| Fed inflation target | 2.0 (PCE) | % | T1 | Federal Reserve | — | |
| Unemployment rate latest | 4.1 | % | T1 | FRED UNRATE https://fred.stlouisfed.org/series/UNRATE | 2026-08 | |
| Unemployment range 1948–2025 | min 2.5, max 14.8 (2020-04), mean 5.65 | % | T1 | same | | 1990–2025: min 3.4, mean 5.68, SD 1.74 |
| Retail sales peak-to-trough, 2001 recession | −1.5 | % (nominal) | T1 | FRED RSAFS https://fred.stlouisfed.org/series/RSAFS | 2001 | |
| Retail sales peak-to-trough, 2007–09 | −13.0 | % (nominal) | T1 | same | 2007-11 to 2009-03 | Real decline was larger, roughly −15% (T3) |
| Retail sales peak-to-trough, COVID | −22.1 | % (nominal) | T1 | same | 2019-12 to 2020-04 | Recovered within about 3 months |
| Retail sales latest | 737.8 | $bn/month SA | T1 | same | 2026-08 | |
| Game rule: demand shock by recession severity | Mild −2 to −5%; typical −5 to −10%; severe −13 to −20% (durables −25 to −35%) | % | T3 | Scaled from the three RSAFS episodes above | — | Durable-goods sensitivity is an estimate |

---

## 7. Banking

| Item | Value | Unit | Tier | Source (URL) | Year | Notes |
|---|---|---|---|---|---|---|
| Industry net interest margin | 3.32 | % | T1 | FDIC QBP Q2-2026 https://www.fdic.gov/news/speeches/2026/fdic-quarterly-banking-profile-second-quarter-2026 | Q2-2026 | Historical norm ~3.0–3.6 (T2) |
| Community bank NIM | 3.81 | % | T1 | same | Q2-2026 | |
| Bank ROA | 1.37 | % | T1 | FDIC press release https://www.fdic.gov/news/press-releases/2026/fdic-insured-institutions-reported-return-assets-137-percent-and-net | Q2-2026 | Typical 1.0–1.3 |
| Problem banks | 47 (1.1% of banks) | count | T1 | FDIC QBP Q2-2026 | Q2-2026 | Normal non-crisis range 1–2% |
| Loan-to-deposit ratio (all commercial banks) | 71.9 | % | T1 | Calculated: FRED TOTLL 14,079 / DPSACBW027SBOG 19,568 ($bn) https://fred.stlouisfed.org/series/TOTLL | 2026-09-16 | Pre-2008 norm ~85–100% (T2) |
| Deposit rate — savings (national avg) | 0.37 | % | T1 | FDIC National Rates https://www.fdic.gov/national-rates-and-rate-caps | 2026-09-21 | Rate cap 4.38 |
| Deposit rate — interest checking | 0.07 | % | T1 | same | 2026-09-21 | |
| Deposit rate — 12-month CD | 1.73 | % | T1 | same | 2026-09-21 | Cap 5.74 |
| CET1 minimum | 4.5 | % RWA | T1 | 12 CFR 217.10 https://www.ecfr.gov/current/title-12/chapter-II/subchapter-A/part-217 | current | Basel III |
| Tier 1 / Total capital minimum | 6.0 / 8.0 | % RWA | T1 | same | current | |
| Capital conservation buffer (or stress capital buffer for large banks) | 2.5 (SCB ≥ 2.5) | % RWA | T1 | same; Fed large-bank capital requirements https://www.federalreserve.gov/newsevents/pressreleases/bcreg20240828a.htm | current | Effective CET1 floor 7.0% |
| G-SIB surcharge | 1.0–4.5 | % RWA | T1 | same | 2024–25 | Large-bank all-in CET1 requirements 7.0–16.0% (Fed 2025) |
| Tier 1 leverage minimum | 4.0 (community-bank leverage ratio option 9%) | % assets | T1 | 12 CFR 217.10 / 217.12 | current | 2025 proposal to cut CBLR to 8% — unverified status |
| Actual industry CET1 | ~13 | % RWA | T3 | Recollection of FDIC QBP and Fed reports for 2024–25, not checked against Q2-2026 | — | Banks hold ~5–6 pp above the minimum |

---

## Gaps

1. **ICE BofA OAS history by rating.** FRED now keeps only about 3 years (from Oct-2023). Long-run rating-level mean and peak spreads (e.g. 1997–2025) are not captured. The BAA10Y/AAA10Y long-history proxies are used instead, and the OAS cycle multipliers are T3.
2. **Sector-level forward P/Es.** Only the FactSet extremes were extractable from the chart. The middle sectors are T3.
3. **Investment-grade bank-loan spreads over SOFR.** No public aggregate was found (LSEG LPC is paywalled). T3 estimate.
4. **Moody's rating medians by rating.** The S&P CreditStats ratio medians used are from 2005–07. No post-2020 public update was found.
5. **Loan covenant norms.** These come from sample agreements and law-firm primers, not a statistical survey. Use them as plausible ranges.
6. **Takeover premia.** Bank fairness-opinion medians from SEC proxies, not a comprehensive database such as FactSet MergerMetrics.
7. **IPO direct costs other than the spread** (legal, audit, listing fees) are T3 (~1–2%).
8. **Industry CET1 actual and LDR history** are not pulled from the Q2-2026 QBP tables.
9. **Real (inflation-adjusted) retail-sales declines** were not computed. The figures are nominal RSAFS, which understates real drops in high-inflation episodes.
10. **Moody's long-run default averages** were not collected separately. S&P 1981–2024 is used as the single default source (Moody's figures are of similar magnitude).
