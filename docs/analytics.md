# Analytics & measurement (SalaryExit India)

This app supports **optional** measurement via **Google Analytics 4** and/or **Plausible**. Nothing loads from those vendors until you set env vars and deploy.

## Where to put env vars

| Environment | Location |
|---------------|----------|
| Local | `.env.local` (copy from `.env.example`) |
| Vercel | **Project → Settings → Environment Variables** (Production / Preview as needed) |

### Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (e.g. `G-XXXXXXXXXX`). If unset, GA does not load. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible site domain (e.g. `salaryexit.example`). If unset, Plausible does not load. |
| `NEXT_PUBLIC_ENABLE_CONSENT_BANNER` | `true` = analytics scripts load only after the user opts in to analytics in the consent banner. `false` = analytics allowed by default (see `lib/consent.ts`). |

**AdSense** is separate: `NEXT_PUBLIC_ADSENSE_CLIENT_ID` — leave unset until you are ready for ads.

## How scripts are loaded

`components/ads/ThirdPartyRootScripts.tsx` injects:

- GA4 `gtag.js` only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and consent allows analytics.
- Plausible `script.js` only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set and consent allows analytics.
- No duplicate loaders — one component in `app/layout.tsx`.

## How to verify pageviews

1. Set **one** of `NEXT_PUBLIC_GA_MEASUREMENT_ID` or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in production (or Preview).
2. Deploy and open the live site in a **private/incognito** window (or a device with no ad blockers for first check).
3. **GA4:** Realtime → verify events for your property. You should see `page_view` and engagement.
4. **Plausible:** Dashboard for your domain → verify visitors and page paths.

If you see nothing:

- Confirm env vars are set for the **correct** Vercel environment (Production vs Preview).
- Redeploy after changing env vars.
- Disable strict blockers temporarily; verify `NEXT_PUBLIC_SITE_URL` matches the URL you are visiting.

## How to verify Search Console

1. Add a property in [Google Search Console](https://search.google.com/search-console) for your domain or URL prefix.
2. Use **HTML tag** verification: paste the **content** value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel, redeploy, then click **Verify** in Search Console.
3. Submit **`https://<your-domain>/sitemap.xml`** under **Sitemaps**.

See also `docs/DEPLOYMENT.md` §5.

## Custom events (implementation)

Client-side helpers live in `lib/analytics/client.ts`. They **no-op** until `window.gtag` / `window.plausible` exist (i.e. after scripts load).

| Event name (GA4 `event` / Plausible custom) | When it fires |
|---------------------------------------------|----------------|
| `calculator_use` | Successful **Calculate** on a calculator with a submit button. Param: `calculator_slug` (matches `CalculatorSlug` in `lib/routes.ts`). |
| `salary_reality_check_use` | First time inputs yield a valid modeled result in a session (full page or embed). Param: `embed` = `true`/`false`. |
| `offer_compare_submit` | Successful compare on **Offer comparison** calculator. |
| `offer_compare_click` | CTA click toward offer comparison (e.g. from Salary Reality Check “Next steps”). Param: `cta_placement` (replaces the ambiguous `source` parameter). |
| `share_summary` | Copy or native share on Salary Reality Check share card. Param: `action` = `copy` \| `share_native`. |

### Plausible: custom goals

In Plausible, add **custom events** or goals matching the names above if you want them in the dashboard; otherwise they still work as pageview-only traffic if you only use the default script.

### GA4: custom events

Register interest in `calculator_use`, `salary_reality_check_use`, etc. in GA4 **Admin → Events** (or **Custom definitions**) as needed for reporting.

## Privacy

When you enable analytics, update your **privacy policy** to describe what data is collected and how users can opt out (especially if `NEXT_PUBLIC_ENABLE_CONSENT_BANNER` is `true`).


## October 2026 intent instrumentation

All custom event helpers re-check analytics consent on each call. Loaded GA/Plausible functions
are insufficient when analytics consent has been withdrawn. This change does not claim to
unload vendor scripts or disable their automatic pageview collection.

| Event | Trigger | Parameters | Meaning |
|---|---|---|---|
| `affiliate_link_click` | Existing Zerodha/Groww referral link click | `partner_name`, `affiliate_context` | Referral intent, not earnings; Quicko direct links excluded |
| `business_inquiry_click` | Business mailto click | `cta_placement`, `offer_id` | Email intent, not a submitted lead |
| `resource_download_click` | Report CSV/JSON link click | `resource_id`, `file_format` | Download intent, not confirmed completion |
| `embed_code_copy` | Clipboard write succeeds on business page | `resource_id` | Successful copy; embedded table remains untracked |
| `sign_up` | Newsletter endpoint returns success | `method=newsletter` | Provider accepted request; not proof of a new unique subscriber |
| `offer_compare_click` | Existing offer comparison CTA | `cta_placement` | Navigation intent; no custom `source` parameter |

GA4 Admin → Custom definitions → Create custom dimension → **Event** scope:
`calculator_slug`, `cta_placement`, `partner_name`, `affiliate_context`, `offer_id`,
`resource_id`, `file_format`. Register only dimensions used in your reports; registration
is a separate admin action, not performed by the code. Allow 24–48 hours for reporting.
Do not assume historical parameter breakdowns are backfilled.

Keep `calculator_use`, `salary_reality_check_use` and `offer_compare_submit` as useful-action
measures. Do not divide event counts from different start/use definitions to infer funnel
completion. Report users or sessions with the same event definition and denominator.

No email, salary input, company name or inquiry body is sent in these custom events.
No `purchase`, monetary value or `generate_lead` is emitted for these clicks. Reconcile
paid invoices and partner payouts separately before reporting revenue. QA on a local
build with analytics spies so production reporting is not contaminated.
