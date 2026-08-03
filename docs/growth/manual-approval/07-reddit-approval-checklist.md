# Reddit approval checklist — BLOCKED

**Status: blocked. Do not post.** This is not a formatting or content issue — it is a hard rule-verification gap that this and the prior session were both unable to close.

## Why it's blocked

`docs/growth/reddit-community-rules-verified.md` (built in the prior session) records that `WebFetch` to both `www.reddit.com` and `old.reddit.com` returned "Claude Code is unable to fetch from [domain]" across every attempt, in both this and the prior session. A generic web search found only third-party aggregator pages with no India-specific subreddit rule content, and an external community wiki that turned out to carry no governance content either. All 4 target subreddits' current self-promotion/link rules remain **unverified**.

## The rule this session follows

Per this task's explicit instruction: **do not infer permission**. The prior campaign's forensics record (`docs/salaryexit-distribution-forensics.md`) shows 9 Reddit submissions across 7 subreddits, with 5 removed/held by moderators — direct evidence that posting without current, verified rules produces real removals, not just a theoretical risk.

## What would unblock this

Aniket (or anyone with normal, logged-in Reddit access — this session's `WebFetch` tool cannot authenticate or render Reddit's client-rendered rules pages) manually opens each target subreddit's rules/wiki page, confirms current self-promotion policy, and records it in `reddit-community-rules-verified.md`. Once that's done, `pilot-reddit-01`'s `approval_status` in `week-1-2-execution.csv` can move from `BLOCKED` to `pending manual approval` like every other row.

## Why this is worth resolving quickly

Of everything analyzed in `03-prior-campaign-impact-summary.md`, Reddit is the **only** channel with a real, clustered, high-engagement GA4 correlation (13 sessions in a 4-day window, 92% engaged). It is also the single most-blocked channel in this pilot. Closing this specific gap is higher expected-value than any other unresolved item in this package.
