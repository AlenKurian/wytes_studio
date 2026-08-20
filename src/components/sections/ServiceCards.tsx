"use client";

import { useState, type MouseEvent } from "react";

type ServiceCard = {
  title: string;
  tagline: string;
  services: string[];
  bg: string;
};

const CARDS: ServiceCard[] = [
  {
    title: "Strategy",
    tagline: "The thinking behind the brand",
    services: ["Brand Strategy", "Positioning", "Market and Competitive Intelligence", "Brand Architecture", "Naming & Messaging", "Brand Voice", "Go-to-Market Strategy"],
    bg: "bg-wytes-ink",
  },
  {
    title: "Brand",
    tagline: "Strategy made visible",
    services: ["Visual Identity", "Logo Systems", "Corporate Identity", "Art Direction", "Typography", "Color Systems", "Brand Guidelines", "Packaging", "Collateral"],
    bg: "bg-gradient-to-br from-[#ffbb46] to-[#ff3600]",
  },
  {
    title: "Digital",
    tagline: "Strategy transformed into experience",
    services: ["Digital Strategy", "Website Strategy", "UI / UX Design", "Website Development", "Corporate Websites", "Landing Pages", "E-Commerce", "Digital Systems"],
    bg: "bg-wytes-orange",
  },
  {
    title: "Creative",
    tagline: "Strategy transformed into culture",
    services: ["Creative Design", "Campaign Concepts", "Photography and Videography", "Brand Films", "Motion Design", "Editorial & Social Content"],
    bg: "bg-gradient-to-br from-[#c6280e] to-[#0b0b0b]",
  },
  {
    title: "Media",
    tagline: "Strategy transformed into visibility",
    services: ["Media Strategy", "Digital Advertising", "Outdoor Advertising", "Billboards & LED Displays", "Digital Signage", "Media Planning"],
    bg: "bg-wytes-red",
  },
];

export function ServiceCards() {
  return (
    <>
      <ServiceCardsMobile />
      <ServiceCardsDesktop />
    </>
  );
}

function ServiceCardsMobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-16 flex flex-col gap-3 px-6 md:hidden">
      {CARDS.map((card, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={card.title}
            data-nav-theme="dark"
            className={`overflow-hidden rounded-2xl ${card.bg}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-display text-2xl uppercase leading-none text-wytes-cream sm:text-3xl">
                {card.title}
              </span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-2xl text-wytes-cream transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col px-6 pb-6">
                  <p className="flex items-center gap-2 font-body text-sm text-wytes-cream/75">
                    {card.tagline}
                    <span aria-hidden="true">→</span>
                  </p>
                  <ul className="mt-6 flex flex-col gap-2 border-t border-wytes-cream/20 pt-4">
                    {card.services.map((service) => (
                      <li
                        key={service}
                        className="font-body text-xs uppercase tracking-wide text-wytes-cream/60 sm:text-sm"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ServiceCardsDesktop() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursorPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  return (
    <div
      className="relative mt-16 hidden h-[36rem] w-full gap-4 px-10 md:flex"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}
    >
      {CARDS.map((card, index) => {
        const isActive = hovered === index;
        const isDimmed = hovered !== null && !isActive;

        return (
          <div
            key={card.title}
            onMouseEnter={() => setHovered(index)}
            data-nav-theme="dark"
            className={`group relative cursor-none overflow-hidden rounded-2xl transition-[width,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${card.bg}`}
            style={{
              width: isActive ? "42%" : hovered !== null ? "14.5%" : "20%",
              opacity: isDimmed ? 0.7 : 1,
            }}
          >
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                isActive ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <span
                className="whitespace-nowrap font-display text-2xl uppercase tracking-wide text-wytes-cream sm:text-3xl"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {card.title}
              </span>
            </div>

            <div
              className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 md:p-8 ${
                isActive
                  ? "translate-y-0 opacity-100 delay-150"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <span className="font-display text-3xl uppercase leading-none text-wytes-cream sm:text-4xl md:text-5xl">
                {card.title}
              </span>
              <p className="mt-3 flex max-w-xs items-center gap-2 font-body text-sm text-wytes-cream/75 sm:text-base">
                {card.tagline}
                <span aria-hidden="true">→</span>
              </p>
              <ul className="mt-6 flex flex-col gap-2 border-t border-wytes-cream/20 pt-4">
                {card.services.map((service) => (
                  <li
                    key={service}
                    className="font-body text-xs uppercase tracking-wide text-wytes-cream/60 sm:text-sm"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      <div
        className="pointer-events-none absolute z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wytes-cream font-body text-[0.6rem] font-semibold uppercase tracking-wide text-wytes-ink transition-opacity duration-200"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          opacity: hovered !== null ? 1 : 0,
        }}
      >
        View
      </div>
    </div>
  );
}
