# Final Section 87A wording audit — 2026-08-02

Triggered by this task's hard constraints: don't use the phrase "Section 87A rebate cliff," and don't describe the marginal-relief band as a simple "100% marginal tax rate" without distinguishing income tax before cess from total tax after cess. This audit searched the entire repository, corrected every live-facing occurrence, and independently re-verified the underlying number against `lib/calculators/FORMULAS.md`'s own pre-existing documentation.

## Search performed

```text
rebate cliff
87A cliff
100% marginal rate
100%-marginal-rate
12,70,587
12,70,588
₹12.71 lakh
```

Across: the flagship report and its data module, CSV/JSON exports, LinkedIn drafts, Reddit drafts, media kit, journalist pitches, the college PDF/HTML, OG images, social cards, and accessible text summaries.

## What was found and fixed

**"Rebate cliff" phrasing**: zero live-facing occurrences remained from this session's prior work (already corrected in the previous pass — see `docs/growth/report-claim-audit.md`). The phrase survives only inside that audit document itself (explaining, historically, what was wrong and why) and inside `docs/salaryexit-distribution-forensics.md` (verbatim quotes of what was *actually posted* on LinkedIn in a prior, separate campaign — rewriting a forensic quotation of real historical content would falsify the evidentiary record, so those are left untouched).

**Unqualified "100% marginal rate" claims**: found in 6 live-facing files (`lib/growth/in-hand-salary-model.ts`'s generated finding, `linkedin-posts-weeks-1-4.md`, `media-kit/founder-and-product.md`, `media-kit/summary-journalist.md` ×2, `media-pitches.md`, `college-resource/first-offer-reality-guide.html`, plus 3 CSV topic-label references). **All fixed** to distinguish:

- **Income tax before cess**: rises at exactly **100%** marginal rate within the ₹12,00,000–₹12,70,587 taxable-income band (verified: `rebate = max(0, slabTax − excess)` means `taxAfterRebate = excess = taxableIncome − ₹12,00,000` throughout the band — see `lib/calculators/income-tax.ts`'s `rebate87ANewRegime`).
- **Total tax liability including the 4% health & education cess**: rises at **104%** marginal rate in the same band (`totalTax = 1.04 × (taxableIncome − ₹12,00,000)`, so every ₹1 of extra taxable income costs ₹1.04 in total tax) — meaning net take-home can fall slightly for a marginal rupee earned in this exact range, not just stay flat.

## Independent verification

Numeric trace (binary search + direct slab/rebate computation) confirmed:

| Taxable income | Income tax before cess | Cess (4%) | Total tax (incl. cess) |
|---|---|---|---|
| ₹12,00,001 | ₹1 | ₹0.04 | ₹1.04 |
| ₹12,50,000 | ₹50,000 | ₹2,000 | ₹52,000 |
| ₹12,70,587 (zone end) | ₹70,587 | ₹2,823.48 | ₹73,410.48 |

Marginal-rate check over a ₹10,000 step inside the band: total tax rises by exactly ₹10,400 → **104%** marginal rate, confirmed.

**Cross-checked against a pre-existing, independent source**: `lib/calculators/FORMULAS.md` (a core site document, not touched by this growth-system work) already documents this exact mechanism in its own words: *"New regime marginal relief: just above the limit, tax before cess is capped at (taxable income − limit)... Relief phases out once slab tax exceeds the excess (~₹12.71L taxable for FY 2026-27)."* This independently confirms both the ~₹12.71L zone boundary and the "before cess" framing this audit now applies consistently everywhere else.

## Required meaning check

Per the task's suggested template, the corrected finding (in `lib/growth/in-hand-salary-model.ts`) now states:

> "Under the configured new-regime rules, marginal relief limits income tax immediately above ₹12,00,000 taxable income... In this ₹70,587-wide transition band..., income tax before cess broadly tracks the amount by which taxable income exceeds ₹12,00,000 — an effective 100% marginal rate on income tax alone. Health and education cess is applied separately on top: including the 4% cess, the marginal rate on total tax liability in this band is 104%... SalaryExit calculates this boundary from its configured [FY] tax engine — it is a model result, not a separately published statutory threshold."

This satisfies all four required distinctions: (1) ₹12L taxable income is explicitly separated from ₹12L CTC elsewhere in the same finding set (see the adjacent CTC-band finding); (2) "marginal relief" is named explicitly, distinct from "the rebate" itself; (3) income tax before cess (100%) is explicitly separated from total tax after cess (104%); (4) the boundary is explicitly labeled a model result, not a published statutory number.

## Regression tests updated

`tests/growth-in-hand-salary-model.test.ts` — 14 tests (was 12): added one asserting the before/after-cess distinction is present with the correct 100%/104% figures, and one asserting no finding anywhere states an unqualified "100%" without "before cess" nearby.

## Files touched this pass

`lib/growth/in-hand-salary-model.ts` (source finding + helper doc comment), `public/data/salaryexit-in-hand-model-2026.{csv,json}` (regenerated), `tests/growth-in-hand-salary-model.test.ts`, `docs/growth/linkedin-posts-weeks-1-4.md`, `docs/growth/media-kit/founder-and-product.md`, `docs/growth/media-kit/summary-journalist.md`, `docs/growth/media-pitches.md`, `docs/growth/college-resource/first-offer-reality-guide.html` (+ regenerated `.pdf`), `docs/growth/backlink-prospects.csv`, `docs/growth/linkedin-12-week-calendar.csv`, `docs/growth/pilot-four-weeks.csv`.

## What was NOT changed

`lib/calculators/` and `lib/config/financial-year.ts` (the core site's calculation engine) — untouched, as in every prior pass. This audit only touched the growth-system's own report-generation code and launch content.
