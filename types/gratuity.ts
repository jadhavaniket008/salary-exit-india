export type GratuityInput = {
  /** Last drawn salary (basic + DA) — monthly */
  lastDrawnMonthlySalary: number;
  /** Completed years of service (fractional allowed for estimate) */
  yearsOfService: number;
  /** Whether Payment of Gratuity Act applies (affects tax exemption cap) */
  coveredUnderGratuityAct: boolean;
};

export type GratuityOutput = {
  gratuityAmount: number;
  taxableGratuityEstimate: number;
  exemptGratuityEstimate: number;
  warnings: string[];
};
