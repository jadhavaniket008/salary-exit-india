# Growth dashboard specification

A weekly reporting spec, not a built dashboard — no BI tool was wired up in this pass. Compile these manually from GA4/GSC/`campaign-ledger.csv` every Friday (see Phase 14 decision rules in the final report / this doc's companion).

## Weekly metrics

| Metric | Formula / source | Why it's the right thing to track |
|---|---|---|
| Qualified sessions | GA4 sessions where `session_source` is in the approved UTM list (§`utm-standard.md`) AND engagement_time > 10s | Filters out bounce-only bot/click-fraud noise; "qualified" not "raw" |
| Campaign CTR | `campaign-ledger.csv`: clicks ÷ impressions, per row | Per-asset performance, not channel-wide vanity |
| Calculator-start rate | GA4 `calculator_started` (or `calculator_use`) events ÷ qualified sessions, filtered to UTM-tagged sessions | Did the click actually reach a tool, not just the page |
| Completion rate | Completion-type events (`calculator_use` submit, `salary_reality_check_use`, `offer_compare_submit`) ÷ starts | Did the tool get used to a result, not abandoned |
| Result-share rate | `share_summary` events ÷ completions | Organic amplification signal |
| Email reply rate | `outreach-ledger.csv`: replies ÷ sent (manual count — no dashboard) | The single most informative number for outreach quality given no open-tracking |
| Positive-reply rate | `outreach-ledger.csv`: positive replies ÷ replies | Distinguishes "got attention" from "got a good response" |
| Backlinks acquired (cumulative) | `backlink-prospects.csv` + `outreach-ledger.csv`: rows with `link_acquired = true` | The primary authority metric this whole system optimizes for |
| Referring domains (cumulative, unique) | Distinct domains among acquired backlinks, cross-checked against GSC's external-links report | See `analytics-export-request.md` — GSC Links report is the source of truth here, not self-reported |
| Organic impressions | GSC Performance, trailing 7 days | Leading indicator for the flagship report's SEO traction |
| Organic clicks | GSC Performance, trailing 7 days | — |
| Branded searches | GSC Queries containing "salaryexit"/"salary exit", trailing 7 days | Confirms whether distribution is building brand recall, not just one-off clicks |
| Returning users | GA4 new-vs-returning, trailing 7 days | Confirms whether any channel is building a repeat audience vs. one-time traffic |

## Weekly review format (Friday)

1. Pull the 14 metrics above for the trailing 7 days.
2. Update every row in `campaign-ledger.csv` that has a `status = live` or `sent` with its current impressions/clicks/sessions/etc. (manual — no auto-sync exists).
3. Apply the Phase 14 decision rules (continue / modify / stop) per channel and per content format.
4. Write one paragraph: what changed this week, what's the single most surprising number, what's next week's one experiment.

## Explicit non-goal

Third-party Domain Authority/Domain Rating (Moz/Ahrefs/Semrush) is tracked, if at all, as a once-a-month secondary sanity check — never as a weekly metric, and never as something this system optimizes toward. The primary authority metric is **relevant independent referring domains linking editorially to SalaryExit**, counted from `backlink-prospects.csv` + manual, independently-visible confirmation — the connected GSC MCP does not expose an external-links report (`GSC MCP does not expose external-link reporting.` — confirmed 2026-08-02 against all 8 tools it exposes: `search_analytics`, `enhanced_search_analytics`, `get_sitemap`, `list_sitemaps`, `list_sites`, `submit_sitemap`, `detect_quick_wins`, `index_inspect`). This does not block the pilot; it means referring-domain counts stay manually verified.

## Baseline-relative pilot thresholds (calculated 2026-08-02 from live GA4/GSC baseline)

Every "above account baseline" / "any measurable reach" phrase in `pilot-four-weeks.csv` previously had no real number behind it — the baseline was `Unknown`. It now resolves against the real weekly averages below, computed from the live GA4/GSC data in `docs/growth/00-baseline.md` and `docs/growth/generated/*.json` (90-day totals ÷ 12.857 weeks unless noted). These are genuinely low numbers — stated plainly rather than rounded up, because the whole point of a baseline-relative threshold is that it reflects where the site actually is, not where the campaign would like it to be.

| Metric | Current weekly baseline | Continue / scale threshold | Modify threshold | Stop / reassess threshold |
|---|---|---|---|---|
| Sessions (site-wide) | ~9.2/week (118 sessions / 90d) | ≥14/week (≥1.5×) sustained 2 consecutive weeks | 7–14/week (0.75×–1.5×) | <7/week (<0.75×) sustained 2 weeks with no engagement-rate gain |
| Engaged sessions (site-wide) | ~7.1/week (91 / 90d) | ≥11/week sustained 2 weeks | 5–11/week | <5/week sustained 2 weeks |
| Engagement rate | 77.1% (current 90d, up from 38.5% previous 90d — see `00-baseline.md`) | Holds at or above 70% while sessions grow | Drops below 60% as sessions grow (volume without quality) | Drops below 50% (traffic quality regressing) |
| `calculator_use` events | ~5.1/week (65 / 90d) | ≥8/week sustained 2 weeks | 3–8/week | <3/week sustained 2 weeks |
| LinkedIn engaged sessions (`linkedin.com/referral` + `linkedin_post_link`) | ~0.7/week (9 engaged / 90d) | ≥2 engaged sessions per individual post (already >2.5× the weekly baseline) | 1 engaged session per post | 0 engaged sessions across 2 consecutive posts of the same format — see `prior-campaign-impact.md` for why this bar is already this low |
| Reddit engaged sessions (`reddit/comment` + `reddit.com/referral`) | ~1.1/week (14 engaged / 90d) — but see note below | ≥4 engaged sessions within 72h of a post (matches the real 07-19–22 cluster documented in `prior-campaign-impact.md`) | 1–3 engaged sessions within 72h | 0 engaged sessions within 72h |
| GSC clicks (site-wide) | ~3.9/week (50 clicks / 90d) | Trending up week-over-week for 3+ consecutive weeks | Flat | Declining for 3+ consecutive weeks |
| GSC impressions (site-wide) | ~1,393/week (17,917 / 90d) | Not a stop/continue signal on its own — impressions already grew +146% over the previous 90d while clicks grew only +38.9% and CTR fell (see `00-baseline.md`); rising impressions alone is not treated as success | — | — |
| GSC quick-win pages CTR (`/lpa/12-lpa-in-hand-salary`, `/lpa/35-lpa-in-hand-salary`) | 0% CTR at positions 4–10 today (see `00-baseline.md` Quick-win opportunities) | Any non-zero CTR within 2 weeks of a title/meta rewrite is a real win against this exact baseline | — | No CTR movement 4 weeks after a title/meta rewrite ships — reassess the rewrite, not the page |

**Reddit note**: the ~1.1/week average blends a tight 4-day real cluster (13 engaged sessions in 07-19–22) with near-zero activity the rest of the quarter — see `prior-campaign-impact.md`. The per-post threshold above uses the cluster's actual magnitude, not the smoothed weekly average, because Reddit traffic in this dataset is bursty by nature, not steady.

**Why no threshold reaches "campaign-ledger.csv row-level UTM click counts" as a pilot-wide number**: zero sessions in the entire 90-day baseline carry a real UTM campaign parameter (see `00-baseline.md`). Every threshold above is therefore built from GA4's own channel/source classification, not from campaign-level UTM data — the pilot's own tagged links (via `utm-standard.md`) are what will make UTM-level thresholds possible starting in week 2 of live data.
