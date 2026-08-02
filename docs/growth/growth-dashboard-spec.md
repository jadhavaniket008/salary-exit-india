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

Third-party Domain Authority/Domain Rating (Moz/Ahrefs/Semrush) is tracked, if at all, as a once-a-month secondary sanity check — never as a weekly metric, and never as something this system optimizes toward. The primary authority metric is **relevant independent referring domains linking editorially to SalaryExit**, counted from `backlink-prospects.csv` + GSC's own Links report.
