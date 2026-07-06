import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { FormSixteenBody } from "@/components/content/guides/FormSixteenBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("tax", "how-to-read-form-16")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Why doesn't my Form 16 gross salary match my payslip total?",
    answer:
      "Small gaps usually come from timing (a bonus paid in a different month than accrued) or perquisite valuation (ESOPs, rent-free accommodation) that payroll adds only at year-end reconciliation, not on every monthly payslip.",
  },
  {
    question: "Can I file my return if I haven't received Form 16 yet?",
    answer:
      "Yes. Form 26AS and the Annual Information Statement (AIS) on the income tax e-filing portal show the same TDS figures and can be used to file — though Form 16 makes verifying claimed exemptions easier.",
  },
  {
    question: "Does SalaryExit provide tax filing services?",
    answer:
      "No. SalaryExit provides educational estimates and calculators — not filing advice, Form 16 generation, or CA certification.",
  },
];

export default function HowToReadFormSixteenPage() {
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
      lastUpdated="6 July 2026"
      lastUpdatedIso="2026-07-06"
      guideCluster={{ hub: "tax", segment: "how-to-read-form-16" }}
    >
      <FormSixteenBody />
    </GuideArticleShell>
  );
}
