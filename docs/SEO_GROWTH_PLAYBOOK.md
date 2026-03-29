# SalaryExit — SEO + growth playbook (new site)

This is a practical checklist for turning a fresh domain into a site that can earn organic traffic and AdSense revenue. It pairs **what you do in the product** with **what you do outside the product**.

## Week 0–1 (ship the technical foundation)

### If you see “Discovered – currently not indexed” for many URLs

That usually means Google **knows the URLs** (often from your sitemap) but **has not crawled or indexed them yet**. On a **new domain**, that is common: crawl scheduling and quality signals improve over weeks.

Still fix anything that makes Google’s job harder:

- **Use `https://` everywhere in env**: In Vercel, set `NEXT_PUBLIC_SITE_URL=https://salaryexit.in` (not `http://`). The sitemap and canonical tags are built from this value; `http://` URLs in GSC almost always mean the env var (or an old deploy) used HTTP.
- **Redeploy** after changing env vars, then in GSC → **Sitemaps**, resubmit `https://salaryexit.in/sitemap.xml`.
- **URL Inspection**: request indexing for your homepage + a handful of high-value pages (don’t spam; quota is limited).
- **Internal links**: strong navigation + contextual links help discovery and perceived usefulness.
- **Differentiate programmatic pages**: city/LPA pages need clearly unique sections (not boilerplate), or Google may deprioritize crawling them.

### PageSpeed Insights “No data” for real users (CrUX)

If PSI says Chrome UX Report has **no data**, the site is usually **too new or too low-traffic** for field metrics. Use the **lab** (“Diagnose performance issues”) section for actionable audits; Search Console CWV fills in later as traffic grows. See [PageSpeed Insights](https://pagespeed.web.dev/).

- **Search Console (domain property)**: verify + submit `https://salaryexit.in/sitemap.xml`.
- **Indexing sanity checks**:
  - Confirm `robots.txt` allows crawling.
  - Use URL Inspection for homepage + 5–10 “money pages” (top calculators + top guides).
- **Canonical + metadata discipline**:
  - Every indexable URL should have a unique title/description/canonical.
  - Avoid duplicate near-identical pages without a clear differentiator.
- **Structured data**:
  - Validate key templates with Google’s Rich Results Test.
- **Performance**:
  - Track Core Web Vitals in Search Console; fix regressions early.

## Week 2–4 (content velocity + internal linking)

- **Publish on a schedule** (even 2 posts/week beats sporadic bursts):
  - 1 “hub” guide per week + 1 supporting calculator page refresh.
- **Intent-first outlines** (each page answers one query end-to-end):
  - Example intents: “CTC to in-hand”, “old vs new regime for X income”, “notice buyout math”, “is Y LPA enough in Z city”.
- **Internal links**:
  - Every guide links to the best calculator(s) and back.
  - Add “related reading” blocks that are contextual (not generic link dumps).
- **Refresh winners**:
  - Update assumptions, examples, and “last updated” when tax year defaults change.

## Month 2+ (distribution + authority)

- **Earn mentions** (this is usually the bottleneck for new domains):
  - Share genuinely useful pages in communities where it’s allowed (no spam).
  - Create cite-worthy resources (checklists, worked examples, comparison tables).
- **Build topical clusters**:
  - Salary → tax → switching jobs → exit benefits should interlink tightly.

## Monetization (AdSense) without tanking SEO

- **Policy + UX**:
  - Keep ads subordinate to content; avoid layouts that push main content below excessive ads.
  - Maintain strong About/Disclaimer/Privacy pages (trust signals).
- **Consent (EEA/UK/CH)**:
  - If you monetize with personalized ads, follow Google’s consent requirements for those regions.
- **Operational**:
  - Create ad units in AdSense and map them to env vars (see `.env.example`).

## What “high traffic” realistically means

Organic growth is compounding: weeks 1–4 are mostly indexing + baseline; meaningful query volume often ramps over **months**, not days.

## Weekly operating cadence (30 minutes)

1. Search Console → Performance: top queries + pages.
2. Fix 1 technical issue (404, soft-404, crawl anomaly).
3. Improve 1 page with impressions but low CTR (title/meta).
4. Publish or materially upgrade 1 page.
