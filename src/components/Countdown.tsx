import { ceremony } from "../config/event";
import { useCountdown } from "../hooks/useCountdown";
import { Section } from "./ui/Primitives";
import { Flourish } from "./ui/Flourish";

function Unit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <div
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className="flex flex-col items-center"
    >
      <div
        className="flex h-20 w-[4.4rem] items-center justify-center rounded-xl border border-copper/25 
          bg-linear-to-b from-bark/80 to-espresso-deep/60 shadow-lg shadow-espresso-deep/50 
          sm:h-28 sm:w-24"
      >
        <span
          className="lining-figures font-display text-3xl text-cream sm:text-5xl"
          /* Announcing every tick would be noisy; the label below carries the meaning. */
          aria-hidden="true"
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="kicker mt-3.5 text-[0.55rem] text-gold/80 sm:text-[0.62rem]">{label}</span>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, finished } = useCountdown(ceremony.startsAtISO);

  return (
    <Section tone="deep" className="py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 glow opacity-70" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl text-center">
        {finished ? (
          <>
            <p data-reveal className="kicker text-[0.6rem] text-copper">
              The day is here
            </p>
            <h2
              data-reveal
              style={{ ["--reveal-delay" as string]: "90ms" }}
              className="mt-5 font-script text-4xl text-gold sm:text-5xl"
            >
              Today we celebrate
            </h2>
            <div data-reveal className="mt-7 flex justify-center">
              <Flourish width={180} />
            </div>
          </>
        ) : (
          <>
            <p data-reveal className="kicker text-[0.58rem] text-copper sm:text-[0.66rem]">
              Counting down to our special day
            </p>

            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "90ms" }}
              className="lining-figures mt-4 font-display text-2xl tracking-[0.18em] text-cream sm:text-3xl"
            >
              {ceremony.dateShort}
            </p>

            {/* The live region announces the day count only, once a day's worth of ticks. */}
            <p className="sr-only" aria-live="polite">
              {days} days until the ceremony.
            </p>

            <div className="mt-10 flex items-start justify-center gap-2.5 sm:gap-5">
              <Unit value={days} label="Days" delay={140} />
              <Unit value={hours} label="Hours" delay={220} />
              <Unit value={minutes} label="Minutes" delay={300} />
              <Unit value={seconds} label="Seconds" delay={380} />
            </div>

            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "460ms" }}
              className="mt-12 flex justify-center"
            >
              <Flourish width={160} />
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
