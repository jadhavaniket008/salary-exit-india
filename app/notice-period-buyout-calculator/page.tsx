import { NoticeBuyoutCalculatorClient } from "@/components/calculators/clients/NoticeBuyoutCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("noticeBuyout");

export default function NoticeBuyoutCalculatorPage() {
  return (
    <>
      <NoticeBuyoutCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            What a notice period buyout is and how it works
          </h2>
          <p className="text-foreground-secondary">
            A notice period buyout (also called PILON — Payment In Lieu Of Notice) occurs when either
            party chooses to waive the obligation to work out the notice period and instead pays the
            equivalent salary. Most Indian employment contracts specify a 30, 60, or 90-day notice period.
          </p>
          <p className="text-foreground-secondary">
            There are two distinct scenarios:
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              <strong>Employee buys out (pays employer):</strong> When you resign and want to leave
              before completing the notice period, you pay the employer a sum equivalent to the notice
              period salary. The new employer sometimes reimburses this as a joining benefit.
            </li>
            <li>
              <strong>Employer buys out (pays employee):</strong> When the company terminates your
              employment and asks you to leave immediately rather than work out the notice. You receive
              the notice period salary as a lump sum in the final settlement.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            How notice buyout is calculated from your salary
          </h2>
          <p className="text-foreground-secondary">
            The buyout amount is typically calculated as: (Gross Monthly Salary ÷ 30) × Number of Days
            of Notice Not Served. Some employers use the calendar days definition (30 days/month), others
            use working days (22–26/month), which can change the amount by 10–15%.
          </p>
          <p className="text-foreground-secondary">
            Your offer letter or HR policy document specifies which definition applies. If it is silent,
            30 calendar days per month is the more common interpretation.
          </p>
          <p className="text-foreground-secondary">
            Example: ₹90,000/month gross salary, 60-day notice period, serving 30 days and buying out
            the remaining 30 days. Buyout amount = (₹90,000 ÷ 30) × 30 = ₹90,000. The new employer
            who reimburses this typically processes it as a non-taxable joining benefit, though
            the treatment varies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Is notice period buyout taxable?
          </h2>
          <p className="text-foreground-secondary">
            When you (the employee) pay the employer notice buyout, this payment is generally not
            deductible from your income for tax purposes — it comes from post-tax money.
          </p>
          <p className="text-foreground-secondary">
            When the employer pays you (termination buyout), it is treated as salary income in the
            year of receipt and is taxable at your applicable slab rate. It will appear in your
            Form 16 and must be declared in your ITR. There is no special exemption for notice pay
            received on termination (unlike gratuity or certain retrenchment compensation under
            Section 10(10B)).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Negotiating notice period and what actually matters
          </h2>
          <p className="text-foreground-secondary">
            Notice period negotiation is one of the more nuanced parts of a job switch. From the
            hiring company&apos;s perspective, they want you early. From your current employer&apos;s perspective,
            they need handover time. From your financial perspective, you care about:
          </p>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              Whether the new employer will reimburse the buyout (get this in writing before resigning)
            </li>
            <li>
              Whether there is a recovery clause in your contract if you leave mid-probation at the
              new job (common in mid-senior roles)
            </li>
            <li>
              The gap between your last salary date from the old employer and your first salary date
              from the new one — this is frequently miscalculated and leads to a month of financial
              stress
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
