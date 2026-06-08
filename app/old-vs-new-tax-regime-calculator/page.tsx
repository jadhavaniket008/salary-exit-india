import { TaxRegimeCalculatorClient } from "@/components/calculators/clients/TaxRegimeCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("taxRegime");

export default function TaxRegimeCalculatorPage() {
  return (
    <>
      <TaxRegimeCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Old vs new tax regime: what actually changed in FY 2024-25
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            India now operates two parallel income tax systems for individuals. From FY 2024-25, the
            new regime is the <em>default</em> — you must actively opt out to use the old one. The
            fundamental difference: the new regime offers lower slab rates but strips out most deductions
            and exemptions. The old regime has higher slab rates but allows HRA, 80C, 80D, home loan
            interest, NPS, and dozens of other deductions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            New regime tax slabs (FY 2025-26)
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Income up to ₹4 lakh: nil. ₹4–8 lakh: 5%. ₹8–12 lakh: 10%. ₹12–16 lakh: 15%.
            ₹16–20 lakh: 20%. ₹20–24 lakh: 25%. Above ₹24 lakh: 30%. A standard deduction of
            ₹75,000 is available. The Section 87A rebate means zero tax for income up to ₹12 lakh
            (before cess) under the new regime.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Health and education cess of 4% applies on top of computed tax. The effective tax at exactly
            ₹12 lakh taxable income (after standard deduction) under the new regime is nil.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Old regime: what you can claim and where it still wins
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The old regime slabs: up to ₹2.5 lakh nil, ₹2.5–5 lakh at 5%, ₹5–10 lakh at 20%,
            above ₹10 lakh at 30%. Standard deduction is ₹50,000.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Key deductions available under old regime that are not available under new:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Section 80C (up to ₹1.5 lakh):</strong> EPF contribution, ELSS funds, PPF, life
              insurance premiums, NSC, home loan principal repayment, children&apos;s tuition fees.
            </li>
            <li>
              <strong>HRA exemption (Section 10(13A)):</strong> Significant for employees paying rent,
              especially in metros (up to 50% of Basic+DA can be exempt).
            </li>
            <li>
              <strong>Section 80D:</strong> Health insurance premiums (up to ₹25,000 self + family;
              ₹50,000 for senior citizen parents).
            </li>
            <li>
              <strong>Home loan interest (Section 24b):</strong> Up to ₹2 lakh per year for
              self-occupied property.
            </li>
            <li>
              <strong>NPS via 80CCD(1B):</strong> Additional ₹50,000 deduction over and above 80C.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Who typically benefits from each regime
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>New regime typically wins for:</strong> Employees earning below ₹12 LPA (the
            rebate makes it zero-tax territory), younger employees without large investment portfolios
            or home loans, employees who do not pay significant rent, and those who find ITR filing
            simpler without maintaining proofs.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>Old regime typically still wins for:</strong> Employees paying metro rent above
            ₹15,000–20,000/month, those with active home loan EMIs, individuals maxing out 80C and
            80D with genuine investments, and those earning above ₹15 LPA with structured deduction
            portfolios. The cross-over point depends heavily on HRA, as that exemption often has the
            largest impact.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The real-world decision is more nuanced than math alone: the new regime removes the need
            to submit investment declarations, chase rent receipts, and prove insurance payments — that
            administrative simplicity has real value for many employees.
          </p>
        </section>
      </div>
    </>
  );
}
