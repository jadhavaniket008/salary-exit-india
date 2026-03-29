import type { Metadata } from "next";
import type { SeoPageMetadata } from "@/types/seo";
import { getSiteOrigin } from "@/lib/seo/site-origin";

const siteName = "SalaryExit India";

/**
 * Builds Next.js Metadata from our typed SEO shape.
 * Keeps title templates and Open Graph defaults consistent.
 */
export function buildPageMetadata(
  seo: SeoPageMetadata,
  options?: { canonicalPath?: string }
): Metadata {
  const title = seo.title.includes(siteName)
    ? seo.title
    : `${seo.title} | ${siteName}`;

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
