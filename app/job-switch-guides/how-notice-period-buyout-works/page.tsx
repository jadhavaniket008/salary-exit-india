import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { NoticeBuyoutBody } from "@/components/content/guides/NoticeBuyoutBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("jobSwitch", "how-notice-period-buyout-works")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const toc = [
  { id: "what-it-tries", label: "What a notice buyout is trying to do" },
  { id: "per-day-calculation", label: "The per-day salary problem: where most disputes start" },
  { id: "worked-example", label: "A worked example: 45 days short on 90-day notice" },
  { id: "gross-vs-net", label: "Gross vs net: how buyout is processed through payroll" },
  { id: "what-you-can-negotiate", label: "What employees actually negotiate" },
  { id: "new-employer-paying", label: "When the new employer offers to pay the buyout" },
  { id: "legal-reality", label: "What happens if you just leave without paying" },
];

const faq: FaqItem[] = [
  {
    question: "Is buyout always calculated on gross salary?",
    answer:
      "Not always. Contracts vary — some use basic only, others use gross. Read your offer letter and HR policy.",
  },
  {
    question: "Can buyout be negotiated?",
    answer:
      "Sometimes. It depends on company policy, notice overlap, and whether leave or other offsets apply.",
  },
];

export default function NoticeBuyoutGuidePage() {
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
      toc={toc}
      lastUpdated={GUIDE_CONTENT_AS_OF_DATE}
      lastUpdatedIso={GUIDE_CONTENT_AS_OF_ISO}
      guideCluster={{ hub: "jobSwitch", segment: "how-notice-period-buyout-works" }}
    >
      <NoticeBuyoutBody />
    </GuideArticleShell>
  );
}
