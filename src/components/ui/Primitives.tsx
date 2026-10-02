import type { ReactNode } from "react";
import { Flourish } from "./Flourish";

/* -------------------------------------------------------------------------
 *  Button — one component, three weights, rendered as <a> or <button>.
 * ----------------------------------------------------------------------- */
type Variant = "primary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-b from-copper-light to-copper-deep text-cream shadow-lg shadow-espresso-deep/60 " +
    "hover:from-copper hover:to-copper-deep hover:shadow-xl hover:shadow-copper-deep/25",
  outline:
    "border border-copper/55 text-gold hover:border-copper hover:bg-copper/12 hover:text-cream",
  ghost: "text-linen/80 hover:text-cream hover:bg-linen/8",
};

const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 " +
  "font-label text-[0.72rem] uppercase tracking-[0.2em] leading-none " +
  "transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-45 " +
  "disabled:pointer-events-none";

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = `${buttonBase} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------
 *  Section — consistent rhythm and a shared heading treatment.
 * ----------------------------------------------------------------------- */
export function Section({
  id,
  children,
  className = "",
  tone = "base",
  ref,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "base" | "raised" | "deep";
  ref?: React.Ref<HTMLElement>;
}) {
  const tones = {
    base: "bg-espresso",
    raised: "bg-espresso-soft",
    deep: "bg-espresso-deep",
  };
  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:py-32 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  className = "",
}: {
  kicker?: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {kicker && (
        <p data-reveal className="kicker mb-5 text-[0.62rem] text-copper sm:text-[0.7rem]">
          {kicker}
        </p>
      )}
      <h2
        data-reveal
        style={{ ["--reveal-delay" as string]: "80ms" }}
        className="font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-[2.9rem]"
      >
        {title}
      </h2>
      <div data-reveal style={{ ["--reveal-delay" as string]: "160ms" }} className="mt-6">
        <Flourish width={200} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  Card — the poster's name plaque, translated into a surface.
 * ----------------------------------------------------------------------- */
export function Card({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-copper/18 bg-linear-to-b from-bark/70 to-espresso-soft/40 
        p-6 backdrop-blur-sm transition-colors duration-500 sm:p-8 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 *  TBC — the honest placeholder. Shown wherever a detail is not yet
 *  confirmed, instead of inventing one.
 * ----------------------------------------------------------------------- */
export function TBC({ label = "To be confirmed" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-copper/40 
      bg-copper/8 px-3 py-1 font-label text-[0.6rem] uppercase tracking-[0.16em] text-gold/75">
      <span className="inline-block h-1 w-1 rounded-full bg-copper animate-shimmer" />
      {label}
    </span>
  );
}

/**
 * Renders `value` when it is set, and a "To be confirmed" chip when it is not.
 * This is how every unconfirmed detail reaches the page.
 */
export function Detail({ value, fallback }: { value: string; fallback?: string }) {
  if (!value) return <TBC label={fallback} />;
  return <>{value}</>;
}

/* -------------------------------------------------------------------------
 *  Editable — content still awaiting your words.
 *
 *  Any string in event.ts that begins with "### TODO" is treated as a note to
 *  yourself rather than as copy for guests. It renders in a dashed amber frame
 *  so it is impossible to miss, and so nothing unverified is ever presented to
 *  a guest as fact. Replace the text and it becomes ordinary prose.
 * ----------------------------------------------------------------------- */
const TODO_PREFIX = "### TODO";

const isTodo = (text: string) => text.trimStart().startsWith(TODO_PREFIX);

export function Editable({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;

  if (!isTodo(text)) {
    return <span className={className}>{text}</span>;
  }

  const note = text.trimStart().slice(TODO_PREFIX.length).trim();
  return (
    <span
      className={`inline-block rounded-lg border border-dashed border-copper/45 bg-copper/8 
        px-3.5 py-2 text-[0.82rem] leading-relaxed text-gold/80 ${className}`}
    >
      <span className="kicker mr-2 text-[0.52rem] text-copper-light">To add</span>
      {note}
    </span>
  );
}
