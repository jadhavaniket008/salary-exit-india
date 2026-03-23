"use client";

import { useMemo, useState } from "react";
import { Card, FormField, Input } from "@/components/ui";
import { InHandBreakdownBars } from "@/components/charts/InHandBreakdownBars";
import { ResultReveal } from "@/components/motion/ResultReveal";
import {
  AssumptionsBlock,
  CalculatorPageLayout,
  CollapsibleBreakdown,
  FaqSection,
  FormActions,
  PrimaryMetric,
  RequiredInputsCallout,
  ValidationSummary,
  WorkedExample,
} from "@/components/calculators";
import { trackCalculatorUse } from "@/lib/analytics/client";
import { computeSalaryBreakdown, SALARY_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/salary-breakdown";
import { DEFAULT_TAX_SETTINGS } from "@/lib/config";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";
import { formatInr, formatInrPlain } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { SalaryOutput } from "@/types/salary";

const fy = DEFAULT_TAX_SETTINGS.financialYear;

export function SalaryCalculatorClient() {
  const salaryWorkedExample = useMemo(() => computeSalaryBreakdown(SALARY_WORKED_EXAMPLE_INPUT), []);
  const [gross, setGross] = useState("");
  const [regime, setRegime] = useState<"old" | "new">("new");
  const [pt, setPt] = useState(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
  const [pf, setPf] = useState("");
  const [other80c, setOther80c] = useState("");
  const [hra, setHra] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<SalaryOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      `Income tax slabs, standard deductions, and simplified Section 87A match the configured FY (${fy.label}).`,
      `Standard deduction: old ₹${formatInrPlain(fy.standardDeductionOldRegime)}, new ₹${formatInrPlain(fy.standardDeductionNewRegime)}.`,
      `Old regime: employee PF + other 80C combined are capped at ₹${formatInrPlain(DEFAULT_TAX_SETTINGS.section80CCap)} for this estimate.`,
      `Surcharge, perquisites, bonus timing, and marginal relief are not modeled.`,
    ],
    []
  );

  function reset() {
    setGross("");
    setRegime("new");
    setPt(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
    setPf("");
    setOther80c("");
    setHra("");
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const g = sanitizeNumber(gross);
    if (!g.ok) nextErrors.push("Annual gross salary: " + g.error);
    else {
      const nn = assertNonNegative("Annual gross salary", g.value);
      if (nn) nextErrors.push(nn);
    }

    const ptVal = sanitizeNumber(pt, { fallback: 0 });
    if (!ptVal.ok) nextErrors.push("Professional tax (annual): " + ptVal.error);
    else {
      const nn = assertNonNegative("Professional tax (annual)", ptVal.value);
      if (nn) nextErrors.push(nn);
    }

    const pfVal = pf.trim() === "" ? { ok: true as const, value: 0 } : sanitizeNumber(pf);
    if (!pfVal.ok) nextErrors.push("Employee PF (annual): " + pfVal.error);
    else {
      const nn = assertNonNegative("Employee PF (annual)", pfVal.value);
      if (nn) nextErrors.push(nn);
    }

    const oVal = other80c.trim() === "" ? { ok: true as const, value: 0 } : sanitizeNumber(other80c);
    if (!oVal.ok) nextErrors.push("Other 80C (annual): " + oVal.error);
    else {
      const nn = assertNonNegative("Other 80C (annual)", oVal.value);
      if (nn) nextErrors.push(nn);
    }

    const hVal = hra.trim() === "" ? { ok: true as const, value: 0 } : sanitizeNumber(hra);
    if (!hVal.ok) nextErrors.push("HRA exemption (annual): " + hVal.error);
    else {
      const nn = assertNonNegative("HRA exemption (annual)", hVal.value);
      if (nn) nextErrors.push(nn);
    }

    if (regime === "new" && hVal.ok && hVal.value > 0) {
      nextErrors.push(
        "HRA exemption is typically relevant under the old regime. Clear HRA or switch to old regime."
      );
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = computeSalaryBreakdown({
      annualGrossSalary: g.ok ? g.value : 0,
      professionalTaxAnnual: ptVal.ok ? ptVal.value : 0,
      employeePfAnnual: pfVal.ok ? pfVal.value : 0,
      otherChapterVIADeductionsAnnual: oVal.ok ? oVal.value : 0,
      hraExemptionAnnual: hVal.ok ? hVal.value : 0,
      regime,
      metroCity: false,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("salary");
  }

  return (
    <CalculatorPageLayout
      slug="salary"
      title="Salary & tax breakdown calculator"
      intro="Estimate taxable income, tax + cess, and monthly in-hand after PF and professional tax — using the same pure engine as the rest of SalaryExit India."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Figures are <strong>modeled estimates</strong> — see the accuracy card under the title for what is direct vs
        assumed.
      </p>

      <RequiredInputsCallout
        items={[
          "Annual gross salary (₹)",
          "Tax regime (old vs new)",
          "Professional tax per year (₹) — state dependent",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField label="Annual gross salary (₹)" id="gross" hint="Before employee deductions.">
            <Input
              id="gross"
              inputMode="decimal"
              autoComplete="off"
              value={gross}
              onChange={(e) => setGross(e.target.value)}
              aria-invalid={errors.some((x) => x.includes("gross"))}
            />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Tax regime
            </legend>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="regime"
                  checked={regime === "new"}
                  onChange={() => setRegime("new")}
                />
                New regime
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="regime"
                  checked={regime === "old"}
                  onChange={() => setRegime("old")}
                />
                Old regime
              </label>
            </div>
            <p className="text-xs text-zinc-500">
              New regime ignores HRA/80C in this simplified model except where noted.
            </p>
          </fieldset>

          <FormField
            label="Professional tax (annual, ₹)"
            id="pt"
            hint="Placeholder default is not your exact state slab — replace with your annual PT."
          >
            <Input
              id="pt"
              inputMode="decimal"
              value={pt}
              onChange={(e) => setPt(e.target.value)}
            />
          </FormField>

          <FormField
            label="Employee PF + VPF (annual, ₹)"
            id="pf"
            hint="Optional. Used for old-regime 80C cap logic."
          >
            <Input
              id="pf"
              inputMode="decimal"
              value={pf}
              onChange={(e) => setPf(e.target.value)}
              placeholder="0"
            />
          </FormField>

          <FormField
            label="Other Chapter VI-A / 80C (annual, ₹)"
            id="80c"
            hint="Optional rough bucket (old regime). Combined with PF subject to ₹1.5L cap."
          >
            <Input
              id="80c"
              inputMode="decimal"
              value={other80c}
              onChange={(e) => setOther80c(e.target.value)}
              placeholder="0"
            />
          </FormField>

          <FormField
            label="HRA exemption (annual, ₹)"
            id="hra"
            hint="Optional. Enter only if you already estimated exemption (e.g., via HRA calculator). Old regime only."
          >
            <Input
              id="hra"
              inputMode="decimal"
              value={hra}
              onChange={(e) => setHra(e.target.value)}
              placeholder="0"
            />
          </FormField>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter your inputs and click <strong>Calculate</strong> to see an estimated
            monthly in-hand and tax breakdown.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric
              label="Estimated monthly in-hand (after PF, PT, TDS spread)"
              value={result.estimatedInHandMonthly}
              animate
              helperText="TDS is shown as a smooth monthly estimate; actual deductions may vary month to month."
            />

            <CollapsibleBreakdown defaultOpen>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[280px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
                      <th className="py-2 pr-4 font-medium">Line</th>
                      <th className="py-2 pr-4 font-medium">Annual</th>
                      <th className="py-2 font-medium">Monthly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.breakdownLines?.map((line) => (
                      <tr
                        key={line.label}
                        className="border-b border-zinc-100 dark:border-zinc-900"
                      >
                        <td className="py-2 pr-4 text-zinc-800 dark:text-zinc-200">
                          {line.label}
                        </td>
                        <td className="py-2 pr-4 tabular-nums text-zinc-700 dark:text-zinc-300">
                          {formatInr(line.amountAnnual)}
                        </td>
                        <td className="py-2 tabular-nums text-zinc-700 dark:text-zinc-300">
                          {formatInr(line.amountMonthly, { decimals: true })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {result.warnings.length > 0 ? (
                <ul className="mt-3 list-inside list-disc text-sm text-amber-900 dark:text-amber-100/90">
                  {result.warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              ) : null}
            </CollapsibleBreakdown>
            <InHandBreakdownBars
              grossMonthly={result.annualGrossSalary / 12}
              rows={[
                { label: "Est. in-hand", amount: result.estimatedInHandMonthly, tone: "net" },
                { label: "Employee PF", amount: result.employeePfAnnual / 12, tone: "deduct" },
                { label: "Professional tax", amount: result.professionalTaxAnnual / 12, tone: "deduct" },
                { label: "TDS (spread)", amount: result.totalTaxAnnual / 12, tone: "deduct" },
              ]}
            />
          </ResultReveal>
        )}
      </section>

      <AssumptionsBlock bullets={assumptionBullets} />

      <WorkedExample>
        <p>
          Engine snapshot: gross {formatInr(SALARY_WORKED_EXAMPLE_INPUT.annualGrossSalary)}/year, new regime, PT{" "}
          {formatInr(SALARY_WORKED_EXAMPLE_INPUT.professionalTaxAnnual)}/year, employee PF{" "}
          {formatInr(SALARY_WORKED_EXAMPLE_INPUT.employeePfAnnual ?? 0)}/year → estimated monthly in-hand{" "}
          {formatInr(salaryWorkedExample.estimatedInHandMonthly, { decimals: true })} (FY slabs + 87A model in code).
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Why doesn’t this match my payslip exactly?",
            answer:
              "Payslips include timing effects (arrears, bonuses), flex components, perquisites, and actual TDS adjustments. This tool uses a simplified annual model.",
          },
          {
            question: "Can I use this to file taxes?",
            answer:
              "No. It’s an educational estimate. Use Form 16, AIS, and a CA/tool for filing.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
