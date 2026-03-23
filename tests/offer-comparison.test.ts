import { describe, expect, it } from "vitest";
import { compareOffers } from "@/lib/calculators/offer-comparison";

describe("compareOffers", () => {
  it("ranks by in-hand and CTC", () => {
    const out = compareOffers({
      offers: [
        { label: "A", annualCtc: 12_00_000, estimatedInHandMonthly: 70_000 },
        { label: "B", annualCtc: 14_00_000, estimatedInHandMonthly: 75_000 },
        { label: "C", annualCtc: 11_00_000, estimatedInHandMonthly: 72_000 },
      ],
    });
    expect(out.bestByInHand).toBe("B");
    expect(out.bestByCtc).toBe("B");
    const b = out.rows.find((r) => r.label === "B");
    expect(b?.rankByInHand).toBe(1);
    expect(out.warnings.some((w) => w.includes("Variable pay"))).toBe(true);
  });

  it("handles empty offers", () => {
    const out = compareOffers({ offers: [] });
    expect(out.rows.length).toBe(0);
    expect(out.warnings.some((w) => w.includes("No offers"))).toBe(true);
  });
});
