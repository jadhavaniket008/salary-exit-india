# Media kit: founder bio, product description, contact

## Founder bio

Aniket Jadhav is the founder of SalaryExit India (salaryexit.in), a free salary and tax calculator suite for Indian salaried employees. He built the site's CTC-to-in-hand engine after being unable to find a calculator that showed its assumptions transparently rather than producing a single opaque number. **Not a CA, not a tax lawyer — see "Attribution guidance" below.**

## Product description

SalaryExit India provides free, no-login calculators covering CTC-to-in-hand conversion, gross-to-in-hand mode, reverse salary (target in-hand → required CTC), Salary Reality Check (in-hand vs. rent vs. modeled spend), old-vs-new tax regime comparison, HRA exemption, EPF, notice-period buyout, gratuity, leave encashment, final settlement, and offer comparison — plus salary/tax/job-switch guides and city-specific affordability scenarios. All calculators show their assumptions explicitly and link to a shared methodology page.

## Methodology (summary — full detail at salaryexit.in/methodology)

Tax and PF calculations are computed from a version-controlled TypeScript engine (`lib/calculators/` + `lib/config/financial-year.ts`), updated each Union Budget, unit-tested against Finance Act publications. The flagship In-Hand Salary Model 2026 report is generated directly from this engine — not a separately maintained spreadsheet.

## Key findings (from the flagship report — see the report itself for full context and caveats)

1. Between ₹12,00,000 and ₹12,70,587 taxable income, Section 87A's new-regime marginal relief taxes every additional rupee at exactly 100% — not a hard cliff, but a real, precisely-bounded zone where a raise produces zero net take-home gain.
2. At the same CTC, employer-cost structure (8% vs. 18% of CTC) alone can shift monthly in-hand by a meaningful amount.
3. Choosing full-Basic PF over the statutory ceiling has a precise, quantifiable monthly-cash cost.
4. The CTC required for a given target in-hand is a range, not a single number, because the gross-to-CTC conversion depends on employer-cost structure.

## Logo and screenshots

Use the site's existing favicon/icon asset (`app/favicon.ico` in the repository) and direct screenshots of the live site (salaryexit.in) — **no new logo or screenshot assets were generated in this pass.** Take fresh screenshots of the flagship report and the calculators directly from the production site when assembling a press-ready kit; don't reuse old screenshots that may not reflect the current design.

## Contact

hello@salaryexit.in

## Citation language

```text
Source: SalaryExit India In-Hand Salary Model 2026.
Modelled using SalaryExit's FY 2026-27 salary and tax engine. salaryexit.in
```

## FAQ

**Is this based on real payslip data?** No — it's a model generated from the site's own tax/PF calculation engine, explicitly stated as such throughout the report.

**Is this tax filing or legal advice?** No — educational/planning tool only. The report and every calculator link to a disclaimer.

**Can I get a custom data cut?** Yes — see `docs/growth/link-earning-offers.md`, Offer 2.

## Limitations (repeated from the report itself — do not omit when citing)

Does not model variable pay, ESOPs, joining bonuses, arrears, or surcharge (relevant above ₹50L). Basic+DA share (45%) and employer-cost share (8-18%) are modeling assumptions, not universal constants.
