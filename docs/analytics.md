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
| `home_hero_tool_click` | Click on one of the five existing homepage hero calculator links | `cta_placement=home_hero`, `destination_tool` | Navigation **intent only**; not proof that a person started/completed the tool; GA4 session campaign handled separately |

GA4 Admin → Custom definitions → Create custom dimension → **Event** scope:
`calculator_slug`, `cta_placement`, `destination_tool`, `partner_name`, `affiliate_context`, `offer_id`,
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

## Homepage acquisition funnel hypothesis (15 Nov 2026)

First-party GA4 (Nov 1–14): 8 Instagram-attributed sessions, of which 5 were from the historical `instagram_pilot_oct2026` campaign to homepage, 2 to EPF and 1 to CTC. The single CTC visit includes an `mcp_token` query parameter and may be QA/automated. Data is too sparse for performance claims. The homepage already has a primary CTC calculator CTA plus 4 alternatives; **do not duplicate CTAs or build an unvalidated landing page**.

This PR adds **only** consent-gated `home_hero_tool_click` intent (one event per existing hero link click). After production release and event propagation:

1. In GA4 Explore compare `session_source / medium` and `session_campaign` to `home_hero_tool_click` users; use event `destination_tool` once registered as an event-scoped custom dimension (not retroactive).
2. Separately measure the destination's `calculator_started` / `calculator_use` or `offer_compare_submit` events. They are not interchangeable; an event count is not distinct people.
3. Exclude identifiable operator, preview and automated `mcp_token` sessions; consent gaps mean a missing event does not prove that no visitor clicked.
4. This instrumentation **does not change Instagram bio links**. First confirm an authorized bio link points to a valid tagged deep tool link; such an external account update requires explicit owner approval.
5. A diagnostic target of 20 genuine tagged sessions and 5 distinct tool users is pre-registered as an exploratory gate, not evidence of an achieved result. Do not promote the result to a purchase event.
