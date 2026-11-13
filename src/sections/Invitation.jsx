import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, PartyPopper } from 'lucide-react';
import Section from '../components/Section.jsx';
import { reveal } from '../animations/variants.js';
import { CONFIG } from '../config.js';
const Row = ({ icon: I, label, value }) => (
  <div className="flex items-start gap-3 text-left">
    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky"><I size={18} /></span>
    <div><div className="text-sm text-ink/60">{label}</div><div className="font-semibold">{value}</div></div>
  </div>
);
export default function Invitation() {
  const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.venueFull);
  return (
    <Section id="invitation">
      <motion.div {...reveal} className="mx-auto max-w-2xl rounded-[2rem] border-2 border-gold/40 bg-white p-8 text-center shadow-2xl sm:p-12">
        <p className="font-serif text-xl font-bold text-gold">YOU ARE INVITED!</p>
        <p className="mt-4">Please join us as we celebrate the FIRST BIRTHDAY of</p>
        <h2 className="my-3 font-serif text-3xl font-extrabold sm:text-4xl">{CONFIG.name.toUpperCase()}</h2>
        <p className="mx-auto max-w-md text-ink/80">A whole year of smiles, laughter, love, and unforgettable memories!</p>
        <div className="mx-auto my-8 grid max-w-sm gap-4">
          <Row icon={CalendarDays} label="Date" value={CONFIG.dateDisplay} />
          <Row icon={Clock} label="Time" value={CONFIG.timeDisplay} />
          <Row icon={MapPin} label="Venue" value={CONFIG.venue} />
          <Row icon={PartyPopper} label="Celebration Theme" value={CONFIG.theme} />
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href={map} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-ink px-6 py-3 font-semibold hover:bg-sky">View on Google Maps</a>
          <a href="#rsvp" className="rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-ink/90">RSVP</a>
        </div>
      </motion.div>
    </Section>
  );
}
