import { absoluteUrl } from "@/lib/seo/metadata";

export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

export function faqPageJsonLd(items: FaqJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(options: {
  headline: string;
  description: string;
  urlPath: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    url: absoluteUrl(options.urlPath),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(options.urlPath),
    },
    datePublished: options.datePublished ?? "2026-03-15",
    dateModified: options.dateModified ?? options.datePublished ?? "2026-03-15",
    author: {
      "@type": "Organization",
      name: "SalaryExit India",
    },
    publisher: {
      "@type": "Organization",
      name: "SalaryExit India",
    },
  };
}
