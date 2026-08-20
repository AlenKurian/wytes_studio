"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const PRINCIPLES = [
  "Clarity Over Noise",
  "Strategy Over Trends",
  "Craft Over Volume",
  "Depth Over Speed",
  "Partnership Over Transaction",
  "Enduring Value Over Short-Term Attention",
];

const PX_PER_SECOND = 90;
const CYCLES = 8;

export function GuidingPrinciples() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper || reducedMotion) return;

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

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          tween?.timeScale(self.direction === -1 ? -1 : 1);
        },
      });

      window.addEventListener("resize", createTween);
      return () => {
        window.removeEventListener("resize", createTween);
        trigger.kill();
        tween?.kill();
      };
    },
    wrapperRef,
    [reducedMotion]
  );

  const cycles = reducedMotion ? [0] : Array.from({ length: CYCLES }, (_, i) => i);

  return (
    <section
      className="overflow-hidden bg-gradient-to-br from-[#ffbd59] to-[#ff751f] py-20 md:py-28"
      data-nav-theme="light"
    >
      {/* <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <RevealOnScroll>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-cream/70">
            Guiding Principles
          </span>
        </RevealOnScroll>
      </div> */}

      <div ref={wrapperRef} className=" overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center whitespace-nowrap will-change-transform">
          {cycles.map((cycle) => (
            <span key={cycle} className="flex items-center">
              {PRINCIPLES.map((principle) => (
                <span
                  key={principle}
                  className="mx-4 flex items-center gap-4 font-display text-2xl uppercase leading-none text-wytes-ink sm:text-4xl md:text-3xl"
                >
                  {principle}
                  <span aria-hidden="true" className="text-wytes-orange">
                    ✦
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
