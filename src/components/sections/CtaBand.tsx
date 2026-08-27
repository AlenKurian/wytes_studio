"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { PillButton } from "@/components/ui/PillButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useLenis } from "@/hooks/useLenis";
import { SECTION_IDS, NAV_HEIGHT, STUDIO_EMAIL } from "@/constants/nav";

export function CtaBand() {
  const lenis = useLenis();
  const isHome = usePathname() === "/";

  function handleWorksClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isHome || !lenis) return;
    event.preventDefault();
    lenis.scrollTo(`#${SECTION_IDS.about}`, { offset: -NAV_HEIGHT, duration: 1.4 });
  }

  return (
    <section
      id={SECTION_IDS.cta}
      className="overflow-hidden px-4 py-3 md:px-10 md:py-4"
      data-nav-theme="dark"
    >
      <div className="rounded-2xl bg-black py-16 md:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-10">
          <RevealOnScroll>
            <h2
              className="font-display text-2xl uppercase leading-tight text-white sm:text-5xl md:text-6xl"
              data-nav-theme="light"
            >
              Ready To Think
              <br />
              Differently?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/85 sm:text-lg md:mt-6">
              Wytes Studio partners with a select number of ambitious businesses to build brands
              defined by clarity, distinction, authority and enduring value.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
            <PillButton
              href={`mailto:${STUDIO_EMAIL}`}
              variant="filled"
              className="group !bg-white !text-wytes-ink hover:!bg-white/90"
            >
              Start A Conversation
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </PillButton>
            <PillButton
              href={isHome ? `#${SECTION_IDS.about}` : `/#${SECTION_IDS.about}`}
              onClick={handleWorksClick}
              variant="outline"
              className="group !border-wytes-cream !text-wytes-cream hover:!bg-white/10"
            >
              Explore Our Work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </PillButton>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
