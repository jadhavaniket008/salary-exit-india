import { describe, expect, it } from "vitest";
import { GUIDE_ARTICLES } from "@/lib/content/guides-registry";
import { getGuideClusterLinks } from "@/lib/content/guide-cluster-links";
import { getSalaryEnoughPageConfig } from "@/lib/content/salary-enough-pages.config";

describe("guide-cluster-links", () => {
  it("defines a cluster for every published guide article", () => {
    for (const a of GUIDE_ARTICLES) {
      const spec = getGuideClusterLinks(a.hub, a.segment);
      expect(spec, `${a.hub}/${a.segment}`).toBeDefined();
      expect(spec!.salaryEnoughSlugs).toHaveLength(2);
      for (const slug of spec!.salaryEnoughSlugs) {
        expect(getSalaryEnoughPageConfig(slug), slug).toBeDefined();
      }
      expect(spec!.calculatorHref.startsWith("/")).toBe(true);
      expect(spec!.calculatorLabel.length).toBeGreaterThan(3);
      expect(spec!.intro.length).toBeGreaterThan(20);
    }
  });
});
