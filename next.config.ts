import type { NextConfig } from "next";
import { LPA_LANDING_PAGES } from "./lib/content/lpa-pages.config";
import { SALARY_ENOUGH_PAGES } from "./lib/content/salary-enough-pages.config";
import { lpaLandingPath, salaryEnoughPath } from "./lib/routes/landing-routes";

/**
 * 301 from legacy root paths (/8-lpa-in-hand-salary) to canonical /lpa/… and /salary-enough/…
 * so internal links and sitemap only use new URLs; old inbound links consolidate without duplicate HTML.
 */
function legacyLandingRedirects(): { source: string; destination: string; permanent: boolean }[] {
  const lpa = LPA_LANDING_PAGES.map((p) => ({
    source: `/${p.slug}`,
    destination: lpaLandingPath(p.slug),
    permanent: true,
  }));
  const enough = SALARY_ENOUGH_PAGES.map((p) => ({
    source: `/${p.slug}`,
    destination: salaryEnoughPath(p.slug),
    permanent: true,
  }));
  return [...lpa, ...enough];
}

const nextConfig: NextConfig = {
  async redirects() {
    return legacyLandingRedirects();
  },
};

export default nextConfig;
