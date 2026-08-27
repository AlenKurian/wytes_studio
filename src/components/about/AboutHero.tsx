"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutHero() {
  return (
    <section
      className="flex min-h-[80svh] items-center bg-black pt-24 pb-16 md:pt-40 md:pb-24"
      data-nav-theme="dark"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-10">
        <RevealOnScroll>
          <h1 className="-mt-12 font-display text-base uppercase tracking-[0.3em] text-wytes-cream/80 sm:text-xl">
            About Wytes
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2 className="mt-5 font-display text-3xl uppercase leading-[0.95] text-wytes-cream sm:text-6xl md:mt-8 md:text-7xl">
            Strategy <span className="font-display-light">First.</span>
            <br />
            Everything Else <span className="font-display-light">Follows.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p className="mx-auto mt-5 max-w-2xl font-body text-sm text-wytes-cream/70 sm:text-lg md:mt-8">
            Wytes Studio is a strategy-led branding and creative studio for businesses that are
            intentional about how they compete, communicate and command attention. We don&apos;t
            begin with aesthetics. We begin with the business.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
