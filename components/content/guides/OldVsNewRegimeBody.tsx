import Link from "next/link";
import { ArticleProse } from "@/components/content/ArticleProse";
import { ROUTES } from "@/lib/routes";

export function OldVsNewRegimeBody() {
  return (
    <ArticleProse>
      <p>
        Choosing between the old and new tax regimes is the single biggest tax decision most salaried employees
        in India make each year — and most people make it without running the numbers. The difference in annual
        tax liability can range from negligible to ₹40,000–₹80,000/year at mid-level incomes, entirely
        depending on your specific deduction profile. This guide explains the structural difference and gives
        you a framework for deciding — not a blanket recommendation.
      </p>
      <p>
        <strong>Important:</strong> Tax slabs, standard deductions, and rebate thresholds change with each
        Union Budget. This guide describes the structure as configured for FY 2025-26 in SalaryExit&apos;s
        calculators. Verify current rates at the Income Tax Department&apos;s official portal for filing
        decisions.
      </p>

      <h2 id="what-the-regimes-mean">What old vs new actually means</h2>
      <p>
        The <strong>new regime</strong> (under Section 115BAC, as updated) offers lower progressive slab rates
        but disallows most exemptions and Chapter VI-A deductions. In FY 2025-26, it includes a standard
        deduction of ₹75,000 for salaried employees and a Section 87A rebate that makes tax nil for those
        whose taxable income is ₹12 lakh or less after the standard deduction.
      </p>
      <p>
        The <strong>old regime</strong> has a higher base slab rate but allows you to reduce taxable income
        through deductions: Section 80C (up to ₹1.5L for PF, PPF, ELSS, LIC, home loan principal, etc.),
        80D (health insurance premiums up to ₹25,000 for self and family), 80CCD(1B) (additional ₹50,000
        for NPS), HRA exemption under Section 10(13A), and home loan interest under Section 24(b). It has
        a standard deduction of ₹50,000.
      </p>
      <p>
        The new regime is now the <em>default</em> — if you do not declare a regime to your employer, they
        apply new regime TDS. To opt for the old regime, you must declare it explicitly at the start of the
        financial year (or at the time of joining).
      </p>

      <h2 id="when-old-wins">When the old regime typically produces lower tax</h2>
      <p>
        The old regime tends to win — that is, produce a lower tax liability — when your deductions are
        large enough to offset the lower slabs in the new regime. Common scenarios:
      </p>
      <ul>
        <li>
          You pay significant rent and qualify for HRA exemption. For a ₹18 LPA gross employee paying
          ₹20,000/month rent in a metro, HRA exemption can reduce taxable income by ₹1.5–2L, which is
          substantial enough to swing the comparison.
        </li>
        <li>
          You have a home loan with significant interest outgo (Section 24(b) deduction up to ₹2L for
          self-occupied property). This is a large deduction that only benefits you under the old regime.
        </li>
        <li>
          You maximize 80C (₹1.5L), contribute ₹50,000 to NPS (80CCD(1B)), and pay health insurance
          premiums. If total deductions exceed ₹4–5L, old regime often wins at ₹15–25 LPA gross.
        </li>
      </ul>

      <h2 id="when-new-wins">When the new regime typically produces lower tax</h2>
      <p>
        The new regime tends to win when your actual claimable deductions are modest:
      </p>
      <ul>
        <li>
          You rent at a low amount, or your company&apos;s Basic is structured so that the HRA exemption
          calculation yields a small number.
        </li>
        <li>
          You are young, have minimal 80C investments beyond mandatory EPF (which does not count in new
          regime), and no home loan.
        </li>
        <li>
          Your income is under ₹12L taxable — the 87A rebate under the new regime makes your tax nil
          regardless of deductions.
        </li>
        <li>
          Your income is very high (₹30L+ gross). At these levels, the lower slabs in the new regime
          can outweigh even substantial deductions.
        </li>
      </ul>

      <h2 id="87a-rebate">The Section 87A rebate: zero tax for many at lower-mid incomes</h2>
      <p>
        For FY 2025-26, the new regime&apos;s Section 87A rebate provides a full rebate on income tax
        when taxable income (after the ₹75,000 standard deduction) is ₹12 lakh or less. This means: if
        your gross salary is approximately ₹12.75 LPA or below (₹75,000 standard deduction + ₹12L
        rebate limit), your income tax under the new regime is effectively zero. TDS should be nil or
        near-nil. If your employer is deducting significant TDS at this income level under the new regime,
        verify that your regime declaration has been processed correctly by payroll.
      </p>

      <h2 id="worked-example">A worked example: ₹18 LPA gross</h2>
      <p>
        New regime (FY 2025-26): Gross ₹18L, standard deduction ₹75,000 → taxable income ₹17.25L.
        Tax on ₹17.25L under new regime slabs (approx.) = ~₹2.2L before cess, ~₹2.29L after 4% cess.
        Monthly TDS ≈ ₹19,100.
      </p>
      <p>
        Old regime: Same ₹18L gross, standard deduction ₹50,000, HRA exemption ₹1.4L (typical metro),
        80C ₹1.5L, 80D ₹25,000, NPS 80CCD(1B) ₹50,000 → taxable income ≈ ₹14.1L. Old regime tax ≈
        ₹2.45L after cess. Monthly TDS ≈ ₹20,400.
      </p>
      <p>
        In this case, new regime produces slightly lower tax. But add a home loan with ₹2L interest
        deduction and the old regime flips ahead. The numbers depend heavily on individual deduction
        profiles — which is why there is no universal answer.
      </p>
      <p>
        Run your exact numbers in the{" "}
        <Link href={ROUTES.oldVsNewTaxRegimeCalculator}>old vs new regime comparison calculator</Link>.
        For HRA specifically, use the{" "}
        <Link href={ROUTES.hraCalculator}>HRA exemption calculator</Link> to see what your Section
        10(13A) exemption would be.
      </p>

      <h2 id="telling-employer">How to tell your employer your regime choice</h2>
      <p>
        You communicate your regime choice to your employer via Form 12BB (Declaration by Employee). Most
        large companies have an internal payroll portal where you declare regime at the start of the financial
        year (April) and submit investment proofs in January–February. For the old regime, you will also
        need to provide proof of rent paid (for HRA) and investment details for 80C/80D. Keep documents
        ready for your employer&apos;s verification process.
      </p>
      <p>
        For the filing decision (ITR), you can choose differently from what you declared to your employer —
        and pay or claim the difference as additional tax or refund. But this is a filing-time decision and
        carries its own complexity. For routine salaried employees, aligning declaration and filing choice
        is simpler. Consult a qualified chartered accountant if your situation is complex (multiple income
        sources, capital gains, significant HRA disputes).
      </p>

      <h2 id="what-you-cannot-do">What is not available in the new regime</h2>
      <p>
        These deductions and exemptions are not available if you choose the new regime: HRA exemption
        (Section 10(13A)), LTA exemption (Section 10(5)), professional tax deduction, Section 80C, 80D,
        80E (education loan interest), 80G (donations, with exceptions), home loan interest under Section
        24(b), and most other Chapter VI-A deductions. The new regime does allow employer NPS contributions
        (Section 80CCD(2)) as a deduction — this is worth checking if your employer contributes to NPS
        on your behalf.
      </p>
    </ArticleProse>
  );
}
