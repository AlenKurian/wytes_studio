"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LOGO_SRC = "/images/studio_logo.jpeg";
const GRID = 4; // 4x4 = 16 shards
const LOGO_PX = 320;

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  // static shard descriptors — position in the grid + a scattered start offset
  const shards = useMemo(() => {
    const cell = LOGO_PX / GRID;
    const items: {
      key: string;
      left: number;
      top: number;
      bgX: number;
      bgY: number;
      fromX: number;
      fromY: number;
      fromRot: number;
    }[] = [];
    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        // deterministic pseudo-random scatter so SSR/CSR match
        const seed = row * GRID + col;
        const rand = (n: number) => {
          const x = Math.sin(seed * 999 + n * 57.13) * 43758.5453;
          return x - Math.floor(x);
        };
        const angle = rand(1) * Math.PI * 2;
        const dist = 180 + rand(2) * 180;
        items.push({
          key: `${row}-${col}`,
          left: col * cell,
          top: row * cell,
          // background-position %: 0% = first cell, 100% = last cell
          bgX: GRID > 1 ? (col / (GRID - 1)) * 100 : 0,
          bgY: GRID > 1 ? (row / (GRID - 1)) * 100 : 0,
          fromX: Math.cos(angle) * dist,
          fromY: Math.sin(angle) * dist,
          fromRot: (rand(3) - 0.5) * 90,
        });
      }
    }
    return items;
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const counter = { value: 0 };
    const shardEls = shardsRef.current
      ? Array.from(shardsRef.current.children)
      : [];

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });

    // --- Initial states ---
    gsap.set(lineWrapRef.current, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(percentRef.current, { opacity: 0 });
    gsap.set(flashRef.current, { opacity: 0 });
    gsap.set(shardEls, {
      x: (i: number) => shards[i].fromX,
      y: (i: number) => shards[i].fromY,
      rotate: (i: number) => shards[i].fromRot,
      scale: 0.85,
      opacity: 0,
      filter: "blur(4px)",
    });

    // --- Shards drift in from all sides and ease together into the lockup ---
    tl.to(shardEls, {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 2.6,
      ease: "power2.inOut",
      stagger: { each: 0.06, from: "edges" },
    });

    // --- Settle: soft flash + gentle breathe as the pieces lock together ---
    tl.to(flashRef.current, { opacity: 0.4, duration: 0.5, ease: "sine.inOut" }, "-=0.5");
    tl.to(flashRef.current, { opacity: 0, duration: 0.9, ease: "sine.out" });
    tl.fromTo(
      stageRef.current,
      { scale: 1.02 },
      { scale: 1, duration: 1, ease: "power2.out" },
      "<"
    );

    // --- Progress: line draws + counter runs, in sync ---
    tl.to(lineWrapRef.current, { opacity: 1, duration: 0.5 }, "-=0.4");
    tl.to(percentRef.current, { opacity: 1, duration: 0.5 }, "<");
    tl.to(lineRef.current, { scaleX: 1, duration: 2.6, ease: "power1.inOut" }, "<");
    tl.to(
      counter,
      {
        value: 100,
        duration: 2.6,
        ease: "power1.inOut",
        onUpdate: () => setPercent(Math.round(counter.value)),
      },
      "<"
    );

    // --- Exit: content lifts away, then the curtain splits ---
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -24,
        filter: "blur(8px)",
        duration: 0.9,
        ease: "power2.inOut",
      },
      "+=0.35"
    );
    tl.to(
      leftRef.current,
      { xPercent: -100, duration: 1.3, ease: "power3.inOut" },
      "-=0.3"
    );
    tl.to(
      rightRef.current,
      { xPercent: 100, duration: 1.3, ease: "power3.inOut" },
      "<"
    );

    return () => {
      tl.kill();
      html.style.overflow = "";
    };
  }, [reducedMotion, shards]);

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
        <div
          ref={stageRef}
          className="relative h-64 w-64 will-change-transform sm:h-80 sm:w-80"
        >
          {/* shard grid — each piece is a window onto the same logo image */}
          <div ref={shardsRef} className="absolute inset-0">
            {shards.map((s) => (
              <div
                key={s.key}
                className="absolute will-change-transform"
                style={{
                  left: `${(s.left / LOGO_PX) * 100}%`,
                  top: `${(s.top / LOGO_PX) * 100}%`,
                  width: `${100 / GRID}%`,
                  height: `${100 / GRID}%`,
                  backgroundImage: `url(${LOGO_SRC})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                  backgroundPosition: `${s.bgX}% ${s.bgY}%`,
                }}
              />
            ))}
          </div>

          {/* impact flash */}
          <div
            ref={flashRef}
            className="pointer-events-none absolute inset-0 bg-white will-change-[opacity]"
          />

          {/* overlay: progress line + % sit just below the wordmark */}
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
