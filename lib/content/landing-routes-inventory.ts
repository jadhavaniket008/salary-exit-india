/**
 * Route inventory for config-driven SEO landings — QA and docs.
 */

import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { SALARY_ENOUGH_PAGES } from "@/lib/content/salary-enough-pages.config";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";

export type LandingRouteEntry = {
  kind: "lpa" | "salaryEnough";
  slug: string;
  canonicalPath: string;
};

export function getLandingRouteInventory(): {
  lpa: LandingRouteEntry[];
  salaryEnough: LandingRouteEntry[];
  legacySources: { source: string; destination: string }[];
} {
  const lpa: LandingRouteEntry[] = LPA_LANDING_PAGES.map((p) => ({
    kind: "lpa",
    slug: p.slug,
    canonicalPath: lpaLandingPath(p.slug),
  }));
  const salaryEnough: LandingRouteEntry[] = SALARY_ENOUGH_PAGES.map((p) => ({
    kind: "salaryEnough",
    slug: p.slug,
    canonicalPath: salaryEnoughPath(p.slug),
  }));
  const legacySources = [
    ...lpa.map((e) => ({ source: `/${e.slug}`, destination: e.canonicalPath })),
    ...salaryEnough.map((e) => ({ source: `/${e.slug}`, destination: e.canonicalPath })),
  ];
  return { lpa, salaryEnough, legacySources };
}

/** True if the same slug string appears in both configs (would break redirects). */
export function hasDuplicateIntentSlugs(): boolean {
  const lpaSet = new Set(LPA_LANDING_PAGES.map((p) => p.slug));
  return SALARY_ENOUGH_PAGES.some((p) => lpaSet.has(p.slug));
}
