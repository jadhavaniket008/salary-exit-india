# Outreach templates — editorial backlink pipeline

10 highly personalized emails per week (not 68 in one batch — see Phase 7). Every template below is a starting point requiring per-prospect personalization from `backlink-prospects.csv` before sending — none are meant to be sent verbatim.

## Email 1 (opener)

**Subject line options** (pick based on the prospect's actual content, not a generic default):
- "{{finding}} — thought this might be useful for {{their article title}}"
- "A chart for {{their article title}}, if useful"
- "Data question re: {{their recent article}}"

**Body:**

```text
Hi {{contact name or "the {{organization}} team"}},

I read {{their recent relevant article — must be real and specific}}. {{One sentence connecting their article's actual content to one specific finding from the in-hand salary model — not generic praise.}}

I run SalaryExit India, a free salary/tax calculator site. We modeled {{the specific relevant slice of the report — e.g., "how employer-cost structure changes take-home at the same CTC"}} using our own FY 2026-27 tax engine — happy to share the chart and underlying CSV if it's useful for {{their article/audience}}. No cost, no exclusivity, just attribution if you use it.

{{One-sentence CTA from the approved list below.}}

Best,
Aniket
SalaryExit India
```

**Approved CTAs (pick one, do not stack multiple):**
- "Would this chart be useful in your existing article?"
- "I can generate the same comparison for another salary band if that fits your audience better."
- "You may embed the table without charge if that's easier than a static chart."
- "Would you like the source CSV and methodology to review first?"
- "I noticed the article currently explains CTC but doesn't show employer-side sensitivity — happy to send that specific cut."

**Explicitly banned phrases (never use):**
- "Please give us a backlink."
- "Let's collaborate."
- "I love your website."
- "We have a free tool you should share."

## Follow-up (only if no reply after 5-7 business days, only once)

```text
Hi {{contact name}},

Following up with something new rather than a nudge — {{one new, specific piece of value: a different data cut, a chart variant, a relevant finding they haven't seen}}.

No worries if the timing isn't right — happy to leave the CSV/methodology link here either way: {{link with utm_content unique to this prospect}}.

Best,
Aniket
```

**Rule:** stop after this one follow-up unless they reply. No "just checking in" message ever.

## Email variant — for prospects already contacted once before (category A05-A08, A22, D12, D14, D15 in `backlink-prospects.csv`)

```text
Hi {{contact name}},

Reaching out again with something more specific than my last note — we've since published {{the flagship report}}, which {{one sentence on why it's more useful to them than the original generic pitch}}.

{{Approved CTA}}

Best,
Aniket
```

**Rule:** frame explicitly as new value, never as a repeat of the same generic ask — re-sending the identical email that got no reply the first time is exactly the low-effort pattern that produces more silence, not less.

## Instrumentation (fixing the measurement gap `docs/salaryexit-distribution-forensics.md` §17 identified)

- Every email link uses `scripts/growth/generate-campaign-url.ts` with a `utm_content` unique to that specific prospect (e.g., `editorial-batch1-hr-01`), so a reply or a resulting citation can be traced back to the exact email sent.
- BCC yourself (or use a shared sent-folder) on every send so `outreach-ledger.csv` can be filled in accurately — the prior campaigns' `sent_log.csv`/`sent_log_b2b.csv` only logged SMTP-accept status, not what was actually said or to whom specifically it led.
- Log every send, reply, and outcome in `outreach-ledger.csv` the same day — don't batch this at the end of the week from memory.
