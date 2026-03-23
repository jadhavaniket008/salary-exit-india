import { FinalSettlementCalculatorClient } from "@/components/calculators/clients/FinalSettlementCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("finalSettlement");

export default function FinalSettlementCalculatorPage() {
  return <FinalSettlementCalculatorClient />;
}
