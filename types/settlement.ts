/**
 * Final settlement — sum of configurable line items (no legal advice).
 */
export type FinalSettlementLine = {
  label: string;
  amount: number;
};

export type FinalSettlementInput = {
  lines: FinalSettlementLine[];
  /** Optional deductions (e.g. loan recovery) */
  deductions?: FinalSettlementLine[];
};

export type FinalSettlementOutput = {
  grossCredits: number;
  totalDeductions: number;
  netSettlement: number;
  warnings: string[];
};
