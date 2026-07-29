/**
 * Per-article internal links for crawl depth + topical clustering (guides → salary-enough + calculator).
 *
 * Points only at the two salary-enough pages currently indexed (Mumbai ₹20L, Bangalore ₹15L) —
 * the other 23 are noindexed pending AdSense review, and linking to them from every guide article
 * exposed that entire templated cluster to any crawler via normal on-site navigation, independent
 * of their noindex status. See salary-enough-pages.config.ts's STRONG_PERFORMER_SALARY_ENOUGH_SLUGS.
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

const INDEXED_SLUGS: readonly [string, string] = [
  "is-15-lpa-good-in-bangalore",
  "is-20-lpa-good-in-mumbai",
];

const MAP = new Map<string, GuideClusterLinkSpec>([
  [
    KEY("salary", "salary-structure-in-india"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.ctcToInHandCalculator,
      calculatorLabel: "CTC → in-hand calculator",
      intro:
        "See how the same CTC line turns into cash after PF and tax, then how rent changes the *felt* salary in two real city scenarios.",
    },
  ],
  [
    KEY("salary", "what-affects-in-hand-salary"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.salaryCalculator,
      calculatorLabel: "Salary & tax breakdown",
      intro:
        "After you understand the levers (regime, PF, PT), stress-test them against real rent in Bengaluru and Mumbai, where small gross differences stop mattering next to lease size.",
    },
  ],
  [
    KEY("salary", "what-reduces-your-in-hand-salary"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.epfCalculator,
      calculatorLabel: "EPF contribution estimator",
      intro:
        "Deductions bite hardest when gross is mid-band. See two real scenarios with different rent anchors, then isolate PF math if your payslip line confuses you.",
    },
  ],
  [
    KEY("salary", "how-to-judge-if-a-salary-is-good-in-india"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "“Good salary” is a range: Bengaluru vs Mumbai, with rent and tier spelled out — use it to sanity-check your own offer against two transparent scenarios.",
    },
  ],
  [
    KEY("salary", "how-rent-changes-your-monthly-savings"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "Rent is the swing line everywhere — see a Bengaluru scenario and a Mumbai scenario side by side, both with the same savings engine.",
    },
  ],
  [
    KEY("salary", "how-much-salary-you-need-in-bangalore"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "See a worked Bengaluru scenario next to a Mumbai one — the fastest way to see when “enough” flips without generic cost-of-living tables.",
    },
  ],
  [
    KEY("salary", "how-much-salary-you-need-in-pune"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.salaryRealityCheck,
      calculatorLabel: "Salary Reality Check",
      intro:
        "Compare the same moderate-spend model against Bengaluru and Mumbai rent realities, then map your own Pune lease quote onto it.",
    },
  ],
  [
    KEY("salary", "pf-withdrawal-rules-explained"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.epfCalculator,
      calculatorLabel: "EPF contribution estimator",
      intro:
        "Withdrawal rules only matter once there's a corpus to withdraw — see how the monthly contribution builds, then stress-test two real city budgets to see where that corpus actually gets spent.",
    },
  ],
  [
    KEY("salary", "epf-wage-ceiling-capped-vs-full-basic"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.epfCalculator,
      calculatorLabel: "EPF contribution estimator",
      intro:
        "The capped-vs-full-Basic gap in monthly cash is exactly the kind of thing that decides whether a salary feels tight — see two real city scenarios that model it end to end.",
    },
  ],
  [
    KEY("salary", "reverse-salary-calculation-explained"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.reverseSalaryCalculator,
      calculatorLabel: "Reverse salary calculator",
      intro:
        "Once you have a target in-hand in mind, check it against what that actually buys in Bengaluru or Mumbai before you finalize a number to negotiate around.",
    },
  ],
  [
    KEY("tax", "how-to-read-form-16"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.salaryCalculator,
      calculatorLabel: "Salary & tax breakdown",
      intro:
        "Form 16's Part B is just your salary breakdown in a different format — rebuild the same numbers here, then check two real “enough?” scenarios for context.",
    },
  ],
  [
    KEY("tax", "hra-exemption-rules-explained"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.hraCalculator,
      calculatorLabel: "HRA exemption calculator",
      intro:
        "Metro classification changes your HRA cap, and it changes what “enough” means too — compare a Mumbai (metro) and Bengaluru (non-metro, for this rule) scenario, then run your own rent through the calculator.",
    },
  ],
  [
    KEY("jobSwitch", "leave-encashment-rules-and-tax"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.leaveEncashmentCalculator,
      calculatorLabel: "Leave encashment calculator",
      intro:
        "Leave encashment is a one-time cushion, rent is a monthly constant — see two real city scenarios for the ongoing cost, then estimate the one-time payout separately.",
    },
  ],
  [
    KEY("jobSwitch", "final-settlement-checklist"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.finalSettlementCalculator,
      calculatorLabel: "Final settlement calculator",
      intro:
        "Your settlement cheque needs to cover you until the next paycheck — see what real city life actually costs monthly, then model the full settlement you're owed.",
    },
  ],
  [
    KEY("tax", "old-vs-new-tax-regime-basics"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.oldVsNewTaxRegimeCalculator,
      calculatorLabel: "Old vs new regime calculator",
      intro:
        "Regime choice hits take-home; rent hits life. Pair tax basics with two real “enough salary?” scenarios, then plug your gross into the side-by-side tool.",
    },
  ],
  [
    KEY("tax", "section-87a-marginal-relief-explained"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.salaryCalculator,
      calculatorLabel: "Salary & tax breakdown",
      intro:
        "Marginal relief matters most right around the ₹12L threshold — see how that plays out against real monthly costs in two live city scenarios.",
    },
  ],
  [
    KEY("jobSwitch", "how-notice-period-buyout-works"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.noticePeriodBuyoutCalculator,
      calculatorLabel: "Notice buyout calculator",
      intro:
        "Buyouts are about cash timing — same as surviving a month when rent is due. See two real rent stories, then estimate your notice cheque.",
    },
  ],
  [
    KEY("jobSwitch", "what-is-gratuity"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.gratuityCalculator,
      calculatorLabel: "Gratuity calculator",
      intro:
        "Gratuity shows up late; rent shows up every month. Contextualize a long-tenure payout mindset with two real city cost stories, then model your exit line.",
    },
  ],
  [
    KEY("jobSwitch", "compare-job-offers-beyond-ctc"),
    {
      salaryEnoughSlugs: INDEXED_SLUGS,
      calculatorHref: ROUTES.offerComparisonCalculator,
      calculatorLabel: "Offer comparison calculator",
      intro:
        "Beyond CTC is *where* you'll live. Contrast two real “enough?” pages, then rank offers with one consistent in-hand methodology.",
    },
  ],
]);

export function getGuideClusterLinks(hub: GuideHubId, segment: string): GuideClusterLinkSpec | undefined {
  return MAP.get(KEY(hub, segment));
}
