import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { JudgeSalaryGoodIndiaBody } from "@/components/content/guides/JudgeSalaryGoodIndiaBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "how-to-judge-if-a-salary-is-good-in-india")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const toc = [
  { id: "start-in-hand", label: "Step 1: Convert CTC to monthly in-hand first" },
  { id: "fixed-costs", label: "Step 2: Stack your fixed costs against in-hand" },
  { id: "savings-target", label: "Step 3: Define a savings target first, not last" },
  { id: "city-matters", label: "Step 4: Make the city completely explicit" },
  { id: "variable-pay", label: "Step 5: Price variable pay and ESOPs conservatively" },
  { id: "career-growth", label: "Step 6: Factor the career trajectory, not just current cash" },
  { id: "verdict", label: "The four-item verdict" },
];

const faq: FaqItem[] = [
  {
    question: "Is a higher CTC always better?",
    answer:
      "Not if in-hand, rent, and loan load are worse. Compare the same tax and PF assumptions for each offer, then layer city rent.",
  },
  {
    question: "Should I trust Reddit / Blind for \"good salary\" numbers?",
    answer:
      "Treat them as anecdotes. You need your rent, regime, and household costs — scenario pages and calculators beat crowdsourced LPA.",
  },
  {
    question: "Where do I start if I only know my CTC?",
    answer:
      "Estimate in-hand with the CTC → in-hand calculator, then plug rent into the Salary Reality Check.",
  },
];

export default function HowToJudgeSalaryGoodIndiaPage() {
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
      guideCluster={{ hub: "salary", segment: "how-to-judge-if-a-salary-is-good-in-india" }}
    >
      <JudgeSalaryGoodIndiaBody />
    </GuideArticleShell>
  );
}
