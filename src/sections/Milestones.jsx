import { motion } from 'framer-motion';
import Section from '../components/Section.jsx';
import Photo from '../components/Photo.jsx';
import { CONFIG } from '../config.js';
export default function Milestones() {
  return (
    <Section id="milestones" title="12 MONTHS OF PURE HAPPINESS" className="bg-sky/40">
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CONFIG.milestones.map((cap, i) => (
          <motion.li key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }} className="overflow-hidden rounded-3xl bg-white shadow-md">
            <div className="aspect-[4/3]"><Photo src={CONFIG.milestoneImages[i]} alt={`Month ${i + 1}`} /></div>
            <div className="p-5">
              <span className="inline-block rounded-full bg-sun px-3 py-1 text-sm font-semibold">{i + 1} {i === 0 ? 'Month' : 'Months'}</span>
              <p className="mt-2 font-serif text-lg font-semibold">{cap}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
