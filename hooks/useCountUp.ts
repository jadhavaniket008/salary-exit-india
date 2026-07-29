"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight count-up for primary metrics (ease-out cubic). Resets when inactive.
 *
 * Initializes directly to `target` (not 0) and skips animating on mount, so
 * server-rendered/static HTML and the first client paint already show the
 * real number. Without this, every calculator's primary result was baked
 * into static HTML as "0" — visible to crawlers, AI answer engines, and
 * anyone reading the page before this component's mount effect ran. The
 * count-up still plays on later value changes (e.g. recalculating).
 */
export function useCountUp(
  target: number,
  active: boolean,
  durationMs = 520
): number {
  const [value, setValue] = useState(() => (active && Number.isFinite(target) ? target : 0));
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (!active) {
      setValue(0);
      return;
    }
    if (!Number.isFinite(target)) {
      setValue(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
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
