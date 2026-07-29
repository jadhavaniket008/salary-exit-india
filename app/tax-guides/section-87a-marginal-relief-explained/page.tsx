import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { Section87AMarginalReliefBody } from "@/components/content/guides/Section87AMarginalReliefBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("tax", "section-87a-marginal-relief-explained")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Does marginal relief mean I never pay more tax by earning more?",
    answer:
      "No — it only guarantees that one extra rupee of income never costs you more than one extra rupee of tax, right around the ₹12,00,000 taxable-income threshold. Once your income is well above that band, normal slab tax applies with no relief at all.",
  },
  {
    question: "Is the ₹12 lakh threshold based on gross salary or taxable income?",
    answer:
      "Taxable income — gross salary minus the ₹75,000 standard deduction under the new regime. Your actual gross-salary threshold is closer to ₹12,75,000.",
  },
  {
    question: "Does SalaryExit's calculator apply marginal relief automatically?",
    answer:
      "Yes — the CTC → in-hand and salary calculators use this exact marginal-relief formula for the new regime, not a simplified rebate-or-nothing rule.",
  },
];

export default function Section87AMarginalReliefExplainedPage() {
  return (
    <GuideArticleShell
      title={meta.title}
      intro={meta.description}
      breadcrumbs={[
        { label: "Home", href: ROUTES.home },
        { label: "Tax guides", href: ROUTES.taxGuides },
        { label: meta.title, href: guideArticlePath(meta) },
      ]}
      urlPath={guideArticlePath(meta)}
      description={meta.description}
      faq={faq}
      lastUpdated="29 July 2026"
      lastUpdatedIso="2026-07-29"
    >
      <Section87AMarginalReliefBody />
    </GuideArticleShell>
  );
}
