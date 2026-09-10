"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WORD = "WYTES";
const TAGLINE = "THE COMPLETE STUDIO";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  // the four black shutters that pull back to open the frame
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  // the thin white line that opens into a frame
  const frameRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });

    // --- Initial state: shutters closed; frame is a 1px-wide slit at center ---
    gsap.set(topRef.current, { top: 0, bottom: "50%" });
    gsap.set(bottomRef.current, { top: "50%", bottom: 0 });
    gsap.set(leftRef.current, { left: 0, right: "50%" });
    gsap.set(rightRef.current, { left: "50%", right: 0 });
    gsap.set(frameRef.current, { width: 0, height: 4, opacity: 0 });
    gsap.set(lockupRef.current, { opacity: 0, scale: 1.04 });

    // --- 1. a thin white vertical line grows in the center ---
    tl.to(frameRef.current, { opacity: 1, duration: 0.2 });
    tl.to(frameRef.current, { height: "62vh", duration: 0.9, ease: "power2.out" }, "<0.05");

    // --- 2. the line opens into a rectangular frame ---
    tl.to(
      frameRef.current,
      { width: "min(78vw, 620px)", duration: 0.8, ease: "power2.inOut" },
      "+=0.15"
    );

    // --- 3. the lockup fades up inside the frame ---
    tl.to(
      lockupRef.current,
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
      "-=0.3"
    );

    // --- 4. hold, then the shutters pull fully open, revealing the site ---
    tl.to(lockupRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.6");
    tl.to(frameRef.current, { opacity: 0, duration: 0.4 }, "<");
    const shutterEase = "power4.inOut";
    tl.to(topRef.current, { bottom: "100%", duration: 1, ease: shutterEase }, "<0.1");
    tl.to(bottomRef.current, { top: "100%", duration: 1, ease: shutterEase }, "<");
    tl.to(leftRef.current, { right: "100%", duration: 1, ease: shutterEase }, "<");
    tl.to(rightRef.current, { left: "100%", duration: 1, ease: shutterEase }, "<");

    return () => {
      tl.kill();
      html.style.overflow = "";
    };
  }, [reducedMotion]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* four white shutters — together they cover the screen, then retract */}
      <div ref={topRef} className="absolute left-0 right-0 bg-white will-change-[top,bottom]" />
      <div ref={bottomRef} className="absolute left-0 right-0 bg-white will-change-[top,bottom]" />
      <div ref={leftRef} className="absolute top-0 bottom-0 bg-white will-change-[left,right]" />
      <div ref={rightRef} className="absolute top-0 bottom-0 bg-white will-change-[left,right]" />

      {/* centered stack: frame line, lockup */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* thin ink line that opens into a rectangular frame */}
        <div
          ref={frameRef}
          className="absolute border border-wytes-ink/80 will-change-[width,height]"
        />

        {/* WYTES lockup shown inside the frame */}
        <div
          ref={lockupRef}
          className="relative z-[1] flex flex-col items-center will-change-transform"
        >
          <svg
            viewBox="0 0 1000 320"
            className="w-[60vw] max-w-[560px]"
            role="img"
            aria-label="WYTES — The Complete Studio"
          >
            <text
              x="500"
              y="223"
              textAnchor="middle"
              fontFamily="var(--font-anton), sans-serif"
              fontStyle="italic"
              fontWeight={400}
              fontSize="230"
              letterSpacing="0"
              fill="var(--color-wytes-ink)"
            >
              {WORD}
            </text>
            <text
              x="500"
              y="268"
              textAnchor="middle"
              textLength="500"
              lengthAdjust="spacing"
              fontFamily="var(--font-inter), sans-serif"
              fontWeight={300}
              fontSize="34"
              fill="var(--color-wytes-ink)"
              fillOpacity="0.4"
            >
              {TAGLINE}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
