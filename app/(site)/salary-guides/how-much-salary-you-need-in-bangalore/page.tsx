import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { HowMuchSalaryBangaloreBody } from "@/components/content/guides/HowMuchSalaryBangaloreBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "how-much-salary-you-need-in-bangalore")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const toc = [
  { id: "ctc-to-inhand-first", label: "Always translate CTC to monthly in-hand first" },
  { id: "rent-corridors", label: "Bangalore's rent corridors: the same LPA feels different by location" },
  { id: "at-10-lpa", label: "What ₹10 LPA looks like in Bangalore" },
  { id: "at-15-lpa", label: "What ₹15 LPA looks like in Bangalore" },
  { id: "at-20-lpa", label: "What ₹20 LPA looks like in Bangalore" },
  { id: "commute-factor", label: "The commute factor: Bangalore's hidden cost" },
  { id: "comparing-cities", label: "Comparing Bangalore to other cities" },
];

const faq: FaqItem[] = [
  {
    question: "What is a good salary for a software engineer in Bangalore?",
    answer:
      "There is no single answer — rent and tax regime dominate. Use the city scenario pages for your band and edit rent to your listing.",
  },
  {
    question: "Is ₹15 LPA enough in Bangalore?",
    answer:
      "See our dedicated page with a transparent rent anchor and embedded calculator — then replace the rent with your quote.",
  },
];

export default function HowMuchSalaryBangalorePage() {
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
      guideCluster={{ hub: "salary", segment: "how-much-salary-you-need-in-bangalore" }}
    >
      <HowMuchSalaryBangaloreBody />
    </GuideArticleShell>
  );
}
