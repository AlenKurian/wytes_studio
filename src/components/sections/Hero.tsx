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
      data-nav-theme="light"
    >
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/mob_hero1.png"
          alt="Abstract glass ribbon twisting through a glowing ring, floating over a glossy orange floor"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/hero_4x.png"
          alt="Abstract glass ribbon twisting through a glowing ring, floating over a glossy orange floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-8 pt-24 pb-5 text-center md:px-8 md:pt-24 md:pb-10">
        <div ref={contentRef} className="flex max-w-5xl flex-col items-center">
          <span
            className="mb-6 flex w-fit items-center gap-1 rounded-full border border-black/15 bg-white/60 px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-black backdrop-blur-sm md:mb-8 md:gap-2 md:px-4 md:py-2 md:text-s"
            data-nav-theme="light"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-wytes-orange md:h-3.5 md:w-3.5">
              <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
            </svg>
            The Complete Studio
          </span>

          <h1
            className="font-hero-general uppercase leading-[0.95] text-black"
            data-nav-theme="light"
          >
            <span className="block text-3xl font-medium md:text-5xl md:whitespace-nowrap lg:text-6xl">
              Your <span className="font-semibold text-wytes-orange">Brand</span> is a
            </span>
            <span className="mt-2 block text-3xl font-semibold md:hidden">
              Business
            </span>
            <span className="mt-2 hidden text-3xl font-semibold sm:text-4xl md:block md:text-5xl md:whitespace-nowrap lg:text-6xl">
              Bussiness <span className="text-wytes-orange">Decision</span>
            </span>
            <span className="mt-2 block text-3xl font-semibold text-wytes-orange md:hidden">
              Decision
            </span>
          </h1>

          <p
            className="mt-6 max-w-[15rem] text-center font-body text-xs text-black sm:text-base md:mt-6 md:max-w-xl md:text-md"
            data-nav-theme="light"
          >
            Your brand shapes how the market perceives your company, what people expect from you, and ultimately, why they choose you. We treat branding as business strategy — not decoration.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 md:mt-8 md:w-auto md:flex-row md:flex-wrap md:justify-center md:gap-4">
            <PillButton
              href={`#${SECTION_IDS.projects}`}
              onClick={handleWorksClick}
              variant="filled"
              className="!bg-black !text-white !font-normal hover:!bg-black/80 !px-5 !py-2.5 !text-[11px] md:!px-8 md:!py-3 md:!text-sm"
              data-nav-theme="light"
            >
              Start a Project
            </PillButton>

            <PillButton
              href={`mailto:${STUDIO_EMAIL}`}
              variant="outline"
              className="!border-black !bg-white/40 !text-black !font-normal shadow-[0_0_16px_rgba(0,0,0,0.12)] backdrop-blur-sm hover:!bg-white/60 !px-5 !py-2.5 !text-[11px] md:!px-8 md:!py-3 md:!text-sm"
              data-nav-theme="light"
            >
              View Our Works
            </PillButton>
          </div>
        </div>

        <a
          href={`#${SECTION_IDS.about}`}
          onClick={handleScrollDown}
          data-nav-theme="light"
          className="group mt-28 flex w-full flex-col items-center gap-2 font-body text-[9px] font-bold uppercase tracking-[0.30em] text-black md:mt-48 md:w-fit md:flex-row md:gap-3 md:text-xs"
        >
          <span className="flex w-full items-center justify-center gap-2 md:w-auto md:gap-3">
            <span className="h-px w-10 bg-wytes-orange/60 md:hidden" />
            <span className="animate-bounce flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black text-black md:h-11 md:w-11">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 md:h-6 md:w-6">
                <path d="M12 4v17m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="h-px w-10 bg-wytes-orange/60 md:hidden" />
          </span>
          <span className="shrink-0">Scroll to explore</span>
        </a>
      </div>
    </section>
  );
}
