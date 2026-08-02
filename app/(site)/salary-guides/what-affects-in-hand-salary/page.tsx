import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { WhatAffectsInHandBody } from "@/components/content/guides/WhatAffectsInHandBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "what-affects-in-hand-salary")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const toc = [
  { id: "gross-definition", label: "How your employer defines \"gross\" — and why it matters" },
  { id: "pf-wage", label: "PF wage: the single most overlooked driver of monthly cash" },
  { id: "professional-tax", label: "Professional tax: small but state-specific" },
  { id: "tax-regime", label: "Tax regime and deductions: the largest swing for most people" },
  { id: "tds-smoothing", label: "TDS smoothing and why monthly payslips can confuse you" },
  { id: "timing-effects", label: "Timing effects that change one month without changing the year" },
  { id: "what-to-do", label: "What you can actually control" },
];

const faq: FaqItem[] = [
  {
    question: "What typically changes in-hand the fastest when I switch jobs?",
    answer:
      "Tax regime choice, PF wage definition, rent/HRA position, and state professional tax — plus any change in variable pay mix.",
  },
  {
    question: "Should I trust a single month's payslip as my 'true' in-hand?",
    answer:
      "Use annualization when possible. One month can include arrears, bonus accruals, or adjusted TDS.",
  },
];

export default function WhatAffectsInHandPage() {
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
      toc={toc}
      lastUpdated={GUIDE_CONTENT_AS_OF_DATE}
      lastUpdatedIso={GUIDE_CONTENT_AS_OF_ISO}
      guideCluster={{ hub: "salary", segment: "what-affects-in-hand-salary" }}
    >
      <WhatAffectsInHandBody />
    </GuideArticleShell>
  );
}
