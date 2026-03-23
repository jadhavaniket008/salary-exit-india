/**
 * Maps calculator slugs to relevant guide articles for in-product education links.
 */

import {
  guideArticlePath,
  GUIDE_ARTICLES,
  type GuideArticleMeta,
} from "@/lib/content/guides-registry";
import type { CalculatorSlug } from "@/lib/routes";

function pick(
  ...keys: { hub: GuideArticleMeta["hub"]; segment: string }[]
): { href: string; title: string }[] {
  return keys
    .map((k) => GUIDE_ARTICLES.find((a) => a.hub === k.hub && a.segment === k.segment))
    .filter((a): a is GuideArticleMeta => Boolean(a))
    .map((a) => ({ href: guideArticlePath(a), title: a.title }));
}

export const EDUCATION_LINKS_BY_CALCULATOR: Record<
  CalculatorSlug,
  { href: string; title: string }[]
> = {
  salaryRealityCheck: pick(
    { hub: "salary", segment: "what-affects-in-hand-salary" },
    { hub: "jobSwitch", segment: "compare-job-offers-beyond-ctc" }
  ),
  salary: pick(
    { hub: "salary", segment: "salary-structure-in-india" },
    { hub: "salary", segment: "what-affects-in-hand-salary" }
  ),
  ctcToInHand: pick(
    { hub: "salary", segment: "what-affects-in-hand-salary" },
    { hub: "salary", segment: "salary-structure-in-india" }
  ),
  taxRegime: pick({ hub: "tax", segment: "old-vs-new-tax-regime-basics" }),
  hra: pick({ hub: "tax", segment: "old-vs-new-tax-regime-basics" }),
  gratuity: pick({ hub: "jobSwitch", segment: "what-is-gratuity" }),
  leaveEncashment: pick({ hub: "jobSwitch", segment: "compare-job-offers-beyond-ctc" }),
  noticeBuyout: pick({ hub: "jobSwitch", segment: "how-notice-period-buyout-works" }),
  finalSettlement: pick({ hub: "jobSwitch", segment: "compare-job-offers-beyond-ctc" }),
  offerComparison: pick({ hub: "jobSwitch", segment: "compare-job-offers-beyond-ctc" }),
  salaryHike: pick({ hub: "jobSwitch", segment: "compare-job-offers-beyond-ctc" }),
  epf: pick({ hub: "salary", segment: "salary-structure-in-india" }),
};
