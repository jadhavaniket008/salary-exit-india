import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { FinalSettlementChecklistBody } from "@/components/content/guides/FinalSettlementChecklistBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("jobSwitch", "final-settlement-checklist")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "How long does a full and final settlement take in India?",
    answer:
      "It varies by state — several states mandate somewhere between 7 and 45 days from your last working day under their Shops and Establishments Act rules. Check your company's HR policy for their committed timeline.",
  },
  {
    question: "Should I sign the no-dues certificate before checking the settlement amount?",
    answer:
      "No. Cross-check leave balance, gratuity eligibility, notice buyout math, and pending reimbursements against your own records first — disputing line items becomes much harder once you've signed.",
  },
  {
    question: "Does SalaryExit process or verify final settlements?",
    answer:
      "No. SalaryExit provides educational calculators only — your employer's HR and payroll team processes the actual settlement.",
  },
];

export default function FinalSettlementChecklistPage() {
  return (
    <GuideArticleShell
      title={meta.title}
      intro={meta.description}
      breadcrumbs={[
        { label: "Home", href: ROUTES.home },
        { label: "Job switch & exit guides", href: ROUTES.jobSwitchGuides },
        { label: meta.title, href: guideArticlePath(meta) },
      ]}
      urlPath={guideArticlePath(meta)}
      description={meta.description}
      faq={faq}
      lastUpdated="20 July 2026"
      lastUpdatedIso="2026-07-20"
      guideCluster={{ hub: "jobSwitch", segment: "final-settlement-checklist" }}
    >
      <FinalSettlementChecklistBody />
    </GuideArticleShell>
  );
}
