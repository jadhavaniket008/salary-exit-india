import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function FinalSettlementChecklistBody() {
  return (
    <ArticleProse>
      <p>
        A full-and-final (F&amp;F) statement is a useful record of the credits your employer
        proposes to pay and the amounts it proposes to recover. It is not itself proof
        that every recovery is lawful or that the balance shown is your guaranteed bank credit.
      </p>

      <h2 id="what-it-includes">What to look for in a settlement statement</h2>
      <ul>
        <li><strong>Final wages</strong> for days worked; reconcile the dates and payslip.</li>
        <li><strong>Earned-leave encashment</strong> where applicable; check eligibility, leave balance, rate and tax.</li>
        <li>
          <strong>Gratuity</strong> when applicable, including exceptions to the usual
          five-year rule — see the <Link href={ROUTES.gratuityCalculator}>gratuity calculator</Link>.
        </li>
        <li><strong>Bonus, incentive and reimbursement</strong> items, where earned or contractually payable.</li>
        <li>
          <strong>Notice-period recovery claimed</strong> by the employer, if any. Check
          the clause, unserved days, wage basis and legal validity; the{" "}
          <Link href={ROUTES.noticePeriodBuyoutCalculator}>notice buyout calculator</Link>
          {" "}only estimates an amount under the method you choose.
        </li>
        <li><strong>Other claimed recoveries</strong>, such as advances or equipment, with written evidence.</li>
      </ul>

      <h2 id="timeline">Which payment timeline applies?</h2>
      <p>
        Section 17(2) of the Code on Wages, 2019 generally requires wages payable following
        resignation and certain other separations to be paid within two working days,
        subject to its qualifications and applicable other-law deadlines. That wage-payment
        rule does not mean every gratuity, bonus, reimbursement or disputed contractual
        recovery must be resolved within the same two days.
      </p>
      <p>
        Ask payroll for a component-wise payment date and reason for any delay. Gratuity,
        statutory-fund claims and other items have their own rules. There is no reliable
        single blanket &quot;30–60 days for all FnF&quot; rule to rely on.
        Refer to the{" "}
        <a href="https://www.labour.gov.in/static/uploads/2025/06/c328da14bbb15fc4ad571dc33e7a4ab3.pdf">
          official Code on Wages
        </a>.
      </p>

      <h2 id="what-people-miss">Before signing a no-dues or settlement acceptance</h2>
      <ul>
        <li>Ask HR for the itemised written breakup and reconcile wage days with your records.</li>
        <li>Check eligible earned-leave days and the precise calculation basis.</li>
        <li>Verify gratuity eligibility, the last-drawn statutory wage base and any allowance add-back.</li>
        <li>Check notice days, contract wording and statutory restrictions before accepting any recovery.</li>
        <li>Confirm pending expense claims, any tax withheld, and which records will appear in Form 16.</li>
        <li>Save the offer/appointment letter, leave balance, settlement statement and payroll correspondence.</li>
      </ul>

      <p>
        The <Link href={ROUTES.finalSettlementCalculator}>final settlement calculator</Link>
        {" "}adds credits and subtracts deductions that <strong>you enter</strong>.
        It does not automatically calculate legal entitlements, tax, notice enforceability
        or mandatory settlement deadlines.
      </p>
    </ArticleProse>
  );
}
