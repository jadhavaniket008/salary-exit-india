# Prior campaign impact — cross-referenced against real GA4 data

**Purpose**: determine what measurable effect, if any, the campaign activity documented in `docs/salaryexit-distribution-forensics.md` (3 LinkedIn posts, 9 Reddit submissions, 68 college outreach emails, 5 B2B emails) had on real GA4 sessions — using day-level GA4 `date` × `sessionSourceMedium` data pulled live via MCP on 2026-08-02, not social-platform impression counts.

**Method**: pulled GA4 sessions/engaged sessions by `date` and `sessionSourceMedium` for 2026-07-01 to 2026-07-29 (covers all three campaign windows below with lead-in and trailing days), then checked which channel-labeled sessions land on or near each known campaign date. A session is only counted as evidence for a channel if GA4 itself classified it into that channel's `sessionSourceMedium` — no session in this window carries a real UTM campaign parameter (see `00-baseline.md`), so **no attribution below reaches "Verified"** — verified attribution requires a UTM-tagged link, and none of this campaign's prior links were tagged. That gap is itself the headline finding of this document.

## Classification key

- **Verified attribution**: a session carries a UTM campaign parameter unambiguously tied to the specific post/email. *(Not reachable for any prior activity — no historical link was UTM-tagged.)*
- **Strong correlation**: multiple sessions on the channel GA4 assigns to that platform, clustered tightly around the known date(s), well above the channel's typical daily baseline.
- **Possible correlation**: a session exists on or near the date, but the volume is too thin (n=1) or the channel too ambiguous ((direct)/(none) can mean anything) to rule out coincidence.
- **Unsupported**: no session in the relevant channel appears on or near the known date.

## LinkedIn — 3 posts (2026-07-03, 2026-07-07, 2026-07-14)

| Post date | Same-day / near-date `linkedin.com/referral` or `linkedin_post_link` sessions | Classification |
|---|---|---|
| 2026-07-03 | 1 session, 1 engaged, same day (`linkedin.com / referral`) | **Possible correlation** — a single same-day session is consistent with the post but n=1 cannot rule out coincidence |
| 2026-07-07 | 0 sessions on 07-07; nearest is 07-11 (4 days later, 1 session, 0 engaged) | **Unsupported** — no measurable same-window LinkedIn-attributed traffic |
| 2026-07-14 | 0 sessions on or near 07-14; nearest is 07-19 (5 days later, 1 session, 1 engaged) | **Unsupported** — no measurable same-window LinkedIn-attributed traffic |

LinkedIn-attributed sessions (`linkedin.com/referral` + `linkedin_post_link/(not set)`) are real but thin and spread across the whole month (07-03, 07-11, 07-19, 07-21, 07-22, 07-24, 07-25, 07-26, 07-27, 07-29 — mostly 1 session/day), not clustered around the 3 known post dates. The largest single day is **2026-07-29 with 4 `linkedin_post_link` sessions (3 engaged)** — a date with no known LinkedIn post in the forensics record. This is flagged as an open question below, not attributed.

## Reddit — 9 submissions, stated posting window ~2026-07-20 to 2026-07-26

| Date | `reddit / comment` sessions | Engaged |
|---|---|---|
| 2026-07-19 | 3 | 3 |
| 2026-07-20 | 6 | 6 |
| 2026-07-21 | 2 | 1 |
| 2026-07-22 | 2 | 2 |

**Strong correlation.** 13 of the 90-day total 15 Reddit-attributed sessions (`reddit/comment` + `reddit.com/referral`) land in a 4-day cluster (07-19 to 07-22) at the front edge of the stated ~07-20–26 window (one day of lead-in on 07-19 is within normal margin for a same-week posting push). This is the single clearest date-to-channel pattern found anywhere in the dataset — both in volume (13 sessions) and in engagement rate (12/13 = 92% engaged, the highest of any channel in this analysis).

Separately, `reddit.com/referral` also shows 1 session each on **2026-07-06 and 2026-07-07** — two weeks before the stated Reddit window. These predate the known ~07-20–26 push and most likely reflect residual traffic from an earlier, separate Reddit submission documented in the forensics report (which records 9 total submissions across a longer history, not all within the one late-July window). Not attributed to the 07-20–26 push.

## Email — college outreach (2026-07-25), B2B outreach (2026-07-27)

GA4 has **no distinct "email" `sessionSourceMedium` row anywhere in the 90-day window** — consistent with the forensics report's finding that outreach emails were never UTM-tagged. Any email effect can only be inferred indirectly through `(direct)/(none)`, which is inherently ambiguous (it also covers bookmarks, typed URLs, and app-opened links).

| Date | `(direct)/(none)` sessions | Typical day in this window | Classification |
|---|---|---|---|
| 2026-07-25 | 7 sessions, 5 engaged | Most days show 1-3 `(direct)` sessions | **Possible correlation** — an above-baseline direct-traffic day on the college outreach date, but not distinguishable from any other cause without retroactive UTM tagging |
| 2026-07-27 | 1 session, 1 engaged | — | **Unsupported** — no elevation above baseline on the B2B outreach date |

**This gap is actionable, not just descriptive**: `utm-standard.md` already specifies UTM parameters for all future outreach; retroactively, no further attribution is possible for the emails already sent.

## Unattributed open question

**2026-07-29**: 4 `linkedin_post_link/(not set)` sessions (3 engaged) + 6 `(direct)/(none)` sessions (2 engaged) — the second-largest single-channel-day in the entire 29-day window, on a date with no corresponding entry in the forensics report's known posting log. Two explanations are equally plausible from the data alone: (a) an undocumented LinkedIn share/repost of existing content on or before that date, or (b) delayed-click traffic from the 07-14 post reappearing in a follower's feed. Neither can be confirmed from GA4 data alone. Not claimed as evidence of any campaign's effectiveness in either direction.

## Summary table

| Channel / activity | Classification | Session count in window |
|---|---|---|
| Reddit (~07-20–26 push) | Strong correlation | 13 sessions / 12 engaged |
| LinkedIn post (07-03) | Possible correlation | 1 session / 1 engaged |
| LinkedIn post (07-07) | Unsupported | 0 |
| LinkedIn post (07-14) | Unsupported | 0 |
| College outreach email (07-25) | Possible correlation | 7 `(direct)` sessions same day (ambiguous) |
| B2B outreach email (07-27) | Unsupported | 0 elevation |
| Unattributed 07-29 spike | Open question, not attributed | 4 LinkedIn + 6 direct sessions |

**Bottom line**: of everything done before this pilot, Reddit is the only channel with a real, day-level, multi-session GA4 correlation strong enough to justify continued investment on its own evidence. LinkedIn and email show only thin or fully-absent signal in the actual analytics — this does not mean they "didn't work" (both are documented in the forensics report as having other execution weaknesses, e.g. no UTM tagging, no reply tracking), only that GA4 does not currently support a stronger claim than "possible" or "unsupported" for either.
