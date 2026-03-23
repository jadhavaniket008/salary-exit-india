import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { SalaryStructureIndiaBody } from "@/components/content/guides/SalaryStructureIndiaBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "salary-structure-in-india")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Is CTC always higher than gross salary?",
    answer:
      "Often, because CTC may include employer-side costs. Gross for payroll/tax can be lower depending on definitions.",
  },
  {
    question: "Why do two people with the same CTC have different in-hand pay?",
    answer:
      "PF wage, tax regime, rent/HRA proofs, state professional tax, and variable pay timing can all differ.",
  },
];

export default function SalaryStructureIndiaPage() {
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
      lastUpdated={GUIDE_CONTENT_AS_OF_DATE}
      lastUpdatedIso={GUIDE_CONTENT_AS_OF_ISO}
    >
      <SalaryStructureIndiaBody />
    </GuideArticleShell>
  );
}
