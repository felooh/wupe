import { useEffect, useId, useRef, useState } from "react";
import { rsvp as rsvpConfig, couple } from "../config/event";
import { submitRsvp, type RsvpSubmission } from "../lib/rsvp";
import { Section, SectionHeading, Button } from "./ui/Primitives";
import { Flourish } from "./ui/Flourish";
import { CheckIcon, HeartIcon } from "./ui/Icons";

type FormState = {
  fullName: string;
  phone: string;
  guests: string;
  attending: "yes" | "no" | "";
  transportHelp: "yes" | "no";
  message: string;
};

const empty: FormState = {
  fullName: "",
  phone: "",
  guests: "1",
  attending: "",
  transportHelp: "no",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Please tell us your name.";
  }

  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) {
    errors.phone = "Please leave us a number we can reach you on.";
  } else if (digits.length < 9) {
    errors.phone = "That number looks a little short — please check it.";
  }

  if (!form.attending) {
    errors.attending = "Please let us know if you can join us.";
  }

  const guests = Number(form.guests);
  if (form.attending === "yes" && (!Number.isInteger(guests) || guests < 1)) {
    errors.guests = "Please choose at least one guest.";
  }

  return errors;
}

/* -- Small field wrappers, so every input looks and behaves the same ------ */
const fieldClass =
  "w-full rounded-xl border bg-espresso-deep/55 px-4 py-3.5 text-cream placeholder:text-linen/58 " +
  "transition-colors duration-400 focus:outline-none focus:border-copper";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="kicker mb-2.5 block text-[0.54rem] text-gold/75">
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[0.82rem] text-copper-light">
      {message}
    </p>
  );
}

export function RSVP() {
  const id = useId();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [wasDemo, setWasDemo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* The thank-you note is shorter than the form, so bring it into view rather
     than leaving the guest looking at whatever the page scrolled to. */
  useEffect(() => {
    if (status !== "done") return;
    sectionRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [status]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the guest starts correcting it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first field that needs attention.
      const firstKey = Object.keys(found)[0];
      document.getElementById(`${id}-${firstKey}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");

    const submission: RsvpSubmission = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      guests: form.attending === "yes" ? Number(form.guests) : 0,
      attending: form.attending as "yes" | "no",
      transportHelp: form.transportHelp,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    };

    const result = await submitRsvp(submission);

    if (result.ok) {
      setWasDemo(result.demo);
      setStatus("done");
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  };

  /* -- Thank-you state --------------------------------------------------- */
  if (status === "done") {
    const coming = form.attending === "yes";
    return (
      <Section id="rsvp" tone="deep" ref={sectionRef}>
        <div className="pointer-events-none absolute inset-0 glow" aria-hidden="true" />
        <div className="relative mx-auto max-w-xl text-center">
          <span
            className="animate-rise mx-auto inline-flex rounded-full border border-copper/40 
              bg-copper/12 p-5 text-copper-light"
            aria-hidden="true"
          >
            {coming ? <CheckIcon size={30} /> : <HeartIcon size={30} />}
          </span>

          <h2
            className="animate-rise mt-8 font-script text-4xl text-gold sm:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            {coming ? "Thank you!" : "Thank you for letting us know"}
          </h2>

          <div className="animate-rise mt-7 flex justify-center" style={{ animationDelay: "220ms" }}>
            <Flourish width={180} />
          </div>

          <p
            className="animate-rise mt-8 text-[1.02rem] leading-[1.85] text-linen/80"
            style={{ animationDelay: "300ms" }}
            role="status"
          >
            {coming
              ? `We have your response, ${form.fullName.split(" ")[0]}. We cannot wait to celebrate with you in Wundanyi.`
              : "We will miss you on the day, but we are grateful you told us. You will be in our hearts."}
          </p>

          {form.transportHelp === "yes" && coming && (
            <p
              className="animate-rise mt-5 text-[0.92rem] text-gold/80"
              style={{ animationDelay: "380ms" }}
            >
              We have noted that you would like help with transport, and we will be in touch.
            </p>
          )}

          <p
            className="animate-rise mt-10 font-script text-3xl text-gold/85"
            style={{ animationDelay: "440ms" }}
          >
            {couple.shortNames}
          </p>

          {wasDemo && (
            /* Visible only while no backend is connected — see README. */
            <p
              className="animate-rise mx-auto mt-10 max-w-sm rounded-lg border border-dashed 
                border-copper/35 bg-copper/6 px-4 py-3 text-[0.76rem] leading-relaxed text-gold/78"
              style={{ animationDelay: "520ms" }}
            >
              Demo mode: this response was not saved anywhere. Add an RSVP endpoint in
              <span className="font-label"> src/config/event.ts</span> to start collecting replies.
            </p>
          )}

          <div className="animate-rise mt-9" style={{ animationDelay: "600ms" }}>
            <Button
              variant="ghost"
              className="border border-linen/12"
              onClick={() => {
                setForm(empty);
                setStatus("idle");
              }}
            >
              Send another response
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  /* -- The form ---------------------------------------------------------- */
  const sending = status === "sending";
  const attendingError = errors.attending;

  return (
    <Section id="rsvp" tone="deep" ref={sectionRef}>
      <div className="pointer-events-none absolute inset-0 glow opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl">
        <SectionHeading kicker="Kindly Respond" title="Will You Join Us?" />

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="mx-auto mt-8 max-w-lg text-center text-[0.98rem] leading-relaxed text-linen/70"
        >
          Knowing who is coming helps us prepare a warm welcome for everyone.
          {rsvpConfig.deadlineLabel && (
            <span className="mt-2 block text-gold/85">{rsvpConfig.deadlineLabel}</span>
          )}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          data-reveal
          style={{ ["--reveal-delay" as string]: "200ms" }}
          className="mt-12 space-y-7 rounded-2xl border border-copper/20 bg-linear-to-b 
            from-bark/55 to-espresso-soft/25 p-6 shadow-2xl shadow-espresso-deep/50 sm:p-9"
        >
          {/* Name */}
          <div>
            <Label htmlFor={`${id}-fullName`}>Full Name</Label>
            <input
              id={`${id}-fullName`}
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Your name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? `${id}-fullName-error` : undefined}
              className={`${fieldClass} ${errors.fullName ? "border-copper-light" : "border-linen/14"}`}
            />
            <FieldError id={`${id}-fullName-error`} message={errors.fullName} />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor={`${id}-phone`}>Phone Number</Label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="e.g. 07xx xxx xxx"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
              className={`${fieldClass} ${errors.phone ? "border-copper-light" : "border-linen/14"}`}
            />
            <FieldError id={`${id}-phone-error`} message={errors.phone} />
          </div>

          {/* Attending */}
          <fieldset aria-describedby={attendingError ? `${id}-attending-error` : undefined}>
            <legend className="kicker mb-3 text-[0.54rem] text-gold/75">Are you attending?</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { value: "yes", label: "Yes, I'll be there" },
                  { value: "no", label: "Sorry, I can't make it" },
                ] as const
              ).map((option) => {
                const checked = form.attending === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-4 
                      transition-all duration-400 ${
                        checked
                          ? "border-copper bg-copper/14 text-cream"
                          : "border-linen/14 bg-espresso-deep/55 text-linen/70 hover:border-copper/45"
                      }`}
                  >
                    <input
                      // The first radio carries the id, so focus can land here on error.
                      id={option.value === "yes" ? `${id}-attending` : undefined}
                      type="radio"
                      name="attending"
                      value={option.value}
                      checked={checked}
                      onChange={() => set("attending", option.value)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full 
                        border transition-colors duration-300 ${
                          checked ? "border-copper bg-copper" : "border-linen/35"
                        }`}
                      aria-hidden="true"
                    >
                      {checked && <CheckIcon size={12} className="text-espresso" />}
                    </span>
                    <span className="text-[0.92rem]">{option.label}</span>
                  </label>
                );
              })}
            </div>
            <FieldError id={`${id}-attending-error`} message={attendingError} />
          </fieldset>

          {/* Guests — only relevant to those who are coming. */}
          {form.attending !== "no" && (
            <div className="animate-fade" style={{ animationDuration: "0.5s" }}>
              <Label htmlFor={`${id}-guests`}>Number of Guests</Label>
              <select
                id={`${id}-guests`}
                name="guests"
                value={form.guests}
                onChange={(e) => set("guests", e.target.value)}
                aria-invalid={Boolean(errors.guests)}
                aria-describedby={errors.guests ? `${id}-guests-error` : undefined}
                className={`${fieldClass} appearance-none bg-[length:16px] bg-[right_1rem_center] 
                  bg-no-repeat pr-12 ${errors.guests ? "border-copper-light" : "border-linen/14"}`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23d2af85' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
                }}
              >
                {Array.from({ length: rsvpConfig.maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n} className="bg-espresso text-cream">
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
              <FieldError id={`${id}-guests-error`} message={errors.guests} />
            </div>
          )}

          {/* Transport */}
          <fieldset>
            <legend className="kicker mb-3 text-[0.54rem] text-gold/75">
              Transport assistance required?
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { value: "yes", label: "Yes, please" },
                  { value: "no", label: "No, thank you" },
                ] as const
              ).map((option) => {
                const checked = form.transportHelp === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-center gap-2.5 rounded-xl 
                      border px-4 py-3.5 text-[0.9rem] transition-all duration-400 ${
                        checked
                          ? "border-copper bg-copper/14 text-cream"
                          : "border-linen/14 bg-espresso-deep/55 text-linen/70 hover:border-copper/45"
                      }`}
                  >
                    <input
                      type="radio"
                      name="transportHelp"
                      value={option.value}
                      checked={checked}
                      onChange={() => set("transportHelp", option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Message */}
          <div>
            <Label htmlFor={`${id}-message`}>Message / Special Note</Label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={4}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder={`A word for ${couple.shortNames}, dietary needs, or anything we should know.`}
              className={`${fieldClass} resize-y border-linen/14`}
            />
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="rounded-xl border border-copper-light/45 bg-copper/10 px-4 py-3.5 
                text-[0.88rem] text-copper-light"
            >
              {serverError} If it keeps happening, please send us a WhatsApp instead.
            </p>
          )}

          <Button type="submit" variant="primary" disabled={sending} className="w-full py-4">
            {sending ? (
              <>
                <span
                  className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cream/35 
                    border-t-cream"
                  aria-hidden="true"
                />
                Sending
              </>
            ) : (
              <>
                <CheckIcon size={15} />
                Confirm Attendance
              </>
            )}
          </Button>

          <p className="text-center text-[0.78rem] text-linen/60">
            Your details are used only to plan the day.
          </p>
        </form>
      </div>
    </Section>
  );
}
