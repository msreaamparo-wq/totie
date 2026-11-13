import { motion } from 'framer-motion';
import { reveal } from '../animations/variants.js';
export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`px-5 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {title && <motion.h2 {...reveal} className="mb-12 text-center font-serif text-3xl font-bold tracking-wide sm:text-4xl">{title}</motion.h2>}
        {children}
      </div>
    </section>
  );
}
