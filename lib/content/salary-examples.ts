import { computeCtcToInHand } from "@/lib/calculators/ctc-to-inhand";

/** Editorial examples, not observed payslips. Keep displayed cash derived from the engine. */
export function grossSalaryExample(lpa: number, professionalTaxAnnual = 2_500) {
  return computeCtcToInHand({
    annualGrossSalary: lpa * 100_000,
    basicAndDaAnnual: lpa * 100_000 * 0.45,
    regime: "new",
    metroCity: false,
    professionalTaxAnnual,
  });
}

export const HOME_SALARY_EXAMPLE = grossSalaryExample(15, 2_400);

/** Planning inputs, not city averages or a rental-market survey. */
export function cityBudgetExample(lpa: number, rent: number, otherSpend: number) {
  const salary = grossSalaryExample(lpa);
  return {
    ...salary,
    rent,
    otherSpend,
    afterRent: salary.inHandMonthly - rent,
    monthlySurplus: salary.inHandMonthly - rent - otherSpend,
  };
}
