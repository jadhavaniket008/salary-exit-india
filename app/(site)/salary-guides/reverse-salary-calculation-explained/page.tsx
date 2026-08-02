import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { ReverseSalaryCalculationBody } from "@/components/content/guides/ReverseSalaryCalculationBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "reverse-salary-calculation-explained")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Why can't I just divide my target in-hand by a fixed percentage to get CTC?",
    answer:
      "Because income tax is progressive — the effective rate itself rises with income — so a fixed multiplier only works at one specific income level. A numeric search against the real tax slabs is more accurate than any single ratio.",
  },
  {
    question: "Why does the tool give a range instead of one required CTC?",
    answer:
      "Because employers vary in how much of CTC goes to employer PF, gratuity, and insurance — typically 8% to 18% of CTC. The same take-home cash can be quoted as meaningfully different CTC figures depending on that structure.",
  },
  {
    question: "Does this account for bonuses or variable pay?",
    answer:
      "No — it solves for fixed monthly in-hand only. If part of your target depends on a bonus or variable payout, the required CTC shown here is an underestimate of what you'd need to negotiate.",
  },
];

export default function ReverseSalaryCalculationExplainedPage() {
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
      lastUpdated="29 July 2026"
      lastUpdatedIso="2026-07-29"
    >
      <ReverseSalaryCalculationBody />
    </GuideArticleShell>
  );
}
