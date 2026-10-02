# Placeholders to replace

Everything below lives in **`src/config/event.ts`** unless stated otherwise.
Search that file for `### TODO` to jump between them.

Anything left blank shows a tasteful **"To be confirmed"** chip on the page
rather than a made-up value, so the site is already safe to share — it simply
gets more complete as you fill these in.

---

## 1. Must do before sharing widely

| # | What | Where | Currently |
|---|------|-------|-----------|
| 1 | ✅ **Start time** | `ceremony.timeLabel` | "From 8:00 AM", from the programme |
| 2 | ✅ **Countdown target time** | `ceremony.startsAtISO` | `2026-10-10T08:00:00+03:00`, from the programme |
| 3 | **Exact venue location** | `venue.coordinates` | ✅ Done — Taita Rocks Hotel, pinned from OpenStreetMap. Optionally add a Google Maps share link in `venue.mapsUrl`. |
| 4 | ✅ **Phone numbers** (0741 777 695) | `contacts[].phone` and `contacts[].whatsapp` | Blank → the "Need Help Getting There?" section shows a graceful "coming soon" card instead of Call/WhatsApp buttons. **No number has been invented.** |
| 5 | ✅ **Contact names** (Felix Mwendia) | `contacts[].name` | Blank |

## 2. Getting there — confirm before guests rely on it

The **road corridor is verified**: Nairobi–Mombasa highway to Voi, west on the
Voi–Taveta road to Mwatate, then north up the C104 Mwatate–Wundanyi road
(about 17–18 km of tarmac) into the hills. What is **not** filled in:

| # | What | Where |
|---|------|-------|
| 6 | ✅ Driving distance (366 km) | `gettingThere.byCar.distance` |
| 7 | ✅ Driving time (6 hrs 17 min) | `gettingThere.byCar.duration` |
| 8 | ✅ Parking information | `gettingThere.byCar.notes[1]` |
| 9 | ✅ Where the hotel is (filled in: on the Mwatate–Wundanyi road) | `gettingThere.byCar.notes[2]` |
| 10 | Which bus/shuttle operators you recommend | `gettingThere.byPublicTransport.steps[0]` |
| 11 | Where guests should alight | `gettingThere.byPublicTransport.steps[1]` |
| 12 | The onward matatu stage to Wundanyi | `gettingThere.byPublicTransport.steps[2]` |
| 13 | The Wundanyi → Taita Rocks Hotel leg | `gettingThere.byPublicTransport.steps[3]` |
| 14 | Approximate fare | `gettingThere.byPublicTransport.fare` |
| 15 | Approximate journey time | `gettingThere.byPublicTransport.duration` |
| 15a | ✅ SGR: which train you recommend (Friday 8:00 AM) | `gettingThere.bySgr.steps[1]` |
| 15b | ✅ SGR: Voi station → Wundanyi (public transport) | `gettingThere.bySgr.steps[2]` |
| 15c | SGR: ✅ fare (KSh 1,050) and door-to-door time | `gettingThere.bySgr.fare` / `.duration` |
| 16 | Local taxi details | `gettingThere.fromWundanyi.options[0]` |
| 17 | Bodaboda details | `gettingThere.fromWundanyi.options[1]` |
| 18 | Matatu details | `gettingThere.fromWundanyi.options[2]` |
| 19 | Pickup point in Wundanyi | `gettingThere.fromWundanyi.pickupPoint` |

> **No transport company, fare, schedule or travel time has been invented.**
> Please confirm each with someone who has travelled the route recently.

## 3. Nice to have

| # | What | Where |
|---|------|-------|
| 20 | Photographs (6 slots) | `gallery[].src` — drop files in `public/gallery/`, then set e.g. `src: "/gallery/norah-felix-01.jpg"` |
| 21 | ✅ RSVP deadline (none — line hidden) | `rsvp.deadlineLabel` |
| 22 | ✅ RSVP backend | `rsvp.endpoint` — connected to Formspree |
| 23 | A landmark near the venue | `venue.landmark` |
| 24 | WhatsApp link preview image | `index.html` — add `public/og-image.jpg` and uncomment the two `og:` lines |
| 25 | Live site URL for the preview | `index.html` → `og:url` |

---

## How the placeholder system works

Two mechanisms, so nothing unverified ever reaches a guest as fact:

1. **Empty string (`""`)** → renders a dashed *"To be confirmed"* chip.
   Used for single values like a time, a fare, a distance.

2. **A string starting with `### TODO`** → renders a dashed amber *"To add"*
   note. Used for sentences you need to write yourself. Replace the whole
   string (including the `### TODO`) with your own wording and it becomes
   ordinary prose.

Both are defined in `src/components/ui/Primitives.tsx` (`TBC`, `Detail`,
`Editable`) if you ever want to restyle them.
