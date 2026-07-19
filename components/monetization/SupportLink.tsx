"use client";

import { trackSupportClick } from "@/lib/analytics/client";

/** Footer "Buy me a coffee" link — renders nothing until a username is configured. */
export function SupportLink() {
  const username = process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME?.trim();
  if (!username) return null;

  return (
    <a
      href={`https://www.buymeacoffee.com/${username}`}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={() => trackSupportClick()}
      className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-foreground"
    >
      <span aria-hidden="true">☕</span>
      Buy me a coffee
    </a>
  );
}
