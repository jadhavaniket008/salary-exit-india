import { LeaveEncashmentCalculatorClient } from "@/components/calculators/clients/LeaveEncashmentCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("leaveEncashment");

export default function LeaveEncashmentCalculatorPage() {
  return (
    <>
      <LeaveEncashmentCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Leave encashment: which types of leave can be paid out
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Indian employment law and company policies recognize several types of leave. Not all of
            them can be encashed — the rules differ by leave type and by the circumstances of separation
            (resignation vs retirement vs death in service).
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Earned Leave / Privilege Leave (PL/EL):</strong> This is the most commonly
              encashable leave type. It accrues at a rate specified in the company policy (commonly
              1.25 to 1.5 days per month). Most companies allow encashment of accumulated but unused PL
              at the time of separation. Some allow partial encashment during employment.
            </li>
            <li>
              <strong>Casual Leave (CL):</strong> Typically not carried forward and not encashable.
              CL not used in the calendar year lapses.
            </li>
            <li>
              <strong>Sick Leave (SL):</strong> Usually not encashable; some government organizations
              allow limited encashment on retirement.
            </li>
            <li>
              <strong>Compensatory Off (Comp Off):</strong> May or may not be encashable depending on
              company policy. Usually time-bound — unused comp offs lapse after a defined period.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            How leave encashment is calculated
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The calculation uses daily salary derived from Basic + Dearness Allowance (not gross):
          </p>
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm dark:border-zinc-800 dark:bg-zinc-900">
            Encashment = (Basic + DA per month ÷ 26) × Number of Earned Leave Days
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The divisor of 26 represents working days in a month under Indian labor convention. Some
            companies use 30 days instead, which produces a slightly lower per-day figure.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Example: Basic+DA ₹40,000/month, 25 accumulated earned leave days. Encashment =
            (₹40,000 ÷ 26) × 25 = ₹38,461.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Tax treatment: retirement vs resignation matters significantly
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The tax treatment of leave encashment differs sharply depending on how you leave the organization:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>On retirement or death in service:</strong> Government employees get full exemption.
              Private sector employees can claim exemption up to ₹25,00,000 (₹25 lakh) — this limit
              was revised significantly upward in 2023 from the earlier ₹3 lakh limit. The exemption
              applies to Earned/Privilege Leave encashment only.
            </li>
            <li>
              <strong>During employment (in-service encashment):</strong> Fully taxable as salary income
              in the year of receipt. No exemption available.
            </li>
            <li>
              <strong>On resignation:</strong> Fully taxable as salary in the year of receipt. The
              ₹25 lakh exemption only applies at retirement. This is a significant financial difference
              and often not well understood by employees planning exits.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Leave encashment vs using the leave before quitting
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Many employees face a choice near resignation: take the remaining earned leave before the
            last day, or receive encashment. The financial math often favors using leave before quitting:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              Using earned leave as paid time off means your full gross salary (including all
              allowances) continues to be paid — encashment is computed only on Basic+DA.
            </li>
            <li>
              Using leave extends your effective last date, which can help with notice period
              compliance and PF/gratuity calculation in some cases.
            </li>
            <li>
              Encashment on resignation is taxable as salary with no exemption — whereas simply
              receiving your normal salary while on earned leave is taxed the same way but uses
              the full gross computation.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
