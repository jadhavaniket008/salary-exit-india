import { FinalSettlementCalculatorClient } from "@/components/calculators/clients/FinalSettlementCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("finalSettlement");

export default function FinalSettlementCalculatorPage() {
  return (
    <>
      <FinalSettlementCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            What Full and Final Settlement includes
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Full and Final Settlement (F&F) is the complete payoff an employer makes when an employee
            exits — voluntary resignation, termination, or retirement. It is a single transaction that
            settles all outstanding financial obligations in both directions (employer owes employee,
            and employee may owe employer).
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The typical components of F&F that the employer pays:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><strong>Pending salary</strong> for days worked in the final month up to the last working date.</li>
            <li><strong>Earned leave encashment</strong> for accumulated but unused Privilege/Earned Leave.</li>
            <li><strong>Gratuity</strong> if the employee has completed 5+ years of continuous service.</li>
            <li><strong>Notice pay</strong> if the employer waived the notice period and owes the equivalent salary.</li>
            <li><strong>Performance bonus or variable pay</strong> that was accrued and due at exit (depends on contract).</li>
            <li><strong>Expense reimbursements</strong> still pending (travel, mobile, fuel claims).</li>
            <li><strong>Any retention bonus vested</strong> as of the exit date.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Deductions that the employer typically recovers from F&F
          </h2>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><strong>Notice period shortfall</strong> if you left before completing the required notice.</li>
            <li><strong>Outstanding salary advances or loans</strong> from the employer.</li>
            <li><strong>Training bond recovery</strong> if applicable — common after employer-sponsored certifications or programs with a service commitment clause.</li>
            <li><strong>Excess leave taken</strong> (where you took more leave than accrued — technically a salary advance).</li>
            <li>
              <strong>Property or asset recovery</strong> — in rare cases, damaged company equipment
              or unreturned assets.
            </li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400">
            The employer can only recover amounts that are contractually specified or agreed in
            writing. Withholding salary beyond what is contractually permitted can be contested
            under relevant labor laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Timeline and what to do if F&F is delayed
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            There is no single national law mandating a specific F&F payment timeline for all
            industries, but:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              Most companies process F&F within <strong>30 to 60 days</strong> of the last working
              day. Larger organizations often take longer due to payroll processing cycles and HR
              approval chains.
            </li>
            <li>
              The Payment of Gratuity Act requires gratuity to be paid within <strong>30 days</strong> of
              it becoming payable. Delays beyond this attract interest.
            </li>
            <li>
              EPF balance settlement (transfer or withdrawal) is a separate process from F&F and
              is governed by EPFO timelines — typically 5–20 working days for UAN-linked claims.
            </li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400">
            If F&F is delayed beyond 60 days, the employee can send a written communication to HR
            and the employee&apos;s manager requesting a timeline. Unresolved delays can be escalated to
            the labor commissioner&apos;s office in the relevant state, or through the EPFO grievance portal
            for PF-related disputes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Documents to collect before leaving
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The most overlooked part of exit is document collection. Before your last day, ensure you have:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><strong>Form 16</strong> for the current financial year (issued in June after the FY ends — ensure your ex-employer sends it).</li>
            <li><strong>Relieving letter</strong> and experience certificate — different documents, ensure you receive both.</li>
            <li><strong>EPF UAN passbook</strong> — verify your PF balance reflects all contributions.</li>
            <li><strong>F&F settlement statement</strong> — a line-item breakdown of what was paid and what was recovered.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
