# SalaryExit India — formula & assumptions audit

Reference for QA and finance review. Implementation lives in `lib/calculators/` and `lib/config/`. FY defaults: `FY2024_25` in `lib/config/financial-year.ts`.

## Summary: assumption-heavy vs lighter tools

| Heavier assumptions | Lighter / mechanical |
|---------------------|----------------------|
| CTC → in-hand, Salary breakdown, Tax regime (tax slabs, 87A, no surcharge) | Salary hike %, Offer comparison (ranking only) |
| HRA (rent proofs, regime), Gratuity (tax law), Leave encashment (policy) | Final settlement (user sum) |
| EPF (EPS split), Notice buyout (contract vs calendar) | — |

---

## Audit table

| Calculator | Core formula(s) | Exact in code | Estimated / simplified | Key assumptions | Inputs that drive accuracy | Disclose to users |
|------------|-----------------|---------------|------------------------|-----------------|---------------------------|-------------------|
| **Income tax core** (`income-tax.ts`) | Progressive slabs; cess = 4% of tax after rebate; 87A old/new | Slab arithmetic for given taxable income | 87A rules are simplified vs statute; no surcharge | FY slabs from config | Taxable income (after std ded, deductions) | Not a substitute for filing; verify FY |
| **Annual tax** (`annual-tax.ts`) | Wraps slabs + 87A for one regime | Same as above | New regime: std ded only; old: 80C cap bucket + optional HRA | `section80CCap` ₹1.5L; PF+other 80C combined | Gross, PF, other VI-A, HRA exempt, regime | Old vs new deduction treatment |
| **CTC → in-hand** (`ctc-to-inhand.ts`) | `inHandMonthly = gross/12 − PF/12 − PT/12 − totalTax/12` | Arithmetic once tax and PF known | Tax from `estimateAnnualIncomeTax`; TDS spread flat | PF from explicit annual or from Basic+DA via `computeEmployeePfAnnual`; old regime: only PF in 80C here | Gross, regime, PT, PF or Basic+DA | Bonus/perq/surcharge not modeled; old regime 80C limitation on this screen |
| **Salary breakdown** (`salary-breakdown.ts`) | Same tax path + line items | Consistent with annual-tax | Same limits as above | Full old-regime: other 80C + HRA fields | All salary inputs | Same as CTC + richer disclosure in UI |
| **Tax regime comparison** (`tax-regime-comparison.ts`) | Taxable old = gross − std − min(PF+other,1.5L) − HRA; taxable new = gross − std | Side-by-side totals | No surcharge | Same FY | Gross, PF, other 80C, HRA exempt | Simplified 87A |
| **PF employee** (`pf.ts`) | `min(wage, ceiling) × 12%` (defaults) | Rate × wage math | Ceiling on/off | Statutory ₹15k ceiling when enabled | Monthly PF wage | Employer EPS split not shown |
| **EPF** (`epf.ts`) | Employee + employer monthly on PF wage | Same | Employer rate is total-EPF-style approximation | Same ceiling model | PF wage, optional ceiling override | EPS/EDLI not split |
| **HRA** (`hra.ts`) | Exemption = min(actual HRA, rent−10%(B+DA), 50%/40% of B+DA) | Three-way min | Annual only; old-regime context | Metro flag | Basic, DA, HRA, rent, metro | Proofs, partial year, regime choice |
| **Gratuity** (`gratuity.ts`) | `(15/26) × monthly × years` | Formula | Exempt = min(gratuity, ₹20L) if “covered” is naive | 5-year warning in config | Last salary, years, covered flag | Tax on gratuity is not final |
| **Leave encashment** (`leave-encashment.ts`) | `(B+DA monthly / 26 or 30) × days` | Daily rate × days | 10(10AA) not modeled | 26 vs 30 employer policy | Monthly base, days, basis | Gross before tax only |
| **Notice buyout** (`notice-buyout.ts`) | `(gross / daysInMonth) × noticeDays` | Calendar days | Working-day contracts differ | Month/year for denominator | Gross, notice days, month | Pre-tax gross |
| **Final settlement** (`final-settlement.ts`) | Sum(lines) − sum(deductions) | Arithmetic | No inference of components | User-entered lines | All line items | Nothing implied beyond entries |
| **Salary hike** (`salary-hike.ts`) | Δ = new−old; % = Δ/old | Exact | CTC definition must match | User-defined “CTC” | Old and new annual figures | Variable/bonus consistency |
| **Offer comparison** (`offer-comparison.ts`) | Sort by in-hand and by CTC | Ranking only | No tax math | User-supplied comparability | CTC, in-hand, optional tax columns | Variable pay / RSU not modeled (warning) |

---

## Maintenance

- Update `lib/config/financial-year.ts` after Budget changes.
- Keep `*_WORKED_EXAMPLE_INPUT` constants in calculator modules aligned with UI worked examples and `tests/scenario-vectors.test.ts`.
