# Baseline snapshot (for approval review)

Full document: `docs/growth/00-baseline.md`. Raw sanitized data: `docs/growth/generated/*.json`. This file is a one-screen excerpt for the approval review — read the full baseline before approving spend of time/outreach quota against it.

## The five numbers that matter most for this decision

| # | Finding | Why it matters for approval |
|---|---|---|
| 1 | 118 sessions / 90 days, up 81.5% from the prior 90 days, with engagement rate up from 38.5% to 77.1% | The site is growing off a very small base — every pilot success threshold in `04-pilot-thresholds.md` is calibrated to this small base, not to generic SaaS benchmarks |
| 2 | 0 of 658 distinct GSC search queries contain "salaryexit" | Zero brand recognition in search. Nothing in the pilot should be evaluated against an assumption of existing brand pull |
| 3 | The flagship report has 0 GA4 landing sessions and is not indexed by Google | The asset every outreach email in this pilot links to currently has no organic discovery path of its own — outreach is the only thing currently capable of driving it traffic |
| 4 | Reddit is the only channel with a real, clustered GA4 correlation (13 sessions in a 4-day window matching the known posting dates) | This is real evidence Reddit traffic converts to sessions when it runs — the fact it's currently blocked (see `07`) is the single highest-value thing to unblock |
| 5 | GSC found 14 quick-win opportunities worth an estimated ~152 clicks/quarter from a 10-minute title rewrite, against a real 50-click quarterly total | Tripling organic clicks via a metadata edit is a larger expected-value action than most items in the social/outreach queue, and it needs separate approval (it touches live page metadata, which this task's constraints treat as more sensitive than the growth-system's own docs) |

## What is explicitly NOT claimed

- No claim that any specific past LinkedIn or email activity caused site traffic beyond what `03-prior-campaign-impact-summary.md` supports.
- No claim about branded search recall, follower counts, or third-party Domain Authority — none of these are measurable from the connected sources.
- No claim that GSC's "0 indexed" sitemap rollup means the site is invisible to Google — it's contradicted by real click/impression data across dozens of pages; only the specific flagship-report page is confirmed unindexed via a direct, reliable per-URL check.
