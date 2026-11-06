import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Regression guard for GitHub issue #9. These assertions prevent the
 * known misleading legal statements from returning to public copy.
 * They do NOT validate statutory entitlement or replace legal review.
 */
const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

const settlement = [
  read("app/(site)/final-settlement-calculator/page.tsx"),
  read("components/content/guides/FinalSettlementChecklistBody.tsx"),
  read("components/calculators/CalculatorEditorial.tsx"),
  read("app/(site)/job-switch-guides/final-settlement-checklist/page.tsx"),
].join("\n");

const gratuity = [
  read("app/(site)/gratuity-calculator/page.tsx"),
  read("components/content/guides/WhatIsGratuityBody.tsx"),
  read("components/calculators/clients/GratuityCalculatorClient.tsx"),
  read("components/calculators/CalculatorEditorial.tsx"),
].join("\n");

describe("labour-code editorial regression (issue #9)", () => {
  it("keeps wages due on separation distinct from the entire FnF statement", () => {
    expect(settlement).toContain("Code on Wages");
    expect(settlement).toContain("two working days");
    expect(settlement).toContain("gratuity");
    expect(settlement).not.toMatch(/within 30.to.60 days/i);
    expect(settlement).not.toMatch(/commonly somewhere between 7 and 45 days/i);
    expect(settlement).not.toMatch(/Payment of Wages Act and some state-specific/i);
  });

  it("does not present claimed notice recovery as automatically valid", () => {
    expect(settlement).toMatch(/claimed|proposed/i);
    expect(settlement).toMatch(/section 18|authorised/i);
  });

  it("uses current code and acknowledges gratuity wage add-back and exceptions", () => {
    expect(gratuity).toContain("Code on Social Security");
    expect(gratuity).toMatch(/50%|50 percent/);
    expect(gratuity).toMatch(/fixed-term/i);
    expect(gratuity).not.toMatch(/governed by the Payment of Gratuity Act, 1972/i);
    expect(gratuity).not.toMatch(/Basic \+ DA only —/i);
  });

  it("states that final settlement tool sums entered entries, not legal entitlements", () => {
    const page = read("app/(site)/final-settlement-calculator/page.tsx");
    expect(page).toContain("only adds the credit amounts you enter");
    expect(page).toContain("does not establish entitlements");
    expect(page).toContain("₹90,000");
    expect(page).toContain("₹70,000");
  });

  it("does not reintroduce historical code as governing law on About page", () => {
    const about = read("app/(site)/about/page.tsx");
    expect(about).toContain("Code on Social Security, 2020");
    expect(about).not.toContain("Gratuity calculations follow\n        the Payment of Gratuity Act, 1972");
  });
});
