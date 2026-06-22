// Replace every URL that contains "REPLACE" with your actual referral URL before enabling.
// Set NEXT_PUBLIC_ENABLE_AFFILIATE_LINKS=true in Vercel once all URLs are live.

export type AffiliateContext = "investing" | "tax-filing";

export interface AffiliateLink {
  name: string;
  tagline: string;
  cta: string;
  url: string;
  badge?: string;
}

export const AFFILIATE_LINKS: Record<AffiliateContext, AffiliateLink[]> = {
  investing: [
    {
      name: "Zerodha",
      tagline: "₹0 brokerage on equity delivery. India's most trusted broker — used by 1.3 crore investors.",
      cta: "Open free account",
      url: "https://zerodha.com/open-account?c=QJ6306",
      badge: "Free account",
    },
    {
      name: "Groww",
      tagline: "Mutual funds, stocks and FD in one place — simple app, good for first-time investors.",
      cta: "Start investing",
      url: "https://app.groww.in/v3cO/mb8yjgr7",
    },
  ],
  "tax-filing": [
    {
      name: "Quicko",
      tagline: "Smart ITR filing for salaried employees — handles both old and new regime in one step.",
      cta: "Try free plan",
      // Add ClearTax here once partnership@cleartax.in confirms your affiliate link
      url: "https://quicko.com/",
    },
  ],
};
