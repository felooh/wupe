import { activeContacts, telUrl, whatsappUrl } from "../config/event";
import { Section, SectionHeading, Button, Card } from "./ui/Primitives";
import { PhoneIcon, WhatsAppIcon, UsersIcon } from "./ui/Icons";

export function TransportHelp() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <SectionHeading kicker="We Are Here To Help" title="Need Help Getting There?" />

        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="mx-auto mt-8 max-w-xl text-center text-[1rem] leading-[1.85] text-linen/75"
        >
          Please do not worry about the journey. If you need help with transport, directions or
          arranging a pickup, reach out to us and we will make a plan together.
        </p>

        {activeContacts.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {activeContacts.map((contact, i) => (
              <Card
                key={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${180 + i * 100}ms` }}
                className="flex flex-col text-center sm:text-left"
              >
                <span
                  className="mx-auto rounded-full border border-copper/25 bg-copper/10 p-3 
                    text-copper sm:mx-0 sm:w-fit"
                  aria-hidden="true"
                >
                  <UsersIcon size={20} />
                </span>
                <h3 className="mt-4 font-display text-xl text-cream">{contact.name || "Our family"}</h3>
                <p className="mt-1 text-[0.86rem] text-linen/60">{contact.role}</p>

                <div className="mt-6 flex flex-col gap-3">
                  {contact.phone && (
                    <Button href={telUrl(contact.phone)} variant="primary" className="w-full">
                      <PhoneIcon size={15} />
                      Call
                    </Button>
                  )}
                  {contact.whatsapp && (
                    <Button href={whatsappUrl(contact.whatsapp)} variant="outline" className="w-full">
                      <WhatsAppIcon size={15} />
                      WhatsApp
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Shown until phone numbers are added to event.ts — no number is invented. */
          <Card
            data-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
            className="mt-12 text-center"
          >
            <span
              className="mx-auto inline-flex rounded-full border border-copper/25 bg-copper/10 
                p-3.5 text-copper"
              aria-hidden="true"
            >
              <PhoneIcon size={22} />
            </span>
            <p className="mt-5 font-display text-xl text-cream">Contact details coming soon</p>
            <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-linen/60">
              We are putting together the transport arrangements. Call and WhatsApp buttons will
              appear here as soon as the numbers are confirmed — or simply use the RSVP form below
              and tick <em className="text-gold/85 not-italic">“I need transport assistance”</em>,
              and we will get in touch with you.
            </p>
            <div className="mt-7">
              <Button href="#rsvp" variant="outline">
                Request help through the RSVP
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Section>
  );
}
