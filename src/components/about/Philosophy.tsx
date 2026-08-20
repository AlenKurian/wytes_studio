"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Philosophy() {
  return (
    <section className="bg-wytes-cream py-24 md:py-32" data-nav-theme="light">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-16">
          <RevealOnScroll className="md:-ml-6">
            <h2 className="font-display text-3xl uppercase leading-[1.05] text-wytes-ink sm:text-5xl md:text-4xl">
              We Don&apos;t Just Make Things Look Good.
              <br />
              <span className="font-display-light">We Make Them Mean Something.</span>
            </h2>
            <p className="mt-6 font-body text-base text-wytes-ink/60 sm:text-md">
              Every brand has a position to own, a story to tell and an audience to influence. We
              use design as a tool to make that position clear, distinctive and impossible to
              ignore.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="md:-mt-20 md:ml-44">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/60">
              Our Philosophy
            </span>
            <div className="relative mt-6 aspect-[2/3] w-full max-w-40 overflow-hidden rounded-xl">
              <Image
                src="/images/about/image2.jpg"
                alt="A figure standing in a glowing red tunnel"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
