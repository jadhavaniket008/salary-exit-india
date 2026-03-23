"use client";

import { useMemo, useState } from "react";
import { Card, FormField, Input } from "@/components/ui";
import { GratuityExemptBar } from "@/components/charts/GratuityExemptBar";
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
import { computeGratuity, GRATUITY_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/gratuity";
import { DEFAULT_GRATUITY_ASSUMPTIONS } from "@/lib/config/gratuity";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { GratuityOutput } from "@/types/gratuity";

export function GratuityCalculatorClient() {
  const [monthly, setMonthly] = useState("");
  const [years, setYears] = useState("");
  const [covered, setCovered] = useState(true);

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<GratuityOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const workedExample = useMemo(
    () => computeGratuity(GRATUITY_WORKED_EXAMPLE_INPUT),
    []
  );

  const assumptionBullets = useMemo(
    () => [
      `Formula: (${DEFAULT_GRATUITY_ASSUMPTIONS.gratuityDaysPerYear}/${DEFAULT_GRATUITY_ASSUMPTIONS.daysInMonthBasis}) × last drawn monthly salary × years of service.`,
      `Tax-exempt slice for covered employers is capped at ₹${formatInr(DEFAULT_GRATUITY_ASSUMPTIONS.taxExemptCapCoveredEmployer)} in this model.`,
      `Eligibility under the Act generally requires ${DEFAULT_GRATUITY_ASSUMPTIONS.minimumYearsForEligibility}+ years (exceptions exist).`,
    ],
    []
  );

  function reset() {
    setMonthly("");
    setYears("");
    setCovered(true);
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const m = sanitizeNumber(monthly);
    if (!m.ok) nextErrors.push("Last drawn monthly salary (Basic+DA): " + m.error);
    else {
      const nn = assertNonNegative("Last drawn monthly salary", m.value);
      if (nn) nextErrors.push(nn);
    }

    const y = sanitizeNumber(years);
    if (!y.ok) nextErrors.push("Years of service: " + y.error);
    else {
      const nn = assertNonNegative("Years of service", y.value);
      if (nn) nextErrors.push(nn);
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = computeGratuity({
      lastDrawnMonthlySalary: m.ok ? m.value : 0,
      yearsOfService: y.ok ? y.value : 0,
      coveredUnderGratuityAct: covered,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("gratuity");
  }

  return (
    <CalculatorPageLayout
      slug="gratuity"
      title="Gratuity calculator"
      intro="Estimate gratuity using the common statutory-style formula and a rough split between taxable and exempt amounts for covered employers."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Legal/tax treatment can differ — this is a <strong>planning estimate</strong> (see accuracy card).
      </p>

      <RequiredInputsCallout
        items={[
          "Last drawn monthly salary (Basic + DA, ₹)",
          "Years of service (can be fractional for rough estimates)",
          "Whether covered under Payment of Gratuity Act (affects exempt cap modeling)",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField
            label="Last drawn monthly salary (Basic + DA, ₹)"
            id="monthly"
            hint="Use the definition consistent with your employer’s gratuity policy."
          >
            <Input id="monthly" inputMode="decimal" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
          </FormField>

          <FormField label="Years of service" id="years" hint="e.g. 6.5">
            <Input id="years" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Employer coverage
            </legend>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={covered} onChange={(e) => setCovered(e.target.checked)} />
              Covered under Payment of Gratuity Act (model ₹20L exempt cap)
            </label>
            <p className="text-xs text-zinc-500">
              If you uncheck this, we do not assume the statutory exempt cap.
            </p>
          </fieldset>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter service details to estimate gratuity and a rough exempt/taxable split.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric label="Estimated gratuity (gross)" value={result.gratuityAmount} animate />
            <GratuityExemptBar exempt={result.exemptGratuityEstimate} taxable={result.taxableGratuityEstimate} />
            <CollapsibleBreakdown>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-zinc-500">Exempt (rough, covered)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.exemptGratuityEstimate)}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Taxable (rough)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.taxableGratuityEstimate)}</dd>
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
          Illustrative inputs: last drawn {formatInr(GRATUITY_WORKED_EXAMPLE_INPUT.lastDrawnMonthlySalary)} per month,{" "}
          {GRATUITY_WORKED_EXAMPLE_INPUT.yearsOfService} years of service, covered employer. Estimated gross gratuity{" "}
          {formatInr(workedExample.gratuityAmount)}; exempt (rough) {formatInr(workedExample.exemptGratuityEstimate)};
          taxable (rough) {formatInr(workedExample.taxableGratuityEstimate)} — figures are produced by the same function
          as the live calculator above.
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Is the taxable amount my final tax?",
            answer:
              "No. Tax on gratuity depends on employer type, exemptions, and salary history. Consult a CA for exact treatment.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
