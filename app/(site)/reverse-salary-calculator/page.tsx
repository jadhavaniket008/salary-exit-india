import { ReverseSalaryCalculatorClient } from "@/components/calculators/clients/ReverseSalaryCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export const metadata = calculatorMetadata("reverseSalary");

export default function ReverseSalaryCalculatorPage() {
  return (
    <>
      <ReverseSalaryCalculatorClient />
      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Why "what CTC do I need" is a better question than "what does X LPA mean"
          </h2>
          <p className="text-foreground-secondary">
            Most salary searches ask what a given CTC translates to — "12 LPA in-hand," "18 LPA take
            home." Those questions have one roughly-correct answer, which is exactly why search
            engines can now answer them directly without you visiting any site.
          </p>
          <p className="text-foreground-secondary">
            "What CTC do I need for ₹1 lakh in-hand?" is different. The answer depends on your tax
            regime, how your employer structures Basic+DA, whether PF is capped at the statutory
            ceiling or applied to full Basic, and how much of CTC gets bundled into employer PF,
            gratuity, and insurance. Two people targeting the same in-hand can reasonably need CTCs
            that differ by ₹2–3 lakh a year depending on those assumptions — which is why this tool
            gives you a range, not a single number.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Using this for negotiation</h2>
          <p className="text-foreground-secondary">
            If you know the monthly cash you need — for rent, EMIs, or a savings target — work
            backwards from that instead of anchoring on a CTC headline. Compare the required-CTC
            range here against an offer's actual CTC, then use the{" "}
            <Link href={ROUTES.ctcToInHandCalculator} className="underline">
              CTC → in-hand calculator
            </Link>{" "}
            to check the offer's real breakdown, or the{" "}
            <Link href={ROUTES.offerComparisonCalculator} className="underline">
              offer comparison tool
            </Link>{" "}
            if you're weighing more than one offer against the same target.
          </p>
        </section>
      </div>
    </>
  );
}
