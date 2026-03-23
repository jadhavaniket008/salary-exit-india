import { describe, expect, it } from "vitest";
import {
  SALARY_ENOUGH_PAGES,
  getAllSalaryEnoughSlugs,
  getSalaryEnoughPageConfig,
} from "@/lib/content/salary-enough-pages.config";
import { computeSalaryRealityCheck } from "@/lib/calculators/salary-reality-check";
import { DEFAULT_BASIC_DA_SHARE_OF_GROSS } from "@/lib/config/salary-reality-heuristics";

describe("salary-enough-pages.config", () => {
  it("has unique slugs", () => {
    const slugs = SALARY_ENOUGH_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every static slug", () => {
    for (const slug of getAllSalaryEnoughSlugs()) {
      const c = getSalaryEnoughPageConfig(slug);
      expect(c).toBeDefined();
      expect(c?.annualCtc).toBe(c!.lpa * 100_000);
    }
  });

  it("default scenario computes without error", () => {
    for (const p of SALARY_ENOUGH_PAGES) {
      const out = computeSalaryRealityCheck({
        annualCtc: p.annualCtc,
        monthlyRent: p.monthlyRent,
        metroCity: p.city.metro,
        lifestyle: p.lifestyle,
        regime: "new",
        basicDaShareOfGross: DEFAULT_BASIC_DA_SHARE_OF_GROSS,
      });
      expect(out.inHandMonthly).toBeGreaterThan(0);
    }
  });
});
