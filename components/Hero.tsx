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
    <section id="top" ref={ref} className="relative overflow-hidden bg-cream pt-24 lg:pt-28">
      <div className="relative">
        {/* Anchored to the section rather than the grid column, so the
            photograph reads as one continuous field running off the right of
            the screen instead of a boxed-in image with a hard left seam. */}
        <div className="absolute inset-y-0 right-0 hidden w-[93%] overflow-hidden lg:block">
          <motion.div style={{ y: backdropY }} className="absolute -inset-y-[6%] inset-x-0">
            <Image
              src="/images/hero-backdrop.jpg"
              alt="The Align Beauty Lounge reception — a lit arched alcove above a marble counter"
              fill
              priority
              fetchPriority="high"
              quality={92}
              sizes="93vw"
              className="object-cover"
              style={{ objectPosition: "50% 28%" }}
            />
          </motion.div>

          {/* Blend the photograph's left and bottom edges into the page so it
              reads as a field, not a pasted-in rectangle. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[32%] bg-gradient-to-r from-cream via-cream/88 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-cream to-transparent"
          />
        </div>

        <div className="shell relative">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(19rem,38%)_1fr] lg:gap-6 xl:gap-8">
          {/* ---------------- Copy column ---------------- */}
          <div className="relative z-10 lg:py-16 xl:py-20">
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

          {/* ---------------- Diagonal panels (lg and up) ----------------
              They stand taller than the backdrop and run off the right edge of
              the screen, exactly as they do in the moodboard. */}
          <div
            className="relative hidden lg:block"
            style={{ marginRight: "calc(-1 * var(--spacing-gutter))" }}
          >
            <div className="relative aspect-[16/11.5] w-full xl:aspect-[16/11]">
              <div className="absolute inset-y-0 left-[-3%] right-0">
                {services.map((s, i) => (
                  <HeroServicePanel
                    key={s.index}
                    service={s}
                    index={i}
                    sizes="(min-width: 1920px) 20vw, (min-width: 1280px) 21vw, 22vw"
                  />
                ))}
              </div>
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

      {/* Oversized wordmark set into the floor, as in the moodboard. Purely
          decorative — the real one is in the header. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] left-0 hidden select-none
          u-wordmark whitespace-nowrap text-[10vw] leading-none text-taupe/[0.11] lg:block"
        style={{ paddingLeft: "var(--spacing-gutter)" }}
      >
        Align
      </span>

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
