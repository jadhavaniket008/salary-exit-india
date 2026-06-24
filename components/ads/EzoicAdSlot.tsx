interface Props {
  /** Placement ID from Ezoic dashboard → Monetization → Ad Placements */
  id: number;
}

/**
 * Ezoic ad placeholder. Renders only when NEXT_PUBLIC_ENABLE_EZOIC=true.
 *
 * Rules per Ezoic docs:
 * - Do NOT add any className, style, width, or height to this div.
 *   Styling the placeholder causes empty white space when no ad fills it.
 * - The route-change handler in ThirdPartyRootScripts calls showAds() globally
 *   after every Next.js navigation — no per-slot script needed here.
 */
export function EzoicAdSlot({ id }: Props) {
  if (process.env.NEXT_PUBLIC_ENABLE_EZOIC !== "true") return null;
  return <div id={`ezoic-pub-ad-placeholder-${id}`} />;
}
