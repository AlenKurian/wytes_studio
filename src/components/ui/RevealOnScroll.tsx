"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function RevealOnScroll({
  children,
  className,
  y = 40,
  x = 0,
  delay = 0,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      if (!ref.current || reducedMotion) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
          },
        }
      );
    },
    ref,
    [reducedMotion]
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
