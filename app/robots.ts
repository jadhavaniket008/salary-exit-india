import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo/site-origin";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "AdsBot-Google", allow: "/" },
      { userAgent: "Mediapartners-Google", allow: "/" },
    ],
    sitemap: `${origin.origin}/sitemap.xml`,
    host: origin.host,
  };
}
