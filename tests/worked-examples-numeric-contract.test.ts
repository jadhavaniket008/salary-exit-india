/**
 * Locks worked-example inputs to stable engine outputs so UI copy cannot drift from math.
 * Update snapshots only when FY slabs / PF rules intentionally change.
 */
import { describe, expect, it } from "vitest";
import { computeCtcToInHand, CTC_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/ctc-to-inhand";
import { computeEpfEstimate, EPF_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/epf";
import { computeGratuity, GRATUITY_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/gratuity";
import { computeHraExemption, HRA_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/hra";
import { computeLeaveEncashment, LEAVE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/leave-encashment";
import { computeNoticeBuyout, NOTICE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/notice-buyout";
import { compareTaxRegimes, TAX_REGIME_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/tax-regime-comparison";
import { computeSalaryBreakdown, SALARY_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/salary-breakdown";
import { computeSalaryHike, SALARY_HIKE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/salary-hike";
import { DEFAULT_PF_ASSUMPTIONS } from "@/lib/config/pf";

describe("worked example ↔ engine contract", () => {
  it("CTC → in-hand (CTC_WORKED_EXAMPLE_INPUT)", () => {
    const o = computeCtcToInHand(CTC_WORKED_EXAMPLE_INPUT);
    expect({
      inHandMonthly: o.inHandMonthly,
      grossMonthly: o.grossMonthly,
      employeePfMonthly: o.employeePfMonthly,
      tdsMonthly: o.tdsMonthly,
      estimatedTotalTaxAnnual: o.estimatedTotalTaxAnnual,
    }).toMatchSnapshot();
    const id =
      o.grossMonthly - o.employeePfMonthly - o.professionalTaxMonthly - o.tdsMonthly;
    expect(o.inHandMonthly).toBeCloseTo(id, 5);
  });

  it("Salary breakdown (SALARY_WORKED_EXAMPLE_INPUT)", () => {
    const o = computeSalaryBreakdown(SALARY_WORKED_EXAMPLE_INPUT);
    expect({
      estimatedInHandMonthly: o.estimatedInHandMonthly,
      totalTaxAnnual: o.totalTaxAnnual,
      taxableIncomeAnnual: o.taxableIncomeAnnual,
    }).toMatchSnapshot();
    expect(o.estimatedInHandMonthly).toBeCloseTo(o.estimatedNetAnnual / 12, 5);
  });

  it("Tax regime comparison (TAX_REGIME_WORKED_EXAMPLE_INPUT)", () => {
    const o = compareTaxRegimes(TAX_REGIME_WORKED_EXAMPLE_INPUT);
    expect({
      oldTax: o.oldRegime.totalTaxAnnual,
      newTax: o.newRegime.totalTaxAnnual,
      lower: o.lowerRegime,
      savings: o.annualSavingsIfChooseLower,
    }).toMatchSnapshot();
  });

  it("HRA (HRA_WORKED_EXAMPLE_INPUT)", () => {
    const o = computeHraExemption(HRA_WORKED_EXAMPLE_INPUT);
    expect({
      exemptionAnnual: o.exemptionAnnual,
      testRentMinus10Percent: o.testRentMinus10Percent,
      testSalaryPercentCap: o.testSalaryPercentCap,
    }).toMatchSnapshot();
  });

  it("Gratuity (GRATUITY_WORKED_EXAMPLE_INPUT)", () => {
    const o = computeGratuity(GRATUITY_WORKED_EXAMPLE_INPUT);
    expect({
      gratuityAmount: o.gratuityAmount,
      exemptGratuityEstimate: o.exemptGratuityEstimate,
      taxableGratuityEstimate: o.taxableGratuityEstimate,
    }).toMatchSnapshot();
  });

  it("Leave encashment (LEAVE_WORKED_EXAMPLE_INPUT)", () => {
    const o = computeLeaveEncashment(LEAVE_WORKED_EXAMPLE_INPUT);
    expect({
      encashmentAmount: o.encashmentAmount,
      dailyRate: o.dailyRate,
    }).toMatchSnapshot();
  });

  it("Notice buyout (NOTICE_WORKED_EXAMPLE_INPUT)", () => {
    const o = computeNoticeBuyout(NOTICE_WORKED_EXAMPLE_INPUT);
    expect({
      buyoutAmount: o.buyoutAmount,
      dailyRate: o.dailyRate,
      daysInMonth: o.daysInMonth,
    }).toMatchSnapshot();
  });

  it("Salary hike (SALARY_HIKE_WORKED_EXAMPLE_INPUT)", () => {
    const o = computeSalaryHike(SALARY_HIKE_WORKED_EXAMPLE_INPUT);
    expect({
      absoluteIncreaseAnnual: o.absoluteIncreaseAnnual,
      percentIncrease: o.percentIncrease,
    }).toMatchSnapshot();
  });

  it("EPF (EPF_WORKED_EXAMPLE_INPUT) with default ceiling", () => {
    const o = computeEpfEstimate(EPF_WORKED_EXAMPLE_INPUT, {
      ...DEFAULT_PF_ASSUMPTIONS,
      applyStatutoryWageCeiling: true,
    });
    expect({
      employeeContributionMonthly: o.employeeContributionMonthly,
      employerContributionMonthly: o.employerContributionMonthly,
      totalEpfMonthly: o.totalEpfMonthly,
    }).toMatchSnapshot();
  });
});
