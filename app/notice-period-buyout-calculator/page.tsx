import { NoticeBuyoutCalculatorClient } from "@/components/calculators/clients/NoticeBuyoutCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("noticeBuyout");

export default function NoticeBuyoutCalculatorPage() {
  return <NoticeBuyoutCalculatorClient />;
}
