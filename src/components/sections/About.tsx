"use client";

import { PillButton } from "@/components/ui/PillButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Marquee } from "@/components/sections/Marquee";
import { SECTION_IDS } from "@/constants/nav";

export function About() {
  return (
    <section id={SECTION_IDS.about} className="bg-wytes-cream" data-nav-theme="light">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 text-center md:px-10 md:pb-32 md:pt-20">
        <RevealOnScroll>
          <span className="block font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink">
            About Wytes
          </span>
          <h2
            className="mt-12 font-display text-2xl uppercase leading-tight text-wytes-ink sm:text-5xl md:mt-20 md:text-6xl"
            data-nav-theme="dark"
          >
            We Build More Than Brands
          </h2>
          <p className="mt-3 font-display text-2xl uppercase leading-tight text-wytes-ink/45 sm:text-5xl md:mt-5 md:text-6xl">
            We Build Belief
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-wytes-ink/70 sm:text-lg md:mt-6">
            Wytes Studio is a strategy-led branding and creative studio for businesses that are intentional about how they compete, communicate and command attention. We don't begin with aesthetics. We begin with the business.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="mt-6 md:mt-10">
          <PillButton href="/about" variant="filled" data-nav-theme="dark">
            Know More
            <span aria-hidden="true">→</span>
          </PillButton>
        </RevealOnScroll>
      </div>

      <Marquee />
    </section>
  );
}
