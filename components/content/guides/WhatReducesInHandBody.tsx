import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function WhatReducesInHandBody() {
  return (
    <ArticleProse>
      <p>
        Take-home pay is what remains after a series of deductions — some statutory, some policy-driven, some
        one-time. The order matters because each item reduces the base for the next calculation in certain
        cases. Here is the complete deduction waterfall in the order of impact for most Indian salaried
        employees, with concrete numbers so you understand the magnitude of each line.
      </p>

      <h2 id="income-tax">1. Income tax (TDS) — often the largest deduction above ₹8 LPA gross</h2>
      <p>
        TDS is the income tax your employer withholds on your behalf and deposits with the government. For FY
        2025-26 under the new regime:
      </p>
      <ul>
        <li>
          At ₹10 LPA gross: after the ₹75,000 standard deduction, taxable income is ~₹9.25L. The Section
          87A rebate (available when taxable income is ≤ ₹12L) makes annual tax approximately nil — TDS
          should be close to zero if your employer has declared you under the new regime.
        </li>
        <li>
          At ₹15 LPA gross: taxable income ~₹14.25L. New regime tax (after standard deduction, before
          cess) is around ₹1.5–1.7L annually depending on exact components — roughly ₹13,000–14,000/month
          in TDS.
        </li>
        <li>
          At ₹25 LPA gross: tax liability rises substantially. Monthly TDS can reach ₹35,000–₹45,000
          depending on regime, HRA exemption, and deductions claimed.
        </li>
      </ul>
      <p>
        The regime you declare to your employer is what drives TDS. If your employer has not received a
        regime declaration from you, they may default to new regime (as per current CBDT guidance) — which
        may not be optimal for you. Declare explicitly via Form 12BB at the start of the financial year. Use
        the{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>regime comparison tool</Link> before you decide.
      </p>

      <h2 id="epf">2. Employee PF — a forced saving, but it reduces monthly cash</h2>
      <p>
        Employee PF is 12% of PF wage (usually Basic + DA, sometimes capped at ₹15,000/month). At common
        salary structures:
      </p>
      <ul>
        <li>Basic = ₹18,000/month: employee PF = ₹2,160/month.</li>
        <li>Basic = ₹35,000/month (uncapped PF wage): employee PF = ₹4,200/month.</li>
        <li>Basic = ₹35,000/month (capped at ₹15,000): employee PF = ₹1,800/month.</li>
      </ul>
      <p>
        It is not lost money — it accumulates in your EPF account with interest — but it is not available for
        rent or groceries this month. Companies that cap PF wage at ₹15,000/month often do so to give employees
        higher monthly cash; companies with uncapped PF wage provide stronger retirement savings but lower
        take-home. The{" "}
        <Link href={ROUTES.epfCalculator}>EPF calculator</Link> helps you model both.
      </p>

      <h2 id="professional-tax">3. Professional tax — state-specific, small but real</h2>
      <p>
        Professional tax is capped by the Constitution at ₹2,500/year. Most states that levy it collect
        ₹200/month or less. Maharashtra: ₹200/month for most salary bands (₹300 in February). Karnataka:
        ₹200/month above a threshold. Delhi, Rajasthan, and some other states: no professional tax. This is
        a small number but it appears on every payslip and should not be ignored in reconciliation.
      </p>

      <h2 id="health-insurance">4. Employee health insurance premium — varies by employer</h2>
      <p>
        If your employer offers group health insurance with an employee contribution (common in many mid-size
        and large companies), the premium is deducted from salary. This ranges from ₹300–₹2,000/month
        depending on coverage level, number of dependents enrolled, and employer co-pay policy. Some
        employers pay the entire premium; others split it. Check your offer letter for the deduction structure.
      </p>

      <h2 id="flexible-components">5. Unclaimed flexible benefit plan amounts</h2>
      <p>
        Many companies include a &quot;Flexible Benefit Plan&quot; or &quot;Meal Card&quot; component in
        gross. If you don&apos;t submit the required bills or activate the benefit, the amount is often
        paid as taxable cash — which means more TDS than if you had claimed the benefit. This is not a
        new deduction, but it can increase your effective tax deduction compared to someone who submits
        proofs on time.
      </p>

      <h2 id="recoveries">6. One-time recoveries — joining bonus clawback, loan, advances</h2>
      <p>
        If you received a joining bonus with a clawback clause and leave before the specified period, the
        recovery is processed through payroll — sometimes netting against a single month&apos;s salary and
        creating a negative payslip or a very low take-home in that month. Similarly, salary advances, travel
        advances, and company loans are recovered through payroll. These are not recurring, but they can
        significantly distort one month&apos;s net pay.
      </p>

      <h2 id="notice-recovery">7. Notice period recovery — for early exit</h2>
      <p>
        If you leave before serving the full contractual notice period, the shortfall is often deducted from
        your full-and-final settlement. The deduction is computed on gross (sometimes only on Basic — check
        your contract). This is processed as a one-time adjustment, not a monthly deduction, but it reduces
        the cash you receive at separation. Estimate the impact with the{" "}
        <Link href={ROUTES.noticePeriodBuyoutCalculator}>notice period buyout calculator</Link>.
      </p>

      <h2 id="practical">What you can do about each deduction</h2>
      <ol>
        <li>
          <strong>TDS:</strong> Declare the right regime with correct proofs. This is the highest-leverage
          action — potentially ₹1,000–₹5,000/month impact.
        </li>
        <li>
          <strong>PF:</strong> Understand your employer&apos;s PF wage cap policy. If it is capped at
          ₹15,000/month and you want higher EPF contributions, you can opt for Voluntary PF (VPF) which is
          also deductible under 80C.
        </li>
        <li>
          <strong>PT:</strong> Nothing to do — it is statutory and state-mandated. Just include it in
          your budgeting.
        </li>
        <li>
          <strong>Flexible benefits:</strong> Submit bills on time. Meal cards, LTA claims, and medical
          reimbursements reduce your taxable income when properly claimed.
        </li>
        <li>
          <strong>Joining bonus:</strong> Read the clawback period before you sign. Model the recovery
          amount before accepting.
        </li>
      </ol>
      <p>
        For a structured estimate of your monthly cash, use the{" "}
        <Link href={ROUTES.ctcToInHandCalculator}>CTC to in-hand calculator</Link>. For the full annual
        salary and tax picture, use the{" "}
        <Link href={ROUTES.salaryCalculator}>salary breakdown calculator</Link>. For context on why
        these numbers feel different in different months, read{" "}
        <Link href={`${ROUTES.salaryGuides}/what-affects-in-hand-salary`}>
          what affects in-hand salary
        </Link>
        .
      </p>
    </ArticleProse>
  );
}
