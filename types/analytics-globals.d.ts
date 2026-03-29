export {};

/** Loaded only when `ThirdPartyRootScripts` injects GA / Plausible (env + consent). */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
    /** Populated by AdSense after `ThirdPartyRootScripts` loads `adsbygoogle.js`. */
    adsbygoogle?: unknown[];
  }
}
