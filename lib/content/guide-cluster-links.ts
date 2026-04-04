/**
 * Per-article internal links for crawl depth + topical clustering (guides → salary-enough + calculator).
 * Each guide gets a *different* pair of city pages where possible to reduce “same footer” duplication.
 */

import type { GuideHubId } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";

export type GuideClusterLinkSpec = {
  salaryEnoughSlugs: readonly [string, string];
  calculatorHref: string;
  calculatorLabel: string;
  /** Short, guide-specific reason for the box — not repeated across articles */
  intro: string;
};

const KEY = (hub: GuideHubId, segment: string) => `${hub}:${segment}` as const;

const MAP = new Map<string, GuideClusterLinkSpec>([
  [
    KEY("salary", "salary-structure-in-india"),
    {
      salaryEnoughSlugs: ["is-15-lpa-good-in-bangalore", "is-15-lpa-good-in-pune"],
      calculatorHref: ROUTES.ctcToInHandCalculator,
      calculatorLabel: "CTC → in-hand calculator",
      intro:
        "See how the same CTC line turns into cash after PF and tax, then how rent changes the *felt* salary in two big job markets.",
    },
  ],
  [
    KEY("salary", "what-affects-in-hand-salary"),
    {
      salaryEnoughSlugs: ["is-18-lpa-good-in-pune", "is-20-lpa-good-in-mumbai"],
      calculatorHref: ROUTES.salaryCalculator,
      calculatorLabel: "Salary & tax breakdown",
      intro:
        "After you understand levers (regime, PF, PT), stress-test two high-rent stories — Pune vs Mumbai — where small gross differences stop mattering next to lease size.",
    },
  ],
  [
    KEY("salary", "what-reduces-your-in-hand-salary"),
    {
      salaryEnoughSlugs: ["is-12-lpa-good-in-hyderabad", "is-12-lpa-good-in-noida"],
      calculatorHref: ROUTES.epfCalculator,
      calculatorLabel: "EPF contribution estimator",
      intro:
        "Deductions bite hardest when gross is mid-band. Compare two ₹12L metros with different rent anchors, then isolate PF math if your payslip line confuses you.",
    },
  ],
  [
    KEY("salary", "how-to-judge-if-a-salary-is-good-in-india"),
    {
      salaryEnoughSlugs: ["is-10-lpa-good-in-bangalore", "is-25-lpa-good-in-bangalore"],
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "“Good salary” is a range: same city, ₹10L vs ₹25L, with rent and tier spelled out — use it to sanity-check your own offer against two transparent scenarios.",
    },
  ],
  [
    KEY("salary", "how-rent-changes-your-monthly-savings"),
    {
      salaryEnoughSlugs: ["is-20-lpa-enough-in-bangalore", "is-10-lpa-enough-for-family-in-pune"],
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "Rent is the swing line for singles *and* families — one Bengaluru solo story vs one Pune household-tight story, both with the same savings engine.",
    },
  ],
  [
    KEY("salary", "how-much-salary-you-need-in-bangalore"),
    {
      salaryEnoughSlugs: ["is-12-lpa-good-in-bangalore", "is-20-lpa-enough-in-bangalore"],
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "Stay inside Bengaluru: lower vs higher LPA with different rent anchors — the fastest way to see when “enough” flips without generic cost-of-living tables.",
    },
  ],
  [
    KEY("salary", "how-much-salary-you-need-in-pune"),
    {
      salaryEnoughSlugs: ["is-15-lpa-good-in-pune", "is-20-lpa-good-in-pune"],
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "Pune isn’t one rental market — compare ₹15L vs ₹20L with the same moderate-spend model so you can map your own lease quote.",
    },
  ],
  [
    KEY("tax", "old-vs-new-tax-regime-basics"),
    {
      salaryEnoughSlugs: ["is-18-lpa-good-in-noida", "is-15-lpa-good-in-gurgaon"],
      calculatorHref: ROUTES.oldVsNewTaxRegimeCalculator,
      calculatorLabel: "Old vs new regime calculator",
      intro:
        "Regime choice hits take-home; NCR rent hits life. Pair tax basics with two NCR “enough salary?” scenarios, then plug your gross into the side-by-side tool.",
    },
  ],
  [
    KEY("jobSwitch", "how-notice-period-buyout-works"),
    {
      salaryEnoughSlugs: ["is-20-lpa-good-in-mumbai", "is-15-lpa-good-in-chennai"],
      calculatorHref: ROUTES.noticePeriodBuyoutCalculator,
      calculatorLabel: "Notice buyout calculator",
      intro:
        "Buyouts are about cash timing — same as surviving a month when rent is due. Peek at two metro rent stories, then estimate your notice cheque.",
    },
  ],
  [
    KEY("jobSwitch", "what-is-gratuity"),
    {
      salaryEnoughSlugs: ["is-30-lpa-good-in-mumbai", "is-25-lpa-good-in-hyderabad"],
      calculatorHref: ROUTES.gratuityCalculator,
      calculatorLabel: "Gratuity calculator",
      intro:
        "Gratuity shows up late; rent shows up every month. Contextualize a long-tenure payout mindset with higher-LPA city stress tests, then model your exit line.",
    },
  ],
  [
    KEY("jobSwitch", "compare-job-offers-beyond-ctc"),
    {
      salaryEnoughSlugs: ["is-18-lpa-good-in-pune", "is-15-lpa-good-in-ahmedabad"],
      calculatorHref: ROUTES.offerComparisonCalculator,
      calculatorLabel: "Offer comparison calculator",
      intro:
        "Beyond CTC is *where* you’ll live. Contrast two city “enough?” pages, then rank offers with one consistent in-hand methodology.",
    },
  ],
]);

export function getGuideClusterLinks(hub: GuideHubId, segment: string): GuideClusterLinkSpec | undefined {
  return MAP.get(KEY(hub, segment));
}
