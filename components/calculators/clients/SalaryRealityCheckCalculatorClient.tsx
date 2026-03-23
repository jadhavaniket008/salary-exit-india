"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SalaryRealityIncomeExpenseBar } from "@/components/charts/SalaryRealityIncomeExpenseBar";
import { ResultReveal } from "@/components/motion/ResultReveal";
import { Button, Card, FormField, Input } from "@/components/ui";
import {
  AssumptionsBlock,
  CalculatorPageLayout,
  CollapsibleBreakdown,
  FaqSection,
  PrimaryMetric,
  RequiredInputsCallout,
  ValidationSummary,
  WorkedExample,
} from "@/components/calculators";
import { SalaryRealityShareBlock } from "@/components/calculators/SalaryRealityShareBlock";
import {
  DEFAULT_BASIC_DA_SHARE_OF_GROSS,
  SALARY_REALITY_EXPENSE_METHODOLOGY,
  getHeuristicMonthlyExpenses,
  lifestyleDescription,
} from "@/lib/config/salary-reality-heuristics";
import { trackOfferCompareClick, trackSalaryRealityCheckUse } from "@/lib/analytics/client";
import { computeSalaryRealityCheck } from "@/lib/calculators/salary-reality-check";
import { formatInr } from "@/lib/format-inr";
import { ROUTES } from "@/lib/routes";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative } from "@/lib/validation/validators";
import type { TaxRegime } from "@/types/salary";
import type { LifestyleLevel, MonthlyExpenseParts, SavingsVerdict } from "@/types/salary-reality";

export type SalaryRealityCheckInitialScenario = {
  annualCtc: number;
  monthlyRent: number;
  metroCity: boolean;
  lifestyle: LifestyleLevel;
};

export type SalaryRealityCheckCalculatorClientProps = {
  /** Pre-fill inputs (e.g. SEO landing pages). */
  initial?: SalaryRealityCheckInitialScenario;
  /** Strip full calculator chrome — use inside article layouts. */
  embed?: boolean;
};

const verdictStyles: Record<SavingsVerdict, string> = {
  high: "border-emerald-300 bg-emerald-50/90 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-50",
  moderate:
    "border-amber-300 bg-amber-50/90 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-50",
  low: "border-orange-300 bg-orange-50/90 text-orange-950 dark:border-orange-900/40 dark:bg-orange-950/25 dark:text-orange-50",
  negative: "border-red-300 bg-red-50/90 text-red-950 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-50",
};

function setExpenseField(
  prev: MonthlyExpenseParts,
  key: keyof MonthlyExpenseParts,
  raw: string,
  set: (next: MonthlyExpenseParts) => void
) {
  const t = raw.trim();
  if (t === "") {
    set({ ...prev, [key]: 0 });
    return;
  }
  const s = sanitizeNumber(raw);
  if (s.ok) set({ ...prev, [key]: s.value });
}

export function SalaryRealityCheckCalculatorClient({
  initial,
  embed = false,
}: SalaryRealityCheckCalculatorClientProps = {}) {
  const [ctc, setCtc] = useState(() =>
    initial ? String(initial.annualCtc) : ""
  );
  const [metro, setMetro] = useState(() => initial?.metroCity ?? true);
  const [rent, setRent] = useState(() =>
    initial ? String(initial.monthlyRent) : ""
  );
  const [lifestyle, setLifestyle] = useState<LifestyleLevel>(
    () => initial?.lifestyle ?? "moderate"
  );
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [basicDaPct, setBasicDaPct] = useState(
    Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100)
  );
  const [expenses, setExpenses] = useState<MonthlyExpenseParts>(() =>
    getHeuristicMonthlyExpenses({
      metroCity: initial?.metroCity ?? true,
      lifestyle: initial?.lifestyle ?? "moderate",
    })
  );

  useEffect(() => {
    setExpenses(getHeuristicMonthlyExpenses({ metroCity: metro, lifestyle }));
  }, [metro, lifestyle]);

  const lifestyleHelp = useMemo(() => lifestyleDescription(lifestyle), [lifestyle]);

  const parsed = useMemo(() => {
    const c = sanitizeNumber(ctc);
    const r = sanitizeNumber(rent);
    if (!c.ok || !r.ok) return { ok: false as const };
    const eC = assertNonNegative("Annual CTC", c.value);
    const eR = assertNonNegative("Monthly rent", r.value);
    const errs = [eC, eR].filter(Boolean) as string[];
    if (errs.length) return { ok: false as const, errors: errs };
    return { ok: true as const, annualCtc: c.value, monthlyRent: r.value };
  }, [ctc, rent]);

  const validationErrors = useMemo(() => {
    const next: string[] = [];
    if (ctc.trim()) {
      const c = sanitizeNumber(ctc);
      if (!c.ok) next.push("Annual CTC (₹): " + c.error);
      else {
        const nn = assertNonNegative("Annual CTC", c.value);
        if (nn) next.push(nn);
      }
    }
    if (rent.trim()) {
      const r = sanitizeNumber(rent);
      if (!r.ok) next.push("Monthly rent (₹): " + r.error);
      else {
        const nn = assertNonNegative("Monthly rent", r.value);
        if (nn) next.push(nn);
      }
    }
    return next;
  }, [ctc, rent]);

  const basicShare = useMemo(() => {
    const p = basicDaPct;
    if (!Number.isFinite(p)) return DEFAULT_BASIC_DA_SHARE_OF_GROSS;
    return Math.min(60, Math.max(10, p)) / 100;
  }, [basicDaPct]);

  const result = useMemo(() => {
    if (!parsed.ok) return null;
    return computeSalaryRealityCheck({
      annualCtc: parsed.annualCtc,
      monthlyRent: parsed.monthlyRent,
      metroCity: metro,
      lifestyle,
      regime,
      basicDaShareOfGross: basicShare,
      monthlyExpenses: expenses,
    });
  }, [parsed, metro, lifestyle, regime, basicShare, expenses]);

  function reset() {
    if (initial) {
      setCtc(String(initial.annualCtc));
      setRent(String(initial.monthlyRent));
      setMetro(initial.metroCity);
      setLifestyle(initial.lifestyle);
      setExpenses(
        getHeuristicMonthlyExpenses({
          metroCity: initial.metroCity,
          lifestyle: initial.lifestyle,
        })
      );
    } else {
      setCtc("");
      setRent("");
      setMetro(true);
      setLifestyle("moderate");
      setExpenses(getHeuristicMonthlyExpenses({ metroCity: true, lifestyle: "moderate" }));
    }
    setRegime("new");
    setBasicDaPct(Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100));
  }

  function resetExpenseDefaults() {
    setExpenses(getHeuristicMonthlyExpenses({ metroCity: metro, lifestyle }));
  }

  const expenseLinesForChart =
    result?.expenseLines.map((x) => ({ label: x.label, amount: x.amount })) ?? [];

  const assumptionBullets = useMemo(
    () => [
      "In-hand uses the same CTC→in-hand engine: tax regime you select, employee PF from Basic+DA (share of gross you set), default annual professional tax placeholder.",
      "Rent is the only housing cost you enter — maintenance, society charges, or EMI are not modeled separately.",
      "Groceries, commute, utilities, and discretionary default from the lifestyle tier table; you can override any line — totals update immediately.",
      "Household size, dependents, debt, and insurance are not modeled — use this as a directional decision view.",
    ],
    []
  );

  const canShowResult = parsed.ok && result;

  const srcUsageTracked = useRef(false);
  useEffect(() => {
    if (!canShowResult || srcUsageTracked.current) return;
    srcUsageTracked.current = true;
    trackSalaryRealityCheckUse({ embed });
  }, [canShowResult, embed]);

  const main = (
    <>
      {!embed ? (
        <>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This is a <strong>decision assistant</strong>: compare whether an offer leaves meaningful savings after a
            transparent spend model. Defaults are visible and editable so nothing feels like a black box.
          </p>

          <RequiredInputsCallout
            items={[
              "Annual CTC (₹) — treated as gross for tax/PF like CTC→in-hand",
              "Metro vs non-metro (commute default band)",
              "Monthly rent (₹)",
              "Lifestyle level (initial values for non-rent spend — override per line if needed)",
            ]}
          />
        </>
      ) : (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Edit the scenario below — CTC, rent, and lifestyle update estimated savings and the verdict instantly.
        </p>
      )}

      <Card className="space-y-6">
        <form
          id="salary-reality-form"
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <FormField
            label="Annual CTC (₹)"
            id="ctc"
            hint="Interpreted as annual gross for tax — align with how you compare offers."
          >
            <Input id="ctc" inputMode="decimal" value={ctc} onChange={(e) => setCtc(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">City</legend>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={metro} onChange={(e) => setMetro(e.target.checked)} />
              Metro area (higher default commute band)
            </label>
          </fieldset>

          <FormField label="Monthly rent (₹)" id="rent" hint="Your actual or expected rent; 0 if not paying rent.">
            <Input id="rent" inputMode="decimal" value={rent} onChange={(e) => setRent(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Lifestyle level (default non-rent bands)
            </legend>
            <div className="flex flex-wrap gap-4 text-sm">
              {(["basic", "moderate", "premium"] as const).map((tier) => (
                <label key={tier} className="inline-flex items-center gap-2 capitalize">
                  <input
                    type="radio"
                    name="lifestyle"
                    checked={lifestyle === tier}
                    onChange={() => setLifestyle(tier)}
                  />
                  {tier}
                </label>
              ))}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              <strong>{lifestyleHelp.title}:</strong> {lifestyleHelp.body}
            </p>
          </fieldset>

          {!embed ? (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900/50">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">How default expenses are chosen</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{SALARY_REALITY_EXPENSE_METHODOLOGY.summary}</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                <strong>Metro vs non-metro:</strong> {SALARY_REALITY_EXPENSE_METHODOLOGY.metroVsNonMetro}
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                <strong>Lifestyle tiers:</strong> {SALARY_REALITY_EXPENSE_METHODOLOGY.tiers}
              </p>
            </div>
          ) : null}

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Tax regime (in-hand)</legend>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="regime"
                  checked={regime === "new"}
                  onChange={() => setRegime("new")}
                />
                New regime
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="regime"
                  checked={regime === "old"}
                  onChange={() => setRegime("old")}
                />
                Old regime
              </label>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              <strong>New</strong> is the default for comparing recent offers (no 80C/HRA detail here).{" "}
              <strong>Old</strong> uses the same slab engine; this screen only includes employee PF in the 80C bucket
              — use the salary breakdown or CTC→in-hand tool for fuller old-regime inputs.
            </p>
          </fieldset>

          <FormField
            label="Basic + DA as % of gross (for PF)"
            id="basic-da-pct"
            hint={
              "Employee PF follows statutory rules on Basic+DA. When your payslip split is unknown, we assume Basic+DA = this share of annual gross (default " +
              Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100) +
              "%). Adjust to match your offer letter."
            }
          >
            <div className="flex flex-wrap items-center gap-3">
              <Input
                id="basic-da-pct"
                inputMode="decimal"
                className="max-w-[7rem]"
                value={Number.isFinite(basicDaPct) ? String(basicDaPct) : ""}
                onChange={(e) => {
                  const s = sanitizeNumber(e.target.value);
                  if (s.ok) setBasicDaPct(s.value);
                  else if (e.target.value.trim() === "") setBasicDaPct(NaN);
                }}
              />
              <span className="text-sm text-zinc-500">% of gross → PF base</span>
            </div>
            {result && result.basicAndDaAnnual != null ? (
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Implied Basic+DA annually: <strong className="tabular-nums">{formatInr(result.basicAndDaAnnual)}</strong>{" "}
                ({(result.basicDaShareOfGross * 100).toFixed(0)}% of CTC).
              </p>
            ) : null}
          </FormField>

          <div className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Monthly spend model (₹)</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Values below default from your tier and city; edit any field — savings update instantly.
                </p>
              </div>
              <Button type="button" variant="secondary" className="text-xs" onClick={resetExpenseDefaults}>
                Reset to tier defaults
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Groceries & essentials" id="exp-groceries" hint="Food and household essentials.">
                <Input
                  id="exp-groceries"
                  inputMode="decimal"
                  value={String(expenses.groceries)}
                  onChange={(e) => setExpenseField(expenses, "groceries", e.target.value, setExpenses)}
                />
              </FormField>
              <FormField
                label="Commute"
                id="exp-commute"
                hint={metro ? "Metro-area default band." : "Non-metro default band."}
              >
                <Input
                  id="exp-commute"
                  inputMode="decimal"
                  value={String(expenses.commute)}
                  onChange={(e) => setExpenseField(expenses, "commute", e.target.value, setExpenses)}
                />
              </FormField>
              <FormField label="Utilities" id="exp-utilities" hint="Power, internet, phone, subscriptions.">
                <Input
                  id="exp-utilities"
                  inputMode="decimal"
                  value={String(expenses.utilities)}
                  onChange={(e) => setExpenseField(expenses, "utilities", e.target.value, setExpenses)}
                />
              </FormField>
              <FormField
                label="Discretionary"
                id="exp-discretionary"
                hint="Dining out, entertainment, misc. discretionary."
              >
                <Input
                  id="exp-discretionary"
                  inputMode="decimal"
                  value={String(expenses.discretionary)}
                  onChange={(e) => setExpenseField(expenses, "discretionary", e.target.value, setExpenses)}
                />
              </FormField>
            </div>
          </div>

          <ValidationSummary messages={validationErrors} />
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={reset}>
              Reset all
            </Button>
          </div>
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!canShowResult ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Enter valid annual CTC and monthly rent to see estimated in-hand, modeled spend, savings, and a verdict.
            Change tax regime, Basic+DA %, or any expense line — numbers update as you type.
          </div>
        ) : (
          <ResultReveal show={!!result}>
            <div
              className={`rounded-2xl border p-4 ${verdictStyles[result.verdict]}`}
              role="status"
            >
              <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Takeaway</p>
              <p className="mt-1 text-lg font-semibold">{result.verdictTitle}</p>
              <p className="mt-2 text-sm leading-relaxed opacity-95">{result.verdictBody}</p>

              <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Why this takeaway</p>
                <p className="mt-2 text-sm leading-relaxed opacity-95">{result.verdictWhy}</p>
              </div>

              <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  What&apos;s driving it
                </p>
                <ul className="mt-2 list-inside list-disc space-y-2 text-sm leading-relaxed opacity-95">
                  {result.verdictDrivingFactors.map((f) => (
                    <li key={f.id}>
                      <strong className="font-medium">{f.label}:</strong> {f.detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Ideas to try</p>
                <ul className="mt-2 list-inside list-disc space-y-2 text-sm leading-relaxed opacity-95">
                  {result.verdictSuggestions.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PrimaryMetric
                label="Estimated monthly in-hand (engine)"
                value={result.inHandMonthly}
                animate
                helperText={`${result.regime === "new" ? "New" : "Old"} regime; PF from Basic+DA (${(result.basicDaShareOfGross * 100).toFixed(0)}% of gross), default PT.`}
              />
              <PrimaryMetric
                label="Estimated monthly savings (after modeled spend)"
                value={result.monthlySavings}
                animate
                helperText={`Savings ratio ≈ ${(result.savingsRatio * 100).toFixed(0)}% of estimated in-hand.`}
              />
            </div>

            {parsed.ok ? (
              <SalaryRealityShareBlock
                annualCtc={parsed.annualCtc}
                inHandMonthly={result.inHandMonthly}
                monthlySavings={result.monthlySavings}
                verdictTitle={result.verdictTitle}
              />
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-semibold uppercase text-zinc-500">Total modeled monthly expenses</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {formatInr(result.totalMonthlyExpenses)}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-xs font-semibold uppercase text-zinc-500">Savings ratio</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-emerald-800 dark:text-emerald-200">
                  {result.inHandMonthly > 0
                    ? `${(result.savingsRatio * 100).toFixed(1)}%`
                    : "—"}
                </p>
                <p className="mt-1 text-xs text-zinc-500">Of estimated in-hand, after modeled spend.</p>
              </div>
            </div>

            <SalaryRealityIncomeExpenseBar
              inHandMonthly={result.inHandMonthly}
              lines={expenseLinesForChart}
              monthlySavings={result.monthlySavings}
            />

            <CollapsibleBreakdown defaultOpen title="Expense breakdown">
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                Rent plus four modeled categories — same numbers as the inputs above. Totals drive savings.
              </p>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                {result.expenseLines.map((line) => (
                  <div key={line.label}>
                    <dt className="text-zinc-500">{line.label}</dt>
                    <dd className="font-medium tabular-nums">{formatInr(line.amount)}</dd>
                  </div>
                ))}
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

      {!embed ? (
        <>
          <AssumptionsBlock bullets={assumptionBullets} />

          <WorkedExample>
            <p>
              Example: CTC ₹18,00,000/year, metro, rent ₹28,000/month, <strong>moderate</strong> lifestyle,{" "}
              <strong>new</strong> regime, Basic+DA {Math.round(DEFAULT_BASIC_DA_SHARE_OF_GROSS * 100)}% of gross. The
              tool estimates in-hand via the same engine as CTC→in-hand, then adds non-rent spend (groceries, commute,
              utilities, discretionary). Edit any line to mirror your budget — the story updates immediately.
            </p>
          </WorkedExample>

          <section className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Next steps</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Refine or compare offers with the same methodology.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => document.getElementById("ctc")?.focus()}>
                Adjust inputs
              </Button>
              <Link
                href={ROUTES.offerComparisonCalculator}
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                onClick={() => trackOfferCompareClick("salary_reality_next_steps")}
              >
                Compare with another offer
              </Link>
              <Link
                href={ROUTES.ctcToInHandCalculator}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
              >
                Open CTC → in-hand detail
              </Link>
            </div>
          </section>

          <FaqSection
            items={[
              {
                question: "Is this my actual bank balance?",
                answer:
                  "No. In-hand is modeled from CTC; expenses are bands you can override. Use it to compare scenarios and city/rent trade-offs.",
              },
              {
                question: "Why does my lifestyle change savings so much?",
                answer:
                  "Non-rent defaults scale with the tier you pick — groceries, commute, utilities, and discretionary all move together in the table until you edit them.",
              },
            ]}
          />
        </>
      ) : null}
    </>
  );

  return embed ? (
    <div id="salary-reality-embed" className="space-y-6">
      {main}
    </div>
  ) : (
    <CalculatorPageLayout
      slug="salaryRealityCheck"
      title="Salary Reality Check"
      intro="Turn CTC into estimated in-hand using the same tax engine as our CTC calculator, then stress-test it against rent and a lifestyle-shaped monthly spend model. Built for job and city decisions — not budgeting precision."
    >
      {main}
    </CalculatorPageLayout>
  );
}
