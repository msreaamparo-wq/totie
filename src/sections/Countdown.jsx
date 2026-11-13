import { useEffect, useState } from 'react';
import Section from '../components/Section.jsx';
import { CONFIG } from '../config.js';
const target = new Date(CONFIG.startsAt).getTime();
const calc = () => Math.max(0, target - Date.now());
export default function Countdown() {
  const [ms, setMs] = useState(calc);
  useEffect(() => { const t = setInterval(() => setMs(calc()), 1000); return () => clearInterval(t); }, []);
  const s = Math.floor(ms / 1000);
  const parts = [['Days', Math.floor(s / 86400)], ['Hours', Math.floor((s % 86400) / 3600)], ['Minutes', Math.floor((s % 3600) / 60)], ['Seconds', s % 60]];
  return (
    <Section id="countdown" className="bg-gradient-to-b from-cream to-sky/50">
      {ms > 0 ? (
        <div className="text-center">
          <h2 className="mb-10 font-serif text-3xl font-bold sm:text-4xl">DAYS UNTIL THE BIG DAY!</h2>
          <div className="mx-auto grid max-w-xl grid-cols-4 gap-3" role="timer" aria-live="off">
            {parts.map(([l, v]) => (
              <div key={l} className="rounded-2xl bg-white py-5 shadow-md">
                <div className="font-serif text-3xl font-extrabold tabular-nums sm:text-5xl">{String(v).padStart(2, '0')}</div>
                <div className="text-xs text-ink/60 sm:text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      ) : <h2 className="text-center font-serif text-4xl font-extrabold text-gold sm:text-5xl">THE CELEBRATION HAS BEGUN!</h2>}
    </Section>
  );
}
