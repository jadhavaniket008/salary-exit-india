"use client";

import { useId, useMemo, useState } from "react";
import { Button, Card, FormField, Input } from "@/components/ui";
import { CreditsDeductionsBar } from "@/components/charts/CreditsDeductionsBar";
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
import { computeFinalSettlement } from "@/lib/calculators/final-settlement";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import { focusFirstInvalidField } from "@/lib/validation/focus-first-invalid";
import type { FinalSettlementOutput } from "@/types/settlement";

type LineRow = { id: string; label: string; amount: string };

function emptyLine(): LineRow {
  return { id: crypto.randomUUID(), label: "", amount: "" };
}

export function FinalSettlementCalculatorClient() {
  const baseId = useId();
  const [credits, setCredits] = useState<LineRow[]>([emptyLine()]);
  const [deductions, setDeductions] = useState<LineRow[]>([emptyLine()]);

  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FinalSettlementOutput | null>(null);
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      "Net settlement = sum(credit lines) − sum(deduction lines).",
      "This does not infer leave encashment, gratuity, or statutory dues — you must add them explicitly as lines.",
      "Blank labels are OK for quick math, but naming lines improves auditability.",
    ],
    []
  );

  function reset() {
    setCredits([emptyLine()]);
    setDeductions([emptyLine()]);
    setErrors([]);
    setFieldErrors({});
    setResult(null);
    setShowResult(false);
  }

  function parseLines(rows: LineRow[], kind: "credit" | "deduction", idPrefix: string) {
    const parsed: { label: string; amount: number }[] = [];
    const errs: string[] = [];
    const fieldErrs: Record<string, string> = {};
    rows.forEach((row, idx) => {
      if (row.amount.trim() === "" && row.label.trim() === "") return;
      const lineName = row.label.trim() === "" ? `Line ${idx + 1}` : row.label.trim();
      const a = sanitizeNumber(row.amount, { label: `${lineName} amount` });
      if (!a.ok) {
        errs.push(a.error);
        fieldErrs[`${idPrefix}-amt-${row.id}`] = a.error;
        return;
      }
      const nn = assertNonNegative(`${lineName} amount`, a.value);
      if (nn) {
        errs.push(nn);
        fieldErrs[`${idPrefix}-amt-${row.id}`] = nn;
      }
      parsed.push({
        label: lineName,
        amount: a.ok ? a.value : 0,
      });
    });
    return { parsed, errs, fieldErrs };
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const c = parseLines(credits, "credit", `${baseId}-c`);
    const d = parseLines(deductions, "deduction", `${baseId}-d`);
    const nextErrors = [...c.errs, ...d.errs];
    const nextFieldErrors = { ...c.fieldErrs, ...d.fieldErrs };

    if (c.parsed.length === 0) {
      nextErrors.push("Add at least one payout line with an amount (or reset).");
    }

    setErrors(nextErrors);
    setFieldErrors(nextFieldErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      focusFirstInvalidField(
        [...credits, ...deductions].map((r) =>
          credits.includes(r) ? `${baseId}-c-amt-${r.id}` : `${baseId}-d-amt-${r.id}`
        ),
        nextFieldErrors
      );
      return;
    }

    const out = computeFinalSettlement({
      lines: c.parsed.map((x) => ({ label: x.label, amount: x.amount })),
      deductions:
        d.parsed.length > 0
          ? d.parsed.map((x) => ({ label: x.label, amount: x.amount }))
          : undefined,
    });
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("finalSettlement");
  }

  function updateRow(
    list: LineRow[],
    setList: (v: LineRow[]) => void,
    id: string,
    patch: Partial<LineRow>
  ) {
    setList(list.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  return (
    <CalculatorPageLayout
      slug="finalSettlement"
      title="Final settlement calculator"
      intro="Build your full-and-final payout by listing credit components and deductions. The engine only sums what you enter — it does not guess components."
    >
      <p className="text-sm text-foreground-secondary">
        Net settlement is <strong>only</strong> as complete as your line items (see accuracy card).
      </p>

      <RequiredInputsCallout
        items={[
          "One or more payout components (₹ amounts)",
          "Optional deductions (loan recovery, etc.)",
        ]}
      />

      <Card className="space-y-6 p-6">
        <form className="space-y-8" onSubmit={onSubmit} noValidate>
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-foreground">
              Payout components (credits)
            </legend>
            <p className="text-xs text-foreground-muted">
              Examples: leave encashment, bonus, gratuity (if known), notice pay, reimbursements.
            </p>
            <div className="space-y-3">
              {credits.map((row, idx) => (
                <div
                  key={row.id}
                  className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-[1fr_120px_auto]"
                >
                  <FormField label={`Label (optional)`} id={`${baseId}-c-label-${row.id}`}>
                    <Input
                      id={`${baseId}-c-label-${row.id}`}
                      value={row.label}
                      onChange={(e) =>
                        updateRow(credits, setCredits, row.id, { label: e.target.value })
                      }
                      placeholder={`Component ${idx + 1}`}
                    />
                  </FormField>
                  <FormField
                    label="Amount (₹)"
                    id={`${baseId}-c-amt-${row.id}`}
                    error={fieldErrors[`${baseId}-c-amt-${row.id}`]}
                  >
                    <Input
                      id={`${baseId}-c-amt-${row.id}`}
                      inputMode="decimal"
                      value={row.amount}
                      onChange={(e) =>
                        updateRow(credits, setCredits, row.id, { amount: e.target.value })
                      }
                    />
                  </FormField>
                  <div className="flex items-end justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={credits.length <= 1}
                      onClick={() =>
                        setCredits(credits.filter((r) => r.id !== row.id))
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setCredits([...credits, emptyLine()])}
            >
              Add payout line
            </Button>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-foreground">
              Deductions (optional)
            </legend>
            <p className="text-xs text-foreground-muted">Examples: loan recovery, asset recovery.</p>
            <div className="space-y-3">
              {deductions.map((row, idx) => (
                <div
                  key={row.id}
                  className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-[1fr_120px_auto]"
                >
                  <FormField label="Label (optional)" id={`${baseId}-d-label-${row.id}`}>
                    <Input
                      id={`${baseId}-d-label-${row.id}`}
                      value={row.label}
                      onChange={(e) =>
                        updateRow(deductions, setDeductions, row.id, { label: e.target.value })
                      }
                      placeholder={`Deduction ${idx + 1}`}
                    />
                  </FormField>
                  <FormField
                    label="Amount (₹)"
                    id={`${baseId}-d-amt-${row.id}`}
                    error={fieldErrors[`${baseId}-d-amt-${row.id}`]}
                  >
                    <Input
                      id={`${baseId}-d-amt-${row.id}`}
                      inputMode="decimal"
                      value={row.amount}
                      onChange={(e) =>
                        updateRow(deductions, setDeductions, row.id, { amount: e.target.value })
                      }
                    />
                  </FormField>
                  <div className="flex items-end justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={deductions.length <= 1}
                      onClick={() =>
                        setDeductions(deductions.filter((r) => r.id !== row.id))
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setDeductions([...deductions, emptyLine()])}
            >
              Add deduction line
            </Button>
          </fieldset>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-subtle p-6 text-sm text-foreground-secondary">
            Add payout lines (and optional deductions) to compute net settlement.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric label="Net settlement (credits − deductions)" value={result.netSettlement} animate />
            <CreditsDeductionsBar credits={result.grossCredits} deductions={result.totalDeductions} />
            <CollapsibleBreakdown defaultOpen>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-foreground-muted">Gross credits</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.grossCredits)}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">Total deductions</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.totalDeductions)}</dd>
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
          Credits: leave encashment ₹1,20,000 + FnF bonus ₹50,000. Deductions: loan recovery ₹20,000.
          Net = ₹1,50,000 (labels are for your clarity; amounts drive the math).
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Why is my net different from HR's statement?",
            answer:
              "HR statements include tax deductions, timing, recoveries, and components you may not have listed here.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}

