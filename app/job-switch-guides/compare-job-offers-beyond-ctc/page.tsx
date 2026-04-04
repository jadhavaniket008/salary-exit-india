import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { CompareOffersBody } from "@/components/content/guides/CompareOffersBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("jobSwitch", "compare-job-offers-beyond-ctc")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "What is the biggest mistake when comparing offers?",
    answer:
      "Ranking on CTC alone without a consistent in-hand methodology and without evaluating variable pay risk.",
  },
  {
    question: "How do I compare offers with different cities?",
    answer:
      "Model cost of living separately. SalaryExit focuses on payroll/tax estimates — pair numbers with your personal budget.",
  },
];

export default function CompareOffersGuidePage() {
  return (
    <GuideArticleShell
      title={meta.title}
      intro={meta.description}
      breadcrumbs={[
        { label: "Home", href: ROUTES.home },
        { label: "Job switch guides", href: ROUTES.jobSwitchGuides },
        { label: meta.title, href: guideArticlePath(meta) },
      ]}
      urlPath={guideArticlePath(meta)}
      description={meta.description}
      faq={faq}
      lastUpdated={GUIDE_CONTENT_AS_OF_DATE}
      lastUpdatedIso={GUIDE_CONTENT_AS_OF_ISO}
      guideCluster={{ hub: "jobSwitch", segment: "compare-job-offers-beyond-ctc" }}
    >
      <CompareOffersBody />
    </GuideArticleShell>
  );
}
