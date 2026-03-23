import { describe, expect, it } from "vitest";
import { LPA_LANDING_PAGES } from "@/lib/content/lpa-pages.config";
import { SALARY_ENOUGH_PAGES } from "@/lib/content/salary-enough-pages.config";
import {
  getLandingRouteInventory,
  hasDuplicateIntentSlugs,
} from "@/lib/content/landing-routes-inventory";
import { lpaLandingPath, salaryEnoughPath } from "@/lib/routes/landing-routes";

describe("landing route QA", () => {
  it("has no duplicate slugs within LPA config", () => {
    const slugs = LPA_LANDING_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no duplicate slugs within salary-enough config", () => {
    const slugs = SALARY_ENOUGH_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no overlapping slug between LPA and salary-enough (redirect collision)", () => {
    expect(hasDuplicateIntentSlugs()).toBe(false);
  });

  it("canonical paths match lpaLandingPath / salaryEnoughPath helpers", () => {
    const inv = getLandingRouteInventory();
    for (const e of inv.lpa) {
      expect(e.canonicalPath).toBe(lpaLandingPath(e.slug));
    }
    for (const e of inv.salaryEnough) {
      expect(e.canonicalPath).toBe(salaryEnoughPath(e.slug));
    }
  });

  it("legacy redirect sources are one-hop to canonical destinations", () => {
    const inv = getLandingRouteInventory();
    for (const { source, destination } of inv.legacySources) {
      expect(source.startsWith("/")).toBe(true);
      expect(destination.startsWith("/lpa/") || destination.startsWith("/salary-enough/")).toBe(true);
      expect(destination).not.toContain("//");
    }
    expect(inv.legacySources.length).toBe(LPA_LANDING_PAGES.length + SALARY_ENOUGH_PAGES.length);
  });
});
