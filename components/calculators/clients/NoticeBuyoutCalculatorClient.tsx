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
  const [noticeDays, setNoticeDays] = useState("");
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));

  const [errors, setErrors] = useState<string[]>([]);
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
    setNoticeDays("");
    setMonth(String(now.getMonth() + 1));
    setYear(String(now.getFullYear()));
    setErrors([]);
    setResult(null);
    setShowResult(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: string[] = [];

    const g = sanitizeNumber(gross);
    if (!g.ok) nextErrors.push("Gross monthly salary: " + g.error);
    else {
      const nn = assertNonNegative("Gross monthly salary", g.value);
      if (nn) nextErrors.push(nn);
    }

    const n = sanitizeNumber(noticeDays);
    if (!n.ok) nextErrors.push("Notice days: " + n.error);
    else {
      const nn = assertNonNegative("Notice days", n.value);
      if (nn) nextErrors.push(nn);
    }

    const mo = sanitizeNumber(month);
    const yr = sanitizeNumber(year);
    if (!mo.ok) nextErrors.push("Month: " + mo.error);
    if (!yr.ok) nextErrors.push("Year: " + yr.error);
    const mInt = mo.ok ? Math.trunc(mo.value) : 0;
    const yInt = yr.ok ? Math.trunc(yr.value) : 0;
    if (mo.ok && yr.ok && !isValidMonthYear(mInt, yInt)) {
      nextErrors.push("Month/year must be a valid calendar month.");
    }

    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setResult(null);
      setShowResult(false);
      return;
    }

    const out = computeNoticeBuyout({
      grossMonthlySalary: g.ok ? g.value : 0,
      noticeDays: n.ok ? n.value : 0,
      month: mInt,
      year: yInt,
    });

    setResult(out);
    setShowResult(true);
    trackCalculatorUse("noticeBuyout");
  }

  return (
    <CalculatorPageLayout
      slug="noticeBuyout"
      title="Notice period buyout calculator"
      intro="Estimate buyout as gross monthly pay prorated by the number of days in a chosen calendar month. Your contract may define a different method."
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        This is a <strong>gross</strong> estimate — taxes and recoveries are not applied (see accuracy card).
      </p>

      <RequiredInputsCallout
        items={[
          "Gross monthly salary (₹)",
          "Notice days to buy out",
          "Calendar month + year (to determine days-in-month)",
        ]}
      />

      <Card className="space-y-6">
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <FormField label="Gross monthly salary (₹)" id="gross">
            <Input id="gross" inputMode="decimal" value={gross} onChange={(e) => setGross(e.target.value)} />
          </FormField>

          <FormField label="Notice days" id="ndays">
            <Input id="ndays" inputMode="decimal" value={noticeDays} onChange={(e) => setNoticeDays(e.target.value)} />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Month" id="month">
              <select
                id="month"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
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
            <FormField label="Year" id="year">
              <Input id="year" inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value)} />
            </FormField>
          </div>

          <ValidationSummary messages={errors} />
          <FormActions onReset={reset} />
        </form>
      </Card>

      <section aria-live="polite" className="space-y-4">
        {!showResult || !result ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white/50 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-400">
            Choose the month that your policy uses for day-counting (often the month of exit).
          </div>
        ) : (
          <ResultReveal show={showResult && !!result}>
            <PrimaryMetric label="Estimated notice buyout (gross)" value={result.buyoutAmount} animate />
            <CollapsibleBreakdown>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-zinc-500">Days in month</dt>
                  <dd className="font-medium">{result.daysInMonth}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Daily rate</dt>
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
            question: "Why pick a month?",
            answer:
              "This model divides by the calendar days in that month. February vs March changes the daily rate.",
          },
        ]}
      />
    </CalculatorPageLayout>
  );
}
