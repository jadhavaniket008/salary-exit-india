"use client";

import { useMemo, useState } from "react";
import { Card, FormField, Input } from "@/components/ui";
import { HraThreeTestsBar } from "@/components/charts/HraThreeTestsBar";
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
import { computeHraExemption, HRA_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/hra";
import { DEFAULT_HRA_ASSUMPTIONS } from "@/lib/config/hra";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { HraOutput } from "@/types/hra";

export function HraCalculatorClient() {
  const [basic, setBasic] = useState("");
  const [da, setDa] = useState("");
  const [hra, setHra] = useState("");
  const [rent, setRent] = useState("");
  const [metro, setMetro] = useState(true);

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<HraOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      `Metro uses ${DEFAULT_HRA_ASSUMPTIONS.metroPercentOfSalary * 100}% of (Basic+DA); non-metro uses ${DEFAULT_HRA_ASSUMPTIONS.nonMetroPercentOfSalary * 100}%.`,
      `Rent test uses rent − ${DEFAULT_HRA_ASSUMPTIONS.rentMinusPercentOfSalary * 100}% of (Basic+DA).`,
      `Exemption is the minimum of the three Section 10(13A) tests implemented in code.`,
    ],
    []
  );

  const hraWorkedExample = useMemo(() => computeHraExemption(HRA_WORKED_EXAMPLE_INPUT), []);
  const hraReceivedAnnual = useMemo(() => sanitizeNumber(hra), [hra]);

  function reset() {
    setBasic("");
    setDa("");
    setHra("");
    setRent("");
    setMetro(true);
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const fields = [
      { name: "Basic (annual)", raw: basic },
      { name: "DA (annual)", raw: da },
      { name: "HRA received (annual)", raw: hra },
      { name: "Rent paid (annual)", raw: rent },
    ] as const;

    const values: number[] = [];
    for (const f of fields) {
      const s = sanitizeNumber(f.raw);
      if (!s.ok) {
        nextErrors.push(`${f.name}: ${s.error}`);
      } else {
        const nn = assertNonNegative(f.name, s.value);
        if (nn) nextErrors.push(nn);
        values.push(s.value);
      }
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const [b, d, h, r] = values;
    const out = computeHraExemption({
      basicAnnual: b,
      dearnessAllowanceAnnual: d,
      hraReceivedAnnual: h,
      rentPaidAnnual: r,
      metroCity: metro,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("hra");
  }

  return (
    <CalculatorPageLayout
      slug="hra"
      title="HRA exemption calculator"
      intro="Estimate HRA exemption using the three-part test (actual HRA, rent minus 10% salary, and salary percentage cap). This is typically relevant under the old tax regime."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        The three tests are computed from your inputs — see the accuracy card for regime and payroll caveats.
      </p>

      <RequiredInputsCallout
        items={[
          "Basic salary (annual, ₹)",
          "DA (annual, ₹) — if part of retirement benefits",
          "HRA received (annual, ₹)",
          "Rent paid (annual, ₹)",
          "Metro vs non-metro (for the 50% / 40% test)",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField label="Basic salary (annual, ₹)" id="basic">
            <Input id="basic" inputMode="decimal" value={basic} onChange={(e) => setBasic(e.target.value)} />
          </FormField>
          <FormField
            label="Dearness allowance (annual, ₹)"
            id="da"
            hint="Use 0 if DA is not part of retirement benefits in your context."
          >
            <Input id="da" inputMode="decimal" value={da} onChange={(e) => setDa(e.target.value)} placeholder="0" />
          </FormField>
          <FormField label="HRA received (annual, ₹)" id="hra">
            <Input id="hra" inputMode="decimal" value={hra} onChange={(e) => setHra(e.target.value)} />
          </FormField>
          <FormField label="Rent paid (annual, ₹)" id="rent">
            <Input id="rent" inputMode="decimal" value={rent} onChange={(e) => setRent(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              City type (for 50% / 40% test)
            </legend>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={metro} onChange={(e) => setMetro(e.target.checked)} />
              Metro city (50% of Basic+DA cap)
            </label>
            <p className="text-xs text-zinc-500">
              If you’re unsure, treat “non-metro” as the conservative assumption for the % cap.
            </p>
          </fieldset>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Fill all annual amounts to compute the minimum of the three tests.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric
              label="Estimated HRA exemption (annual)"
              value={result.exemptionAnnual}
              animate
            />
            {result ? (
              <HraThreeTestsBar
                test1ActualHra={hraReceivedAnnual.ok ? hraReceivedAnnual.value : 0}
                test2RentMinus={result.testRentMinus10Percent}
                test3SalaryCap={result.testSalaryPercentCap}
                exemption={result.exemptionAnnual}
              />
            ) : null}
            <CollapsibleBreakdown>
              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="text-zinc-500">Test 1 — Actual HRA received</dt>
                  <dd className="tabular-nums font-medium">
                    {formatInr(
                      (() => {
                        const s = sanitizeNumber(hra);
                        return s.ok ? s.value : 0;
                      })()
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Test 2 — Rent − 10% of (Basic+DA)</dt>
                  <dd className="tabular-nums font-medium">{formatInr(result.testRentMinus10Percent)}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Test 3 — {metro ? "50%" : "40%"} of (Basic+DA)</dt>
                  <dd className="tabular-nums font-medium">{formatInr(result.testSalaryPercentCap)}</dd>
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
          Engine snapshot: Basic {formatInr(HRA_WORKED_EXAMPLE_INPUT.basicAnnual)}/year, DA{" "}
          {formatInr(HRA_WORKED_EXAMPLE_INPUT.dearnessAllowanceAnnual)}/year, HRA received{" "}
          {formatInr(HRA_WORKED_EXAMPLE_INPUT.hraReceivedAnnual)}/year, rent{" "}
          {formatInr(HRA_WORKED_EXAMPLE_INPUT.rentPaidAnnual)}/year, metro. Annual exemption (min of three tests){" "}
          {formatInr(hraWorkedExample.exemptionAnnual)}.
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Is this valid under the new regime?",
            answer:
              "HRA exemption is generally a feature of the old regime tax computation. Treat this as a planning reference for rent vs HRA structuring.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
