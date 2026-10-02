import { gallery } from "../config/event";
import { Section, SectionHeading } from "./ui/Primitives";
import { CameraIcon } from "./ui/Icons";

export function Gallery() {
  return (
    <Section tone="raised">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Moments" title="Our Memories" />

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="mx-auto mt-8 max-w-lg text-center text-[0.95rem] leading-relaxed text-linen/65"
        >
          A few of the moments that led us here.
        </p>

        {/* Arched frames, echoing the poster — the middle one stands taller. */}
        <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {gallery.map((photo, i) => (
            <li
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${120 + i * 80}ms` }}
              className={i % 3 === 1 ? "lg:mt-10" : ""}
            >
              <figure className="group relative">
                <div
                  className="relative overflow-hidden arch border border-copper/20 
                    bg-linear-to-b from-bark/60 to-espresso-deep/50 transition-colors duration-700 
                    group-hover:border-copper/50"
                >
                  <div className="aspect-4/5">
                    {photo.src ? (
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1.2s] 
                          ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
                      />
                    ) : (
                      /* An elegant empty frame, so the section looks finished
                         before the photographs arrive. */
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">
                        <span className="rounded-full border border-copper/25 bg-copper/8 p-3 text-copper-light/80">
                          <CameraIcon size={22} />
                        </span>
                        <span className="kicker text-center text-[0.55rem] text-linen/60">
                          Photo coming soon
                        </span>
                      </div>
                    )}
                  </div>

                  {photo.src && (
                    <div
                      className="pointer-events-none absolute inset-0 bg-linear-to-t 
                        from-espresso-deep/75 via-transparent to-transparent opacity-0 
                        transition-opacity duration-700 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <figcaption className="mt-3.5 text-center">
                  <span className="kicker text-[0.5rem] text-gold/80">{photo.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
