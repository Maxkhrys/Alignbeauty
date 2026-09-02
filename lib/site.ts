/**
 * Single source of truth for site content.
 *
 * TODO(client): every value in `contact` and `social` is a PLACEHOLDER taken
 * from the concept mockup. Replace before this goes anywhere near production.
 */

export const site = {
  name: "ALIGN",
  fullName: "Align Beauty Lounge",
  tagline: "Elevated beauty.",

  /* All booking CTAs resolve here. Swapping to a real booking provider is a
     one-line change: point `bookingHref` at the external URL. */
  bookingHref: "#book",

  contact: {
    /* TODO(client): placeholder */
    phone: "+353 87 123 4567",
    phoneHref: "tel:+353871234567",
    email: "hello@alignbeautylounge.ie",
    emailHref: "mailto:hello@alignbeautylounge.ie",
    address: "Arklow, Co. Wicklow",
  },

  social: [
    /* TODO(client): placeholder handles */
    { label: "Instagram", href: "#", icon: "instagram" as const },
    { label: "Facebook", href: "#", icon: "facebook" as const },
    { label: "TikTok", href: "#", icon: "tiktok" as const },
  ],
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Academy", href: "#academy" },
  { label: "Events", href: "#academy" },
] as const;

export type Service = {
  index: string;
  title: string;
  titleLines: string[];
  statement: string[];
  image: string;
  alt: string;
  /* object-position tuned per image so no face or focal point gets cropped.
     The desktop panels crop to a portrait box, the mobile cards to a near
     square, so the two need different framing. */
  position: string;
  positionMobile?: string;
  href: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "Nails",
    titleLines: ["Nails"],
    statement: ["Details that", "define you."],
    image: "/images/nails-v2.webp",
    alt: "Close-up of a hand with a soft natural almond-shaped manicure resting on marble",
    position: "50% 48%",
    positionMobile: "50% 44%",
    href: "#services",
  },
  {
    index: "02",
    title: "Beauty",
    titleLines: ["Beauty"],
    statement: ["Enhance your", "natural beauty."],
    image: "/images/beauty-v2.webp",
    alt: "Portrait of a woman with softly defined brows and a warm glowing makeup finish",
    position: "50% 42%",
    positionMobile: "50% 37%",
    href: "#services",
  },
  {
    index: "03",
    title: "Academy & Events",
    titleLines: ["Academy &", "Events"],
    statement: ["Learn. Celebrate.", "Elevate."],
    image: "/images/academy-v2.webp",
    alt: "The Align Beauty Lounge treatment floor, lit shelving and brass manicure stations",
    position: "52% 43%",
    positionMobile: "52% 39%",
    href: "#academy",
  },
];

export const marquee = [
  "Nails",
  "Pedicure",
  "Beauty",
  "Academy",
  "Private Events",
] as const;
