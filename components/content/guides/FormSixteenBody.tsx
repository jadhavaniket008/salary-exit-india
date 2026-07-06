import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function FormSixteenBody() {
  return (
    <ArticleProse>
      <p>
        Form 16 is the single document that reconciles what your employer deducted against what the
        Income Tax Department expects. Most people glance at the final number and file it away — but
        every line on it maps to something on your payslip, and mismatches between the two are the most
        common reason salaried employees get a notice or lose a refund they were owed. This guide walks
        through it section by section.
      </p>

      <h2 id="what-it-is">What Form 16 actually certifies</h2>
      <p>
        Form 16 is a TDS certificate your employer is required to issue for every financial year in which
        tax was deducted from your salary. It has two parts, generated from the TRACES portal using the
        TDS your employer deposited against your PAN:
      </p>
      <ul>
        <li>
          <strong>Part A</strong> — employer and employee PAN/TAN, the period of employment during the
          year, and a quarter-wise summary of tax deducted and deposited with the government (with challan
          identification numbers). This is the proof that TDS was actually paid in, not just deducted.
        </li>
        <li>
          <strong>Part B</strong> — an annexure with your detailed salary breakup and full tax computation.
          This is the part people mean when they say &quot;check your Form 16.&quot;
        </li>
      </ul>

      <h2 id="part-b-line-by-line">Part B, line by line</h2>
      <p>The computation on Part B generally follows this order:</p>
      <ol>
        <li>
          <strong>Gross salary</strong> — basic + allowances + perquisites (Section 17(1), 17(2), 17(3)
          combined). This should be close to your payslip&apos;s annual gross, though timing differences
          (bonus paid in a different month, ESOP perquisite value, rent-free accommodation valuation) can
          create a small gap.
        </li>
        <li>
          <strong>Less: exemptions under Section 10</strong> — HRA exemption, LTA exemption, and similar,
          but only if you are on the <strong>old regime</strong>. Under the new regime, this line is
          usually zero since most Section 10 exemptions do not apply.
        </li>
        <li>
          <strong>Standard deduction under Section 16</strong> — a flat deduction for salaried employees,
          different under old vs new regime (see the{" "}
          <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new regime comparison</Link> for current
          FY figures).
        </li>
        <li>
          <strong>Income chargeable under the head &quot;Salaries&quot;</strong> — gross salary minus the
          two lines above.
        </li>
        <li>
          <strong>Deductions under Chapter VI-A</strong> — 80C, 80D, 80CCD(1B), etc. Populated only if you
          declared the old regime and submitted proofs to payroll during the investment declaration window.
          Under the new regime this section is largely blank except employer NPS contribution (80CCD(2)),
          which remains available in both regimes.
        </li>
        <li>
          <strong>Total taxable income</strong>, followed by <strong>tax on total income</strong> computed
          on the applicable slab (old or new, whichever your employer used for TDS).
        </li>
        <li>
          <strong>Rebate under Section 87A</strong> — brings tax to nil if your taxable income is at or
          below the rebate threshold for the regime and year in question.
        </li>
        <li>
          <strong>Health and education cess</strong>, added after rebate and any surcharge.
        </li>
        <li>
          <strong>Net tax payable</strong> and, at the bottom, <strong>total TDS deducted</strong> — these
          two numbers should match if your employer withheld exactly what was due across the year.
        </li>
      </ol>

      <h2 id="which-regime">Which regime is Form 16 built on</h2>
      <p>
        Since the new regime became the default, your employer applies it to your monthly TDS unless you
        explicitly declared the old regime (typically at the start of the financial year, via an internal
        payroll portal or Form 12BB). Form 16 reflects whichever regime was actually used for TDS — check
        the Chapter VI-A section: if it is populated with 80C/80D figures, you were on the old regime for
        TDS purposes. You are allowed to choose a <em>different</em> regime at the time of filing your
        return than what your employer used for TDS, and settle the difference as additional tax or refund
        — but this adds complexity, so most salaried employees keep declaration and filing regime aligned.
      </p>

      <h2 id="reconcile">Reconciling Form 16 with Form 26AS / AIS</h2>
      <p>
        Before filing, cross-check the TDS figure on Form 16 against <strong>Form 26AS</strong> and the{" "}
        <strong>Annual Information Statement (AIS)</strong>, both available on the income tax e-filing
        portal. These are the department&apos;s own record of tax credited against your PAN, built from
        what employers and banks actually deposited — not what they told you they deducted. If Form 16
        shows tax deducted but 26AS doesn&apos;t reflect it, the department will not give you credit for
        it, regardless of what your payslip says.
      </p>

      <h2 id="common-errors">Common errors to check for</h2>
      <ul>
        <li>
          <strong>TDS deducted but not deposited</strong> — shows as a mismatch between Form 16 and 26AS.
          This is an employer failure; escalate to payroll/finance immediately, since the tax department
          can raise a demand on you for the shortfall even though you never received that money.
        </li>
        <li>
          <strong>Wrong PAN on the challan</strong> — the deducted amount exists but doesn&apos;t reflect
          against your PAN in 26AS. Same escalation path.
        </li>
        <li>
          <strong>Investment proofs submitted late or rejected</strong> — if you declared the old regime
          but your proofs (rent receipts, 80C investments) weren&apos;t processed in time, TDS is computed
          without them, resulting in higher deduction than necessary. You can still claim these deductions
          at filing time even if Form 16 doesn&apos;t reflect them, provided you have the supporting
          documents.
        </li>
      </ul>

      <h2 id="not-covered">What Form 16 does not cover</h2>
      <p>
        Form 16 only certifies salary income and the TDS your employer withheld on it. It does not include
        interest income, capital gains, rental income, or income from a previous employer in the same year
        (each employer issues a separate Form 16 for the period you worked with them). All of this must be
        aggregated separately when filing your return — Form 16 is an input to your ITR, not a substitute
        for it.
      </p>

      <h2 id="timeline">When you should have it, and what to do if you don&apos;t</h2>
      <p>
        Employers are required to issue Form 16 after the financial year closes, generally by mid-June. If
        you haven&apos;t received it and need to file, Form 26AS and AIS on the e-filing portal contain the
        same TDS figures and can be used to reconstruct your salary computation in the interim — follow up
        with payroll for the certificate itself, since some deduction details (exemptions claimed, proofs
        accepted) are easier to verify from Form 16 directly.
      </p>
      <p>
        To sanity-check the salary and tax figures Form 16 should show for your numbers, run them through
        the <Link href={ROUTES.salaryCalculator}>salary & tax breakdown calculator</Link>, and compare old
        vs new regime outcomes with the{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>regime comparison calculator</Link>.
      </p>
    </ArticleProse>
  );
}
