import { SalaryHikeCalculatorClient } from "@/components/calculators/clients/SalaryHikeCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("salaryHike");

export default function SalaryHikeCalculatorPage() {
  return <SalaryHikeCalculatorClient />;
}
