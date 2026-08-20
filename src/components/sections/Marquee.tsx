"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PHRASE = "THE COMPLETE STUDIO";
const PX_PER_SECOND = 70;
const REPEAT_COUNT = 10;

export function Marquee() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const track = trackRef.current;
      if (!track || reducedMotion) return;

      let tween: gsap.core.Tween | undefined;

      function createTween() {
        if (!track) return;
        const width = track.scrollWidth / 2;
        tween?.kill();
        gsap.set(track, { xPercent: 0 });
        tween = gsap.to(track, {
          xPercent: -50,
          duration: width / PX_PER_SECOND,
          ease: "none",
          repeat: -1,
        });
      }
      createTween();

      window.addEventListener("resize", createTween);
      return () => {
        window.removeEventListener("resize", createTween);
        tween?.kill();
      };
    },
    wrapperRef,
    [reducedMotion]
  );

  const items = reducedMotion
    ? [0]
    : Array.from({ length: REPEAT_COUNT * 2 }, (_, i) => i);

  return (
    <div ref={wrapperRef} className="overflow-hidden border-y border-wytes-ink/10 py-4">
      <div ref={trackRef} className="flex w-max items-center whitespace-nowrap">
        {items.map((i) => (
          <span
            key={i}
            className="mx-4 flex items-center gap-4 font-display text-sm tracking-[0.2em] text-wytes-ink/70 sm:text-base"
          >
            {PHRASE}
            <span aria-hidden="true" className="text-wytes-red">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
