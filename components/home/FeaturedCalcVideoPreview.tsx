"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small looping thumbnail of the CTC-to-in-hand calculator in use, tucked into the
 * featured card. Lazy-mounts the <video> only once the thumbnail nears the viewport
 * so it never competes with the page's initial load.
 */
export function FeaturedCalcVideoPreview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={wrapperRef}
      className="hidden h-[86px] w-[152px] shrink-0 overflow-hidden rounded-lg border border-border-strong/60 bg-surface-subtle shadow-sm sm:block"
    >
      {shouldLoad ? (
        <video
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
        >
          <source src="/videos/ctc-calculator-demo.mp4" type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
