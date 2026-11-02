import { describe, expect, it } from "vitest";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";
import { getAdjacentLpa, LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { resolveSalaryExamplePrefill, LPA_12_GROSS_EXAMPLE_HREF } from "@/lib/growth/lpa12-entry";

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

describe("LPA editorial claims ↔ scenario contract (November 2026 corrections)", () => {
  function band(lpa: number) {
    const page = LPA_LANDING_PAGES.find((p) => p.lpa === lpa);
    expect(page).toBeDefined();
    return page!;
  }

  it("8 LPA distinguishes current capped PF from uncapped full-Basic PF", () => {
    const page = band(8);
    const output = computeCtcToInHand(page.scenario);
    expect(page.scenario.annualGrossSalary).toBe(800_000);
    expect(output.employeePfMonthly).toBe(3_000);
    expect(0.12 * (800_000 * 0.45 / 12)).toBe(3_600);
    expect(page.realityCheckParagraphs?.join(" ")).toContain("₹3,600/month");
    expect(page.realityCheckParagraphs?.join(" ")).toContain("without applying that cap");
    expect(page.realityCheckParagraphs?.join(" ")).not.toContain("₹3,600–4,000/month");
    expect(page.bandInsights.join(" ")).not.toContain("old regime may win");
  });

  it("12 LPA does not suggest old-regime deductions improve on zero tax", () => {
    const page = band(12);
    const output = computeCtcToInHand(page.scenario);
    expect(output.estimatedTotalTaxAnnual).toBe(0);
    expect(page.realityCheckParagraphs?.join(" ")).toContain("old regime cannot beat zero tax");
    expect(page.bandInsights.join(" ")).not.toContain("old regime may win");
    expect(page.realityCheckParagraphs?.join(" ")).toContain("if uncapped");
  });

  it("15 LPA says tax is on total taxable income and matches the live engine", () => {
    const page = band(15);
    const output = computeCtcToInHand(page.scenario);
    expect(output.estimatedTotalTaxAnnual).toBe(97_500);
    expect(output.tdsMonthly).toBe(8_125);
    expect(page.realityCheckParagraphs?.join(" ")).toContain("₹14.25L taxable income");
    expect(page.realityCheckParagraphs?.join(" ")).toContain("₹97,500/year");
    expect(page.faq?.[0].answer).toContain("not a tax charged only on the portion above ₹12L");
    expect(page.faq?.[0].answer).not.toContain("income above ₹12L becomes taxable");
  });

  it("20 LPA uses 14% employer NPS deduction and correct uncapped PF arithmetic", () => {
    const page = band(20);
    const output = computeCtcToInHand(page.scenario);
    expect(output.employeePfMonthly).toBe(3_000);
    expect(0.12 * (2_000_000 * 0.4 / 12)).toBeCloseTo(8_000);
    expect(0.12 * (2_000_000 * 0.3 / 12)).toBe(6_000);
    expect(page.realityCheckParagraphs?.join(" ")).toContain("₹8,000/month");
    expect(page.realityCheckParagraphs?.join(" ")).toContain("₹6,000/month");
    expect(page.realityCheckParagraphs?.join(" ")).not.toContain("₹7,200/month");
    const npsAnswer = page.faq?.find((f) => f.question.includes("NPS contribution"))?.answer ?? "";
    expect(npsAnswer).toContain("80CCD(2)");
    expect(npsAnswer).toContain("14% of salary");
    expect(npsAnswer).not.toContain("10% of Basic+DA");
  });
});

describe("12 LPA high-impression search intent entry", () => {
  it("answers LPA meaning accurately without conflating gross and CTC", () => {
    const p = LPA_LANDING_PAGES.find((p) => p.lpa === 12)!;
    const result = computeCtcToInHand(p.scenario);
    expect(p.seo.title).toContain("₹1 Lakh/Month Before Deductions");
    expect(p.seo.description).toContain("CTC can differ");
    expect(result.grossMonthly).toBe(100_000);
    expect(Math.round(result.inHandMonthly)).toBe(96_792);
  });
  it("only accepts the explicit gross example key and preserves 45% Basic+DA", () => {
    expect(LPA_12_GROSS_EXAMPLE_HREF).toContain("?example=12l-gross");
    expect(resolveSalaryExamplePrefill("12l-gross")).toEqual({
      annualGross: "1200000", annualBasicDa: "540000",
    });
    expect(resolveSalaryExamplePrefill("1200000")).toBeNull();
    expect(resolveSalaryExamplePrefill(["12l-gross"])).toBeNull();
    expect(resolveSalaryExamplePrefill(undefined)).toBeNull();
  });
});
