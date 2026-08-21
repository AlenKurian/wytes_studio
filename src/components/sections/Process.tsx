"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const PROCESS_ID = "process";
const PIN_HEIGHT_PER_STEP = 500;

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the business, market, audience, competition, culture, challenges and opportunities.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Isolate the fundamental business and brand challenge we need to solve.",
  },
  {
    number: "03",
    title: "Strategize",
    description:
      "Establish the strategic architecture — positioning, messaging, brand direction and experience principles.",
  },
  {
    number: "04",
    title: "Create",
    description:
      "Turn the strategy into identity, digital experiences, creative, content and campaigns.",
  },
  {
    number: "05",
    title: "Refine",
    description:
      "Challenge, test and sharpen every detail until the work is clear, distinctive and built to perform.",
  },
  {
    number: "06",
    title: "Deliver",
    description:
      "Bring the system to life across every relevant touchpoint and give the brand the foundation to move forward.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const progressRef = useRef<HTMLDivElement>(null);
  const currentNumberRef = useRef<HTMLSpanElement>(null);

  const reducedMotion = useReducedMotion();

  useGsapContext(
    () => {
      const section = sectionRef.current;

      if (!section || reducedMotion) return;

      const numbers = numberRefs.current.filter(
        (el): el is HTMLDivElement => Boolean(el)
      );

      const titles = titleRefs.current.filter(
        (el): el is HTMLHeadingElement => Boolean(el)
      );

      const descriptions = descriptionRefs.current.filter(
        (el): el is HTMLParagraphElement => Boolean(el)
      );

      const totalSteps = STEPS.length;

      /*
       * ------------------------------------------------
       * INITIAL STATE
       * ------------------------------------------------
       *
       * First step starts visible.
       * Everything else starts outside the viewport.
       */

      gsap.set(numbers, {
        xPercent: 0,
        opacity: 0,
        scale: 0.88,
      });

      gsap.set(titles, {
        xPercent: 25,
        opacity: 0,
      });

      gsap.set(descriptions, {
        xPercent: 35,
        opacity: 0,
      });

      gsap.set(numbers[0], {
        opacity: 1,
        scale: 1,
      });

      gsap.set(titles[0], {
        xPercent: 0,
        opacity: 1,
      });

      gsap.set(descriptions[0], {
        xPercent: 0,
        opacity: 1,
      });

      /*
       * ------------------------------------------------
       * RENDER
       * ------------------------------------------------
       *
       * Each step occupies one section of scroll.
       *
       * Example:
       *
       * 0 → 1 = Discover → Define
       * 1 → 2 = Define → Strategize
       * etc.
       */

      const render = (progress: number) => {
        const position = progress * (totalSteps - 1);
        const activeIndex = Math.round(position);

        numbers.forEach((number, index) => {
          const distance = position - index;
          const absDistance = Math.abs(distance);

          if (absDistance >= 1) {
            gsap.set(number, {
              opacity: 0,
              scale: 0.88,
              xPercent: distance > 0 ? -12 : 12,
            });

            return;
          }

          /*
           * Smooth transition between steps.
           */
          const local = 1 - absDistance;

          const eased =
            local * local * (3 - 2 * local);

          gsap.set(number, {
            opacity: eased,
            scale: 0.88 + eased * 0.12,
            xPercent: distance * -12,
          });
        });

        titles.forEach((title, index) => {
          const distance = position - index;
          const absDistance = Math.abs(distance);

          if (absDistance >= 1) {
            gsap.set(title, {
              opacity: 0,
              xPercent: distance > 0 ? -22 : 22,
            });

            return;
          }

          const local = 1 - absDistance;

          const eased =
            local * local * (3 - 2 * local);

          gsap.set(title, {
            opacity: eased,
            xPercent: distance * -22,
          });
        });

        descriptions.forEach((description, index) => {
          const distance = position - index;
          const absDistance = Math.abs(distance);

          if (absDistance >= 1) {
            gsap.set(description, {
              opacity: 0,
              xPercent: distance > 0 ? -30 : 30,
            });

            return;
          }

          const local = 1 - absDistance;

          const eased =
            local * local * (3 - 2 * local);

          gsap.set(description, {
            opacity: eased,
            xPercent: distance * -30,
          });
        });

        /*
         * Progress line.
         */
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            width: `${progress * 100}%`,
          });
        }

        /*
         * Current step number.
         */
        if (currentNumberRef.current) {
          currentNumberRef.current.textContent =
            `${String(activeIndex + 1).padStart(2, "0")} / ${String(
              totalSteps
            ).padStart(2, "0")}`;
        }
      };

      render(0);

      /*
       * ------------------------------------------------
       * SCROLLTRIGGER
       * ------------------------------------------------
       */

      const trigger = ScrollTrigger.create({
        trigger: section,

        start: "top top",

        end: () =>
          `+=${(totalSteps - 1) * PIN_HEIGHT_PER_STEP}`,

        pin: true,

        scrub: 0.8,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          render(self.progress);
        },
      });

      return () => {
        trigger.kill();
      };
    },
    sectionRef,
    [reducedMotion]
  );

  /*
   * ------------------------------------------------
   * REDUCED MOTION
   * ------------------------------------------------
   */

  if (reducedMotion) {
    return (
      <section
        id={PROCESS_ID}
        className="bg-wytes-cream py-14 md:py-32"
        data-nav-theme="light"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <div className="max-w-4xl">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/50">
              Process
            </span>

            <h2 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-wytes-ink sm:text-6xl md:mt-4 md:text-7xl">
              We Don&apos;t Jump To The{" "}
              <span className="font-display-light">
                Solution.
              </span>
            </h2>
          </div>

          <div className="mt-12 md:mt-20">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="border-t border-wytes-ink/10 py-6 md:py-10"
              >
                <div className="grid gap-3 md:grid-cols-[180px_1fr_1fr] md:gap-6">
                  <span className="font-mono text-sm text-wytes-orange">
                    {step.number}
                  </span>

                  <h3 className="font-display text-2xl uppercase leading-none text-wytes-ink md:text-4xl">
                    {step.title}
                  </h3>

                  <p className="max-w-md font-body text-xs leading-relaxed text-wytes-ink/60 md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /*
   * ------------------------------------------------
   * MAIN DESIGN
   * ------------------------------------------------
   */

  return (
    <section
      ref={sectionRef}
      id={PROCESS_ID}
      className="bg-wytes-cream"
      data-nav-theme="light"
    >
      {/* ---------------------------------------------
          INTRO
      --------------------------------------------- */}

      <div className="mx-auto max-w-6xl px-4 pb-2 pt-10 text-center md:px-10 md:pb-4 md:pt-20">
        <RevealOnScroll>
          <div className="mx-auto max-w-5xl">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/50">
              Process
            </span>

            <h2 className="mx-auto mt-3 max-w-4xl font-display text-3xl uppercase leading-[0.9] text-wytes-ink sm:text-6xl md:mt-5 md:text-6xl">
              We Don&apos;t Jump To The{" "}
              <span className="font-display-light">
                Solution.
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl font-body text-xs leading-relaxed text-wytes-ink/50 md:mt-5 md:text-base">
              We start with the business, understand the challenge,
              establish the strategy and create from there.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* ---------------------------------------------
          PINNED PROCESS
      --------------------------------------------- */}

      <div
        className="
          relative
          flex
          h-[38svh]
          min-h-[320px]
          items-start
          overflow-hidden
          bg-wytes-cream
          px-4
          pt-3
          md:px-10
          md:pt-6
        "
      >
        {/* -------------------------------------------
            CONTENT
        ------------------------------------------- */}

        <div className="relative mx-auto w-full max-w-4xl">
          <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.9fr_1.1fr]">
            {/* ---------------------------------------
                HUGE NUMBER
            --------------------------------------- */}

            <div className="relative h-[90px] overflow-visible sm:h-[120px] md:h-[230px]">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    numberRefs.current[index] = el;
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    font-mono
                    text-[clamp(4rem,10vw,7.5rem)]
                    font-medium
                    leading-none
                    tracking-[-0.08em]
                    text-wytes-ink
                    will-change-transform
                  "
                >
                  {step.number}
                </div>
              ))}
            </div>

            {/* ---------------------------------------
                THOUGHT
            --------------------------------------- */}

            <div className="relative min-h-[150px] sm:min-h-[170px] md:min-h-[200px]">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <h3
                    ref={(el) => {
                      titleRefs.current[index] = el;
                    }}
                    className="
                      max-w-3xl
                      font-display
                      text-2xl
                      uppercase
                      leading-[0.85]
                      text-wytes-ink
                      sm:text-4xl
                      md:text-5xl
                      lg:text-6xl
                      will-change-transform
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    ref={(el) => {
                      descriptionRefs.current[index] = el;
                    }}
                    className="
                      mt-5
                      max-w-lg
                      font-body
                      text-xs
                      leading-relaxed
                      text-wytes-ink/55
                      sm:text-base
                      md:text-lg
                      will-change-transform
                    "
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------------------
            BOTTOM PROGRESS
        ------------------------------------------- */}

        <div className="absolute bottom-3 left-4 right-4 md:bottom-6 md:left-10 md:right-10">
          <div className="mx-auto flex max-w-7xl items-center gap-5">
            <span
              ref={currentNumberRef}
              className="
                w-16
                shrink-0
                font-mono
                text-[10px]
                tracking-[0.2em]
                text-wytes-ink/50
              "
            >
              01 / 06
            </span>

            <div className="relative h-px flex-1 overflow-hidden bg-wytes-ink/10">
              <div
                ref={progressRef}
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-0
                  bg-wytes-orange
                "
              />
            </div>

            <span
              className="
                font-body
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-wytes-ink/30
              "
            >
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}