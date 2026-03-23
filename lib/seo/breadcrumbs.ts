import { ROUTES } from "@/lib/routes";
import { getSiteOrigin } from "@/lib/seo/site-origin";

export type BreadcrumbItem = {
  /** Display label */
  label: string;
  /** Path segment or full path */
  href: string;
};

/**
 * JSON-LD BreadcrumbList item list (position 1-based per schema.org).
 */
export function toBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http")
        ? item.href
        : absolutePathToUrl(item.href),
    })),
  };
}

function absolutePathToUrl(path: string): string {
  const base = getSiteOrigin().origin.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Default hub trail: Home → Calculators */
export function calculatorsHubBreadcrumbs(): BreadcrumbItem[] {
  return [
    { label: "Home", href: ROUTES.home },
    { label: "Calculators", href: ROUTES.calculators },
  ];
}
