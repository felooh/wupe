import { gettingThere, mapsDirectionsUrl, contacts, telUrl, whatsappUrl } from "../config/event";
import { Button, Editable, Detail } from "./ui/Primitives";
import {
  CarIcon,
  BusIcon,
  MotorbikeIcon,
  TaxiIcon,
  PinIcon,
  RouteIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

/* -------------------------------------------------------------------------
 *  RouteLine — the journey drawn as a chain of stops, wrapping on a phone.
 * ----------------------------------------------------------------------- */
export function RouteLine({ stops }: { stops: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-3">
      {stops.map((stop, i) => {
        const isLast = i === stops.length - 1;
        return (
          <li key={stop} className="flex items-center gap-1">
            <span
              className={`rounded-full border px-3.5 py-1.5 font-label text-[0.68rem] uppercase 
                tracking-[0.12em] transition-colors duration-500 ${
                  isLast
                    ? "border-copper bg-copper/18 text-cream"
                    : "border-linen/18 bg-espresso-deep/40 text-linen/75"
                }`}
            >
              {stop}
            </span>
            {!isLast && (
              <span className="px-0.5 text-copper-light/85" aria-hidden="true">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** A labelled figure that falls back to "To be confirmed" when unset. */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-linen/10 bg-espresso-deep/40 px-4 py-3.5">
      <p className="kicker text-[0.5rem] text-gold/78">{label}</p>
      <p className="mt-1.5 text-[0.92rem] text-cream">
        <Detail value={value} />
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  A. Private car
 * ----------------------------------------------------------------------- */
export function ByCarPanel() {
  const { route, intro, notes, distance, duration } = gettingThere.byCar;

  return (
    <div className="space-y-7">
      <p className="text-[0.98rem] leading-[1.85] text-linen/80">{intro}</p>

      <div>
        <p className="kicker mb-4 flex items-center gap-2 text-[0.52rem] text-gold/70">
          <RouteIcon size={15} className="text-copper" />
          The route
        </p>
        <RouteLine stops={route} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Stat label="Approximate distance" value={distance} />
        <Stat label="Approximate driving time" value={duration} />
      </div>

      <ul className="space-y-3">
        {notes.map((note, i) => (
          <li key={i} className="flex gap-3 text-[0.92rem] leading-relaxed text-linen/70">
            <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-copper" aria-hidden="true" />
            <Editable text={note} />
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href={mapsDirectionsUrl()} variant="primary">
          <CarIcon size={15} />
          Start Navigation
        </Button>
      </div>

      <p className="text-[0.82rem] text-linen/62">
        We recommend following Google Maps for the final stretch, and calling us if anything
        looks unfamiliar.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  B. Public transport and SGR — the same staged layout, different config.
 * ----------------------------------------------------------------------- */
type StagedJourney = {
  route: string[];
  intro: string;
  steps: Array<{ title: string; detail: string }>;
  fare: string;
  duration: string;
};

export const BySgrPanel = () => <StagedJourneyPanel {...gettingThere.bySgr} />;

export const ByPublicTransportPanel = () => (
  <StagedJourneyPanel {...gettingThere.byPublicTransport} />
);

function StagedJourneyPanel({ route, intro, steps, fare, duration }: StagedJourney) {

  return (
    <div className="space-y-7">
      <p className="text-[0.98rem] leading-[1.85] text-linen/80">{intro}</p>

      <div>
        <p className="kicker mb-4 flex items-center gap-2 text-[0.52rem] text-gold/70">
          <RouteIcon size={15} className="text-copper" />
          The stages
        </p>
        <RouteLine stops={route} />
      </div>

      <ol className="space-y-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full 
                border border-copper/30 bg-copper/10 font-label text-[0.72rem] text-gold"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <h4 className="font-display text-lg text-cream">{step.title}</h4>
              <div className="mt-1.5 text-[0.92rem] leading-relaxed text-linen/70">
                <Editable text={step.detail} />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-3 sm:grid-cols-2">
        <Stat label="Approximate fare" value={fare} />
        <Stat label="Approximate journey time" value={duration} />
      </div>

      <p className="text-[0.82rem] leading-relaxed text-linen/62">
        Fares and departure times change often, so please confirm with the operator on the day.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  C. Already in Wundanyi
 * ----------------------------------------------------------------------- */
const localIcons = [TaxiIcon, MotorbikeIcon, BusIcon];

export function FromWundanyiPanel() {
  const { intro, options, pickupPoint, contactIndex } = gettingThere.fromWundanyi;
  const contact = contacts[contactIndex];
  const hasContact = Boolean(contact?.phone || contact?.whatsapp);

  return (
    <div className="space-y-7">
      <p className="text-[0.98rem] leading-[1.85] text-linen/80">{intro}</p>

      <ul className="grid gap-4 sm:grid-cols-3">
        {options.map((option, i) => {
          const Icon = localIcons[i % localIcons.length];
          return (
            <li
              key={option.title}
              className="group rounded-xl border border-linen/10 bg-espresso-deep/40 p-5 
                transition-colors duration-500 hover:border-copper/35"
            >
              <span
                className="inline-flex rounded-full border border-copper/25 bg-copper/10 p-2.5 
                  text-copper transition-colors duration-500 group-hover:text-copper-light"
                aria-hidden="true"
              >
                <Icon size={19} />
              </span>
              <h4 className="mt-4 font-display text-lg text-cream">{option.title}</h4>
              <div className="mt-2 text-[0.88rem] leading-relaxed text-linen/70">
                <Editable text={option.detail} />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl border border-copper/25 bg-copper/7 p-5 sm:p-6">
        <p className="kicker flex items-center gap-2 text-[0.52rem] text-gold/75">
          <PinIcon size={14} className="text-copper" />
          Pickup point
        </p>
        <p className="mt-2.5 text-[0.95rem] text-cream">
          <Detail value={pickupPoint} fallback="Pickup point to be confirmed" />
        </p>

        {hasContact && (
          <>
            <p className="mt-5 text-[0.88rem] text-linen/70">
              {contact.name
                ? `${contact.name} will be receiving guests arriving at Wundanyi.`
                : "Someone will be receiving guests arriving at Wundanyi."}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              {contact.phone && (
                <Button href={telUrl(contact.phone)} variant="primary">
                  <PhoneIcon size={15} />
                  Call
                </Button>
              )}
              {contact.whatsapp && (
                <Button href={whatsappUrl(contact.whatsapp)} variant="outline">
                  <WhatsAppIcon size={15} />
                  WhatsApp
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
