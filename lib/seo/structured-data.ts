import { getSiteOrigin } from "@/lib/seo/site-origin";
import { absoluteUrl } from "@/lib/seo/metadata";

function parseSameAsEnv(): string[] | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_SAME_AS?.trim();
  if (!raw) return undefined;

  const urls = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//i.test(s));

  return urls.length ? urls : undefined;
}

export function websiteJsonLd() {
  const origin = getSiteOrigin().origin;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: "SalaryExit India",
    url: origin,
    inLanguage: "en-IN",
    publisher: { "@id": `${origin}/#organization` },
  } as const;
}

/**
 * WebApplication schema for free calculator tools.
 * Helps Google understand these are interactive financial tools, not just articles.
 */
export function webApplicationJsonLd(options: {
  name: string;
  description: string;
  urlPath: string;
}) {
  const origin = getSiteOrigin().origin;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${absoluteUrl(options.urlPath)}#webapp`,
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.urlPath),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: "SalaryExit India",
    },
  } as const;
}

/**
 * BreadcrumbList schema — helps Google show breadcrumb trails in search results.
 * Pass items from root to current page.
 */
export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  } as const;
}

export function organizationJsonLd() {
  const origin = getSiteOrigin().origin;
  const logo = `${origin}/icon`;
  const sameAs = parseSameAsEnv();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "SalaryExit India",
    url: origin,
    logo,
    ...(sameAs ? { sameAs } : {}),
  } as const;
}
