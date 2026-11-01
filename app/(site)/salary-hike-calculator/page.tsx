import Link from "next/link";
import { SalaryHikeCalculatorClient } from "@/components/calculators/clients/SalaryHikeCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("salaryHike");

export default function SalaryHikeCalculatorPage() {
  return (
    <>
      <SalaryHikeCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            What a salary hike percentage does — and does not — tell you
          </h2>
          <p className="text-foreground-secondary">
            This calculator measures the difference between two annual amounts: (new − old) ÷
            old × 100 for the percentage, and new − old for the annual rupee increase.
            Enter CTC in both fields or gross salary in both fields. Mixing the two
            makes the comparison misleading.
          </p>
          <p className="text-foreground-secondary">
            A percentage increase is not a take-home-pay forecast. CTC can include
            employer PF, gratuity, insurance and variable compensation; gross pay
            is different again from cash received after employee PF, professional
            tax and income tax. None of those components is calculated here.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Worked example: ₹12 LPA to ₹15 LPA annual gross
          </h2>
          <p className="text-foreground-secondary">
            Suppose both amounts are annual <strong>gross salary</strong>, not CTC.
            Increasing gross from ₹12,00,000 to ₹15,00,000 gives an exact
            ₹3,00,000 annual increase, or a 25% hike. The monthly gross
            equivalent changes from ₹1,00,000 to ₹1,25,000: an increase of
            ₹25,000 before deductions.
          </p>
          <p className="text-foreground-secondary">
            Those figures do <strong>not</strong> establish a monthly in-hand
            increase. To estimate it, run the{" "}
            <Link href="/ctc-to-in-hand-calculator" className="underline underline-offset-2">
              CTC-to-in-hand calculator
            </Link>{" "}
            twice in <strong>gross salary mode</strong>, once for each annual
            amount, using comparable PF, professional-tax and tax-regime inputs.
            Your employer&apos;s actual payroll deductions may differ.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Why take-home can change differently from the headline hike
          </h2>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              <strong>Salary definition:</strong> An increase in CTC can include
              higher employer-side costs; it is not necessarily the same increase
              in annual gross or fixed cash salary.
            </li>
            <li>
              <strong>Taxable income:</strong> Income-tax calculations depend on
              taxable income, regime and eligibility — not the hike percentage.
              In the FY 2026–27 new regime, the ₹12 lakh rebate benchmark is
              based on eligible <em>taxable income</em>, not ₹12 lakh CTC.
              Marginal relief can apply just above that threshold; it is not
              an automatic jump to full slab tax.
            </li>
            <li>
              <strong>Payroll components:</strong> Employee PF, state
              professional tax, variable pay and the fixed-versus-variable
              split can make two otherwise similar offers produce different
              monthly payouts.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            What to confirm before accepting an appraisal or joining offer
          </h2>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>Request the current and revised annual fixed gross amounts, separately from headline CTC.</li>
            <li>Ask which employer-side contributions are counted inside the CTC figure.</li>
            <li>Confirm the employee PF calculation basis and expected professional-tax deduction.</li>
            <li>Separate guaranteed fixed cash from conditional bonus, incentives and other variable pay.</li>
            <li>Compare estimated monthly in-hand using the same tax and payroll assumptions for both cases.</li>
          </ul>
          <p className="text-foreground-secondary">
            Use the hike percentage here for an apples-to-apples arithmetic
            comparison, then check actual take-home using the dedicated salary
            calculator and your written salary breakup.
          </p>
        </section>
      </div>
    </>
  );
}
