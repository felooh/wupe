import { couple, ceremony, venue } from "../config/event";
import { Flourish } from "./ui/Flourish";
import { HeartIcon } from "./ui/Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-copper/15 bg-espresso-deep px-5 py-14 sm:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="font-script text-4xl text-gold sm:text-[2.8rem]">
          {couple.displayOrder[0]} <span className="text-copper">&amp;</span>{" "}
          {couple.displayOrder[1]}
        </p>

        <p className="kicker mt-4 text-[0.56rem] text-linen/65">{ceremony.title}</p>

        <div className="mt-7">
          <Flourish width={170} />
        </div>

        <address className="mt-7 text-[0.92rem] leading-relaxed text-linen/60 not-italic">
          {venue.name}, {venue.town}
          <br />
          {venue.county}, {venue.country}
        </address>

        <p className="mt-3 kicker text-[0.5rem] text-gold/78">{ceremony.dateShort}</p>

        <p className="mt-10 flex items-center gap-2 text-[0.78rem] text-linen/60">
          Made with
          <HeartIcon size={13} className="text-copper" />
          love
        </p>
      </div>
    </footer>
  );
}
