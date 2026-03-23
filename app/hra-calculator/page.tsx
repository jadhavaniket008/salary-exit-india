import { HraCalculatorClient } from "@/components/calculators/clients/HraCalculatorClient";
import { calculatorMetadata } from "@/lib/calculator-metadata";

export const metadata = calculatorMetadata("hra");

export default function HraCalculatorPage() {
  return <HraCalculatorClient />;
}
