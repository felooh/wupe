import { content } from "../config/event";
import { Section } from "./ui/Primitives";
import { Flourish, Pampas } from "./ui/Flourish";

export function FamilyFriends() {
  const { heading, body } = content.familyAndFriends;

  return (
    <Section tone="deep">
      <div className="pointer-events-none absolute inset-0 glow opacity-50" aria-hidden="true" />
      <Pampas
        className="pointer-events-none absolute -left-16 bottom-0 text-sand/8"
        rotate={-14}
        size={220}
      />
      <Pampas
        className="pointer-events-none absolute -right-16 top-4 text-sand/8"
        rotate={16}
        size={220}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <div data-reveal className="flex justify-center">
          <Flourish width={150} />
        </div>

        <h2
          data-reveal
          style={{ ["--reveal-delay" as string]: "90ms" }}
          className="mt-9 font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-[2.8rem]"
        >
          {heading}
        </h2>

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "180ms" }}
          className="mt-8 text-[1.02rem] leading-[1.9] text-linen/78 sm:text-[1.08rem]"
        >
          {body}
        </p>

        <div
          data-reveal
          style={{ ["--reveal-delay" as string]: "280ms" }}
          className="mt-10 flex justify-center"
        >
          <Flourish width={150} />
        </div>
      </div>
    </Section>
  );
}
