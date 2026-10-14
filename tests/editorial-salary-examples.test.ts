import { describe, expect, it } from "vitest";
import { HOME_SALARY_EXAMPLE, cityBudgetExample, grossSalaryExample } from "@/lib/content/salary-examples";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { formatHtmlTitle } from "@/lib/seo/metadata";

describe("editorial salary examples", () => {
  it("corrects the homepage 15L gross example using independently worked tax", () => {
    // Taxable 14.25L: 4L*5% + 4L*10% + 2.25L*15% = 93,750; cess = 3,750.
    expect(HOME_SALARY_EXAMPLE.estimatedTotalTaxAnnual).toBe(97_500);
    expect(HOME_SALARY_EXAMPLE.inHandMonthly).toBe(113_675);
  });

  it("does not turn annual-to-monthly meaning into a take-home promise", () => {
    for (const [lpa, tax, net] of [[12, 0, 96_791.666667], [35, 631_800, 235_808.333333]]) {
      const result = grossSalaryExample(lpa);
      expect(result.grossMonthly).toBeCloseTo(lpa * 100_000 / 12, 5);
      expect(result.employeePfMonthly).toBe(3_000);
      expect(result.estimatedTotalTaxAnnual).toBe(tax);
      expect(result.inHandMonthly).toBeCloseTo(net, 4);
      const page = LPA_LANDING_PAGES.find((p) => p.lpa === lpa)!;
      expect(formatHtmlTitle(page.seo.title)).not.toMatch(/…|Exact/);
      expect(page.seo.description).toContain("before deductions");
    }
  });

  it("10L city example stays below gross and reconciles the monthly budget", () => {
    const result = cityBudgetExample(10, 16_000, 30_000);
    expect(result.inHandMonthly).toBe(80_125);
    expect(result.inHandMonthly).toBeLessThan(result.grossMonthly);
    expect(result.monthlySurplus).toBe(34_125);
  });
});
