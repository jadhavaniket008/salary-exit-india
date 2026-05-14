import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function WhatAffectsInHandBody() {
  return (
    <ArticleProse>
      <p>
        Your monthly in-hand is the output of five largely independent systems: how your employer defines gross,
        the PF wage your payroll team uses, the professional tax slab in your state, the income tax regime you
        have declared, and any timing effects in that particular month. Change one input in any of these systems
        and your take-home shifts — sometimes by several thousand rupees — without your CTC changing at all.
      </p>

      <h2 id="gross-definition">1. How your employer defines &quot;gross&quot; — and why it matters</h2>
      <p>
        Gross salary is not a standardized term across Indian companies. In one company, &quot;gross&quot; means
        Basic + HRA + Special Allowance paid monthly. In another, it includes quarterly variable pay divided by
        12. In a third, it includes the employer&apos;s PF contribution in the CTC but not in the monthly gross
        for payroll.
      </p>
      <p>
        Why does this matter? Because TDS is computed on projected annual taxable income, which your employer
        derives from some definition of gross. If quarterly bonuses are smoothed into monthly TDS calculations,
        your take-home in non-bonus months is lower than if they were excluded. Ask payroll what is included in
        their annual income projection before your TDS is set at the beginning of the financial year.
      </p>

      <h2 id="pf-wage">2. PF wage: the single most overlooked driver of monthly cash</h2>
      <p>
        Employee PF is computed as 12% of PF wage, which most employers define as Basic + DA. The difference
        between a company that caps PF wage at ₹15,000/month (statutory ceiling) versus one that uses full
        Basic can be dramatic:
      </p>
      <ul>
        <li>At Basic = ₹20,000/month: PF deduction = ₹2,400/month (same regardless of cap at this level).</li>
        <li>At Basic = ₹40,000/month with statutory cap: PF deduction = ₹1,800/month.</li>
        <li>At Basic = ₹40,000/month without cap: PF deduction = ₹4,800/month.</li>
      </ul>
      <p>
        The ₹3,000/month difference at this Basic level compounds over a year to ₹36,000. Some employees
        prefer the capped arrangement because it leaves more monthly cash; others prefer the uncapped one
        because it builds a larger EPF corpus. Neither is universally correct — it depends on your other
        savings and liquidity goals. Use the{" "}
        <Link href={ROUTES.epfCalculator}>EPF calculator</Link> to model both scenarios.
      </p>

      <h2 id="professional-tax">3. Professional tax: small but state-specific</h2>
      <p>
        Professional tax is levied by state governments and applies to salaried employees in most (not all)
        states. Common deduction structures: Maharashtra deducts ₹200/month (₹300 in February, total ₹2,400/year)
        for employees earning above ₹10,000/month. Karnataka deducts ₹200/month above a threshold. Some states
        — Rajasthan, Delhi, and others — do not levy professional tax at all.
      </p>
      <p>
        It is a small amount but it appears on your payslip, and any calculator that does not ask for your state
        is making an assumption. SalaryExit tools ask for PT explicitly or note the assumed value clearly.
      </p>

      <h2 id="tax-regime">4. Tax regime and deductions: the largest swing for most people</h2>
      <p>
        For a ₹15 LPA gross employee in FY 2025-26, choosing the new tax regime vs the old tax regime can
        produce different annual tax liabilities — sometimes by ₹20,000–₹60,000/year depending on HRA
        exemption, 80C investments, and home loan interest. Monthly TDS differences of ₹1,500–₹5,000 are
        common in the mid-income bands where this choice is most contested.
      </p>
      <p>
        The new regime has a standard deduction of ₹75,000 (FY 2025-26) and lower slab rates but disallows
        most Chapter VI-A deductions. The old regime has a standard deduction of ₹50,000 but allows HRA
        exemption, 80C (up to ₹1.5L), 80D, NPS (80CCD(1B)), and home loan interest. For someone paying
        significant rent and maximizing 80C, the old regime often wins. For someone with no major deductions,
        the new regime is usually simpler and equally or more favorable.
      </p>
      <p>
        This is not a decision to make once and forget. Run an explicit comparison before declaring to your
        employer at the start of each financial year:{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>
          old vs new tax regime comparison
        </Link>
        .
      </p>

      <h2 id="tds-smoothing">5. TDS smoothing and why monthly payslips can confuse you</h2>
      <p>
        Most employers compute annual tax at the start of the year, divide it by 12, and deduct an equal amount
        each month. This works cleanly when income is uniform. It breaks down in several ways:
      </p>
      <ul>
        <li>
          <strong>Mid-year declarations:</strong> If you switch regime mid-year or add an investment proof in
          December, your employer recalculates annual tax and adjusts the remaining monthly TDS — causing a
          jump in one month&apos;s deduction or a lower deduction for the rest of the year.
        </li>
        <li>
          <strong>Bonus months:</strong> A ₹2L bonus in October increases annual taxable income, and if
          your employer adds this to the annual income for TDS purposes, TDS rises for the rest of the year
          even if the bonus is a one-time event.
        </li>
        <li>
          <strong>Salary revisions:</strong> An increment in July means higher gross for 9 months, which
          changes the annual income estimate — and TDS recalculates from that month forward.
        </li>
      </ul>
      <p>
        This is why a single month&apos;s payslip may not match an annual calculator result divided by 12.
        Annual-view tools are more reliable for planning.
      </p>

      <h2 id="timing-effects">6. Timing effects that change one month without changing the year</h2>
      <p>
        Joining mid-month is the most common surprise: if you join on the 15th, payroll often pays only the
        second half of the month, making your first payslip look wrong. It corrects the next month. Similarly,
        arrears (paid when a salary revision is processed late) spike one month&apos;s gross and can push TDS
        disproportionately in that month. Leave encashment at year-end, notice period recovery, and
        full-and-final settlement amounts all appear outside the regular monthly cycle.
      </p>

      <h2 id="what-to-do">What you can actually control</h2>
      <ul>
        <li>
          <strong>Regime declaration:</strong> Do this early and revisit annually. Form 12BB at the start of
          the financial year tells your employer which regime to apply for TDS.
        </li>
        <li>
          <strong>PF wage:</strong> In some companies, you can opt for a higher or lower PF contribution
          (Voluntary PF). Understand your employer&apos;s policy before assuming the default is optimal.
        </li>
        <li>
          <strong>Investment proofs:</strong> Submit on time. Late submissions cause rushed TDS adjustments
          in January–March that distort those months&apos; take-home.
        </li>
        <li>
          <strong>Offer letter structure:</strong> At the time of negotiating a new job, the Basic+DA split
          and PF wage definition are sometimes negotiable — especially for senior roles. Understanding their
          cash-flow impact lets you negotiate more precisely.
        </li>
      </ul>
      <p>
        Tools to model specific variables:{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand</Link>,{" "}
        <Link href={ROUTES.salaryCalculator}>full salary breakdown</Link>,{" "}
        <Link href={ROUTES.hraCalculator}>HRA exemption</Link>. For the deduction-by-deduction breakdown, see{" "}
        <Link href={`${ROUTES.salaryGuides}/what-reduces-your-in-hand-salary`}>
          what reduces your in-hand salary
        </Link>
        .
      </p>
    </ArticleProse>
  );
}
