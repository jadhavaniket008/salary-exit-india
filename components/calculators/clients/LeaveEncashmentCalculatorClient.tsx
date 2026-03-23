"use client";

import { useMemo, useState } from "react";
import { Card, FormField, Input } from "@/components/ui";
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
import { computeLeaveEncashment, LEAVE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/leave-encashment";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { LeaveEncashmentOutput } from "@/types/leave-encashment";

export function LeaveEncashmentCalculatorClient() {
  const [monthly, setMonthly] = useState("");
  const [days, setDays] = useState("");
  const [basis, setBasis] = useState<26 | 30>(26);

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<LeaveEncashmentOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      "Gross encashment = (Basic+DA monthly ÷ day basis) × unused leave days.",
      "Day basis 26 is common in Indian payroll “per day” calculations; 30 is a calendar-day style alternative.",
      "Tax exemptions (e.g., Section 10(10AA) where applicable) are not calculated here.",
      "Employers may use Basic-only, caps, or rounding rules not modeled.",
    ],
    []
  );

  const leaveWorkedExample = useMemo(() => computeLeaveEncashment(LEAVE_WORKED_EXAMPLE_INPUT), []);

  function reset() {
    setMonthly("");
    setDays("");
    setBasis(26);
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const m = sanitizeNumber(monthly);
    if (!m.ok) nextErrors.push("Basic + DA (monthly): " + m.error);
    else {
      const nn = assertNonNegative("Basic + DA (monthly)", m.value);
      if (nn) nextErrors.push(nn);
    }

    const d = sanitizeNumber(days);
    if (!d.ok) nextErrors.push("Unused leave days: " + d.error);
    else {
      const nn = assertNonNegative("Unused leave days", d.value);
      if (nn) nextErrors.push(nn);
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = computeLeaveEncashment({
      basicAndDaMonthly: m.ok ? m.value : 0,
      unusedLeaveDays: d.ok ? d.value : 0,
      dayBasis: basis,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("leaveEncashment");
  }

  return (
    <CalculatorPageLayout
      slug="leaveEncashment"
      title="Leave encashment calculator (estimate)"
      intro="Estimate gross leave encashment before tax. Pick a day-basis (26 vs 30) to match how your employer approximates per-day pay from monthly Basic+DA."
    >
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
        <p className="font-semibold">Explicit modeling choice</p>
        <p className="mt-1">
          We compute a <strong>gross payout estimate</strong> only. Net pay after tax/ESI/PT
          and employer-specific caps are not included.
        </p>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Changing the day basis can materially change results — pick what matches your payslip policy best (see accuracy
        card).
      </p>

      <RequiredInputsCallout
        items={[
          "Basic + DA (monthly, ₹)",
          "Unused leave days eligible for encashment",
          "Day basis (26 or 30) for per-day rate",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField
            label="Basic + DA (monthly, ₹)"
            id="bda"
            hint="If your employer encashes on Basic only, enter Basic here and treat DA as 0."
          >
            <Input id="bda" inputMode="decimal" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
          </FormField>

          <FormField label="Unused leave days" id="days">
            <Input id="days" inputMode="decimal" value={days} onChange={(e) => setDays(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Day basis for per-day rate
            </legend>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="basis"
                  checked={basis === 26}
                  onChange={() => setBasis(26)}
                />
                26 (common payroll style)
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="basis"
                  checked={basis === 30}
                  onChange={() => setBasis(30)}
                />
                30 (calendar style)
              </label>
            </div>
          </fieldset>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter Basic+DA and leave days to estimate gross encashment.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric
              label="Estimated gross leave encashment"
              value={result.encashmentAmount}
              animate
              helperText={`Per-day rate ≈ ${formatInr(result.dailyRate, { decimals: true })} (before tax).`}
            />
            <CollapsibleBreakdown>
              <ul className="list-inside list-disc text-sm text-amber-900 dark:text-amber-100/90">
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
          Engine snapshot: Basic+DA {formatInr(LEAVE_WORKED_EXAMPLE_INPUT.basicAndDaMonthly)}/month,{" "}
          {LEAVE_WORKED_EXAMPLE_INPUT.unusedLeaveDays} days, {LEAVE_WORKED_EXAMPLE_INPUT.dayBasis}-day basis → per-day{" "}
          {formatInr(leaveWorkedExample.dailyRate, { decimals: true })} → encashment{" "}
          {formatInr(leaveWorkedExample.encashmentAmount)} gross (before tax).
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Why two day bases?",
            answer:
              "Companies differ. If you don’t know, compare both and treat the range as uncertainty, not precision.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
