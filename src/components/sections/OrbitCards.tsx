"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SERVICES } from "@/constants/services";

const POP_WINDOW_DEG = 35;
const POP_SCALE = 0.22;
const POP_Z_PUSH = 70;
const SCROLL_PER_CARD = 420;
const RING_TILT_DEG = 8;
const RADIUS_CSS = "clamp(140px, 30vw, 400px)";

export function OrbitCards({ sectionId }: { sectionId: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const wrapper = wrapperRef.current;
      const ring = ringRef.current;
      const section = document.getElementById(sectionId);
      if (!wrapper || !ring || !section) return;

      const n = SERVICES.length;
      const baseOffset = 180 / n;

      const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));

      gsap.set(ring, { opacity: 1 });
      cards.forEach((card) => {
        gsap.set(card, { scale: 1, z: 0 });
      });

      if (reducedMotion) {
        gsap.set(ring, { rotationY: baseOffset });
        return;
      }

      function render(progress: number) {
        const ringRotation = baseOffset + progress * 360;
        gsap.set(ring, { rotationY: ringRotation });
        cards.forEach((card, i) => {
          const baseAngle = (360 / n) * i;
          let angle = (ringRotation + baseAngle) % 360;
          if (angle < 0) angle += 360;
          const dist = Math.min(angle, 360 - angle);
          const pop = Math.max(0, 1 - dist / POP_WINDOW_DEG);
          const eased = pop * pop * (3 - 2 * pop);
          gsap.set(card, {
            scale: 1 + eased * POP_SCALE,
            z: eased * POP_Z_PUSH,
          });
        });
      }

      render(0);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.4, n * SCROLL_PER_CARD)}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
      });

      return () => {
        trigger.kill();
      };
    },
    wrapperRef,
    [reducedMotion]
  );

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute left-1/2 top-[42%] h-0 w-0"
      style={{ perspective: "1800px" }}
    >
      <div
        className="absolute left-0 top-0 h-0 w-0"
        style={{ transformStyle: "preserve-3d", transform: `rotateX(${RING_TILT_DEG}deg)` }}
      >
        <div
          ref={ringRef}
          className="absolute left-0 top-0 h-0 w-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {SERVICES.map((service, index) => {
            const baseAngle = (360 / SERVICES.length) * index;
            return (
              <div
                key={service.title}
                className="absolute left-0 top-0 h-0 w-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${baseAngle}deg) translateZ(${RADIUS_CSS})`,
                }}
              >
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute left-0 top-20 flex h-[4.75rem] w-[7rem] -translate-x-1/2 -translate-y-1/2 items-end overflow-hidden rounded-lg border border-white/30 bg-gradient-to-br from-wytes-cream/90 via-wytes-orange/40 to-wytes-cream/60 p-2 shadow-[0_14px_30px_rgba(11,11,11,0.32)] [backface-visibility:hidden] sm:h-[6rem] sm:w-[9rem] sm:p-3 lg:h-[15.75rem] lg:w-[13.25rem]"
                  data-nav-theme="light"
                >
                  <span className="rounded-full bg-wytes-cream/85 px-2 py-0.5 font-body text-[0.6rem] font-semibold uppercase tracking-wide text-wytes-ink sm:px-2.5 sm:py-1 sm:text-xs">
                    {service.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
