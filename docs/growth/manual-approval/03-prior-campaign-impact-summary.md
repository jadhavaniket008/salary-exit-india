# Prior campaign impact — approval summary

Full analysis: `docs/growth/prior-campaign-impact.md`. Condensed for approval review.

| Prior activity | Classification | Real GA4 evidence |
|---|---|---|
| Reddit push (~2026-07-20–26) | **Strong correlation** | 13 of 15 total Reddit-attributed sessions land in a tight 07-19–22 cluster, 92% engaged — the clearest date-to-channel pattern in the dataset |
| LinkedIn post 2026-07-03 | Possible correlation | 1 same-day session — real but too thin to call strong |
| LinkedIn post 2026-07-07 | Unsupported | 0 sessions on or near this date |
| LinkedIn post 2026-07-14 | Unsupported | 0 sessions on or near this date |
| College outreach email 2026-07-25 | Possible correlation | Above-baseline `(direct)` day, but emails were never UTM-tagged so this can't be isolated from other causes |
| B2B outreach email 2026-07-27 | Unsupported | No elevation above baseline |

**No prior activity reaches "Verified"** — verified attribution requires a UTM-tagged link, and none of the historical links were tagged. This is exactly why `docs/growth/utm-standard.md` and the tagged URLs in `week-1-2-execution.csv` exist: this pilot's own activity will be verifiable in a way none of the prior activity was.

## What this means for approval priority

Reddit has the only real evidence of working, but it's currently **blocked** pending manual rules re-verification (see `07-reddit-approval-checklist.md`) — resolving that block is higher expected-value than adding more LinkedIn volume, based on actual evidence rather than assumption. This doesn't mean deprioritize LinkedIn — post 07-03's possible correlation and the unexplained 07-29 spike (4 LinkedIn sessions on an undocumented date) both suggest LinkedIn isn't dead, just unproven at current volume.
