# Reddit — 12-week native post drafts

Maximum 1 major native post every 2-3 weeks (per the task's explicit cadence rule) — these are the 5 post concepts specified, drafted for manual review. **None have been posted.** Verify current subreddit rules (`reddit-community-rules.md`) immediately before each one goes out, and do not post the same content to more than one subreddit — that repetition is exactly what got 5 of 9 prior posts removed or held (see `docs/salaryexit-distribution-forensics.md` §6).

## Concept 1 — Updated 5-50 LPA model with methodology

**Target subreddit:** r/personalfinanceindia (the one that worked before)
**Earliest date:** Week 1 (launch week)
**Format:** Native data table + methodology, no link in the post body (matches the pattern of the post that actually worked)

**Draft:**
> Title: Updated the 5-50 LPA in-hand breakdown from a few months back — now with methodology and PF scenarios
>
> A while back I posted a table breaking down what every salary from ₹5-50 LPA pays in-hand after tax and PF. A few people asked how the numbers were generated and whether they'd change if your employer structures PF differently — so here's an updated version with the actual methodology shown, plus a side-by-side of statutory-ceiling PF vs. full-Basic PF at the same CTC.
>
> [Table: CTC | Statutory-ceiling PF in-hand | Full-Basic PF in-hand | Monthly difference — pulled from the flagship report's data]
>
> Methodology: new regime, FY 2026-27 slabs, Basic+DA modeled at 45% of gross, PF at 12% of PF wage (capped at ₹15,000/month statutory ceiling in one column, uncapped in the other), professional tax ₹2,500/year.
>
> Happy to run a different CTC band or city if useful — the full model with CSV is at [link only if/when rules confirm it's allowed; otherwise link in first comment].

**Notes for whoever posts this:** confirm current subreddit link-placement rules before deciding body-link vs. comment-link. This is a genuine update to the original viral post's topic, not a repost of identical content — the PF comparison column is new and specific.

## Concept 2 — Same CTC, three employer-cost structures

**Target subreddit:** r/IndiaInvestments
**Earliest date:** Week 3-4 (after Concept 1, respecting the 2-3 week cadence)
**Format:** Native worked example

**Draft:**
> Title: Two ₹20L offers, identical CTC — how different employer-cost structuring changes your monthly in-hand
>
> Question that comes up a lot: "same CTC, why is my friend's in-hand higher than mine?" Modeled it out — at ₹20L CTC, an 8%-employer-cost offer vs. an 18%-employer-cost offer can differ by roughly ₹[X]/month in-hand, purely from how much of the package is PF/gratuity/insurance vs. fixed cash. Full breakdown and the CTC-to-in-hand calculator that generated this: [link, placement per current rules].
>
> What's your employer's PF/gratuity split look like relative to your CTC? Curious how common the leaner vs. heavier structures actually are.

## Concept 3 — Capped PF vs. full-Basic PF

**Target subreddit:** r/IndiaInvestments or r/personalfinanceindia (pick based on which performed better after Concepts 1-2, per Phase 14's decision rules)
**Earliest date:** Week 6-7
**Format:** Native worked example, framed as a trade-off question, not just a stat dump

**Draft:**
> Title: Choosing full-Basic PF over capped PF costs you real monthly cash — is it worth it for the bigger retirement corpus?
>
> At ₹20L CTC, switching from statutory-ceiling PF to full-Basic PF reduces monthly in-hand by roughly ₹[X] (about ₹[X]/year) — modeled it precisely instead of going by the usual rule of thumb. Curious what people actually choose when their employer gives them the option, and why.

## Concept 4 — Required CTC for ₹1 lakh monthly in-hand

**Target subreddit:** r/developersIndia (technical/build framing, per the task's scoping instruction for this subreddit) or a general subreddit if the audience fits better after Concepts 1-3's data comes in
**Earliest date:** Week 9-10
**Format:** Build/technical framing — how the reverse-solve works, not just the output

**Draft:**
> Title: Built a reverse salary calculator — binary-searches for the CTC that produces your target in-hand instead of the usual "just multiply by 1.3" heuristic
>
> Wanted to answer "what CTC do I need for ₹1L/month in-hand" properly instead of guessing. Turns out it's not a single number — it's a range (₹13.3L-₹14.9L depending on employer-cost structure) because the CTC-to-gross conversion isn't fixed. Wrote a binary search against the tax/PF engine to solve it properly. Happy to talk through the implementation if useful — it's a genuinely interesting small algorithm problem (monotonic in-hand-vs-gross relationship makes it well-suited to binary search).

**Notes:** this is the one post explicitly framed around the build/technical problem, matching the subreddit's likely culture per `reddit-community-rules.md`. Do not use the same title/framing that got the earlier r/developersIndia chart repost removed.

## Concept 5 — What SalaryExit got wrong and fixed

**Target subreddit:** r/personalfinanceindia or r/IndiaInvestments, whichever built more account credibility from Concepts 1-3
**Earliest date:** Week 12
**Format:** Transparency/build-in-public — a genuine correction, not a marketing post

**Draft:**
> Title: A user caught a real bug in our tax calculator — here's what was wrong and how we fixed it
>
> [To be filled in with an actual, real bug/fix once one exists and is confirmed via the site's calculation-error report link — do not publish a fabricated bug. This concept only fires if there is a genuine correction to report by week 12; otherwise skip this week's post rather than inventing content.]

**This concept has an explicit precondition:** it requires a real, verifiable calculation fix to have happened. Do not write or post this until that's true — publishing a fabricated "we found a bug" post would itself violate the hard constraint against fabricating content.
