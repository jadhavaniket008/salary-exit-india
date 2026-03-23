import { GratuityCalculatorClient } from "@/components/calculators/clients/GratuityCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("gratuity");

export default function GratuityCalculatorPage() {
  return <GratuityCalculatorClient />;
}
