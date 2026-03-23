"use client";

import { useMemo, useState } from "react";
import { InHandBreakdownBars } from "@/components/charts/InHandBreakdownBars";
import { ResultReveal } from "@/components/motion/ResultReveal";
import { Button, Card, FormField, Input } from "@/components/ui";
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
import { computeCtcToInHand, CTC_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/ctc-to-inhand";
import { DEFAULT_TAX_SETTINGS } from "@/lib/config";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";
import { formatInr, formatInrPlain } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { CtcToInHandInput, CtcToInHandOutput } from "@/types/salary";

const fy = DEFAULT_TAX_SETTINGS.financialYear;

export function CtcToInHandCalculatorClient() {
  const ctcWorkedExample = useMemo(() => computeCtcToInHand(CTC_WORKED_EXAMPLE_INPUT), []);
  const [gross, setGross] = useState("");
  const [regime, setRegime] = useState<"old" | "new">("new");
  const [pt, setPt] = useState(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
  const [basicDaAnnual, setBasicDaAnnual] = useState("");
  const [pfAnnual, setPfAnnual] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<CtcToInHandOutput | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [compareGross, setCompareGross] = useState("");
  const [compareResult, setCompareResult] = useState<CtcToInHandOutput | null>(null);
  const [compareError, setCompareError] = useState<string | null>(null);

  const assumptionBullets = useMemo(
    () => [
      `Tax computed using ${fy.label} slab settings in code (standard deduction new ₹${formatInrPlain(fy.standardDeductionNewRegime)}, old ₹${formatInrPlain(fy.standardDeductionOldRegime)} for other flows).`,
      `PF: if you omit employee PF, we can derive it from monthly Basic+DA = (Basic+DA annual ÷ 12) using the configured statutory ceiling model.`,
      `Monthly in-hand spreads annual tax evenly — not identical to monthly payslip TDS in all cases.`,
    ],
    []
  );

  function reset() {
    setGross("");
    setRegime("new");
    setPt(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
    setBasicDaAnnual("");
    setPfAnnual("");
    setCompareGross("");
    setCompareResult(null);
    setCompareError(null);
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function applyPreset(kind: "12l-bda" | "18l-bda" | "12l-pf") {
    setCompareGross("");
    setCompareResult(null);
    setCompareError(null);
    setErrors([]);
    if (kind === "12l-bda") {
      setGross("1200000");
      setRegime("new");
      setPt(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
      setBasicDaAnnual("600000");
      setPfAnnual("");
      return;
    }
    if (kind === "18l-bda") {
      setGross("1800000");
      setRegime("new");
      setPt("2500");
      setBasicDaAnnual("900000");
      setPfAnnual("");
      return;
    }
    setGross("1200000");
    setRegime("new");
    setPt("2400");
    setBasicDaAnnual("");
    setPfAnnual("72000");
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

    const b = basicDaAnnual.trim() === "" ? { ok: true as const, value: undefined as number | undefined } : sanitizeNumber(basicDaAnnual);
    if (!b.ok) nextErrors.push("Basic + DA (annual): " + b.error);
    else if (b.value !== undefined) {
      const nn = assertNonNegative("Basic + DA (annual)", b.value);
      if (nn) nextErrors.push(nn);
    }

    const p = pfAnnual.trim() === "" ? { ok: true as const, value: undefined as number | undefined } : sanitizeNumber(pfAnnual);
    if (!p.ok) nextErrors.push("Employee PF (annual): " + p.error);
    else if (p.value !== undefined) {
      const nn = assertNonNegative("Employee PF (annual)", p.value);
      if (nn) nextErrors.push(nn);
    }

    if (
      p.ok &&
      p.value !== undefined &&
      b.ok &&
      b.value !== undefined
    ) {
      nextErrors.push(
        "Provide either employee PF (annual) **or** Basic+DA (annual) for PF estimation — not both."
      );
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      setCompareResult(null);
      setCompareError(null);
      return;
    }

    const base: CtcToInHandInput = {
      annualGrossSalary: g.ok ? g.value : 0,
      regime,
      metroCity: false,
      professionalTaxAnnual: ptVal.ok ? ptVal.value : 0,
      basicAndDaAnnual: b.ok && b.value !== undefined ? b.value : undefined,
      employeePfAnnual: p.ok && p.value !== undefined ? p.value : undefined,
    };
    const out = computeCtcToInHand(base);
    setResult(out);
    setShowResult(true);
    trackCalculatorUse("ctcToInHand");

    if (compareGross.trim() === "") {
      setCompareResult(null);
      setCompareError(null);
    } else {
      const cg = sanitizeNumber(compareGross);
      if (!cg.ok) {
        setCompareError(cg.error);
        setCompareResult(null);
      } else {
        const nn = assertNonNegative("Compare gross salary", cg.value);
        if (nn) {
          setCompareError(nn);
          setCompareResult(null);
        } else {
          setCompareError(null);
          setCompareResult(computeCtcToInHand({ ...base, annualGrossSalary: cg.value }));
        }
      }
    }
  }

  return (
    <CalculatorPageLayout
      slug="ctcToInHand"
      title="CTC to in-hand calculator"
      intro="Estimate monthly take-home from annual gross using centralized tax + PF logic. If you only know Basic+DA, we can derive PF; if you know PF, enter it directly."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Output is a <strong>modeled estimate</strong> from FY slabs + PF rules in code — not your employer’s payroll
        system. Ambiguous inputs are blocked with an explicit message (see accuracy card).
      </p>

      <RequiredInputsCallout
        items={[
          "Annual gross salary (₹)",
          "Tax regime",
          "Annual professional tax (₹)",
          "Either employee PF (annual) OR Basic+DA (annual) for PF — not both",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Assumption presets</span>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => applyPreset("12l-bda")}>
                ₹12L — BDA-derived PF
              </Button>
              <Button type="button" variant="secondary" onClick={() => applyPreset("18l-bda")}>
                ₹18L — worked-example split
              </Button>
              <Button type="button" variant="secondary" onClick={() => applyPreset("12l-pf")}>
                ₹12L — payslip PF ₹72k
              </Button>
            </div>
          </div>

          <FormField label="Annual gross salary (₹)" id="gross" hint="Your taxable gross basis for this simplified model.">
            <Input id="gross" inputMode="decimal" value={gross} onChange={(e) => setGross(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Tax regime
            </legend>
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
            hint="Replace the default with your state’s realistic annual PT if known."
          >
            <Input id="pt" inputMode="decimal" value={pt} onChange={(e) => setPt(e.target.value)} />
          </FormField>

          <FormField
            label="Employee PF (annual, ₹)"
            id="pf"
            hint="Leave empty if you will provide Basic+DA instead."
            error={undefined}
          >
            <Input id="pf" inputMode="decimal" value={pfAnnual} onChange={(e) => setPfAnnual(e.target.value)} placeholder="Optional" />
          </FormField>

          <FormField
            label="Basic + DA (annual, ₹)"
            id="bda"
            hint="Used only if PF is omitted — we derive monthly PF wage as (Basic+DA)/12."
          >
            <Input id="bda" inputMode="decimal" value={basicDaAnnual} onChange={(e) => setBasicDaAnnual(e.target.value)} placeholder="Optional" />
          </FormField>

          <FormField
            label="Compare gross (annual, ₹) — optional"
            id="compare-gross"
            hint="Uses the same PT / PF path as above but swaps gross — useful for two offer amounts."
            error={compareError ?? undefined}
          >
            <Input
              id="compare-gross"
              inputMode="decimal"
              value={compareGross}
              onChange={(e) => setCompareGross(e.target.value)}
              placeholder="e.g. second offer gross"
            />
          </FormField>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Provide gross salary and PF inputs (one method), then calculate to see estimated in-hand.
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <div className={`grid gap-4 ${compareResult ? "sm:grid-cols-2" : ""}`}>
              <PrimaryMetric
                label="Estimated monthly in-hand"
                value={result.inHandMonthly}
                animate
                helperText="Computed as gross/12 − PF/12 − PT/12 − (annual tax ÷ 12)."
              />
              {compareResult ? (
                <PrimaryMetric
                  label="Compared scenario — monthly in-hand"
                  value={compareResult.inHandMonthly}
                  animate
                  helperText={`Same PT/PF inputs, gross ${formatInr(compareResult.annualGrossSalary)} / year.`}
                />
              ) : null}
            </div>
            <CollapsibleBreakdown>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-zinc-500">Gross (monthly)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.grossMonthly)}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Employee PF (monthly)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.employeePfMonthly, { decimals: true })}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Professional tax (monthly)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.professionalTaxMonthly, { decimals: true })}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">TDS (monthly spread)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.tdsMonthly, { decimals: true })}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-zinc-500">Estimated total tax + cess (annual)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.estimatedTotalTaxAnnual)}</dd>
                </div>
              </dl>
              <ul className="mt-3 list-inside list-disc text-sm text-amber-900 dark:text-amber-100/90">
                {result.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </CollapsibleBreakdown>
            <InHandBreakdownBars
              grossMonthly={result.grossMonthly}
              rows={[
                { label: "Est. in-hand", amount: result.inHandMonthly, tone: "net" },
                { label: "Employee PF", amount: result.employeePfMonthly, tone: "deduct" },
                { label: "Professional tax", amount: result.professionalTaxMonthly, tone: "deduct" },
                { label: "TDS (spread)", amount: result.tdsMonthly, tone: "deduct" },
              ]}
            />
            {compareResult ? (
              <>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Compared scenario breakdown</h3>
                <CollapsibleBreakdown title="Compared — line items">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-zinc-500">Gross (monthly)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.grossMonthly)}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Employee PF (monthly)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.employeePfMonthly, { decimals: true })}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Professional tax (monthly)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.professionalTaxMonthly, { decimals: true })}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">TDS (monthly spread)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.tdsMonthly, { decimals: true })}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-zinc-500">Estimated total tax + cess (annual)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.estimatedTotalTaxAnnual)}</dd>
                    </div>
                  </dl>
                </CollapsibleBreakdown>
                <InHandBreakdownBars
                  title="Compared — where monthly gross goes"
                  grossMonthly={compareResult.grossMonthly}
                  rows={[
                    { label: "Est. in-hand", amount: compareResult.inHandMonthly, tone: "net" },
                    { label: "Employee PF", amount: compareResult.employeePfMonthly, tone: "deduct" },
                    { label: "Professional tax", amount: compareResult.professionalTaxMonthly, tone: "deduct" },
                    { label: "TDS (spread)", amount: compareResult.tdsMonthly, tone: "deduct" },
                  ]}
                />
              </>
            ) : null}
          </ResultReveal>
        )}
      </section>

      <AssumptionsBlock bullets={assumptionBullets} />

      <WorkedExample>
        <p>
          Engine snapshot: gross {formatInr(CTC_WORKED_EXAMPLE_INPUT.annualGrossSalary)}/year, new regime, PT{" "}
          {formatInr(CTC_WORKED_EXAMPLE_INPUT.professionalTaxAnnual)}/year, Basic+DA{" "}
          {formatInr(CTC_WORKED_EXAMPLE_INPUT.basicAndDaAnnual ?? 0)}/year (PF derived). Estimated monthly in-hand{" "}
          {formatInr(ctcWorkedExample.inHandMonthly, { decimals: true })}. Cross-check by entering annual PF from
          payslips instead of Basic+DA.
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Why can’t I enter PF and Basic+DA together?",
            answer:
              "The engine needs a single PF source to avoid double-counting. Use payslip PF if you have it; otherwise use Basic+DA to derive PF under configured assumptions.",
          },
          {
            question: "Does this include employer PF or gratuity accrual?",
            answer:
              "No. It uses employee-side deductions and income-tax estimate on gross — adjust gross if your CTC definition differs.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
