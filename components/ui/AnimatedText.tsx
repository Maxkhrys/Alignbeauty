"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

type Props = {
  /** One entry per rendered line. Line breaks are authored, never guessed. */
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
};

/**
 * Line-by-line masked reveal for display headings. Each line sits in an
 * overflow-hidden track and rises into place — the "line reveal" from the
 * moodboard, done with transforms only.
 */
export function AnimatedText({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = as;

  const container = {
    hidden: {},
    shown: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  };

  const line = {
    hidden: { y: reduced ? "0%" : "105%", opacity: 1 },
    shown: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduced ? 0 : 0.95, ease: [0.22, 0.61, 0.36, 1] as const },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={container}
        initial="hidden"
        {...(immediate
          ? { animate: "shown" }
          : { whileInView: "shown", viewport: { once: true, margin: "-10% 0px" } })}
      >
        {lines.map((text, i) => (
          // The mask track: clips the line while it travels.
          <span key={i} className={`block overflow-hidden pb-[0.08em] ${lineClassName ?? ""}`}>
            <motion.span className="block" variants={line}>
              {text}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
