import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Sparkles } from 'lucide-react';
import { reveal } from '../animations/variants.js';
import Scene3D from '../components/Scene3D.jsx';
import { CONFIG } from '../config.js';

const Detail = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-2xl bg-cream/70 p-3.5 text-left">
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-gold shadow-sm"><Icon size={17} strokeWidth={1.8} /></span>
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">{label}</p>
      <p className="mt-0.5 text-sm font-semibold leading-snug text-ink">{value}</p>
    </div>
  </div>
);

export default function Invitation({ onOpen }) {
  const map = CONFIG.mapUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.venueFull));

  return (
    <section id="invitation" className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-[#edf7ff] px-4 py-6 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky/75 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-sun/55 blur-3xl" />

      <motion.div {...reveal} className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/90 bg-white/75 shadow-[0_24px_80px_rgba(74,121,164,0.22)] backdrop-blur-xl sm:rounded-[2.75rem]">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative min-h-[15rem] overflow-hidden bg-gradient-to-br from-[#dceeff] via-[#eef8ff] to-[#fff8e7] sm:min-h-[18rem] lg:min-h-full">
            <div className="pointer-events-none absolute inset-x-10 bottom-7 h-10 rounded-full bg-baby/20 blur-xl" />
            <Scene3D mode="detail" className="absolute inset-0" />
            <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/80 bg-white/65 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-ink/60 backdrop-blur-sm">
              ONE SWEET YEAR
            </div>
          </div>

          <div className="px-6 py-8 text-center sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">First Birthday Celebration</p>
            <div className="mx-auto mt-4 h-px w-10 bg-gold/50" />
            <p className="mt-5 text-sm text-ink/65">With love, you are invited to celebrate</p>
            <h1 className="mt-2 font-serif text-[2rem] font-bold leading-[1.05] text-ink sm:text-5xl">
              {CONFIG.name}
            </h1>
            <p className="mt-2 font-serif text-xl italic text-gold sm:text-2xl">is turning one.</p>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/65">
              A little celebration for a very big milestone, filled with joy, love, and sweet memories.
            </p>

            <div className="my-7 h-px bg-ink/10" />
            <div className="grid gap-2.5 sm:grid-cols-3">
              <Detail icon={CalendarDays} label="Date" value={CONFIG.dateDisplay} />
              <Detail icon={Clock} label="Time" value={CONFIG.timeDisplay} />
              <Detail icon={MapPin} label="Venue" value={CONFIG.venue} />
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={onOpen} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(36,65,95,0.24)] transition hover:-translate-y-0.5 hover:bg-ink/90">
                <Sparkles size={16} /> Open invitation
              </button>
              <a href={map} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-white">
                View location
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
