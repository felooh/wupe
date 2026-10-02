import { useEffect, useState } from "react";
import { navLinks, couple, mapsDirectionsUrl } from "../config/event";
import { MenuIcon, CloseIcon, PinIcon } from "./ui/Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  /* Condense the bar once the hero has been left behind. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight whichever section is currently in view. */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock the page behind the open mobile menu, and close it on Escape. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          scrolled
            ? "border-b border-copper/15 bg-espresso/92 py-3 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8"
          aria-label="Main"
        >
          {/* Monogram */}
          <a
            href="#home"
            className="group flex items-baseline gap-4 transition-opacity hover:opacity-85"
            aria-label={`${couple.shortNames} — back to top`}
          >
            <span className="font-script text-2xl leading-none text-gold sm:text-[1.7rem]">
              N<span className="text-copper">&amp;</span>F
            </span>
            <span
              className={`kicker hidden text-[0.55rem] text-linen/65 transition-opacity duration-500 sm:inline ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            >
              Wupe
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-4 py-2 font-label text-[0.68rem] uppercase tracking-[0.18em] 
                      transition-colors duration-400 ${
                        isActive ? "text-gold" : "text-linen/65 hover:text-cream"
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-center bg-copper transition-transform 
                        duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                    />
                  </a>
                </li>
              );
            })}
            <li className="ml-3">
              <a
                href="#rsvp"
                className="rounded-full border border-copper/55 px-5 py-2 font-label text-[0.68rem] uppercase 
                  tracking-[0.18em] text-gold transition-all duration-500 hover:border-copper 
                  hover:bg-copper/15 hover:text-cream"
              >
                RSVP
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-copper/25 p-2.5 text-gold transition-colors 
              hover:border-copper/60 hover:text-cream md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <MenuIcon size={20} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-60 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-espresso-deep/80 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col border-l border-copper/20 
            bg-espresso weave px-7 pt-6 pb-10 transition-transform duration-600 
            ease-[cubic-bezier(0.22,0.61,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-script text-2xl text-gold">
              N<span className="text-copper">&amp;</span>F
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-copper/25 p-2.5 text-gold"
              aria-label="Close menu"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          <ul className="mt-12 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                  className={`block border-b border-linen/8 py-4 font-display text-2xl text-cream 
                    transition-all duration-500 hover:text-gold ${
                      open ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
                    }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={mapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full 
              bg-linear-to-b from-copper-light to-copper-deep px-6 py-4 font-label text-[0.7rem] 
              uppercase tracking-[0.2em] text-cream"
          >
            <PinIcon size={16} />
            Get Directions
          </a>
        </div>
      </div>
    </>
  );
}
