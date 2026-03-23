/**
 * Canonical site origin for metadataBase, sitemap, and robots.
 * Production: set NEXT_PUBLIC_SITE_URL to your primary host (e.g. https://salaryexit.in).
 * On Vercel without that var, falls back to VERCEL_URL so previews still get absolute URLs.
 */
export function getSiteOrigin(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
