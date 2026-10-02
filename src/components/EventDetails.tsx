import type { ReactNode } from "react";
import { couple, ceremony, venue } from "../config/event";
import { Section, SectionHeading, Detail } from "./ui/Primitives";
import {
  RingsIcon,
  CalendarIcon,
  ClockIcon,
  PinIcon,
  GlobeIcon,
  ShirtIcon,
  HeartIcon,
} from "./ui/Icons";

type Row = { icon: ReactNode; label: string; value: ReactNode };

export function EventDetails() {
  const rows: Row[] = [
    {
      icon: <HeartIcon size={20} />,
      label: "Couple",
      value: `${couple.brideFullName} & ${couple.groomFullName}`,
    },
    { icon: <RingsIcon size={20} />, label: "Ceremony", value: ceremony.title },
    { icon: <CalendarIcon size={20} />, label: "Date", value: ceremony.dateLabel },
    {
      icon: <ClockIcon size={20} />,
      label: "Time",
      value: <Detail value={ceremony.timeLabel} fallback="To be confirmed" />,
    },
    {
      icon: <PinIcon size={20} />,
      label: "Venue",
      value: `${venue.name}, ${venue.town}`,
    },
    { icon: <GlobeIcon size={20} />, label: "County", value: venue.county },
    { icon: <GlobeIcon size={20} />, label: "Country", value: venue.country },
    { icon: <ShirtIcon size={20} />, label: "Dress Code", value: ceremony.dressCode },
  ];

  return (
    <Section id="event">
      <div className="mx-auto max-w-4xl">
        <SectionHeading kicker="The Details" title="Event Information" />

        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "140ms" }}
          className="mt-14 overflow-hidden rounded-2xl border border-copper/20 
            bg-linear-to-b from-bark/60 to-espresso-soft/30 shadow-2xl shadow-espresso-deep/50"
        >
          <dl className="divide-y divide-linen/8 sm:grid sm:grid-cols-2 sm:divide-y-0">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`group flex items-start gap-4 px-6 py-5 transition-colors duration-500 
                  hover:bg-copper/6 sm:px-8 sm:py-7 ${
                    /* Rule between the two columns, and between rows, on wider screens. */
                    i % 2 === 0 ? "sm:border-r sm:border-linen/8" : ""
                  } ${i >= 2 ? "sm:border-t sm:border-linen/8" : ""}`}
              >
                <span
                  className="mt-0.5 shrink-0 rounded-full border border-copper/25 bg-copper/10 p-2.5 
                    text-copper transition-colors duration-500 group-hover:border-copper/55 
                    group-hover:text-copper-light"
                  aria-hidden="true"
                >
                  {row.icon}
                </span>
                <div className="min-w-0">
                  <dt className="kicker text-[0.55rem] text-gold/70">{row.label}</dt>
                  <dd className="mt-1.5 font-display text-lg leading-snug text-cream sm:text-xl">
                    {row.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "240ms" }}
          className="mt-8 text-center text-sm text-linen/66"
        >
          {venue.fullAddress}
        </p>
      </div>
    </Section>
  );
}
