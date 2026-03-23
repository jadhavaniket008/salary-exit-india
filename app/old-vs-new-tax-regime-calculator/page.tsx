import { TaxRegimeCalculatorClient } from "@/components/calculators/clients/TaxRegimeCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("taxRegime");

export default function TaxRegimeCalculatorPage() {
  return <TaxRegimeCalculatorClient />;
}
