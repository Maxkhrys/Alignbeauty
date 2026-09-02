import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/lib/site";
import { Arrow } from "./ui/Arrow";

const panelGeometry = [
  {
    left: "0%",
    width: "36%",
    clipPath: "polygon(0 0, 100% 0, 88.9% 100%, 0 100%)",
    contentClass: "pl-4 pr-6",
  },
  {
    left: "32%",
    width: "36%",
    clipPath: "polygon(11.1% 0, 100% 0, 88.9% 100%, 0 100%)",
    contentClass: "pl-[24%] pr-5",
  },
  {
    left: "64%",
    width: "36%",
    clipPath: "polygon(11.1% 0, 100% 0, 100% 100%, 0 100%)",
    contentClass: "pl-[24%] pr-3",
  },
] as const;

const mobileLabels = ["Nails", "Beauty", "Academy"] as const;

export function MobileHero() {
  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream lg:hidden">
      <Image
        src="/images/hero-mobile-v1.webp"
        alt="The illuminated marble reception inside Align Beauty Lounge"
        fill
        priority
        fetchPriority="high"
        unoptimized
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 48%" }}
      />

      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 via-ink/25 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_26%,rgba(20,14,10,0.32)_43%,rgba(20,14,10,0.84)_72%,rgba(20,14,10,0.96)_100%)]"
      />

      <div className="gutter relative z-10 flex min-h-0 flex-1 flex-col justify-end pb-7 pt-28">
        <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-cream/72">
          {site.contact.address}
        </p>
        <h1 className="u-display mt-3 text-[clamp(3.25rem,15vw,4.5rem)] uppercase leading-[0.88] text-cream">
          <span className="block">Elevated</span>
          <span className="block text-champagne">Beauty.</span>
        </h1>
        <p className="mt-5 max-w-[18rem] text-[0.9375rem] leading-[1.65] text-cream/76">
          A luxurious space.
          <br />
          Expert services. Elevated beauty.
        </p>
      </div>

      <nav
        aria-label="Featured services"
        className="relative z-20 h-[calc(9.25rem+env(safe-area-inset-bottom))] shrink-0 overflow-hidden bg-gold"
      >
        {services.map((service, index) => {
          const geometry = panelGeometry[index];

          return (
            <Link
              key={service.index}
              href={service.href}
              aria-label={`${mobileLabels[index]}: ${service.statement.join(" ")}`}
              className="group absolute inset-y-0 overflow-hidden bg-ink focus-visible:z-20 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-3px] focus-visible:outline-champagne"
              style={{
                left: geometry.left,
                width: geometry.width,
                clipPath: geometry.clipPath,
                WebkitClipPath: geometry.clipPath,
              }}
            >
              <Image
                src={service.image}
                alt=""
                fill
                unoptimized
                sizes="36vw"
                className="object-cover transition-[filter,transform] duration-500 ease-[var(--ease-align)] group-active:scale-[1.025] group-active:brightness-110 motion-reduce:transition-none"
                style={{ objectPosition: service.positionMobile ?? service.position }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/48 to-ink/88"
              />

              <span
                className={"absolute inset-0 flex flex-col pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-4 text-cream " + geometry.contentClass}
              >
                <span className="u-display text-[1.35rem] leading-none text-champagne">
                  {service.index}
                </span>
                <span className="mt-2 text-[0.625rem] uppercase leading-tight tracking-[0.14em]">
                  {mobileLabels[index]}
                </span>
                <Arrow className="mt-auto w-5 text-champagne transition-transform duration-300 ease-[var(--ease-align)] group-active:translate-x-1 motion-reduce:transition-none" />
              </span>
            </Link>
          );
        })}

        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full text-gold"
        >
          <path d="M36 0L32 100M68 0L64 100" fill="none" stroke="currentColor" strokeWidth="0.38" />
        </svg>
      </nav>
    </div>
  );
}
