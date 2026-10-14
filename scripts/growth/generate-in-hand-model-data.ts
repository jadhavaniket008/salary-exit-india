/**
 * Generates the downloadable CSV/JSON exports for the SalaryExit India
 * In-Hand Salary Model 2026 flagship report, from the same
 * lib/growth/in-hand-salary-model.ts module the report page itself uses.
 *
 * Usage: npx tsx scripts/growth/generate-in-hand-model-data.ts
 */

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { grossSalaryExample } from "@/lib/content/salary-examples";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { generateInHandSalaryModel } from "@/lib/growth/in-hand-salary-model";

function toCsv(model: ReturnType<typeof generateInHandSalaryModel>): string {
  const header = [
    "annual_ctc",
    "employer_cost_share_pct",
    "pf_scenario",
    "annual_gross",
    "employee_pf_annualized_current",
    "employee_pf_fy_2026_27",
    "fy_2026_27_average_monthly_in_hand",
    "pf_model_version",
    "taxable_income_annual",
    "monthly_in_hand",
    "annual_tax_estimate",
    "in_hand_as_pct_of_ctc",
  ].join(",");

  const rows = model.salaryLevelRows.map((r) =>
    [
      r.annualCtc,
      r.employerCostSharePct,
      r.pfScenario,
      Math.round(r.annualGross),
      Math.round(r.employeePfAnnual),
      Math.round(r.employeePfFy2026Annual),
      Math.round(r.fy2026AverageMonthlyInHand),
      model.assumptions.pfModelVersion,
      Math.round(r.taxableIncomeAnnual),
      Math.round(r.monthlyInHand),
      Math.round(r.annualTaxEstimate),
      r.inHandAsPctOfCtc.toFixed(4),
    ].join(",")
  );

  return [header, ...rows].join("\n") + "\n";
}

function main(): void {
  const model = generateInHandSalaryModel();
  writeFileSync(path.resolve("lib/content/salary-example-values.json"), JSON.stringify({
    pfModelVersion: model.assumptions.pfModelVersion,
    values: Object.fromEntries(LPA_LANDING_PAGES.map(page => {
      const salary = grossSalaryExample(page.lpa);
      return [page.lpa, { net: salary.inHandMonthly, pf: salary.employeePfMonthly }];
    })),
  }, null, 2) + "\n");
  const outDir = path.resolve(process.cwd(), "public", "data");
  mkdirSync(outDir, { recursive: true });

  const csvPath = path.join(outDir, "salaryexit-in-hand-model-2026.csv");
  const jsonPath = path.join(outDir, "salaryexit-in-hand-model-2026.json");

  writeFileSync(csvPath, toCsv(model), "utf-8");
  writeFileSync(jsonPath, JSON.stringify(model, null, 2), "utf-8");

  // The five existing chart downloads use this same model, not hand-maintained rows.
  const chartDir = path.resolve(process.cwd(), "public", "growth-assets", "required-ctc-report-2026");
  mkdirSync(chartDir, { recursive: true });
  const writeCsv = (name: string, header: string, rows: (string | number)[][]) => {
    writeFileSync(path.join(chartDir, `${name}.csv`),
      [header, ...rows.map(row => row.join(","))].join("\n") + "\n", "utf-8");
  };
  const capped = model.salaryLevelRows.filter(row => row.pfScenario === "statutory-ceiling");
  writeCsv("in-hand-by-ctc", "annual_ctc,monthly_in_hand",
    capped.filter(row => row.employerCostSharePct === 0.13).map(row => [row.annualCtc, Math.round(row.monthlyInHand)]));
  writeCsv("required-ctc", "target_monthly_in_hand,required_ctc_low,required_ctc_point,required_ctc_high",
    model.requiredCtcRows.map(row => [row.targetMonthlyInHand, ...[row.requiredAnnualCtcLow, row.requiredAnnualCtcPoint, row.requiredAnnualCtcHigh].map(Math.round)]));
  writeCsv("pf-comparison", "annual_ctc,capped_pf_monthly_in_hand,full_basic_pf_monthly_in_hand,monthly_difference",
    model.pfComparisonRows.filter(row => row.employerCostSharePct === 0.13 && [1000000,1500000,2000000,2500000,3000000].includes(row.annualCtc))
      .map(row => [row.annualCtc, ...[row.cappedPfMonthlyInHand, row.fullBasicPfMonthlyInHand, row.monthlyCashDifference].map(Math.round)]));
  writeCsv("employer-cost-scenarios", "employer_cost_share_pct,monthly_in_hand",
    capped.filter(row => row.annualCtc === 2000000).map(row => [row.employerCostSharePct, Math.round(row.monthlyInHand)]));
  const waterfall = capped.find(row => row.annualCtc === 1800000 && row.employerCostSharePct === 0.13)!;
  writeCsv("waterfall", "segment,monthly_value", [
    ["Employer costs", Math.round((waterfall.annualCtc - waterfall.annualGross) / 12)],
    ["PF + PT + tax deductions", Math.round(waterfall.annualGross / 12 - waterfall.monthlyInHand)],
    ["Monthly in-hand", Math.round(waterfall.monthlyInHand)],
  ]);
  writeFileSync(path.join(chartDir, "version.json"), JSON.stringify({
    generatedAtIso: model.generatedAtIso, pfModelVersion: model.assumptions.pfModelVersion,
    projectionBasis: model.assumptions.projectionBasis,
    historicalArchive: "/growth-assets/archive-2026-07-31/",
  }, null, 2) + "\n");

  console.log(`Wrote ${csvPath} (${model.salaryLevelRows.length} rows)`);
  console.log(`Wrote ${jsonPath}`);
  console.log(`Key findings: ${model.keyFindings.length}`);
  model.keyFindings.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
}

main();
