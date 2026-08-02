# Reddit community rules — research status

**Important limitation, disclosed up front:** Reddit blocks this session's web-fetch tool directly (`reddit.com` and `www.reddit.com` both refused), and no third-party subreddit-rules database returned subreddit-specific results for r/personalfinanceindia, r/IndiaInvestments, or r/developersIndia — only generic Reddit-wide self-promotion guidance came back for those three. **Do not treat anything below as a verified current ruleset.** Before any post in Phase 6, whoever is executing it must manually open the subreddit, read the current sidebar/"Rules" tab and any pinned mod post, and confirm the rules haven't changed — this is a 2-minute manual check that this session could not substitute with automation.

## r/personalfinanceindia

- **Verified this session:** nothing subreddit-specific — search returned only generic Reddit self-promotion guidance.
- **What's known from the forensics report's own evidence:** this is the subreddit where the one clearly successful post happened (native data table, no link in the post itself, self-reported 100+ upvotes/90K+ views). That's strong first-party evidence about what this specific community rewards, independent of any formally published rule.
- **Working assumption pending manual verification:** treat as a strict low-self-promotion community. Post native value only; do not put a link in the body of a top-level post without checking the current rules first.

## r/IndiaInvestments

- **Verified this session:** nothing subreddit-specific.
- **What's known from the forensics report's own evidence:** the account's one post here ("20 sec video showing where your salary goes") got minimal traction (1 upvote, 2 views) and a duplicate was held for moderator approval — weaker signal than r/personalfinanceindia, but too small a sample (1 post) to conclude the community itself is a poor fit.
- **Working assumption pending manual verification:** similar profile to r/personalfinanceindia — Indian personal-finance/investing audience, likely moderated for self-promotion. Verify before posting.

## r/developersIndia

- **Verified this session:** nothing subreddit-specific.
- **What's known from the forensics report's own evidence:** a repost of the viral chart here was removed by moderators — the only channel-specific data point available, and it's a negative one.
- **Task's own scoping instruction:** use this subreddit "only for technical/build topics" — i.e., a post about *how the calculation engine works* (Offer 4 in `link-earning-offers.md`) is a better fit here than a salary-data post, given developer subreddits typically reward build/technical content over financial-advice-adjacent content. Verify current rules before posting either way.

## r/SideProject

- **Verified this session (via web search, not direct fetch):** self-promotion is the explicit intended use of this subreddit — makers post their own projects, unlike most subreddits. Guidance found: post about once every 3-4 weeks, each post should bring something genuinely new (launch, milestone, update, lesson learned), and the community expects reciprocity — the poster engaging with others' projects, not just dropping a link. Low-effort "check this out" posts, repeated reposts, and upvote-begging get removed even here.
- **What's known from the forensics report's own evidence:** the one post here got very little traction (1 upvote, 0 comments, 205 views) despite following a build-in-public format — a live, unresolved question for whether this subreddit is worth repeating (see the Phase 14 decision rule: "a campaign has no signal after three materially different tests" — one prior attempt here is not enough to conclude either way).

## Bottom line for Phase 6 execution

Only r/SideProject's self-promotion posture could be confirmed this session (indirectly, via search, not a direct rules fetch) — everything else needs a manual sidebar/rules check immediately before each post, every time, since subreddit rules and moderation postures change and this session had no reliable way to verify them live.
