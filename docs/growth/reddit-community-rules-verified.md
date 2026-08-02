# Reddit community rules — verification attempt (2026-08-01)

**Verdict: all 4 communities remain BLOCKED pending Aniket's manual check.** Per the task's explicit instruction — "if any rule cannot be verified, label that community blocked... do not infer permission" — nothing below is inferred as permission to post. This supersedes `reddit-community-rules.md` from the prior pass with a documented, expanded verification attempt.

## What was attempted this session

1. Direct fetch of `www.reddit.com/r/{sub}/about/rules/` — **blocked** ("Claude Code is unable to fetch from www.reddit.com").
2. Direct fetch of `old.reddit.com/r/{sub}/about/rules/` — **blocked** (same tool restriction, confirmed applies to the old.reddit.com subdomain too, not just www).
3. Targeted web search for subreddit-specific self-promotion/rules text (`"r/personalfinanceindia" rules wiki self promotion`, `r/IndiaInvestments wiki rules`) — returned only generic third-party "Reddit self-promotion rules" aggregator sites with no India-specific subreddit data, plus one genuine find: an external, non-Reddit community wiki.
4. Fetched the external community wiki (`indiainvestments.wiki`, maintained by r/IndiaInvestments' own community, hosted off Reddit's domain and not blocked) — checked both its homepage/link index and its FAQ page. **Confirmed this wiki exists and is fetchable, but contains no rules/moderation/self-promotion content** — it's a pure financial-education content wiki (stocks, bonds, Excel, getting-started guides), not a governance document. Ruled out as a source.
5. No equivalent community wiki was found for r/personalfinanceindia, r/developersIndia, or r/SideProject.

## Per-community status

### r/personalfinanceindia
- Self-promotion rule: **Unverified — blocked**
- Link rule: **Unverified — blocked**
- Account-age/karma requirements: **Unverified — blocked**
- Flair requirements: **Unverified — blocked**
- Approval requirements: **Unverified — blocked**
- Research/data posts allowed: **Unverified — blocked.** (Note: the forensics report's first-party evidence shows a native data-table post here previously performed very well with no link in the post itself — this is a real, verified *outcome*, not a verified *rule*. It's evidence worth weighing, but it is not the same as confirming the current rule text, which may have changed.)
- Date verified: 2026-08-01 (attempted, not completed)
- Public source URL: none found

### r/IndiaInvestments
- Self-promotion rule: **Unverified — blocked**
- Link rule: **Unverified — blocked**
- Account-age/karma requirements: **Unverified — blocked**
- Flair requirements: **Unverified — blocked**
- Approval requirements: **Unverified — blocked**
- Research/data posts allowed: **Unverified — blocked**
- Date verified: 2026-08-01 (attempted, not completed)
- Public source URL: `indiainvestments.wiki` exists and was checked — confirmed it does not carry rules content

### r/developersIndia
- All fields: **Unverified — blocked**
- Date verified: 2026-08-01 (attempted, not completed)
- Public source URL: none found

### r/SideProject
- All fields: **Unverified — blocked**, despite one piece of indirect evidence: a general web search in the prior pass surfaced third-party summaries describing self-promotion as the intended, welcomed use of this subreddit (post your own project, roughly once every 3-4 weeks, engage reciprocally with others). **This is still not a direct fetch of the subreddit's own current rules** and is not treated as verified permission here.
- Date verified: 2026-08-01 (attempted, not completed)
- Public source URL: none found (indirect third-party summaries only, cited in the prior pass's `reddit-community-rules.md`)

## What this means for Phase 9

The four-week pilot's "maximum one original Reddit post... only in a community whose rules were verified" constraint means: **as of this document, zero communities qualify.** `pilot-four-weeks.csv` reflects this honestly — the Reddit row is scheduled as a manual pre-check task (Aniket opens the target subreddit, reads the current sidebar/rules tab, confirms in writing) that must complete and pass *before* the post itself, not as an assumed-clear post.
