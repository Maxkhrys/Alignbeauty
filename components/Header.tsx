"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./ui/Wordmark";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[var(--ease-align)]
          ${scrolled && !open
            ? "border-b border-taupe/25 bg-cream/95 text-ink"
            : "border-b border-transparent text-cream lg:text-ink"}`}
      >
        <div className="shell flex items-center justify-between gap-6 py-4 md:py-5">
          <Link
            href="#top"
            aria-label={`${site.fullName} — home`}
            className="flex min-h-11 shrink-0 items-center"
          >
            <Wordmark size="clamp(1.1rem, 1.6vw, 1.4rem)" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="u-label group relative inline-flex min-h-11 items-center text-ink/85 transition-colors duration-400 hover:text-ink"
              >
                {item.label}
                {/* Hairline that draws in from the left. */}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-align)] group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={site.bookingHref}
              className="u-label hidden min-h-11 items-center rounded-[2px] bg-gold px-6
                text-cream transition-[background-color,transform] duration-500 ease-[var(--ease-align)]
                hover:scale-[1.01] hover:bg-espresso sm:inline-flex"
            >
              Book Now
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center lg:hidden"
            >
              <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu id="mobile-menu" open={open} onClose={() => setOpen(false)} />
    </>
  );
}
