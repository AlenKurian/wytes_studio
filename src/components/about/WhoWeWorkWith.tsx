"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function WhoWeWorkWith() {
  return (
    <section
      className="bg-gradient-to-br from-[#ffbb46] to-[#ff3600] py-16 md:py-32"
      data-nav-theme="dark"
    >
      <div className="mx-auto max-w-3xl px-4 text-center md:px-10">
        <RevealOnScroll>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-cream/50">
            Who We Work With
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-wytes-cream sm:text-6xl md:mt-4 md:text-7xl">
            Not For Everyone.
          </h2>
          <p className="mt-2 font-display text-xl uppercase leading-tight text-wytes-cream/45 sm:text-3xl md:mt-3 md:text-4xl">
            And That&apos;s The Point.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p className="mx-auto mt-5 max-w-xl font-body text-sm text-wytes-cream/70 sm:text-lg md:mt-8">
            We work with ambitious companies that care about how they are perceived, how they
            compete and where they are going next.
          </p>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm text-wytes-cream/70 sm:text-lg md:mt-4">
            We partner with businesses that see branding and digital experience as more than
            decoration — but as tools for growth, influence and differentiation.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
