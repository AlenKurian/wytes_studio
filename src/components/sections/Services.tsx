"use client";

import type { MouseEvent } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { useLenis } from "@/hooks/useLenis";
import { SECTION_IDS, NAV_HEIGHT } from "@/constants/nav";

const SERVICES_CARDS_ID = "services-cards";

export function Services() {
  const lenis = useLenis();

  function handleExploreClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(`#${SERVICES_CARDS_ID}`, { offset: -NAV_HEIGHT, duration: 1.4 });
  }

  return (
    <>
      <section
        id={SECTION_IDS.services}
        className="bg-wytes-cream pb-6 pt-6 md:pb-14 md:pt-12"
        data-nav-theme="light"
      >
        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-10">
          <RevealOnScroll>
            <span
              aria-hidden="true"
              className="mx-auto flex h-6 w-6 items-center justify-center md:h-8 md:w-8"
            >
              {/* <span className="h-3 w-3 rotate-45 rounded-[3px] bg-wytes-orange" /> */}
            </span>
            <span className="block font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink">
              Services
            </span>
            <h2 className="mt-12 font-display text-2xl uppercase leading-tight text-wytes-ink sm:text-5xl md:mt-20 md:text-6xl">
              We Turn Strategy Into
            </h2>
            <p className="mt-3 font-display text-2xl uppercase leading-tight text-wytes-ink/45 sm:text-5xl md:mt-5 md:text-6xl">
              Brands. Experiences. Influence.
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.1}
            className="mx-auto mt-8 flex max-w-6xl flex-col gap-3 text-left font-body text-xs text-wytes-ink/50 sm:flex-row sm:justify-between sm:gap-10 sm:text-sm"
          >
            <p className="sm:max-w-68 sm:text-center">
              From the first thought to the final execution, we combine strategy, design, and
              craft to build brands that connect.
            </p>
            <p className="sm:max-w-68 sm:text-center">
              Our process blends research, iteration, and detail—turning ambitious ideas into
              digital work that grows with you.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} className="mt-12 flex justify-center md:mt-20">
            <a
              href={`#${SERVICES_CARDS_ID}`}
              onClick={handleExploreClick}
              className="group flex flex-col items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-wytes-ink/70 md:gap-3"
            >
              Explore Our Services
              <span className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-wytes-ink/30 md:h-10 md:w-10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  className="h-4 w-4"
                >
                  <path d="M12 4v17m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <section
        id={SERVICES_CARDS_ID}
        className="relative w-full overflow-hidden bg-wytes-cream pb-8"
        data-nav-theme="light"
      >
        <ServiceCards />
      </section>

    </>
  );
}
