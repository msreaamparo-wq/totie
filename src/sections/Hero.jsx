import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Scene3D from '../components/Scene3D.jsx';
import { music } from '../audio.js';
import { CONFIG } from '../config.js';
export default function Hero() {
  const open = () => { music.start(); document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky via-cream to-cream px-5 pb-10 pt-8 text-center">
      <motion.p initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-serif text-lg font-semibold text-gold">ONE WHOLE YEAR OF LOVE!</motion.p>
      <motion.h1 initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="mt-3 font-serif text-4xl font-extrabold leading-tight sm:text-6xl">{CONFIG.name}</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-3 max-w-md text-lg text-ink/80">You’re Invited to Celebrate My 1st Birthday!</motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }} className="h-[44vh] min-h-[280px] w-full max-w-3xl">
        <Scene3D className="h-full w-full" />
      </motion.div>
      <button onClick={open} className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold tracking-wide text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-ink/90">
        <Sparkles size={18} /> OPEN MY INVITATION
      </button>
    </header>
  );
}
