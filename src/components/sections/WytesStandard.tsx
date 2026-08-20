"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function WytesStandard() {
  return (
    <section className="bg-wytes-cream py-24 md:py-32" data-nav-theme="light">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <RevealOnScroll>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/50">
            The Wytes Standard
          </span>
          <h1 className="mt-4 font-display text-3xl uppercase leading-tight text-wytes-ink sm:text-5xl md:text-6xl">
            Your Brand Is A <span className="font-display-light">Business Decision.</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-body text-base text-wytes-ink/70 sm:text-lg">
            Your brand shapes how the market perceives your company, what people expect from you,
            why they choose you, and ultimately, what position you occupy in their minds. That's
            why we don't treat branding as decoration. We treat it as business strategy, expressed
            through brand.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
