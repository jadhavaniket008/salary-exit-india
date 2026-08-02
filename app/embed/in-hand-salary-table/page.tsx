import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/routes";
import { generateInHandSalaryModel } from "@/lib/growth/in-hand-salary-model";
import { InHandModelTable } from "@/components/growth/InHandModelTable";

/**
 * Lightweight, citation-oriented version of the flagship report's table for
 * third parties to reference or iframe. Noindexed (follow) so it doesn't
 * compete with the main report for search visibility — see
 * docs/growth/link-earning-offers.md, "Offer 3 — Free embed".
 *
 * Known limitation: this route still renders inside the site's normal root
 * layout (header/footer), because a true chrome-free embed would require
 * restructuring app/ into multiple Next.js root layouts — a higher-risk
 * change not made in this pass. See the final report's "Risks and
 * limitations" section.
 */
export const metadata: Metadata = {
  ...buildPageMetadata(
    {
      title: "Embed: In-Hand Salary Table (FY 2026-27) — SalaryExit",
      description:
        "Free, no-tracking embeddable table: CTC to in-hand salary across employer-cost and PF scenarios, from SalaryExit's In-Hand Salary Model 2026.",
    },
    { canonicalPath: ROUTES.inHandSalaryTableEmbed }
  ),
  // noindex but follow — matches the site's existing salary-enough-pages.config.ts
  // pattern (app/salary-enough/[slug]/page.tsx) for pages deliberately kept out of
  // search results without cutting off crawl discovery of what they link to.
  robots: { index: false, follow: true },
};

const REPORT_PUBLISHED_ISO = "2026-07-31";

export default function InHandSalaryTableEmbedPage() {
  const model = generateInHandSalaryModel(REPORT_PUBLISHED_ISO + "T00:00:00.000Z");

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-xl font-semibold text-foreground">
        In-hand salary table ({model.assumptions.financialYearLabel})
      </h1>
      <InHandModelTable
        rows={model.salaryLevelRows}
        employerCostShareScenarios={model.assumptions.employerCostShareScenarios}
      />
      <p className="text-xs text-foreground-muted">
        Source:{" "}
        <Link href={ROUTES.inHandSalaryModelReport} className="underline">
          SalaryExit India In-Hand Salary Model 2026
        </Link>{" "}
        — free to embed with attribution, no tracking beyond standard site analytics, no followed-link
        requirement.
      </p>
    </div>
  );
}
