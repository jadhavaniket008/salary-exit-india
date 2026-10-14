# October financial trust and conversion changes

Starting commit: `abaf2126a811ad4bd4e7061d15302a40cf0e087e`.
Branch: `growth/financial-trust-and-revenue`. No merge or deployment authorized.

## Scope and release blocker

Correct existing examples and search answers, instrument existing conversion paths,
and demonstrate the existing embed. No new product, route, programmatic page or redesign.
12/35 LPA titles answer annual/monthly meaning before the illustrative in-hand figure.
8/18 LPA titles remain unchanged for directional comparison; their shared body receives
the same financial clarifications, so they are not a randomized control group.

**Do not call the current PF model up to date.** During final source verification,
official September 2026 releases established a wage-ceiling increase to ₹25,000
effective 17 September 2026. Existing shared calculations and the original report
retain a ₹15,000 cap. This scoped change prominently labels that historical assumption
on the homepage, LPA pages, edited city guides, report, business demo and standalone embed.
The date-sensitive PF engine migration, historical report versioning and regeneration
of dependent outputs remain a release blocker; they are not silently folded into this pass.

## Financial verification

- [Ministry of Labour/PIB implementation notice, 23 September 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2313790&lang=2&reg=48):
  ceiling ₹25,000 from 17 September; employers must update payroll. At 12%, the capped
  employee contribution can be ₹3,000/month, not ₹1,800.
- [Income Tax Department — tax computation](https://www.incometaxindia.gov.in/w/tax-rates-and-computation):
  surcharge begins above ₹50L taxable income; first tier 10% of income tax, with marginal
  relief. ₹30L/₹35L salary-only gross does not itself trigger surcharge.
- [Income Tax Department — salary deductions](https://www.incometaxindia.gov.in/w/deductions/allowances-allowed-to-a-salaried-employee):
  ₹75,000 new-regime salary standard deduction. ₹15L gross therefore gives ₹14.25L taxable,
  ₹97,500 annual tax including cess. With the explicitly historical ₹1,800 employee PF
  and ₹200 PT monthly inputs, the example gives ₹114,875/month. This is not a claim
  about current statutory PF or all ₹15L CTC offers.
- ₹12L gross with full-Basic PF: 35% Basic → ₹4,200/month; 50% Basic → ₹6,000/month.
  Prior prose incorrectly said ₹5,040/₹7,200. The cap and full-Basic cases are distinct.
- Pune/Bangalore examples compute gross-to-net and budget surplus through one helper,
  with rent/spend clearly marked as illustrative inputs. Unsupported rent averages and
  impossible net-above-gross ranges were removed from these two guides.

## Instrumentation and monetization

See `docs/analytics.md` for exact event definitions. Business mailto and referral clicks
are intent events, never purchases or submitted leads. Newsletter success is only after
provider acceptance; repeats need not be unique subscribers. The embedded table has no
analytics loader and copy measurement is opt-in only on the business page.

The free branded table now has a visible business demo and copy control. The commercial
offer is a scoped setup/support pilot; no nonexistent self-service API or fixed response
SLA is promised. No partner enrollment, payment collection or outreach was performed.

## Measurement checkpoints

Day 0 is a separately authorized, verified production deployment after release blockers
are resolved. These are checkpoints, not scheduled automations. Freeze deployment SHA
and the preceding 28 settled GSC days; retain the September 13–October 10 baseline.
Filter GA4 to the production hostname and exclude known internal/test traffic.

| When | Check | Decision |
|---|---|---|
| D+7 | 12/35 titles, canonical/indexability and crawl status; one permitted test per custom event; GA4 custom definitions; consent denied/withdrawn; partner destination and business email | Fix collection/rendering faults immediately; no SEO winner claim |
| D+14 | Per-page/query/device clicks, impressions, CTR and position vs baseline; organic/referral sessions with calculator use; report download intent and business inquiries | Treat low counts as inconclusive; separate rank/query-mix changes from title effects |
| D+28 | Settled 28-day GSC comparison; qualified sessions; actual inquiries, quotes, paid pilots and reconciled partner payouts; time spent per channel | Keep direction if qualified traffic improves; no revenue claim from clicks; revise one weak treatment at a time |

Register event-scoped dimensions in GA4 Admin separately. Do not invent revenue values.
Confirm active newsletter credentials and referral payout eligibility before describing
either as an operational revenue/retention channel. A dedicated paid-pilot ledger should
record quote, paid invoice, support time and renewal status; never publish customer details
or private analytics exports in this public repository.

## Validation results — 14 October 2026

- `npm test`: 32 suites, 187 tests passed.
- Production `next build`: passed; 222 static-generation entries. Local QA build used
  ad slots off, affiliate UI on, and consent banner on; no production env was changed.
- `tsc --noEmit`: passed. Fixed a pre-existing test-only narrowing error by storing
  `sanitizeNumber`'s result before asserting its discriminated union value.
- ESLint on all 25 changed TypeScript/TSX files: passed. Full repository ESLint remains
  failing with 176 pre-existing errors and 2 warnings (starting baseline: 195 errors,
  2 warnings). No lint rules were disabled.
- Site integrity: passed, 109 pages / 13 calculators / 37 salary-enough pages.
  Used `node --import tsx scripts/check-site-integrity.ts` because the `tsx` CLI's IPC
  socket was unavailable in this runtime.
- Rendered HTML checks: passed for homepage, 12/35 LPA, Pune/Bangalore guides, business,
  report and standalone embed. Verified PF notices, key amounts, complete selected
  titles and the business mailto destination. Browser visual QA was not completed:
  the installed Playwright package had no Chromium executable; no browser was installed.
- `git diff --check`: passed. Graphify update could not run because its executable
  is absent. The calculation engine and tax/PF configurations were not changed.
