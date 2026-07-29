"use client";

import { useMemo, useRef, useState } from "react";
import { Button, Card, FormField, Input } from "@/components/ui";
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
import { trackCalculatorStarted, trackCalculatorUse } from "@/lib/analytics/client";
import { computeRequiredCtcForInHand } from "@/lib/calculators/reverse-salary";
import { DEFAULT_BASIC_DA_SHARE_OF_GROSS } from "@/lib/config/salary-reality-heuristics";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { TaxRegime } from "@/types/salary";
import type { ReverseSalaryOutput } from "@/types/reverse-salary";

const WORKED_EXAMPLE = computeRequiredCtcForInHand({
  desiredMonthlyInHand: 1_00_000,
  regime: "new",
  professionalTaxAnnual: DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE,
  basicDaShareOfGross: DEFAULT_BASIC_DA_SHARE_OF_GROSS,
});

export function ReverseSalaryCalculatorClient() {
  const [targetInHand, setTargetInHand] = useState("");
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [pt, setPt] = useState(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
  const [basicDaPct, setBasicDaPct] = useState(Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100));
  const [employerCostPct, setEmployerCostPct] = useState(10);

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ReverseSalaryOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const hasTrackedStart = useRef(false);
  function markStarted() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackCalculatorStarted("reverseSalary");
  }

  function reset() {
    setTargetInHand("");
    setRegime("new");
    setPt(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
    setBasicDaPct(Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100));
    setEmployerCostPct(10);
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const target = sanitizeNumber(targetInHand);
    if (!target.ok) nextErrors.push("Desired monthly in-hand: " + target.error);
    else {
      const nn = assertNonNegative("Desired monthly in-hand", target.value);
      if (nn) nextErrors.push(nn);
    }

    const ptVal = sanitizeNumber(pt, { fallback: 0 });
    if (!ptVal.ok) nextErrors.push("Professional tax (annual): " + ptVal.error);
    else {
      const nn = assertNonNegative("Professional tax (annual)", ptVal.value);
      if (nn) nextErrors.push(nn);
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0 || !target.ok || !ptVal.ok) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = computeRequiredCtcForInHand({
      desiredMonthlyInHand: target.value,
      regime,
      professionalTaxAnnual: ptVal.value,
      basicDaShareOfGross: Math.min(60, Math.max(10, basicDaPct)) / 100,
      employerCostShareOfCtc: Math.min(40, Math.max(0, employerCostPct)) / 100,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("reverseSalary");
  }

  const assumptionBullets = useMemo(
    () => [
      "We search for the gross salary that produces your target monthly in-hand using the same tax/PF engine as CTC → in-hand, then convert to CTC using the employer-cost share you set.",
      "Required CTC is shown as a range (8%–18% of CTC as employer-side costs), not a single precise figure — real offers vary in how much PF, gratuity, and insurance they bundle in.",
      "Does not model variable pay, ESOPs, joining bonus, or state-specific professional tax beyond the annual figure you enter.",
    ],
    []
  );

  return (
    <CalculatorPageLayout
      slug="reverseSalary"
      title="What CTC do I need for your target in-hand?"
      intro="Enter the monthly in-hand you want, and we work backwards to the gross salary and required CTC — shown as a range, not a false-precision single number."
    >
      <RequiredInputsCallout
        items={[
          "Desired monthly in-hand (₹)",
          "Tax regime",
          "Annual professional tax (₹)",
          "Basic + DA as % of gross (for PF)",
          "Employer-side costs as % of CTC (PF + gratuity + insurance)",
        ]}
      />

      <Card className="space-y-6 p-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField
            label="Desired monthly in-hand (₹)"
            id="target-in-hand"
            hint="What you want to actually receive in a normal, non-bonus month."
          >
            <Input
              id="target-in-hand"
              inputMode="decimal"
              value={targetInHand}
              onChange={(e) => {
                setTargetInHand(e.target.value);
                markStarted();
              }}
            />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">Tax regime</legend>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="regime" checked={regime === "new"} onChange={() => setRegime("new")} />
                New regime
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="regime" checked={regime === "old"} onChange={() => setRegime("old")} />
                Old regime
              </label>
            </div>
          </fieldset>

          <FormField
            label="Professional tax (annual, ₹)"
            id="pt"
            hint="Replace the default with your state's realistic annual PT if known."
          >
            <Input id="pt" inputMode="decimal" value={pt} onChange={(e) => setPt(e.target.value)} />
          </FormField>

          <FormField
            label="Basic + DA as % of gross (for PF)"
            id="basic-da-pct"
            hint="When your payslip split is unknown, we assume this share of gross is Basic+DA for PF purposes."
          >
            <div className="flex flex-wrap items-center gap-3">
              <Input
                id="basic-da-pct"
                inputMode="decimal"
                className="max-w-[7rem]"
                value={String(basicDaPct)}
                onChange={(e) => {
                  const s = sanitizeNumber(e.target.value);
                  if (s.ok) setBasicDaPct(s.value);
                }}
              />
              <span className="text-sm text-foreground-muted">% of gross</span>
            </div>
          </FormField>

          <FormField
            label="Employer-side costs as % of CTC"
            id="employer-cost-pct"
            hint="PF + gratuity + insurance the employer bundles into CTC. Typical range 8%–18%; we always show that range regardless of this input."
          >
            <div className="flex flex-wrap items-center gap-3">
              <Input
                id="employer-cost-pct"
                inputMode="decimal"
                className="max-w-[7rem]"
                value={String(employerCostPct)}
                onChange={(e) => {
                  const s = sanitizeNumber(e.target.value);
                  if (s.ok) setEmployerCostPct(s.value);
                }}
              />
              <span className="text-sm text-foreground-muted">% of CTC</span>
            </div>
          </FormField>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-subtle p-6 text-sm text-foreground-secondary">
            Enter your desired monthly in-hand, then calculate to see the required gross and CTC range.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric
              label="Required annual CTC (point estimate)"
              value={result.requiredAnnualCtc}
              animate
              helperText={`Assumes ${employerCostPct}% of CTC goes to employer PF, gratuity, and insurance.`}
            />
            <div className="rounded-xl border border-border bg-surface-subtle p-4 text-sm text-foreground-secondary">
              Realistic range across common employer-cost structures:{" "}
              <strong className="tabular-nums text-foreground">{formatInr(result.requiredAnnualCtcLow)}</strong> to{" "}
              <strong className="tabular-nums text-foreground">{formatInr(result.requiredAnnualCtcHigh)}</strong>{" "}
              annual CTC.
            </div>
            <CollapsibleBreakdown title="How we got there">
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-foreground-muted">Required annual gross</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.requiredAnnualGross)}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">Achieved monthly in-hand (check)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.achievedMonthlyInHand, { decimals: true })}</dd>
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
          Engine snapshot: target monthly in-hand {formatInr(1_00_000)}, new regime, PT{" "}
          {formatInr(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE)}/year, Basic+DA{" "}
          {Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100)}% of gross. Required gross{" "}
          {formatInr(WORKED_EXAMPLE.requiredAnnualGross)}/year; required CTC roughly{" "}
          {formatInr(WORKED_EXAMPLE.requiredAnnualCtcLow)}–{formatInr(WORKED_EXAMPLE.requiredAnnualCtcHigh)}/year
          depending on employer-side cost structure.
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Why is required CTC a range, not one number?",
            answer:
              "Two employers offering the same fixed monthly cash can have very different CTC headlines depending on how much employer PF, gratuity, and insurance they bundle in. A single precise number would overstate how much we actually know about your specific offer structure.",
          },
          {
            question: "Does this account for variable pay or bonuses?",
            answer:
              "No — this models fixed monthly in-hand only. If part of your target is expected from a bonus or variable payout, treat the required CTC as an underestimate of what you'd need to negotiate.",
          },
          {
            question: "How is the required gross actually found?",
            answer:
              "We search numerically for the gross salary where the CTC → in-hand engine's output matches your target, then convert that gross back to CTC. This uses the same tax and PF logic as the CTC → in-hand calculator, just run in reverse.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
