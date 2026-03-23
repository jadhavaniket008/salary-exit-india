import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function WhatReducesInHandBody() {
  return (
    <ArticleProse>
      <p>
        Take-home is gross minus <strong>what the law and your employer take before the salary hits your
        account</strong>, plus any <strong>recoveries</strong> (loans, damage, adjustments). Below is the usual
        order of impact for salaried employees in India — your payslip order may differ.
      </p>

      <h2 id="income-tax">1) Income tax (TDS)</h2>
      <p>
        Often the largest gap between “annual taxable salary” and monthly cash. Regime choice (old vs new),
        deductions, and how your employer smooths TDS across months all matter. Model it:{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new regime</Link>,{" "}
        <Link href={ROUTES.salaryCalculator}>salary / tax breakdown</Link>.
      </p>

      <h2 id="pf">2) Employee PF (EPF)</h2>
      <p>
        Typically a percentage of PF wage (commonly tied to Basic + DA definitions), subject to policy and
        ceilings. It is not “lost” — it is deferred — but it is not spendable this month. Estimate:{" "}
        <Link href={ROUTES.epfCalculator}>EPF calculator</Link>.
      </p>

      <h2 id="pt">3) Professional tax</h2>
      <p>
        State-specific slabs; small per month for many employees but it belongs in reconciliation. It shows up
        on payslip, not in CTC headlines.
      </p>

      <h2 id="other">4) Other deductions and recoveries</h2>
      <p>
        Health insurance premiums, meal card recoveries, transport, advance repayments, and one-off
        adjustments can change a single month dramatically even when annual tax is stable.
      </p>

      <h2 id="timing">5) Timing effects (not a “deduction,” but it changes net pay)</h2>
      <p>
        Joining mid-month, bonus accruals, arrears, and revised declarations can make one month’s net look
        wrong even when annual tax is fine. For a deeper read on interactions between these pieces, see{" "}
        <Link href={`${ROUTES.salaryGuides}/what-affects-in-hand-salary`}>
          what affects in-hand salary (full guide)
        </Link>
        .
      </p>

      <h2 id="practical">What to do with this list</h2>
      <ol>
        <li>
          Build one baseline in <Link href={ROUTES.ctcToInHandCalculator}>CTC → in-hand</Link> with stated
          assumptions.
        </li>
        <li>Reconcile against a real payslip — adjust PF wage and regime first.</li>
        <li>
          Only then compare offers or argue about “good salary” — see{" "}
          <Link href={`${ROUTES.salaryGuides}/how-to-judge-if-a-salary-is-good-in-india`}>
            how to judge if a salary is good
          </Link>
          .
        </li>
      </ol>
    </ArticleProse>
  );
}
