"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AnimatedText } from "./ui/AnimatedText";
import { Reveal } from "./ui/Reveal";

/**
 * Full-bleed editorial beat. No CTA, no list — it exists to let the page
 * breathe between the Academy block and the booking close.
 */
export function EditorialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", reduced ? "-6%" : "6%"]);

  return (
    <section className="bg-cream py-20 md:py-28 lg:py-32">
      <div className="shell">
        <div ref={ref} className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <motion.div style={{ y }} className="absolute -inset-y-[7%] inset-x-0">
            <Image
              src="/images/hero-backdrop-v2.webp"
              alt="The lit arched alcove and marble counter at Align Beauty Lounge"
              fill
              unoptimized
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "45% 50%" }}
            />
          </motion.div>

          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 p-[clamp(1.25rem,4vw,4rem)]">
            <AnimatedText
              lines={["A space designed", "to slow you down."]}
              className="u-display max-w-[18ch] text-[length:var(--step-h3)] uppercase text-cream"
            />
            <Reveal delay={0.24} y={10}>
              <p className="u-label mt-5 text-cream/70">Mayo &middot; Co. Mayo</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
