"use client";

import { useMemo, useRef, useState } from "react";
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
import { trackCalculatorStarted, trackCalculatorUse, trackInputModeSelected } from "@/lib/analytics/client";
import {
  computeCtcToInHand,
  CTC_WORKED_EXAMPLE_INPUT,
  deriveGrossFromCtc,
} from "@/lib/calculators/ctc-to-inhand";
import { DEFAULT_TAX_SETTINGS } from "@/lib/config";
import { DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE } from "@/lib/config/professional-tax";
import { formatInr, formatInrPlain } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import { focusFirstInvalidField } from "@/lib/validation/focus-first-invalid";
import type { CtcDecomposeOutput, CtcToInHandInput, CtcToInHandOutput } from "@/types/salary";

const fy = DEFAULT_TAX_SETTINGS.financialYear;

type InputMode = "ctc" | "gross";

export function CtcToInHandCalculatorClient() {
  const ctcWorkedExample = useMemo(() => computeCtcToInHand(CTC_WORKED_EXAMPLE_INPUT), []);
  const [mode, setMode] = useState<InputMode>("ctc");
  const [ctcAnnual, setCtcAnnual] = useState("");
  const [employerPfAnnual, setEmployerPfAnnual] = useState("");
  const [gratuityAnnual, setGratuityAnnual] = useState("");
  const [insuranceAnnual, setInsuranceAnnual] = useState("");
  const [gross, setGross] = useState("");
  const [regime, setRegime] = useState<"old" | "new">("new");
  const [pt, setPt] = useState(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
  const [basicDaAnnual, setBasicDaAnnual] = useState("");
  const [pfAnnual, setPfAnnual] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CtcToInHandOutput | null>(null);
  const [derivedGross, setDerivedGross] = useState<CtcDecomposeOutput | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [compareGross, setCompareGross] = useState("");
  const [compareResult, setCompareResult] = useState<CtcToInHandOutput | null>(null);
  const [compareError, setCompareError] = useState<string | null>(null);

  const hasTrackedStart = useRef(false);
  function markStarted() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackCalculatorStarted("ctcToInHand");
  }

  function handleModeChange(next: InputMode) {
    if (next === mode) return;
    trackInputModeSelected("ctcToInHand", mode, next);
    setMode(next);
    markStarted();
  }

  const assumptionBullets = useMemo(
    () => [
      `Tax computed using ${fy.label} slab settings in code (standard deduction new ₹${formatInrPlain(fy.standardDeductionNewRegime)}, old ₹${formatInrPlain(fy.standardDeductionOldRegime)} for other flows).`,
      `PF: if you omit employee PF, we can derive it from monthly Basic+DA = (Basic+DA annual ÷ 12) using the configured statutory ceiling model.`,
      `Monthly in-hand spreads annual tax evenly — not identical to monthly payslip TDS in all cases.`,
    ],
    []
  );

  function reset() {
    setMode("ctc");
    setCtcAnnual("");
    setEmployerPfAnnual("");
    setGratuityAnnual("");
    setInsuranceAnnual("");
    setGross("");
    setRegime("new");
    setPt(String(DEFAULT_PROFESSIONAL_TAX_ANNUAL_ESTIMATE));
    setBasicDaAnnual("");
    setPfAnnual("");
    setCompareGross("");
    setCompareResult(null);
    setCompareError(null);
    setErrors([]);
    setFieldErrors({});
    setResult(null);
    setDerivedGross(null);
    setShowResult(false);
  }

  function applyPreset(kind: "12l-bda" | "18l-bda" | "12l-pf") {
    setMode("gross");
    setCompareGross("");
    setCompareResult(null);
    setCompareError(null);
    setErrors([]);
    setFieldErrors({});
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
    const nextFieldErrors: Record<string, string> = {};

    let effectiveGross = 0;
    let nextDerivedGross: CtcDecomposeOutput | null = null;
    let employerCostsProvided = false;

    if (mode === "ctc") {
      const c = sanitizeNumber(ctcAnnual, { label: "Annual CTC" });
      if (!c.ok) {
        nextErrors.push(c.error);
        nextFieldErrors.ctc = c.error;
      } else {
        const nn = assertNonNegative("Annual CTC", c.value);
        if (nn) {
          nextErrors.push(nn);
          nextFieldErrors.ctc = nn;
        }
      }

      const empPf =
        employerPfAnnual.trim() === ""
          ? { ok: true as const, value: 0 }
          : sanitizeNumber(employerPfAnnual, { label: "Employer PF (annual)" });
      if (!empPf.ok) {
        nextErrors.push(empPf.error);
        nextFieldErrors["employer-pf"] = empPf.error;
      }

      const grat =
        gratuityAnnual.trim() === ""
          ? { ok: true as const, value: 0 }
          : sanitizeNumber(gratuityAnnual, { label: "Gratuity accrual (annual)" });
      if (!grat.ok) {
        nextErrors.push(grat.error);
        nextFieldErrors.gratuity = grat.error;
      }

      const ins =
        insuranceAnnual.trim() === ""
          ? { ok: true as const, value: 0 }
          : sanitizeNumber(insuranceAnnual, { label: "Insurance & other benefits (annual)" });
      if (!ins.ok) {
        nextErrors.push(ins.error);
        nextFieldErrors.insurance = ins.error;
      }

      if (c.ok && empPf.ok && grat.ok && ins.ok) {
        employerCostsProvided =
          employerPfAnnual.trim() !== "" || gratuityAnnual.trim() !== "" || insuranceAnnual.trim() !== "";
        nextDerivedGross = deriveGrossFromCtc({
          annualCtc: c.value,
          employerPfAnnual: empPf.value,
          gratuityAnnual: grat.value,
          insuranceAndBenefitsAnnual: ins.value,
        });
        effectiveGross = nextDerivedGross.annualGrossSalary;
      }
    } else {
      const g = sanitizeNumber(gross, { label: "Annual gross salary" });
      if (!g.ok) {
        nextErrors.push(g.error);
        nextFieldErrors.gross = g.error;
      } else {
        const nn = assertNonNegative("Annual gross salary", g.value);
        if (nn) {
          nextErrors.push(nn);
          nextFieldErrors.gross = nn;
        }
        effectiveGross = g.value;
      }
    }

    const ptVal = sanitizeNumber(pt, { fallback: 0, label: "Professional tax (annual)" });
    if (!ptVal.ok) {
      nextErrors.push(ptVal.error);
      nextFieldErrors.pt = ptVal.error;
    } else {
      const nn = assertNonNegative("Professional tax (annual)", ptVal.value);
      if (nn) {
        nextErrors.push(nn);
        nextFieldErrors.pt = nn;
      }
    }

    const b =
      basicDaAnnual.trim() === ""
        ? { ok: true as const, value: undefined as number | undefined }
        : sanitizeNumber(basicDaAnnual, { label: "Basic + DA (annual)" });
    if (!b.ok) {
      nextErrors.push(b.error);
      nextFieldErrors.bda = b.error;
    } else if (b.value !== undefined) {
      const nn = assertNonNegative("Basic + DA (annual)", b.value);
      if (nn) {
        nextErrors.push(nn);
        nextFieldErrors.bda = nn;
      }
    }

    const p =
      pfAnnual.trim() === ""
        ? { ok: true as const, value: undefined as number | undefined }
        : sanitizeNumber(pfAnnual, { label: "Employee PF (annual)" });
    if (!p.ok) {
      nextErrors.push(p.error);
      nextFieldErrors.pf = p.error;
    } else if (p.value !== undefined) {
      const nn = assertNonNegative("Employee PF (annual)", p.value);
      if (nn) {
        nextErrors.push(nn);
        nextFieldErrors.pf = nn;
      }
    }

    if (
      p.ok &&
      p.value !== undefined &&
      b.ok &&
      b.value !== undefined
    ) {
      const msg = "Enter either employee PF (annual) or Basic+DA (annual) for PF — not both.";
      nextErrors.push(msg);
      nextFieldErrors.pf = msg;
      nextFieldErrors.bda = msg;
    }

    setErrors(nextErrors);
    setFieldErrors(nextFieldErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      setCompareResult(null);
      setCompareError(null);
      focusFirstInvalidField(
        mode === "ctc"
          ? ["ctc", "employer-pf", "gratuity", "insurance", "pt", "pf", "bda"]
          : ["gross", "pt", "pf", "bda"],
        nextFieldErrors
      );
      return;
    }

    const base: CtcToInHandInput = {
      annualGrossSalary: effectiveGross,
      regime,
      metroCity: false,
      professionalTaxAnnual: ptVal.ok ? ptVal.value : 0,
      basicAndDaAnnual: b.ok && b.value !== undefined ? b.value : undefined,
      employeePfAnnual: p.ok && p.value !== undefined ? p.value : undefined,
    };
    const rawOut = computeCtcToInHand(base);
    const out: CtcToInHandOutput =
      mode === "ctc" && !employerCostsProvided
        ? {
            ...rawOut,
            warnings: [
              ...rawOut.warnings,
              "You didn't enter employer PF, gratuity, or insurance — this estimate treats your full CTC as gross, which overstates in-hand if your employer's CTC bundles those employer-side costs (common).",
            ],
          }
        : rawOut;
    setResult(out);
    setDerivedGross(nextDerivedGross);
    setShowResult(true);
    trackCalculatorUse("ctcToInHand");

    if (compareGross.trim() === "") {
      setCompareResult(null);
      setCompareError(null);
    } else {
      const cg = sanitizeNumber(compareGross, { label: "Compare gross salary" });
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
      intro="Enter your offer-letter CTC and we'll strip out employer PF, gratuity, and insurance to find your real gross before computing tax and in-hand — or switch to gross mode if you already know your taxable gross."
    >
      <p className="text-sm text-foreground-secondary">
        Output is a <strong>modeled estimate</strong> from FY slabs + PF rules in code — not your employer's payroll
        system. Ambiguous inputs are blocked with an explicit message (see accuracy card).
      </p>

      <RequiredInputsCallout
        items={
          mode === "ctc"
            ? [
                "Annual CTC (₹)",
                "Employer PF, gratuity, insurance (annual, ₹) — optional but recommended for an accurate gross",
                "Tax regime",
                "Annual professional tax (₹)",
                "Either employee PF (annual) OR Basic+DA (annual) for PF — not both",
              ]
            : [
                "Annual gross salary (₹)",
                "Tax regime",
                "Annual professional tax (₹)",
                "Either employee PF (annual) OR Basic+DA (annual) for PF — not both",
              ]
        }
      />

      <Card className="space-y-6 p-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">What do you know?</legend>
            <div role="radiogroup" aria-label="What do you know?" className="flex flex-wrap gap-2">
              <Button
                type="button"
                role="radio"
                aria-checked={mode === "ctc"}
                variant={mode === "ctc" ? "primary" : "secondary"}
                onClick={() => handleModeChange("ctc")}
              >
                I know my CTC
              </Button>
              <Button
                type="button"
                role="radio"
                aria-checked={mode === "gross"}
                variant={mode === "gross" ? "primary" : "secondary"}
                onClick={() => handleModeChange("gross")}
              >
                I know my gross salary
              </Button>
            </div>
          </fieldset>

          {mode === "gross" ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <span className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Assumption presets</span>
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
          ) : null}

          {mode === "ctc" ? (
            <>
              <FormField
                label="Annual CTC (₹)"
                id="ctc"
                hint="The headline number from your offer letter — includes employer-side costs."
                error={fieldErrors.ctc}
              >
                <Input
                  id="ctc"
                  inputMode="decimal"
                  value={ctcAnnual}
                  onChange={(e) => {
                    setCtcAnnual(e.target.value);
                    markStarted();
                  }}
                />
              </FormField>
              <FormField
                label="Employer PF (annual, ₹)"
                id="employer-pf"
                hint="Company's PF contribution — check your CTC breakup sheet. Leave blank if unknown."
                error={fieldErrors["employer-pf"]}
              >
                <Input
                  id="employer-pf"
                  inputMode="decimal"
                  value={employerPfAnnual}
                  onChange={(e) => setEmployerPfAnnual(e.target.value)}
                  placeholder="Optional"
                />
              </FormField>
              <FormField
                label="Gratuity accrual (annual, ₹)"
                id="gratuity"
                hint="Often shown as a separate CTC line item — commonly ~4.81% of Basic+DA."
                error={fieldErrors.gratuity}
              >
                <Input
                  id="gratuity"
                  inputMode="decimal"
                  value={gratuityAnnual}
                  onChange={(e) => setGratuityAnnual(e.target.value)}
                  placeholder="Optional"
                />
              </FormField>
              <FormField
                label="Insurance & other benefits (annual, ₹)"
                id="insurance"
                hint="Group health/term insurance premiums or other non-cash CTC components."
                error={fieldErrors.insurance}
              >
                <Input
                  id="insurance"
                  inputMode="decimal"
                  value={insuranceAnnual}
                  onChange={(e) => setInsuranceAnnual(e.target.value)}
                  placeholder="Optional"
                />
              </FormField>
            </>
          ) : (
            <FormField
              label="Annual gross salary (₹)"
              id="gross"
              hint="Your taxable gross basis for this simplified model."
              error={fieldErrors.gross}
            >
              <Input
                id="gross"
                inputMode="decimal"
                value={gross}
                onChange={(e) => {
                  setGross(e.target.value);
                  markStarted();
                }}
              />
            </FormField>
          )}

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">
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
            hint="Replace the default with your state's realistic annual PT if known."
            error={fieldErrors.pt}
          >
            <Input id="pt" inputMode="decimal" value={pt} onChange={(e) => setPt(e.target.value)} />
          </FormField>

          <FormField
            label="Employee PF (annual, ₹)"
            id="pf"
            hint="Leave empty if you will provide Basic+DA instead."
            error={fieldErrors.pf}
          >
            <Input id="pf" inputMode="decimal" value={pfAnnual} onChange={(e) => setPfAnnual(e.target.value)} placeholder="Optional" />
          </FormField>

          <FormField
            label="Basic + DA (annual, ₹)"
            id="bda"
            hint="Used only if PF is omitted — we derive monthly PF wage as (Basic+DA)/12."
            error={fieldErrors.bda}
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
          <div className="rounded-xl border border-dashed border-border bg-surface-subtle p-6 text-sm text-foreground-secondary">
            {mode === "ctc"
              ? "Provide your CTC and PF inputs (one method), then calculate to see estimated in-hand."
              : "Provide gross salary and PF inputs (one method), then calculate to see estimated in-hand."}
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            {mode === "ctc" && derivedGross ? (
              <div className="space-y-3">
                <dl className="space-y-1 rounded-lg border border-border bg-surface-subtle px-4 py-3 font-mono text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground-secondary">Total CTC</dt>
                    <dd className="tabular-nums text-foreground">{formatInr(derivedGross.annualCtc)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground-secondary">− Employer-side costs</dt>
                    <dd className="tabular-nums text-foreground">
                      {formatInr(derivedGross.employerSideCostsAnnual)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-border pt-1 font-semibold">
                    <dt className="text-foreground">= Gross salary</dt>
                    <dd className="tabular-nums text-foreground">{formatInr(result.annualGrossSalary)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foreground-secondary">− Employee deductions and tax</dt>
                    <dd className="tabular-nums text-foreground">
                      {formatInr(result.annualGrossSalary - result.inHandMonthly * 12)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-border pt-1 font-semibold">
                    <dt className="text-foreground">= Estimated in-hand (annual)</dt>
                    <dd className="tabular-nums text-positive">{formatInr(result.inHandMonthly * 12)}</dd>
                  </div>
                </dl>
                <p className="text-sm text-foreground-secondary">
                  Your CTC of <strong>{formatInr(derivedGross.annualCtc)}</strong> breaks down to an estimated{" "}
                  <strong>{formatInr(derivedGross.annualGrossSalary)}</strong> gross after removing employer-side
                  costs (PF, gratuity, insurance). Tax and in-hand below are computed on this gross figure, not
                  on the full CTC.
                </p>
              </div>
            ) : null}
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
                  <dt className="text-foreground-muted">Gross (monthly)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.grossMonthly)}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">Employee PF (monthly)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.employeePfMonthly, { decimals: true })}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">Professional tax (monthly)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.professionalTaxMonthly, { decimals: true })}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">TDS (monthly spread)</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.tdsMonthly, { decimals: true })}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-foreground-muted">Estimated total tax + cess (annual)</dt>
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
                <h3 className="text-sm font-semibold text-foreground">Compared scenario breakdown</h3>
                <CollapsibleBreakdown title="Compared — line items">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-foreground-muted">Gross (monthly)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.grossMonthly)}</dd>
                    </div>
                    <div>
                      <dt className="text-foreground-muted">Employee PF (monthly)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.employeePfMonthly, { decimals: true })}</dd>
                    </div>
                    <div>
                      <dt className="text-foreground-muted">Professional tax (monthly)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.professionalTaxMonthly, { decimals: true })}</dd>
                    </div>
                    <div>
                      <dt className="text-foreground-muted">TDS (monthly spread)</dt>
                      <dd className="font-medium tabular-nums">{formatInr(compareResult.tdsMonthly, { decimals: true })}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-foreground-muted">Estimated total tax + cess (annual)</dt>
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
            question: "Why can't I enter PF and Basic+DA together?",
            answer:
              "The engine needs a single PF source to avoid double-counting. Use payslip PF if you have it; otherwise use Basic+DA to derive PF under configured assumptions.",
          },
          {
            question: "Does this include employer PF or gratuity accrual?",
            answer:
              "In 'I know my CTC' mode, yes — employer PF, gratuity, and insurance you enter are subtracted from CTC before computing gross and in-hand, so they reduce your gross rather than count as spendable cash. In 'I know my gross salary' mode, you're entering the post-employer-cost figure directly, so there's nothing left to subtract.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}

