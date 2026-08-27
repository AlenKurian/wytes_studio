"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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

    // --- Initial states: logo oversized + blurred, progress hidden ---
    gsap.set(logoRef.current, { scale: 4.6, opacity: 0, filter: "blur(22px)" });
    gsap.set(lineWrapRef.current, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(percentRef.current, { opacity: 0 });

    // --- Zoom-through: logo rushes in from huge + blurred into sharp focus ---
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power3.out",
    });

    // --- Progress: line draws + counter runs, in sync ---
    tl.to(lineWrapRef.current, { opacity: 1, duration: 0.3 }, "-=0.35");
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
    <div className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden" aria-hidden="true">
      <div
        ref={panelRef}
        className="relative flex h-full w-full items-center justify-center bg-white will-change-transform"
      >
        <div
          ref={contentRef}
          className="relative flex flex-col items-center will-change-transform"
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

            {/* overlay: sits just below the wordmark inside the image */}
            <div className="absolute inset-x-0 top-[78%] flex flex-col items-center">
              <div
                ref={lineWrapRef}
                className="relative h-px w-40 overflow-hidden bg-wytes-ink/15 sm:w-52"
              >
                <div
                  ref={lineRef}
                  className="h-full w-full origin-left bg-wytes-ink"
                />
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
    </div>
  );
}
