/* ============================================================================
 *  EVENT CONFIGURATION  —  EDIT THIS FILE ONLY
 * ============================================================================
 *  Everything guests see is driven from this one file. You should never need
 *  to open a component to change a name, a date, a phone number or a route.
 *
 *  Anything left as an empty string ("") is treated as "not confirmed yet" and
 *  renders on the page as a tasteful "To be confirmed" chip instead of a lie.
 *  Fill it in and the chip disappears automatically.
 *
 *  Every placeholder is marked with  ### TODO  so you can find them with a
 *  search for "TODO" in your editor. See PLACEHOLDERS.md for the full list.
 * ========================================================================== */

export type Placeholder = string; // "" means: not confirmed yet

/* -- The couple ----------------------------------------------------------- */
export const couple = {
  /** Short pairing used in headings and the browser tab. */
  shortNames: "Norah & Felix",
  /** Full names, as they appear on the poster. */
  brideFullName: "Norah Wachia",
  groomFullName: "Felix Mwendia",
  /** The order the first names appear in, everywhere they are shown together. */
  displayOrder: ["Norah", "Felix"] as const,
};

/* -- The ceremony --------------------------------------------------------- */
export const ceremony = {
  kicker: "You are warmly invited to our",
  title: "WUPE Ceremony",
  subtitle: "Traditional Wedding",

  /**
   * From the programme: guests arrive from 8:00 AM for welcome and breakfast.
   * Keep the +03:00 (East Africa Time). Format: YYYY-MM-DDTHH:MM:SS+03:00
   */
  startsAtISO: "2026-10-10T08:00:00+03:00",

  /** Shown to guests. Taken from the poster. */
  dateLabel: "Saturday, 10th October 2026",
  dateShort: "10 . 10 . 2026",

  /** From the programme: arrival, welcome and breakfast from 8:00 AM. */
  timeLabel: "From 8:00 AM" as Placeholder,

  /** From the poster. */
  dressCode: "Shades of Brown & Black",
};

/* -- The venue ------------------------------------------------------------ */
export const venue = {
  name: "Taita Rocks Hotel",
  town: "Wundanyi",
  county: "Taita-Taveta County",
  country: "Kenya",
  /** One-line address used for copy-to-clipboard and map searches. */
  fullAddress: "Taita Rocks Hotel, Wundanyi, Taita-Taveta County, Kenya",

  /**
   * EXACT LOCATION — fill in ONE of the three below (top one wins).
   * Instructions are in README.md → "Adding the exact Google Maps location".
   *
   * `coordinates` is set from Taita Rocks Hotel's entry in OpenStreetMap
   * (way 486429878), which places it on the Mwatate–Wundanyi road. If you
   * later paste a Google Maps share link into `mapsUrl`, that takes over.
   */

  /** 1. Best: paste the share link of the pinned spot, e.g. "https://maps.app.goo.gl/XXXXXXXX" */
  mapsUrl: "" as Placeholder,

  /** 2. Or the Plus Code, e.g. "6CRP+2X Wundanyi, Kenya" */
  plusCode: "" as Placeholder,

  /** 3. Or the coordinates. From OpenStreetMap, not guessed. */
  coordinates: { lat: -3.4099728, lng: 38.3636609 } as { lat: number; lng: number } | null,

  /**
   * ### TODO (optional) — a landmark guests can ask for by name once they are
   * close, e.g. "next to the county offices".
   */
  landmark: "" as Placeholder,
};

/* -- Contacts for transport help ------------------------------------------
 * ### TODO — NO NUMBERS HAVE BEEN INVENTED. Add them in full international
 * format (+254...). Any entry left with an empty phone is hidden from the page
 * automatically, so you can start with one contact and add more later.
 * ------------------------------------------------------------------------- */
export const contacts: Array<{
  name: string;
  role: string;
  phone: Placeholder;
  whatsapp: Placeholder;
}> = [
  {
    name: "Felix Mwendia",
    role: "Transport & directions",
    phone: "+254741777695",
    whatsapp: "+254741777695",
  },
  {
    name: "", // ### TODO second contact, or delete this whole block
    role: "Guest reception at Wundanyi",
    phone: "",
    whatsapp: "",
  },
];

/** Pre-filled text for the WhatsApp button. */
export const whatsappMessage =
  "Hello! I am coming for Norah & Felix's WUPE Ceremony and I would like some help with directions.";

/* -- Getting there ---------------------------------------------------------
 * The road corridor below is the documented one: the Nairobi–Mombasa highway
 * to Voi, west on the Voi–Taveta road to Mwatate, then north up the C104
 * Mwatate–Wundanyi road (about 17–18 km of tarmac) into the Taita Hills.
 *
 * Taita Rocks Hotel sits on that same Mwatate–Wundanyi road, at the Wundanyi
 * end. Every time, distance and fare is left for you to fill in — nothing has
 * been invented.
 * ------------------------------------------------------------------------- */
export const gettingThere = {
  byCar: {
    label: "By Private Car",
    /** Route legs. Edit, reorder or add freely. */
    route: ["Nairobi", "Voi", "Mwatate", "Wundanyi", "Taita Rocks Hotel"],
    intro:
      "The drive follows the Nairobi\u2013Mombasa highway as far as Voi, then turns west onto the Voi\u2013Taveta road to Mwatate. From Mwatate, the C104 climbs north into the Taita Hills to Wundanyi.",
    notes: [
      "The Mwatate\u2013Wundanyi climb is steep and winding, with sharp bends. Please allow extra time and drive gently, especially after rain or in the dark.",
      "Parking is available at Taita Rocks Hotel.",
      "Taita Rocks Hotel is on the Mwatate\u2013Wundanyi road itself, at the Wundanyi end of the climb.",
    ],
    /** ### TODO Confirm and fill in. "" shows a "To be confirmed" chip. */
    distance: "Approx. 366 km from Nairobi" as Placeholder,
    duration: "Approx. 6 hrs 17 min" as Placeholder,
  },

  bySgr: {
    label: "By SGR",
    route: ["Nairobi Terminus", "Voi", "Mwatate", "Wundanyi", "Taita Rocks Hotel"],
    intro:
      "The Madaraka Express (SGR) stops at Voi on the Nairobi\u2013Mombasa line. From Voi, the onward road journey is the same as by car: west to Mwatate, then up the C104 into the Taita Hills to Wundanyi.",
    /** ### TODO Confirm each step, and the timetable, closer to the day. */
    steps: [
      {
        title: "Book the train",
        detail:
          "Book on the Kenya Railways site, metickets.krc.co.ke, and choose a train that stops at Voi. The Inter-County train and the afternoon Express both do. Seats sell out around weekends, so book early.",
      },
      {
        title: "Alight at Voi",
        detail:
          "We recommend the 8:00 AM train from Nairobi Terminus on Friday, 9th October, the day before the ceremony. You'll reach Voi in daylight with time to settle in before Saturday.",
      },
      {
        title: "Voi station to Wundanyi",
        detail:
          "From Voi, take public transport (a matatu, about KSh 400) to Wundanyi. The road runs west to Mwatate, then up into the Taita Hills. If you need help finding the right vehicle, call or WhatsApp Felix.",
      },
      {
        title: "Wundanyi to Taita Rocks Hotel",
        detail: "### TODO Describe the final leg \u2014 see the From Wundanyi Town tab.",
      },
    ],
    fare: "KSh 1,050 train to Voi + approx. KSh 400 matatu to Wundanyi" as Placeholder,
    duration: "" as Placeholder, // ### TODO door to door, including the road from Voi
  },

  byPublicTransport: {
    label: "By Public Transport",
    route: ["Nairobi", "Voi / Mwatate", "Wundanyi", "Taita Rocks Hotel"],
    intro:
      "Buses and shuttles on the Nairobi\u2013Mombasa route serve Voi, and there is onward local transport west to Mwatate and up into the Taita Hills to Wundanyi.",
    /** ### TODO Confirm each step with someone travelling the route. */
    steps: [
      {
        title: "Long-distance bus or shuttle",
        detail:
          "### TODO Name the operators you recommend and where they pick up in Nairobi.",
      },
      {
        title: "Where to alight",
        detail:
          "### TODO Confirm whether guests should alight at Voi, Mwatate or ride through to Wundanyi.",
      },
      {
        title: "Onward to Wundanyi",
        detail:
          "### TODO Describe the local matatu stage and how often vehicles leave.",
      },
      {
        title: "Wundanyi to Taita Rocks Hotel",
        detail: "### TODO Describe the final leg — see the next tab.",
      },
    ],
    fare: "" as Placeholder, // ### TODO e.g. "Approx. KSh 0,000 from Nairobi"
    duration: "" as Placeholder, // ### TODO
  },

  fromWundanyi: {
    label: "From Wundanyi Town",
    intro:
      "Already in Wundanyi? You are almost here. Taita Rocks Hotel is just along the Mwatate\u2013Wundanyi road.",
    options: [
      {
        title: "Local taxi",
        detail: "### TODO Where to find one, and the approximate fare.",
      },
      {
        title: "Bodaboda",
        detail: "### TODO The usual stage, and the approximate fare.",
      },
      {
        title: "Matatu",
        detail: "### TODO The route name and where it drops you.",
      },
    ],
    /** ### TODO Where guests being collected should wait. */
    pickupPoint: "" as Placeholder,
    /** Which contact (index in `contacts`) handles Wundanyi arrivals. */
    contactIndex: 0,
  },
};

/* -- Gallery ---------------------------------------------------------------
 * Drop your photographs into  public/gallery/  and point `src` at them, e.g.
 * src: "/gallery/felix-and-norah-01.jpg". Any entry with src: "" renders as an
 * elegant empty frame, so the section looks finished even before the photos
 * arrive. Add or remove entries freely.
 * ------------------------------------------------------------------------- */
export const gallery: Array<{ src: Placeholder; alt: string; caption: string }> = [
  { src: "", alt: "Norah and Felix", caption: "Our story" },       // ### TODO
  { src: "", alt: "Norah and Felix", caption: "Together" },        // ### TODO
  { src: "", alt: "Norah and Felix", caption: "The proposal" },    // ### TODO
  { src: "", alt: "Our families", caption: "Family" },             // ### TODO
  { src: "", alt: "Norah and Felix", caption: "Celebration" },     // ### TODO
  { src: "", alt: "The Taita Hills", caption: "Home" },            // ### TODO
];

/* -- RSVP ------------------------------------------------------------------
 * Leave `endpoint` empty to run in DEMO MODE: the form validates, shows the
 * thank-you message and logs the response to the browser console, but stores
 * nothing. Add an endpoint to go live — see README.md → "Connecting the RSVP
 * form to a backend" for Firebase, Supabase, Google Sheets and Formspree.
 * ------------------------------------------------------------------------- */
export const rsvp = {
  /** Formspree form. Responses go to the linked email and the Formspree dashboard. */
  endpoint: "https://formspree.io/f/xaenplnk" as Placeholder,
  /** No RSVP deadline. "" hides the line. */
  deadlineLabel: "" as Placeholder,
  maxGuests: 10,
};

/* -- Written content ------------------------------------------------------ */
export const content = {
  heroInvite:
    "With joy and gratitude, we invite you to celebrate this special occasion with us.",

  invitation: {
    salutation: "Dear Family and Friends,",
    paragraphs: [
      "With grateful hearts, we invite you to join us as we celebrate a very special milestone in our journey together.",
      "We would be honoured to have you with us as our families come together for our WUPE Ceremony.",
      "Your presence, prayers, love and support mean so much to us, and we look forward to celebrating this beautiful day together.",
    ],
    signOff: "With love,",
  },

  aboutWupe: {
    heading: "About the WUPE Ceremony",
    body: "The WUPE ceremony marks a meaningful step in the journey of two families coming together. It is a time of family, tradition, blessing, celebration and fellowship.",
    pillars: [
      { title: "Family", text: "Two families meeting, greeting and becoming one." },
      { title: "Tradition", text: "A celebration held in the way of our people." },
      { title: "Blessing", text: "Elders and loved ones speaking well over the journey ahead." },
      { title: "Fellowship", text: "Sharing a meal, a song and a day together." },
    ],
  },

  familyAndFriends: {
    heading: "Celebrating With Those We Love",
    body: "A day like this is made by the people in the room. Thank you for the years of love, the prayers, the laughter and the quiet support that brought us here. We cannot wait to look around and see your faces.",
  },

  finalInvitation: {
    lines: [
      "We would love to celebrate this special day with you.",
      "Your presence will make our celebration even more meaningful.",
    ],
  },
};

/* -- Programme (hidden page) ----------------------------------------------
 * Shown only at /programme, which is not linked from the site and is marked
 * "noindex" for search engines. Anyone with the link can still open it.
 * Each item: a time, a title, an optional intro line, and optional bullets.
 * ------------------------------------------------------------------------- */
export const programme = {
  path: "/programme",
  tagline: "A celebration bringing together the two families",
  items: [
    {
      time: "8:00 \u2013 10:00 AM",
      title: "Arrival, Welcome & Breakfast",
      intro:
        "Groom and delegation arrive with Kidasi (proposed budget to be confirmed by the bride\u2019s side).",
      points: [
        "Welcome by the bride\u2019s family",
        "Breakfast served",
        "Opening prayer and Word of God",
      ],
    },
    {
      time: "10:00 \u2013 10:30 AM",
      title: "Introduction of Both Families",
      intro: "Introductions from both sides, led by the designated uncles.",
      points: ["Bride\u2019s side: Uncle Harry", "Groom\u2019s side: Alex Ndeleva"],
    },
    {
      time: "10:30 AM \u2013 12:30 PM",
      title: "Negotiation Session",
      intro: "Negotiations conducted by the chosen representatives from both families.",
      points: [
        "Other guests will participate in entertainment and fellowship during the session.",
      ],
    },
    {
      time: "12:30 \u2013 1:00 PM",
      title: "Blessings & Payment",
      intro:
        "Prayer and blessings, followed by payment of the amount agreed upon during the negotiations.",
      points: [],
    },
    // {
    //   time: "1:00 \u2013 1:30 PM",
    //   title: "Exchange of Gifts",
    //   intro: "Exchange of gifts between the two families.",
    //   points: ["Both sides to prepare gifts such as lesos, vikoi, nazi and deras."],
    // },
    {
      time: "1:00 \u2013 2:30 PM",
      title: "Lunch, Entertainment & Family Advice",
      intro: "",
      points: [
        "Groom\u2019s Arrival to the venue",
        "Bride\u2019s Arrival to the venue",
        "Taita and Kikuyu songs and entertainment",
        "Commencing Prayer \u2013 Dennis Lemaiyan",
        "Meals and Refreshments",
        "Introductions and Advice to the couple from both families",
        "Word for the ceremony \u2013 Rev. Menego Kipruto",
        "Cake cutting \u2013 Mummy Kitala",
        "Vote of thanks from the groom\u2019s uncle and the bride\u2019s uncle",
        "Closing prayer \u2013 Rev. Maria",
      ],
    },
  ],
};

/* -- Navigation ----------------------------------------------------------- */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#invitation" },
  { label: "Event", href: "#event" },
  { label: "Directions", href: "#location" },
  { label: "RSVP", href: "#rsvp" },
];

/* ============================================================================
 *  DERIVED VALUES — no need to edit below this line.
 * ========================================================================== */

/**
 * Wundanyi town centre, as published by OpenStreetMap.
 *
 * This is NOT the venue. It is used only to frame the map if
 * `venue.coordinates` is ever cleared.
 */
export const WUNDANYI_TOWN = { lat: -3.4047687, lng: 38.3673001 };

/** The best available Google Maps link, in order of precision. */
export function mapsDirectionsUrl(): string {
  if (venue.mapsUrl) return venue.mapsUrl;
  const q = venue.plusCode || venue.fullAddress;
  if (venue.coordinates) {
    const { lat, lng } = venue.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
}

/** A link that simply shows the place, rather than starting navigation. */
export function mapsPlaceUrl(): string {
  if (venue.mapsUrl) return venue.mapsUrl;
  const q = venue.plusCode || venue.fullAddress;
  if (venue.coordinates) {
    const { lat, lng } = venue.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/**
 * The embedded map.
 *
 * OpenStreetMap is the default because it needs no API key and renders
 * reliably. Google's keyless embed sometimes returns a blank frame, which is
 * why it is not used here — but every button on the page still opens Google
 * Maps, which is what most guests will want for navigation.
 *
 * To use the official Google Maps Embed API instead, see README.md →
 * "Adding the exact Google Maps location".
 */
export function mapsEmbedUrl(): string {
  const centre = venue.coordinates ?? WUNDANYI_TOWN;
  // A window roughly 6 km across, which comfortably shows the town and its approaches.
  const pad = 0.03;
  const bbox = [
    centre.lng - pad,
    centre.lat - pad * 0.72,
    centre.lng + pad,
    centre.lat + pad * 0.72,
  ].join(",");

  return (
    `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
    `&layer=mapnik&marker=${centre.lat},${centre.lng}`
  );
}

/** A link to the same view on openstreetmap.org, for the map's attribution. */
export function osmViewUrl(): string {
  const centre = venue.coordinates ?? WUNDANYI_TOWN;
  return `https://www.openstreetmap.org/?mlat=${centre.lat}&mlon=${centre.lng}#map=14/${centre.lat}/${centre.lng}`;
}

/** True once a precise location has been supplied. */
export const hasPreciseLocation =
  Boolean(venue.mapsUrl) || Boolean(venue.plusCode) || Boolean(venue.coordinates);

export const telUrl = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const whatsappUrl = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

export const activeContacts = contacts.filter((c) => c.phone || c.whatsapp);
