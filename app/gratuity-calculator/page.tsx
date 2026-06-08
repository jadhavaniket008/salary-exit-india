import { GratuityCalculatorClient } from "@/components/calculators/clients/GratuityCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("gratuity");

export default function GratuityCalculatorPage() {
  return (
    <>
      <GratuityCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            What gratuity is and when you are entitled to it
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Gratuity is a statutory payment mandated by the Payment of Gratuity Act, 1972. It is a
            lump sum paid by an employer to an employee as a token of gratitude for continuous
            service. Unlike provident fund, gratuity is entirely funded by the employer — no amount
            is deducted from your salary.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The Act applies to establishments with 10 or more employees. Eligibility requires
            <strong> continuous service of at least five years</strong> with the same employer.
            However, the five-year rule has an important exception: if an employee dies or becomes
            permanently disabled, gratuity is payable regardless of years of service. Similarly,
            the Supreme Court has held that even 4 years and 240 days qualifies as &quot;five years&quot;
            in certain interpretations, though this varies by employer and jurisdiction.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            How the gratuity formula works: the 15/26 rule explained
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            The formula under the Payment of Gratuity Act is:
          </p>
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm dark:border-zinc-800 dark:bg-zinc-900">
            Gratuity = (15 × Last Drawn Monthly Salary × Years of Service) ÷ 26
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            The &quot;15&quot; represents 15 days&apos; pay per year of service. The &quot;26&quot; represents the number of
            working days in a month (a 6-day work week with 4 Sundays subtracted from 30 days).
            <strong> Last drawn salary</strong> means Basic + Dearness Allowance only — HRA, special
            allowance, and other components are excluded.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Example: 8 years of service, last Basic+DA ₹50,000/month. Gratuity = (15 × 50,000 × 8) ÷ 26
            = ₹2,30,769. The maximum gratuity payable under the Act is ₹20 lakh — above this, the excess
            is at the employer&apos;s discretion (some companies pay higher voluntarily).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Tax treatment of gratuity
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            For government employees, the entire gratuity is tax-exempt. For private sector employees
            covered under the Payment of Gratuity Act, the exemption is the <em>least</em> of:
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>The actual gratuity received</li>
            <li>₹20,00,000 (the statutory maximum)</li>
            <li>15 days&apos; salary × years of service (using the formula above)</li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400">
            For most employees receiving gratuity within the statutory ceiling, the full amount is
            effectively tax-free. If your employer voluntarily pays gratuity beyond the statutory limit,
            the excess is taxable as salary income in the year of receipt.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Gratuity in your CTC and what that means
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Many employers include gratuity accrual in CTC — typically 4.81% of Basic+DA (which is
            (15/26) ÷ 12 months, or approximately 1/12 of 15 days&apos; pay per year). This means your
            &quot;CTC&quot; includes money that is not available to you until you complete five years of service
            and then exit.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            If you leave before five years, this portion of your CTC is forfeited — it is not paid
            out, and it was never in your take-home salary. This is one reason why short-tenure employees
            often find that their effective compensation is lower than their CTC implied.
          </p>
        </section>
      </div>
    </>
  );
}
