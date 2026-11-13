import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '../components/Section.jsx';
import Photo from '../components/Photo.jsx';
import { CONFIG } from '../config.js';

function MonthPhotoCarousel({ images, month }) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const show = (index) => setActive((index + total) % total);

  return (
    <div className="relative h-full bg-sky/30 p-2 sm:p-3">
      <button
        type="button"
        onClick={() => show(active + 1)}
        aria-label={`Show next photo for month ${month}`}
        className="relative h-full w-full cursor-pointer overflow-hidden rounded-[1.15rem] text-left"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={images[active]}
            src={images[active]}
            alt={`Month ${month}, photo ${active + 1} of ${total}`}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-ink/75 shadow-sm">
          {active + 1} / {total}
        </span>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
        {images.map((image, index) => (
          <span
            key={image}
            className={`h-1.5 rounded-full transition-all ${index === active ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Milestones() {
  return (
    <Section id="milestones" title="12 MONTHS OF PURE HAPPINESS" className="bg-sky/40">
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CONFIG.milestones.map((cap, i) => {
          const album = CONFIG.milestoneAlbums?.[i];
          return (
            <motion.li key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} whileHover={{ y: -6 }} className="overflow-hidden rounded-3xl bg-white shadow-md">
              <div className={album?.length > 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
                {album?.length > 1
                  ? <MonthPhotoCarousel images={album} month={i + 1} />
                  : <Photo src={album?.[0] || CONFIG.milestoneImages[i]} alt={`Month ${i + 1}`} />}
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-sun px-3 py-1 text-sm font-semibold">{i + 1} {i === 0 ? 'Month' : 'Months'}</span>
                <p className="mt-2 font-serif text-lg font-semibold">{cap}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
