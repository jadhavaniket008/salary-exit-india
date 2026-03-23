import { SalaryCalculatorClient } from "@/components/calculators/clients/SalaryCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("salary");

export default function SalaryCalculatorPage() {
  return <SalaryCalculatorClient />;
}
