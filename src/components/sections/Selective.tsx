"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const SELECTIVE_ID = "selective";

const ALIGNMENTS = [
  "Building Something Ambitious",
  "Entering A Defining Stage",
  "Repositioning Their Market",
  "Introducing A New Brand",
  "Expanding Into New Markets",
  "Elevating Their Market Position",
  "Creating A Distinctive Experience",
  "Looking For A Long-Term Partner",
];

export function Selective() {
  return (
    <section
      id={SELECTIVE_ID}
      className="overflow-hidden px-6 py-4 md:px-10"
      data-nav-theme="dark"
    >
      {/* ---------------------------------------------
          01 — OPENING STATEMENT
      --------------------------------------------- */}

      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffbd59] to-[#ff571f]">
        <div className="mx-auto max-w-4xl px-6 py-32 text-center md:px-10 md:py-44">
          <RevealOnScroll>
            <span className="-mt-4 block font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-cream/80">
              Partnership Alignment
            </span>
            <h2 className="mx-auto mt-20 max-w-3xl font-display text-4xl uppercase leading-[0.95] text-wytes-cream sm:text-6xl md:text-7xl">
              Selective By Design
            </h2>
            <p className="mx-auto mt-3 max-w-3xl font-display text-2xl uppercase leading-tight text-wytes-cream/75 sm:text-3xl md:text-4xl">
              We Work With The Ambitious
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <p className="mx-auto mt-8 max-w-xl font-body text-base text-wytes-cream/75 sm:text-lg">
              We partner with businesses and leaders who are building something ambitious, entering
              a defining stage of growth, repositioning their market, or looking to create lasting
              distinction.
            </p>
          </RevealOnScroll>
        </div>

        {/* ---------------------------------------------
            02 — INTERACTIVE ALIGNMENT LIST
        --------------------------------------------- */}

        <div className="border-t border-wytes-ink/10 bg-wytes-cream px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-5xl">
            <RevealOnScroll>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/50">
                We Work With Those Who Are
              </span>
            </RevealOnScroll>

            <div className="group/list mt-10 border-t border-wytes-ink/10">
              {ALIGNMENTS.map((statement, index) => (
                <RevealOnScroll key={statement} delay={index * 0.04} start="top 92%">
                  <div
                    className="
                      group/row
                      relative
                      flex
                      items-center
                      justify-between
                      gap-6
                      border-b
                      border-wytes-ink/10
                      py-6
                      transition-opacity
                      duration-300
                      ease-out
                      group-has-[:hover]/list:opacity-45
                      hover:!opacity-100
                      md:py-8
                    "
                  >
                    <span
                      className="
                        font-display
                        text-2xl
                        uppercase
                        leading-none
                        text-wytes-ink
                        transition-all
                        duration-300
                        ease-out
                        group-hover/row:translate-x-3
                        group-hover/row:text-wytes-orange
                        sm:text-3xl
                        md:text-3xl
                      "
                    >
                      {statement}
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        shrink-0
                        -translate-x-3
                        text-2xl
                        text-wytes-orange
                        opacity-0
                        transition-all
                        duration-300
                        ease-out
                        group-hover/row:translate-x-0
                        group-hover/row:opacity-100
                        sm:text-3xl
                      "
                    >
                      →
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-0
                        bg-wytes-orange
                        transition-all
                        duration-300
                        ease-out
                        group-hover/row:w-full
                      "
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
