import { describe, expect, it } from "vitest";
import { shouldTrackRealityCheckUsage } from "@/lib/analytics/salary-reality-usage";

describe("Salary Reality Check usage events", () => {
  it("never counts a prefilled embed's initial automatic result as a user calculation", () => {
    expect(shouldTrackRealityCheckUsage({
      hasResult: true, alreadyTracked: false, embed: true, hasInteractedWithInputs: false,
    })).toBe(false);
  });
  it("counts a valid embedded result only after a user changed inputs", () => {
    expect(shouldTrackRealityCheckUsage({
      hasResult: true, alreadyTracked: false, embed: true, hasInteractedWithInputs: true,
    })).toBe(true);
  });
  it("still requires a valid result and fires once per mount", () => {
    expect(shouldTrackRealityCheckUsage({
      hasResult: false, alreadyTracked: false, embed: true, hasInteractedWithInputs: true,
    })).toBe(false);
    expect(shouldTrackRealityCheckUsage({
      hasResult: true, alreadyTracked: true, embed: true, hasInteractedWithInputs: true,
    })).toBe(false);
  });
  it("preserves the non-embedded calculator's valid-result behavior", () => {
    expect(shouldTrackRealityCheckUsage({
      hasResult: true, alreadyTracked: false, embed: false, hasInteractedWithInputs: false,
    })).toBe(true);
  });
});
