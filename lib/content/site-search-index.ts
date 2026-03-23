/**
 * Flat index for the homepage search — calculators, guides, hubs, LPA pages.
 */

import { CALCULATOR_REGISTRY } from "@/lib/calculator-registry";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { SALARY_ENOUGH_PAGES } from "@/lib/content/salary-enough-pages.config";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";
import { GUIDE_ARTICLES, GUIDE_HUBS, guideArticlePath } from "@/lib/content/guides-registry";

export type SearchItem = {
  title: string;
  href: string;
  category: "Calculator" | "Guide" | "Landing" | "Hub";
  keywords: string;
};

export function getSiteSearchIndex(): SearchItem[] {
  const calculators: SearchItem[] = Object.values(CALCULATOR_REGISTRY).map((c) => ({
    title: c.label,
    href: c.path,
    category: "Calculator",
    keywords: [c.shortLabel, c.seo.title, ...(c.seo.keywords ?? [])].join(" "),
  }));

  const hubs: SearchItem[] = (Object.keys(GUIDE_HUBS) as (keyof typeof GUIDE_HUBS)[]).map(
    (k) => ({
      title: GUIDE_HUBS[k].title,
      href: GUIDE_HUBS[k].path,
      category: "Hub",
      keywords: [GUIDE_HUBS[k].seo.title, GUIDE_HUBS[k].description].join(" "),
    })
  );

  const guides: SearchItem[] = GUIDE_ARTICLES.map((a) => ({
    title: a.title,
    href: guideArticlePath(a),
    category: "Guide",
    keywords: [a.description, ...a.keywords].join(" "),
  }));

  const lpa: SearchItem[] = LPA_LANDING_PAGES.map((p) => ({
    title: `${p.lpa} LPA in-hand (estimate)`,
    href: lpaLandingPath(p.slug),
    category: "Landing",
    keywords: [p.seo.title, ...(p.seo.keywords ?? []), "LPA", "in hand"].join(" "),
  }));

  const salaryEnough: SearchItem[] = SALARY_ENOUGH_PAGES.map((p) => ({
    title: p.seo.title,
    href: salaryEnoughPath(p.slug),
    category: "Landing",
    keywords: [p.seo.description, ...(p.seo.keywords ?? []), "salary enough", p.city.name].join(" "),
  }));

  return [...calculators, ...hubs, ...guides, ...lpa, ...salaryEnough];
}
