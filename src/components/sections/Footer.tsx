"use client";

import Link from "next/link";
import { SECTION_IDS, STUDIO_EMAIL } from "@/constants/nav";

const FOOTER_COLUMNS: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: `#${SECTION_IDS.hero}` },
      { label: "About", href: `#${SECTION_IDS.about}` },
      { label: "Services", href: `#${SECTION_IDS.services}` },
      { label: "Contact", href: `mailto:${STUDIO_EMAIL}` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Services", href: `#${SECTION_IDS.services}` },
      { label: "About Us", href: `#${SECTION_IDS.about}` },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/wytes.in?igsi=Z3lrcGpkcXowZXBy",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/wytes-studio",
        external: true,
      },
      { label: "Facebook", href: "https://facebook.com", external: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id={SECTION_IDS.footer}
      className="bg-white pt-16"
      data-nav-theme="light"
    >
      <div className="grid grid-cols-2 gap-10 pb-16 pl-10 pr-6 pt-14 sm:pl-16 sm:pr-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 md:pl-28 md:pr-16 md:pt-16">
        <div className="col-span-2 md:col-span-1">
          <span className="font-logo text-3xl italic text-wytes-ink">WYTES</span>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-wytes-ink/60">
            Wytes Studio is a full-service brand and design agency specializing in clarity,
            distinction and enduring value.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <p className="font-body text-sm font-semibold text-wytes-ink">{column.title}</p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="font-body text-sm text-wytes-ink/60 transition-colors duration-300 hover:text-wytes-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-wytes-ink/10 px-6 py-6 font-body text-xs text-wytes-ink/45 sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-16">
        <p>©{year} Wytes Studio. All rights reserved.</p>
        <p>Designed &amp; built by Wytes Studio</p>
      </div>
    </footer>
  );
}
