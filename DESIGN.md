# Implementation notes

Decisions a future editor would otherwise have to reverse-engineer.

## `clip-path`, not `skew`

A skewed parent needs a counter-skewed child, which distorts the photograph and
softens its edges. Each panel is a polygon instead, so the frame leans while the
image inside stays square. `--lean` (the top edge's horizontal offset, as a % of
panel width) is 16% in the hero and 13% — mirrored — in Services.

## Type scale

Every step is a `clamp()` in `globals.css`. `--step-hero` is `clamp(2.5rem, 5.4vw,
6.5rem)`: the vw term keeps large displays from looking like a scaled-up 1440
layout, and the max stops `ELEVATED` from outgrowing its column and being clipped by
the reveal mask. `.shell` caps content at 108rem while still growing past 1440.

## Reveal masks

`AnimatedText` puts each line in an `overflow-hidden` track and translates it up from
105%. That track clips horizontally too, so display type must fit its column — if a
heading is ever lengthened, re-check it at 1280 and 1440 first.

## Reduced motion

`useReducedMotion()` sets the hidden state to the *finished* state rather than
shortening the transition. A fade is still motion. This also means the page is fully
readable if JS fails; a `<noscript>` rule in the root layout unhides anything the
server rendered at `opacity: 0`.

## Image quality

Next 16 only honours `quality` values listed in `images.qualities` in
`next.config.ts` — anything else silently degrades to 75. The hero is 92, the large
editorial images 88–90, thumbnails 70–80. `deviceSizes` is tuned to the breakpoints
this design is actually tested at, and every `<Image>` carries a `sizes` matched to
its real rendered width so retina phones get a ≥1.2× density source.

`objectPosition` is set per image in `lib/site.ts` so no focal point — a face, a
hand — is ever cropped by a change in aspect ratio.

## Things deliberately avoided

WebGL, canvas, scroll hijacking, continuous animation loops, backdrop blur, large UI
libraries, pill buttons, glassmorphism, and any layout that depends on hover.
