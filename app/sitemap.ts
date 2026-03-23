import type { MetadataRoute } from "next";
import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { SALARY_ENOUGH_PAGES } from "@/lib/content/salary-enough-pages.config";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";
import { GUIDE_ARTICLES, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import { getSiteOrigin } from "@/lib/seo/site-origin";

function url(path: string): string {
  const base = getSiteOrigin().origin.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...Object.values(CALCULATOR_REGISTRY).map((c) => c.path),
    ...LPA_LANDING_PAGES.map((p) => lpaLandingPath(p.slug)),
    ...SALARY_ENOUGH_PAGES.map((p) => salaryEnoughPath(p.slug)),
    ...GUIDE_ARTICLES.map((a) => guideArticlePath(a)),
  ];

  const unique = Array.from(new Set(staticPaths));

  return unique.map((path) => ({
    url: url(path),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === ROUTES.home ? 1 : 0.7,
  }));
}
