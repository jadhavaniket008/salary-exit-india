import { EpfCalculatorClient } from "@/components/calculators/clients/EpfCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("epf");

export default function EpfCalculatorPage() {
  return <EpfCalculatorClient />;
}
