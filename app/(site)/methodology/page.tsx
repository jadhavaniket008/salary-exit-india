import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  CALCULATIONS_POLICY_SYNC_LINE,
  ENGINE_FY_LABEL,
  PF_MODEL_LAST_UPDATED,
  SITE_CONTENT_LAST_UPDATED,
} from "@/lib/config/site-freshness";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Methodology — how SalaryExit India estimates salary & tax",
    description:
      "Transparent methodology: FY assumptions, what is modeled vs excluded, PF/tax/in-hand flow, and limits — so you know when outputs are educational estimates.",
    keywords: ["salary calculator methodology", "India tax estimate assumptions", "CTC to in hand how it works"],
  },
  { canonicalPath: ROUTES.methodology }
);

export default function MethodologyPage() {
  return (
    <LegalPageLayout
      title="Methodology"
      intro="SalaryExit uses a single TypeScript calculation layer with automated tests. This page explains what is exact arithmetic, what is modeled, and what is out of scope — not legal or tax filing advice."
      breadcrumbs={legalBreadcrumbs("Methodology", ROUTES.methodology)}
    >
      <FreshnessBadges className="mb-4" />

      <h2>Financial year and tax engine</h2>
      <p>
        Income tax slabs, standard deductions, and Section 156 rebates under the Income Tax Act, 2025
        (earlier Section 87A framework), including new-regime marginal relief just above
        the rebate threshold) follow the configured financial year ({ENGINE_FY_LABEL}). Values are defined in code and
        should be reviewed after each Union Budget. <strong>Surcharge</strong> (₹50L+ taxable) and its marginal relief
        are not modeled.
      </p>
      <p className="rounded-lg border border-emerald-200/80 bg-emerald-50/70 p-3 text-sm text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-50">
        <strong className="font-semibold">Policy sync for visitors:</strong> {CALCULATIONS_POLICY_SYNC_LINE}{" "}
        Editorial methodology copy last reviewed: <strong>{SITE_CONTENT_LAST_UPDATED}</strong>. Separately, the
        employee PF wage-ceiling model was revised on <strong>{PF_MODEL_LAST_UPDATED}</strong> for the 17 September
        2026 statutory ceiling (documented PF release notes) — that date is a{" "}
        <em>model update</em>, not a claim that every page of site prose was re-reviewed then.
      </p>

      <h2>What is "exact" in math terms</h2>
      <p>
        Given the same inputs and assumptions, the engine applies the same formulas every time: slab tax, cess on tax
        after rebate, PF on wage (with optional ceiling), and simple aggregations (e.g. final settlement sums).
      </p>

      <h2>What is estimated or simplified</h2>
      <ul className="list-inside list-disc space-y-2">
        <li>
          <strong>TDS smoothing</strong> — annual tax is often spread ÷ 12 for monthly in-hand; real payslips vary by month.
        </li>
        <li>
          <strong>Section 156 rebate</strong> (earlier Section 87A) — implemented as a simplified model; verify against the Income Tax Act, 2025 / Finance Act for your tax year.
        </li>
        <li>
          <strong>Bonus, arrears, perquisites, stock</strong> — not modeled unless you fold them into gross consistently.
        </li>
        <li>
          <strong>PF</strong> — employee contribution is rate × PF wage (with optional statutory ceiling). Current
          monthly examples use the ₹25,000 ceiling effective 17 September 2026; Tax Year / FY 2026–27 totals for
          existing capped members use the documented mid-year transition. Employer EPS/EDLI splits are not shown.
        </li>
        <li>
          <strong>Professional tax</strong> — you supply a placeholder or realistic annual amount; we do not ship state-wise tables.
        </li>
        <li>
          <strong>Gratuity / leave tax</strong> — statutory formulas and rough exempt bands; final tax treatment is fact-specific.
        </li>
      </ul>

      <h2>CTC → in-hand flow (summary)</h2>
      <ol className="list-inside list-decimal space-y-2">
        <li>Derive employee PF annual from explicit PF or from Basic+DA via configured PF rules.</li>
        <li>Compute income tax + cess for the chosen regime on gross (with standard deduction and limited deductions per tool).</li>
        <li>Subtract PF, professional tax, and monthly TDS spread from monthly gross to get in-hand.</li>
      </ol>

      <h2>Where to read formula details</h2>
      <p>
        Contributors can find deeper formula notes and a calculator-by-calculator audit (exact vs estimated) in the
        project repository alongside the code. On this site, the sections above summarize what visitors should rely on.
      </p>

      <h2>Updates</h2>
      <p>
        Two dates matter, and they are not the same:{" "}
        <strong>content / methodology copy</strong> was last reviewed in{" "}
        <strong>{SITE_CONTENT_LAST_UPDATED}</strong>; the <strong>PF calculation model</strong> was last revised on{" "}
        <strong>{PF_MODEL_LAST_UPDATED}</strong> for the 17 September 2026 wage-ceiling change. Engine FY label:{" "}
        <strong>{ENGINE_FY_LABEL}</strong>. We do not backdate a full editorial review to the PF model revision date.
      </p>

      <p className="mt-6 text-sm text-foreground-secondary">
        <Link href={ROUTES.calculators} className="font-medium underline">
          Back to calculators
        </Link>{" "}
        ·{" "}
        <Link href={ROUTES.disclaimer} className="underline">
          Disclaimer
        </Link>
      </p>
    </LegalPageLayout>
  );
}
