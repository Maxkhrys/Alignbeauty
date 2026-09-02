"use client";

import Image from "next/image";
import { AnimatedText } from "./ui/AnimatedText";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

const points = [
  { k: "Academy", v: "Accredited training led by working artists, in small groups." },
  { k: "Private Events", v: "The lounge, closed to the public, styled around your evening." },
  { k: "Masterclasses", v: "Seasonal one-day intensives in nails, brows and finishing." },
];

export function Academy() {
  return (
    <section id="academy" className="relative overflow-hidden bg-espresso text-cream">
      <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_minmax(0,46%)] lg:items-center lg:gap-20 lg:py-32">
        <div>
          <Reveal y={12}>
            <p className="u-eyebrow text-taupe">Academy &amp; Events</p>
          </Reveal>

          <AnimatedText
            delay={0.1}
            lines={["Learn. Celebrate.", "Elevate."]}
            className="u-display mt-4 text-[length:var(--step-h2)] uppercase"
          />

          <Reveal delay={0.28} y={10}>
            <span className="u-rule mt-7 w-14" />
          </Reveal>

          <Reveal delay={0.34}>
            <p className="mt-7 max-w-[46ch] text-cream/70">
              A second life for the lounge — a room for training, for launches, and for the
              evenings that deserve somewhere considered.
            </p>
          </Reveal>

          <dl className="mt-10 border-t border-cream/15">
            {points.map((p, i) => (
              <Reveal key={p.k} delay={0.4 + i * 0.08} y={14}>
                <div className="flex flex-col gap-1.5 border-b border-cream/15 py-5 sm:flex-row sm:gap-8">
                  <dt className="u-label w-full text-cream sm:w-44 sm:shrink-0">{p.k}</dt>
                  <dd className="max-w-[42ch] text-cream/65">{p.v}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.6}>
            <div className="mt-10">
              <Button
                href="#book"
                variant="outline"
                arrow
                className="border-cream/35 text-cream hover:border-gold hover:text-cream"
              >
                Enquire
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal y={30}>
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/5]">
            <Image
              src="/images/academy.jpg"
              alt="The Align treatment floor set for a private event, brass lamps lit along the marble bar"
              fill
              quality={88}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "58% 55%" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
