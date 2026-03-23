import { describe, expect, it } from "vitest";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";
import { getAdjacentLpa, LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";

describe("LPA landing page scenarios", () => {
  it("each config runs through computeCtcToInHand with consistent in-hand identity", () => {
    for (const page of LPA_LANDING_PAGES) {
      const out = computeCtcToInHand(page.scenario);
      expect(Number.isFinite(out.inHandMonthly)).toBe(true);
      expect(out.inHandMonthly).toBeGreaterThan(0);
      const expected =
        out.grossMonthly -
        out.employeePfMonthly -
        out.professionalTaxMonthly -
        out.tdsMonthly;
      expect(out.inHandMonthly).toBeCloseTo(expected, 5);
    }
  });

  it("getAdjacentLpa links first and last bands without wrapping", () => {
    const first = LPA_LANDING_PAGES[0];
    const last = LPA_LANDING_PAGES[LPA_LANDING_PAGES.length - 1];
    expect(getAdjacentLpa(first.slug).prev).toBeUndefined();
    expect(getAdjacentLpa(first.slug).next?.slug).toBe(LPA_LANDING_PAGES[1].slug);
    expect(getAdjacentLpa(last.slug).next).toBeUndefined();
    expect(getAdjacentLpa(last.slug).prev?.slug).toBe(LPA_LANDING_PAGES[LPA_LANDING_PAGES.length - 2].slug);
  });
});
