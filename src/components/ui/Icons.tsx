/**
 * A small, consistent icon set drawn on a 24×24 grid with a 1.5 stroke, to
 * match the fine linework of the poster. No icon library needed.
 */
type IconProps = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
});

export const PinIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const CalendarIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.5h17M8.5 2.8v4.2M15.5 2.8v4.2" />
    <circle cx="8.6" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.4" cy="14" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const ClockIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 2" />
  </svg>
);

export const RingsIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="9.2" cy="15" r="4.9" />
    <circle cx="15.4" cy="15" r="4.9" />
    {/* A small gem above the left band. */}
    <path d="M9.2 4.4 11.3 6.9 9.2 9.4 7.1 6.9Z" />
    <path d="M9.2 4.4 9.2 9.4M7.1 6.9h4.2" strokeWidth="0.9" opacity="0.7" />
  </svg>
);

export const ShirtIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M9 3.5 5 5.6 3.5 10l2.6 1.1V20a1 1 0 0 0 1 1h9.8a1 1 0 0 0 1-1v-8.9l2.6-1.1L19 5.6l-4-2.1" />
    <path d="M9 3.5a3 3 0 0 0 6 0" />
  </svg>
);

export const GlobeIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M3.4 12h17.2M12 3.4c2.3 2.4 3.4 5.4 3.4 8.6s-1.1 6.2-3.4 8.6c-2.3-2.4-3.4-5.4-3.4-8.6S9.7 5.8 12 3.4Z" />
  </svg>
);

export const CarIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4.2 15.5v3a1 1 0 0 0 1 1h1.6a1 1 0 0 0 1-1v-1.2m8.4 0V18.5a1 1 0 0 0 1 1h1.6a1 1 0 0 0 1-1v-3" />
    <path d="M3.6 15.5h16.8v-3.1a2 2 0 0 0-.4-1.2L18.2 8.6 17 5.3a1.6 1.6 0 0 0-1.5-1.1h-7A1.6 1.6 0 0 0 7 5.3L5.8 8.6l-1.8 2.6a2 2 0 0 0-.4 1.2v3.1Z" />
    <path d="M5.8 8.6h12.4" />
    <circle cx="7.4" cy="12.7" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="16.6" cy="12.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const BusIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="3.4" width="16" height="14.4" rx="2.4" />
    <path d="M4 12h16M8.4 3.4v3M15.6 3.4v3" />
    <path d="M7.2 17.8v1.8M16.8 17.8v1.8" />
    <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
    <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const TrainIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="5" y="3" width="14" height="14" rx="3.2" />
    <path d="M5 10.4h14M12 3v7.4" />
    <path d="M8.4 17l-2.2 3.6M15.6 17l2.2 3.6M7.4 19.2h9.2" />
    <circle cx="8.6" cy="13.8" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.4" cy="13.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const RouteIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="6.2" cy="5.6" r="2.4" />
    <circle cx="17.8" cy="18.4" r="2.4" />
    <path d="M8.6 5.6h5.2a3.4 3.4 0 0 1 0 6.8h-3.6a3.4 3.4 0 0 0 0 6.8h5.2" />
  </svg>
);

export const PhoneIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6.3 3.6h2.9l1.5 3.7-1.9 1.2a11.4 11.4 0 0 0 5 5l1.2-1.9 3.7 1.5v2.9a2 2 0 0 1-2.2 2A16.4 16.4 0 0 1 4.3 5.8a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export const WhatsAppIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.87 9.87 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.25 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06s.89 2.39 1.01 2.56c.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);

export const CopyIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M6 15H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1" />
  </svg>
);

export const CheckIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </svg>
);

export const ArrowRightIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const MotorbikeIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="5.2" cy="16.4" r="3.2" />
    <circle cx="18.8" cy="16.4" r="3.2" />
    <path d="M5.2 16.4h4.3l4-6.4h3.2M15.6 10l3.2 6.4" />
    <path d="M13.5 10 12 6.6h2.8" />
  </svg>
);

export const TaxiIcon = CarIcon;

export const HeartIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 20.2s-7.6-4.6-7.6-9.6a4.3 4.3 0 0 1 7.6-2.8 4.3 4.3 0 0 1 7.6 2.8c0 5-7.6 9.6-7.6 9.6Z" />
  </svg>
);

export const UsersIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="9" cy="8.2" r="3.2" />
    <path d="M3.4 19.4a5.8 5.8 0 0 1 11.2 0" />
    <path d="M16.2 5.4a3.2 3.2 0 0 1 0 5.9M17.4 14.2a5.8 5.8 0 0 1 3.2 5.2" />
  </svg>
);

export const CameraIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="6.6" width="18" height="13" rx="2.5" />
    <circle cx="12" cy="13.1" r="3.6" />
    <path d="M8.6 6.6 9.8 4.4h4.4l1.2 2.2" />
  </svg>
);

export const MenuIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className, size = 24 }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
