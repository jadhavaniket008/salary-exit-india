/**
 * SEO metadata for a page — consumed by buildPageMetadata().
 */
export type SeoPageMetadata = {
  title: string;
  description: string;
  /** Optional keywords for meta keywords / internal tooling */
  keywords?: string[];
  /** Open Graph image path under public/ */
  ogImage?: string;
  locale?: string;
  noIndex?: boolean;
};

/**
 * Config for a salary-related landing page (content layer; not used in formulas).
 */
export type SalaryLandingPageConfig = {
  slug: string;
  seo: SeoPageMetadata;
  /** Short intro shown above the fold */
  heroSubtitle?: string;
  /** Related calculator slugs for internal linking */
  relatedSlugs?: string[];
};
