"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { services } from "@/lib/site";
import { AnimatedText } from "./ui/AnimatedText";
import { Reveal } from "./ui/Reveal";
import { Arrow } from "./ui/Arrow";

/* Second editorial treatment: the diagonal leans the opposite way to the hero
   and the label sits outside the shape, so the motif repeats without the
   layout repeating. */
const LEAN = 13;
const clip = `polygon(0% 0%, ${100 - LEAN}% 0%, 100% 100%, ${LEAN}% 100%)`;

export function Services() {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="bg-cream py-20 md:py-28 lg:py-32">
      <div className="shell">
        <div className="text-center">
          <Reveal y={12}>
            <p className="u-eyebrow">Our Services</p>
          </Reveal>
          <AnimatedText
            delay={0.1}
            lines={["Tailored to you"]}
            className="u-display mt-4 text-[length:var(--step-h2)] uppercase text-ink"
          />
          <Reveal delay={0.28} y={10}>
            <span className="u-rule mx-auto mt-7 w-14" />
          </Reveal>
        </div>

        {/* ---------- Desktop: diagonal plates ---------- */}
        <div className="mt-14 hidden gap-5 md:flex lg:mt-20 lg:gap-7">
          {services.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: reduced ? 0 : 0.9,
                delay: reduced ? 0 : i * 0.12,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="flex-1"
            >
              <Link href={s.href} className="group block">
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden bg-champagne"
                  style={{ clipPath: clip, WebkitClipPath: clip }}
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    quality={86}
                    sizes="(min-width: 1280px) 30vw, 32vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-align)]
                      group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
                    style={{ objectPosition: s.position }}
                  />
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 px-[3%]">
                  <span className="u-display text-[clamp(1.1rem,1.4vw,1.5rem)] uppercase tracking-[0.08em] text-ink">
                    {s.title}
                  </span>
                  <Arrow className="w-10 text-gold transition-transform duration-500 ease-[var(--ease-align)] group-hover:translate-x-2" />
                </div>
                <span className="mt-4 block h-px w-full origin-left scale-x-100 bg-taupe/40" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ---------- Phone: compact rows, thumbnail keeps the lean ---------- */}
        <ul className="mt-10 flex flex-col gap-2.5 md:hidden">
          {services.map((s, i) => (
            <motion.li
              key={s.index}
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{
                duration: reduced ? 0 : 0.6,
                delay: reduced ? 0 : i * 0.06,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <Link
                href={s.href}
                className="flex min-h-[4.5rem] items-center gap-4 border border-taupe/35 bg-ivory pr-4 active:bg-champagne/50"
              >
                <span
                  className="relative h-[4.5rem] w-[5.5rem] shrink-0 overflow-hidden"
                  style={{ clipPath: clip, WebkitClipPath: clip }}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    quality={70}
                    sizes="110px"
                    className="object-cover"
                    style={{ objectPosition: s.position }}
                  />
                </span>
                <span className="u-display flex-1 text-base uppercase tracking-[0.08em] text-ink">
                  {s.title}
                </span>
                <Arrow className="w-8 text-gold" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
