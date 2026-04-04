import { describe, expect, it } from "vitest";
import {
  SALARY_ENOUGH_PAGES,
  getAllSalaryEnoughSlugs,
  getRelatedSalaryEnoughPages,
  getSalaryEnoughPageConfig,
  getSalaryEnoughSpotlightForLpa,
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

  it("getRelatedSalaryEnoughPages excludes current slug and lists same city first", () => {
    const related = getRelatedSalaryEnoughPages("is-10-lpa-good-in-bangalore", 4);
    expect(related.length).toBe(4);
    expect(related.every((p) => p.slug !== "is-10-lpa-good-in-bangalore")).toBe(true);
    const bangaloreFirst = related.filter((p) => p.city.id === "bangalore");
    expect(bangaloreFirst.length).toBeGreaterThan(0);
    for (let i = 1; i < bangaloreFirst.length; i++) {
      expect(related.indexOf(bangaloreFirst[i])).toBeGreaterThan(related.indexOf(bangaloreFirst[i - 1]));
    }
    const firstNonBangalore = related.findIndex((p) => p.city.id !== "bangalore");
    if (firstNonBangalore > 0) {
      expect(related.slice(0, firstNonBangalore).every((p) => p.city.id === "bangalore")).toBe(true);
    }
  });

  it("getSalaryEnoughSpotlightForLpa orders by closest LPA", () => {
    const spotlight = getSalaryEnoughSpotlightForLpa(18, 5);
    expect(spotlight.length).toBe(5);
    const distances = spotlight.map((p) => Math.abs(p.lpa - 18));
    const sorted = [...distances].sort((a, b) => a - b);
    expect(distances).toEqual(sorted);
  });
});
