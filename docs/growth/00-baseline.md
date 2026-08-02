# Growth baseline — 2026-07-31 (re-checked 2026-08-01)

Baseline snapshot before the 90-day growth-authority-system campaign begins. Source for every figure below is stated inline. `Unknown` means no GA4/GSC/Plausible dashboard was accessed to produce this document — see `analytics-export-request.md` for exactly what to pull.

**Re-checked for newly supplied exports (2026-08-01):** searched the repository root and common locations for any GA4/GSC/Plausible export files (CSV/XLS named for those tools) — none found. Every figure below remains `Unknown`. **Launch measurement is blocked pending these exports** — this does not block Phases 1-5 or the pilot preparation in Phase 9, per the task's own instruction, but the Phase-14-style weekly decision rules in `growth-dashboard-spec.md` have no real data to operate on until they land.

## Traffic (GA4/Plausible)

| Metric | Value | Source |
|---|---|---|
| Monthly sessions | Unknown | Requires GA4/Plausible export |
| Monthly users | Unknown | Requires GA4/Plausible export |
| Monthly pageviews | Unknown | Requires GA4/Plausible export |
| Organic-search sessions | Unknown | Requires GSC + GA4 export |
| Social sessions (LinkedIn + Reddit combined) | Unknown | Requires GA4 referral/source-medium export |
| Referral sessions (non-social) | Unknown | Requires GA4 export |
| Calculator starts | Unknown | `calculator_use`/`calculator_started` event counts — requires GA4 export |
| Calculator completions | Unknown | `calculator_use` (submit-based events) — requires GA4 export |
| Result shares | Unknown | `share_summary` event count — requires GA4 export |
| Returning users | Unknown | Requires GA4 retention report |

## Content and indexing

| Metric | Value | Source |
|---|---|---|
| Indexed pages | Unknown | Requires Google Search Console → Pages report |
| Top landing pages | Unknown | Requires GA4 Landing page report |
| Top queries | Unknown | Requires GSC → Queries report |
| Branded vs. non-branded search share | Unknown | Requires GSC Queries report, manually classified |

## Distribution channels (verified — see `docs/salaryexit-distribution-forensics.md`)

| Metric | Value | Source |
|---|---|---|
| LinkedIn posts published | 3 (personal profile only; company page activity unconfirmed) | `linkedin.xls` |
| LinkedIn 30-day organic impressions (06/22–07/21/2026) | 1,322 | `linkedin.xls` → Metrics |
| LinkedIn 30-day organic clicks | 17 | `linkedin.xls` → Metrics |
| LinkedIn followers | Unknown | No follower-count export found locally |
| LinkedIn average post reach | ~440 impressions/post (mean of 3 posts: 262, 610, 458) | `linkedin.xls` → All posts |
| Reddit posts/submissions | 9 distinct submissions across 7 subreddits (1 clear organic hit, 5 removed/held) | `reddit_post1/2.png`, `reddit_profile_1/2/3.png` |
| Email — college outreach sent | 68 (of 69 contacts, 1 dedup) | `outreach/sent_log.csv` |
| Email — college outreach reply rate | Unknown — SMTP-accept only, no open/click/reply tracking existed | `outreach/sent_log.csv` |
| Email — B2B outreach sent | 5 | `outreach/sent_log_b2b.csv` |
| Email — B2B outreach reply rate | Unknown | `outreach/sent_log_b2b.csv` |

## Authority

| Metric | Value | Source |
|---|---|---|
| Referring domains (independent, editorial) | 0 confirmed | `docs/salaryexit-distribution-forensics.md` §12 |
| Referring domains (social/UGC, nofollow) | 5 (2 Reddit posts still live, 3 LinkedIn posts) | Same |
| Third-party Domain Authority / Domain Rating | Unknown | Not verifiably available locally — this is explicitly a secondary metric per this campaign's strategic principle, not a target |

## Product surface (context, not a target — already built)

CTC-to-in-hand (+ gross-to-in-hand mode), reverse salary, Salary Reality Check, tax-regime comparison, HRA, EPF, notice-period buyout, gratuity, leave encashment, final settlement, offer comparison, city salary scenarios, salary/tax/job-switch guides, named creator + methodology, GA4 + Plausible event wiring, calculation-error reporting, dynamic OG images, accessibility/technical-SEO baseline (verified 100/100/100 Accessibility/Best Practices/SEO across 17 routes as of the most recent production smoke test in this workspace).

## What this baseline does NOT include

No paid traffic, no directory submissions, no press coverage, no podcast/YouTube presence, no Product Hunt launch — confirmed absent from local evidence (see forensics report §8).
