@AGENTS.md

# SalaryExit India — Claude Code context

## Product

Static Next.js site: educational **salary, tax, and exit calculators** for Indian salaried employees, plus long-form guides and programmatic SEO landing pages. All outputs are **estimates — not tax filing, not legal advice**. Copy and UI must reinforce this at every result surface.

Monetization: Google AdSense slots, optional GA4/Plausible analytics, consent-gated.

## Architecture

| Concern | Location |
|---|---|
| App Router pages | `app/` |
| Pure calculator logic | `lib/calculators/*.ts` (re-exported from `lib/calculators/index.ts`) |
| Calculator UI (client) | `components/calculators/clients/*Client.tsx` |
| SEO metadata builder | `lib/seo/metadata.ts` → `getSiteOrigin()` in `lib/seo/site-origin.ts` |
| Sitemap | `app/sitemap.ts` |
| JSON-LD | `lib/jsonld.ts` + `lib/seo/structured-data.ts` |
| Tax slab config | `lib/config/financial-year.ts` |
| LPA landing pages (11) | `lib/content/lpa-pages.config.ts` → `app/lpa/[slug]/page.tsx` |
| Salary-enough pages (25) | `lib/content/salary-enough-pages.config.ts` → `app/salary-enough/[slug]/page.tsx` |
| Guide articles (11) | `lib/content/guides-registry.ts` → `app/{hub}/{segment}/page.tsx` |
| Route constants | `lib/routes.ts` + `lib/routes/landing-routes.ts` |
| Calculator registry | `lib/calculator-registry.ts` |
| Ads | `components/ads/AdSlot.tsx`, `components/ads/ThirdPartyRootScripts.tsx` |
| Consent | `lib/consent.ts`, `components/privacy/ConsentBannerShell.tsx` |
| IndexNow | `lib/indexnow.ts`, `app/api/indexnow/route.ts`, `app/[indexnowKey]/route.ts` |
| Redirects + domain | `next.config.ts` |

Rendering: nearly everything is statically prerendered. Only `ads.txt`, `api/indexnow`, and `[indexnowKey]` are dynamic route handlers.

State: React `useState` in client calculator components; `localStorage` for consent. No Redux, no Zustand, no database.

## Commands

```bash
npm run dev          # local dev
npm run build        # Next build — also runs TypeScript (no separate tsc script)
npm run start        # serve production build
npm run lint         # ESLint (eslint-config-next)
npm test             # Vitest — 26 files, 124 tests, Node env
npm run test:watch   # Vitest watch
```

Always run `npm test && npm run build` before declaring a task done. `npm run lint` before any PR.

## Risky files — read before touching

**`lib/config/financial-year.ts`** — the single source of truth for all FY tax slabs, standard deductions, cess rate, and Section 87A rebate thresholds. A wrong number here silently corrupts every tax and in-hand calculator. Changes require:
1. Cross-check against the Finance Act / CBDT notification for the relevant AY.
2. Update `FORMULAS.md` and `docs/FORMULA_AUDIT.md`.
3. Update `ENGINE_FY_LABEL` and `TAX_RULESET_SOURCE_LABEL` in `lib/config/site-freshness.ts`.
4. Run the full test suite; the snapshot in `tests/__snapshots__/worked-examples-numeric-contract.test.ts.snap` must be intentionally updated.

**`next.config.ts`** — contains the apex→www 301 (`salaryexit.in` → `https://www.salaryexit.in`) and all legacy-path redirects. Never add a www→apex redirect here. Vercel's domain settings and this file's `has: [{type:"host"}]` rule must point the same direction or you get a redirect loop.

**`lib/seo/site-origin.ts`** — rewrites the apex hostname to `https://www.salaryexit.in` regardless of what `NEXT_PUBLIC_SITE_URL` is set to. Changing `PRODUCTION_APEX_HOSTNAME` or `PRODUCTION_CANONICAL_ORIGIN` shifts every canonical URL, sitemap entry, and JSON-LD URL simultaneously.

**`lib/content/salary-enough-pages.config.ts`** — 1,595 lines, 25 entries, each with multi-paragraph prose. Touching the exported type shape breaks all 25 routes. Edit one entry at a time; verify `npm run build` after.

**`lib/jsonld.ts`** — `articleJsonLd` defaults `datePublished` and `dateModified` to the hard-coded string `"2025-03-22"` when callers omit them. Any guide that does not pass explicit dates emits stale JSON-LD to Google. Always pass real dates from `guides-registry.ts`.

## Coding guardrails

**Paths and links:** Always use `ROUTES.*` constants and `lpaLandingPath()` / `salaryEnoughPath()` helpers. Never hard-code `/lpa/…` or `/salary-enough/…` strings.

**Calculator logic:** Keep `lib/calculators/*.ts` pure — no React, no env reads, no side effects. Logic must be testable in isolation. Client-specific wiring belongs in the `*Client.tsx` component.

**Tax output copy:** Every result surface that shows a tax, in-hand, or settlement figure must include or link to a disclaimer. Do not remove `DisclaimerBlock`, `EstimateBadge`, or `TrustMethodologyNotice` from calculator pages.

**`NEXT_PUBLIC_ENABLE_AD_SLOTS`:** The code evaluates `!== "false"`, so **unset = slots on**. When adding a new environment or Vercel preview, set this explicitly. Do not rely on "undefined means off."

**New env vars:** Add to `.env.example` with a comment and a safe default. Also add to `docs/DEPLOYMENT.md`. `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is currently missing from `.env.example` — add it if Plausible is enabled.

**JSON-LD article dates:** When adding or updating a guide, pass `datePublished` and `dateModified` explicitly to `articleJsonLd()` from the guide's registry entry. Never rely on the `"2025-03-22"` fallback.

**Domain constants:** `salaryexit.in` and `https://www.salaryexit.in` appear in `next.config.ts` and `lib/seo/site-origin.ts`. If you fork or rebrand, both files must be updated together. Do not scatter the domain string elsewhere.

**No middleware.ts:** There is intentionally no `middleware.ts`. HTTPS enforcement and host canonicalization are handled by Vercel + `next.config.ts` + `getSiteOrigin()`. Do not add middleware without understanding that full chain.

## Known bugs to be aware of

**IndexNow hostname validation** (`lib/indexnow.ts:36`): when the canonical host is `www.salaryexit.in`, the second branch of the hostname check produces `www.www.salaryexit.in`. Apex URLs submitted to IndexNow will be rejected. Do not widen this check without fixing the logic.

**Freshness date inconsistency:** Three files disagree on the "last updated" date:
- `guides-registry.ts` → `GUIDE_CONTENT_AS_OF_ISO = "2025-03-22"`
- `site-freshness.ts` → `SITE_CONTENT_LAST_UPDATED_ISO = "2026-03-15"`
- `lib/jsonld.ts` default → `"2025-03-22"`

Sitemap uses the 2026 date; JSON-LD emits 2025; guide pages display "March 2025". These must be aligned before next major content push.

## Validation checklist

Run before marking any task complete:

- [ ] `npm test` — all 124 tests pass
- [ ] `npm run build` — no TypeScript errors, build succeeds
- [ ] `npm run lint` — zero new lint errors
- [ ] If tax/slab config changed: snapshot updated intentionally, `FORMULAS.md` updated
- [ ] If new route added: `ROUTES` constant added, route appears in `app/sitemap.ts`
- [ ] If new env var added: `.env.example` updated, `docs/DEPLOYMENT.md` updated
- [ ] If guide added/updated: `articleJsonLd()` called with explicit `datePublished` / `dateModified`
- [ ] If `salary-enough-pages.config.ts` or `lpa-pages.config.ts` changed: spot-check the affected route renders in the browser
- [ ] If redirects changed in `next.config.ts`: verify no loop (apex and www both resolve to one canonical host)

## Deployment cautions

**Canonical host is `www`.** Set `NEXT_PUBLIC_SITE_URL=https://www.salaryexit.in` in Vercel → Production environment variables. If this is set to the apex domain, `getSiteOrigin()` will rewrite it to www anyway, but all in-between `VERCEL_URL` fallback previews will emit preview-domain canonicals — acceptable for previews, not for production.

**Vercel domain redirect + `next.config.ts` must agree.** If Vercel is configured to redirect apex → www, `next.config.ts`'s `apexToWwwProduction()` is a harmless duplicate 301 chain. If Vercel is set to redirect www → apex, you get a loop. The two must always point the same direction.

**`ads.txt`** is dynamic (`app/ads.txt/route.ts`). Until `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set to a real `ca-pub-` value, the file serves comment-only lines — Google will see no valid ads.txt entry, which is preferable to a 404 but will suppress AdSense until the ID is set.

**AdSense approval flow:** Add `NEXT_PUBLIC_ADSENSE_CLIENT_ID` first (triggers `ads.txt` and the AdSense script), then set `NEXT_PUBLIC_ENABLE_AD_SLOTS=true` after Google approves the site. Enabling slots before approval serves placeholder divs to real users.

**IndexNow:** `INDEXNOW_KEY` must match the filename served at `/{key}.txt`. The key is served by `app/[indexnowKey]/route.ts` using the same env var — they stay in sync automatically. If the key is rotated in the env, re-submit the key file URL to search engines.

**Post-deploy smoke checks:**
- `/robots.txt` — contains correct sitemap URL with `https://www.` host
- `/sitemap.xml` — all URLs use `https://www.salaryexit.in`, no `localhost` or Vercel preview URLs
- `/ads.txt` — returns `google.com/pub-…` line (not just comments) once AdSense ID is set
- `<link rel="canonical">` on homepage — must be `https://www.salaryexit.in/`
- No redirect loop: `curl -I http://salaryexit.in` → single 301 → `https://www.salaryexit.in`

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
