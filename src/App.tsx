import { useReveal } from "./hooks/useReveal";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Invitation } from "./components/Invitation";
import { Countdown } from "./components/Countdown";
import { EventDetails } from "./components/EventDetails";
import { AboutWupe } from "./components/AboutWupe";
import { Location } from "./components/Location";
import { Directions } from "./components/Directions";
import { TransportHelp } from "./components/TransportHelp";
import { Gallery } from "./components/Gallery";
import { FamilyFriends } from "./components/FamilyFriends";
import { RSVP } from "./components/RSVP";
import { FinalInvitation } from "./components/FinalInvitation";
import { Footer } from "./components/Footer";
import { MobileDirectionsFab } from "./components/MobileDirectionsFab";

export default function App() {
  useReveal();

  return (
    <>
      {/* Keyboard users can jump straight past the navigation. */}
      <a
        href="#invitation"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 
          focus:rounded-full focus:bg-copper focus:px-5 focus:py-3 focus:font-label 
          focus:text-[0.7rem] focus:tracking-[0.2em] focus:text-cream focus:uppercase"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Invitation />
        <Countdown />
        <EventDetails />
        <AboutWupe />
        <Location />
        <Directions />
        <TransportHelp />
        {/* <Gallery /> */}
        <FamilyFriends />
        <RSVP />
        <FinalInvitation />
      </main>

      <Footer />
      <MobileDirectionsFab />
    </>
  );
}
