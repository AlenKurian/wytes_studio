"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function WhyWeExist() {
  return (
    <section
      className="bg-gradient-to-br from-[#ffbb46] to-[#ff3600] py-24 md:py-32"
      data-nav-theme="dark"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <RevealOnScroll>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-cream/80">
            Why We Exist
          </span>
          <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-wytes-cream sm:text-5xl md:text-6xl">
            Good Design Gets Attention.
            <br />
            <span className="font-display-light">Great Design Moves People.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-body text-base text-wytes-cream/70 sm:text-lg">
            We believe creative work should do more than fill a screen or complete a brand
            guideline. It should create recognition, build confidence and give businesses a
            stronger position in the market.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-wytes-cream/70 sm:text-lg">
            That&apos;s why we focus on ideas that are built to last beyond a launch.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
