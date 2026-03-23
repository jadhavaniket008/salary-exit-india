import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, legalBreadcrumbs } from "@/components/legal/LegalPageLayout";
import { FreshnessBadges } from "@/components/trust/FreshnessBadges";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ENGINE_FY_LABEL, SITE_CONTENT_LAST_UPDATED } from "@/lib/config/site-freshness";
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
      intro="SalaryExit uses a single TypeScript calculation layer (lib/calculators) with tests. This page explains what is exact arithmetic, what is modeled, and what is out of scope — not legal or tax filing advice."
      breadcrumbs={legalBreadcrumbs("Methodology", ROUTES.methodology)}
    >
      <FreshnessBadges className="mb-4" />

      <h2>Financial year and tax engine</h2>
      <p>
        Income tax slabs, standard deductions, and simplified Section 87A rebates follow the configured financial year
        ({ENGINE_FY_LABEL}). Values are defined in code and should be reviewed after each Union Budget.{" "}
        <strong>Surcharge</strong> and <strong>marginal relief</strong> are not modeled.
      </p>

      <h2>What is “exact” in math terms</h2>
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
          <strong>Section 87A</strong> — implemented as a simplified model; verify against the Finance Act for your AY.
        </li>
        <li>
          <strong>Bonus, arrears, perquisites, stock</strong> — not modeled unless you fold them into gross consistently.
        </li>
        <li>
          <strong>PF</strong> — employee contribution is rate × PF wage (with optional ceiling); employer EPS/EDLI splits are not shown.
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
        In the project repository, see <code className="text-xs">lib/calculators/FORMULAS.md</code> and{" "}
        <code className="text-xs">docs/FORMULA_AUDIT.md</code> for a calculator-by-calculator audit (exact vs estimated).
      </p>

      <h2>Updates</h2>
      <p>
        Content and methodology copy last reviewed: <strong>{SITE_CONTENT_LAST_UPDATED}</strong>. Engine FY label:{" "}
        <strong>{ENGINE_FY_LABEL}</strong>.
      </p>

      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
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
