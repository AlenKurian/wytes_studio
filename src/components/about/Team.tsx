"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Member = {
  name: string;
  role: string;
  image: string;
  x?: string;
  linkedin?: string;
};

const TEAM: Member[] = [
  {
    name: "Mubassira",
    role: "Digital Marketer",
    image: "/images/about/emp_1.jpg",
    // x: "https://x.com",
    // linkedin: "https://linkedin.com",
  },
  {
    name: "Nesla",
    role: "Digital Marketer",
    image: "/images/about/emp_2.jpg",
    // x: "https://x.com",
    // linkedin: "https://linkedin.com",
  },
  {
    name: "Riyara",
    role: "Web Developer",
    image: "/images/about/emp_3.jpg",
    // x: "https://x.com",
    // linkedin: "https://linkedin.com",
  },
  {
    name: "Alen",
    role: "Web Developer",
    image: "/images/about/emp_4.jpg",
    // x: "https://x.com",
    // linkedin: "https://linkedin.com",
  },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

export function Team() {
  return (
    <section className="bg-wytes-cream py-16 md:py-32" data-nav-theme="light">
      <div className="mx-auto max-w-6xl px-4 md:px-10">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
          <RevealOnScroll>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-wytes-ink/60">
              + Team
            </span>
            <h2 className="mt-4 font-display text-3xl uppercase leading-[1.05] text-wytes-ink sm:text-6xl md:mt-6 md:text-6xl">
              Small Team.
              <br />
              <span className="font-display-light">Big Standards.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <p className="font-body text-sm text-wytes-ink/60 sm:text-md">
              Specialists working closely to transform ideas into meaningful, measurable
              outcomes.
            </p>
          </RevealOnScroll>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-6">
          {TEAM.map((member, index) => (
            <RevealOnScroll key={member.name} delay={index * 0.08} start="top 92%">
              <article>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-wytes-ink/5">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at WYTES Studio`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover grayscale transition-[filter,transform] duration-500 hover:grayscale-0 hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-sm uppercase leading-tight text-wytes-ink md:text-base">
                      {member.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-wytes-ink/40">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex flex-none items-center gap-1.5 pt-0.5">
                    {member.x ? (
                      <a
                        href={member.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on X`}
                        className="text-wytes-ink/40 transition-colors hover:text-wytes-ink"
                      >
                        <XIcon />
                      </a>
                    ) : null}
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="text-wytes-ink/40 transition-colors hover:text-wytes-ink"
                      >
                        <LinkedInIcon />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div className="relative mt-20 md:mt-32">
          {/* <span
            aria-hidden="true"
            className="pointer-events-none block select-none text-center font-logo text-[22vw] uppercase leading-none text-wytes-ink/5 md:text-[16vw]"
          >
            WYTES
          </span> */}
          <RevealOnScroll
            delay={0.1}
            className="mt-6 flex flex-col items-start justify-between gap-6 md:-mt-4 md:flex-row md:items-end"
          >
            <p className="font-display text-lg uppercase leading-tight text-wytes-ink sm:text-2xl md:text-3xl">
              Behind Every Result Is{" "}
              <span className="font-display-light">A Team That Cares.</span>
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
