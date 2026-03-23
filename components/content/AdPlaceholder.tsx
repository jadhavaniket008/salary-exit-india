import { AdSlot } from "@/components/ads/AdSlot";

type Props = {
  label?: string;
  className?: string;
};

/**
 * Back-compat alias for mid-content placement. Prefer {@link AdSlot} with an explicit position.
 */
export function AdPlaceholder({
  label = "Advertisement",
  className = "",
}: Props) {
  return <AdSlot position="mid-content" label={label} className={className} />;
}
