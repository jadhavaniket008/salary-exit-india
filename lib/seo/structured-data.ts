import { getSiteOrigin } from "@/lib/seo/site-origin";

function parseSameAsEnv(): string[] | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_SAME_AS?.trim();
  if (!raw) return undefined;

  const urls = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//i.test(s));

  return urls.length ? urls : undefined;
}

export function websiteJsonLd() {
  const origin = getSiteOrigin().origin;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: "SalaryExit India",
    url: origin,
    inLanguage: "en-IN",
    publisher: { "@id": `${origin}/#organization` },
  } as const;
}

export function organizationJsonLd() {
  const origin = getSiteOrigin().origin;
  const logo = `${origin}/icon`;
  const sameAs = parseSameAsEnv();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "SalaryExit India",
    url: origin,
    logo,
    ...(sameAs ? { sameAs } : {}),
  } as const;
}
