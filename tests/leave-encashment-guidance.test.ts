import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** Regression guard for issue #13: legal copy, not a tax-entitlement engine. */
const page = readFileSync(
  join(process.cwd(), "app/(site)/leave-encashment-calculator/page.tsx"),
  "utf8"
);
const editorial = readFileSync(
  join(process.cwd(), "components/calculators/CalculatorEditorial.tsx"),
  "utf8"
);

describe("leave encashment on resignation: current-site trust guard", () => {
  it("does not falsely assert that resignation always voids the exemption", () => {
    expect(page).not.toContain("Fully taxable as salary in the year of receipt. The");
    expect(page).not.toMatch(/Encashment on resignation is taxable as salary with no exemption/i);
    expect(page).not.toMatch(/₹25 lakh exemption only applies at retirement/i);
  });

  it("distinguishes employment-period payments from possible separation exemption", () => {
    expect(page).toContain("During employment (in-service encashment)");
    expect(page).toContain("On resignation:");
    expect(page).toContain("may qualify for the applicable leave-encashment exemption");
    expect(page).toContain("₹25,00,000");
    expect(page).toContain("maximum lifetime exemption ceiling");
    expect(page).toContain("does not determine your individual tax exemption");
    expect(editorial).toContain("retirement or resignation is exempt up");
  });

  it("cites Income Tax Department guidance and makes financial comparison conditional", () => {
    expect(page).toContain("www.incometaxindia.gov.in/income-from-salary");
    expect(page).toContain("neither option is universally financially better");
    expect(page).toContain("Do not assume");
  });
});
