import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { OldVsNewRegimeBody } from "@/components/content/guides/OldVsNewRegimeBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("tax", "old-vs-new-tax-regime-basics")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const toc = [
  { id: "what-the-regimes-mean", label: "What old vs new actually means" },
  { id: "when-old-wins", label: "When the old regime typically produces lower tax" },
  { id: "when-new-wins", label: "When the new regime typically produces lower tax" },
  { id: "87a-rebate", label: "The Section 87A rebate: zero tax for many at lower-mid incomes" },
  { id: "worked-example", label: "A worked example: ₹18 LPA gross" },
  { id: "telling-employer", label: "How to tell your employer your regime choice" },
  { id: "what-you-cannot-do", label: "What is not available in the new regime" },
];

const faq: FaqItem[] = [
  {
    question: "Is the new regime always better for salaried employees?",
    answer:
      "Not necessarily. It depends on your deductions, rent situation, and income composition. Compare explicitly for your numbers.",
  },
  {
    question: "Does SalaryExit provide tax filing services?",
    answer:
      "No. SalaryExit provides educational estimates and calculators — not filing advice or certification.",
  },
];

export default function OldVsNewTaxRegimeBasicsPage() {
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
      toc={toc}
      lastUpdated={GUIDE_CONTENT_AS_OF_DATE}
      lastUpdatedIso={GUIDE_CONTENT_AS_OF_ISO}
      guideCluster={{ hub: "tax", segment: "old-vs-new-tax-regime-basics" }}
    >
      <OldVsNewRegimeBody />
    </GuideArticleShell>
  );
}
