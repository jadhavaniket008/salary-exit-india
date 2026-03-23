/**
 * Realistic Indian salary scenarios — regression vectors for the pure calculator layer.
 */
import { describe, expect, it } from "vitest";
import { computeCtcToInHand, CTC_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/ctc-to-inhand";
import { computeSalaryBreakdown, SALARY_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/salary-breakdown";
import { estimateAnnualIncomeTax } from "@/lib/calculators/annual-tax";
import { compareTaxRegimes, TAX_REGIME_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/tax-regime-comparison";
import { computeGratuity } from "@/lib/calculators/gratuity";
import { computeNoticeBuyout, NOTICE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/notice-buyout";
import { computeLeaveEncashment, LEAVE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/leave-encashment";
import { compareOffers } from "@/lib/calculators/offer-comparison";
import { DEFAULT_TAX_SETTINGS } from "@/lib/config";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";

const fy = DEFAULT_TAX_SETTINGS.financialYear;

describe("scenario vectors (India)", () => {
  it("low salary: ~4L gross new regime — finite in-hand, no crash", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 4_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      basicAndDaAnnual: 2_00_000,
    });
    expect(out.inHandMonthly).toBeGreaterThan(0);
    expect(out.estimatedTotalTaxAnnual).toBeGreaterThanOrEqual(0);
  });

  it("mid salary: 12L new regime — in-hand identity", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 12_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE,
      basicAndDaAnnual: 5_00_000,
    });
    const check =
      out.grossMonthly - out.employeePfMonthly - out.professionalTaxMonthly - out.tdsMonthly;
    expect(out.inHandMonthly).toBeCloseTo(check, 5);
  });

  it("high salary: 50L new regime — tax computed without surcharge line item (surcharge not in slab math)", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 50_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      employeePfAnnual: 1_80_000,
    });
    expect(out.estimatedTotalTaxAnnual).toBeGreaterThan(0);
    expect(Number.isFinite(out.estimatedTotalTaxAnnual)).toBe(true);
  });

  it("bonus-heavy: model as higher gross annual (same engine)", () => {
    const base = computeCtcToInHand({
      annualGrossSalary: 15_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      basicAndDaAnnual: 8_00_000,
    });
    const withBonus = computeCtcToInHand({
      annualGrossSalary: 24_00_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      basicAndDaAnnual: 8_00_000,
    });
    expect(withBonus.inHandMonthly).toBeGreaterThan(base.inHandMonthly);
  });

  it("resignation stack: notice buyout + leave encashment same month scenario inputs", () => {
    const notice = computeNoticeBuyout(NOTICE_WORKED_EXAMPLE_INPUT);
    const leave = computeLeaveEncashment(LEAVE_WORKED_EXAMPLE_INPUT);
    expect(notice.buyoutAmount).toBeCloseTo((90_000 / 31) * 45, 2);
    expect(leave.encashmentAmount).toBe(16_000);
  });

  it("gratuity-eligible employee (6+ years)", () => {
    const out = computeGratuity({
      lastDrawnMonthlySalary: 85_000,
      yearsOfService: 6.5,
      coveredUnderGratuityAct: true,
    });
    expect(out.gratuityAmount).toBeCloseTo((15 / 26) * 85_000 * 6.5, 2);
    expect(out.warnings.some((w) => w.includes("Tax on gratuity"))).toBe(true);
  });

  it("offer comparison: fixed-heavy vs variable-heavy (user-entered in-hand)", () => {
    const out = compareOffers({
      offers: [
        {
          label: "Fixed-heavy",
          annualCtc: 20_00_000,
          estimatedInHandMonthly: 1_15_000,
          estimatedTotalTaxAnnual: 3_00_000,
        },
        {
          label: "Variable-heavy",
          annualCtc: 22_00_000,
          estimatedInHandMonthly: 95_000,
          estimatedTotalTaxAnnual: 2_80_000,
        },
      ],
    });
    expect(out.bestByCtc).toBe("Variable-heavy");
    expect(out.bestByInHand).toBe("Fixed-heavy");
    expect(out.warnings.some((w) => w.includes("Variable pay"))).toBe(true);
  });

  it("worked example constants match engine (snapshot)", () => {
    const ctc = computeCtcToInHand(CTC_WORKED_EXAMPLE_INPUT);
    expect(ctc.inHandMonthly).toBeCloseTo(
      ctc.grossMonthly - ctc.employeePfMonthly - ctc.professionalTaxMonthly - ctc.tdsMonthly,
      5
    );

    const sal = computeSalaryBreakdown(SALARY_WORKED_EXAMPLE_INPUT);
    expect(sal.estimatedInHandMonthly).toBeCloseTo(sal.estimatedNetAnnual / 12, 5);

    const regime = compareTaxRegimes(TAX_REGIME_WORKED_EXAMPLE_INPUT);
    expect(regime.oldRegime.totalTaxAnnual).toBeGreaterThanOrEqual(0);
    expect(regime.newRegime.totalTaxAnnual).toBeGreaterThanOrEqual(0);
  });

  it("CTC old regime path warns about limited 80C capture", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 9_00_000,
      regime: "old",
      metroCity: false,
      professionalTaxAnnual: 2_500,
      employeePfAnnual: 1_08_000,
    });
    expect(out.warnings.some((w) => w.includes("Old regime on this screen"))).toBe(true);
  });

  it("high income tax: no NaN in cess chain", () => {
    const t = estimateAnnualIncomeTax("new", 45_00_000, 1_50_000, fy, {});
    expect(Number.isFinite(t.totalTaxAnnual)).toBe(true);
    expect(t.cessAnnual).toBeGreaterThanOrEqual(0);
  });
});
