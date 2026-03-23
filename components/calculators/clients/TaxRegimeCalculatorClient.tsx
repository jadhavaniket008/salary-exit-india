"use client";

import { useMemo, useState } from "react";
import { Card, FormField, Input } from "@/components/ui";
import { TaxRegimeCompareBars } from "@/components/charts/TaxRegimeCompareBars";
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
import { compareTaxRegimes, TAX_REGIME_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/tax-regime-comparison";
import { DEFAULT_TAX_SETTINGS } from "@/lib/config";
import { formatInr, formatInrPlain } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { TaxComparisonOutput } from "@/types/tax";

const fy = DEFAULT_TAX_SETTINGS.financialYear;

export function TaxRegimeCalculatorClient() {
  const [gross, setGross] = useState("");
  const [pf, setPf] = useState("");
  const [other80c, setOther80c] = useState("");
  const [hra, setHra] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<TaxComparisonOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      `Uses ${fy.label} slab tables configured in code.`,
      `Section 87A rebates are simplified (old: up to ₹${formatInrPlain(fy.rebate87AOldRegimeMax)} when taxable ≤ ₹${formatInrPlain(fy.rebate87AOldRegimeIncomeLimit)}; new: full rebate when taxable ≤ ₹${formatInrPlain(fy.rebate87ANewRegimeIncomeLimit)} in this model).`,
      `Surcharge, marginal relief, perquisites, and alternate minimum tax are not modeled.`,
    ],
    []
  );

  const regimeWorkedExample = useMemo(() => compareTaxRegimes(TAX_REGIME_WORKED_EXAMPLE_INPUT), []);

  function reset() {
    setGross("");
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

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = compareTaxRegimes({
      annualGrossSalary: g.ok ? g.value : 0,
      employeePfAnnual: pfVal.ok ? pfVal.value : 0,
      otherChapterVIADeductionsAnnual: oVal.ok ? oVal.value : 0,
      hraExemptionAnnual: hVal.ok ? hVal.value : 0,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("taxRegime");
  }

  const savings =
    result &&
    Math.abs(result.oldRegime.totalTaxAnnual - result.newRegime.totalTaxAnnual);

  return (
    <CalculatorPageLayout
      slug="taxRegime"
      title="Old vs new tax regime comparison"
      intro="This compares estimated annual income tax + cess under the old and new regimes for salaried gross income. It is not tax filing advice and does not include surcharge."
    >
      <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 text-sm text-red-950 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-100">
        <p className="font-semibold">Not tax filing advice</p>
        <p className="mt-1">
          Use this only as a planning estimate. Actual tax depends on proofs, employer
          calculations, and other income.
        </p>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Outputs are <strong>annualized estimates</strong> — see the accuracy card for regime limits in this engine.
      </p>

      <RequiredInputsCallout
        items={[
          "Annual gross salary (₹)",
          "Optional: employee PF (annual) for old-regime 80C cap",
          "Optional: other 80C (annual)",
          "Optional: HRA exemption (annual) — typically for old regime context",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField label="Annual gross salary (₹)" id="gross">
            <Input id="gross" inputMode="decimal" value={gross} onChange={(e) => setGross(e.target.value)} />
          </FormField>

          <FormField
            label="Employee PF (annual, ₹)"
            id="pf"
            hint="Counted toward the 80C cap in the old-regime path."
          >
            <Input id="pf" inputMode="decimal" value={pf} onChange={(e) => setPf(e.target.value)} placeholder="0" />
          </FormField>

          <FormField label="Other 80C (annual, ₹)" id="o80c">
            <Input id="o80c" inputMode="decimal" value={other80c} onChange={(e) => setOther80c(e.target.value)} placeholder="0" />
          </FormField>

          <FormField
            label="HRA exemption (annual, ₹)"
            id="hra"
            hint="Optional. If you are not claiming HRA in old regime, leave 0."
          >
            <Input id="hra" inputMode="decimal" value={hra} onChange={(e) => setHra(e.target.value)} placeholder="0" />
          </FormField>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter gross salary (and optional deductions) to compare regimes.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric
              label="Estimated annual tax difference (absolute)"
              value={savings ?? 0}
              animate
              helperText="Gap between two modeled regime totals (each rounded through slabs/rebates) — not a precise statutory determination."
            />

            {result ? (
              <TaxRegimeCompareBars
                oldTaxAnnual={result.oldRegime.totalTaxAnnual}
                newTaxAnnual={result.newRegime.totalTaxAnnual}
              />
            ) : null}

            <CollapsibleBreakdown defaultOpen>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <p className="text-xs font-semibold uppercase text-zinc-500">Old regime</p>
                  <p className="mt-2 text-sm text-zinc-600">Taxable income</p>
                  <p className="text-lg font-semibold tabular-nums">{formatInr(result.oldRegime.taxableIncomeAnnual)}</p>
                  <p className="mt-2 text-sm text-zinc-600">Total tax + cess</p>
                  <p className="text-lg font-semibold tabular-nums">{formatInr(result.oldRegime.totalTaxAnnual)}</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <p className="text-xs font-semibold uppercase text-zinc-500">New regime</p>
                  <p className="mt-2 text-sm text-zinc-600">Taxable income</p>
                  <p className="text-lg font-semibold tabular-nums">{formatInr(result.newRegime.taxableIncomeAnnual)}</p>
                  <p className="mt-2 text-sm text-zinc-600">Total tax + cess</p>
                  <p className="text-lg font-semibold tabular-nums">{formatInr(result.newRegime.totalTaxAnnual)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                Lower regime in this model: <strong>{result.lowerRegime}</strong>.{" "}
                Absolute gap: <strong>{formatInr(result.annualSavingsIfChooseLower)}</strong>.
              </p>
              <ul className="mt-3 list-inside list-disc text-sm text-amber-900 dark:text-amber-100/90">
                {result.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </CollapsibleBreakdown>
          </ResultReveal>
        )}
      </section>

      <AssumptionsBlock bullets={assumptionBullets} />

      <WorkedExample>
        <p>
          Engine snapshot: gross {formatInr(TAX_REGIME_WORKED_EXAMPLE_INPUT.annualGrossSalary)}/year, employee PF{" "}
          {formatInr(TAX_REGIME_WORKED_EXAMPLE_INPUT.employeePfAnnual ?? 0)}, other 80C{" "}
          {formatInr(TAX_REGIME_WORKED_EXAMPLE_INPUT.otherChapterVIADeductionsAnnual ?? 0)}, HRA exemption{" "}
          {formatInr(TAX_REGIME_WORKED_EXAMPLE_INPUT.hraExemptionAnnual ?? 0)}. Estimated total tax + cess: old regime{" "}
          {formatInr(regimeWorkedExample.oldRegime.totalTaxAnnual)}, new regime{" "}
          {formatInr(regimeWorkedExample.newRegime.totalTaxAnnual)} (simplified model; not filing output).
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Should I choose the regime with lower tax here?",
            answer:
              "Not automatically. This tool ignores many real-world factors. Your employer’s regime choice, deductions, and long-term plans matter.",
          },
          {
            question: "Why doesn’t this match Form 16?",
            answer:
              "Form 16 uses actual TDS, proofs, and payroll timing. This is an annualized simplified model.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
