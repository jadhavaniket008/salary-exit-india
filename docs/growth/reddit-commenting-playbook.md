# Reddit commenting playbook

Between native posts (max 1 every 2-3 weeks), the account should be answering relevant questions in the target communities — this builds the account credibility that was largely absent before (see the forensics report's finding that u/salaryexitindia had no established history when the templated batch went out).

## Rules

- Answer the actual question asked. A calculation or number is a complete answer — a bare link is not.
- Disclose authorship plainly when relevant: "I built a calculator for exactly this (salaryexit.in) — here's the number it gives for your numbers: ..." is honest; posting the number with no disclosure and a link at the end reads as covert marketing.
- Add a link only when it genuinely improves the answer (e.g., the commenter wants to plug in their own numbers) — not on every comment.
- Do not comment the same canned response across many threads. Compute a real number for their specific situation.
- Never argue with a moderator's removal decision in the thread or via modmail in a way that reads as pushing back — accept it, ask (once, politely) what would make it acceptable, and move on.

## Where to look for questions to answer

- r/personalfinanceindia and r/IndiaInvestments: search "CTC", "in-hand", "notice period", "PF", "old vs new regime" within the subreddit, sorted by new, for unanswered or under-answered questions.
- r/developersIndia: questions specifically about tech-role offer negotiation or CTC structuring (stay within the subreddit's likely comfort zone for financial topics — see `reddit-community-rules.md`).

## Cadence

Target 15-20 meaningful comments per week (per the LinkedIn/Reddit combined comment target in Phase 13) split roughly evenly between LinkedIn and Reddit — so approximately 7-10 Reddit comments/week. Quality over quantity: a genuinely useful, specific, calculated answer to one thread is worth more than five generic ones.

## Example — good vs. bad

**Bad (link-only, no computed value):**
> Check out salaryexit.in, it'll answer this for you.

**Good (answers the question, discloses authorship, link only because they'd want to explore variations):**
> For ₹18L CTC, new regime, roughly ₹1.35L/month in-hand after PF (~₹1,800), professional tax (~₹208), and TDS (~₹12,567) — assuming your Basic+DA is around 45% of gross and PF is on the statutory ceiling. If your employer uses full-Basic PF instead, that drops closer to ₹1.29L. (I built the calculator that ran this — salaryexit.in/ctc-to-in-hand-calculator — if you want to plug in your exact numbers, especially if your PT differs by state.)

## Tracking

Log meaningful comments (not every single one — just ones worth remembering for pattern-spotting) in a simple running note, not a formal CSV — comment-level tracking at this volume isn't worth the ledger overhead that `outreach-ledger.csv` and `campaign-ledger.csv` get for actual campaigns.
