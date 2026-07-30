import type { Metadata } from "next";
import { GuideArticleShell } from "@/components/content/GuideArticleShell";
import { WhatReducesInHandBody } from "@/components/content/guides/WhatReducesInHandBody";
import { guideArticleMetadata } from "@/lib/content/guide-metadata";
import {
  getGuideArticleByHubSegment,
  guideArticlePath,
  GUIDE_CONTENT_AS_OF_DATE,
  GUIDE_CONTENT_AS_OF_ISO,
} from "@/lib/content/guides-registry";
import { ROUTES } from "@/lib/routes";
import type { FaqItem } from "@/types/faq";

const meta = getGuideArticleByHubSegment("salary", "what-reduces-your-in-hand-salary")!;

export const metadata: Metadata = guideArticleMetadata(meta);

const toc = [
  { id: "income-tax", label: "1. Income tax (TDS) — often the largest deduction above ₹8 LPA gross" },
  { id: "epf", label: "2. Employee PF — a forced saving, but it reduces monthly cash" },
  { id: "professional-tax", label: "3. Professional tax — state-specific, small but real" },
  { id: "health-insurance", label: "4. Employee health insurance premium — varies by employer" },
  { id: "flexible-components", label: "5. Unclaimed flexible benefit plan amounts" },
  { id: "recoveries", label: "6. One-time recoveries — joining bonus clawback, loan, advances" },
  { id: "notice-recovery", label: "7. Notice period recovery — for early exit" },
  { id: "practical", label: "What you can do about each deduction" },
];

const faq: FaqItem[] = [
  {
    question: "Why is my take-home lower than CTC ÷ 12?",
    answer:
      "CTC includes non-cash and employer costs; take-home subtracts PF, tax, PT, and other deductions. Use CTC → in-hand with explicit assumptions.",
  },
  {
    question: "Is this guide different from \"what affects in-hand salary\"?",
    answer:
      "This page is a shorter deduction-first checklist. The other guide explains interactions and timing effects in more depth.",
  },
];

export default function WhatReducesInHandSalaryPage() {
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
      guideCluster={{ hub: "salary", segment: "what-reduces-your-in-hand-salary" }}
    >
      <WhatReducesInHandBody />
    </GuideArticleShell>
  );
}
