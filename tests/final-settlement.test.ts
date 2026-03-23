import { describe, expect, it } from "vitest";
import { computeFinalSettlement } from "@/lib/calculators/final-settlement";

describe("computeFinalSettlement", () => {
  it("sums credits and subtracts deductions", () => {
    const out = computeFinalSettlement({
      lines: [
        { label: "Leave", amount: 50_000 },
        { label: "Bonus", amount: 20_000 },
      ],
      deductions: [{ label: "Loan", amount: 10_000 }],
    });
    expect(out.grossCredits).toBe(70_000);
    expect(out.totalDeductions).toBe(10_000);
    expect(out.netSettlement).toBe(60_000);
  });

  it("clamps negative line amounts to 0", () => {
    const out = computeFinalSettlement({
      lines: [{ label: "A", amount: -5_000 }],
    });
    expect(out.grossCredits).toBe(0);
  });

  it("handles empty deductions", () => {
    const out = computeFinalSettlement({
      lines: [{ label: "A", amount: 100 }],
    });
    expect(out.totalDeductions).toBe(0);
    expect(out.netSettlement).toBe(100);
  });
});
