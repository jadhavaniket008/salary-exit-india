# SalaryExit India — formula notes

See also **[docs/FORMULA_AUDIT.md](../../docs/FORMULA_AUDIT.md)** for a QA/finance-oriented table (exact vs estimated, disclosures).

This document explains what each calculator **estimates**, the **assumptions** baked into code, and where results are **not** exact tax or legal outcomes. Always treat outputs as **indicative**; payroll, state laws, and employer policies vary.

## CTC → in-hand (`ctc-to-inhand.ts`)

- **Estimates** monthly take-home after employee PF, professional tax (user-supplied annual), and spreading annual TDS evenly across 12 months.
- **Simplified**: Uses gross salary as the income-tax base; does not model perquisites, arrears, bonus timing, or surcharge.
- **Warning**: Show users that actual Form 16 TDS can differ.

## Salary breakdown (`salary-breakdown.ts`)

- **Estimates** annual taxable income, tax after Section 87A (simplified), cess, and net after PF and PT.
- **Optional** `hraExemptionAnnual` for old regime only (pre-computed).
- **Simplified**: New regime ignores 80C/HRA; old regime lumps eligible PF + other 80C into the ₹1.5L cap.

## Employee PF (`pf.ts`)

- **Formula**: Monthly employee PF ≈ `employeeContributionRate × PF wage`, with optional `min(PF wage, ₹15,000)` when statutory ceiling is enabled.
- **Simplified**: Does not model EPS diversion, EDLI, or voluntary PF above statutory norms.

## HRA exemption (`hra.ts`)

- **Formula (Section 10(13A))**: Exemption = minimum of:
  1. Actual HRA received  
  2. Rent paid − 10% of (Basic + DA)  
  3. 50% of (Basic + DA) in metro, else 40%  
- **Requires**: Old regime selection; rent receipts and metro definition are user responsibilities.
- **Simplified**: Uses annual inputs; ignores partial-year rent changes.

## Gratuity (`gratuity.ts`)

- **Formula (Payment of Gratuity Act style)**: `(15 / 26) × last drawn monthly salary × years of service`.
- **Tax**: Exempt amount for covered employers is **capped** (configurable; statutory limit amended over time). Non-covered employers follow different rules.
- **Warning**: Eligibility typically needs **5+ years** (exceptions exist). Always flag for users.

## Leave encashment (`leave-encashment.ts`)

- **Formula (estimate):** `dailyRate = (Basic + DA) monthly / dayBasis` where `dayBasis` is **26** or **30**; `encashment = dailyRate × unusedLeaveDays`.
- **Simplified**: Many employers use Basic (+DA) and a 26-day or 30-day divisor; others use different bases or caps.
- **Tax**: Exemption under Section 10(10AA) for eligible cases is **not** modeled.

## Notice buyout (`notice-buyout.ts`)

- **Formula**: `(gross monthly / days in month) × notice days`.
- **Simplified**: Calendar month length; contracts may use fixed 30-day months or working days.

## Final settlement (`final-settlement.ts`)

- **Estimates** only what the user enters: sum of credit lines minus deductions.
- **Does not infer** leave encashment, statutory dues, or recoveries.

## Salary hike (`salary-hike.ts`)

- **Formula**: Absolute increase = `new − old`; percent = `(increase / old) × 100` when `old > 0`.

## Offer comparison (`offer-comparison.ts`)

- **Ranks** offers by pre-computed in-hand and CTC — **no new math**; consistency depends on using the same methodology for each offer.

## Income tax & regime comparison (`income-tax.ts`, `annual-tax.ts`, `tax-regime-comparison.ts`)

- **Slabs & cess**: Progressive slab tax plus **4% health and education cess** on tax after rebate (not on income).
- **Section 87A**: **Simplified**:
  - Old regime: rebate up to ₹12,500 when taxable income ≤ ₹5,00,000 (verify FY-specific rules).
  - New regime: full rebate of tax when taxable income ≤ ₹7,00,000 (verify FY-specific rules and conditions).
- **Not modeled**: Surcharge, marginal relief, rebates beyond 87A, perquisites, capital gains, loss set-off, alternate minimum tax, etc.

## EPF (`epf.ts`)

- **Estimates** employee + employer contributions as rates × PF wage (with optional ceiling).
- **Simplified**: Employer EPS/EDLI/admin splits are **not** separated.

---

## Where laws differ

- **Professional tax**: State-wise slabs; placeholders only until configured.
- **PF wage**: Employer-specific definitions of Basic+DA and caps.
- **HRA / rent**: Metro list and proof requirements.
- **Gratuity**: Covered vs non-covered employers; tax on excess beyond exempt limits.
- **Notice buyout**: Policy and contract wording.

---

## Maintenance

Update `lib/config/financial-year.ts` after each Union Budget when slabs, standard deductions, or rebate thresholds change. Cross-check with the **Income Tax Act** and **Finance Act** for the relevant assessment year.
