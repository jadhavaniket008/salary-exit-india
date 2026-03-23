"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight count-up for primary metrics (ease-out cubic). Resets when inactive.
 */
export function useCountUp(
  target: number,
  active: boolean,
  durationMs = 520
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (!Number.isFinite(target)) {
      setValue(0);
      return;
    }

    let cancelled = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) {
        requestAnimationFrame(tick);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [target, active, durationMs]);

  return active ? value : 0;
}
