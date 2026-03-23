import { SalaryRealityCheckCalculatorClient } from "@/components/calculators/clients/SalaryRealityCheckCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("salaryRealityCheck");

export default function SalaryRealityCheckPage() {
  return <SalaryRealityCheckCalculatorClient />;
}
