"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function WhoWeAre() {
  return (
    <section className="bg-wytes-cream py-16 md:py-32" data-nav-theme="light">
      <div className="mx-auto max-w-6xl px-4 md:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
          <RevealOnScroll>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/60">
              Who We Are
            </span>
            <div className="relative -ml-4 mt-4 aspect-[2/3] w-full max-w-40 overflow-hidden rounded-xl sm:-ml-6 md:mt-6">
              <Image
                src="/images/about/image1.jpg"
                alt="Silhouetted figures walking through warm light"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <h2 className="mt-8 font-display text-2xl uppercase leading-tight text-wytes-ink sm:text-5xl md:mt-14 md:text-4xl">
              We Are A Creative Studio Built Around <span className="font-display-light">Strategy.</span>
            </h2>
            <p className="mt-4 font-body text-sm text-wytes-ink/70 sm:text-md md:mt-6">
              We work with ambitious companies to define how they show up, communicate what they
              stand for and create experiences that move their business forward.
            </p>
            <p className="mt-3 font-body text-sm text-wytes-ink/70 sm:text-md md:mt-4">
              From brand identity and digital experiences to creative systems and campaigns, we
              bring strategy, design and technology together to create work with a reason behind
              it.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
