"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AnimatedText } from "./ui/AnimatedText";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

export function MoreThanBeauty() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", reduced ? "-5%" : "5%"]);

  return (
    <section id="about" className="bg-ivory py-20 md:py-28 lg:py-32">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <AnimatedText
            lines={["More than", "Beauty."]}
            className="u-display text-[length:var(--step-h2)] uppercase text-ink"
          />

          <Reveal delay={0.18} y={12}>
            <span className="u-rule mt-6 w-14" />
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 max-w-[46ch] space-y-5 text-ink/75">
              <p>
                At Align Beauty Lounge, we bring together artistry, care and expertise in a
                serene, modern environment.
              </p>
              <p>
                Whether it&rsquo;s a moment for you or a step towards your future in beauty,
                you&rsquo;re in the right place.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9">
              <Button href="#services" variant="outline" arrow>
                About Us
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Image sits in the order-1 slot on phones so the section opens with it. */}
        <Reveal
          y={30}
          className="order-1 lg:order-2"
        >
          <div
            ref={ref}
            className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0">
              <Image
                src="/images/lounge-v2.webp"
                alt="The Align Beauty Lounge waiting area — curved seating beneath the backlit ALIGN sign"
                fill
                unoptimized
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "58% 50%" }}
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
