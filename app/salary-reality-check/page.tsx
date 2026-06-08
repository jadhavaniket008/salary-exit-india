import { SalaryRealityCheckCalculatorClient } from "@/components/calculators/clients/SalaryRealityCheckCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("salaryRealityCheck");

export default function SalaryRealityCheckPage() {
  return (
    <>
      <SalaryRealityCheckCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Why savings rate matters more than income level
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Two employees both earning ₹15 LPA can have wildly different savings outcomes. The employee
            in Delhi paying ₹25,000/month rent, EMI on a two-wheeler, and supporting family saves perhaps
            ₹5,000/month. The employee in Jaipur living at home saves ₹35,000/month. Their incomes are
            identical; their financial trajectories are not.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The savings rate — what fraction of net in-hand you actually save or invest each month — is
            a better indicator of financial health than the salary figure itself. Personal finance
            practitioners typically use 20% of net income as a benchmark for adequate savings. Below
            10%, emergency fund and wealth accumulation are both compromised. Above 30%, you are likely
            on track to build meaningful assets over a 10-year horizon.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            The three variables that move the needle most
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            In our experience of building this calculator and reading how Indian salaried employees
            actually budget, three variables explain most of the variance in savings outcomes at any
            given income level:
          </p>
          <ol className="list-inside list-decimal space-y-3 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Rent:</strong> The single largest expense for most working-age Indians in urban
              areas. Rent as a percentage of in-hand can range from 0% (living with family) to 50%+
              (paying ₹30,000/month rent on ₹60,000 in-hand). This variable alone can swing the
              savings rate by 30+ percentage points.
            </li>
            <li>
              <strong>PF deduction and regime choice:</strong> These are not discretionary costs, but
              they affect how much cash you see each month. An employee contributing ₹8,000/month to PF
              under the old regime and claiming 80C may pay less tax — but have less monthly liquidity.
              Someone in the new regime with lower PF may see more in-hand but save less structurally.
            </li>
            <li>
              <strong>Family dependents and obligations:</strong> Supporting parents or sending money
              home to a native city can represent 15–25% of net income for many first-generation urban
              professionals. This is invisible in any calculator that does not ask about it.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            City tier differences in lifestyle cost
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The tool uses a three-tier city classification when estimating discretionary expenses:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong>Tier 1 (Metro):</strong> Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune.
              Rent typically ₹15,000–45,000/month for a 1BHK. Food and transport costs are higher.
              Lifestyle inflation is significant.
            </li>
            <li>
              <strong>Tier 2:</strong> Ahmedabad, Jaipur, Lucknow, Chandigarh, Kochi, Coimbatore.
              Rent typically ₹8,000–20,000/month. Lower transport costs. Lifestyle inflation is moderate.
            </li>
            <li>
              <strong>Tier 3 and smaller cities:</strong> Rent can be ₹3,000–10,000/month. Many costs
              are substantially lower. Living with family is more common, which eliminates rent entirely.
            </li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400">
            A ₹10 LPA salary in a Tier 2 city often provides more financial breathing room than ₹15 LPA
            in Mumbai once rent, commute, and basic lifestyle costs are accounted for.
          </p>
        </section>
      </div>
    </>
  );
}
