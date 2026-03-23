import { LeaveEncashmentCalculatorClient } from "@/components/calculators/clients/LeaveEncashmentCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("leaveEncashment");

export default function LeaveEncashmentCalculatorPage() {
  return <LeaveEncashmentCalculatorClient />;
}
