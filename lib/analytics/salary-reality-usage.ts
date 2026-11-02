/**
 * A pre-filled Salary Reality Check embed computes an example immediately on mount.
 * A rendered example is not evidence that a visitor used the calculator.
 * Keep the full non-prefilled flow unchanged and count embedded usage only
 * after a real field change or an explicit input-mode change.
 */
export function shouldTrackRealityCheckUsage({
  hasResult,
  alreadyTracked,
  embed,
  hasInteractedWithInputs,
}: {
  hasResult: boolean;
  alreadyTracked: boolean;
  embed: boolean;
  hasInteractedWithInputs: boolean;
}): boolean {
  return hasResult && !alreadyTracked && (!embed || hasInteractedWithInputs);
}
