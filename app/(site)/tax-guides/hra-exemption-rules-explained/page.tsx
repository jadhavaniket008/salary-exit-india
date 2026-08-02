import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { HraExemptionRulesBody } from "@/components/content/guides/HraExemptionRulesBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import { getGuideArticleByHubSegment, guideArticlePath } from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("tax", "hra-exemption-rules-explained")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const faq: FaqItem[] = [
  {
    question: "Can I claim HRA exemption under the new tax regime?",
    answer:
      "No. Section 10(13A) HRA exemption is only available under the old regime. Under the new regime, your HRA allowance is fully taxable regardless of rent paid.",
  },
  {
    question: "Is Bangalore or Pune considered a metro for the HRA formula?",
    answer:
      "No — only Mumbai, Delhi, Kolkata, and Chennai get the 50%-of-salary metro rate. Bangalore, Pune, Hyderabad, and Gurgaon fall under the 40% non-metro rate despite being major cities.",
  },
  {
    question: "Does SalaryExit verify HRA claims or file tax returns?",
    answer:
      "No. SalaryExit provides educational estimates and calculators only — not tax filing, verification, or CA services.",
  },
];

export default function HraExemptionRulesExplainedPage() {
  return (
    <GuideArticleShell
      title={meta.title}
      intro={meta.description}
      breadcrumbs={[
        { label: "Home", href: ROUTES.home },
        { label: "Tax guides", href: ROUTES.taxGuides },
        { label: meta.title, href: guideArticlePath(meta) },
      ]}
      urlPath={guideArticlePath(meta)}
      description={meta.description}
      faq={faq}
      lastUpdated="20 July 2026"
      lastUpdatedIso="2026-07-20"
      guideCluster={{ hub: "tax", segment: "hra-exemption-rules-explained" }}
    >
      <HraExemptionRulesBody />
    </GuideArticleShell>
  );
}
