/**
 * ALIGN wordmark, set live in the display serif so it renders crisply at any
 * size and inherits colour. `size` drives the cap height; the rule + subtitle
 * scale from it.
 */
export function Wordmark({
  className = "",
  size = "1.5rem",
  subtitle = true,
}: {
  className?: string;
  size?: string;
  subtitle?: boolean;
}) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      style={{ fontSize: size }}
    >
      <span className="u-wordmark">Align</span>
      {subtitle && (
        <span className="mt-[0.42em] flex w-full items-center gap-[0.5em]">
          <span className="h-px min-w-[0.6em] flex-1 bg-current opacity-45" />
          <span
            className="u-label whitespace-nowrap"
            // Floored so the lockup stays legible on small phones.
            style={{ fontSize: "max(0.28em, 0.5rem)", letterSpacing: "0.22em", textIndent: "0.22em" }}
          >
            Beauty Lounge
          </span>
          <span className="h-px min-w-[0.6em] flex-1 bg-current opacity-45" />
        </span>
      )}
    </span>
  );
}
