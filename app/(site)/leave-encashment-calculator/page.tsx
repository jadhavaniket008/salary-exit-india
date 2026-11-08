import { LeaveEncashmentCalculatorClient } from "@/components/calculators/clients/LeaveEncashmentCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("leaveEncashment");

export default function LeaveEncashmentCalculatorPage() {
  return (
    <>
      <LeaveEncashmentCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Leave encashment: which types of leave can be paid out
          </h2>
          <p className="text-foreground-secondary">
            Indian employment law and company policies recognize several types of leave. Not all of
            them can be encashed — the rules differ by leave type and by the circumstances of separation
            (resignation vs retirement vs death in service).
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
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
          <h2 className="text-xl font-semibold text-foreground">
            How leave encashment is calculated
          </h2>
          <p className="text-foreground-secondary">
            The calculation uses daily salary derived from Basic + Dearness Allowance (not gross):
          </p>
          <p className="rounded-lg border border-border bg-surface-subtle p-4 font-mono text-sm text-foreground">
            Encashment = (Basic + DA per month ÷ 26) × Number of Earned Leave Days
          </p>
          <p className="text-foreground-secondary">
            The divisor of 26 represents working days in a month under Indian labor convention. Some
            companies use 30 days instead, which produces a slightly lower per-day figure.
          </p>
          <p className="text-foreground-secondary">
            Example: Basic+DA ₹40,000/month, 25 accumulated earned leave days. Encashment =
            (₹40,000 ÷ 26) × 25 = ₹38,461.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Tax treatment: retirement vs resignation matters significantly
          </h2>
          <p className="text-foreground-secondary">
            Tax treatment depends on when the payment is received, your employment category and
            the applicable income-tax provisions. This calculator estimates gross encashment only:
            it does not determine your individual tax exemption.
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              <strong>On retirement or death in service:</strong> Special exemption rules apply.
              Eligible government employees generally receive full exemption on retirement; amounts
              paid after death are subject to their own treatment. For eligible non-government
              employees, ₹25,00,000 (₹25 lakh) is a maximum lifetime exemption ceiling, not an
              automatic tax-free payout. The statutory four-way calculation and prior exemptions matter.
            </li>
            <li>
              <strong>During employment (in-service encashment):</strong> Fully taxable as salary income
              in the year of receipt. No exemption available.
            </li>
            <li>
              <strong>On resignation:</strong> Eligible earned-leave encashment paid upon cessation of
              employment may qualify for the applicable leave-encashment exemption, subject to the
              statutory conditions and limits. Indian court decisions have interpreted retirement
              &quot;or otherwise&quot; to include resignation for this purpose. Do not assume either
              complete taxation or complete exemption without checking the circumstances and
              applicable current-year income-tax law.
            </li>
          </ul>
        </section>

        <p className="text-sm text-foreground-secondary">
          Sources:{" "}
          <a className="underline" href="https://www.incometaxindia.gov.in/income-from-salary" target="_blank" rel="noopener noreferrer">
            Income Tax Department salary guide
          </a>
          {" "}and{" "}
          <a className="underline" href="https://incometaxindia.gov.in/Lists/Press%20Releases/Attachments/1139/PressRelease-Increased-limit-for-tax-exemption-on-leave-encashment-for-non-government-salaried-employees-notified-25-5-23.pdf" target="_blank" rel="noopener noreferrer">
            CBDT ₹25 lakh ceiling notification
          </a>.
          These sources explain the historical exemption framework; verify the
          corresponding provisions under current income-tax law for your tax year.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Leave encashment vs using the leave before quitting
          </h2>
          <p className="text-foreground-secondary">
            Some employees can choose to use eligible earned leave during a notice period or
            receive an encashment payment. Approval, notice rules, salary basis, timing and taxes
            vary; neither option is universally financially better:
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              Approved paid leave is generally paid using the employer&apos;s applicable
              leave-pay rules. Encashment may use a narrower wage basis, but do not
              presume every allowance or type of leave is treated identically.
            </li>
            <li>
              Leave taken during notice might count toward service or require notice adjustment,
              depending on employment terms, approval and applicable law. Do not assume
              it automatically extends or shortens your last working date.
            </li>
            <li>
              Eligible leave encashment on resignation may receive tax exemption within
              applicable limits. Compare the actual leave-pay amount, permissible encashment
              and tax treatment using payroll and qualified tax advice; this tool does not
              calculate the exemption.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
