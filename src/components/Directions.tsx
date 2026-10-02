import { useId, useRef, useState } from "react";
import { gettingThere } from "../config/event";
import { Section, SectionHeading } from "./ui/Primitives";
import {
  ByCarPanel,
  BySgrPanel,
  ByPublicTransportPanel,
  FromWundanyiPanel,
} from "./TransportOptions";
import { CarIcon, TrainIcon, BusIcon, PinIcon } from "./ui/Icons";

const tabs = [
  { key: "car", label: gettingThere.byCar.label, short: "Car", Icon: CarIcon, Panel: ByCarPanel },
  { key: "sgr", label: gettingThere.bySgr.label, short: "SGR", Icon: TrainIcon, Panel: BySgrPanel },
  {
    key: "public",
    label: gettingThere.byPublicTransport.label,
    short: "Public",
    Icon: BusIcon,
    Panel: ByPublicTransportPanel,
  },
  {
    key: "wundanyi",
    label: gettingThere.fromWundanyi.label,
    short: "In Wundanyi",
    Icon: PinIcon,
    Panel: FromWundanyiPanel,
  },
] as const;

export function Directions() {
  const [activeKey, setActiveKey] = useState<(typeof tabs)[number]["key"]>("car");
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = tabs.findIndex((t) => t.key === activeKey);
  const ActivePanel = tabs[activeIndex].Panel;

  /* Arrow-key navigation, as expected of a tablist. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    const delta = moves[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (activeIndex + delta + tabs.length) % tabs.length;
    setActiveKey(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="directions" tone="raised">
      <div className="mx-auto max-w-4xl">
        <SectionHeading kicker="Getting There" title="How To Reach Us" />

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="mx-auto mt-8 max-w-xl text-center text-[0.95rem] leading-relaxed text-linen/65"
        >
          However you are travelling, here is the way to Taita Rocks Hotel. Choose the option that suits
          your journey.
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Ways to travel to the ceremony"
          onKeyDown={onKeyDown}
          data-reveal
          style={{ ["--reveal-delay" as string]: "200ms" }}
          className="mt-12 flex gap-2 overflow-x-auto rounded-full border border-linen/10 
            bg-espresso-deep/50 p-1.5 sm:mx-auto sm:w-fit sm:overflow-visible"
        >
          {tabs.map(({ key, label, short, Icon }, i) => {
            const selected = key === activeKey;
            return (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${key}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveKey(key)}
                className={`flex flex-1 shrink-0 items-center justify-center gap-2.5 rounded-full 
                  px-4 py-3 font-label text-[0.66rem] uppercase tracking-[0.14em] whitespace-nowrap 
                  transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:flex-none sm:px-7 ${
                    selected
                      ? "bg-linear-to-b from-copper-light to-copper-deep text-cream shadow-lg shadow-espresso-deep/60"
                      : "text-linen/60 hover:bg-linen/6 hover:text-cream"
                  }`}
              >
                <Icon size={16} />
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeKey}`}
          aria-labelledby={`${baseId}-tab-${activeKey}`}
          tabIndex={0}
          data-reveal
          style={{ ["--reveal-delay" as string]: "260ms" }}
          className="mt-8 rounded-2xl border border-copper/18 bg-linear-to-b from-bark/55 
            to-espresso-soft/25 p-6 shadow-xl shadow-espresso-deep/40 sm:p-9"
        >
          {/* Keyed so each panel fades in on its own as tabs change. */}
          <div key={activeKey} className="animate-fade" style={{ animationDuration: "0.6s" }}>
            <ActivePanel />
          </div>
        </div>
      </div>
    </Section>
  );
}
