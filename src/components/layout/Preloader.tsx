"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WORD = "WYTES";
const TAGLINE = "THE COMPLETE STUDIO";
const LETTERS = WORD.split("");

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const letters = wordRef.current
      ? Array.from(wordRef.current.querySelectorAll<HTMLElement>("[data-letter]"))
      : [];

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });

    // --- Initial state: fragmented, blurred, misaligned WYTES; nothing else visible ---
    gsap.set(compRef.current, { opacity: 1 });
    gsap.set(taglineRef.current, { opacity: 0, y: 8 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "50% 50%" });
    gsap.set(letters, {
      opacity: 0.15,
      filter: "blur(14px)",
      x: () => gsap.utils.random(-40, 40),
      y: () => gsap.utils.random(-26, 26),
      rotation: () => gsap.utils.random(-18, 18),
      scale: () => gsap.utils.random(0.82, 1.2),
    });

    // 0–30%  — fragments hang blurred, then begin to stir
    tl.to(letters, {
      opacity: 0.4,
      duration: 0.9,
      ease: "sine.inOut",
      stagger: { each: 0.05, from: "center" },
    });

    // 30–60% — letters slide toward alignment, blur eases
    tl.to(
      letters,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 0.8,
        filter: "blur(4px)",
        duration: 1.4,
        ease: "power3.inOut",
        stagger: { each: 0.06, from: "edges" },
      },
      "+=0.1"
    );

    // 60–85% — WYTES snaps fully sharp; tagline fades in beneath it
    tl.to(letters, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.9,
      ease: "power2.out",
    });
    tl.to(
      taglineRef.current,
      { opacity: 0.55, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    // 85–100% — the thin line completes; everything locks
    tl.to(
      lineRef.current,
      { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
      "-=0.4"
    );

    // 100% — the whole composition expands outward into the homepage
    tl.to(compRef.current, {
      scale: 26,
      opacity: 0,
      duration: 1.1,
      ease: "power3.in",
    }, "+=0.5");
    tl.to(
      panelRef.current,
      { opacity: 0, duration: 0.6, ease: "power2.inOut" },
      "-=0.55"
    );

    return () => {
      tl.kill();
      html.style.overflow = "";
    };
  }, [reducedMotion]);

  if (done) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex h-dvh w-full items-center justify-center overflow-hidden bg-black"
      aria-hidden="true"
    >
      <div
        ref={compRef}
        className="flex flex-col items-center will-change-transform"
        style={{ opacity: 0 }}
      >
        {/* WYTES — large, white, italic Anton */}
        <div
          ref={wordRef}
          className="flex font-logo text-[18vw] italic leading-none text-white sm:text-[9rem]"
          aria-label={WORD}
        >
          {LETTERS.map((ch, i) => (
            <span
              key={i}
              data-letter
              className="inline-block will-change-transform"
            >
              {ch}
            </span>
          ))}
        </div>

        {/* thin line that expands horizontally */}
        <span
          ref={lineRef}
          className="mt-6 block h-px w-[52vw] max-w-[420px] bg-white/70 will-change-transform"
        />

        {/* THE COMPLETE STUDIO — small, widely tracked */}
        <span
          ref={taglineRef}
          className="mt-5 block font-body text-[1.7vw] font-light uppercase tracking-[0.4em] text-white [text-indent:0.4em] sm:text-xs sm:tracking-[0.5em] sm:[text-indent:0.5em]"
        >
          {TAGLINE}
        </span>
      </div>
    </div>
  );
}
