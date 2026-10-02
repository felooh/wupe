import { couple, ceremony, venue, content, mapsDirectionsUrl } from "../config/event";
import { Button, Detail } from "./ui/Primitives";
import { Flourish, Pampas } from "./ui/Flourish";
import { PinIcon, CalendarIcon, ClockIcon, ArrowRightIcon } from "./ui/Icons";
import couplePhoto from "../assets/couple.png";

/** Staggered entrance: each line arrives a beat after the one above it. */
const rise = (ms: number) => ({
  className: "animate-rise",
  style: { animationDelay: `${ms}ms` },
});

export function Hero() {
  const [first, second] = couple.displayOrder;

  return (
    <section
      id="home"
      className="hero relative flex min-h-svh flex-col items-center justify-center overflow-hidden 
        bg-espresso weave px-4 pt-24 pb-16 sm:px-6 sm:pt-24 sm:pb-20"
    >
      {/* Warm light pooling behind the arch, as on the poster. */}
      <div className="pointer-events-none absolute inset-0 glow" aria-hidden="true" />

      {/* Pampas plumes tucked into the corners. */}
      <Pampas
        className="animate-drift pointer-events-none absolute -top-6 -left-14 text-sand/22 sm:-left-6 lg:left-8 lg:top-10"
        rotate={-24}
        size={230}
      />
      <Pampas
        className="animate-drift pointer-events-none absolute -right-16 bottom-4 text-sand/18 sm:-right-6 lg:right-10 lg:bottom-16"
        rotate={28}
        size={210}
      />

      {/* The arch — the poster's defining shape. */}
      <div
        className="hero-frame animate-arch relative z-10 w-full max-w-2xl arch border border-linen/22 
          bg-linear-to-b from-espresso-soft/70 via-espresso/55 to-espresso-deep/70 
          px-5 pt-11 pb-10 text-center backdrop-blur-[2px] sm:px-12 sm:pt-12 sm:pb-11"
        style={{ animationDelay: "120ms" }}
      >
        {/* A second, inset hairline arch for depth. */}
        <div
          className="pointer-events-none absolute inset-2.5 arch border border-copper/18 sm:inset-4"
          aria-hidden="true"
        />

        <div className="relative">
          {/* The couple, standing in the dome of the arch and fading into it. */}
          <figure {...rise(380)} className="relative mx-auto mb-5 w-full max-w-[17rem] sm:max-w-xs">
            <div
              className="pointer-events-none absolute inset-x-4 top-6 bottom-2 rounded-full bg-copper/20 blur-3xl"
              aria-hidden="true"
            />
            <img
              src={couplePhoto}
              alt={`${couple.brideFullName} and ${couple.groomFullName}`}
              width={612}
              height={408}
              fetchPriority="high"
              decoding="async"
              className="relative h-auto w-full"
              style={{
                maskImage: "linear-gradient(to bottom, black 70%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent)",
              }}
            />
          </figure>

          <p {...rise(500)} className="kicker text-[0.58rem] text-linen/70 sm:text-[0.68rem]">
            {ceremony.kicker}
          </p>

          <div {...rise(640)} className="mt-4 flex justify-center">
            <Flourish width={168} />
          </div>

          {/* Names, in the poster's script */}
          <h1 {...rise(780)} className="mt-5">
            <span className="sr-only">
              {couple.brideFullName} and {couple.groomFullName} — {ceremony.title}
            </span>
            <span
              aria-hidden="true"
              className="hero-names block font-script text-[2.55rem] leading-[1.15] text-gold sm:text-[3.4rem] lg:text-6xl"
            >
              {first} <span className="text-copper">&amp;</span> {second}
            </span>
          </h1>

          <p {...rise(920)} className="kicker mt-5 text-[0.56rem] text-linen/60 sm:text-[0.64rem]">
            {ceremony.subtitle}
          </p>

          {/* WUPE / CEREMONY, as on the plaque */}
          <div {...rise(1040)} className="mt-3">
            <p className="hero-wupe font-display text-[2.6rem] leading-none font-semibold tracking-[0.14em] text-copper-gradient sm:text-5xl lg:text-[3.7rem]">
              WUPE
            </p>
            <p className="hero-ceremony mt-1.5 font-display text-[1.8rem] leading-none tracking-[0.1em] text-sheen sm:text-[2.2rem] lg:text-[2.5rem]">
              CEREMONY
            </p>
          </div>

          <div {...rise(1180)} className="mt-6 flex justify-center">
            <Flourish width={200} />
          </div>

          <p
            {...rise(1300)}
            className="mx-auto mt-6 max-w-md text-[0.94rem] leading-relaxed text-linen/80 sm:text-base"
          >
            {content.heroInvite}
          </p>

          {/* The three facts a guest needs first */}
          <dl
            {...rise(1420)}
            className="mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-9 sm:gap-y-3"
          >
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Venue</dt>
              <PinIcon size={17} className="shrink-0 text-copper" />
              <dd className="font-label text-[0.74rem] tracking-[0.1em] text-cream uppercase sm:text-[0.8rem]">
                {venue.name}, {venue.town}
              </dd>
            </div>
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Date</dt>
              <CalendarIcon size={17} className="shrink-0 text-copper" />
              <dd className="font-label text-[0.74rem] tracking-[0.1em] text-cream uppercase sm:text-[0.8rem]">
                {ceremony.dateLabel}
              </dd>
            </div>
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Time</dt>
              <ClockIcon size={17} className="shrink-0 text-copper" />
              <dd className="font-label text-[0.74rem] tracking-[0.1em] text-cream uppercase sm:text-[0.8rem]">
                <Detail value={ceremony.timeLabel} fallback="Time to be confirmed" />
              </dd>
            </div>
          </dl>

          <p {...rise(1500)} className="mt-4 text-[0.8rem] text-linen/66">
            {venue.county}, {venue.country}
          </p>

          {/* The two actions that matter */}
          <div
            {...rise(1600)}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button href={mapsDirectionsUrl()} variant="primary">
              <PinIcon size={15} />
              View Directions
            </Button>
            <Button href="#rsvp" variant="outline">
              RSVP
              <ArrowRightIcon
                size={15}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      {/* Floated rather than stacked, so it never pushes the buttons off screen. */}
      <a
        href="#invitation"
        className="hero-scroll animate-fade absolute inset-x-0 bottom-4 z-10 mx-auto flex w-fit flex-col 
          items-center gap-2 text-linen/60 transition-colors duration-500 hover:text-gold 
          max-[430px]:hidden sm:bottom-7"
        style={{ animationDelay: "2000ms" }}
        aria-label="Scroll to the invitation"
      >
        <span className="kicker text-[0.5rem]">Scroll</span>
        <span className="h-8 w-px bg-linear-to-b from-copper/70 to-transparent" aria-hidden="true" />
      </a>
    </section>
  );
}
