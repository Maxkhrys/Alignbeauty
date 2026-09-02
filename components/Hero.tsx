"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { marquee, services, site } from "@/lib/site";
import { AnimatedText } from "./ui/AnimatedText";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { HeroServicePanel, ServiceCardMobile } from "./HeroServicePanel";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Small parallax on the backdrop only. Desktop-weight motion; the mobile
  // layout below never mounts this transform's target.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "9%"]);

  return (
    <section id="top" ref={ref} className="relative bg-cream pt-24 lg:pt-28">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(19rem,38%)_1fr] lg:gap-12 xl:gap-16">
          {/* ---------------- Copy column ---------------- */}
          <div className="relative z-10 lg:py-20 xl:py-24">
            <Reveal immediate delay={0.15} y={14}>
              <p className="u-label text-ink/60">A new chapter begins.</p>
            </Reveal>

            <AnimatedText
              immediate
              as="h1"
              delay={0.3}
              lines={["Elevated", "Beauty."]}
              className="u-display mt-5 text-[length:var(--step-hero)] uppercase text-ink"
            />

            <Reveal immediate delay={0.75} y={12}>
              <span className="u-rule mt-7 w-14" />
            </Reveal>

            <Reveal immediate delay={0.85} y={16}>
              <p className="mt-7 max-w-[30ch] text-[length:var(--step-lead)] leading-[1.75] text-ink/75">
                A luxurious space.
                <br />
                Expert services.
                <br />
                Elevated beauty.
              </p>
            </Reveal>

            <Reveal immediate delay={1} y={16}>
              {/* Phone: one full-width primary, then two halves — keeps the
                  whole CTA block inside the first viewport at 320px. */}
              <div className="mt-8 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <Button href={site.bookingHref} variant="primary" className="w-full sm:w-auto">
                  Book Appointment
                </Button>
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                  <Button href="#services" variant="outline" arrow arrowClassName="hidden sm:block" className="px-4 sm:px-7">
                    Our Services
                  </Button>
                  <Button href="#book" variant="outline" arrow arrowClassName="hidden sm:block" className="px-4 sm:px-7">
                    Contact Us
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------------- Visual column (lg and up) ---------------- */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[16/11] w-full overflow-hidden xl:aspect-[16/10]">
              <motion.div style={{ y: backdropY }} className="absolute -inset-y-[6%] inset-x-0">
                <Image
                  src="/images/hero-backdrop.jpg"
                  alt="The Align Beauty Lounge reception — a lit arched alcove above a marble counter"
                  fill
                  priority
                  fetchPriority="high"
                  quality={92}
                  sizes="(min-width: 1536px) 60vw, 62vw"
                  className="object-cover"
                  style={{ objectPosition: "40% 50%" }}
                />
              </motion.div>

              {/* Diagonal service panels, overlaying the right of the backdrop. */}
              <div className="absolute inset-y-[7%] right-0 flex w-[78%] gap-[1.4%]">
                {services.map((s, i) => (
                  <HeroServicePanel
                    key={s.index}
                    service={s}
                    index={i}
                    sizes="(min-width: 1536px) 17vw, 16vw"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Service cards (below lg) ---------------- */}
      <div className="gutter mt-12 flex flex-col gap-3 lg:hidden">
        {services.map((s, i) => (
          <ServiceCardMobile key={s.index} service={s} index={i} />
        ))}
      </div>

      {/* ---------------- Service word list ---------------- */}
      <Reveal y={14} className="mt-12 border-y border-taupe/30 bg-champagne/40 lg:mt-16">
        <ul className="shell flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-4 md:gap-x-9">
          {marquee.map((word, i) => (
            <li key={word} className="flex items-center gap-5 md:gap-9">
              <span className="u-label text-ink/70">{word}</span>
              {i < marquee.length - 1 && (
                <span aria-hidden="true" className="size-1 rounded-full bg-gold/60" />
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
