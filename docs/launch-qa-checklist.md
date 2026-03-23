# SalaryExit India — Launch QA Checklist

This checklist is meant for a safe launch. It focuses on trust, integrity, and correctness rather than growth tactics.

## Pre-launch checks
1. Environment variables
   - `NEXT_PUBLIC_SITE_URL` is set to the canonical production URL (no trailing slash).
   - `NEXT_PUBLIC_CONTACT_EMAIL` is set to a real monitored inbox (so `/contact` does not show placeholders).
   - Ads/analytics toggles are configured exactly as you intend for launch:
     - Ad slots: `NEXT_PUBLIC_ENABLE_AD_SLOTS`
     - Consent banner (if applicable): `NEXT_PUBLIC_ENABLE_CONSENT_BANNER`
     - Analytics IDs/domains: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
     - AdSense client id (later): `NEXT_PUBLIC_ADSENSE_CLIENT_ID`

2. Calculation scope + freshness
   - Confirm the FY label and defaults are correct for the intended tax year:
     - `ENGINE_FY_LABEL` in `lib/config/site-freshness.ts`
   - Update `SITE_CONTENT_LAST_UPDATED` in `lib/config/site-freshness.ts` after any substantive content or methodology changes.

3. Routing and content integrity
   - Run `npm test` (ensures config rows have unique slugs and the default scenario computes without runtime errors).
   - Run `npm run build` (ensures Next metadata + SSG routes are generated).

## Post-launch checks
1. Smoke tests (manual)
   - Open `/salary-reality-check` and run a simple scenario (rent + lifestyle) to confirm the verdict renders.
   - Open at least one of each:
     - `/ctc-to-in-hand-calculator`
     - `/salary-calculator`
     - `/tax-guides/old-vs-new-tax-regime-basics`
     - `/salary-guides/how-much-salary-you-need-in-bangalore`
     - one `/salary-enough/[slug]` page and one `/lpa/[slug]` page
   - Verify reset buttons clear fields and remove old results.

2. Trust visibility
   - Confirm methodology + FY labels are visible on calculators and key landing pages.
   - Confirm disclaimers are linked/visible where expected (especially estimate-to-reality caveats).

3. Sitemap and indexing
   - Ensure `/sitemap.xml` is accessible publicly.
   - Submit the sitemap in Search Console after the domain is verified.

## SEO checks
1. Canonicals
   - Confirm each major page exports `metadata` with a `canonicalPath` (handled by `buildPageMetadata`).
   - Confirm dynamic routes (`/lpa/[slug]`, `/salary-enough/[slug]`) generate canonical metadata.

2. Structured data
   - Verify JSON-LD appears where relevant:
     - Guide pages (article/faq)
     - Disclaimer/FAQ sections where present

3. Heading structure
   - Ensure each page has a single clear H1 (templates usually enforce this) and stable H2 subheads.

## Analytics checks
1. Analytics firing
   - If enabled, confirm pageviews fire (GA4 or Plausible). See **`docs/analytics.md`** for env placement and verification steps.
   - Confirm consent behavior matches your toggle (`NEXT_PUBLIC_ENABLE_CONSENT_BANNER`).

2. Custom events (optional)
   - `lib/analytics/client.ts` emits `calculator_use`, `salary_reality_check_use`, `offer_compare_submit`, `offer_compare_click`, `share_summary` when GA/Plausible is loaded — verify in GA4 **Realtime** or Plausible **Goals** if you configure them.

3. No false metrics
   - Events are tied to real UI actions (calculate, share, compare); they no-op when analytics scripts are absent.

## AdSense-later checks
1. Keep it off until approved
   - Leave `NEXT_PUBLIC_ADSENSE_CLIENT_ID` unset until AdSense is approved.

2. Placement + layout safety
   - After enabling AdSense, verify:
     - Ad slots render correctly without breaking mobile layout
     - No layout shift around calculator inputs / results

