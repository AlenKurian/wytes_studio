"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GRID = 3;
const PIECES = Array.from({ length: GRID * GRID }, (_, i) => ({
  row: Math.floor(i / GRID),
  col: i % GRID,
}));

function cornerClass(row: number, col: number) {
  if (row === 0 && col === 0) return "rounded-tl-[2rem]";
  if (row === 0 && col === GRID - 1) return "rounded-tr-[2rem]";
  if (row === GRID - 1 && col === 0) return "rounded-bl-[2rem]";
  if (row === GRID - 1 && col === GRID - 1) return "rounded-br-[2rem]";
  return "";
}

// Corner pieces stay plain rectangles (so the card's rounded corners stay intact).
// The 5 edge/center pieces fly in as irregular shards, then morph back to a flush
// rectangle (same point count, so GSAP can interpolate the shape) exactly as they land
// — that way the assembled card has no gaps, but each piece reads as a distinct shape
// while it's still in flight.
const SHARD_CLIP: Record<number, { from: string; to: string }> = {
  1: {
    from: "polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)",
    to: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
  },
  3: {
    from: "polygon(0% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%)",
    to: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  4: {
    from: "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
    to: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)",
  },
  5: {
    from: "polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 80%)",
    to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)",
  },
  7: {
    from: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)",
    to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)",
  },
};

function bgPos(index: number) {
  return index === 0 ? "0%" : index === GRID - 1 ? "100%" : "50%";
}

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const subtitleRevealRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const pieces = pieceRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    const flightDuration = 1.7;

    // Shuffle stagger start times across the pieces so they don't all launch in grid order.
    const starts = pieces.map((_, i) => i * 0.1);
    for (let i = starts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [starts[i], starts[j]] = [starts[j], starts[i]];
    }

    const tl = gsap.timeline({
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });

    const maxFlightEnd = Math.max(...starts) + flightDuration;

    pieces.forEach((piece, i) => {
      const clip = SHARD_CLIP[i];
      tl.fromTo(
        piece,
        {
          opacity: 0,
          scale: 0.4,
          x: gsap.utils.random(-560, 560),
          y: gsap.utils.random(-420, 420),
          rotation: gsap.utils.random(-170, 170),
          ...(clip ? { clipPath: clip.from } : {}),
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: flightDuration,
          ease: "power3.out",
          ...(clip ? { clipPath: clip.to } : {}),
        },
        starts[i]
      );
    });

    tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 18, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.8)" },
        maxFlightEnd - 0.35
      )
      .set(subtitleRef.current, { opacity: 1 })
      .fromTo(
        subtitleRevealRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power2.inOut" },
        "-=0.05"
      )
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.92,
        yPercent: -16,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        panelRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.1"
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
        <div
          className="pointer-events-none absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,120,20,0.55)_0%,rgba(255,80,0,0)_70%)] blur-2xl sm:h-80 sm:w-80"
          style={{ animation: "preloader-glow-pulse 2.6s ease-in-out infinite" }}
        />

        <div
          ref={contentRef}
          className="relative grid h-72 w-72 grid-cols-3 grid-rows-3 rounded-[2rem] shadow-[0_25px_70px_rgba(255,80,0,0.45)] ring-1 ring-white/40 will-change-transform sm:h-80 sm:w-80"
        >
          {PIECES.map(({ row, col }, index) => (
            <div
              key={index}
              ref={(el) => {
                pieceRefs.current[index] = el;
              }}
              className={`will-change-transform ${cornerClass(row, col)}`}
              style={{
                background: "linear-gradient(135deg, #ffbb46, #ff3600)",
                backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                backgroundPosition: `${bgPos(col)} ${bgPos(row)}`,
                clipPath: SHARD_CLIP[index]?.from,
              }}
            />
          ))}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent [animation:nav-cta-shine_2.8s_ease-in-out_infinite]"
            />

            <span
              ref={wordmarkRef}
              className="relative font-logo text-2xl italic text-wytes-ink sm:text-5xl"
            >
              WYTES
            </span>

            <span
              ref={subtitleRef}
              className="relative mt-1.5 font-logo text-xs tracking-[0.3em] opacity-0 sm:text-sm"
            >
              <span className="text-wytes-ink/10">THE COMPLETE STUDIO</span>
              <span
                ref={subtitleRevealRef}
                className="absolute inset-0 text-wytes-ink/70"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                THE COMPLETE STUDIO
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
