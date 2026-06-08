import { EpfCalculatorClient } from "@/components/calculators/clients/EpfCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("epf");

export default function EpfCalculatorPage() {
  return (
    <>
      <EpfCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            What EPF is and why it shows up on your payslip twice
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The Employees&apos; Provident Fund (EPF) is a mandatory retirement savings scheme under the
            Employees&apos; Provident Funds and Miscellaneous Provisions Act, 1952. Both you and your employer
            contribute — which is why most payslips show two PF lines: &quot;Employee PF&quot; (deducted from your
            gross) and &quot;Employer PF&quot; (an additional cost that may or may not be inside your CTC).
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Employee contribution is 12% of your PF wage (Basic + Dearness Allowance). Employer
            contribution is also 12%, but it is split three ways — not all of it goes to your EPF account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            EPF, EPS, and EDLI: where your employer&apos;s 12% actually goes
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The employer&apos;s 12% contribution is split into three components:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>8.33% to EPS (Employees&apos; Pension Scheme):</strong> This funds your pension on
              retirement and is capped at ₹1,250/month (8.33% of the ₹15,000 statutory wage ceiling).
              EPS money is not in your individual PF account — it goes to a pension pool. You cannot
              withdraw EPS on resignation before 10 years of service (you get a scheme certificate instead).
            </li>
            <li>
              <strong>3.67% to your EPF account</strong> (plus any excess over the ₹15,000 ceiling if
              the employer uses a higher wage base). This amount is yours and accumulates interest.
            </li>
            <li>
              <strong>0.5% to EDLI (Employees&apos; Deposit Linked Insurance Scheme):</strong> Life insurance
              that pays a nominee lump sum in case of employee death while in service. You never see this
              as a benefit unless a claim is made — it is capped at ₹7 lakh as of current rules.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            The ₹15,000 statutory wage ceiling and why it matters
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            By law, employers must contribute PF only on the first ₹15,000 of monthly Basic+DA. If your
            Basic is ₹40,000/month, employer&apos;s statutory minimum PF contribution is 12% × ₹15,000 =
            ₹1,800/month — not 12% × ₹40,000.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            However, many employers choose to contribute on the actual Basic+DA without the ceiling,
            particularly in the organized tech and manufacturing sectors. This is better for employees
            (more savings, higher PF balance) but adds cost to the employer and can significantly
            reduce your monthly in-hand if your Basic is high.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            This is one of the largest sources of mismatch between a generic calculator&apos;s estimate
            and your actual payslip — always check your offer letter or HR portal for which PF rule applies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            VPF: why some employees contribute more than mandatory
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Voluntary Provident Fund (VPF) allows you to contribute more than the mandatory 12% to your
            EPF account — up to 100% of Basic+DA. The interest rate on VPF is the same as EPF (announced
            annually by the EPFO, typically 8–8.5% in recent years), which is significantly higher than
            most bank FDs.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            VPF contributions qualify for 80C deduction under the old tax regime (within the ₹1.5 lakh
            overall 80C cap). Interest earned up to ₹2.5 lakh of annual employee contributions (EPF +
            VPF combined) is tax-free. Above this threshold, interest is taxable from FY 2021-22 onwards.
          </p>
        </section>
      </div>
    </>
  );
}
