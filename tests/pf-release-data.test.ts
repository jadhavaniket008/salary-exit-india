import values from "@/lib/content/salary-example-values.json";
import { grossSalaryExample } from "@/lib/content/salary-examples";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { generateInHandSalaryModel } from "@/lib/growth/in-hand-salary-model";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";

const current = generateInHandSalaryModel();
const july = JSON.parse(readFileSync("public/data/salaryexit-in-hand-model-2026-07-31.json", "utf8")) as typeof current;

describe("PF release data and historical boundary", () => {
  it("keeps generated LPA editorial amounts aligned with the PF engine", () => {
    for (const [lpa, value] of Object.entries(values.values)) {
      const salary = grossSalaryExample(Number(lpa));
      expect(value.net).toBe(salary.inHandMonthly);
      expect(value.pf).toBe(salary.employeePfMonthly);
    }
  });
  it("publishes exactly the current model with explicit rule and projection versions", () => {
    expect(JSON.parse(readFileSync("public/data/salaryexit-in-hand-model-2026.json", "utf8"))).toEqual(current);
    expect(current.generatedAtIso).toBe("2026-10-14T00:00:00.000Z");
    expect(current.assumptions.pfWageCeilingMonthly).toBe(25000);
    expect(current.assumptions.projectionBasis).toBe("current-annualized");
    expect(current.salaryLevelRows).toHaveLength(72);
  });
  it("reconciles all 72 rows independently and retains the historical July figures", () => {
    for (const row of current.salaryLevelRows) {
      const wage = row.annualGross * 0.45 / 12;
      const capped = row.pfScenario === "statutory-ceiling";
      const oldMonthly = (capped ? Math.min(wage,15000) : wage) * 0.12;
      const newMonthly = (capped ? Math.min(wage,25000) : wage) * 0.12;
      const historic = july.salaryLevelRows.find(r => r.annualCtc === row.annualCtc && r.employerCostSharePct === row.employerCostSharePct && r.pfScenario === row.pfScenario)!;
      expect(historic.employeePfAnnual).toBeCloseTo(oldMonthly * 12, 6);
      expect(row.employeePfAnnual).toBeCloseTo(newMonthly * 12, 6);
      expect(row.employeePfFy2026Annual).toBeCloseTo(oldMonthly * (5 + 16/30) + newMonthly * (6 + 14/30), 6);
      expect(historic.monthlyInHand - row.monthlyInHand).toBeCloseTo(newMonthly - oldMonthly, 6);
      expect(row.annualTaxEstimate).toBe(historic.annualTaxEstimate);
      expect(row.fy2026AverageMonthlyInHand).toBeCloseTo((row.annualGross - row.employeePfFy2026Annual - row.annualTaxEstimate - 2500) / 12, 6);
    }
  });
  it("exports current annualized and FY amounts in distinct CSV columns", () => {
    const [header,...lines] = readFileSync("public/data/salaryexit-in-hand-model-2026.csv", "utf8").trim().split("\n");
    expect(header).toContain("employee_pf_annualized_current,employee_pf_fy_2026_27,fy_2026_27_average_monthly_in_hand,pf_model_version");
    expect(lines).toHaveLength(72);
    lines.forEach((line, i) => {
      const cols = line.split(",");
      expect(Number(cols[4])).toBe(Math.round(current.salaryLevelRows[i].employeePfAnnual));
      expect(Number(cols[5])).toBe(Math.round(current.salaryLevelRows[i].employeePfFy2026Annual));
      expect(cols[7]).toBe("2026-09-17");
    });
  });
  it("selects FY averages explicitly and preserves actual PF overrides", () => {
    const input = { annualGrossSalary: 1200000, basicAndDaAnnual: 540000, professionalTaxAnnual: 2400, regime: "new" as const, metroCity: false };
    expect(computeCtcToInHand(input).inHandMonthly).toBe(96800);
    expect(computeCtcToInHand({...input, pfProjectionBasis: "fy-2026-27"}).employeePfMonthly).toBeCloseTo(29360/12, 6);
    const actual = computeCtcToInHand({...input, pfProjectionBasis: "fy-2026-27", employeePfAnnual: 42000});
    expect(actual.employeePfMonthly).toBe(3500);
    expect(actual.warnings.join(" ")).toContain("Using your supplied annual employee PF");
  });
});
