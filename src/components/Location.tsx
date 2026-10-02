import { useState } from "react";
import {
  venue,
  mapsDirectionsUrl,
  mapsPlaceUrl,
  mapsEmbedUrl,
  osmViewUrl,
  hasPreciseLocation,
} from "../config/event";
import { Section, SectionHeading, Button, Card } from "./ui/Primitives";
import { PinIcon, CopyIcon, CheckIcon, ArrowRightIcon } from "./ui/Icons";

/** Copies the address, with a fallback for browsers without the async API. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export function Location() {
  const [copied, setCopied] = useState(false);

  const locationText = venue.plusCode
    ? `${venue.fullAddress} (${venue.plusCode})`
    : venue.fullAddress;

  const handleCopy = async () => {
    if (await copyText(locationText)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <Section id="location">
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Where We Gather" title="Location & Directions" />

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* The address card */}
          <Card
            data-reveal
            className="lg:col-span-2 lg:self-start"
          >
            <div data-reveal className="flex items-start gap-4">
              <span
                className="shrink-0 rounded-full border border-copper/30 bg-copper/12 p-3 text-copper"
                aria-hidden="true"
              >
                <PinIcon size={22} />
              </span>
              <div>
                <p className="kicker text-[0.55rem] text-gold/70">Destination</p>
                <h3 className="mt-2 font-display text-2xl leading-tight text-cream sm:text-[1.7rem]">
                  {venue.name}
                </h3>
                <p className="mt-1 text-[0.95rem] text-linen/75">
                  {venue.town}, {venue.county}
                </p>
                <p className="text-[0.95rem] text-linen/66">{venue.country}</p>
              </div>
            </div>

            {venue.landmark && (
              <p
                data-reveal
                className="mt-6 rounded-lg border-l-2 border-copper/50 bg-copper/6 px-4 py-3 
                  text-[0.9rem] leading-relaxed text-linen/80"
              >
                <span className="kicker mr-2 text-[0.52rem] text-gold/70">Landmark</span>
                {venue.landmark}
              </p>
            )}

            {venue.plusCode && (
              <p data-reveal className="mt-5">
                <span className="kicker text-[0.52rem] text-gold/70">Plus Code</span>
                <span className="mt-1.5 block font-label text-lg tracking-[0.08em] text-cream">
                  {venue.plusCode}
                </span>
              </p>
            )}

            {/* Actions, stacked and thumb-sized on a phone. */}
            <div data-reveal className="mt-7 flex flex-col gap-3">
              <Button href={mapsDirectionsUrl()} variant="primary" className="w-full">
                <PinIcon size={15} />
                Get Directions
              </Button>
              <Button href={mapsPlaceUrl()} variant="outline" className="w-full">
                Open in Google Maps
                <ArrowRightIcon
                  size={15}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Button>
              <Button
                variant="ghost"
                className="w-full border border-linen/12"
                onClick={handleCopy}
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <CheckIcon size={15} className="text-copper-light" />
                    Location copied
                  </>
                ) : (
                  <>
                    <CopyIcon size={15} />
                    Copy Location
                  </>
                )}
              </Button>
            </div>

            {!hasPreciseLocation && (
              <p data-reveal className="mt-6 text-[0.8rem] leading-relaxed text-linen/65">
                The map below shows Wundanyi, the town you will be heading for. An exact pin for
                the venue will be shared here closer to the day — and our family will gladly guide
                you in.
              </p>
            )}
          </Card>

          {/* The map */}
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "140ms" }}
            className="lg:col-span-3"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-copper/20 
                shadow-2xl shadow-espresso-deep/60"
            >
              <iframe
                title={
                  hasPreciseLocation
                    ? `Map showing ${venue.fullAddress}`
                    : `Map showing ${venue.town}, ${venue.county}`
                }
                src={mapsEmbedUrl()}
                loading="lazy"
                className="block h-[330px] w-full border-0 sm:h-[420px] lg:h-[520px]"
              />

              {/* A light warm wash, so the map sits in the palette without
                  becoming hard to read. */}
              <div
                className="pointer-events-none absolute inset-0 bg-copper/7"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 
                  bg-linear-to-t from-espresso via-espresso/75 to-transparent"
                aria-hidden="true"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="kicker text-[0.52rem] text-gold/85">
                  {hasPreciseLocation ? "Destination" : "The area"}
                </p>
                <p className="mt-1 font-display text-xl text-cream sm:text-2xl">
                  {hasPreciseLocation
                    ? `${venue.name}, ${venue.town}`
                    : `${venue.town}, ${venue.county}`}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1.5 text-[0.78rem] text-linen/62 lg:items-start">
              <p>
                {hasPreciseLocation
                  ? "Use the buttons above to open the venue in Google Maps."
                  : "The map shows Wundanyi. Use the buttons to open Google Maps, or call us and we will guide you in."}
              </p>
              <p>
                Map data ©{" "}
                <a
                  href={osmViewUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-copper/40 underline-offset-2 transition-colors hover:text-gold"
                >
                  OpenStreetMap
                </a>{" "}
                contributors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
