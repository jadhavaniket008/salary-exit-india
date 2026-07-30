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
import { computeNoticeBuyout, NOTICE_WORKED_EXAMPLE_INPUT } from "@/lib/calculators/notice-buyout";
import { formatInr } from "@/lib/format-inr";
import { sanitizeNumber } from "@/lib/validation/sanitize";
import { assertNonNegative, isValidMonthYear } from "@/lib/validation/validators";
import { focusFirstInvalidField } from "@/lib/validation/focus-first-invalid";
import type { NoticeDayCountMethod, NoticeSalaryBasis } from "@/types/notice";

const months = [
  { v: 1, label: "January" },
  { v: 2, label: "February" },
  { v: 3, label: "March" },
  { v: 4, label: "April" },
  { v: 5, label: "May" },
  { v: 6, label: "June" },
  { v: 7, label: "July" },
  { v: 8, label: "August" },
  { v: 9, label: "September" },
  { v: 10, label: "October" },
  { v: 11, label: "November" },
  { v: 12, label: "December" },
];

export function NoticeBuyoutCalculatorClient() {
  const now = new Date();
  const [gross, setGross] = useState("");
  const [salaryBasis, setSalaryBasis] = useState<NoticeSalaryBasis>("gross");
  const [noticeDays, setNoticeDays] = useState("");
  const [dayCountMethod, setDayCountMethod] = useState<NoticeDayCountMethod>("calendar");
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));
  const [workingDays, setWorkingDays] = useState("");
  const [customDivisor, setCustomDivisor] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<typeof computeNoticeBuyout> | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);

  const assumptionBullets = useMemo(
    () => [
      "Buyout = (gross monthly ÷ days in selected calendar month) × notice days.",
      "Some contracts use fixed 30-day months or working days — this tool uses calendar days.",
    ],
    []
  );

  const noticeWorkedExample = useMemo(() => computeNoticeBuyout(NOTICE_WORKED_EXAMPLE_INPUT), []);

  function reset() {
    setGross("");
    setSalaryBasis("gross");
    setNoticeDays("");
    setDayCountMethod("calendar");
    setMonth(String(now.getMonth() + 1));
    setYear(String(now.getFullYear()));
    setWorkingDays("");
    setCustomDivisor("");
    setErrors([]);
    setFieldErrors({});
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];
    const nextFieldErrors: Record<string, string> = {};

    const g = sanitizeNumber(gross, { label: "Gross monthly salary" });
    if (!g.ok) {
      nextErrors.push(g.error);
      nextFieldErrors.gross = g.error;
    } else {
      const nn = assertNonNegative("Gross monthly salary", g.value);
      if (nn) {
        nextErrors.push(nn);
        nextFieldErrors.gross = nn;
      }
    }

    const n = sanitizeNumber(noticeDays, { label: "Notice days" });
    if (!n.ok) {
      nextErrors.push(n.error);
      nextFieldErrors.ndays = n.error;
    } else {
      const nn = assertNonNegative("Notice days", n.value);
      if (nn) {
        nextErrors.push(nn);
        nextFieldErrors.ndays = nn;
      }
    }

    let mInt = 0;
    let yInt = 0;
    if (dayCountMethod === "calendar") {
      const mo = sanitizeNumber(month, { label: "Month" });
      const yr = sanitizeNumber(year, { label: "Year" });
      if (!mo.ok) {
        nextErrors.push(mo.error);
        nextFieldErrors.month = mo.error;
      }
      if (!yr.ok) {
        nextErrors.push(yr.error);
        nextFieldErrors.year = yr.error;
      }
      mInt = mo.ok ? Math.trunc(mo.value) : 0;
      yInt = yr.ok ? Math.trunc(yr.value) : 0;
      if (mo.ok && yr.ok && !isValidMonthYear(mInt, yInt)) {
        const msg = "Choose a valid month and year.";
        nextErrors.push(msg);
        nextFieldErrors.year = msg;
      }
    }

    let workingDaysVal: number | undefined;
    if (dayCountMethod === "workingDays") {
      const w = sanitizeNumber(workingDays, { label: "Working days in the month" });
      if (!w.ok) {
        nextErrors.push(w.error);
        nextFieldErrors["working-days"] = w.error;
      } else {
        const nn = assertNonNegative("Working days in the month", w.value);
        if (nn) {
          nextErrors.push(nn);
          nextFieldErrors["working-days"] = nn;
        }
        workingDaysVal = w.value;
      }
    }

    let customDivisorVal: number | undefined;
    if (dayCountMethod === "custom") {
      const c = sanitizeNumber(customDivisor, { label: "Custom divisor" });
      if (!c.ok) {
        nextErrors.push(c.error);
        nextFieldErrors["custom-divisor"] = c.error;
      } else {
        const nn = assertNonNegative("Custom divisor", c.value);
        if (nn) {
          nextErrors.push(nn);
          nextFieldErrors["custom-divisor"] = nn;
        }
        customDivisorVal = c.value;
      }
    }

    setErrors(nextErrors);
    setFieldErrors(nextFieldErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      focusFirstInvalidField(
        ["gross", "ndays", "month", "year", "working-days", "custom-divisor"],
        nextFieldErrors
      );
      return;
    }

    const out = computeNoticeBuyout({
      grossMonthlySalary: g.ok ? g.value : 0,
      salaryBasis,
      noticeDays: n.ok ? n.value : 0,
      dayCountMethod,
      month: mInt,
      year: yInt,
      workingDaysInMonth: workingDaysVal,
      customDivisor: customDivisorVal,
    });

    setResult(out);
    setShowResult(true);
    trackCalculatorUse("noticeBuyout");
  }

  return (
    <CalculatorPageLayout
      slug="noticeBuyout"
      title="Notice period buyout calculator"
      intro="Estimate buyout by choosing the salary basis and day-count method your contract actually uses — calendar days, a fixed 30-day month, working days, or a custom divisor."
    >
      <p className="text-sm text-foreground-secondary">
        This is a <strong>gross</strong> estimate — taxes and recoveries are not applied (see accuracy card).
      </p>

      <RequiredInputsCallout
        items={[
          "Monthly salary basis (Basic, gross, or a custom figure) and amount (₹)",
          "Notice days to buy out",
          "Day-count method your contract uses (calendar month, fixed 30 days, working days, or custom)",
        ]}
      />

      <Card className="space-y-6 p-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">Salary basis</legend>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="salaryBasis" checked={salaryBasis === "gross"} onChange={() => setSalaryBasis("gross")} />
                Gross monthly
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="salaryBasis" checked={salaryBasis === "basic"} onChange={() => setSalaryBasis("basic")} />
                Basic only
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="salaryBasis" checked={salaryBasis === "custom"} onChange={() => setSalaryBasis("custom")} />
                Custom (per my contract)
              </label>
            </div>
            <p className="text-xs text-foreground-secondary">
              Most contracts use gross monthly salary — check your appointment letter's exact wording before
              assuming.
            </p>
          </fieldset>

          <FormField
            label={
              salaryBasis === "basic"
                ? "Monthly Basic salary (₹)"
                : salaryBasis === "custom"
                  ? "Monthly amount, per your contract (₹)"
                  : "Gross monthly salary (₹)"
            }
            id="gross"
            error={fieldErrors.gross}
          >
            <Input id="gross" inputMode="decimal" value={gross} onChange={(e) => setGross(e.target.value)} />
          </FormField>

          <FormField label="Notice days" id="ndays" error={fieldErrors.ndays}>
            <Input id="ndays" inputMode="decimal" value={noticeDays} onChange={(e) => setNoticeDays(e.target.value)} />
          </FormField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-foreground">Day-count method</legend>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="dayCountMethod" checked={dayCountMethod === "calendar"} onChange={() => setDayCountMethod("calendar")} />
                Actual calendar days
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="dayCountMethod" checked={dayCountMethod === "fixed30"} onChange={() => setDayCountMethod("fixed30")} />
                Fixed 30-day month
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="dayCountMethod" checked={dayCountMethod === "workingDays"} onChange={() => setDayCountMethod("workingDays")} />
                Working days
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="dayCountMethod" checked={dayCountMethod === "custom"} onChange={() => setDayCountMethod("custom")} />
                Custom divisor
              </label>
            </div>
          </fieldset>

          {dayCountMethod === "calendar" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Month" id="month" error={fieldErrors.month}>
                <select
                  id="month"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((m) => (
                    <option key={m.v} value={m.v}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Year" id="year" error={fieldErrors.year}>
                <Input id="year" inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value)} />
              </FormField>
            </div>
          ) : null}

          {dayCountMethod === "workingDays" ? (
            <FormField
              label="Working days in the month"
              id="working-days"
              hint="Count only days your company treats as working days for this purpose."
              error={fieldErrors["working-days"]}
            >
              <Input
                id="working-days"
                inputMode="decimal"
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
              />
            </FormField>
          ) : null}

          {dayCountMethod === "custom" ? (
            <FormField
              label="Custom divisor (days)"
              id="custom-divisor"
              hint="Whatever number your contract or HR specifies for prorating a month."
              error={fieldErrors["custom-divisor"]}
            >
              <Input
                id="custom-divisor"
                inputMode="decimal"
                value={customDivisor}
                onChange={(e) => setCustomDivisor(e.target.value)}
              />
            </FormField>
          ) : null}

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-subtle p-6 text-sm text-foreground-secondary">
            Choose the month that your policy uses for day-counting (often the month of exit).
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric label="Estimated notice buyout (gross)" value={result.buyoutAmount} animate />
            <CollapsibleBreakdown>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-foreground-muted">Divisor used</dt>
                  <dd className="font-medium">{result.daysInMonth}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">Daily rate</dt>
                  <dd className="font-medium tabular-nums">{formatInr(result.dailyRate, { decimals: true })}</dd>
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
          Engine snapshot: {formatInr(NOTICE_WORKED_EXAMPLE_INPUT.grossMonthlySalary)}/month gross,{" "}
          {NOTICE_WORKED_EXAMPLE_INPUT.noticeDays} notice days, month {NOTICE_WORKED_EXAMPLE_INPUT.month}/
          {NOTICE_WORKED_EXAMPLE_INPUT.year} ({noticeWorkedExample.daysInMonth} days). Daily rate{" "}
          {formatInr(noticeWorkedExample.dailyRate, { decimals: true })} → buyout{" "}
          {formatInr(noticeWorkedExample.buyoutAmount)} gross.
        </p>
      </WorkedExample>

      <FaqSection
        items={[
          {
            question: "Which day-count method should I pick?",
            answer:
              "Check your appointment letter or ask HR — contracts commonly use actual calendar days, a flat 30-day month, or working days only. The method changes the daily rate, so guessing wrong can be off by a few thousand rupees.",
          },
          {
            question: "Should I use Basic or gross salary?",
            answer:
              "Most Indian contracts define notice pay on gross monthly salary, but some specify Basic only. This is one of the most commonly disputed points in an exit — confirm it explicitly rather than assuming.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}

