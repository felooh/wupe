/**
 * The ornamental rule that separates every block of text on the poster:
 * a hairline that tapers away from a small diamond cluster in the centre.
 */
export function Flourish({
  className = "",
  width = 220,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      viewBox="0 0 240 18"
      width={width}
      height={(width / 240) * 18}
      className={`text-copper ${className}`}
      role="presentation"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="flourish-l" x1="0" x2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="flourish-r" x1="0" x2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Tapering hairlines, with a second shorter pass for weight. */}
      <path d="M0 9h92" stroke="url(#flourish-l)" strokeWidth="1.1" />
      <path d="M148 9h92" stroke="url(#flourish-r)" strokeWidth="1.1" />
      <path d="M46 9h46" stroke="url(#flourish-l)" strokeWidth="0.7" opacity="0.5" />
      <path d="M148 9h46" stroke="url(#flourish-r)" strokeWidth="0.7" opacity="0.5" />

      {/* Centre cluster — a tall diamond flanked by two smaller ones. */}
      <path d="M120 1 124.6 9 120 17 115.4 9Z" fill="currentColor" />
      <path d="M104 4.8 107.6 9 104 13.2 100.4 9Z" fill="currentColor" opacity="0.85" />
      <path d="M136 4.8 139.6 9 136 13.2 132.4 9Z" fill="currentColor" opacity="0.85" />
      <circle cx="95" cy="9" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="145" cy="9" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
 *  Pampas — the dried plumes tucked into the poster's corners.
 *
 *  Drawn rather than photographed: a narrow fan of filaments whose lengths
 *  follow a soft envelope, so the silhouette tapers to a point the way a real
 *  plume does, with fine barbs along each filament.
 * ----------------------------------------------------------------------- */
const FILAMENTS = 46;
const SPREAD = 47; // degrees either side of the stem

/* A small deterministic jitter, so the plume looks natural but never flickers. */
const jitter = (i: number, scale: number) =>
  (Math.sin(i * 12.9898) * 43758.5453 % 1) * scale;

export function Pampas({
  className = "",
  rotate = 0,
  size = 180,
}: {
  className?: string;
  rotate?: number;
  size?: number;
}) {
  const filaments = Array.from({ length: FILAMENTS }, (_, i) => {
    const t = i / (FILAMENTS - 1);          // 0 → 1 across the fan
    const angle = -SPREAD + t * SPREAD * 2;
    const centred = 1 - Math.abs(t - 0.5) * 2; // 1 in the middle, 0 at the edges
    // Envelope: longest through the middle, tapering to the sides.
    const length = 32 + centred * 26 + jitter(i, 8);
    return { angle: angle + jitter(i, 2.2) - 1.1, length };
  });

  return (
    <svg
      viewBox="0 0 120 130"
      width={size}
      height={(size / 120) * 130}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      {/* Rotating inside the SVG rather than with a CSS transform: a CSS
          transform promotes the element to its own compositing layer, whose
          edges can band visibly against a near-black background. */}
      <g
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        transform={`rotate(${rotate} 60 104)`}
      >
        {/* Stem */}
        <path d="M60 128 Q 59 118 60 104" strokeWidth="1.4" opacity="0.9" />

        {filaments.map(({ angle, length }, i) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const x2 = 60 + Math.cos(rad) * length;
          const y2 = 104 + Math.sin(rad) * length;
          // Bow each filament slightly away from the stem.
          const cx = (60 + x2) / 2 + Math.cos(rad) * 4 + angle * 0.14;
          const cy = (104 + y2) / 2 - 3;

          return (
            <g key={i} opacity={0.35 + jitter(i + 7, 0.55)}>
              <path d={`M60 104 Q ${cx} ${cy} ${x2} ${y2}`} strokeWidth="0.75" />
              {/* Barbs give the plume its feathered edge. */}
              {[0.5, 0.66, 0.8, 0.92].map((p, j) => {
                const bx = 60 + (x2 - 60) * p;
                const by = 104 + (y2 - 104) * p;
                const reach = 2.6 + (1 - p) * 1.4;
                return (
                  <g key={j} strokeWidth="0.45" opacity="0.8">
                    <path d={`M${bx} ${by} l${-reach} ${-reach * 0.75}`} />
                    <path d={`M${bx} ${by} l${reach} ${-reach * 0.75}`} />
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
