"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function WhoWeWorkWith() {
  return (
    <section
      className="bg-gradient-to-br from-[#ffbb46] to-[#ff3600] py-24 md:py-32"
      data-nav-theme="dark"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <RevealOnScroll>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-cream/50">
            Who We Work With
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-tight text-wytes-cream sm:text-6xl md:text-7xl">
            Not For Everyone.
          </h2>
          <p className="mt-3 font-display text-2xl uppercase leading-tight text-wytes-cream/45 sm:text-3xl md:text-4xl">
            And That&apos;s The Point.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl font-body text-base text-wytes-cream/70 sm:text-lg">
            We work with ambitious companies that care about how they are perceived, how they
            compete and where they are going next.
          </p>
          <p className="mx-auto mt-4 max-w-xl font-body text-base text-wytes-cream/70 sm:text-lg">
            We partner with businesses that see branding and digital experience as more than
            decoration — but as tools for growth, influence and differentiation.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
