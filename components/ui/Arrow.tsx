/** The brand-sheet arrow. Inline SVG so it inherits colour and animates cheaply. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 10"
      fill="none"
      aria-hidden="true"
      className={`h-[0.6em] w-10 shrink-0 overflow-visible ${className}`}
    >
      <path d="M0 5h38" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path
        d="M33 1l4.5 4-4.5 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Circled arrow, used on the editorial and service links. */
export function ArrowCircle({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid size-11 shrink-0 place-items-center rounded-full border border-current/40
        transition-[border-color,background-color] duration-500 ease-[var(--ease-align)]
        group-hover:border-current ${className}`}
    >
      <Arrow className="w-5 transition-transform duration-500 ease-[var(--ease-align)] group-hover:translate-x-1" />
    </span>
  );
}
