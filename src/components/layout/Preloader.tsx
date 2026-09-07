"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// The logo is tiled into a fine grid of small squares, each a full copy of the
// image clipped to its cell so they reconstruct the logo. As loading progresses
// the tiles peel off one by one — drift, spin, shrink, fade — until none remain.
const COLS = 16;
const ROWS = 16;
const TOTAL = COLS * ROWS;

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  // static per-tile data: clip rect + a shuffled dissolve order
  const tiles = useMemo(() => {
    const arr = Array.from({ length: TOTAL }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      return {
        i,
        col,
        row,
        clip: `inset(${(row / ROWS) * 100}% ${
          100 - ((col + 1) / COLS) * 100
        }% ${100 - ((row + 1) / ROWS) * 100}% ${(col / COLS) * 100}%)`,
        driftX: (Math.random() * 2 - 1) * 90,
        driftY: -20 - Math.random() * 120,
        rot: (Math.random() * 2 - 1) * 120,
      };
    });
    // dissolve order: mostly left-to-right with heavy random jitter
    const order = arr
      .map((t) => ({ i: t.i, key: t.col + (Math.random() * 2 - 1) * 6 }))
      .sort((a, b) => a.key - b.key)
      .map((o) => o.i);
    return { arr, order };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const counter = { value: 0 };
    const getTile = (i: number) => tileRefs.current[i];

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });

    // --- Start: logo whole, overlay + progress hidden ---
    tiles.arr.forEach((t) => {
      const el = getTile(t.i);
      if (el) gsap.set(el, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
    });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(lineWrapRef.current, { opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(percentRef.current, { opacity: 0 });

    // --- Loading phase (~3.6s): progress runs while tiles erode away ---
    const LOAD = 3.6;
    tl.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    tl.to(lineWrapRef.current, { opacity: 1, duration: 0.3 }, "<");
    tl.to(percentRef.current, { opacity: 1, duration: 0.3 }, "<");
    tl.to(lineRef.current, { scaleX: 1, duration: LOAD, ease: "none" }, "<");
    tl.to(
      counter,
      {
        value: 100,
        duration: LOAD,
        ease: "none",
        onUpdate: () => setPercent(Math.round(counter.value)),
      },
      "<"
    );

    // 88% of the tiles peel off gradually across the load...
    const startCount = Math.floor(TOTAL * 0.88);
    const gradual = tiles.order.slice(0, startCount);
    const remainder = tiles.order.slice(startCount);

    gradual.forEach((idx, n) => {
      const el = getTile(idx);
      const t = tiles.arr[idx];
      if (!el) return;
      const at = (n / startCount) * (LOAD - 0.2);
      tl.to(
        el,
        {
          x: t.driftX,
          y: t.driftY,
          rotation: t.rot,
          scale: 0.2,
          opacity: 0,
          duration: 0.5 + Math.random() * 0.3,
          ease: "power2.out",
        },
        at
      );
    });

    // --- Final burst at ~100%: the last tiles disperse together ---
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25 }, LOAD - 0.15);
    remainder.forEach((idx) => {
      const el = getTile(idx);
      const t = tiles.arr[idx];
      if (!el) return;
      tl.to(
        el,
        {
          x: t.driftX * 1.6,
          y: t.driftY * 1.6,
          rotation: t.rot * 1.5,
          scale: 0.15,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        LOAD - 0.1 + Math.random() * 0.15
      );
    });

    // --- Panel lifts away ---
    tl.to(
      panelRef.current,
      { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
      LOAD + 0.5
    );

    return () => {
      tl.kill();
      html.style.overflow = "";
    };
  }, [reducedMotion, tiles]);

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
          {/* WYTES lockup — fine grid of image tiles that dissolve away */}
          <div
            ref={logoRef}
            className="relative h-64 w-64 will-change-transform sm:h-80 sm:w-80"
          >
            <div className="absolute inset-0">
              {tiles.arr.map((t) => (
                <div
                  key={t.i}
                  ref={(el) => {
                    tileRefs.current[t.i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{ clipPath: t.clip }}
                >
                  <Image
                    src="/images/studio_logo.jpeg"
                    alt={t.i === 0 ? "WYTES — The Complete Studio" : ""}
                    fill
                    priority
                    sizes="320px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* overlay: sits just below the wordmark inside the image */}
            <div
              ref={overlayRef}
              className="absolute inset-x-0 top-[78%] flex flex-col items-center"
            >
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
