import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Section from '../components/Section.jsx';
import Scene3D from '../components/Scene3D.jsx';
import { CONFIG } from '../config.js';
export default function Closing() {
  return (
    <Section id="closing" className="relative overflow-hidden bg-sky/50 text-center">
      {[8, 24, 42, 60, 78, 92].map((l, i) => (
        <motion.span key={l} aria-hidden="true" className="absolute bottom-0 text-baby" style={{ left: `${l}%` }} animate={{ y: [0, -320], opacity: [0, 1, 0] }} transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}><Heart fill="currentColor" size={18 + (i % 3) * 6} /></motion.span>
      ))}
      <Scene3D mode="cake" className="mx-auto h-64 w-full max-w-sm" />
      <h2 className="mx-auto max-w-2xl font-serif text-3xl font-extrabold sm:text-4xl">ONE YEAR DOWN, A LIFETIME OF LOVE TO GO!</h2>
      <p className="mt-5">Thank you for being part of {CONFIG.name}’s special day.</p>
      <p className="mt-6 font-serif text-lg italic">With love,<br />{CONFIG.name} and Family.</p>
    </Section>
  );
}
