# SalaryExit Distribution Forensics

**Prepared:** 2026-07-31
**Scope:** Reconstruction of all distribution/traffic-acquisition activity for salaryexit.in found in this repository's working directory (not committed to git — see §2). No new content created, nothing published, no code changed, no platforms accessed beyond public read-only inspection.

---

## 1. Executive Summary

SalaryExit has run real, verifiable distribution activity across three channels — LinkedIn (3 organic posts from a personal profile), Reddit (at least 9 distinct submissions across 7 subreddits), and cold email (73 messages: 68 to college placement cells, 5 to HR-tech/job-board companies) — plus one short launch video. All of it is genuinely low-volume by the numbers: **17 total LinkedIn clicks in 30 days, one Reddit post that clearly worked (100+ upvotes / 90K+ views, self-reported) followed by a template repeated across 5+ subreddits that was mostly removed or held for moderator approval, and 73 cold emails with zero recorded opens, replies, or bounces** (the send script only logs SMTP-accepted, not delivered/opened/clicked). None of this activity is committed to git — it lives entirely in gitignored local files (`/outreach/`, `/reddit_posts/`, `*.xls`, `/*.png`), so there is no repo-based audit trail; this report is reconstructed from those local files directly.

The core finding is not "distribution failed everywhere" — it's more specific: **the one thing that worked (a native-value data table on r/personalfinanceindia) was not self-promotional and barely linked to the site; everything that was more directly promotional (a follow-up post, a templated city-page blitz across subreddits, cold email) performed far worse or was removed.** That is a real, evidence-backed pattern, not a vague "distribution is hard" conclusion.

## 2. Evidence Inspected

| Source | Location | Tracked in git? |
|---|---|---|
| Growth strategy doc | `docs/SEO_GROWTH_PLAYBOOK.md` | Yes |
| Analytics/event conventions | `docs/analytics.md` | Yes |
| Launch QA checklist | `docs/launch-qa-checklist.md` | Yes |
| College outreach: contacts, sender script, send log | `outreach/contacts.csv`, `outreach/send_outreach.py`, `outreach/sent_log.csv`, `outreach/needs-verification.md` | **No** — `/outreach/` is gitignored |
| B2B outreach: contacts, sender script, send log | `outreach/b2b_contacts.csv`, `outreach/send_b2b_outreach.py`, `outreach/sent_log_b2b.csv` | **No** |
| Airtable screenshots (source of college contact list) | `airtable/*.png` (6 files) | **No** — `*.png` gitignored |
| LinkedIn official analytics export | `linkedin.xls` (sheets: `Metrics`, `All posts`) | **No** — `*.xls` gitignored |
| Reddit — original viral post + follow-up post (screenshots) | `reddit_post1.png`, `reddit_post2.png` | **No** |
| Reddit — full account activity overview (screenshots) | `reddit_posts/reddit_profile_1.png`, `_2.png`, `_3.png` | **No** — `/reddit_posts/` gitignored |
| Launch video (`/brag` skill output) | `brag-output/brag-plan.md`, `composition-brief.md`, `brag.mp4`, `brag.jpg`, `share-copy.txt` | **No** — `/brag-output/` gitignored |
| Git history (82 commits, all branches) | `git log --all`, `git grep` across all commits | N/A |
| Production site (public, unauthenticated) | `https://www.salaryexit.in` (curl only) | N/A |

**Not inspected / not available:** GA4 dashboard, Google Search Console dashboard, Plausible dashboard, LinkedIn Company Page admin panel (only a personal-profile content export was found — see §5), Reddit's own analytics beyond what's visible in the account-owner screenshots, any email service provider's delivery/open/click dashboard (Gmail SMTP was used directly, which does not report opens/clicks at all).

## 3. Confidence and Limitations

- Everything in §§4–8 is graded **Verified** (I directly read the file/image and it states the fact), **Strongly supported** (multiple independent local artifacts agree), **Inferred** (a reasonable but unconfirmed connection between two pieces of evidence), or **Unknown** (no evidence either way).
- The 68-college and 5-company email counts, and the LinkedIn impression/click totals, are **Verified** — read directly from `sent_log.csv`/`sent_log_b2b.csv` and `linkedin.xls`.
- The "100+ upvotes, 90K+ views" figure for the original r/personalfinanceindia post is **self-reported by the author in a later Reddit post's own text** (visible in `reddit_post2.png`) — I viewed a screenshot of that original post directly (`reddit_post1.png`) but could not read its exact vote/view count at the screenshot's resolution, so that specific number is **Strongly supported**, not independently **Verified** by me.
- No GA4/GSC/Plausible dashboard access was available in this session, so I cannot state actual sessions, users, or conversions by channel — anywhere this matters, the table says `Unknown` and §18 lists exactly what export would resolve it.
- I did not browse to the public LinkedIn company page, the public Reddit posts, or the public Airtable base live — all evidence here comes from local screenshots/exports already captured in the repo's working directory, not fresh live browsing. This is disclosed, not hidden.

## 4. Chronological Activity Timeline

Dates are the best available evidence: in-content dates where present (LinkedIn's own "Created date" column, Reddit's own relative timestamps at the moment of screenshot), otherwise local file modification time. Where a date is inferred from a relative timestamp ("3 days ago") on a screenshot taken at a known time, this is marked.

| Date | Channel | Claude recommendation | Asset Claude generated | Action actually executed | Destination URL | Available result | Evidence source | Confidence |
|---|---|---|---|---|---|---|---|---|
| ~2026-07-03 | LinkedIn (personal profile) | Not separately documented | Post: "₹12 LPA vs ₹15 LPA — the Section 87A cliff" | Published, link in comments | salaryexit.in (via comment, exact URL unknown) | 262 impressions, 7 clicks, 2 likes, 1 comment, 0 reposts | `linkedin.xls` → All posts | Verified |
| ~2026-07-07 | LinkedIn (personal profile) | Not separately documented | Post: "₹50 LPA offer vs ₹2.8L in-hand — CTC vs in-hand gap" | Published, `lnkd.in/efa-bwAF` link in body | salaryexit.in (shortened) | 610 impressions, 7 clicks, 0 likes/comments/reposts | `linkedin.xls` → All posts | Verified |
| ~2026-07-14 | LinkedIn (personal profile) | Not separately documented | Post: "PF withdrawal vs transfer — the two clocks that reset" | Published, `lnkd.in/dkhm6P8Y` link in body | salaryexit.in (shortened) | 458 impressions, 4 clicks, 0 likes/comments/reposts | `linkedin.xls` → All posts | Verified |
| ~2026-07-20 (inferred from "3d ago" on a screenshot dated 2026-07-23) | Reddit — r/personalfinanceindia | Not separately documented | Data table: "What every salary from 5-50 LPA actually pays in-hand per month" | Published; **no site link in the original post itself** (link only surfaced after users asked, per the follow-up post's own text) | None in-post | Self-reported "100+ upvotes, 90K+ views" (see §3) | `reddit_post1.png`, `reddit_post2.png`'s body text | Strongly supported |
| ~2026-07-20/21 (screenshot "3d ago" as of 2026-07-23) | Reddit — r/SideProject | Not separately documented | Follow-up post: "Built a free calculator... after the Reddit thread blew up" | Published, plain `salaryexit.in` link in body | `salaryexit.in` (no UTM) | **1 upvote, 0 comments, 205 views** | `reddit_post2.png` | Verified |
| 2026-07-25 (file mtimes 20:13–20:14 local) | Contact sourcing | Not separately documented | None (manual screenshot capture) | Screenshotted an Airtable base of college placement-cell contacts | N/A | N/A | `airtable/*.png` | Verified |
| 2026-07-25 | Email — college outreach prep | Not separately documented | `contacts.csv` (68 rows), `send_outreach.py`, email template | Contacts transcribed from Airtable; 15 flagged as truncated/unverifiable and deliberately excluded from send | N/A | N/A | `outreach/needs-verification.md`, `contacts.csv` | Verified |
| 2026-07-25T15:05:59Z – 15:43:58Z | Email — college outreach send | Not separately documented | Personalized-per-college email, subject "Free salary-decoding tool for your placement-season students" | **68 emails actually sent** via Gmail SMTP (status: `sent` for all 68 — SMTP-accepted, not delivery/open confirmed) | salaryexit.in (no UTM) | No open/click/reply data available (Gmail SMTP does not report this) | `outreach/sent_log.csv` | Verified |
| 2026-07-25 (16:35–17:19 local) | Launch video | Not separately documented | 20s landscape video: CTC ₹18L → real in-hand ₹1,35,425 breakdown, using `/brag` skill | Rendered (`brag.mp4`) | salaryexit.in (wordmark only, no clickable link in the video itself) | No evidence found of where/whether this was published | `brag-output/*` | Verified (asset exists); **Unknown** whether published beyond the one Reddit post below |
| ~2026-07-24–26 (inferred from relative timestamps "15 hr ago" etc. on screenshots dated 2026-07-26 10:45–10:51 local) | Reddit — r/IndiaInvestments | Not separately documented | "Made a 20 sec video showing where your salary actually goes" — duration matches the brag video exactly | Published twice (once live, once a duplicate held for moderator approval) | `salaryexit.in/ctc-to-in-hand-calculator/?utm_source=redd` (in comment) | Live copy: 1 upvote, 2 views; duplicate: 1 upvote, 1 comment, pending | `reddit_posts/reddit_profile_3.png` | Inferred (video match) / Verified (post existence and stats) |
| ~2026-07-24–26 | Reddit — r/delhi | Not separately documented | Templated post: "is 20 LPA actually good money in Delhi..." | Published, link in comment `?utm=reddit` | `salary-enough/is-20-lpa-good-in-delhi?utm=reddit` | 1 upvote, 1 comment, 18 views — **live** | `reddit_profile_1.png` | Verified |
| ~2026-07-24–26 | Reddit — r/Chennai | Not separately documented | Same template, Chennai variant | Published | `salary-enough/is-15-lpa-good-in-chennai` (inferred) | **Removed by subreddit moderators** | `reddit_profile_1.png` | Verified |
| ~2026-07-24–26 | Reddit — r/pune | Not separately documented | Same template, Pune variant | Published | `salary-enough/is-18-lpa-good-in-pune` (inferred) | **Held: "Post is awaiting moderator approval"** (1 upvote, 2 comments visible before the hold) | `reddit_profile_2.png` | Verified |
| ~2026-07-24–26 | Reddit — r/mumbai | Not separately documented | Same template, Mumbai variant (posted twice) | Published (x2) | `salary-enough/is-20-lpa-good-in-mumbai` | One copy live (1 upvote, 1 view), duplicate **held for moderator approval** | `reddit_profile_2.png` | Verified |
| ~2026-07-24–26 | Reddit — r/bangalore | Not separately documented | Same template, Bangalore variant | Published | `salary-enough/is-15-lpa-good-in-bangalore` (inferred) | **"Removed by Reddit's filters"** (automated spam detection, not a human mod) | `reddit_profile_3.png` | Verified |
| ~2026-07-23 (post says "3 days ago") | Reddit — r/developersIndia | Not separately documented | Repost of the original viral chart/table content | Published | N/A (no link visible before removal) | **Removed by subreddit moderators** | `reddit_profile_3.png` | Verified |
| 2026-07-27 | Email — B2B outreach prep | Not separately documented | `b2b_contacts.csv` (5 companies: Keka, greytHR, Zimyo, Pocket HRMS, Foundit), `send_b2b_outreach.py`, 2 email templates (HRMS vs job-board) | Prepared | N/A | N/A | `outreach/b2b_contacts.csv` | Verified |
| 2026-07-27T10:04:37Z – 10:06:03Z | Email — B2B outreach send | Not separately documented | Pitch for API/iframe/white-label licensing of the calculation engine | **5 emails sent**, all logged `sent` | `salaryexit.in/for-businesses` (no UTM) | No open/click/reply data available | `outreach/sent_log_b2b.csv` | Verified |

## 5. LinkedIn Activity

- **Company page:** A LinkedIn company page was reportedly created (per your framing of this task); **no evidence of it was found in the local files** — the only export available (`linkedin.xls`) is a **content/post analytics export**, and every post in it is attributed to **"Posted by: Aniket Jadhav"** (a personal profile), not a company page. I found **no post, screenshot, or export in this repo showing the company page itself, its follower count, its About copy, its banner/logo, or any post published natively from the page.** This should be treated as **Unknown**, not "the company page underperformed" — I cannot assess something I have no evidence of.
- **Posting frequency:** 3 posts total in the 30-day exported window (07/03, 07/07, 07/14) — no posts after 07/14 through the export's end date (07/21).
- **Posts, format, and hooks** (all "text with an embedded/comment link" format, no carousel/document/video):

  | Date | Hook | Link placement | Impressions | Clicks | CTR | Likes | Comments | Reposts |
  |---|---|---|---:|---:|---:|---:|---:|---:|
  | 07/03 | "₹12 LPA vs ₹15 LPA — the biggest cliff in the salary structure" | In comments | 262 | 7 | 2.67% | 2 | 1 | 0 |
  | 07/07 | "A ₹50 LPA offer sounds like you've made it. Then the first payslip lands and it's ₹2.8L a month." | In body (shortened `lnkd.in`) | 610 | 7 | 1.15% | 0 | 0 | 0 |
  | 07/14 | "Every job switch, most people make the same PF mistake" | In body (shortened `lnkd.in`) | 458 | 4 | 0.87% | 0 | 0 | 0 |

- **Hashtags:** each post used 4–5 relevant tags (`#PersonalFinanceIndia`, `#EPF`, `#CareerAdvice`, `#SalaryNegotiation`, `#FinancialLiteracy`, `#IndiaJobs`, `#IncomeTaxIndia`, `#CareerGrowth`) — reasonable targeting, no evidence of spam-tag stuffing.
- **CTA:** all 3 end with an engagement question ("Have you ever...", "Drop your CTC in the comments") rather than a direct "try the calculator" instruction — a conversation-bait format, not a click-bait format.
- **30-day totals (Metrics sheet, 06/22–07/21):** 1,322 organic impressions, 906 unique impressions, **17 organic clicks**, 2 reactions, 1 comment, 0 reposts, 0.29% engagement rate. Zero activity in the first 11 days of the window (06/22–07/02) — consistent with the page/posting only starting around 07/03.
- **Amplification:** 0 reposts across all 3 posts and across the entire 30-day window — **no evidence any post was shared by a connection, follower, or third party.** Reach appears to be entirely LinkedIn's own organic-algorithm distribution, not network amplification.
- **Assessment:**
  - Useful without clicking: yes — each post states a complete, specific insight (the 87A cliff, the CTC/in-hand gap, the PF transfer rule), not a teaser.
  - Sounds promotional: no — reads as personal-narrative/observation, not an ad.
  - Sounds AI-generated: the structure (hook → problem → reveal → soft CTA → hashtags) is a recognizable template across all 3 posts, which could read as formulaic to a frequent LinkedIn reader, though the content itself is specific and accurate.
  - CTA specificity: weak by design (open-ended engagement bait) — this trades off against driving clicks, and the click numbers (4, 7, 7) bear that out.
  - Company-page distribution: **cannot be assessed — no evidence the page ever posted independently of the personal profile.**

## 6. Reddit Activity

**Every distinct submission found**, classified:

| Subreddit | Title/topic | Classification | Link in post or comment | Result | Votes/comments |
|---|---|---|---|---|---|
| r/personalfinanceindia | 5–50 LPA in-hand data table | **Data post** (native value, no promotional link in the post itself) | None in-post | **Live, high engagement** (self-reported 100+ upvotes, 90K+ views — see §3) | Unknown exact count |
| r/SideProject | "Built a free calculator... after the thread blew up" | **Build-in-public / launch announcement** | Link in body | Live | 1 upvote, 0 comments, 205 views |
| r/delhi | "Is 20 LPA good money in Delhi..." | **Native-value framed / link-adjacent** (post body has no link; OP's own comment carries the link) | Comment | Live | 1 upvote, 1 comment, 18 views |
| r/Chennai | Same template, Chennai | Same pattern | Comment (inferred) | **Removed by subreddit moderators** | 1 upvote visible before removal |
| r/pune | Same template, Pune | Same pattern | Comment (inferred) | **Held: awaiting moderator approval** | 1 upvote, 2 comments |
| r/mumbai | Same template, Mumbai (posted twice) | Same pattern | Comment | One live (1 upvote, 1 view), one **held for moderator approval** | — |
| r/bangalore | Same template, Bangalore | Same pattern | Comment (inferred) | **Removed by Reddit's own spam filter** (not a human mod) | 1 upvote, 1 comment visible before removal |
| r/IndiaInvestments | "Made a 20 sec video..." | **Data/demo post** | Comment (`?utm_source=redd`) | Posted twice: one live (1 upvote, 2 views), one **held for moderator approval** | — |
| r/developersIndia | Repost of the 5–50 LPA chart | **Data post** (repost of the r/personalfinanceindia format) | Unknown (removed before I could see) | **Removed by subreddit moderators** | — |

**Account:** u/salaryexitindia — a dedicated account, not a personal Reddit profile (distinct from the LinkedIn personal-profile pattern). I found no evidence of the account's pre-existing history, karma, or age.

**Assessment:**
- **Native value without clicking:** the original r/personalfinanceindia table and the r/IndiaInvestments video post both work as standalone content; the 5 city-template posts are thinner (a generic rent-vs-in-hand framing repeated per city) and rely more on the reader clicking through.
- **Same message repeated across subreddits:** **yes, confirmed** — the identical "is X LPA actually good money in [city] right now or does rent eat all of it" template was posted to at least 5 different city subreddits within a short window. This is the single clearest, most direct explanation in this entire report for why Reddit under-delivered relative to the one post that worked: **2 removals by human moderators, 1 removal by Reddit's automated filter, 2 posts held for manual approval** — a 5-for-5 friction rate on the templated batch, versus a clean pass for the two original, non-templated posts (r/personalfinanceindia, r/IndiaInvestments's first copy).
- **Self-promotion norms:** the city-template posts and the r/developersIndia repost read as thinly-veiled repostings of the same idea for backlink/traffic purposes across multiple audiences in a short time — exactly the pattern subreddit spam filters and moderators are built to catch, and did catch.
- **Audience-subreddit fit:** r/personalfinanceindia and r/IndiaInvestments are strong fits (personal-finance-literate Indian audience); city subreddits (r/delhi, r/mumbai, etc.) are much broader general-audience communities where a personal-finance calculator post is a weaker fit and more likely to read as off-topic self-promotion — plausibly part of why those were removed/held.
- **Replies answered:** the OP is visibly replying to comments on the original r/personalfinanceindia post (multiple `salaryexitindia` reply threads visible in `reddit_post1.png`), which is good practice; too little comment volume exists on the other posts to assess.

## 7. Email Outreach

### 7.1 College placement-cell outreach

- **Audience:** Top Indian university/institute placement cells and Training & Placement Officers (TPOs) — **not** HR/recruiters/CAs as might be assumed; the actual target was students about to receive their first offer letters.
- **Recipient count:** 68 sent (verified, `sent_log.csv`), sourced from 69 rows in `contacts.csv` minus dedup (IIT BHU / Banaras Hindu University share one address).
- **Source of list:** An Airtable base (screenshotted, `airtable/*.png`), manually transcribed. **15 additional contacts were explicitly excluded** because their emails were truncated in the Airtable screenshot ("cut off with '…'") — the author declined to guess-complete a domain specifically to avoid a bounce damaging sender reputation (documented reasoning in `outreach/needs-verification.md`). This is a genuinely careful practice, not a gap to criticize.
- **Personalization:** yes, per-college name substitution ("Students at {college} signing their first offer letter...").
- **Subject line:** "Free salary-decoding tool for your placement-season students."
- **Value proposition:** free, no-signup, no-ad-targeting-of-students calculator; asks the TPO to share it in placement groups/pre-placement talks.
- **CTA:** soft ask ("Please feel free to share it") — no specific action requested (no reply, no confirmation, no meeting ask).
- **UTM:** none — the link is the bare `https://www.salaryexit.in`.
- **Follow-up cadence:** none coded or logged — single send, no scheduled follow-up.
- **Send window:** 2026-07-25T15:05:59Z–15:43:58Z (38 minutes), 25-second delay between sends.
- **Results:** all 68 logged `status: sent` — this means **SMTP accepted the message for delivery, nothing more**. No bounce, open, click, or reply data exists locally (Gmail SMTP does not surface this). **This is the single largest gap in measuring this channel's actual effect.**

### 7.2 B2B / HR-tech outreach

- **Audience:** 5 companies — Keka, greytHR, Zimyo, Pocket HRMS (all HRMS/payroll SaaS), Foundit (job board).
- **Ask:** license the CTC-to-in-hand engine as an iframe embed, white-label widget, or API — for HRMS platforms: onboarding/payslip flows; for the job board: showing estimated in-hand next to CTC on listings.
- **Two templates** (HRMS-specific and job-board-specific), each naming the specific integration point, plus a differentiator ("unit-tested against Finance Act publications, maintained through every Union Budget").
- **CTA:** "Happy to share a demo and pricing" — a real but low-commitment next step.
- **UTM:** none — links to plain `salaryexit.in` and `salaryexit.in/for-businesses`.
- **Reply-To** set to `hello@salaryexit.in` (a small professionalism touch **not present** in the college template, which replies to the raw Gmail sending address).
- **Send window:** 2026-07-27T10:04:37Z–10:06:03Z (5 emails in ~90 seconds — this is much faster than the college batch's 25s/email spacing; worth noting since it's a smaller batch and less likely to trip spam heuristics, but the delay logic wasn't actually engaged for a batch this size or the delay parameter was set very low for this run).
- **Results:** all 5 logged `sent`. No open/click/reply data available.

### 7.3 What none of the emails did

Neither campaign explicitly asked for a **backlink**, **citation**, **guest post**, or **data mention** — the college emails asked for informal sharing, the B2B emails asked for a commercial licensing conversation. Only the B2B emails constitute a real partnership/embed ask; the college emails are pure awareness distribution, not a backlink play.

## 8. Other Channels

Searched for evidence of: Product Hunt, X/Twitter, Facebook, WhatsApp, YouTube, Instagram, Medium, Quora, Indie Hackers, Hacker News, directories/startup listings, guest posts, journalist outreach, creator outreach, partnership outreach beyond the 5 B2B emails above.

**No local evidence found for any of these** — no files, no screenshots, no commit history, no scripts. This is reported as **Unknown / no evidence of an attempt**, not as "these channels failed" — the honest state is that this report cannot confirm or deny activity on them.

The one launch video (`brag-output/`, 20 seconds, landscape) is confirmed to exist and — by exact duration match — is very likely the video referenced in the r/IndiaInvestments post title ("Made a 20 sec video..."). **No evidence was found that it was posted anywhere else** (no YouTube upload record, no separate LinkedIn video post in the export, no X/Twitter evidence).

## 9. Messaging and CTA Inventory

| Angle | Example hook | Target audience | Channel used | CTA | Landing page | Times reused | Evidence of performance |
|---|---|---|---|---|---|---|---|
| Salary-band data table (5–50 LPA in-hand) | "What every salary from 5-50 LPA actually pays in-hand per month" | Indian personal-finance-literate professionals | Reddit (r/personalfinanceindia), attempted repost to r/developersIndia | None (native value) | None in-post | 2 (1 succeeded, 1 removed) | Strong (self-reported), then removed on repeat |
| ₹12 vs ₹15 LPA / Section 87A cliff | "₹12 LPA vs ₹15 LPA sound like a small gap... it's the biggest cliff" | LinkedIn professional network | LinkedIn | Engagement question + link in comments | salaryexit.in | 1 | 262 impressions, 7 clicks, 2 likes |
| CTC vs in-hand gap (₹50 LPA example) | "A ₹50 LPA offer sounds like you've made it. Then the first payslip lands..." | LinkedIn professional network | LinkedIn | Engagement question + link in body | salaryexit.in | 1 | 610 impressions, 7 clicks, 0 likes |
| PF withdraw-vs-transfer | "Every job switch, most people make the same PF mistake" | LinkedIn professional network | LinkedIn | Engagement question + link in body | salaryexit.in | 1 | 458 impressions, 4 clicks, 0 likes |
| City affordability ("is X LPA enough in [city]") | "is 20 LPA actually good money in Delhi right now or does rent eat all of it" | City-specific general subreddits | Reddit — 5+ city subreddits | Link in comment | `/salary-enough/[slug]` | 5+ (templated) | 1 live w/ 18 views; 2 removed; 2 held |
| Free tool for students (placement season) | "Students at {college} signing their first offer letter rarely understand what their CTC actually means" | College TPOs/placement cells | Cold email | Soft share ask | salaryexit.in | 68 (personalized per college, same core template) | No open/click data available |
| Engine licensing (embed/API/white-label) | "Employees routinely raise support tickets asking why their payslip doesn't match their CTC" | HRMS/payroll SaaS + job boards | Cold email | "Share a demo and pricing" | `/for-businesses` | 5 (2 sub-variants: HRMS vs job board) | No open/click data available |
| Build-in-public / launch | "Built a free calculator... after the Reddit thread blew up" | Indie-maker Reddit audience | Reddit (r/SideProject) | Feedback request + link | salaryexit.in | 1 | 1 upvote, 0 comments, 205 views |
| Short demo video (CTC → in-hand breakdown) | Visual: ₹18L CTC deflating to real ₹1,35,425 in-hand | Reddit personal-finance audience | Reddit (r/IndiaInvestments) | Link in comment | `/ctc-to-in-hand-calculator` | 1 (posted twice, 1 held) | 1 upvote, 2 views |

**Angles never tested:** proprietary-data/report framing (e.g., "we analyzed N offer letters"), social-proof framing (no post cites usage numbers or testimonials), a direct backlink/citation ask to anyone outside the 5 B2B companies, any founder-journey/build-in-public series (only one r/SideProject post, not a running series).

**Angle that gave away the complete answer:** the r/personalfinanceindia data table — by design, and that's very likely *why* it worked as a standalone Reddit post (Reddit rewards native value), even though it correspondingly reduced the *forced* reason to click through to the site.

**Weakest CTA:** the 5 city-template Reddit posts and the college emails both use a low-friction, low-specificity ask ("share it," "plug in your own numbers") — reasonable to avoid looking spammy, but paired with a repeated template across many communities, which is what actually got removed, not the soft CTA itself.

## 10. Landing-Page and Conversion Funnels

Using the event names defined in `docs/analytics.md` (`calculator_use`, `salary_reality_check_use`, `offer_compare_submit`, `offer_compare_click`, `share_summary`) and `page_view`/`calculator_started`/`form_start` (observed firing live in production during this session's separate smoke-test work):

| Channel | Impressions | Clicks | Sessions | Calculator starts | Completions | Shares | Repeat visits | Data source |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| LinkedIn | 1,322 (organic, 30d) | 17 | Unknown | Unknown | Unknown | Unknown | Unknown | `linkedin.xls` for impressions/clicks; GA4/Plausible needed for the rest |
| Reddit (all posts combined) | Unknown (Reddit doesn't expose full read metrics per post in these screenshots beyond "views": 18 + 2 + 1 + 205 + 2 = ~228 visible view-counts, excluding the un-measured original viral post) | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | Screenshots only; GA4 referral data needed |
| Email (college) | N/A | Unknown (no click tracking) | Unknown | Unknown | Unknown | Unknown | Unknown | `sent_log.csv` confirms sends only |
| Email (B2B) | N/A | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | `sent_log_b2b.csv` confirms sends only |

**UTM consistency: inconsistent, confirmed.** Observed link variants:
- `?utm=reddit` (r/delhi comment) — **not a standard UTM parameter**; GA4's automatic channel grouping looks for `utm_source`/`utm_medium`/`utm_campaign`, so this will very likely surface as `(direct)` / `(not set)`, not as Reddit traffic.
- No UTM at all (r/mumbai comment, both email campaigns, the LinkedIn `lnkd.in` links) — relies entirely on the Referer header, which Reddit's mobile app and LinkedIn's in-app browser frequently strip or obscure, again likely showing as `(direct)`.
- `?utm_source=redd` (r/IndiaInvestments comment) — closer to standard (GA4 can parse a bare `utm_source`), but the value `redd` is non-standard (not `reddit`) and there's no `utm_medium`/`utm_campaign`, so campaign-level reporting is still incomplete.
- **Consequence: none of the campaign-level results in the funnel table above can be reliably attributed in GA4 as currently linked.** Only channel-level "referral from reddit.com" or "referral from linkedin.com" *might* show up via GA4's default referrer-based channel grouping, and even that is undermined by in-app browsers stripping referrers on both platforms.
- One additional technical friction point: `https://www.salaryexit.in/ctc-to-in-hand-calculator/?utm_source=redd` (the exact URL used in the r/IndiaInvestments comment) returns an **HTTP 308 redirect** (trailing-slash normalization) before reaching the final page — not broken, but an avoidable extra hop on every click from that specific link.

## 11. Analytics and Traffic Evidence

**No GA4, Search Console, or Plausible dashboard was accessed in this task** — none of those platforms were queried. What is independently confirmed:
- GA4 is live in production with a real measurement ID (`G-Z7BJQ1340W`) — confirmed via live network traffic captured during a separate production smoke-test earlier in this engagement (not fabricated for this report).
- No AdSense, GA4, or Plausible dashboard export exists locally in this repository.

Everything else — sessions/users by channel, landing pages, referrals, calculator completions, returning users, geography, device mix, branded-vs-non-branded search, backlink referral traffic — is **Unknown**. Exact exports required are listed in §18.

## 12. Backlinks and Domain Authority Evidence

| Referring domain/platform | Linking page | Target SalaryExit URL | Link type | Context | Still live | Likely SEO value |
|---|---|---|---|---|---|---|
| reddit.com (r/personalfinanceindia) | Original data-table post | Unknown (link not in the post itself) | N/A — no direct link found | Native content, no outbound link confirmed | Presumed live | None (no link to value) |
| reddit.com (r/SideProject) | Follow-up post | salaryexit.in | User-generated content, nofollow (Reddit links are nofollow by platform default) | Build-in-public post | Live | Negligible — nofollow, low engagement (1 upvote) |
| reddit.com (r/delhi) | Comment | `/salary-enough/is-20-lpa-good-in-delhi` | User-generated content, nofollow | Comment link | Live | Negligible |
| reddit.com (r/IndiaInvestments) | Comment | `/ctc-to-in-hand-calculator` | User-generated content, nofollow | Comment link | One copy live | Negligible |
| linkedin.com | 3 posts | salaryexit.in (via 2 shortened `lnkd.in` links + 1 plain) | Social/UGC, nofollow | Personal-profile posts | Live (as of export) | Negligible — LinkedIn post links carry no SEO authority |
| Reddit (removed/held posts: r/Chennai, r/bangalore, r/pune, r/mumbai-dup, r/developersIndia-dup) | — | — | — | — | **Not live** | None |

**No editorial backlinks, directory listings, guest-post placements, journalist references, or newsletter coverage were found anywhere in the evidence.** Every link identified in this report is either a social-platform post/comment (nofollow, no SEO value) or a cold email that has no confirmed response (so no resulting backlink exists yet). **This is the report's clearest, most defensible statement: SalaryExit currently has zero evidence of any independent editorial citation, embed, or backlink from a third party who wasn't directly asked and didn't reply.**

## 13. What Claude Recommended vs. What Was Executed

This distinction is harder to draw cleanly than the task anticipates, because **for LinkedIn, Reddit, and email, no separate "recommendation" document survives independently of the generated asset** — the email templates, the Reddit post drafts, and the video plan are simultaneously the recommendation and the deliverable, and no earlier planning doc proposing "post on Reddit" or "email 68 colleges" as a strategy was found. The one channel with a standalone strategy document is SEO (`docs/SEO_GROWTH_PLAYBOOK.md`), and that document's actual content is exclusively about organic/technical SEO (indexing, content velocity, internal linking) — it does **not** mention LinkedIn, Reddit, email outreach, or backlink campaigns as tactics, beyond one generic line: *"Share genuinely useful pages in communities where it's allowed (no spam)."*

So, concretely:
- **Recommended (documented) and executed:** the general SEO playbook's technical/content-velocity guidance — separately verified as substantially implemented in this codebase's routes/content structure (outside this task's scope to re-verify in depth).
- **Recommended only in the sense of "drafted the asset used"; no separate prior strategy doc exists:** all LinkedIn posts, all Reddit posts, both email campaigns, the launch video.
- **Executed exactly as generated:** email templates (verified — the rendered body in the sent log matches the script's template function, no evidence of manual edits before sending).
- **Executed with real-world friction not addressed in the generated asset:** the Reddit city-template batch — the generated template itself never accounted for (and no evidence suggests anyone flagged) the risk that posting the same structure to 5+ subreddits in a short window reads as spam to both human moderators and Reddit's automated filters.

## 14. Why Traffic Did Not Materialise

Assessed against the 20 candidate causes, each graded by the evidence gathered above:

1. **Insufficient distribution volume** — Supported by evidence. 3 LinkedIn posts in 30 days, ~9 Reddit submissions total, 73 emails one-time. This is a genuinely small volume of attempts by any standard.
2. **Weak account/page audience** — Likely. No follower count evidence for the LinkedIn company page; 0 reposts on every LinkedIn post suggests a small or non-amplifying personal-profile network.
3. **Poor audience-channel fit** — Supported by evidence (partially). r/personalfinanceindia and r/IndiaInvestments fit well (and one worked); city subreddits (r/delhi, r/mumbai, etc.) are broad general audiences where a finance-calculator post is a weaker fit and 3 of 5 were removed/held.
4. **Overpromotional messaging** — Supported by evidence, specifically for the Reddit city-template batch and the r/developersIndia repost (removed) — not supported for the original r/personalfinanceindia post or the LinkedIn posts (both native-value framed).
5. **AI-sounding copy** — Possible. The LinkedIn posts share a recognizable hook→reveal→question→hashtags structure across all 3; the college email is warmly personalized but formulaic. Not verifiable as a cause of underperformance without reader feedback data (none exists).
6. **Weak or generic hook** — Not enough evidence — the hooks (87A cliff, PF mistake, CTC vs in-hand) are specific and well-targeted, not generic; this does not appear to be the bottleneck.
7. **Low click incentive** — Supported by evidence. LinkedIn CTAs are engagement-bait, not click-bait; corresponding CTR (0.87–2.67%) is low but not unusual for LinkedIn organic.
8. **Wrong landing page** — Not supported. Every destination URL checked returns HTTP 200 and matches its post's topic (city posts → matching `/salary-enough/[slug]`, video post → `/ctc-to-in-hand-calculator`).
9. **No UTM attribution** — Supported by evidence (§10) — confirmed inconsistent/non-standard across every channel.
10. **No follow-up** — Supported by evidence. Neither email script has any follow-up logic; single send only.
11. **No native value (on the pages that underperformed)** — Possible for the Reddit city-template posts specifically — thinner content than the original viral table.
12. **Lack of proprietary data** — Possible. The one post that worked was framed as original data/analysis; most other assets (LinkedIn posts, city templates) are explanatory rather than data-led.
13. **Lack of social proof** — Likely. No post or email cites usage numbers, testimonials, or user counts.
14. **Lack of backlinks** — Supported by evidence (§12) — zero editorial backlinks found anywhere.
15. **Too much focus on a new company page** — Not enough evidence — no evidence the company page posted at all; can't confirm this was a focus.
16. **Reddit self-promotion removals** — **Strongly supported by direct evidence** — 2 human-mod removals, 1 automated-filter removal, 2 held-for-approval, out of ~7 templated/secondary posts.
17. **Cold-email targeting problems** — Possible. Targeting (TPOs for the college batch, HRMS/payroll for B2B) is logical and well-reasoned, but zero delivery/open/reply data means effectiveness genuinely cannot be assessed either way.
18. **No repeatable content format** — Possible. The templated Reddit city-post format was repeatable but got removed; the LinkedIn format is repeatable and safe but low-reach.
19. **No audience capture after visit** — Not enough evidence within this task's scope (the on-site email-capture widget exists per earlier git history — `7bd3261 feat: render the email capture widget on the homepage` — but this report did not re-audit its current conversion rate).
20. **Unrealistic expectation of "huge traffic" from a small number of posts** — Likely, given as context by this task itself and the SEO playbook's own words: *"weeks 1–4 are mostly indexing + baseline; meaningful query volume often ramps over months, not days."* The volume of distribution attempts (3 LinkedIn posts, ~9 Reddit posts, 73 emails) is objectively small relative to what most successful organic-growth case studies describe as a sustained campaign.

## 15. What Worked

- **The r/personalfinanceindia data table** — native value, no self-promotional link in the post itself, self-reported 100+ upvotes / 90K+ views. The single clearest positive signal in all the evidence gathered.
- **The college outreach's data hygiene** — declining to guess-complete 15 truncated email addresses rather than risk a bounce is a small but genuinely good practice, properly documented in `outreach/needs-verification.md`.
- **The B2B outreach's targeting logic** — HRMS/payroll companies and a job board are a coherent, specific-value-proposition fit for an embeddable calculation engine; the CTA ("share a demo and pricing") is concrete and low-friction for a first cold-outreach message.
- **Replying to comments** on the original Reddit post (visible engagement from the OP account).
- **Redacting/protecting sender credentials properly** — both Python scripts require environment variables for Gmail auth and explicitly instruct against hardcoding them; no credentials were found exposed anywhere in this audit.

## 16. What Did Not Work

- **Reposting the same template across 5+ subreddits in a short window** — 2 removed by moderators, 1 removed by Reddit's spam filter, 2 held for manual approval.
- **The direct follow-up post** (r/SideProject) that *did* link to the site got dramatically less traction (1 upvote, 205 views) than the original post that didn't link at all — a strong signal that promotional framing, even soft, underperforms native value on Reddit specifically.
- **Every email campaign** — not because the emails were bad, but because **no measurement exists** to know whether they worked at all; this is itself a failure mode (see §17).
- **No independent backlinks materialized** from either email campaign as of the evidence available.
- **The LinkedIn company page**, if it exists, has left no evidence of its own activity separate from the personal profile.

## 17. What Claude Previously Got Wrong

- **No measurement instructions were built into the outreach scripts.** Both `send_outreach.py` and `send_b2b_outreach.py` log only `sent`/`failed` at the SMTP layer — there is no BCC-to-self, no open-tracking pixel, no reply-detection, and no UTM parameters on any email link. This means 73 sent emails produced **zero measurable signal**, regardless of their actual real-world effect. This is the most concrete, fixable gap in this entire audit.
- **UTM parameters were applied inconsistently and non-standardly** across the channels that did use them (`utm=reddit` isn't a real UTM key; `utm_source=redd` is a typo/truncation of "reddit"), meaning even Reddit-attributed traffic likely isn't showing correctly in GA4 today.
- **The templated Reddit city-post batch was not risk-assessed for cross-subreddit repetition** before being posted 5+ times in a short window — a known, well-documented Reddit anti-spam behavior that a single sentence of caution could have flagged in advance.
- **No distribution-specific strategy document was preserved** — unlike the SEO playbook, there's no equivalent "LinkedIn/Reddit/email playbook" capturing what was tried, why, and what to test next; this forced most of this section to be reconstructed from raw sent-logs and screenshots rather than a stated plan, which made past intent much harder to separate from outcome.
- **Claims of "the Reddit thread blew up" were taken and repeated (in the r/SideProject post) without the original post's own metrics being screenshotted at the time** — meaning the site's own follow-up content now permanently cites a number (100+ upvotes / 90K+ views) that even this forensic audit cannot independently verify to the exact figure.
- **What Claude did well:** the messaging itself was consistently specific, accurate, and audience-aware (real Section 87A mechanics, real PF transfer rules, real HRMS pain points) rather than generic startup-marketing language; the one email-outreach data-hygiene decision (excluding unverifiable addresses rather than guessing) was a genuinely good, cautious call; and the underlying product claims in every piece of outreach content were verifiably true against the actual calculation engine (not exaggerated).

## 18. Missing Evidence Required for the Next Plan

**Required:**
- **GA4: Traffic acquisition + Source/medium report, last 90 days.** Why: this is the only way to see whether *any* of the LinkedIn/Reddit/email activity produced sessions at all, given the broken UTM tagging — needed to check the default channel-grouping and referrer-based rows (`reddit.com / referral`, `linkedin.com / referral`, `(direct)`) even without clean campaign tags. Columns: Session default channel group, Session source/medium, Sessions, Engaged sessions, Key events, Total revenue (if any).
- **GA4: Landing page report, same 90-day window.** Why: to see whether `/ctc-to-in-hand-calculator`, `/salary-enough/is-20-lpa-good-in-*`, and `/for-businesses` show any traffic bump around the specific dates in §4's timeline. Columns: Landing page + query string, Sessions, Engagement rate, Key events.
- **Google Search Console: Performance report (Queries + Pages), last 3 months, compared to the prior 3 months.** Why: to separate organic-search growth from social/email-driven traffic, and to check whether any of the noindexed `/salary-enough/` pages that Reddit links point to are picking up impressions despite being noindexed (they shouldn't be, and if they are, that's a bug worth knowing about).
- **GA4: Events report for `calculator_use`, `calculator_started`, `page_view`, filtered to sessions from `reddit.com`/`linkedin.com`/`(direct)`, same window.** Why: without this, it's impossible to know whether any of the ~230 combined visible Reddit "views" or the 17 LinkedIn clicks actually reached and used a calculator, or bounced immediately.

**Useful:**
- **LinkedIn Company Page analytics export** (Visitors, Followers, Post impressions — if the page exists and has ever posted). Why: this entire report currently cannot assess the company page at all; without this export, "Unknown" is the permanent answer.
- **Reddit account overview with exact vote/comment/view counts for the original r/personalfinanceindia post**, rather than relying on the self-reported "100+/90K+" figure. Why: this is the single most-cited success story in this report and deserves a precise number.
- **Gmail "Sent" folder or a BCC/read-receipt log for both outreach campaigns.** Why: to know if any of the 73 emails were opened, replied to, or bounced — currently completely unknown.

**Optional:**
- **Plausible dashboard export**, if Plausible is enabled in production alongside or instead of GA4, for a second, cookie-free cross-check of the above.
- **Any correspondence/replies received from the 5 B2B outreach targets**, redacted of personal contact details, if a next growth plan wants to follow up on those specific relationships.

## 19. Factual Handoff Summary

SalaryExit India ran three real distribution efforts, none committed to git (all in gitignored local files): **(1) LinkedIn** — 3 organic text posts from Aniket Jadhav's personal profile (not confirmed to be from any company page) on 07/03, 07/07, 07/14/2026, covering Section-87A cliff / CTC-vs-in-hand / PF-transfer angles; 30-day totals (06/22–07/21) = 1,322 organic impressions, 17 clicks, 2 reactions, 1 comment, 0 reposts. **(2) Reddit** — one native-value data table on r/personalfinanceindia with no in-post link, self-reported 100+ upvotes/90K+ views (not independently verified to the exact number); a same-day-ish follow-up on r/SideProject linking directly to the site got only 1 upvote/205 views; a templated "is X LPA good money in [city]" post was then repeated across at least r/delhi (live, 18 views), r/Chennai (removed by mods), r/pune (held for approval), r/mumbai (one live, one held), r/bangalore (removed by Reddit's own spam filter); a 20-second demo video (`brag.mp4`) was posted to r/IndiaInvestments (one live w/ 2 views, one held); a repost of the original chart to r/developersIndia was removed by mods. **(3) Email** — 68 personalized cold emails to Indian college placement cells/TPOs sent 2026-07-25 (15:05–15:43 UTC) pitching the free calculator for placement season, and 5 cold emails to HRMS/payroll companies + one job board (Keka, greytHR, Zimyo, Pocket HRMS, Foundit) sent 2026-07-27 (10:04–10:06 UTC) pitching engine licensing/embed — both logged only as SMTP-`sent`, with **zero open/click/reply/bounce data available**. **UTM tagging was inconsistent and mostly non-standard or absent** across every channel, meaning GA4 very likely cannot cleanly attribute any of this traffic today even if it arrived. **Zero independent editorial backlinks, embeds, or third-party citations were found anywhere** — every link found is either a nofollow social/UGC link or an unanswered cold email. **Major failure pattern:** the one thing that worked (native value, no self-promotional link) was followed by increasingly promotional, templated, or repeated content that performed far worse or was actively removed by platform moderation — not "distribution doesn't work," but "promotional repetition specifically doesn't." **Unresolved unknowns:** whether the LinkedIn company page exists/posted independently of the personal profile; the exact vote/view count of the original viral Reddit post; whether any of the 73 emails were ever opened or replied to; actual GA4/GSC session and conversion data by channel (no dashboard was accessed in this audit).

---

**DISTRIBUTION FORENSICS COMPLETE**
