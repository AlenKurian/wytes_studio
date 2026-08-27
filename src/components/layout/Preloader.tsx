"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const counter = { value: 0 };

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });

    // --- Initial states: wordmark oversized + blurred, everything hidden ---
    gsap.set(wordmarkRef.current, {
      scale: 4.6,
      opacity: 0,
      filter: "blur(22px)",
    });
    gsap.set(subtitleRef.current, { opacity: 0, y: 10, letterSpacing: "0.7em" });
    gsap.set(lineWrapRef.current, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(percentRef.current, { opacity: 0 });

    // --- Zoom-through: WYTES rushes in from huge + blurred into sharp focus ---
    tl.to(wordmarkRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power3.out",
    });

    // --- Subtitle settles in under it ---
    tl.to(
      subtitleRef.current,
      { opacity: 1, y: 0, letterSpacing: "0.5em", duration: 0.7 },
      "-=0.55"
    );

    // --- Progress: line draws + counter runs, in sync ---
    tl.to(lineWrapRef.current, { opacity: 1, duration: 0.3 }, "-=0.2");
    tl.to(percentRef.current, { opacity: 1, duration: 0.3 }, "<");
    tl.to(lineRef.current, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, "<");
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.7,
        ease: "power2.inOut",
        onUpdate: () => setPercent(Math.round(counter.value)),
      },
      "<"
    );

    // --- Exit: logo pushes past the viewer (scales up + blurs), panel wipes up ---
    tl.to(
      contentRef.current,
      {
        scale: 3.4,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.7,
        ease: "power2.in",
      },
      "+=0.2"
    );
    tl.to(
      panelRef.current,
      { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
      "-=0.3"
    );

    return () => {
      tl.kill();
      html.style.overflow = "";
    };
  }, [reducedMotion]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      <div
        ref={panelRef}
        className="relative flex h-full w-full items-center justify-center bg-white will-change-transform"
      >
        {/* soft pulsing glow behind the mark */}
        <div
          className="pointer-events-none absolute h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(11,11,11,0.06)_0%,rgba(11,11,11,0)_70%)] blur-2xl"
          style={{ animation: "preloader-glow-pulse 3s ease-in-out infinite" }}
        />

        <div
          ref={contentRef}
          className="relative flex flex-col items-stretch will-change-transform"
        >
          {/* WYTES lockup — big wordmark, small wide-tracked subtitle beneath */}
          <span
            ref={wordmarkRef}
            className="relative inline-block pr-[0.12em] font-logo text-7xl italic leading-[0.85] text-wytes-ink will-change-transform sm:text-9xl"
          >
            WYTES
          </span>
          <span
            ref={subtitleRef}
            className="relative mt-2 self-stretch text-center font-logo text-[0.5rem] tracking-[0.5em] [word-spacing:0.6em] [text-indent:0.5em] text-[#8a8a8a] sm:text-sm"
          >
            THE COMPLETE STUDIO
          </span>

          {/* progress line */}
          <div
            ref={lineWrapRef}
            className="relative mt-6 h-px w-70 overflow-hidden bg-wytes-ink/10 sm:w-82"
          >
            <div ref={lineRef} className="h-full w-full origin-left bg-wytes-ink" />
          </div>

          <span
            ref={percentRef}
            className="relative mt-3 self-stretch text-center font-logo text-[0.6rem] tracking-[0.3em] [text-indent:0.3em] text-wytes-ink/45 tabular-nums"
          >
            {String(percent).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
