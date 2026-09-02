"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/lib/site";
import { Arrow } from "./ui/Arrow";

/*
 * Desktop panel. The parallelogram is a clip-path so the <img> inside is never
 * skewed — the shape leans, the photograph stays true.
 *   --lean is the horizontal offset of the top edge, as a % of panel width.
 */
const LEAN = 16;
const clip = `polygon(${LEAN}% 0%, 100% 0%, ${100 - LEAN}% 100%, 0% 100%)`;

export function HeroServicePanel({
  service,
  index,
  sizes,
}: {
  service: Service;
  index: number;
  sizes: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 46, x: reduced ? 0 : 26 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: reduced ? 0 : 1.15,
        delay: reduced ? 0 : 0.55 + index * 0.13,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="relative h-full flex-1"
    >
      <Link
        href={service.href}
        aria-label={`${service.title} — ${service.statement.join(" ")}`}
        className="group relative block h-full w-full overflow-hidden bg-ink"
        style={{ clipPath: clip, WebkitClipPath: clip }}
      >
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes={sizes}
          quality={88}
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-align)]
            group-hover:scale-[1.045] motion-reduce:group-hover:scale-100"
          style={{ objectPosition: service.position }}
        />

        {/* Legibility scrim. Weighted low so the image reads at the top. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 via-38% to-transparent to-72%"
        />

        {/* The panel content sits inside the lean, padded off the slanted edge. */}
        <span className="absolute inset-x-0 bottom-0 flex flex-col px-[15%] pb-[9%] text-cream">
          <span className="u-display text-[clamp(1.5rem,2.1vw,2.6rem)] leading-none text-cream/95">
            {service.index}
          </span>

          <span className="u-display mt-3 text-[clamp(1rem,1.3vw,1.6rem)] uppercase leading-[1.05] tracking-[0.06em]">
            {service.titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </span>

          <span className="u-rule mt-4 w-8 origin-left transition-[width] duration-700 ease-[var(--ease-align)] group-hover:w-16" />

          <span className="u-label mt-3.5 text-[0.6875rem] leading-[1.5] text-cream/80">
            {service.statement.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </span>

          <Arrow className="mt-5 w-8 text-cream/80 transition-transform duration-500 ease-[var(--ease-align)] group-hover:translate-x-2" />
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Mobile card. The diagonal motif survives as the divider between photograph
 * and copy, so the shape language carries across without the desktop crop.
 */
export function ServiceCardMobile({ service, index }: { service: Service; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: reduced ? 0 : 0.75,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <Link
        href={service.href}
        className="relative flex min-h-[8.5rem] items-stretch overflow-hidden bg-ink active:opacity-90"
      >
        <div className="relative w-[38%] shrink-0">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes="(max-width: 640px) 40vw, 200px"
            quality={80}
            className="object-cover"
            style={{ objectPosition: service.position }}
          />
        </div>

        {/* Diagonal wedge of espresso overlapping the photo edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-[26%] w-[24%] bg-ink"
          style={{ clipPath: "polygon(52% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        />

        <div className="relative flex flex-1 flex-col justify-center py-5 pl-3 pr-5 text-cream">
          <span className="u-display text-2xl leading-none text-cream/90">{service.index}</span>
          <span className="u-display mt-1.5 text-lg uppercase leading-tight tracking-[0.06em]">
            {service.title}
          </span>
          <span className="u-rule mt-2.5 w-7" />
          <span className="u-label mt-2.5 text-[0.6875rem] text-cream/70">
            {service.statement.join(" ")}
          </span>
          <Arrow className="mt-3 w-7 text-cream/70" />
        </div>
      </Link>
    </motion.div>
  );
}
