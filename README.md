# ALIGN Beauty Lounge — concept site

A single-page front-end concept for Align Beauty Lounge. **Design only** — there is
no backend, database, CMS, auth, payments or booking system, by design.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion 12 · `next/image`

No GSAP. Every effect in the brief — hero reveal, staggered typography, nav fade,
panel entrance, line reveals, arrow transitions, parallax — is covered by Motion's
`whileInView` / `useScroll` plus CSS transitions, at a fraction of the bundle. GSAP
would have added weight without improving anything on the page.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Art direction

Taken from the supplied moodboards and brand sheet, not invented.

| Token | Hex | Role |
|---|---|---|
| `cream` | `#F3ECE4` | page ground |
| `ivory` | `#F7F2EB` | alternating sections |
| `champagne` | `#E6D9C8` | service band |
| `taupe` | `#B8A58C` | rules, muted labels |
| `gold` | `#96724E` | eyebrows, hairlines, `BOOK NOW` |
| `espresso` | `#46382A` | Academy section, button fills |
| `ink` | `#1A1714` | body text, primary buttons, panels |

**Type** — Bodoni Moda for display statements and the wordmark; DM Sans for body,
labels and navigation (spaced uppercase). Both via `next/font`, self-hosted, no CLS.

**The diagonal** is the brand's one structural idea, so it recurs at every scale and
is always a `clip-path` polygon — never a skew — so the photographs inside stay
geometrically true:

- Hero: three leaning panels over the backdrop, copy inside the shape.
- Services: the lean reverses and the label moves outside the shape.
- Booking CTA: one espresso plate slicing across the photograph.
- Phone: the wedge between a card's image and its copy.

**Motion** is one easing curve (`--ease-align`) and transform/opacity only. Phone
animations are shorter and shallower than desktop. `prefers-reduced-motion` renders
the finished state outright rather than shortening the fade.

## Layout

Mobile is a deliberate layout, not a shrunk desktop. The first phone viewport carries
the wordmark, `ELEVATED BEAUTY.`, the supporting copy and `BOOK APPOINTMENT` — verified
at 320/360/375/390/414/430. Desktop verified at 1280/1366/1440/1536/1728/1920/2560.

Verified across all fifteen widths: no horizontal overflow, no text below 11px other
than the logo lockup's sub-line, every control ≥44px tall, CLS 0.

## Structure

```
app/         layout (fonts, metadata), page, design tokens in globals.css
components/  Header, MobileMenu, Hero, HeroServicePanel, MoreThanBeauty,
             Services, Academy, EditorialSection, BookingCTA, Footer
components/ui/  Reveal, AnimatedText, Button, Arrow, Wordmark, SocialIcon
lib/site.ts  all copy, service data and contact details
public/images  optimised photography
assets-source/ the original uploads, untouched
```

## Placeholders — replace before launch

Everything the client has not confirmed lives in `lib/site.ts` and is marked
`TODO(client)`:

- **Phone, email, address** are the values from the concept mockup, not confirmed
  details: `+353 87 123 4567`, `hello@alignbeautylounge.ie`, `Arklow, Co. Wicklow`.
- **Social links** point at `#`.
- **Booking** — every `Book Appointment` / `Book Now` scrolls to the on-page `#book`
  section. Pointing `site.bookingHref` at a real provider (Fresha, Phorest, …) is a
  one-line change. The CTA's own button dials the placeholder number.
- **Info and legal links** (About, Gift Cards, Careers, FAQ, Privacy, Terms) have no
  destination pages in this concept.

## Imagery

The `02 · Beauty` portrait was extracted from the supplied brand sheet, which is the
only place it exists — it is ~640px wide where the others are 1672px. It holds up at
the sizes used here, but replacing `public/images/beauty.jpg` with a full-resolution
portrait is the single biggest image-quality win available.
