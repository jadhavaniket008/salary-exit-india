# Tax wording certification

Full audit: `docs/growth/final-tax-wording-audit.md`. This file certifies, for approval purposes, that the two hard constraints on Section 87A wording are satisfied everywhere in the launch-facing content this pilot will publish.

## Constraint 1: never use the phrase "Section 87A rebate cliff"

**Status: satisfied.** Zero live-facing occurrences. The phrase survives only in two places, both intentionally: `report-claim-audit.md` (a historical audit trail explaining what was wrong — rewriting it would destroy the corrective record) and `docs/salaryexit-distribution-forensics.md` (a verbatim quote of what was actually posted on LinkedIn in a past, separate campaign — altering a quotation of real historical content would falsify evidence).

## Constraint 2: never state an unqualified "100% marginal tax rate" without distinguishing income tax before cess from total tax including cess

**Status: satisfied**, after this session's fix. The correct, verified distinction — 100% marginal rate on income tax before cess, 104% on total tax once the 4% health & education cess is added — is now applied consistently in:

- `lib/growth/in-hand-salary-model.ts` (the generating source — the flagship report, its CSV, and its JSON export all inherit this automatically)
- `docs/growth/linkedin-posts-weeks-1-4.md` (Week 2, Post 2 — the post this exact finding is built around)
- `docs/growth/media-kit/founder-and-product.md`
- `docs/growth/media-kit/summary-journalist.md`
- `docs/growth/media-pitches.md` (Pitch 1)
- `docs/growth/college-resource/first-offer-reality-guide.html` and the regenerated `.pdf`
- 3 CSV topic-label references (`backlink-prospects.csv`, `linkedin-12-week-calendar.csv`, `pilot-four-weeks.csv`)

**Regression protection**: `tests/growth-in-hand-salary-model.test.ts` (14 tests) includes two tests specifically guarding this — one asserting the 100%/104% distinction is present with the word "before cess," one asserting no finding anywhere states an unqualified "100%" without that qualifier nearby. Both pass.

## Independent verification performed

Binary-search + direct slab/rebate computation confirmed the zone (₹12,00,000–₹12,70,587 taxable income) and the marginal rates numerically, then cross-checked against `lib/calculators/FORMULAS.md` — a pre-existing, untouched core site document that already described this exact mechanism in "before cess" terms. Full trace in `final-tax-wording-audit.md`.

## Approval implication

The Week 2 Post 2 LinkedIn draft and the college resource guide, both built around this exact finding, are cleared on wording grounds. They still require Aniket's normal content/tone approval — this certification covers only the mandatory tax-accuracy constraint.
