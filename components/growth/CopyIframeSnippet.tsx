"use client";

import { useState } from "react";

type Props = {
  snippet: string;
};

/** Small, non-tracking copy-to-clipboard button for the embed page's iframe snippet. */
export function CopyIframeSnippet({ snippet }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (older browser, insecure context) — the
      // snippet is still visible and selectable in the <pre> below, so this
      // fails silently rather than showing an error for a non-critical action.
    }
  }

  return (
    <div className="space-y-2">
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface-subtle p-3 text-xs text-foreground-secondary">
        <code>{snippet}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-subtle"
      >
        {copied ? "Copied" : "Copy snippet"}
      </button>
    </div>
  );
}
