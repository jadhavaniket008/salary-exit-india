import { describe, expect, it } from "vitest";
import { computeEpfEstimate, EPF_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/epf";

describe("computeEpfEstimate", () => {
  it("sums employee and employer on PF wage", () => {
    const out = computeEpfEstimate(EPF_WORKED_EXAMPLE_INPUT);
    expect(out.employeeContributionMonthly).toBeCloseTo(1800, 5);
    expect(out.employerContributionMonthly).toBeCloseTo(1800, 5);
    expect(out.totalEpfMonthly).toBeCloseTo(3600, 5);
  });

  it("respects EPS ceiling override", () => {
    const out = computeEpfEstimate({
      pfWageMonthly: 50_000,
      epsWageCeilingMonthly: 15_000,
    });
    expect(out.totalEpfMonthly).toBeCloseTo(3600, 5);
  });
});
