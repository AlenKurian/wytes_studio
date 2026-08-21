"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function WytesStandard() {
  return (
    <section className="bg-wytes-cream py-16 md:py-32" data-nav-theme="light">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-10">
        <RevealOnScroll>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/50">
            The Wytes Standard
          </span>
          <h1 className="mt-3 font-display text-2xl uppercase leading-tight text-wytes-ink sm:text-5xl md:mt-4 md:text-6xl">
            Your Brand Is A <span className="font-display-light">Business Decision.</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm text-wytes-ink/70 sm:text-lg md:mt-6">
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
