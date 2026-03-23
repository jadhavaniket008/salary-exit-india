import { CtcToInHandCalculatorClient } from "@/components/calculators/clients/CtcToInHandCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("ctcToInHand");

export default function CtcToInHandCalculatorPage() {
  return <CtcToInHandCalculatorClient />;
}
