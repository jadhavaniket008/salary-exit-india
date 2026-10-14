import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { EpfWageCeilingBody } from "@/components/content/guides/EpfWageCeilingBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "epf-wage-ceiling-capped-vs-full-basic")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Can I choose whether my PF is capped or uncapped?",
    answer:
      "Generally no — contribution treatment depends on the member's existing contribution arrangement and applicable EPFO scheme/rules and payroll implementation; it is not simply an arbitrary employer choice. You can ask HR which arrangement applies to you, but you typically can't switch it unilaterally.",
  },
  {
    question: "Is capped PF always better for take-home pay?",
    answer:
      "It leaves more monthly cash, yes, but it also builds a smaller EPF corpus and can reduce gratuity accrual if Basic is kept low relative to gross. It's a trade-off, not a straightforward upgrade.",
  },
  {
    question: "Does the statutory ceiling ever change?",
    answer:
      "The ceiling was ₹15,000/month from September 2014, and rose to ₹25,000/month from 17 September 2026. Current monthly examples use the new ceiling; FY 2026–27 contributions must split the periods, including prorated September.",
  },
];

export default function EpfWageCeilingPage() {
  return (
    <GuideArticleShell
      title={meta.title}
      intro={meta.description}
      breadcrumbs={[
        { label: "Home", href: ROUTES.home },
        { label: "Salary guides", href: ROUTES.salaryGuides },
        { label: meta.title, href: guideArticlePath(meta) },
      ]}
      urlPath={guideArticlePath(meta)}
      description={meta.description}
      faq={faq}
      lastUpdated="29 July 2026"
      lastUpdatedIso="2026-07-29"
    >
      <EpfWageCeilingBody />
    </GuideArticleShell>
  );
}
