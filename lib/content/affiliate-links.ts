// Replace every URL that contains "REPLACE" with your actual referral URL before enabling.
// Set NEXT_PUBLIC_ENABLE_AFFILIATE_LINKS=true in Vercel once all URLs are live.

export type AffiliateContext = "investing" | "tax-filing";

export interface AffiliateLink {
  name: string;
  tagline: string;
  cta: string;
  url: string;
  badge?: string;
  referral: boolean;
}

export const AFFILIATE_LINKS: Record<AffiliateContext, AffiliateLink[]> = {
  investing: [
    {
      name: "Zerodha",
      referral: true,
      tagline: "Stockbroking platform. Review brokerage, account charges and current terms before opening an account.",
      cta: "View account details",
      url: "https://zerodha.com/open-account?c=QJ6306",
    },
    {
      name: "Groww",
      referral: true,
      tagline: "Investing platform. Compare current fees, products and eligibility on Groww before deciding.",
      cta: "View platform details",
      url: "https://app.groww.in/v3cO/mb8yjgr7",
    },
  ],
  "tax-filing": [
    {
      name: "Quicko",
      referral: false,
      tagline: "Tax-filing service. Check current plans and whether they cover your income sources. This is a direct link, not a configured referral.",
      cta: "Check filing options",
      // Add ClearTax here once partnership@cleartax.in confirms your affiliate link
      url: "https://quicko.com/",
    },
  ],
};
