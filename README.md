# SalaryExit India

**SalaryExit India** is an educational web app for Indian salaried employees: transparent salary, tax regime, PF, HRA, gratuity, and job-exit **estimates** with explicit assumptions—not tax filing, legal, or investment advice.

## Purpose

- Ship **SEO-friendly** calculator and guide pages with consistent metadata and internal linking.
- Keep **calculation logic** in tested, pure TypeScript (`lib/calculators`) separate from UI.
- Provide **trust and compliance** pages (about, contact, privacy, terms, disclaimer) and safe **monetization placeholders** (AdSense-ready slots, no fake publisher IDs).
- Stay **deployment-ready** on Vercel Hobby with environment-driven canonical URLs, sitemap/robots, and optional analytics/ads scripts.

## Architecture

- **Framework:** Next.js App Router (React 19), TypeScript, Tailwind CSS v4.
- **Calculators:** Pure functions in `lib/calculators/*` with inputs/outputs typed in `types/`. UI pages import from `lib/calculators` (barrel) and render forms + results.
- **Content:** Long-tail LPA pages and guide articles are driven by config/registry files under `lib/content/` so new URLs do not require duplicating full page templates.
- **SEO:** `lib/seo/metadata.ts` builds page metadata; `NEXT_PUBLIC_SITE_URL` sets the canonical host via `metadataBase` and `absoluteUrl()`.
- **Ads:** `components/ads/AdSlot.tsx` renders optional dashed placeholders keyed by `AdSlotPosition` (`lib/ads/ad-slots.ts`). `ThirdPartyRootScripts` injects GA/Plausible/AdSense **only** when `NEXT_PUBLIC_*` env vars are set.
- **Privacy:** `ConsentBannerShell` is a placeholder for a future CMP; enable with `NEXT_PUBLIC_ENABLE_CONSENT_BANNER=true` only after you wire real consent.

## Folder structure (high level)

```
app/                    # Routes, layouts, sitemap.ts, robots.ts, manifest.ts, icon.tsx
components/             # UI, layout, calculators, ads, legal shells
lib/
  calculators/          # Pure math + FORMULAS.md
  config/               # FY slabs, PF, tax, HRA, PT, gratuity assumptions
  content/              # Guides registry, LPA config, home copy
  seo/                  # metadata, canonical helpers, site origin
  ads/                  # Ad slot position types
types/                  # Shared TS types
tests/                  # Vitest tests for calculator logic
```

## How formulas are organized

- Implementation: `lib/calculators/*.ts` (one module per concern where possible).
- Human-readable reference: `lib/calculators/FORMULAS.md`.
- Versioned assumptions (slabs, standard deduction, etc.) live in `lib/config/` and are imported by calculators—**update tax years there** rather than hard-coding in components.

## Tests

```bash
npm test
```

Uses Vitest (`vitest.config.mjs`). Calculator tests live under `tests/` and exercise pure functions only.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; edit NEXT_PUBLIC_SITE_URL etc.
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

See **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for step-by-step Vercel Hobby setup, env vars, custom domains, Search Console, and AdSense notes.

Summary:

1. Import the repo, use default Next.js build settings.
2. Set **`NEXT_PUBLIC_SITE_URL`** to your production URL (no trailing slash).
3. Add verification/analytics/AdSense env vars as needed.
4. Redeploy after env changes.

## Add a custom domain

In Vercel **Settings → Domains**, add the domain and configure DNS. Set **`NEXT_PUBLIC_SITE_URL`** to match the canonical host (including `https` and `www` vs apex choice). Submit the sitemap in Search Console after go-live.

## Add Google AdSense later

1. Apply in AdSense and complete site approval.
2. Set **`NEXT_PUBLIC_ADSENSE_CLIENT_ID`** to your `ca-pub-…` value in Vercel (never commit real IDs to git).
3. **Auto Ads:** paste any additional snippet Google provides in the dashboard into the integration point described in `docs/DEPLOYMENT.md` / `ThirdPartyRootScripts` (avoid loading `adsbygoogle.js` twice).
4. **Manual units:** replace or augment `AdSlot` regions with your ad unit markup where you want fixed placements.

## Update tax assumptions

1. **Financial year / slabs / rebates:** edit the relevant files in `lib/config/` (and any calculator-specific defaults).
2. Document notable changes in `lib/calculators/FORMULAS.md` if behavior shifts.
3. Run **`npm test`** and spot-check calculator pages.

## Add new long-tail landing pages (LPA)

1. Open `lib/content/lpa-pages.config.ts`.
2. Add a row with `slug`, `lpa`, and SEO fields as required by the app route that consumes the config.
3. Ensure the dynamic route under `app/` includes the new slug (often automatic if the route is `[slug]`-driven).
4. Run build and confirm the new URL appears in **`app/sitemap.ts`** output (static paths include LPA entries).

## Post-launch SEO checklist

- [ ] `NEXT_PUBLIC_SITE_URL` matches the live canonical host.
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console.
- [ ] Verify property (HTML tag env or DNS).
- [ ] Spot-check canonical tags and `/robots.txt` allow crawling.
- [ ] Validate structured data on key pages (FAQ, articles) if using JSON-LD.
- [ ] Internal links from home and hubs to new calculators/guides.

## Post-launch QA checklist

- [ ] All calculators run with default inputs and show disclaimer copy.
- [ ] Legal pages load: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`.
- [ ] Footer links work; contact email shows when `NEXT_PUBLIC_CONTACT_EMAIL` is set.
- [ ] With `NEXT_PUBLIC_ENABLE_AD_SLOTS=false`, ad slots disappear without layout breaks.
- [ ] With analytics env unset, no third-party scripts load (verify network tab).
- [ ] Mobile layout: sidebar slot hidden; content readable.

## License

Private project (`package.json`); adjust as needed.
