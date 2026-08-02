/**
 * Generates the downloadable CSV/JSON exports for the SalaryExit India
 * In-Hand Salary Model 2026 flagship report, from the same
 * lib/growth/in-hand-salary-model.ts module the report page itself uses.
 *
 * Usage: npx tsx scripts/growth/generate-in-hand-model-data.ts
 */

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { generateInHandSalaryModel } from "@/lib/growth/in-hand-salary-model";

function toCsv(model: ReturnType<typeof generateInHandSalaryModel>): string {
  const header = [
    "annual_ctc",
    "employer_cost_share_pct",
    "pf_scenario",
    "annual_gross",
    "employee_pf_annual",
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
  const outDir = path.resolve(process.cwd(), "public", "data");
  mkdirSync(outDir, { recursive: true });

  const csvPath = path.join(outDir, "salaryexit-in-hand-model-2026.csv");
  const jsonPath = path.join(outDir, "salaryexit-in-hand-model-2026.json");

  writeFileSync(csvPath, toCsv(model), "utf-8");
  writeFileSync(jsonPath, JSON.stringify(model, null, 2), "utf-8");

  console.log(`Wrote ${csvPath} (${model.salaryLevelRows.length} rows)`);
  console.log(`Wrote ${jsonPath}`);
  console.log(`Key findings: ${model.keyFindings.length}`);
  model.keyFindings.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
}

main();
