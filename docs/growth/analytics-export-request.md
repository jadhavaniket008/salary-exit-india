# Analytics export request

No GA4, Google Search Console, or Plausible dashboard was accessed to produce `00-baseline.md` or this growth system — no credentials/API access were available in this session. Pull the exports below manually (or grant a read-only GA4/GSC MCP/API connection) and re-run the baseline before Week 1 execution begins; nothing in Phases 1–15 blocks on this, but the Friday decision rules in `growth-dashboard-spec.md` need it to mean anything.

## GA4 — previous 90 days (2026-05-02 to 2026-07-31)

Pull each as a separate export (Explore → Free form, or the named standard report):

| Report | Dimensions | Metrics | Why |
|---|---|---|---|
| Traffic acquisition | Session default channel group, Session source/medium | Sessions, Engaged sessions, Engagement rate, Key events | Baseline channel mix before any new UTM-tagged campaign starts |
| Landing pages | Landing page + query string | Sessions, Engagement rate, Key events | Confirms whether `/salary-enough/[slug]` Reddit-linked pages or `/ctc-to-in-hand-calculator` picked up any traffic around the dates in the forensics report's timeline |
| Source/medium | Session source/medium | Sessions, New users, Key events | Direct check on whether `reddit.com`/`linkedin.com` referral shows up at all given the broken UTM tagging |
| Campaign | Session campaign | Sessions | Almost certainly empty/`(not set)` given the UTM issues — confirms the gap this system fixes |
| Events | Event name | Event count, Users | `page_view`, `calculator_use`, `calculator_started`, `salary_reality_check_use`, `offer_compare_submit`, `share_summary` — event-name totals |
| Calculator events by channel | Session source/medium + Event name | Event count | Cross of the two above — did any channel traffic actually start/complete a calculator |
| Returning users | New vs. returning | Sessions, Engaged sessions | Baseline for the "returning users" 90-day target |
| Referral traffic | Session source (referral only) | Sessions | Isolate non-search, non-social referrers (any existing backlinks) |
| Device category | Device category | Sessions, Engagement rate | Context for LinkedIn/Reddit mobile-heavy traffic |
| Country | Country | Sessions | Confirms India-majority audience as expected |

## Google Search Console — previous 3 months, compared to the prior 3 months

| Report | Filters | Why |
|---|---|---|
| Queries | None, sort by impressions | Branded ("salaryexit") vs. non-branded split; decision-intent query coverage |
| Pages | None, sort by clicks | Confirms which pages (if any) are earning organic clicks today — cross-check against the noindexed `/salary-enough/` pages Reddit links point to (they should show zero/near-zero if noindex is working correctly) |
| Countries | None | India-majority confirmation |
| Devices | None | Mobile vs. desktop split |
| Search appearance | None | Rich result eligibility (FAQ, breadcrumb) |
| Links | External links report | **This is the actual backlink-authority check** — GSC's own external-links report is the most reliable free source for "who links to us" and should be cross-referenced against `backlink-prospects.csv` outcomes |
| Coverage/Indexed pages | Valid vs. excluded | Confirms the flagship report (`/reports/india-in-hand-salary-model-2026`) gets indexed after launch, and that noindexed pages stay excluded as intended |

## LinkedIn (if company-page admin access becomes available)

Page visitors, Followers (total + net new), Post impressions, Reactions, Comments, Clicks, CTR, Follower demographics — **this entire category is currently `Unknown`** per the forensics report; no company-page export was found locally. This is the single highest-value LinkedIn export missing.

## Email

No delivery/open/click/reply dashboard exists for the Gmail-SMTP-based sends in `outreach/sent_log.csv` / `sent_log_b2b.csv`. If continuing to send via raw SMTP, add a BCC-to-self or switch to a provider with delivery tracking (see `outreach-templates.md` for the instrumentation this system adds going forward).

## Plausible (if enabled instead of/alongside GA4)

Same shape as the GA4 asks above — Visitors, Top sources, Top pages, Goal conversions (for the custom events already defined in `docs/analytics.md`) — as a cookie-free cross-check.

**Do not delay Phase 1–2 execution waiting for these** — the UTM system and flagship report are useful regardless of whether historical data is available. Re-run `00-baseline.md` once these exports land.
