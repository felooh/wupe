import { useEffect, useState } from "react";
import { mapsDirectionsUrl } from "../config/event";
import { PinIcon } from "./ui/Icons";

/**
 * A floating "Get Directions" button for phones. It appears once the hero has
 * scrolled away, and steps aside over the location section — where the same
 * action is already on screen — and over the footer.
 */
export function MobileDirectionsFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;

      const overlapping = ["location", "rsvp"].some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top < window.innerHeight && bottom > window.innerHeight * 0.4;
      });

      setVisible(pastHero && !overlapping);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href={mapsDirectionsUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-5 z-40 flex items-center gap-2.5 rounded-full 
        bg-linear-to-b from-copper-light to-copper-deep px-5 py-3.5 font-label text-[0.66rem] 
        uppercase tracking-[0.16em] text-cream shadow-xl shadow-espresso-deep/70 
        transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] md:hidden ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
        }`}
    >
      <PinIcon size={16} />
      Directions
    </a>
  );
}
