import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { LeaveEncashmentRulesBody } from "@/components/content/guides/LeaveEncashmentRulesBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("jobSwitch", "leave-encashment-rules-and-tax")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Is leave encashment fully tax-free when I resign?",
    answer:
      "Not automatically. For private-sector employees it's exempt only up to the least of four amounts (actual encashment, 10 months' average salary, cash equivalent of leave capped at 30 days/year of service, or ₹25L) — the excess is taxed as regular salary.",
  },
  {
    question: "Can I encash sick leave or casual leave?",
    answer:
      "Usually not. Only earned/privilege leave (EL/PL) is typically encashable — casual and sick leave commonly lapse with no cash value, though this is set by your company's specific policy.",
  },
  {
    question: "Does SalaryExit process leave encashment payouts?",
    answer:
      "No. SalaryExit provides educational calculators and explainers only — your employer's payroll or HR team processes the actual payout.",
  },
];

export default function LeaveEncashmentRulesAndTaxPage() {
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
      guideCluster={{ hub: "jobSwitch", segment: "leave-encashment-rules-and-tax" }}
    >
      <LeaveEncashmentRulesBody />
    </GuideArticleShell>
  );
}
