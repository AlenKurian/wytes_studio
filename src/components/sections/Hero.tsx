"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { useLenis } from "@/hooks/useLenis";
import { SECTION_IDS, STUDIO_EMAIL, NAV_HEIGHT } from "@/constants/nav";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  function handleScrollDown(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(`#${SECTION_IDS.about}`, { duration: 1.4 });
  }

  function handleWorksClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(`#${SECTION_IDS.about}`, { offset: -NAV_HEIGHT, duration: 1.4 });
  }

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      className="relative flex h-svh min-h-[640px] w-full items-end overflow-hidden bg-wytes-red-deep"
      data-nav-theme="light"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/main_hero.jpeg"
          alt="Abstract glass ribbon twisting through a glowing ring, floating over a glossy orange floor"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full px-6 pb-8 pt-40 md:px-35 md:pb-10">
        <div ref={contentRef} className="max-w-4xl">
          <h1
            className="font-hero-serif uppercase leading-[0.95] text-black"
            data-nav-theme="light"
          >
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              <span className="font-medium italic"></span>
              <span className="font-bold not-italic">Your</span>
            </span>
            <span className="block text-5xl font-black sm:text-6xl md:text-7xl lg:text-8xl">
              BRAND
            </span>
            <br />
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              <span className="font-medium italic">A </span>
              <span className="font-bold not-italic">Bussiness</span>
            </span>
            <span className="block text-5xl font-black sm:text-6xl md:text-7xl lg:text-8xl">
              decision
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-left font-body text-base text-black sm:text-lg"
            data-nav-theme="light"
          >
            Your brand shapes how the market perceives your company, what people expect from you, and ultimately, why they choose you. We treat branding as business strategy — not decoration.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PillButton
              href={`mailto:${STUDIO_EMAIL}`}
              variant="filled"
              className="!bg-black !text-white hover:!bg-black/80"
              data-nav-theme="light"
            >
              Start a Project
            </PillButton>

            <PillButton
              href={`#${SECTION_IDS.about}`}
              onClick={handleWorksClick}
              variant="outline"
              className="!border-black !text-black hover:!bg-black/10"
              data-nav-theme="light"
            >
              View Our Work
            </PillButton>
          </div>
        </div>

        <a
          href={`#${SECTION_IDS.about}`}
          onClick={handleScrollDown}
          data-nav-theme="light"
          className="group mt-10 ml-auto flex w-fit translate-x-6 items-center gap-3 font-body text-xs font-bold uppercase tracking-[0.30em] text-black md:mt-22 md:translate-x-10"
        >
          <span className="animate-bounce flex h-11 w-11 items-center justify-center rounded-full border border-black">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
              <path d="M12 4v17m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Scroll to explore
        </a>
      </div>
    </section>
  );
}
