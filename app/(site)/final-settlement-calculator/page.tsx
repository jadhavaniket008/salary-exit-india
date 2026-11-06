import { FinalSettlementCalculatorClient } from "@/components/calculators/clients/FinalSettlementCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("finalSettlement");

export default function FinalSettlementCalculatorPage() {
  return (
    <>
      <FinalSettlementCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            What may appear in a full-and-final (FnF) statement
          </h2>
          <p className="text-foreground-secondary">
            A final-settlement statement may include salary due for days worked, eligible earned-leave
            encashment, gratuity, bonus or variable pay due under your terms, reimbursements, and
            proposed recoveries. Each component has its own eligibility, tax and payment rules.
            A balance on an HR statement is not automatically the amount legally payable or the
            amount that will reach your bank account.
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li><strong>Wages due</strong> for the final work period, based on actual service and applicable law.</li>
            <li><strong>Leave encashment</strong> for eligible accrued leave, depending on applicable law and policy.</li>
            <li><strong>Gratuity</strong> where applicable; the usual five-year rule has important exceptions, including qualifying fixed-term employment, death and disablement.</li>
            <li><strong>Bonus, incentives and reimbursements</strong> if earned and payable under the relevant terms.</li>
            <li><strong>Notice-pay adjustments</strong>, if contractually claimed or payable, subject to legal verification.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Check every recovery before treating it as a deduction
          </h2>
          <p className="text-foreground-secondary">
            HR may list a claimed notice-period recovery, a salary advance, an outstanding loan,
            or an asset-related amount. A line appearing in the statement or appointment letter
            does not by itself prove that the amount is enforceable or may be deducted from wages.
            Section 18 of the Code on Wages, 2019 restricts deductions from wages to those
            authorised under the Code.
          </p>
          <p className="text-foreground-secondary">
            Ask for the written contract clause, the number of unserved notice days, the salary
            basis and daily-rate divisor used, and the legal basis for any proposed deduction.
            Keep statutory wages due separate from disputed contractual recovery claims.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Payment deadlines are component-specific
          </h2>
          <p className="text-foreground-secondary">
            Under section 17(2) of the Code on Wages, 2019, wages payable on resignation,
            dismissal, retrenchment or closure-related unemployment are generally due within
            two working days, subject to the Code&apos;s exceptions and any applicable other-law
            deadline. That rule is about <strong>wages</strong>, not a blanket two-day deadline
            for every item in a full-and-final statement.
          </p>
          <p className="text-foreground-secondary">
            Gratuity, bonus, reimbursements, statutory-fund claims and disputed recoveries may
            follow different rules and processes. If payment is delayed, ask payroll to
            identify which components remain outstanding and why; escalate a wage or gratuity
            dispute through the appropriate labour authority where necessary.
          </p>
          <p className="text-sm text-foreground-secondary">
            Official sources:{" "}
            <a className="underline" href="https://www.labour.gov.in/static/uploads/2025/06/c328da14bbb15fc4ad571dc33e7a4ab3.pdf" target="_blank" rel="noopener noreferrer">Code on Wages, 2019 (sections 17–18)</a>
            {" "}and{" "}
            <a className="underline" href="https://www.labour.gov.in/static/uploads/2026/01/de4758d5bfeffc456d7de97a801891b0.pdf" target="_blank" rel="noopener noreferrer">Ministry of Labour FAQs</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">What this calculator actually does</h2>
          <p className="text-foreground-secondary">
            The calculator only adds the credit amounts you enter and subtracts the deduction
            amounts you enter. It does not establish entitlements, validate a recovery,
            calculate statutory gratuity, determine tax withholding or verify payment deadlines.
            For Episode #15&apos;s fictional example, ₹90,000 of leave credit minus ₹70,000
            of <strong>HR-claimed</strong> notice recovery gives a ₹20,000 balance of those
            two entries only, before any other credits, deductions or taxes.
          </p>
          <p className="text-foreground-secondary">
            Ask HR for an itemised statement and written explanation before accepting or
            contesting the total. Preserve your appointment letter, final payslip, earned
            leave record, Form 16 / tax records, and any correspondence about notice waiver.
          </p>
        </section>
      </div>
    </>
  );
}
