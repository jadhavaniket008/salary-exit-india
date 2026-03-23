"use client";

import { useMemo, useState } from "react";
import { Card, FormField, Input } from "@/components/ui";
import { EpfSplitBar } from "@/components/charts/EpfSplitBar";
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
import { computeEpfEstimate, EPF_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/epf";
import { DEFAULT_PF_ASSUMPTIONS } from "@/lib/config/pf";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { EpfOutput } from "@/types/epf";

export function EpfCalculatorClient() {
  const [wage, setWage] = useState("");
  const [useCeiling, setUseCeiling] = useState(true);

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<EpfOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      `Employee rate ${DEFAULT_PF_ASSUMPTIONS.employeeContributionRate * 100}% and employer rate ${DEFAULT_PF_ASSUMPTIONS.employerEpfRateOnPfWage * 100}% on PF wage (simplified).`,
      `Statutory ceiling for PF wage (when enabled): ₹${DEFAULT_PF_ASSUMPTIONS.statutoryWageCeilingMonthly.toLocaleString("en-IN")}/month.`,
      "EPS/EDLI/admin splits are not shown — employer cost in real life can differ.",
    ],
    []
  );

  const epfWorkedExample = useMemo(() => computeEpfEstimate(EPF_WORKED_EXAMPLE_INPUT), []);

  function reset() {
    setWage("");
    setUseCeiling(true);
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const w = sanitizeNumber(wage);
    if (!w.ok) nextErrors.push("PF wage (monthly): " + w.error);
    else {
      const nn = assertNonNegative("PF wage (monthly)", w.value);
      if (nn) nextErrors.push(nn);
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = computeEpfEstimate(
      { pfWageMonthly: w.ok ? w.value : 0 },
      {
        ...DEFAULT_PF_ASSUMPTIONS,
        applyStatutoryWageCeiling: useCeiling,
      }
    );
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("epf");
  }

  return (
    <CalculatorPageLayout
      slug="epf"
      title="EPF contribution estimator"
      intro="Estimate monthly employee and employer EPF contributions on PF wage. This is a simplified employer-cost model — not a payslip replica."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Employer-side EPS diversion is <strong>not</strong> modeled separately — see accuracy card.
      </p>

      <RequiredInputsCallout
        items={[
          "PF wage (monthly) — typically Basic + DA as defined by your employer",
          "Whether to apply the common statutory wage ceiling model",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField
            label="PF wage (monthly, ₹)"
            id="wage"
            hint="If unsure, start with your monthly Basic+DA from payslip."
          >
            <Input id="wage" inputMode="decimal" value={wage} onChange={(e) => setWage(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Wage ceiling model
            </legend>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useCeiling}
                onChange={(e) => setUseCeiling(e.target.checked)}
              />
              Apply statutory wage ceiling for PF wage (common PF estimate)
            </label>
          </fieldset>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter PF wage to estimate employee + employer contributions.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric
              label="Estimated total EPF (employee + employer, monthly)"
              value={result.totalEpfMonthly}
              animate
              helperText="Simplified rates on PF wage — employer accounting splits EPS/EDLI (see warnings)."
            />
            <EpfSplitBar
              employeeMonthly={result.employeeContributionMonthly}
              employerMonthly={result.employerContributionMonthly}
            />
            <CollapsibleBreakdown>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-zinc-500">Employee (monthly)</dt>
                  <dd className="font-medium tabular-nums">
                    {formatInr(result.employeeContributionMonthly, { decimals: true })}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Employer (monthly)</dt>
                  <dd className="font-medium tabular-nums">
                    {formatInr(result.employerContributionMonthly, { decimals: true })}
                  </dd>
                </div>
              </dl>
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
          Engine snapshot: PF wage {formatInr(EPF_WORKED_EXAMPLE_INPUT.pfWageMonthly)}/month with default ceiling
          rules → employee {formatInr(epfWorkedExample.employeeContributionMonthly, { decimals: true })}/mo, employer{" "}
          {formatInr(epfWorkedExample.employerContributionMonthly, { decimals: true })}/mo, total{" "}
          {formatInr(epfWorkedExample.totalEpfMonthly, { decimals: true })}/mo (simplified).
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Why doesn’t this match my payslip’s employer PF?",
            answer:
              "Employers split contributions across EPF/EPS/EDLI and may use different wage definitions.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
