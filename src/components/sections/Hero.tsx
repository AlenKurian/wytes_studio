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
      className="relative flex h-svh min-h-[640px] w-full items-start overflow-hidden bg-wytes-red-deep md:min-h-[820px] md:items-end"
      data-nav-theme="light"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero_2.png"
          alt="Abstract glass ribbon twisting through a glowing ring, floating over a glossy orange floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[100%_100%] md:object-center"
        />
      </div>

      <div className="relative z-10 w-full px-4 pb-5 pt-32 md:px-35 md:pb-10 md:pt-40">
        <div ref={contentRef} className="max-w-4xl">
          <span
            className="mb-4 flex w-fit items-center gap-2 rounded-full border border-black/15 bg-white/60 px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black backdrop-blur-sm md:mb-8"
            data-nav-theme="light"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-wytes-orange">
              <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
            </svg>
            The Complete Studio
          </span>

          <h1
            className="font-hero-jakarta uppercase leading-[0.95] text-black"
            data-nav-theme="light"
          >
            <span className="block text-3xl font-medium text-wytes-orange sm:text-4xl md:text-5xl lg:text-5xl">
              Your
            </span>
            <span className="block text-5xl font-semibold sm:text-6xl md:text-7xl lg:text-8xl">
              BRAND
            </span>
            <br />
            <span className="block text-3xl font-medium text-wytes-orange sm:text-4xl md:text-5xl lg:text-5xl">
              is a Bussiness
            </span>
            <span className="block text-5xl font-semibold sm:text-6xl md:text-7xl lg:text-8xl">
              decision
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-left font-body text-xs text-black sm:text-base md:mt-6 md:text-md"
            data-nav-theme="light"
          >
            Your brand shapes how the market perceives your company, what people expect from you, and ultimately, why they choose you. We treat branding as business strategy — not decoration.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-8">
            <PillButton
              href={`mailto:${STUDIO_EMAIL}`}
              variant="filled"
              className="!bg-black !text-white hover:!bg-black/80 !px-5 !py-2 !text-xs md:!px-8 md:!py-3 md:!text-base"
              data-nav-theme="light"
            >
              Start a Project
            </PillButton>
          </div>
        </div>

        <a
          href={`#${SECTION_IDS.about}`}
          onClick={handleScrollDown}
          data-nav-theme="light"
          className="group mt-16 flex w-full flex-col items-center gap-2 font-body text-[9px] font-bold uppercase tracking-[0.30em] text-black md:mt-22 md:ml-auto md:w-fit md:flex-row md:translate-x-10 md:gap-3 md:text-xs"
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
