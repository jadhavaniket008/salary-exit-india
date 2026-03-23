"use client";

import { useMemo, useState } from "react";
import { Card, FormField, Input } from "@/components/ui";
import { TwoValueCompareBar } from "@/components/charts/TwoValueCompareBar";
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
import { computeSalaryHike, SALARY_HIKE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/salary-hike";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { SalaryHikeOutput } from "@/types/hike";

export function SalaryHikeCalculatorClient() {
  const [oldC, setOldC] = useState("");
  const [newC, setNewC] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<SalaryHikeOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      "Percentage change is computed as (new − old) ÷ old when old is greater than 0.",
      "Use the same definition for “CTC” in both boxes (gross vs net definitions mix easily).",
    ],
    []
  );

  const hikeWorkedExample = useMemo(() => computeSalaryHike(SALARY_HIKE_WORKED_EXAMPLE_INPUT), []);
  const oldParsed = useMemo(() => sanitizeNumber(oldC), [oldC]);
  const newParsed = useMemo(() => sanitizeNumber(newC), [newC]);

  function reset() {
    setOldC("");
    setNewC("");
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const o = sanitizeNumber(oldC);
    const n = sanitizeNumber(newC);
    if (!o.ok) nextErrors.push("Old annual CTC: " + o.error);
    else {
      const nn = assertNonNegative("Old annual CTC", o.value);
      if (nn) nextErrors.push(nn);
    }
    if (!n.ok) nextErrors.push("New annual CTC: " + n.error);
    else {
      const nn = assertNonNegative("New annual CTC", n.value);
      if (nn) nextErrors.push(nn);
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = computeSalaryHike({
      oldAnnualCtc: o.ok ? o.value : 0,
      newAnnualCtc: n.ok ? n.value : 0,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("salaryHike");
  }

  return (
    <CalculatorPageLayout
      slug="salaryHike"
      title="Salary hike calculator"
      intro="Compute absolute and percentage change between two annual figures (typically CTC or gross). This is simple arithmetic — not a forecast of in-hand impact."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        If old CTC is zero, percentage hike is not meaningful — we show a warning. See accuracy card for definitions.
      </p>

      <RequiredInputsCallout items={["Old annual amount (₹)", "New annual amount (₹)"]} />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField label="Old annual CTC / gross (₹)" id="old">
            <Input id="old" inputMode="decimal" value={oldC} onChange={(e) => setOldC(e.target.value)} />
          </FormField>
          <FormField label="New annual CTC / gross (₹)" id="new">
            <Input id="new" inputMode="decimal" value={newC} onChange={(e) => setNewC(e.target.value)} />
          </FormField>
          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter both figures to see the hike in ₹ and %.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric
              label="Absolute increase (annual)"
              value={result.absoluteIncreaseAnnual}
              animate
            />
            {oldParsed.ok && newParsed.ok ? (
              <TwoValueCompareBar
                labelA="Old annual"
                labelB="New annual"
                valueA={oldParsed.value}
                valueB={newParsed.value}
                title="Old vs new (same scale)"
              />
            ) : null}
            <CollapsibleBreakdown>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-zinc-500">Percent change</dt>
                  <dd className="text-lg font-semibold tabular-nums">
                    {result.percentIncrease.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 0,
                    })}
                    %
                  </dd>
                </div>
              </dl>
              {result.warnings.length > 0 ? (
                <ul className="mt-3 list-inside list-disc text-sm text-amber-900 dark:text-amber-100/90">
                  {result.warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              ) : null}
            </CollapsibleBreakdown>
          </ResultReveal>
        )}
      </section>

      <AssumptionsBlock bullets={assumptionBullets} />

      <WorkedExample>
        <p>
          Engine snapshot: old {formatInr(SALARY_HIKE_WORKED_EXAMPLE_INPUT.oldAnnualCtc)}/year → new{" "}
          {formatInr(SALARY_HIKE_WORKED_EXAMPLE_INPUT.newAnnualCtc)}/year → increase{" "}
          {formatInr(hikeWorkedExample.absoluteIncreaseAnnual)}/year (
          {hikeWorkedExample.percentIncrease.toLocaleString("en-IN", { maximumFractionDigits: 2 })}%).
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Does this include variable pay?",
            answer:
              "Only if you include variable pay consistently in both old and new numbers.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
