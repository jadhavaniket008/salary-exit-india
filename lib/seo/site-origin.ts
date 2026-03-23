/**
 * Canonical site origin for metadataBase, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.example.com).
 */
export function getSiteOrigin(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return new URL(raw && raw.length > 0 ? raw : "http://localhost:3000");
}
