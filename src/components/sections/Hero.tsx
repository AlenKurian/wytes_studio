"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { useLenis } from "@/hooks/useLenis";
import { SECTION_IDS, STUDIO_EMAIL } from "@/constants/nav";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  function handleScrollDown(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (!lenis) return;
    event.preventDefault();
    lenis.scrollTo(`#${SECTION_IDS.about}`, { duration: 1.4 });
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
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/hero.png"
          alt="Abstract glass ribbon twisting through a glowing ring, floating over a glossy orange floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_100%]"
        />
      </div>

      {/* Cinematic lighting: vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60" />

      {/* Film grain for a textured, art-directed feel */}
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />

      <div className="mt-5 relative z-10 flex w-full flex-col items-center px-6 pt-32 pb-5 text-center md:px-8 md:pt-24 md:pb-10">
        <div ref={contentRef} className="flex max-w-5xl flex-col items-center">
          {/* Reserved space for former badge */}
          <div aria-hidden className="h-9 w-full md:h-14" />

          <h1
            className="font-body text-lg font-semibold whitespace-nowrap uppercase tracking-[0.1em] text-white/80 sm:text-base md:text-4xl"
            data-nav-theme="dark"
          >
            We don't decorate <br /> businesses
          </h1>

          <p
            className="mt-5 max-w-[18rem] text-center font-body  text-[10px] text-white sm:text-base md:mt-6 md:max-w-xl md:text-sm"
            data-nav-theme="dark"
          >
            We build the brands behind them.
          </p>

          <div className="mt-6 flex w-full flex-col items-center gap-3 md:mt-8 md:w-auto md:flex-row md:flex-wrap md:justify-center md:gap-4">
            <PillButton
              href={`mailto:${STUDIO_EMAIL}`}
              variant="outline"
              className="!border-white !bg-black/30 !text-white !font-normal shadow-[0_0_16px_rgba(0,0,0,0.25)] backdrop-blur-sm hover:!bg-black/50 !px-5 !py-2.5 !text-[10px] md:!px-7 md:!py-3 md:!text-sm"
              data-nav-theme="dark"
            >
              Start a Project
            </PillButton>
          </div>
        </div>

        <a
          href={`#${SECTION_IDS.about}`}
          onClick={handleScrollDown}
          data-nav-theme="dark"
          className="group mt-75 flex w-full flex-col items-center gap-2 font-body text-[9px] font-bold uppercase tracking-[0.30em] text-white md:mt-90 md:w-fit md:flex-row md:gap-3 md:text-xs"
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
