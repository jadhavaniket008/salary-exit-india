# Structured-data audit — /reports/india-in-hand-salary-model-2026

Audited 2026-07-31 by extracting and parsing every `<script type="application/ld+json">` block from the production-built page's raw HTML (not by counting string occurrences — an earlier informal check in this engagement mistakenly reported "8 JSON-LD blocks" using `grep -c` on the string `application/ld+json`, which double-counts because that string appears both in the script tag's `type` attribute and is not a reliable block count; this audit parses each block with `JSON.parse` for an accurate count).

## Blocks found: 4 (accurate count, not the earlier informal "8")

| # | `@type` | Purpose | Source component | Duplicated? | Conflicting? | Valid for this page? | Every property supported by visible content? | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | `WebSite` | Site identity, `@id`-linked to the Organization block | `lib/seo/structured-data.ts` → `websiteJsonLd()`, rendered in `app/layout.tsx` (root layout, every page) | No — one instance per page render, same shared schema site-wide, which is the correct pattern (not page-specific duplication) | No | Yes — generic site identity is valid on every page including this one | Yes — name/URL match the actual site | **Verified, keep as-is** |
| 2 | `Organization` | Publisher identity, referenced by `@id` from both `WebSite` and `Article` | `lib/seo/structured-data.ts` → `organizationJsonLd()`, root layout | No — same shared, correct pattern | No | Yes | Yes — name/URL/logo match the actual site | **Verified, keep as-is** |
| 3 | `Article` | Identifies the report as a datePublished/dateModified article with headline, description, author, publisher | `lib/jsonld.ts` → `articleJsonLd()`, called directly in `app/reports/india-in-hand-salary-model-2026/page.tsx` | No — page-specific, not repeated elsewhere | **Was conflicting — fixed this audit.** `headline` previously read "...CTC to In-Hand, Modeled (Financial Year 2026-27 (AY 2027-28))", which did not match the page's actual visible `<h1>` ("...what CTC actually becomes"). Now fixed to match the H1 exactly. | Yes | `datePublished`/`dateModified` are explicit (`2026-07-31`, not the `lib/jsonld.ts` fallback default) per CLAUDE.md's own rule about never relying on that fallback. `description` is a reasonable paraphrase of the executive-summary paragraph, not identical text but not conflicting either — Article JSON-LD descriptions are conventionally a summary, not a verbatim quote. | **Corrected this audit — headline now matches visible H1** |
| 4 | `BreadcrumbList` | Home → report page breadcrumb trail | `lib/seo/structured-data.ts` → `breadcrumbJsonLd()`, called in the report page | No | No | Yes | Yes — matches the actual site hierarchy (report is a direct child of home; there is no intermediate `/reports` index page, which is accurate — no such listing page exists) | **Verified, keep as-is** |

## What was NOT changed

`WebSite` and `Organization` are legitimate shared, site-wide schemas rendered from the root layout on every page — per the task's own instruction ("do not remove valid shared schemas merely to reduce the count"), these were left untouched. They are not duplicates of each other and do not conflict with the page-specific `Article`/`BreadcrumbList` blocks; `Article.publisher` and `WebSite.publisher` both correctly resolve to the same `Organization` entity via `@id`, which is the correct cross-referencing pattern, not a conflict.

## Fix applied

One line changed in `app/reports/india-in-hand-salary-model-2026/page.tsx`: the `Article` JSON-LD's `headline` now reads `"SalaryExit India In-Hand Salary Model 2026: what CTC actually becomes"`, matching the page's visible `<h1>` exactly, instead of a different subtitle variant that only existed in the JSON-LD and nowhere in the visible page. The `<title>` tag (used for the browser tab / search-result title) intentionally keeps its own, more SEO-oriented subtitle — that's a normal, expected `<title>` vs. `<h1>` difference, not a structured-data conflict, since `<title>` isn't part of the `Article` schema's `headline` property.

## Embed page (`/embed/in-hand-salary-table`)

No JSON-LD present — correct, since the page is deliberately noindexed (`noindex, follow`) and not meant to be treated as a standalone indexable article; adding Article/Breadcrumb schema there would be structured data for a page Google is explicitly told not to index, which is pointless at best and could read as an inconsistent signal at worst. No action needed.
