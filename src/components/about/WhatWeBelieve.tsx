"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const BELIEFS = [
  { before: "Clarity", after: "Noise." },
  { before: "Strategy", after: "Trends." },
  { before: "Craft", after: "Volume." },
  { before: "Depth", after: "Speed." },
  { before: "Partnership", after: "Transaction." },
  { before: "Enduring Value", after: "Short-Term Attention." },
];

const DIRECTION = [-80, 80];

export function WhatWeBelieve() {
  return (
    <section
      className="bg-gradient-to-br from-[#ffbb46] to-[#ff3600] py-24 md:py-32"
      data-nav-theme="dark"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <RevealOnScroll className="text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-cream/90">
            What We Value
          </span>
        </RevealOnScroll>

        <div className="mt-14 flex flex-col gap-6 md:gap-8">
          {BELIEFS.map((line, index) => (
            <RevealOnScroll
              key={line.before}
              delay={index * 0.08}
              start="top 90%"
              x={DIRECTION[index % DIRECTION.length]}
            >
              <p className="text-center font-display text-3xl uppercase leading-tight text-wytes-cream sm:text-5xl md:text-5xl">
                {line.before}{" "}
                <span className="text-xl sm:text-2xl md:text-3xl">Over</span> {line.after}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
