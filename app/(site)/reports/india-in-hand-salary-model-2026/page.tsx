import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { JsonLd } from "@/components/content/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/jsonld";
import { breadcrumbJsonLd } from "@/lib/seo/structured-data";
import { ROUTES } from "@/lib/routes";
import { ENGINE_FY_LABEL, TAX_RULESET_SOURCE_LABEL } from "@/lib/config/site-freshness";
import { generateInHandSalaryModel } from "@/lib/growth/in-hand-salary-model";
import { InHandModelTable } from "@/components/growth/InHandModelTable";

const REPORT_PUBLISHED_ISO = "2026-07-31";
const REPORT_TITLE = "SalaryExit India In-Hand Salary Model 2026";

export const metadata: Metadata = buildPageMetadata(
  {
    title: `${REPORT_TITLE}: CTC to In-Hand, Modeled (FY 2026-27)`,
    description:
      "A modeled dataset showing how ₹5L-₹50L CTC converts to real monthly in-hand across employer-cost structures and PF choices, generated from SalaryExit's live FY 2026-27 engine. Free CSV/JSON download, citable methodology.",
    keywords: [
      "in-hand salary model India",
      "CTC to in-hand data",
      "salary structure India report",
      "PF ceiling vs full basic",
      "required CTC calculator data",
    ],
  },
  { canonicalPath: ROUTES.inHandSalaryModelReport }
);

export default function InHandSalaryModelReportPage() {
  const model = generateInHandSalaryModel(REPORT_PUBLISHED_ISO + "T00:00:00.000Z");

  const article = articleJsonLd({
    // Matches the visible <h1> text exactly (see the header below) — Article
    // headline must reflect the page's actual headline, not the SEO <title>.
    headline: `${REPORT_TITLE}: what CTC actually becomes`,
    description:
      "Modeled dataset: how CTC converts to monthly in-hand across employer-cost structures and PF choices, generated from SalaryExit's live tax and PF engine.",
    urlPath: ROUTES.inHandSalaryModelReport,
    datePublished: REPORT_PUBLISHED_ISO,
    dateModified: REPORT_PUBLISHED_ISO,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: ROUTES.home },
    { name: REPORT_TITLE, path: ROUTES.inHandSalaryModelReport },
  ]);

  return (
    <div>
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      <Section className="pt-10 sm:pt-16">
        <Container className="max-w-4xl space-y-14">
          <header className="space-y-4">
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
              Data report — updated {model.assumptions.financialYearLabel}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {REPORT_TITLE}: what CTC actually becomes
            </h1>
            <p className="text-lg leading-relaxed text-foreground-secondary">
              A model — not a survey — generated directly from SalaryExit&rsquo;s live salary and tax
              engine. It shows how identical CTC figures produce different monthly in-hand pay
              depending on employer-cost structure and PF choice, and what CTC range is actually
              required to reach a target take-home.
            </p>
            <p className="text-xs text-foreground-muted">
              By Aniket Jadhav, Founder, SalaryExit India · Published {REPORT_PUBLISHED_ISO} ·
              Engine: {ENGINE_FY_LABEL}
            </p>
          </header>

          <section aria-labelledby="exec-summary-heading" className="space-y-4">
            <h2 id="exec-summary-heading" className="text-xl font-semibold text-foreground">
              Executive summary
            </h2>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              This report models {model.assumptions.salaryLevelsAnnualCtc.length} CTC levels from{" "}
              ₹5L to ₹50L across {model.assumptions.employerCostShareScenarios.length} employer-cost
              structures (8%, 13%, 18% of CTC) and 2 PF-wage bases (statutory ₹15,000/month ceiling
              vs. full Basic+DA), producing {model.salaryLevelRows.length} distinct scenarios. It also
              reverse-solves the CTC range required to reach five common take-home targets: ₹50k,
              ₹75k, ₹1L, ₹1.5L, and ₹2L per month. Every number is computed live by the same engine
              that powers SalaryExit&rsquo;s public calculators — nothing here is a separately
              maintained figure.
            </p>
          </section>

          <section aria-labelledby="findings-heading" className="space-y-4">
            <h2 id="findings-heading" className="text-xl font-semibold text-foreground">
              Key findings
            </h2>
            <ul className="space-y-3">
              {model.keyFindings.map((finding, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground-secondary"
                >
                  {finding}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="table-heading" className="space-y-4">
            <h2 id="table-heading" className="text-xl font-semibold text-foreground">
              CTC to monthly in-hand, by scenario
            </h2>
            <p className="text-sm text-foreground-secondary">
              Filter by employer-cost share and PF wage basis. All {model.salaryLevelRows.length} rows
              are in the{" "}
              <a href="/data/salaryexit-in-hand-model-2026.csv" className="font-medium underline">
                CSV download
              </a>{" "}
              below.
            </p>
            <InHandModelTable
              rows={model.salaryLevelRows}
              employerCostShareScenarios={model.assumptions.employerCostShareScenarios}
            />
          </section>

          <section aria-labelledby="ctc-required-heading" className="space-y-4">
            <h2 id="ctc-required-heading" className="text-xl font-semibold text-foreground">
              CTC required for a target monthly in-hand
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-subtle text-left text-xs uppercase tracking-wide text-foreground-muted">
                    <th scope="col" className="px-4 py-3 font-medium">
                      Target monthly in-hand
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Required CTC (low, 8% employer cost)
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Required CTC (point estimate)
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Required CTC (high, 18% employer cost)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {model.requiredCtcRows.map((row) => (
                    <tr key={row.targetMonthlyInHand} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-3 font-medium text-foreground">
                        ₹{row.targetMonthlyInHand.toLocaleString("en-IN")}/mo
                      </td>
                      <td className="px-4 py-3 text-foreground-secondary tabular-nums">
                        ₹{Math.round(row.requiredAnnualCtcLow).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground tabular-nums">
                        ₹{Math.round(row.requiredAnnualCtcPoint).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-foreground-secondary tabular-nums">
                        ₹{Math.round(row.requiredAnnualCtcHigh).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-foreground-muted">
              Live version:{" "}
              <Link href={ROUTES.reverseSalaryCalculator} className="underline">
                reverse salary calculator
              </Link>{" "}
              — enter your own target and regime.
            </p>
          </section>

          <section aria-labelledby="methodology-heading" className="space-y-3">
            <h2 id="methodology-heading" className="text-xl font-semibold text-foreground">
              Methodology
            </h2>
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground-secondary">
              <li>
                Tax: {model.assumptions.regime === "new" ? "new" : "old"} regime,{" "}
                {model.assumptions.financialYearLabel} slabs as configured in SalaryExit&rsquo;s
                engine ({TAX_RULESET_SOURCE_LABEL}).
              </li>
              <li>
                Basic+DA is modeled as {Math.round(model.assumptions.basicDaShareOfGross * 100)}% of
                gross salary — the same default used by the live reverse-salary calculator.
              </li>
              <li>
                Professional tax: ₹{model.assumptions.professionalTaxAnnual.toLocaleString("en-IN")}
                /year (the calculator&rsquo;s own default), non-metro.
              </li>
              <li>
                Employer-cost share (PF + gratuity + insurance as a % of CTC): modeled at 8%, 13%,
                and 18% — gross = CTC × (1 − employer-cost share).
              </li>
              <li>
                PF: employee contribution is 12% of PF wage, either capped at the ₹15,000/month
                statutory ceiling or applied to full Basic+DA, per scenario.
              </li>
              <li>
                Required-CTC rows use SalaryExit&rsquo;s reverse-salary engine: binary search for the
                gross that produces the target in-hand, then convert to CTC across the 8%-18%
                employer-cost range.
              </li>
            </ul>
          </section>

          <section
            aria-labelledby="limitations-heading"
            className="space-y-3 rounded-2xl border border-border bg-surface-subtle p-6"
          >
            <h2 id="limitations-heading" className="text-lg font-semibold text-foreground">
              Limitations
            </h2>
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-foreground-secondary">
              <li>This is a model, not a survey of real payslips or observed employee data.</li>
              <li>Does not model variable pay, ESOPs, joining bonuses, or arrears.</li>
              <li>No surcharge modeled (relevant only above ₹50L taxable income).</li>
              <li>
                State professional tax varies (₹0-₹2,500/year); this model uses a single non-metro
                default.
              </li>
              <li>
                Basic+DA share of gross (45%) and employer-cost share (8-18%) are modeling
                assumptions, not universal constants — real offer letters vary.
              </li>
              <li>Not tax filing, payroll, or legal advice. Verify with Form 16 and a qualified CA.</li>
            </ul>
          </section>

          <section aria-labelledby="citation-heading" className="space-y-3">
            <h2 id="citation-heading" className="text-lg font-semibold text-foreground">
              Citing this report
            </h2>
            <div className="rounded-xl border border-border bg-surface p-4">
              <code className="text-sm text-foreground-secondary">
                Source: SalaryExit India In-Hand Salary Model 2026. Modelled using SalaryExit&rsquo;s{" "}
                {model.assumptions.financialYearLabel} salary and tax engine. {"salaryexit.in"}
              </code>
            </div>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              Free to cite, embed, or reference with attribution and a link back to this page. A
              lightweight, no-tracking embed of the table is available at{" "}
              <Link href={ROUTES.inHandSalaryTableEmbed} className="font-medium underline">
                {ROUTES.inHandSalaryTableEmbed}
              </Link>
              . No exclusivity or followed-link requirement — use whatever `rel` attribute your
              publication's policy requires.
            </p>
          </section>

          <section aria-labelledby="downloads-heading" className="space-y-3">
            <h2 id="downloads-heading" className="text-lg font-semibold text-foreground">
              Downloads
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href="/data/salaryexit-in-hand-model-2026.csv"
                className="inline-flex items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
              >
                Download CSV ({model.salaryLevelRows.length} rows) →
              </a>
              <a
                href="/data/salaryexit-in-hand-model-2026.json"
                className="inline-flex items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
              >
                Download JSON →
              </a>
            </div>
          </section>

          <section aria-labelledby="related-heading" className="space-y-3">
            <h2 id="related-heading" className="text-lg font-semibold text-foreground">
              Related calculators
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link
                href={ROUTES.ctcToInHandCalculator}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
              >
                CTC to in-hand calculator
              </Link>
              <Link
                href={ROUTES.reverseSalaryCalculator}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
              >
                Reverse salary calculator
              </Link>
              <Link
                href={ROUTES.epfCalculator}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
              >
                EPF calculator
              </Link>
              <Link
                href={ROUTES.methodology}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-subtle"
              >
                Methodology
              </Link>
            </div>
          </section>
        </Container>
      </Section>
    </div>
  );
}
