/**
 * Canonical URL paths for config-driven SEO landing pages.
 * Slugs stay stable in config; only the route prefix changes.
 */

export const LPA_ROUTE_PREFIX = "/lpa" as const;
export const SALARY_ENOUGH_ROUTE_PREFIX = "/salary-enough" as const;

export function lpaLandingPath(slug: string): string {
  return `${LPA_ROUTE_PREFIX}/${slug}`;
}

export function salaryEnoughPath(slug: string): string {
  return `${SALARY_ENOUGH_ROUTE_PREFIX}/${slug}`;
}
