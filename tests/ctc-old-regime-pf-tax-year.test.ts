/**
 * Mid-year PF ceiling (17 Sep 2026) makes three PF figures diverge for capped members:
 * A. current monthly cash
 * B. annualized current run-rate
 * C. Tax Year / FY 2026–27 transition contribution (old-regime deduction basis)
 */
import { describe, expect, it } from "vitest";
import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";
import { estimateAnnualIncomeTax } from "@/lib/calculators/annual-tax";
import {
  computeEmployeePfAnnual,
  computeEmployeePfFy2026Annual,
  computeEmployeePfMonthly,
} from "@/lib/calculators/pf";
import { DEFAULT_PF_ASSUMPTIONS } from "@/lib/config/pf";
import { DEFAULT_TAX_SETTINGS } from "@/lib/config";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

/** Frozen July archive SHA-256 — must stay byte-identical across this pass. */
const JULY_JSON_SHA256 =
  "9e8de077b566ba88d24aa9cc4fa110b24e6a109ffffa7e348f8b3f870a1d7c4b";
const JULY_CSV_SHA256 =
  "e2e8358b50f6a3b5156a152b9d0b84b31c7e9caa937fa724d25fbda3f7f25cc7";

const fy = DEFAULT_TAX_SETTINGS.financialYear;
const PF_WAGE = 30_000; // ≥ ₹25,000 — canonical capped existing-member example
const GROSS = 18_00_000;
const PT = 2_500;

describe("old-regime PF Tax Year vs current annualized run-rate", () => {
  it("1–3: current cash ₹3,000; annualized ₹36,000; Tax Year transition ₹29,360", () => {
    expect(computeEmployeePfMonthly(PF_WAGE)).toBe(3_000);
    expect(computeEmployeePfAnnual(PF_WAGE)).toBe(36_000);
    expect(computeEmployeePfFy2026Annual(PF_WAGE).annual).toBe(29_360);
  });

  it("4: old-regime tax uses Tax Year PF (₹29,360), not annualized current (₹36,000)", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: GROSS,
      basicAndDaAnnual: PF_WAGE * 12,
      regime: "old",
      metroCity: false,
      professionalTaxAnnual: PT,
    });

    expect(out.employeePfMonthly).toBe(3_000);

    const taxWithTaxYearPf = estimateAnnualIncomeTax("old", GROSS, 29_360, fy, {});
    const taxWithAnnualizedCurrent = estimateAnnualIncomeTax("old", GROSS, 36_000, fy, {});

    expect(out.estimatedTotalTaxAnnual).toBe(taxWithTaxYearPf.totalTaxAnnual);
    expect(out.estimatedTotalTaxAnnual).not.toBe(taxWithAnnualizedCurrent.totalTaxAnnual);
    expect(out.estimatedTotalTaxAnnual).toBeGreaterThan(taxWithAnnualizedCurrent.totalTaxAnnual);
  });

  it("5: new-regime tax is unchanged by the PF Tax Year distinction", () => {
    const derived = computeCtcToInHand({
      annualGrossSalary: GROSS,
      basicAndDaAnnual: PF_WAGE * 12,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: PT,
    });
    const withAnnualizedOverride = computeCtcToInHand({
      annualGrossSalary: GROSS,
      basicAndDaAnnual: PF_WAGE * 12,
      employeePfAnnual: 36_000,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: PT,
    });
    const withTaxYearOverride = computeCtcToInHand({
      annualGrossSalary: GROSS,
      basicAndDaAnnual: PF_WAGE * 12,
      employeePfAnnual: 29_360,
      regime: "new",
      metroCity: false,
      professionalTaxAnnual: PT,
    });

    expect(derived.estimatedTotalTaxAnnual).toBe(withAnnualizedOverride.estimatedTotalTaxAnnual);
    expect(derived.estimatedTotalTaxAnnual).toBe(withTaxYearOverride.estimatedTotalTaxAnnual);
    expect(derived.employeePfMonthly).toBe(3_000);
    expect(withAnnualizedOverride.employeePfMonthly).toBe(3_000);
    expect(withTaxYearOverride.employeePfMonthly).toBeCloseTo(29_360 / 12, 6);
  });

  it("6: explicit annual PF override still wins for cash and old-regime tax", () => {
    const override = 42_000;
    const out = computeCtcToInHand({
      annualGrossSalary: GROSS,
      basicAndDaAnnual: PF_WAGE * 12,
      employeePfAnnual: override,
      regime: "old",
      metroCity: false,
      professionalTaxAnnual: PT,
    });
    expect(out.employeePfMonthly).toBe(override / 12);
    expect(out.estimatedTotalTaxAnnual).toBe(
      estimateAnnualIncomeTax("old", GROSS, override, fy, {}).totalTaxAnnual
    );
    expect(out.warnings.join(" ")).toContain("Using your supplied annual employee PF");
  });

  it("7: full-Basic PF behaviour is unchanged (no ceiling)", () => {
    const full = { ...DEFAULT_PF_ASSUMPTIONS, applyStatutoryWageCeiling: false };
    expect(computeEmployeePfMonthly(60_000, full)).toBe(7_200);
    expect(computeEmployeePfAnnual(60_000, full)).toBe(86_400);
    expect(computeEmployeePfFy2026Annual(60_000, full).annual).toBe(86_400);
  });

  it("8: July archive files remain byte-identical (frozen SHA-256)", () => {
    const json = readFileSync("public/data/salaryexit-in-hand-model-2026-07-31.json");
    const csv = readFileSync("public/data/salaryexit-in-hand-model-2026-07-31.csv");
    expect(createHash("sha256").update(json).digest("hex")).toBe(JULY_JSON_SHA256);
    expect(createHash("sha256").update(csv).digest("hex")).toBe(JULY_CSV_SHA256);
    const parsed = JSON.parse(json.toString("utf8")) as {
      assumptions: { financialYearLabel: string };
    };
    // Historical July snapshot keeps its original label string; do not rewrite archives.
    expect(parsed.assumptions.financialYearLabel).toBe("Financial Year 2026-27 (AY 2027-28)");
  });

  it("9: live Tax Year / FY label no longer exposes AY 2027–28", () => {
    expect(fy.label).toBe("Tax Year 2026–27 (FY 2026–27)");
    expect(fy.label).not.toMatch(/AY 2027/);
    expect(fy.label).not.toMatch(/Assessment Year 2027/);
  });

  it("preserves explicit fy-2026-27 monthly-average projection mode", () => {
    const out = computeCtcToInHand({
      annualGrossSalary: 12_00_000,
      basicAndDaAnnual: 5_40_000,
      professionalTaxAnnual: 2_400,
      regime: "new",
      metroCity: false,
      pfProjectionBasis: "fy-2026-27",
    });
    expect(out.employeePfMonthly).toBeCloseTo(29_360 / 12, 6);
  });
});
