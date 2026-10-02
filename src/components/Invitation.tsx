import { content, couple } from "../config/event";
import { Section } from "./ui/Primitives";
import { Flourish, Pampas } from "./ui/Flourish";
import couplePhoto from "../assets/couple.png";

export function Invitation() {
  const { salutation, paragraphs, signOff } = content.invitation;

  return (
    <Section id="invitation" tone="raised">
      <Pampas
        className="pointer-events-none absolute -left-20 top-10 text-sand/8"
        rotate={-18}
        size={260}
      />
      <Pampas
        className="pointer-events-none absolute -right-20 bottom-0 text-sand/8"
        rotate={20}
        size={260}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p data-reveal className="kicker text-[0.6rem] text-copper sm:text-[0.68rem]">
          Our Invitation
        </p>

        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "100ms" }}
          className="mt-6 flex justify-center"
        >
          <Flourish width={180} />
        </div>

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "180ms" }}
          className="mt-10 font-display text-2xl text-gold italic sm:text-[1.85rem]"
        >
          {salutation}
        </p>

        <div className="mt-8 space-y-6">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${260 + i * 110}ms` }}
              className="text-[1.02rem] leading-[1.9] text-linen/85 sm:text-[1.08rem]"
            >
              {text}
            </p>
          ))}
        </div>

        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "620ms" }}
          className="mt-12 flex flex-col items-center"
        >
          {/* The couple, softly lit and fading into the page. */}
          <figure className="relative mb-8 w-full max-w-md">
            <div
              className="pointer-events-none absolute inset-x-6 top-4 bottom-0 rounded-full bg-copper/15 blur-3xl"
              aria-hidden="true"
            />
            <img
              src={couplePhoto}
              alt={`${couple.displayOrder[0]} and ${couple.displayOrder[1]}`}
              width={612}
              height={408}
              loading="lazy"
              decoding="async"
              className="relative h-auto w-full"
              style={{
                maskImage: "linear-gradient(to bottom, black 72%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent)",
              }}
            />
          </figure>

          <p className="text-[0.95rem] text-linen/60 italic">{signOff}</p>
          <p className="mt-3 font-script text-4xl text-gold sm:text-5xl">
            {couple.displayOrder[0]} <span className="text-copper">&amp;</span>{" "}
            {couple.displayOrder[1]}
          </p>
          <div className="mt-8">
            <Flourish width={140} />
          </div>
        </div>
      </div>
    </Section>
  );
}
