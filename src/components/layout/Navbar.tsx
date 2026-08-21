"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { PillButton } from "@/components/ui/PillButton";
import { useLenis } from "@/hooks/useLenis";
import { NAV_HEIGHT, SECTION_IDS, STUDIO_EMAIL } from "@/constants/nav";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

function sampleIsLight(target: HTMLElement | null, header: HTMLElement): boolean {
  if (!target) return false;
  const rect = target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = header.offsetHeight / 2;
  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    if (header.contains(el)) continue;
    const themed = el.closest<HTMLElement>("[data-nav-theme]");
    if (themed) return themed.dataset.navTheme === "light";
  }
  return false;
}

export function Navbar() {
  const [logoLight, setLogoLight] = useState(false);
  const [buttonLight, setButtonLight] = useState(false);
  const [linksLight, setLinksLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const buttonWrapRef = useRef<HTMLSpanElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    function updateTheme() {
      const header = headerRef.current;
      if (!header) return;
      setLogoLight(sampleIsLight(logoRef.current, header));
      setButtonLight(sampleIsLight(buttonWrapRef.current, header));
      setLinksLight(sampleIsLight(linksWrapRef.current, header));
    }
    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  function handleAnchorClick(id: string) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      setMenuOpen(false);
      if (!isHome || !lenis) return;
      event.preventDefault();
      lenis.scrollTo(`#${id}`, { offset: -NAV_HEIGHT, duration: 1.4 });
    };
  }

  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <nav className="relative flex items-center justify-between px-6 py-6 md:px-10">
        <div
          ref={linksWrapRef}
          className="absolute left-1/2 top-1/2 hidden translate-x-[-50%] translate-y-[-40%] items-center gap-25 sm:flex"
        >
          {NAV_LINKS.map((link) => {
            const isCurrent = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "font-body text-sm font-semibold uppercase tracking-[0.25em] transition-colors duration-300",
                  linksLight ? "text-black" : "text-white",
                  isCurrent ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <a
          ref={logoRef}
          href={isHome ? `#${SECTION_IDS.hero}` : "/"}
          onClick={handleAnchorClick(SECTION_IDS.hero)}
          className={clsx(
            "font-logo text-3xl italic transition-colors duration-300 sm:text-4xl",
            logoLight ? "text-black" : "text-white"
          )}
        >
          WYTES
        </a>

        <div className="flex items-center gap-3">
          <span ref={buttonWrapRef} className="inline-flex">
            <PillButton
              href={`mailto:${STUDIO_EMAIL}`}
              variant="outline"
              className={clsx(
                "relative overflow-hidden backdrop-blur-sm transition-colors duration-300",
                buttonLight
                  ? "border-black bg-white/40 text-black shadow-[0_0_16px_rgba(0,0,0,0.12)] hover:bg-white/60"
                  : "border-white bg-black/25 text-white shadow-[0_0_16px_rgba(0,0,0,0.35)] hover:bg-black/40"
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  "pointer-events-none absolute inset-y-0 left-0 w-1/4",
                  "[animation:nav-cta-shine_3.4s_ease-in-out_infinite]",
                  buttonLight
                    ? "bg-gradient-to-r from-transparent via-black/20 to-transparent"
                    : "bg-gradient-to-r from-transparent via-white/70 to-transparent"
                )}
              />
              <span className="relative">Let&apos;s Talk</span>
            </PillButton>
          </span>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={clsx(
              "relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden",
              menuOpen ? "text-white" : logoLight ? "text-black" : "text-white"
            )}
          >
            <span
              className={clsx(
                "block h-0.5 w-6 bg-current transition-transform duration-300",
                menuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={clsx(
                "block h-0.5 w-6 bg-current transition-opacity duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "block h-0.5 w-6 bg-current transition-transform duration-300",
                menuOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      <div
        className={clsx(
          "fixed inset-0 z-0 flex flex-col items-center justify-center gap-8 bg-wytes-ink text-wytes-cream transition-opacity duration-300 sm:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-body text-2xl font-semibold uppercase tracking-[0.15em]"
          >
            {link.label}
          </Link>
        ))}
        <PillButton
          href={`mailto:${STUDIO_EMAIL}`}
          variant="outline"
          className="!border-wytes-cream !text-wytes-cream"
          onClick={() => setMenuOpen(false)}
        >
          Let&apos;s Talk
        </PillButton>
      </div>
    </header>
  );
}
