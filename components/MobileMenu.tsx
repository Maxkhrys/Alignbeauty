"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./ui/Wordmark";
import { Arrow } from "./ui/Arrow";

const items = [...nav, { label: "Contact", href: "#book" }];

export function MobileMenu({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  // Lock the page behind the overlay and restore the scrollbar gutter.
  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-cream lg:hidden"
        >
          <div className="shell flex items-center justify-between py-4">
            <Wordmark size="1.05rem" className="text-ink" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.6,
                    delay: reduced ? 0 : 0.12 + i * 0.07,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="border-b border-taupe/25"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="u-display flex min-h-16 items-center justify-between py-4 text-[clamp(2rem,10vw,2.75rem)] text-ink"
                  >
                    {item.label}
                    <Arrow className="w-7 text-gold" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="shell pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <Link
              href={site.bookingHref}
              onClick={onClose}
              className="u-label flex min-h-14 w-full items-center justify-center rounded-[2px] bg-ink text-cream"
            >
              Book Appointment
            </Link>
            <p className="u-label mt-5 text-center text-ink/50">
              {site.contact.address}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
