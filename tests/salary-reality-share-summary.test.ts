import { describe, expect, it } from "vitest";
import {
  buildSalaryRealityShareText,
  formatAnnualCtcCompact,
  formatMonthlyMoneyCompact,
  formatSalaryRealityShareSummaryOneLine,
} from "@/lib/share/salary-reality-share-summary";

describe("formatSalaryRealityShareSummaryOneLine", () => {
  it("matches compact L / k style", () => {
    const line = formatSalaryRealityShareSummaryOneLine({
      annualCtc: 20_00_000,
      inHandMonthly: 1_25_000,
      monthlySavings: 52_000,
    });
    expect(line).toContain("₹20L");
    expect(line).toContain("₹1.25L");
    expect(line).toContain("₹52k");
    expect(line).toContain("CTC →");
    expect(line).toContain("in-hand →");
    expect(line).toContain("savings/month");
  });

  it("handles crore CTC", () => {
    const line = formatSalaryRealityShareSummaryOneLine({
      annualCtc: 45_00_000,
      inHandMonthly: 2_10_000,
      monthlySavings: 40_000,
    });
    expect(line).toContain("₹45L");
  });

  it("handles negative savings", () => {
    const line = formatSalaryRealityShareSummaryOneLine({
      annualCtc: 6_00_000,
      inHandMonthly: 45_000,
      monthlySavings: -12_000,
    });
    expect(line).toMatch(/-₹12k|−₹12k/);
  });
});

describe("buildSalaryRealityShareText", () => {
  it("includes brand, takeaway, disclaimer, and URL", () => {
    const t = buildSalaryRealityShareText({
      oneLine: "₹10L CTC → ₹65k in-hand → ₹5k savings/month",
      verdictTitle: "Balanced but limited growth",
      pageUrl: "https://example.com/salary-reality-check",
    });
    expect(t).toContain("Salary Reality Check");
    expect(t).toContain("SalaryExit India");
    expect(t).toContain("Takeaway: Balanced but limited growth");
    expect(t).toContain("Estimates only");
    expect(t).toContain("https://example.com/salary-reality-check");
  });
});

describe("formatAnnualCtcCompact", () => {
  it("uses Cr above 1 crore", () => {
    expect(formatAnnualCtcCompact(1_25_00_000)).toContain("Cr");
  });
});

describe("formatMonthlyMoneyCompact", () => {
  it("uses k below 1L", () => {
    expect(formatMonthlyMoneyCompact(52_000)).toBe("₹52k");
  });
});
