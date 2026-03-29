import { describe, expect, it } from "vitest";
import { formatHtmlTitle, SEO_TITLE_MAX_CHARS } from "@/lib/seo/metadata";

describe("formatHtmlTitle", () => {
  it("keeps short titles under the cap with short brand suffix", () => {
    const t = formatHtmlTitle("About");
    expect(t.length).toBeLessThanOrEqual(SEO_TITLE_MAX_CHARS);
    expect(t).toContain("SalaryExit");
    expect(t).not.toContain("SalaryExit India");
  });

  it("truncates long primary titles before adding brand", () => {
    const long =
      "₹10 LPA in-hand salary — India estimate with PF & tax split and extra words that push length";
    const t = formatHtmlTitle(long);
    expect(t.length).toBeLessThanOrEqual(SEO_TITLE_MAX_CHARS);
    expect(t.endsWith("SalaryExit")).toBe(true);
  });

  it("truncates titles that already include full site name", () => {
    const long =
      "SalaryExit India — India salary, tax & exit estimates you can audit and more filler text here";
    const t = formatHtmlTitle(long);
    expect(t.length).toBeLessThanOrEqual(SEO_TITLE_MAX_CHARS);
  });
});
