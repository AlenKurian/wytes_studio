"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WORD = "WYTES";
const TAGLINE = "THE COMPLETE STUDIO";

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGRectElement>(null);
  const taglineVeilRef = useRef<SVGRectElement>(null);
  const textRef = useRef<SVGGElement>(null);
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
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        html.style.overflow = "";
        setDone(true);
      },
    });

    // --- Initial states ---
    // fill rect is clipped to 0 width via a scaleX transform on its own origin
    gsap.set([fillRef.current, taglineVeilRef.current], {
      scaleX: 0,
      transformOrigin: "0% 50%",
    });
    gsap.set(textRef.current, { opacity: 0, scale: 1.06, transformOrigin: "50% 50%" });
    gsap.set(percentRef.current, { opacity: 0 });

    // --- Wordmark settles in (still knocked out — reads as ink-on-ink relief) ---
    tl.to(textRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    });

    // --- The fill sweeps left -> right through the letters, in sync with progress ---
    tl.to(percentRef.current, { opacity: 1, duration: 0.6 }, "-=0.3");
    tl.to(
      [fillRef.current, taglineVeilRef.current],
      { scaleX: 1, duration: 3.4, ease: "none" },
      "<"
    );
    tl.to(
      counter,
      {
        value: 100,
        duration: 2.5,
        ease: "none",
        onUpdate: () => setPercent(Math.round(counter.value)),
      },
      "<"
    );

    // --- Exit: brief hold on the finished wordmark, then the panel wipes up ---
    tl.to(percentRef.current, { opacity: 0, duration: 0.5 }, "+=0.4");
    tl.to(
      textRef.current,
      { scale: 1.04, opacity: 0, duration: 0.7, ease: "power2.in" },
      "<"
    );
    tl.to(
      panelRef.current,
      { yPercent: -100, duration: 1.1, ease: "power4.inOut" },
      "-=0.25"
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
      <div
        ref={panelRef}
        className="relative flex h-full w-full items-center justify-center bg-white will-change-transform"
      >
        {/* soft pulsing glow behind the mark */}
        <div
          className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(11,11,11,0.06)_0%,rgba(11,11,11,0)_70%)] blur-2xl"
          style={{ animation: "preloader-glow-pulse 3s ease-in-out infinite" }}
        />

        <div className="relative flex flex-col items-center">
          {/*
            The wordmark is drawn twice inside one SVG:
            - a faint stroke-only version so the letters are always faintly visible
            - a cream fill clipped by a sweeping rect, revealed as progress runs
          */}
          <svg
            viewBox="0 0 1000 320"
            className="w-[72vw] max-w-[660px]"
            role="img"
            aria-label="WYTES — The Complete Studio"
          >
            <defs>
              <clipPath id="preloader-word-clip">
                {/* wordmark */}
                <text
                  x="500"
                  y="223"
                  textAnchor="middle"
                  fontFamily="var(--font-anton), sans-serif"
                  fontStyle="italic"
                  fontWeight={400}
                  fontSize="230"
                  letterSpacing="0"
                >
                  {WORD}
                </text>
                {/* tagline — sits close beneath the wordmark */}
                <text
                  x="500"
                  y="268"
                  textAnchor="middle"
                  textLength="500"
                  lengthAdjust="spacing"
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight={300}
                  fontSize="34"
                >
                  {TAGLINE}
                </text>
              </clipPath>
              {/* tagline-only clip, used to knock its fill back to ~ink/40 */}
              <clipPath id="preloader-tagline-clip">
                <text
                  x="500"
                  y="268"
                  textAnchor="middle"
                  textLength="500"
                  lengthAdjust="spacing"
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight={300}
                  fontSize="34"
                >
                  {TAGLINE}
                </text>
              </clipPath>
            </defs>

            {/* always-visible faint outline of the lockup */}
            <g
              ref={textRef}
              fill="none"
              stroke="var(--color-wytes-ink)"
              strokeWidth="1.4"
              strokeOpacity="0.28"
              className="will-change-transform"
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
                strokeWidth="0.6"
              >
                {TAGLINE}
              </text>
            </g>

            {/* ink fill, clipped to the lockup shapes, swept in by the rect */}
            <g clipPath="url(#preloader-word-clip)">
              <rect
                ref={fillRef}
                x="0"
                y="0"
                width="1000"
                height="320"
                fill="var(--color-wytes-ink)"
                className="will-change-transform"
              />
            </g>

            {/*
              knock the tagline back to ~ink/40: a white veil at 60% opacity
              over just the tagline glyphs, riding the same sweep as fillRef
            */}
            <g clipPath="url(#preloader-tagline-clip)">
              <rect
                ref={taglineVeilRef}
                x="0"
                y="0"
                width="1000"
                height="320"
                fill="#ffffff"
                fillOpacity="0.6"
                className="will-change-transform"
              />
            </g>
          </svg>

          {/* progress % beneath the wordmark */}
          <div className="mt-5 flex flex-col items-center">
            <span
              ref={percentRef}
              className="relative text-center font-logo text-lg tracking-[0.3em] [text-indent:0.3em] text-wytes-ink/45 tabular-nums sm:text-xl"
            >
              {String(percent).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
