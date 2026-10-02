import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target moment has passed — the countdown then stops. */
  finished: boolean;
};

function timeUntil(target: number): TimeLeft {
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    finished: false,
  };
}

/**
 * Ticks once a second towards `targetISO`, and clears its own interval the
 * moment the date is reached, so nothing keeps running on the day itself.
 */
export function useCountdown(targetISO: string): TimeLeft {
  const target = new Date(targetISO).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => timeUntil(target));

  useEffect(() => {
    if (Number.isNaN(target)) return;

    const tick = () => {
      const next = timeUntil(target);
      setTimeLeft(next);
      if (next.finished) clearInterval(id);
    };

    const id = setInterval(tick, 1000);
    tick(); // sync immediately rather than waiting a second

    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}
