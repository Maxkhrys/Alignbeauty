"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds to hold before this element starts. */
  delay?: number;
  /** Travel distance in px. Kept small — expensive motion is understated. */
  y?: number;
  as?: ElementType;
  className?: string;
  /** Play immediately instead of waiting for the viewport (hero content). */
  immediate?: boolean;
};

/**
 * The one scroll-reveal used site-wide: a short opacity + translate on a single
 * easing curve. Transform and opacity only, so it stays on the compositor.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
  immediate = false,
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  const variants: Variants = {
    // Reduced motion gets the finished state immediately — a fade is
    // still motion, so we skip it rather than shorten it.
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : y },
    shown: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.85,
        delay: reduced ? 0 : delay,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: { once: true, margin: "-12% 0px -12% 0px" } })}
    >
      {children}
    </MotionTag>
  );
}
