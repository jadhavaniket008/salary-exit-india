# Launch summary — SalaryExit growth pilot

**Prepared**: 2026-08-02. **Pilot start (proposed)**: 2026-08-04. **Status**: awaiting Aniket's manual approval on every individual asset in `docs/growth/week-1-2-execution.csv` — nothing in this package has been published, sent, or posted.

## What this package is

The final gate before the four-week growth pilot (built in the prior session, `docs/growth/pilot-four-weeks.csv`) goes live, now re-grounded in real GA4 and GSC data pulled live via MCP on 2026-08-02 instead of the `Unknown` placeholders the pilot was originally built against. Nothing about the pilot's content changed structurally — the tax-wording fix (file `02`) and the real baseline (file `01`) are what's new.

## Real baseline in one paragraph

Over the trailing 90 days: 118 GA4 sessions (up 81.5% from the preceding 90 days), 91 engaged sessions (up 264%), 77.1% engagement rate (up from 38.5%), 50 GSC clicks and 17,917 impressions (impressions up 146.3% but clicks only up 38.9% and average position got worse, 7.5→13.0). Zero sessions carry a real UTM campaign tag. Zero branded search queries appear anywhere in 658 distinct GSC query rows. The flagship report (`/reports/india-in-hand-salary-model-2026`) has zero GA4 landing sessions and is not indexed by Google (`URL is unknown to Google`). Full detail: `01-baseline-snapshot.md` and `docs/growth/00-baseline.md`.

## What changed since the last (task D) pass

1. **Tax wording corrected** — the Section 87A marginal-relief finding now distinguishes 100% marginal rate on income tax before cess from 104% on total tax including cess, everywhere it appears (6 files + the generating code + regenerated CSV/JSON/PDF). See `02-tax-wording-certification.md`.
2. **Baseline is real, not `Unknown`** — `00-baseline.md` fully rewritten from live GA4/GSC data.
3. **Prior campaign impact is evidence-based, not assumed** — `03-prior-campaign-impact-summary.md` classifies every known LinkedIn/Reddit/email date against actual day-level GA4 sessions. Reddit is the only channel with a real, clustered, multi-session correlation.
4. **Pilot thresholds are baseline-relative, not generic** — `04-pilot-thresholds.md`.
5. **A real, zero-cost SEO quick win was found** — two LPA "meaning" pages rank positions 4–10 for high-volume definitional queries with 0% CTR; a title/meta rewrite is estimated (by GSC's own model) to add ~152 clicks/quarter against a current quarterly total of 50. Not yet executed — flagged here as an option for the pilot owner to approve separately from the social/outreach queue.

## What has NOT changed

The core calculation engine (`lib/calculators/`, `lib/config/financial-year.ts`) — untouched throughout every phase of this and the prior session. The flagship report's numbers, methodology, and disclaimers — untouched. The tiered backlink prospect list and Reddit rules verification from the prior session — carried forward as-is (see `07-reddit-approval-checklist.md` for why Reddit stays blocked).

## Approval required before anything executes

Every row in `docs/growth/week-1-2-execution.csv` (18 items: 7 LinkedIn posts, 1 Reddit post — currently blocked, 10 outreach emails) needs Aniket's explicit go-ahead, asset by asset. This package does not grant that approval — it prepares everything needed to make each individual decision quickly and with real data behind it.
