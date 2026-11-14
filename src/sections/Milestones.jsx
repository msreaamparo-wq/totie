
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Camera,
  Flower2
} from 'lucide-react';

import Section from '../components/Section.jsx';
import { CONFIG } from '../config.js';

function MonthCard({ month, caption, images, index }) {
  const [active, setActive] = useState(0);

  const total = images.length;
  const next = () => setActive((prev) => (prev + 1) % total);
  const previous = () =>
    setActive((prev) => (prev - 1 + total) % total);

  const paddedMonth = String(month).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: (index % 2) * 0.1 }}
      whileHover={{ y: -7 }}
      className="group overflow-hidden rounded-[28px] border border-[#E9DFD2] bg-[#FFFCF7] shadow-[0_8px_30px_rgba(91,70,49,0.07)] transition-shadow duration-500 hover:shadow-[0_18px_40px_rgba(91,70,49,0.13)]"
    >
      {/* PHOTO AREA */}
      <div className="relative p-3 pb-0 sm:p-4 sm:pb-0">

        <div className="relative h-[340px] overflow-hidden rounded-[21px] bg-[#F1E8DC] sm:h-[390px] lg:h-[410px]">

          <AnimatePresence mode="wait" initial={false}>
            {images[active] ? (
              <motion.img
                key={images[active]}
                src={images[active]}
                alt={`Shaun Matthew - Month ${month}`}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <motion.div
                key="placeholder"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#A68D76]"
              >
                <Camera size={38} strokeWidth={1.2} />
                <span className="font-serif text-sm italic">
                  Precious memories go here
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TOP LEFT MONTH BADGE */}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/60 bg-[#FFFCF0]/95 px-3 py-2 shadow-sm backdrop-blur-md">
            <Heart size={13} className="fill-[#C88E83] text-[#C88E83]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#705B4A]">
              MONTH {paddedMonth}
            </span>
          </div>

          {/* PHOTO COUNTER */}
          {total > 1 && (
            <div className="absolute bottom-4 right-4 rounded-full border border-white/50 bg-black/35 px-3 py-1.5 text-[11px] font-medium tracking-wider text-white backdrop-blur-md">
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          )}

          {/* PHOTO CONTROLS */}
          {total > 1 && (
            <>
              <button
                onClick={previous}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/85 text-[#725C49] shadow-md transition hover:scale-110 hover:bg-white"
              >
                <ChevronLeft size={19} />
              </button>

              <button
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/85 text-[#725C49] shadow-md transition hover:scale-110 hover:bg-white"
              >
                <ChevronRight size={19} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* CARD DETAILS */}
      <div className="px-5 pb-6 pt-5 sm:px-6">

        <div className="flex items-center justify-between">
          <span className="font-serif text-[12px] italic tracking-widest text-[#B39A7F]">
            A little memory to treasure
          </span>
          <Sparkles size={15} className="text-[#D4B77E]" />
        </div>

        <h3 className="mt-2 font-serif text-[25px] font-semibold leading-tight text-[#574638]">
          {caption}
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-[#EDE4D9] pt-4">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#A38C75]">
            {paddedMonth} — TWELVE MONTHS OF LOVE
          </span>

          {total > 1 && (
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? 'w-5 bg-[#B79B78]'
                      : 'w-1.5 bg-[#E4D8C9] hover:bg-[#B79B78]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Milestones() {
  return (
    <Section
      id="milestones"
      className="relative overflow-hidden bg-[#F8F3EB] px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* DECORATIVE BACKGROUND */}
      <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-[#E9DCCB]/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-[#EAD9D0]/35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center sm:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C9AE8B]" />
            <Flower2 size={17} className="text-[#B79B78]" />
            <span className="text-[10px] font-semibold tracking-[0.35em] text-[#A68A6D]">
              OUR LITTLE JOURNEY
            </span>
            <Flower2 size={17} className="text-[#B79B78]" />
            <span className="h-px w-10 bg-[#C9AE8B]" />
          </div>

          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#574638] sm:text-5xl lg:text-6xl">
            12 Months of
            <br />
            <span className="italic text-[#B38D79]">
              Pure Happiness
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg font-serif text-base italic leading-relaxed text-[#927D6B] sm:text-lg">
            Twelve beautiful months, countless little moments,
            and a lifetime of love.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2">
            <Heart size={13} className="fill-[#C99489] text-[#C99489]" />
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#A38B73]">
              SHAUN MATTHEW
            </span>
            <Heart size={13} className="fill-[#C99489] text-[#C99489]" />
          </div>
        </motion.div>

        {/* MONTH COUNTER WIDGETS */}
        <div className="mb-10 grid grid-cols-3 gap-3 sm:mb-14 sm:gap-5">

          <div className="rounded-2xl border border-[#E9DFD2] bg-[#FFFCF7] px-3 py-4 text-center shadow-sm sm:py-5">
            <Heart className="mx-auto mb-2 text-[#C99489]" size={19} />
            <p className="font-serif text-2xl text-[#574638]">12</p>
            <p className="mt-1 text-[9px] font-semibold tracking-[0.15em] text-[#A38B73] sm:text-[10px]">
              MONTHS
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9DFD2] bg-[#FFFCF7] px-3 py-4 text-center shadow-sm sm:py-5">
            <Camera className="mx-auto mb-2 text-[#B79B78]" size={19} />
            <p className="font-serif text-2xl text-[#574638]">
              {Object.values(CONFIG.milestoneAlbums || {}).reduce(
                (sum, album) => sum + album.length,
                0
              )}
            </p>
            <p className="mt-1 text-[9px] font-semibold tracking-[0.15em] text-[#A38B73] sm:text-[10px]">
              MEMORIES
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9DFD2] bg-[#FFFCF7] px-3 py-4 text-center shadow-sm sm:py-5">
            <Sparkles className="mx-auto mb-2 text-[#D0AD70]" size={19} />
            <p className="font-serif text-2xl text-[#574638]">∞</p>
            <p className="mt-1 text-[9px] font-semibold tracking-[0.15em] text-[#A38B73] sm:text-[10px]">
              LOVE
            </p>
          </div>

        </div>

        {/* TWELVE MONTHS GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-9">

          {CONFIG.milestones.map((caption, index) => {
            const album = CONFIG.milestoneAlbums?.[index] || [];
            const fallback = CONFIG.milestoneImages?.[index];

            const images = album.length
              ? album
              : fallback
                ? [fallback]
                : [''];

            return (
              <MonthCard
                key={index}
                month={index + 1}
                caption={caption}
                images={images}
                index={index}
              />
            );
          })}

        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mt-16 text-center sm:mt-20">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3 text-[#B79B78]">
            <span className="h-px w-12 bg-[#DCCBB6]" />
            <Heart size={16} className="fill-[#C99489]" />
            <span className="h-px w-12 bg-[#DCCBB6]" />
          </div>

          <p className="font-serif text-xl italic text-[#806C58] sm:text-2xl">
            Every little moment is a big memory.
          </p>

          <p className="mt-3 text-[9px] font-semibold tracking-[0.3em] text-[#B29B82]">
            FOREVER OUR LITTLE SUNSHINE
          </p>
        </div>

      </div>
    </Section>
  );
}
