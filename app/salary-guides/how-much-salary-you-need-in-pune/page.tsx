import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { HowMuchSalaryPuneBody } from "@/components/content/guides/HowMuchSalaryPuneBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "how-much-salary-you-need-in-pune")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Is Pune cheaper than Bangalore for the same salary?",
    answer:
      "Often on rent, but not always in your micro-market. Compare scenario pages at similar gross or use the calculator with two rent inputs.",
  },
  {
    question: "Is ₹18 LPA enough in Pune for a family?",
    answer:
      "Depends on school fees, rent, and second income. Open the family and non-family Pune pages and match tier to your spend.",
  },
];

export default function HowMuchSalaryPunePage() {
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
      guideCluster={{ hub: "salary", segment: "how-much-salary-you-need-in-pune" }}
    >
      <HowMuchSalaryPuneBody />
    </GuideArticleShell>
  );
}
