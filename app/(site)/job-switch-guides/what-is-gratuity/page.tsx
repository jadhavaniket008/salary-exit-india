import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { WhatIsGratuityBody } from "@/components/content/guides/WhatIsGratuityBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("jobSwitch", "what-is-gratuity")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Is gratuity paid automatically on exit?",
    answer:
      "If eligible under policy/law, it is typically part of full & final — but timelines and documentation vary by employer.",
  },
  {
    question: "Is gratuity always tax-free?",
    answer:
      "Not always. Exemptions depend on employer type, coverage, and statutory limits. Use estimates as planning inputs, not filing positions.",
  },
];

export default function WhatIsGratuityGuidePage() {
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
      guideCluster={{ hub: "jobSwitch", segment: "what-is-gratuity" }}
    >
      <WhatIsGratuityBody />
    </GuideArticleShell>
  );
}
