/**
 * Default city / location assumptions for calculators (UI defaults only).
 */

export type CityCategory = "metro" | "non_metro";

export type CityDefault = {
  id: string;
  label: string;
  category: CityCategory;
};

export const DEFAULT_CITY_DEFAULTS: readonly CityDefault[] = [
  { id: "mumbai", label: "Mumbai", category: "metro" },
  { id: "delhi", label: "Delhi NCR", category: "metro" },
  { id: "bangalore", label: "Bengaluru", category: "metro" },
  { id: "hyderabad", label: "Hyderabad", category: "metro" },
  { id: "chennai", label: "Chennai", category: "metro" },
  { id: "kolkata", label: "Kolkata", category: "metro" },
  { id: "pune", label: "Pune", category: "metro" },
  { id: "other", label: "Other", category: "non_metro" },
] as const;
