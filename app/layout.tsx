import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-bodoni",
});

const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alignbeautylounge.ie"),
  title: {
    default: `${site.fullName} — Elevated Beauty`,
    template: `%s — ${site.fullName}`,
  },
  description:
    "A luxurious space, expert services and elevated beauty. Nails, beauty, academy and private events at Align Beauty Lounge.",
  openGraph: {
    title: `${site.fullName} — Elevated Beauty`,
    description: "A luxurious space. Expert services. Elevated beauty.",
    type: "website",
    locale: "en_IE",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3ECE4",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${bodoni.variable} ${dm.variable}`}>
      <head>
        {/* Scroll reveals are server-rendered at opacity 0 and animated in by
            JS. Without JS they would never appear, so show the finished state. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="u-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
            focus:rounded-[2px] focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
