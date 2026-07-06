import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { PfWithdrawalRulesBody } from "@/components/content/guides/PfWithdrawalRulesBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "pf-withdrawal-rules-explained")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Is PF withdrawal always tax-free?",
    answer:
      "No — only if you have completed 5 years of continuous service (which survives a transfer between employers, but resets if you withdraw and restart). Below 5 years, withdrawals of ₹50,000 or more attract 10% TDS unless an exemption applies.",
  },
  {
    question: "Should I withdraw my PF or transfer it when I switch jobs?",
    answer:
      "Transfer it, in almost all cases. Withdrawing resets your 5-year tax-free clock and your EPS pensionable service — both survive a transfer but not a withdrawal-and-rejoin.",
  },
  {
    question: "Does SalaryExit process PF withdrawal claims?",
    answer:
      "No. SalaryExit provides educational calculators and explainers only — file withdrawal or transfer claims directly through the EPFO member portal.",
  },
];

export default function PfWithdrawalRulesExplainedPage() {
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
      lastUpdated="6 July 2026"
      lastUpdatedIso="2026-07-06"
      guideCluster={{ hub: "salary", segment: "pf-withdrawal-rules-explained" }}
    >
      <PfWithdrawalRulesBody />
    </GuideArticleShell>
  );
}
