"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PROJECTS } from "@/constants/projects";
import { SECTION_IDS } from "@/constants/nav";

const END_MARGIN_RATIO = 0;

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track || reducedMotion) return;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * END_MARGIN_RATIO);

      if (getDistance() <= 0) return;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    sectionRef,
    [reducedMotion]
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.projects}
      className="overflow-hidden bg-wytes-cream pb-24 pt-16 md:pb-32 md:pt-20"
      data-nav-theme="light"
    >
      <div
        ref={wrapperRef}
        className={
          reducedMotion
            ? "h-[65svh] min-h-[440px] overflow-x-auto"
            : "h-svh overflow-hidden"
        }
      >
        <div ref={trackRef} className="flex h-full w-max items-center gap-6 will-change-transform">
          <div
            className="flex h-full w-screen flex-none flex-col items-center justify-center gap-6 bg-gradient-to-b from-white to-neutral-200 px-8 text-center"
            data-nav-theme="light"
          >
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/50">
              Projects
            </span>

            <h2 className="mt-5 max-w-xl font-display text-3xl uppercase leading-snug text-wytes-ink sm:text-4xl md:text-5xl">
              The Work Speaks.{" "}
              <span className="font-display-light">For Itself.</span>
            </h2>
            <p className="max-w-xl font-body text-sm leading-relaxed text-wytes-ink/70 sm:text-base">
              A selection of brands, experiences, and ideas we&apos;ve
              brought to life.
            </p>
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-wytes-ink/70">
              View Our Work
            </span>

            <span className="mt-2 font-body text-[10px] uppercase tracking-[0.3em] text-wytes-ink/30">
              Scroll
            </span>
          </div>

          {PROJECTS.map((project) => (
            <div key={project.label} className="w-[min(70vw,360px)] flex-none">
              <div
                className={`aspect-[4/5] w-full rounded-2xl ${project.colorClass}`}
                data-nav-theme={project.navTheme}
              />
              <p className="mt-3 font-body text-sm font-semibold uppercase tracking-wide text-wytes-ink/80">
                {project.label}
              </p>
            </div>
          ))}

          <div
            className="flex h-full w-screen flex-none flex-col items-center justify-center gap-6 bg-gradient-to-b from-white to-neutral-200 px-8 text-center"
            data-nav-theme="light"
          >
            <p className="max-w-xl font-body text-3xl leading-snug text-wytes-ink/80 sm:text-4xl md:text-5xl">
              Discover our complete collection of digital experiences, brands, and platforms.
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-2 border-b border-wytes-ink/40 pb-1 font-mono text-sm uppercase tracking-[0.2em] text-wytes-ink/70 transition-colors duration-300 hover:border-wytes-ink hover:text-wytes-ink"
            >
              View All Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &#8594;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
