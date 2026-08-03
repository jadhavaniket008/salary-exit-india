# LinkedIn approval checklist — Week 1-2

Source drafts: `docs/growth/linkedin-posts-weeks-1-4.md` (Week 1-2 section). Final ready-to-post copy: `READY-LINKEDIN-WEEK-1-2.md`. UTM-tagged destination URLs: `docs/growth/week-1-2-execution.csv`.

## Link policy (reconciled this pass)

Every post in this window now has exactly one of two states, with no placeholder left in either:

- **No link** (Week 1 Post 1, Week 1 Post 2, Week 2 Post 1, Week 2 Post 2) — native data / teardown posts, discuss or save CTA. All `[link]` placeholders that were previously present in these posts have been removed and replaced with additional native detail so the post stands on its own.
- **Link** (Week 1 Post 3 → reverse salary calculator, Week 2 Post 3 → reverse salary calculator, Week 1 company page → flagship report) — the exact UTM URL from `week-1-2-execution.csv` is now inline in the post text itself, not a `[link]` placeholder.

## Before approving any post

- [ ] Confirm the draft text in `READY-LINKEDIN-WEEK-1-2.md` matches `linkedin-posts-weeks-1-4.md` (they were reconciled together this pass — should already agree).
- [ ] Confirm the inline UTM URL in each linked post resolves correctly (spot-check one link in a browser before the first post goes out).
- [ ] Confirm posting account (personal profile vs. company page) matches the CSV's `channel` column.
- [ ] Confirm the suggested visual asset file exists at `public/growth-assets/required-ctc-report-2026/` before attaching it (see table below).

## Per-post schedule (relative days — Day 1 = first post date)

| Post | Day | CTA type | Link | Suggested image |
|---|---|---|---|---|
| Week 1 Post 1 | Day 1 | discuss | none | `employer-cost-scenarios-1080x1350.png` (exact match: same ₹20L/8%/13%/18% comparison) |
| Week 1 Post 2 | Day 3 | save | none | `pf-comparison-1080x1350.png` (exact match: capped vs. full-Basic PF) |
| Week 1 company | Day 4 | click | flagship report | `in-hand-by-ctc-1200x630.png` (report-representative overview chart) |
| Week 1 Post 3 | Day 5 | click | `/reverse-salary-calculator` | `required-ctc-1080x1350.png` (thematically closest — required-CTC framing) |
| Week 2 Post 1 | Day 8 | discuss | none | `pf-comparison-1080x1350.png` (same ₹20L data point the post quotes — reused deliberately) |
| Week 2 Post 2 | Day 10 | save | none — **tax-wording-corrected post**, carries the 100%/104% distinction; re-verify against `02-tax-wording-certification.md` before posting | none of the 5 launch visual families covers Section 87A specifically — post as text-only rather than forcing a mismatched chart |
| Week 2 Post 3 | Day 12 | click | `/reverse-salary-calculator` | `required-ctc-1080x1350.png` (reused, same theme as Week 1 Post 3) |

## Realistic expectation, from real data

The current LinkedIn engagement baseline is ~0.7 engaged sessions/week (see `04-pilot-thresholds.md`). Two of the three known prior post dates showed zero measurable GA4 sessions. This is not a reason to skip LinkedIn — it's the reason the per-post threshold is set low (≥2 engaged sessions = success) rather than importing an assumption that LinkedIn already works well for this account.
