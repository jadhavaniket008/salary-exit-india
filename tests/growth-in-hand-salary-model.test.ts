import { describe, expect, it } from "vitest";
import { generateInHandSalaryModel, MODEL_ASSUMPTIONS } from "@/lib/growth/in-hand-salary-model";

describe("generateInHandSalaryModel", () => {
  const model = generateInHandSalaryModel("2026-07-31T00:00:00.000Z");

  it("produces one row per CTC level x employer-cost scenario x PF scenario", () => {
    const expectedRows =
      MODEL_ASSUMPTIONS.salaryLevelsAnnualCtc.length *
      MODEL_ASSUMPTIONS.employerCostShareScenarios.length *
      2; // PF scenarios
    expect(model.salaryLevelRows.length).toBe(expectedRows);
  });

  it("computes taxable income as gross minus the new-regime standard deduction", () => {
    const row = model.salaryLevelRows.find(
      (r) => r.annualCtc === 12_00_000 && r.employerCostSharePct === 0.13 && r.pfScenario === "statutory-ceiling"
    );
    expect(row).toBeDefined();
    // gross = 1200000 * (1 - 0.13) = 1044000; taxable = 1044000 - 75000 = 969000
    expect(row!.annualGross).toBeCloseTo(10_44_000, 0);
    expect(row!.taxableIncomeAnnual).toBeCloseTo(9_69_000, 0);
  });

  it("charges zero tax below the ₹12L new-regime taxable-income threshold", () => {
    const row = model.salaryLevelRows.find(
      (r) => r.annualCtc === 12_00_000 && r.employerCostSharePct === 0.13 && r.pfScenario === "statutory-ceiling"
    );
    expect(row!.taxableIncomeAnnual).toBeLessThan(12_00_000);
    expect(row!.annualTaxEstimate).toBe(0);
  });

  it("charges nonzero tax once taxable income crosses ₹12L (marginal relief zone, not zero tax)", () => {
    const row = model.salaryLevelRows.find(
      (r) => r.annualCtc === 15_00_000 && r.employerCostSharePct === 0.13 && r.pfScenario === "statutory-ceiling"
    );
    // gross = 1500000 * 0.87 = 1305000; taxable = 1305000 - 75000 = 1230000
    expect(row!.taxableIncomeAnnual).toBeCloseTo(12_30_000, 0);
    // Inside the 100%-marginal-rate zone: tax after rebate = taxable - 1200000, plus 4% cess.
    // 30000 * 1.04 = 31200.
    expect(row!.annualTaxEstimate).toBeCloseTo(31_200, 0);
  });

  it("does not assert Section 87A relief IS a cliff — only that it is explicitly not one", () => {
    const combined = model.keyFindings.join(" ").toLowerCase();
    // The corrected finding explicitly says "not a hard cliff" (a negation) —
    // asserting a bare "rebate cliff" or "tax cliff" claim would be the
    // regression this test guards against.
    expect(combined).not.toContain("rebate cliff");
    expect(combined).not.toContain("tax cliff");
    expect(combined).toContain("not a hard cliff");
  });

  it("states the 100%-marginal-rate zone with the correct width and bounds", () => {
    const zoneFinding = model.keyFindings.find((f) => f.includes("marginal relief"));
    expect(zoneFinding).toBeDefined();
    expect(zoneFinding).toContain("₹12,00,000");
    // Zone should be roughly ₹70,588 wide (verified independently against
    // lib/calculators/income-tax.ts — see docs/growth/report-claim-audit.md).
    expect(zoneFinding).toMatch(/₹70,58[5-9]/);
  });

  it("distinguishes income tax before cess (100%) from total tax including cess (104%) in the marginal-relief finding", () => {
    const zoneFinding = model.keyFindings.find((f) => f.includes("marginal relief"));
    expect(zoneFinding).toBeDefined();
    expect(zoneFinding).toContain("before cess");
    expect(zoneFinding).toContain("100% marginal rate on income tax alone");
    expect(zoneFinding).toContain("104%");
    expect(zoneFinding).toContain("cess");
    // Must not claim a flat, unqualified 100% on TOTAL tax liability.
    expect(zoneFinding).not.toMatch(/marginal rate on total tax.*100%/i);
  });

  it("never states an unqualified 100% marginal rate without the before/after-cess distinction anywhere in the findings", () => {
    for (const finding of model.keyFindings) {
      if (finding.includes("100%")) {
        expect(finding).toContain("before cess");
      }
    }
  });

  it("keeps the CTC-vs-taxable-income finding on separate, explicit bases", () => {
    const ctcFinding = model.keyFindings.find((f) => f.includes("₹12L to ₹15L CTC"));
    expect(ctcFinding).toBeDefined();
    expect(ctcFinding).toContain("different bases");
    expect(ctcFinding).toContain("₹9,69,000");
    expect(ctcFinding).toContain("₹12,30,000");
  });

  it("never emits the double-FY-label typo", () => {
    const combined = model.keyFindings.join(" ");
    expect(combined).not.toContain("FY FY");
  });

  it("PF-scenario finding matches the actual capped-vs-full-basic difference at ₹20L/13%", () => {
    const row = model.pfComparisonRows.find((r) => r.annualCtc === 20_00_000 && r.employerCostSharePct === 0.13);
    expect(row).toBeDefined();
    const pfFinding = model.keyFindings.find((f) => f.includes("₹20L CTC"));
    expect(pfFinding).toBeDefined();
    const expectedMonthly = Math.round(Math.abs(row!.monthlyCashDifference)).toLocaleString("en-IN");
    expect(pfFinding).toContain(expectedMonthly);
  });

  it("required-CTC rows are monotonically increasing with target in-hand", () => {
    const sorted = [...model.requiredCtcRows].sort((a, b) => a.targetMonthlyInHand - b.targetMonthlyInHand);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].requiredAnnualCtcPoint).toBeGreaterThan(sorted[i - 1].requiredAnnualCtcPoint);
    }
  });

  it("required-CTC low/high bounds bracket the point estimate", () => {
    for (const row of model.requiredCtcRows) {
      expect(row.requiredAnnualCtcLow).toBeLessThanOrEqual(row.requiredAnnualCtcPoint);
      expect(row.requiredAnnualCtcPoint).toBeLessThanOrEqual(row.requiredAnnualCtcHigh);
    }
  });

  it("financial year label matches the site's configured default (no stale/hardcoded FY string)", () => {
    expect(model.assumptions.financialYearLabel).toBe("Financial Year 2026-27 (AY 2027-28)");
  });
});
