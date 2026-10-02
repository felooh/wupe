import { content } from "../config/event";
import { Section, SectionHeading } from "./ui/Primitives";
import { Pampas } from "./ui/Flourish";

export function AboutWupe() {
  const { heading, body, pillars } = content.aboutWupe;

  return (
    <Section tone="raised">
      <Pampas
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 text-sand/7"
        size={300}
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading kicker="Tradition" title={heading} />

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "140ms" }}
          className="mx-auto mt-12 max-w-2xl text-center font-display text-xl leading-[1.75] 
            text-linen/85 italic sm:text-2xl sm:leading-[1.7]"
        >
          {body}
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${200 + i * 90}ms` }}
              className="group flex flex-col items-center text-center"
            >
              {/* A small arch, echoing the poster's frame. */}
              <span
                className="flex h-12 w-9 items-end justify-center arch border border-copper/30 
                  bg-copper/8 transition-colors duration-600 group-hover:border-copper/60 
                  group-hover:bg-copper/15"
                aria-hidden="true"
              >
                <span className="mb-2 h-1.5 w-1.5 rotate-45 bg-copper" />
              </span>
              <h3 className="mt-5 font-display text-lg tracking-[0.06em] text-gold sm:text-xl">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[0.86rem] leading-relaxed text-linen/65">{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
