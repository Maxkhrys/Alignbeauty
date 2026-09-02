import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Arrow } from "./Arrow";

type Variant = "primary" | "outline" | "gold";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Show the trailing arrow that slides on hover. */
  arrow?: boolean;
  /** Extra classes on the arrow — used to hide it where space is tight. */
  arrowClassName?: string;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

/*
 * Minimal radius, fine border, spaced uppercase label. The hover is a fill that
 * wipes up from the bottom plus a 1.01 scale — no pills, no shadow, no bounce.
 */
const base =
  "group relative inline-flex min-h-11 items-center justify-center gap-3 overflow-hidden " +
  "rounded-[2px] border px-7 py-3.5 u-label whitespace-nowrap " +
  "transition-[transform,color,border-color] duration-500 ease-[var(--ease-align)] " +
  "hover:scale-[1.01] active:scale-100 motion-reduce:hover:scale-100";

const variants: Record<Variant, { root: string; fill: string }> = {
  primary: {
    root: "border-ink bg-ink text-cream hover:text-cream",
    fill: "bg-espresso",
  },
  outline: {
    root: "border-gold/45 bg-transparent text-ink hover:border-gold hover:text-cream",
    fill: "bg-espresso",
  },
  gold: {
    root: "border-gold bg-gold text-cream",
    fill: "bg-espresso",
  },
};

export function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  arrowClassName = "",
  className = "",
  ...rest
}: Props) {
  const v = variants[variant];

  return (
    <Link href={href} className={`${base} ${v.root} ${className}`} {...rest}>
      {/* Fill wipe. scaleY from the bottom edge — compositor-only. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform
          duration-[600ms] ease-[var(--ease-align)] group-hover:scale-y-100
          motion-reduce:hidden ${v.fill}`}
      />
      <span className="relative">{children}</span>
      {arrow && (
        <Arrow className={`relative w-6 transition-transform duration-500 ease-[var(--ease-align)] group-hover:translate-x-1.5 ${arrowClassName}`} />
      )}
    </Link>
  );
}
