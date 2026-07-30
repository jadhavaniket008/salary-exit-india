"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type NavLink = { href: string; label: string };

type Props = {
  navLinks: NavLink[];
  ctaHref: string;
  ctaLabel: string;
};

/** Native <details>/<summary> disclosure — no JS needed for open/close, hiding
 * closed content, or keyboard activation of the trigger. This wrapper only
 * adds what native <details> doesn't cover: closing on Escape and returning
 * focus to the trigger when it does. */
export function MobileNavMenu({ navLinks, ctaHref, ctaLabel }: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape" || !details?.open) return;
      details.open = false;
      details.querySelector("summary")?.focus();
    }

    details.addEventListener("keydown", handleKeyDown);
    return () => details.removeEventListener("keydown", handleKeyDown);
  }, []);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details ref={detailsRef} className="relative md:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Menu
      </summary>
      <div className="absolute right-0 mt-2 w-60 rounded-xl border border-border bg-surface shadow-lg">
        <div className="p-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2.5 text-sm text-foreground-secondary hover:bg-surface-subtle hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="mx-3 my-2 border-t border-border" />
          <Link
            href={ctaHref}
            onClick={closeMenu}
            className="block rounded-lg bg-accent-solid px-3 py-2.5 text-center text-sm font-medium text-white"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </details>
  );
}
