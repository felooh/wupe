import { content, couple, ceremony, venue, mapsDirectionsUrl } from "../config/event";
import { Section, Button } from "./ui/Primitives";
import { Flourish, Pampas } from "./ui/Flourish";
import { PinIcon, ArrowRightIcon } from "./ui/Icons";

export function FinalInvitation() {
  return (
    <Section className="weave">
      <div className="pointer-events-none absolute inset-0 glow" aria-hidden="true" />
      <Pampas
        className="animate-drift pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-sand/10"
        size={320}
      />

      <div className="relative mx-auto max-w-2xl">
        {/* One last arch, closing the page as the poster opens it. */}
        <div
          data-reveal
          className="arch border border-linen/18 bg-linear-to-b from-espresso-soft/50 
            to-espresso-deep/40 px-6 pt-14 pb-12 text-center backdrop-blur-[2px] sm:px-12 sm:pt-16"
        >
          <div className="flex justify-center">
            <Flourish width={160} />
          </div>

          {content.finalInvitation.lines.map((line, i) => (
            <p
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${120 + i * 120}ms` }}
              className={
                i === 0
                  ? "mt-9 font-display text-2xl leading-snug text-cream sm:text-[2rem]"
                  : "mt-5 text-[1rem] leading-relaxed text-linen/75 sm:text-[1.05rem]"
              }
            >
              {line}
            </p>
          ))}

          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "380ms" }}
            className="mt-10 font-script text-4xl text-gold sm:text-5xl"
          >
            {couple.displayOrder[0]} <span className="text-copper">&amp;</span>{" "}
            {couple.displayOrder[1]}
          </p>

          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "440ms" }}
            className="kicker mt-6 text-[0.54rem] text-linen/66"
          >
            {ceremony.dateShort} &nbsp;·&nbsp; {venue.name}, {venue.town}
          </p>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "520ms" }}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <Button href={mapsDirectionsUrl()} variant="primary">
              <PinIcon size={15} />
              Get Directions
            </Button>
            <Button href="#rsvp" variant="outline">
              RSVP
              <ArrowRightIcon
                size={15}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Button>
          </div>

          <div data-reveal style={{ ["--reveal-delay" as string]: "600ms" }} className="mt-12 flex justify-center">
            <Flourish width={130} />
          </div>
        </div>
      </div>
    </Section>
  );
}
