# Deployment checklist

This checklist covers **code/doc changes made in this session** (the analytics-baseline layer, tax-wording fixes, and this approval package) — not the pilot's social/outreach execution, which is a manual, non-code process tracked entirely through `week-1-2-execution.csv` and the ledgers.

## Pre-merge checks

- [ ] `npm test` — full suite passes (193 tests as of this session: 179 pre-existing + 11 new `growth-analytics-baseline.test.ts` + 2 new `growth-in-hand-salary-model.test.ts` tax-wording tests, minus overlap — see exact count in the final report).
- [ ] `npm run build` — no TypeScript errors, production build succeeds.
- [ ] `npm run lint` — zero new lint errors.
- [ ] No secrets committed — `docs/growth/generated/*.json` contains only aggregated, non-personal figures (session counts, click/impression totals, query text, page paths); no property IDs, no access tokens, no user-level identifiers. Verified by construction (hand-written from MCP tool output, not a raw dump).
- [ ] `git status` reviewed before staging — confirm no unrelated files, no `.env`, no credential files are swept in.

## Scope confirmation

- [ ] No changes to `lib/calculators/` or `lib/config/financial-year.ts` (core tax engine) — confirmed untouched.
- [ ] No changes to the city/LPA programmatic page inventory (explicitly out of scope for the whole growth-authority-system effort).
- [ ] No publish/send actions taken by this session — every LinkedIn/Reddit/email item remains in `pending manual approval` or `BLOCKED` state.

## Merge/deploy authorization

**Not authorized in this session.** Per this task's explicit constraint ("do not merge, deploy or push without manual approval"), this checklist prepares the branch for review — it does not constitute approval to merge `growth-authority-system` into `main` or to deploy. That decision is Aniket's.
