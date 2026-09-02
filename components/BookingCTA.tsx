"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { AnimatedText } from "./ui/AnimatedText";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

export function BookingCTA() {
  return (
    <section id="book" className="bg-cream pb-20 md:pb-28 lg:pb-32">
      <div className="shell">
        <div className="relative isolate overflow-hidden bg-ink text-cream">
          {/* Photograph anchored right; copy always sits on solid espresso. */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[58%] lg:w-[52%]">
            <Image
              src="/images/lounge-v2.webp"
              alt=""
              aria-hidden="true"
              fill
              unoptimized
              sizes="(min-width: 640px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "35% 55%" }}
            />
          </div>

          {/* Phone: the photograph stays visible under a heavy scrim rather than
              being covered outright, so the section still reads as a place. */}
          <span aria-hidden="true" className="absolute inset-0 bg-ink/80 sm:hidden" />

          {/* Tablet and up: the diagonal espresso plate — the motif, one last time. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-[72%] bg-ink sm:block lg:w-[68%]"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 78% 100%, 0% 100%)" }}
          />

          <div className="relative max-w-[36rem] px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(3rem,7vw,6rem)]">
            <AnimatedText
              lines={["Ready to", "experience Align?"]}
              className="u-display text-[length:var(--step-h3)] uppercase leading-[1.02]"
            />

            <Reveal delay={0.22} y={12}>
              <span className="u-rule mt-6 w-12" />
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-6 max-w-[34ch] text-cream/72">
                Book your appointment today and step into a space designed for you.
              </p>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={site.contact.phoneHref} variant="gold" className="w-full sm:w-auto">
                  Book Now
                </Button>
                <a
                  href={site.contact.phoneHref}
                  className="u-label inline-flex min-h-11 items-center text-cream/65 transition-colors duration-400 hover:text-cream"
                >
                  {site.contact.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
