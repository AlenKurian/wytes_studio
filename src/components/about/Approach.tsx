"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const STEPS = [
  {
    number: "01",
    title: "Understand",
    description: "We understand the business, market, audience and ambition before we create.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "We find the positioning, direction and ideas that give the brand something meaningful to own.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We translate the strategy into identities, digital experiences and creative systems.",
  },
  {
    number: "04",
    title: "Build",
    description: "We bring the work to life across digital, campaigns and brand touchpoints.",
  },
  {
    number: "05",
    title: "Move Forward",
    description: "We create systems designed to evolve as the business grows.",
  },
];

export function Approach() {
  return (
    <section className="bg-wytes-cream py-24 md:py-32" data-nav-theme="light">
      <div className="mx-auto max-w-6xl px-6 md:pr-10 md:pl-0">
        <div className="md:flex md:items-start md:gap-8">
          <RevealOnScroll className="md:sticky md:top-32 md:w-1/3 md:flex-none">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/60">
              Our Approach
            </span>
            <h2 className="mt-8 font-display text-4xl uppercase leading-tight text-wytes-ink sm:text-5xl md:text-5xl">
              Think Deeply.
              <br />
              <span className="font-display-light">Create <br /> with <br />Intent.</span>
            </h2>
          </RevealOnScroll>

          <div className="mt-16 border-t border-wytes-ink/10 md:mt-0 md:w-2/3 md:flex-none">
            {STEPS.map((step, index) => (
              <RevealOnScroll key={step.number} delay={index * 0.05} start="top 92%">
                <div className="flex flex-col gap-2 border-b border-wytes-ink/10 py-6 md:flex-row md:items-baseline md:gap-8 md:py-8">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-wytes-ink/40 md:w-16 md:flex-none">
                    {step.number} —
                  </span>
                  <h3 className="font-display text-2xl uppercase leading-none text-wytes-ink md:w-56 md:flex-none md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-lg font-body text-sm text-wytes-ink/60 md:text-base">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
