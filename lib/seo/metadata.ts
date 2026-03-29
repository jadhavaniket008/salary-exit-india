import type { Metadata } from "next";
import type { SeoPageMetadata } from "@/types/seo";
import { getSiteOrigin } from "@/lib/seo/site-origin";

const siteName = "SalaryExit India";

/** Short brand for `<title>` — keeps Bing / GSC “title too long” warnings under control. */
const siteNameShort = "SalaryExit";

/**
 * Bing Site Scan and similar tools often warn above ~60 characters for `<title>`.
 * We cap here so programmatic pages don’t need one-off edits everywhere.
 */
export const SEO_TITLE_MAX_CHARS = 60;

const TITLE_BRAND_SUFFIX = ` | ${siteNameShort}`;

/**
 * Produces a single `<title>` string within {@link SEO_TITLE_MAX_CHARS} when possible.
 * Uses a short brand suffix and word-boundary truncation.
 */
export function formatHtmlTitle(primaryTitle: string): string {
  const hasFullBrand = primaryTitle.includes(siteName);
  const candidate = hasFullBrand ? primaryTitle : `${primaryTitle}${TITLE_BRAND_SUFFIX}`;

  if (candidate.length <= SEO_TITLE_MAX_CHARS) {
    return candidate;
  }

  if (hasFullBrand) {
    return truncateSeoTitle(primaryTitle, SEO_TITLE_MAX_CHARS);
  }

  const maxPrimary = SEO_TITLE_MAX_CHARS - TITLE_BRAND_SUFFIX.length;
  return truncateSeoTitle(primaryTitle, maxPrimary) + TITLE_BRAND_SUFFIX;
}

function truncateSeoTitle(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  const ellipsis = "…";
  const limit = Math.max(0, max - ellipsis.length);
  if (limit === 0) return ellipsis.slice(0, max);
  const cut = t.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > Math.floor(limit * 0.35)) {
    return cut.slice(0, lastSpace).trimEnd() + ellipsis;
  }
  return cut.trimEnd() + ellipsis;
}

/**
 * Builds Next.js Metadata from our typed SEO shape.
 * Keeps title templates and Open Graph defaults consistent.
 */
export function buildPageMetadata(
  seo: SeoPageMetadata,
  options?: { canonicalPath?: string }
): Metadata {
  const title = formatHtmlTitle(seo.title);

  const description = seo.description;
  const keywords = seo.keywords?.length ? seo.keywords : undefined;

  const canonical = options?.canonicalPath
    ? absoluteUrl(options.canonicalPath)
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      type: "website",
      siteName,
      locale: seo.locale ?? "en_IN",
      ...(seo.ogImage
        ? { images: [{ url: seo.ogImage, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
  };
}

/**
 * Absolute URL for static metadata; set NEXT_PUBLIC_SITE_URL in production.
 */
export function absoluteUrl(path: string): string {
  const base = getSiteOrigin().origin.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export { siteName };
