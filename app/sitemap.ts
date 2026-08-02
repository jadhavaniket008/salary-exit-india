import type { MetadataRoute } from "next";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { LPA_LANDING_PAGES, LOW_DEMAND_LPA_SLUGS } from "@/lib/content/lpa-pages.config";
import { STRONG_PERFORMER_SALARY_ENOUGH_SLUGS } from "@/lib/content/salary-enough-pages.config";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";
import { GUIDE_ARTICLES, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import { getSiteOrigin } from "@/lib/seo/site-origin";
import { SITE_CONTENT_LAST_UPDATED_ISO } from "@/lib/config/site-freshness";

function url(path: string): string {
  const base = getSiteOrigin().origin.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SITE_CONTENT_LAST_UPDATED_ISO}T00:00:00.000Z`);
  const staticPaths = [
    ROUTES.home,
    ROUTES.calculators,
    ROUTES.methodology,
    ROUTES.about,
    ROUTES.contact,
    ROUTES.privacyPolicy,
    ROUTES.terms,
    ROUTES.disclaimer,
    ROUTES.salaryGuides,
    ROUTES.taxGuides,
    ROUTES.jobSwitchGuides,
    // Flagship linkable data asset — see docs/growth/link-earning-offers.md.
    // The /embed counterpart is deliberately noindexed (see its own page metadata)
    // so it doesn't compete with this page for search visibility.
    ROUTES.inHandSalaryModelReport,
    ...Object.values(CALCULATOR_REGISTRY).map((c) => c.path),
    // Long-tail LPA bands are noindexed pending AdSense approval — keep them out
    // of the sitemap while the robots meta says noindex (mixed signals confuse Google).
    ...LPA_LANDING_PAGES.filter((p) => !LOW_DEMAND_LPA_SLUGS.has(p.slug)).map((p) => lpaLandingPath(p.slug)),
    // salary-enough pages are noindexed pending AdSense approval, except the 2 proven
    // performers carved out in salary-enough-pages.config.ts (still indexed, still ranking).
    ...Array.from(STRONG_PERFORMER_SALARY_ENOUGH_SLUGS).map((slug) => salaryEnoughPath(slug)),
    ...GUIDE_ARTICLES.map((a) => guideArticlePath(a)),
  ];

  const unique = Array.from(new Set(staticPaths));

  return unique.map((path) => ({
    url: url(path),
    lastModified,
    changeFrequency: "weekly",
    priority: path === ROUTES.home ? 1 : 0.7,
  }));
}
