"use client";

import { PillButton } from "@/components/ui/PillButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Marquee } from "@/components/sections/Marquee";
import { SECTION_IDS } from "@/constants/nav";

export function About() {
  return (
    <section id={SECTION_IDS.about} className="bg-wytes-cream" data-nav-theme="light">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-16 text-center md:px-10 md:pb-32 md:pt-20">
        <RevealOnScroll>
          <span className="block font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink">
            About Us
          </span>
          <h2
            className="mt-20 font-display text-3xl uppercase leading-tight text-wytes-ink sm:text-5xl md:text-6xl"
            data-nav-theme="dark"
          >
            We Build More Than Brands
          </h2>
          <p className="mt-5 font-display text-3xl uppercase leading-tight text-wytes-ink/45 sm:text-5xl md:text-6xl">
            We Build Belief
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-body text-base text-wytes-ink/70 sm:text-lg">
            Wytes Studio is a strategy-led branding and creative studio for businesses that are intentional about how they compete, communicate and command attention. We don't begin with aesthetics. We begin with the business.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="mt-10">
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
