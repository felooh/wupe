import { rsvp } from "../config/event";

/** Exactly what the form collects. */
export type RsvpSubmission = {
  fullName: string;
  phone: string;
  guests: number;
  attending: "yes" | "no";
  transportHelp: "yes" | "no";
  message: string;
  /** Added automatically. */
  submittedAt: string;
};

export type SubmitResult = { ok: true; demo: boolean } | { ok: false; error: string };

/* ============================================================================
 *  THE ONLY FUNCTION YOU NEED TO CHANGE TO GO LIVE
 * ----------------------------------------------------------------------------
 *  With `rsvp.endpoint` empty, this runs in demo mode: the guest sees the
 *  thank-you message and the response is logged to the browser console, but
 *  nothing is stored.
 *
 *  With an endpoint set, it POSTs JSON. That is all Formspree, Google Apps
 *  Script and a Supabase Edge Function need. For the Firebase and Supabase
 *  client SDKs, replace the body of this function — worked examples are in
 *  README.md → "Connecting the RSVP form to a backend".
 * ========================================================================== */
export async function submitRsvp(data: RsvpSubmission): Promise<SubmitResult> {
  if (!rsvp.endpoint) {
    // DEMO MODE — no backend configured yet.
    console.info("[RSVP demo mode] Nothing was saved. Submission was:", data);
    await new Promise((resolve) => setTimeout(resolve, 700)); // feels like a real request
    return { ok: true, demo: true };
  }

  try {
    const response = await fetch(rsvp.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { ok: false, error: `The server replied with ${response.status}.` };
    }
    return { ok: true, demo: false };
  } catch {
    return {
      ok: false,
      error: "We could not reach the server. Please check your connection and try again.",
    };
  }
}
