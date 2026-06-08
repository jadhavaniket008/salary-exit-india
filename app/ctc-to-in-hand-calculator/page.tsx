import { CtcToInHandCalculatorClient } from "@/components/calculators/clients/CtcToInHandCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("ctcToInHand");

export default function CtcToInHandCalculatorPage() {
  return (
    <>
      <CtcToInHandCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            CTC, gross salary, and in-hand: what each term actually means
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>CTC (Cost to Company)</strong> is everything your employer spends on your employment: your
            gross salary, the employer&apos;s share of provident fund, gratuity accrual, and insurance premiums.
            It is a cost figure for the company, not an income figure for you.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>Gross salary</strong> is CTC minus employer contributions. This is the taxable earnings
            base your income-tax liability is computed on. It is what HR uses when they say &quot;your salary
            is ₹12 LPA&quot; — but it is still not what lands in your account.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>Net / in-hand / take-home</strong> is gross minus four statutory deductions: income tax
            (TDS), employee share of provident fund (PF), professional tax, and — for some employees — ESI.
            This is the number that matters for budgeting.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            The four deductions that shrink your gross salary
          </h2>
          <ul className="list-inside list-disc space-y-3 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Income tax (TDS):</strong> Your employer deducts tax at source monthly, spreading the
              annual liability across 12 instalments. The amount depends on your declared regime (old or new),
              investment proofs you submit, and HRA claims. This is often the largest single deduction above
              ₹7 LPA.
            </li>
            <li>
              <strong>Employee PF (provident fund):</strong> Mandatory at 12% of your PF wage (which is
              Basic+DA or ₹15,000 ceiling, whichever your employer uses). On a ₹12 LPA gross with Basic at
              50%, this is roughly ₹6,000/month.
            </li>
            <li>
              <strong>Professional tax:</strong> A state levy, typically ₹200–250/month in most states.
              Maharashtra levies up to ₹2,500/year. Some states do not levy PT at all (Delhi, Haryana).
            </li>
            <li>
              <strong>ESI (Employee State Insurance):</strong> Applicable only if gross salary is ₹21,000/month
              or below — 0.75% of gross. Above that threshold, ESI does not apply.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Why the old and new tax regime produce different in-hand amounts
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Under the <strong>new tax regime</strong> (default from FY 2024-25 onwards), the slabs are lower
            but most deductions are not available. Standard deduction is ₹75,000. No 80C, no HRA exemption,
            no home loan interest deduction.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Under the <strong>old tax regime</strong>, slabs are higher but you can claim 80C (up to
            ₹1.5 lakh), HRA exemption (if renting), home loan interest, and several other deductions. If
            your total deductions exceed roughly ₹4–5 lakh, the old regime often saves more tax.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            For most employees earning below ₹12–15 LPA with no active investment claims, the new regime
            now typically produces a higher or equal in-hand figure. Above ₹20 LPA with aggressive 80C
            and HRA claims, the old regime often still wins.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Why your payslip may not match this calculator&apos;s output
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This calculator computes an estimate from financial-year slabs and statutory rules. Your
            employer&apos;s payroll system may differ in three specific ways:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>PF wage definition:</strong> Some employers use a flat ₹15,000 wage ceiling for PF
              (lower deduction). Others use actual Basic+DA without capping (higher deduction). This single
              difference can change monthly in-hand by ₹1,000–3,000.
            </li>
            <li>
              <strong>TDS timing:</strong> Employers smooth TDS over the year but often recalibrate in
              Q3/Q4 after you submit investment declarations. January–March payslips may show higher
              deductions to recover under-withheld tax from earlier months.
            </li>
            <li>
              <strong>Variable pay:</strong> Bonus, performance pay, and quarterly components are usually
              excluded from the base monthly gross calculation.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
