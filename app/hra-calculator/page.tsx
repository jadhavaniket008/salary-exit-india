import { HraCalculatorClient } from "@/components/calculators/clients/HraCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("hra");

export default function HraCalculatorPage() {
  return (
    <>
      <HraCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            What is HRA exemption and who can claim it
          </h2>
          <p className="text-foreground-secondary">
            House Rent Allowance (HRA) is a salary component that partially offsets your rent expense.
            Section 10(13A) of the Income Tax Act allows a portion of HRA to be exempt from tax — but only
            if you are actually paying rent, and only under the old tax regime. If you opt for the new
            regime, HRA exemption is not available regardless of what your payslip shows.
          </p>
          <p className="text-foreground-secondary">
            The exemption does not apply to home owners. If you own the house you live in, the HRA
            component is fully taxable even if it is listed on your payslip.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            The three-part test: how the exempt amount is calculated
          </h2>
          <p className="text-foreground-secondary">
            The exempt amount is the <em>lowest</em> of three figures. You do not get to pick — the tax
            rules take whichever is smallest:
          </p>
          <ol className="list-inside list-decimal space-y-3 text-foreground-secondary">
            <li>
              <strong>Actual HRA received from employer</strong> — whatever is shown on your payslip as
              the HRA component (annual).
            </li>
            <li>
              <strong>Actual rent paid minus 10% of Basic+DA</strong> — if you pay ₹20,000/month in rent
              and your annual Basic+DA is ₹6,00,000, this figure is (₹2,40,000 − ₹60,000) = ₹1,80,000.
            </li>
            <li>
              <strong>50% of Basic+DA (metro) or 40% of Basic+DA (non-metro)</strong> — metro cities are
              Delhi, Mumbai, Kolkata, and Chennai. All other cities — including Bengaluru, Hyderabad,
              Pune, and Ahmedabad — are classified as non-metro for HRA purposes under current rules.
            </li>
          </ol>
          <p className="text-foreground-secondary">
            This means increasing your HRA component on paper does not automatically give you a larger
            exemption if rent actually paid is the binding constraint.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Common mistakes that reduce or eliminate the HRA benefit
          </h2>
          <ul className="list-inside list-disc space-y-2 text-foreground-secondary">
            <li>
              <strong>Not submitting rent receipts:</strong> If you fail to submit rent receipts and a
              rental agreement to your employer before the declaration deadline (typically December–January),
              TDS is calculated without the HRA exemption. You can claim it in your ITR filing, but it
              requires documentation.
            </li>
            <li>
              <strong>Paying rent to immediate family:</strong> The Income Tax Department scrutinizes
              rent paid to spouses. Paying rent to a parent is permissible if the parent owns the property
              and declares the rental income in their own tax return.
            </li>
            <li>
              <strong>PAN of landlord not provided above ₹1 lakh/year:</strong> If annual rent exceeds
              ₹1,00,000, you must provide the landlord&apos;s PAN to your employer. Without it, the employer
              cannot give you the full exemption.
            </li>
            <li>
              <strong>Choosing new regime but expecting HRA:</strong> The new tax regime does not allow
              HRA exemption under Section 10(13A). Employees who choose or default to the new regime
              should not expect this benefit.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            How much tax HRA exemption actually saves
          </h2>
          <p className="text-foreground-secondary">
            The tax saving equals the exemption amount multiplied by your marginal tax rate. For someone
            in the 30% slab (income above ₹15 LPA under old regime) with an exemption of ₹1.5 lakh, the
            annual saving is approximately ₹1.5L × 30% × (1 + 4% cess) = roughly ₹46,800. At the 20%
            slab, the same exemption saves around ₹31,200/year.
          </p>
          <p className="text-foreground-secondary">
            This is why the old regime can still make sense for employees paying significant rent in
            metro cities, particularly above ₹15,000/month, even though the new regime&apos;s slabs are lower.
          </p>
        </section>
      </div>
    </>
  );
}
