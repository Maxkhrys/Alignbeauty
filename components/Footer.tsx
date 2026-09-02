import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "./ui/Wordmark";
import { SocialIcon } from "./ui/SocialIcon";
import { Button } from "./ui/Button";

const columns = [
  {
    heading: "Quick Links",
    links: [
      { label: "Services", href: "#services" },
      { label: "Academy", href: "#academy" },
      { label: "Events", href: "#academy" },
      { label: "Contact", href: "#book" },
    ],
  },
  {
    heading: "Info",
    links: [
      /* TODO(client): these pages do not exist in the concept. */
      { label: "About Us", href: "#about" },
      { label: "Gift Cards", href: "#book" },
      { label: "Careers", href: "#book" },
      { label: "FAQ", href: "#book" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-taupe/30 bg-ivory">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark size="1.25rem" className="text-ink" />
            <p className="mt-6 max-w-[28ch] text-ink/60">
              A luxurious space. Expert services. Elevated beauty.
            </p>
            <ul className="mt-7 flex items-center gap-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-taupe/40 text-ink/70
                      transition-colors duration-400 hover:border-gold hover:text-gold"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="u-label text-ink/50">{col.heading}</h2>
              <ul className="mt-5 flex flex-col">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-11 items-center text-ink/75 transition-colors duration-400 hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="u-label text-ink/50">Contact</h2>
            <ul className="mt-5 flex flex-col">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex min-h-11 items-center text-ink/75 transition-colors duration-400 hover:text-gold"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="inline-flex min-h-11 items-center break-all text-ink/75 transition-colors duration-400 hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex min-h-11 items-center text-ink/75">{site.contact.address}</li>
            </ul>

            <div className="mt-5">
              <Button href={site.bookingHref} variant="outline" className="w-full sm:w-auto">
                Book Appointment
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-taupe/30 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-label text-ink/45">
            &copy; {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-1">
            {["Privacy Policy", "Terms & Conditions"].map((l) => (
              <li key={l}>
                {/* TODO(client): legal pages not in scope for the concept. */}
                <Link
                  href="#"
                  className="u-label inline-flex min-h-11 items-center text-ink/45 transition-colors duration-400 hover:text-gold"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
