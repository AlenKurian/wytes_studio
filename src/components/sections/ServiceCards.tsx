"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

type ServiceCard = {
  title: string;
  shortTagline: string;
  tagline: string;
  services: string[];
  bg: string;
  text: string;
  subtext: string;
  icon: ReactNode;
};

const ICON_STROKE = 1.5;

const CARDS: ServiceCard[] = [
  {
    title: "Strategy",
    shortTagline: "Clarity that sets the foundation.",
    tagline: "The thinking behind the brand",
    services: ["Brand Strategy", "Positioning", "Market and Competitive Intelligence", "Brand Architecture", "Naming & Messaging", "Brand Voice", "Go-to-Market Strategy"],
    bg: "bg-wytes-ink",
    text: "text-wytes-cream",
    subtext: "text-wytes-cream/60",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} className="h-8 w-8">
        <circle cx="12" cy="5.5" r="2.25" />
        <path d="M9.5 12c.3-1.6 1.1-2.5 2.5-2.5s2.2.9 2.5 2.5c.2 1.1 1 2 1.9 2.6.6.4.9 1 .9 1.7 0 1-.8 1.7-1.8 1.7H8.5c-1 0-1.8-.7-1.8-1.7 0-.7.3-1.3.9-1.7.9-.6 1.7-1.5 1.9-2.6Z" />
        <path d="M8 20.5h8" />
        <path d="M9 18.5h6" />
      </svg>
    ),
  },
  {
    title: "Brand",
    shortTagline: "Identities that stand out and stand for something.",
    tagline: "Strategy made visible",
    services: ["Visual Identity", "Logo Systems", "Corporate Identity", "Art Direction", "Typography", "Color Systems", "Brand Guidelines", "Packaging", "Collateral"],
    bg: "bg-[#e2e2df]",
    text: "text-wytes-ink",
    subtext: "text-wytes-ink/60",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} className="h-8 w-8">
        <circle cx="12" cy="12" r="7" />
      </svg>
    ),
  },
  {
    title: "Digital",
    shortTagline: "Digital experiences designed to perform.",
    tagline: "Strategy transformed into experience",
    services: ["Digital Strategy", "Website Strategy", "UI / UX Design", "Website Development", "Corporate Websites", "Landing Pages", "E-Commerce", "Digital Systems"],
    bg: "bg-wytes-cream",
    text: "text-wytes-ink",
    subtext: "text-wytes-ink/60",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} className="h-8 w-8">
        <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
        <path d="M9 20.5h6" />
        <path d="M12 16.5v4" />
      </svg>
    ),
  },
  {
    title: "Creative",
    shortTagline: "Crafting content that connects and inspires.",
    tagline: "Strategy transformed into culture",
    services: ["Creative Design", "Campaign Concepts", "Photography and Videography", "Brand Films", "Motion Design", "Editorial & Social Content"],
    bg: "bg-wytes-ink",
    text: "text-wytes-cream",
    subtext: "text-wytes-cream/60",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} className="h-8 w-8">
        <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" />
      </svg>
    ),
  },
  {
    title: "Media",
    shortTagline: "Amplifying brands with impact and precision.",
    tagline: "Strategy transformed into visibility",
    services: ["Media Strategy", "Digital Advertising", "Outdoor Advertising", "Billboards & LED Displays", "Digital Signage", "Media Planning"],
    bg: "bg-gradient-to-br from-wytes-orange to-wytes-red",
    text: "text-wytes-cream",
    subtext: "text-wytes-cream/75",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} className="h-8 w-8">
        <path d="M5 20.5V13" />
        <path d="M12 20.5V8" />
        <path d="M19 20.5v-7" />
      </svg>
    ),
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
              <div className="flex flex-col gap-3">
                <span className={card.text}>{card.icon}</span>
                <span className={`font-display text-2xl uppercase leading-none sm:text-3xl ${card.text}`}>
                  {card.title}
                </span>
                <p className={`font-body text-sm ${card.subtext}`}>{card.shortTagline}</p>
              </div>
              <span
                aria-hidden="true"
                className={`shrink-0 text-2xl transition-transform duration-300 ${card.text} ${isOpen ? "rotate-45" : ""}`}
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
                  <p className={`flex items-center gap-2 font-body text-sm ${card.subtext}`}>
                    {card.tagline}
                    <span aria-hidden="true">→</span>
                  </p>
                  <ul className={`mt-6 flex flex-col gap-2 border-t pt-4 ${card.text === "text-wytes-cream" ? "border-wytes-cream/20" : "border-wytes-ink/15"}`}>
                    {card.services.map((service) => (
                      <li
                        key={service}
                        className={`font-body text-xs uppercase tracking-wide sm:text-sm ${card.subtext}`}
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
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center transition-opacity duration-500 md:p-8 ${
                isActive ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <span className={card.text}>{card.icon}</span>
              <span className={`font-display text-2xl uppercase leading-none sm:text-3xl ${card.text}`}>
                {card.title}
              </span>
              <p className={`font-body text-sm ${card.subtext}`}>{card.shortTagline}</p>
            </div>

            <div
              className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 md:p-8 ${
                isActive
                  ? "translate-y-0 opacity-100 delay-150"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <span className={`font-display text-3xl uppercase leading-none sm:text-4xl md:text-5xl ${card.text}`}>
                {card.title}
              </span>
              <p className={`mt-3 flex max-w-xs items-center gap-2 font-body text-sm sm:text-base ${card.subtext}`}>
                {card.tagline}
                <span aria-hidden="true">→</span>
              </p>
              <ul className={`mt-6 flex flex-col gap-2 border-t pt-4 ${card.text === "text-wytes-cream" ? "border-wytes-cream/20" : "border-wytes-ink/15"}`}>
                {card.services.map((service) => (
                  <li
                    key={service}
                    className={`font-body text-xs uppercase tracking-wide sm:text-sm ${card.subtext}`}
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
