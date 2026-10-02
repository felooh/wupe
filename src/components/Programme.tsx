import { useEffect } from "react";
import { couple, ceremony, venue, programme } from "../config/event";
import { useReveal } from "../hooks/useReveal";
import { Section, SectionHeading, Button } from "./ui/Primitives";
import { Flourish } from "./ui/Flourish";
import { ClockIcon } from "./ui/Icons";
import { Footer } from "./Footer";

/**
 * The day's programme, on its own page at `programme.path`.
 *
 * Deliberately not linked from the main site. It also asks search engines not
 * to index it — but it is not private: anyone who has the link can open it.
 */
export function ProgrammePage() {
  useReveal();

  useEffect(() => {
    document.title = `Programme — ${couple.shortNames} ${ceremony.title}`;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <>
      <main>
        <Section tone="deep" className="pt-24 sm:pt-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="font-script text-5xl text-gold sm:text-6xl">
              {couple.displayOrder[0]} <span className="text-copper">&amp;</span>{" "}
              {couple.displayOrder[1]}
            </p>
            <p className="kicker mt-5 text-[0.62rem] text-copper sm:text-[0.7rem]">
              {ceremony.title}
            </p>
            <p className="mt-4 flex flex-wrap justify-center gap-x-3 text-[0.95rem] text-linen/75">
              <span>{ceremony.dateLabel}</span>
              <span aria-hidden="true">·</span>
              <span>
                {venue.name}, {venue.town}
              </span>
            </p>
            <div className="mt-7">
              <Flourish width={180} />
            </div>
            <p className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-linen/65">
              {programme.tagline}
            </p>
          </div>
        </Section>

        <Section>
          <div className="mx-auto max-w-3xl">
            <SectionHeading kicker="The Day" title="Programme" />

            <ol className="relative mt-14 space-y-6 border-l border-copper/25 pl-6 sm:pl-10">
              {programme.items.map((item, i) => (
                <li
                  key={item.title}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${80 + i * 60}ms` }}
                  className="relative"
                >
                  {/* The marker sits on the timeline rule. */}
                  <span
                    className="absolute top-6 -left-[1.95rem] h-2.5 w-2.5 rotate-45 border
                      border-copper bg-espresso sm:-left-[2.95rem]"
                    aria-hidden="true"
                  />
                  <div
                    className="rounded-2xl border border-copper/18 bg-linear-to-b from-bark/60
                      to-espresso-soft/30 p-6 shadow-xl shadow-espresso-deep/40 sm:p-8"
                  >
                    <p className="kicker flex items-center gap-2 text-[0.58rem] text-gold/80">
                      <ClockIcon size={14} className="text-copper" />
                      {item.time}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-snug text-cream sm:text-[1.7rem]">
                      {item.title}
                    </h3>
                    {item.intro && (
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-linen/75">
                        {item.intro}
                      </p>
                    )}
                    {item.points.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-[0.92rem] leading-relaxed text-linen/70"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-copper"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 flex justify-center">
              <Button href="/" variant="outline">
                Back to the invitation
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
