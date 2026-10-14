import { PfModelNotice } from "@/components/content/PfModelNotice";
import { cityBudgetExample } from "@/lib/content/salary-examples";
import { formatInr } from "@/lib/format-inr";

export function CityBudgetExample({ lpa, rent, otherSpend }: {
  lpa: number; rent: number; otherSpend: number;
}) {
  const example = cityBudgetExample(lpa, rent, otherSpend);
  return (
    <p>
      At {formatInr(example.annualGrossSalary)} annual <strong>gross salary</strong>,
      estimated in-hand is <strong>{formatInr(example.inHandMonthly)}/month</strong>.
      With an assumed {formatInr(rent)} rent and {formatInr(otherSpend)} other monthly spending,
      that leaves <strong>{formatInr(example.monthlySurplus)}/month</strong> before
      any additional EMIs, family commitments or irregular expenses. These are editable planning
      inputs, not observed city averages or a guaranteed savings amount.
    </p>
  );
}

export function CityBudgetAssumptions() {
  return (
    <>
    <PfModelNotice />
    <p>
      All examples below use the same FY 2026–27 engine: resident individual, new regime,
      ordinary salary only, 45% Basic+DA, employee PF at 12% with a historical ₹15,000/month wage ceiling,
      and ₹2,500/year professional tax as a planning placeholder. Check the PT that actually
      applies to you. Employer costs must be removed from CTC first. Rent and other spending
      are scenario assumptions; replace them with your own quotes and bills.
    </p>
    </>
  );
}
