# Norah & Felix — WUPE Ceremony

A digital invitation for Norah Wachia & Felix Mwendia's WUPE Ceremony in
Taita Rocks Hotel, Wundanyi, Taita-Taveta County, Kenya — Saturday, 10th October 2026.

Built with **React 19 + TypeScript + Tailwind CSS 4 + Vite**. Every colour,
shape and typeface is drawn from the printed invitation poster, so the website
and the card read as one piece.

---

## Contents

1. [Quick start](#quick-start)
2. [File and folder structure](#file-and-folder-structure)
3. [Editing the invitation](#editing-the-invitation)
4. [Adding the exact Google Maps location](#adding-the-exact-google-maps-location)
5. [Connecting the RSVP form to a backend](#connecting-the-rsvp-form-to-a-backend)
6. [Adding your photographs](#adding-your-photographs)
7. [Deploying to Vercel](#deploying-to-vercel)
8. [Design notes](#design-notes)
9. [What has and has not been verified](#what-has-and-has-not-been-verified)

---

## Quick start

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
cd wupe-ceremony
npm install
npm run dev
```

Open the address it prints (usually <http://localhost:5173>).
The page reloads as you edit.

Other commands:

```bash
npm run build     # type-check and build into dist/
npm run preview   # serve the built site locally
npm run lint      # check the code
```

---

## File and folder structure

```
wupe-ceremony/
├── index.html                  Page shell, fonts, WhatsApp link preview
├── vercel.json                 Deployment config
├── PLACEHOLDERS.md             Every value you still need to fill in
├── public/
│   ├── favicon.svg             The F&N monogram
│   └── gallery/                ← put your photographs here
└── src/
    ├── main.tsx
    ├── App.tsx                 Section order
    ├── index.css               Design tokens: colours, fonts, arch, textures
    ├── config/
    │   └── event.ts            ★ EVERYTHING YOU EDIT LIVES HERE
    ├── lib/
    │   └── rsvp.ts             RSVP submission — swap the backend here
    ├── hooks/
    │   ├── useReveal.ts        Scroll-reveal animations
    │   └── useCountdown.ts     Countdown, stops on the day
    └── components/
        ├── Navbar.tsx              Sticky nav, hamburger on mobile
        ├── Hero.tsx                Full-screen arch, Directions + RSVP
        ├── Invitation.tsx          "Dear Family and Friends…"
        ├── Countdown.tsx           Days / Hours / Minutes / Seconds
        ├── EventDetails.tsx        The details card
        ├── AboutWupe.tsx           About the ceremony
        ├── Location.tsx            Map, Get Directions, Copy Location
        ├── Directions.tsx          "How To Reach Us" tabs
        ├── TransportOptions.tsx      ├─ Car / SGR / Public transport / In Wundanyi
        ├── TransportHelp.tsx       "Need Help Getting There?" — Call, WhatsApp
        ├── Gallery.tsx             Photographs
        ├── FamilyFriends.tsx       "Celebrating With Those We Love"
        ├── RSVP.tsx                The form
        ├── FinalInvitation.tsx     Closing arch
        ├── Footer.tsx
        ├── MobileDirectionsFab.tsx Floating Directions button on phones
        └── ui/
            ├── Primitives.tsx      Button, Section, Card, TBC, Editable
            ├── Flourish.tsx        The divider and the pampas plumes
            └── Icons.tsx           All icons, drawn inline
```

---

## Editing the invitation

**You should only ever need to open `src/config/event.ts`.** Names, date, time,
venue, phone numbers, map links, transport information, photographs, RSVP
settings and all the written copy live there. Nothing is hard-coded in the
components.

Two special values make it safe to publish before everything is confirmed:

- `""` (empty) renders a **"To be confirmed"** chip.
- A string beginning with `### TODO` renders a **"To add"** note.

So the site never shows an invented time, fare or phone number — it shows
honestly that the detail is still coming.

👉 **See [PLACEHOLDERS.md](./PLACEHOLDERS.md) for the complete checklist.**

---

## Adding the exact Google Maps location

The venue is **Taita Rocks Hotel**, which is mapped in OpenStreetMap on the
Mwatate–Wundanyi road. Its coordinates from there (`-3.4099728, 38.3636609`)
are already set in `venue.coordinates`, so the embedded map is pinned on the
hotel and the buttons navigate straight to it. You can still paste a Google
Maps share link (Option 1) if you want the buttons to open Google's own
listing instead.

To pin the venue exactly, fill in **one** of these three in
`src/config/event.ts` → `venue`. The first one that is set wins.

### Option 1 — a share link (easiest, recommended)

1. Open **Google Maps** on your phone, standing at the venue if you can.
2. Long-press the exact spot to drop a pin.
3. Tap **Share → Copy link**. You get something like
   `https://maps.app.goo.gl/AbCdEf123`.
4. Paste it in:

```ts
mapsUrl: "https://maps.app.goo.gl/AbCdEf123",
```

### Option 2 — a Plus Code

At the venue, tap the dropped pin in Google Maps and copy the Plus Code
(e.g. `6CRP+2X Wundanyi, Kenya`):

```ts
plusCode: "6CRP+2X Wundanyi, Kenya",
```

This also appears on the page as text, which guests can type into any map app.

### Option 3 — coordinates

Tap and hold the spot in Google Maps; the latitude and longitude appear at the
top of the screen.

```ts
coordinates: { lat: -3.4056, lng: 38.3701 },   // ← your real numbers
```

Setting `coordinates` also recentres and pins the **embedded map** on the venue.

### Which map is embedded, and why

The page embeds **OpenStreetMap**, because it needs no API key and renders
reliably. Google's keyless embed sometimes returns a blank frame, which would
be unacceptable on the most important section of the page. Every *button* still
opens **Google Maps**, which is what most guests will use to navigate.

If you would rather embed Google Maps, you need a Maps Embed API key:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/), create
   a project, and enable **Maps Embed API**.
2. Create an API key and restrict it to your deployed domain.
3. Add it to a `.env` file in the project root (never commit this file):

   ```
   VITE_GOOGLE_MAPS_KEY=your_key_here
   ```

4. Replace the body of `mapsEmbedUrl()` in `src/config/event.ts` with:

   ```ts
   export function mapsEmbedUrl(): string {
     const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;
     const q = venue.coordinates
       ? `${venue.coordinates.lat},${venue.coordinates.lng}`
       : venue.plusCode || venue.fullAddress;
     return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(q)}&zoom=14`;
   }
   ```

5. On Vercel, add `VITE_GOOGLE_MAPS_KEY` under **Settings → Environment
   Variables**, then redeploy.

If you switch to Google, you can also drop the OpenStreetMap attribution line
at the bottom of `src/components/Location.tsx`.

---

## Connecting the RSVP form to a backend

Right now the form runs in **demo mode**: it validates, shows the thank-you
message, and logs the response to the browser console — but stores nothing. A
small note on the thank-you screen says so, and it disappears automatically
once you connect a backend.

All submission logic is in **one function**: `submitRsvp()` in
`src/lib/rsvp.ts`. The shape it sends is:

```ts
{
  fullName: string;
  phone: string;
  guests: number;          // 0 if not attending
  attending: "yes" | "no";
  transportHelp: "yes" | "no";
  message: string;
  submittedAt: string;     // ISO timestamp
}
```

### Easiest — Formspree or Google Sheets (no code changes)

Both accept a plain JSON POST, so you only set the endpoint:

**Formspree** — sign up at [formspree.io](https://formspree.io), create a form,
copy the endpoint, then in `src/config/event.ts`:

```ts
export const rsvp = {
  endpoint: "https://formspree.io/f/xxxxxxxx",
  // …
};
```

**Google Sheets** — in your sheet choose **Extensions → Apps Script**, paste:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.submittedAt, d.fullName, d.phone, d.guests,
                   d.attending, d.transportHelp, d.message]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Then **Deploy → New deployment → Web app**, set *Execute as* **Me** and
*Who has access* **Anyone**, and paste the resulting URL as `endpoint`.

### Supabase

```bash
npm install @supabase/supabase-js
```

Create a table `rsvps` with columns matching the fields above, then replace the
body of `submitRsvp()` in `src/lib/rsvp.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export async function submitRsvp(data: RsvpSubmission): Promise<SubmitResult> {
  const { error } = await supabase.from("rsvps").insert(data);
  if (error) return { ok: false, error: error.message };
  return { ok: true, demo: false };
}
```

Add an *insert-only* row-level-security policy so guests can submit but not read
other people's replies.

### Firebase

```bash
npm install firebase
```

```ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = initializeApp({ /* your config from the Firebase console */ });
const db = getFirestore(app);

export async function submitRsvp(data: RsvpSubmission): Promise<SubmitResult> {
  try {
    await addDoc(collection(db, "rsvps"), data);
    return { ok: true, demo: false };
  } catch (e) {
    return { ok: false, error: "We could not save your response." };
  }
}
```

Firestore rules allowing create only:

```
match /rsvps/{id} {
  allow create: if true;
  allow read, update, delete: if false;
}
```

Put any keys in `.env` as `VITE_…` variables and add them to Vercel's
environment variables too. Note that `VITE_`-prefixed values are bundled into
the public JavaScript, which is fine for Supabase anon keys and Firebase web
config, but never put a secret key there.

---

## Adding your photographs

1. Put the image files in `public/gallery/`.
2. Point the gallery at them in `src/config/event.ts`:

```ts
export const gallery = [
  { src: "/gallery/norah-felix-01.jpg", alt: "Norah and Felix", caption: "Our story" },
  { src: "/gallery/proposal.jpg",       alt: "The proposal",    caption: "The proposal" },
  // …
];
```

Any entry left with `src: ""` shows an elegant empty frame, so the section looks
finished even before the photographs arrive. Portrait images (roughly 4:5) suit
the arched frames best. Please resize to about 1200px on the long edge so the
page stays quick on mobile data.

---

## Deploying to Vercel

### Option A — through the Vercel website

1. Put the project on GitHub:

   ```bash
   git init
   git add .
   git commit -m "Norah & Felix WUPE Ceremony invitation"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wupe-ceremony.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub and
   import the repository.
3. Vercel detects Vite automatically — *Build command* `npm run build`,
   *Output directory* `dist`. Just press **Deploy**.
4. You get a URL like `https://wupe-ceremony.vercel.app`. Every push to `main`
   redeploys it.

### Option B — from the terminal

```bash
npm install -g vercel
vercel          # preview deployment
vercel --prod   # production
```

### After deploying

- Add your real address to `og:url` in `index.html`, add a `public/og-image.jpg`
  (1200×630 — a crop of the poster works well) and uncomment the two `og:` lines.
  This is what family will see when the link is shared on WhatsApp.
- To use your own domain: **Vercel → Settings → Domains**.

---

## Design notes

Everything is taken from the poster:

| From the poster | In the site |
|---|---|
| Deep espresso background `#1D0C05` | Page background |
| Copper "WUPE" lettering `#B5703F` | Buttons, icons, accents, gradient headings |
| Woven-basket backdrop, sand `#D4AF83` | The `weave` texture, drawn as vectors |
| The tall arched frame | Hero, photographs, closing section, pillar markers |
| Pampas grass plumes | Drawn in SVG, drifting gently in the corners |
| Diamond flourish dividers | The `Flourish` component, between every block |
| Script names | Great Vibes |
| Serif "CEREMONY" | Cormorant Garamond |
| Condensed detail lines | Oswald |

Other things worth knowing:

- **Mobile first.** Every section is designed for a phone and expands upwards.
  There is a floating *Directions* button on phones, which steps aside over the
  location and RSVP sections where the same action is already on screen.
- **Accessible.** All text meets WCAG AA contrast (checked across the whole
  page), the tabs support arrow keys, the form moves focus to the first field
  that needs attention, there is a skip link, and every animation is disabled
  for anyone who prefers reduced motion.
- **Fast.** No UI or icon libraries, no image assets — the decoration is all
  vectors and CSS. About 87 KB of JavaScript gzipped.

---

## What has and has not been verified

**Taken from the poster:** the names, "WUPE Ceremony", "Traditional Wedding",
Wundanyi in Taita-Taveta, the 10th of October, and the dress code (shades of
brown and black).

**Taken from the family programme:** the start time. Guests arrive from
8:00 AM for welcome and breakfast, which is what the page shows and what the
countdown counts down to.

**Checked against public sources:** the road route. Wundanyi sits about 17–18 km
north of Mwatate on the C104 Mwatate–Wundanyi road, reached from Voi by heading
west on the Voi–Taveta road. That road is known to be steep and winding, which
is why the site asks guests to allow extra time. Wundanyi town's position on the
map comes from OpenStreetMap.

**Deliberately left blank:** every phone number, fare, schedule, transport
operator, travel time and distance. The venue's coordinates are Taita Rocks
Hotel's position in OpenStreetMap, not a guess. The remaining gaps are listed in
[PLACEHOLDERS.md](./PLACEHOLDERS.md).

Sources: [Mwatate–Wundanyi road](https://nation.africa/kenya/counties/taita-taveta/scenic-views-towering-cliffs-and-death-the-blackspot-of-wundanyi-mwatate-highway-4203082) ·
[Wundanyi](https://en.wikipedia.org/wiki/Wundanyi) ·
[OpenStreetMap](https://www.openstreetmap.org/)

---

Made with love.
# wupe
