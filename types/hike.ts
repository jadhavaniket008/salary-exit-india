export type SalaryHikeInput = {
  oldAnnualCtc: number;
  newAnnualCtc: number;
};

export type SalaryHikeOutput = {
  absoluteIncreaseAnnual: number;
  percentIncrease: number;
  warnings: string[];
};
