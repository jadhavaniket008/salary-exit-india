import { OfferComparisonCalculatorClient } from "@/components/calculators/clients/OfferComparisonCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("offerComparison");

export default function OfferComparisonCalculatorPage() {
  return <OfferComparisonCalculatorClient />;
}
