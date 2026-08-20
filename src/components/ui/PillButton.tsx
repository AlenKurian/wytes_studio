import clsx from "clsx";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type PillButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "filled" | "outline";
  children: ReactNode;
  href?: string;
};

export function PillButton({
  variant = "filled",
  className,
  children,
  href,
  ...anchorProps
}: PillButtonProps) {
  const pillClassName = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    variant === "filled"
      ? "bg-wytes-ink text-wytes-cream hover:bg-black"
      : "border border-current bg-transparent hover:bg-black/5",
    className
  );

  // Internal routes get client-side navigation (so shared layout state like the
  // preloader doesn't remount); anything else (mailto:, hash-only, external) stays
  // a plain anchor.
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={pillClassName} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={pillClassName} {...anchorProps}>
      {children}
    </a>
  );
}
