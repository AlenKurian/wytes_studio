"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
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

    // --- Initial states ---
    gsap.set(logoRef.current, { scale: 1.08, opacity: 0, filter: "blur(10px)" });
    gsap.set(lineWrapRef.current, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(percentRef.current, { opacity: 0 });
    gsap.set(shineRef.current, { opacity: 0 });

    // --- Logo settles into focus ---
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    });

    // --- Progress: line draws + counter runs, in sync ---
    tl.to(lineWrapRef.current, { opacity: 1, duration: 0.3 }, "-=0.4");
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

    // --- Shine: light glare sweeps across the wordmark while progress runs ---
    tl.set(shineRef.current, { opacity: 1 }, "<");
    tl.fromTo(
      shineRef.current,
      { xPercent: -160 },
      {
        xPercent: 160,
        duration: 1.6,
        ease: "power2.inOut",
      },
      "<0.1"
    );
    tl.to(shineRef.current, { opacity: 0, duration: 0.2 });

    // --- Exit: content lifts away, then the curtain splits ---
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -24,
        filter: "blur(8px)",
        duration: 0.5,
        ease: "power2.in",
      },
      "+=0.25"
    );
    tl.to(
      leftRef.current,
      { xPercent: -100, duration: 0.9, ease: "power4.inOut" },
      "-=0.15"
    );
    tl.to(
      rightRef.current,
      { xPercent: 100, duration: 0.9, ease: "power4.inOut" },
      "<"
    );

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
      {/* Curtain halves — each renders half the white panel */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#ffffff] will-change-transform"
      />
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#ffffff] will-change-transform"
      />

      {/* soft pulsing glow behind the mark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(11,11,11,0.06)_0%,rgba(11,11,11,0)_70%)] blur-2xl"
        style={{ animation: "preloader-glow-pulse 3s ease-in-out infinite" }}
      />

      <div
        ref={contentRef}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center will-change-transform"
      >
        {/* WYTES lockup with the progress line + % overlaid on the image */}
        <div
          ref={logoRef}
          className="relative h-64 w-64 overflow-hidden will-change-transform sm:h-80 sm:w-80"
        >
          <Image
            src="/images/studio_logo.jpeg"
            alt="WYTES — The Complete Studio"
            fill
            priority
            sizes="320px"
            className="object-contain"
          />

          {/* diagonal light sweep across the wordmark */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              ref={shineRef}
              className="absolute inset-y-[-40%] left-0 w-1/3 will-change-transform"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
                transform: "rotate(8deg)",
                mixBlendMode: "overlay",
              }}
            />
          </div>

          {/* overlay: sits just below the wordmark inside the image */}
          <div className="absolute inset-x-0 top-[78%] flex flex-col items-center">
            <div
              ref={lineWrapRef}
              className="relative h-px w-40 overflow-hidden bg-wytes-ink/15 sm:w-52"
            >
              <div ref={lineRef} className="h-full w-full origin-left bg-wytes-ink" />
            </div>

            <span
              ref={percentRef}
              className="relative mt-3 text-center font-logo text-[0.6rem] tracking-[0.3em] [text-indent:0.3em] text-wytes-ink/45 tabular-nums"
            >
              {String(percent).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
