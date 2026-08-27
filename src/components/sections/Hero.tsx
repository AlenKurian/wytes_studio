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
    lenis.scrollTo(`#${SECTION_IDS.projects}`, { offset: -NAV_HEIGHT, duration: 1.4 });
  }

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      className="relative flex h-svh min-h-[640px] w-full items-start justify-center overflow-hidden bg-wytes-red-deep md:min-h-[820px]"
      data-nav-theme="dark"
    >
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/mob.png"
          alt="Abstract glass ribbon twisting through a glowing ring, floating over a glossy orange floor"
          fill
          priority
          sizes="100vw"
          className="hero-image-drift object-cover"
        />
      </div>

      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/hero.png"
          alt="Abstract glass ribbon twisting through a glowing ring, floating over a glossy orange floor"
          fill
          priority
          sizes="100vw"
          className="hero-image-drift object-cover object-bottom"
        />
      </div>

      {/* Cinematic lighting: vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60" />

      {/* Film grain for a textured, art-directed feel */}
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <div className="mt-6 relative z-10 flex w-full flex-col items-center px-6 pt-32 pb-5 text-center md:px-8 md:pt-24 md:pb-10">
        <div ref={contentRef} className="flex max-w-5xl flex-col items-center">
          <span
            className="-mt-10 mb-4 flex w-fit items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm md:mt-0 md:mb-8 md:gap-2 md:px-4 md:py-2 md:text-s"
            data-nav-theme="dark"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-2.5 w-2.5 text-white md:h-3.5 md:w-3.5">
              <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
            </svg>
            The Complete Studio
          </span>

          <h1
            className="font-body text-lg font-semibold whitespace-nowrap uppercase tracking-[0.1em] text-white/80 sm:text-base md:text-5xl"
            data-nav-theme="dark"
          >
            The Wytes Standard
          </h1>

          <p
            className="mt-5 max-w-[18rem] text-center font-body text-[10px] text-white sm:text-base md:mt-6 md:max-w-xl md:text-sm"
            data-nav-theme="dark"
          >
            SETTING THE STANDARD FOR BRANDS THAT MATTER.
          </p>

          <div className="mt-6 flex w-full flex-col items-center gap-3 md:mt-8 md:w-auto md:flex-row md:flex-wrap md:justify-center md:gap-4">
            <PillButton
              href={`#${SECTION_IDS.projects}`}
              onClick={handleWorksClick}
              variant="filled"
              className="!bg-black !text-white !font-normal hover:!bg-black/80 !px-5 !py-2.5 !text-[10px] md:!px-7 md:!py-3.5 md:!text-sm"
              data-nav-theme="dark"
            >
              Start a Project
            </PillButton>

            <PillButton
              href={`mailto:${STUDIO_EMAIL}`}
              variant="outline"
              className="!border-white !bg-black/30 !text-white !font-normal shadow-[0_0_16px_rgba(0,0,0,0.25)] backdrop-blur-sm hover:!bg-black/50 !px-5 !py-2.5 !text-[10px] md:!px-7 md:!py-3 md:!text-sm"
              data-nav-theme="dark"
            >
              view Our Works
            </PillButton>
          </div>
        </div>

        <a
          href={`#${SECTION_IDS.about}`}
          onClick={handleScrollDown}
          data-nav-theme="dark"
          className="group mt-60 flex w-full flex-col items-center gap-2 font-body text-[9px] font-bold uppercase tracking-[0.30em] text-white md:mt-85 md:w-fit md:flex-row md:gap-3 md:text-xs"
        >
          <span className="flex w-full items-center justify-center gap-2 md:w-auto md:gap-3">
            <span className="h-px w-10 bg-white/60 md:hidden" />
            <span className="animate-bounce flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white text-white md:h-11 md:w-11">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 md:h-6 md:w-6">
                <path d="M12 4v17m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="h-px w-10 bg-white/60 md:hidden" />
          </span>
          <span className="shrink-0">Scroll to explore</span>
        </a>
      </div>
    </section>
  );
}
