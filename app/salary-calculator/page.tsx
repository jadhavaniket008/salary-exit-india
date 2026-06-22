import { SalaryCalculatorClient } from "@/components/calculators/clients/SalaryCalculatorClient";
import { AffiliateCta } from "@/components/monetization/AffiliateCta";
import { CaConsultCta } from "@/components/monetization/CaConsultCta";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("salary");

export default function SalaryCalculatorPage() {
  return (
    <>
      <SalaryCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            How Indian payslip tax is calculated: step by step
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Indian income tax for salaried employees follows a specific sequence. Understanding the steps
            explains why two employees earning the same gross salary can have very different tax liabilities.
          </p>
          <ol className="list-inside list-decimal space-y-3 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Start with annual gross salary.</strong> This is the sum of all salary components
              before any deductions: Basic, HRA, special allowance, LTA, meal allowance, etc.
            </li>
            <li>
              <strong>Subtract the standard deduction.</strong> Under the new regime, ₹75,000 is
              deducted automatically. Under the old regime, ₹50,000. No proofs required for this step.
            </li>
            <li>
              <strong>Subtract declared deductions (old regime only).</strong> 80C investments (up to
              ₹1.5 lakh), HRA exemption (if renting), 80D health insurance premium, home loan interest,
              and other eligible amounts. The new regime does not allow most of these.
            </li>
            <li>
              <strong>The result is taxable income.</strong> Apply the appropriate slab rates to compute
              basic tax liability.
            </li>
            <li>
              <strong>Check Section 87A rebate.</strong> If net taxable income is ≤ ₹7 lakh (old regime)
              or ≤ ₹12 lakh (new regime), the full tax is rebated — effective liability becomes zero.
            </li>
            <li>
              <strong>Add 4% health and education cess</strong> on the tax computed after rebate.
            </li>
            <li>
              <strong>Divide annual tax by 12</strong> to get monthly TDS. Your employer deducts this
              amount each month, adjusting for declarations you submit during the year.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Why Section 80C is the first deduction to maximize under old regime
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Section 80C allows a deduction of up to ₹1,50,000 per year from taxable income. Most
            salaried employees&apos; employee PF contribution already counts towards 80C — meaning if you
            contribute ₹72,000/year to EPF, you only have ₹78,000 of 80C space left to fill with
            other investments like ELSS, PPF, or life insurance premiums.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            At the 30% slab, fully utilizing ₹1.5 lakh of 80C saves approximately ₹46,800 in annual
            tax (including cess). At the 20% slab, the saving is about ₹31,200/year.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Effective tax rate vs marginal tax rate
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            India&apos;s income tax system is progressive: only the income in each slab is taxed at that
            slab&apos;s rate. Saying &quot;I am in the 30% tax bracket&quot; does not mean 30% of your total income
            is taxed — only the income above ₹10 lakh (old) or ₹24 lakh (new) is taxed at 30%.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            For example, a ₹15 LPA gross under the new regime (after ₹75,000 standard deduction, taxable
            income ≈ ₹14.25 lakh) faces a basic tax of approximately ₹1,82,500. That is an effective rate
            of about 12.7% on taxable income — not 25% (the marginal slab rate at ₹14.25 lakh). The
            calculator shows this breakdown so you can see both figures.
          </p>
        </section>

        <CaConsultCta variant="inline" />
        <AffiliateCta context="investing" />
      </div>
    </>
  );
}
