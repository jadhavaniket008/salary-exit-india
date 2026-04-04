import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { HowRentChangesSavingsBody } from "@/components/content/guides/HowRentChangesSavingsBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "how-rent-changes-your-monthly-savings")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Does a ₹10,000 rent increase wipe out a ₹10,000 gross increase?",
    answer:
      "Often worse than that — gross increases are taxed; rent is usually paid from post-tax cash. Model both in the Salary Reality Check.",
  },
  {
    question: "Where do EMIs fit in?",
    answer:
      "Treat them like rent: fixed post-tax outflows. The calculator does not itemize loans — subtract EMIs from modeled savings mentally.",
  },
];

export default function HowRentChangesMonthlySavingsPage() {
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
      guideCluster={{ hub: "salary", segment: "how-rent-changes-your-monthly-savings" }}
    >
      <HowRentChangesSavingsBody />
    </GuideArticleShell>
  );
}
