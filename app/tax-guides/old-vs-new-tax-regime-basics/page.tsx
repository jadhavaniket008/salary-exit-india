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
      lastUpdated={GUIDE_CONTENT_AS_OF_DATE}
      lastUpdatedIso={GUIDE_CONTENT_AS_OF_ISO}
    >
      <OldVsNewRegimeBody />
    </GuideArticleShell>
  );
}
