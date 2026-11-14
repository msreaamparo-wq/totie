import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
} from 'lucide-react';
import Section from '../components/Section.jsx';
import { CONFIG } from '../config.js';

function MonthCard({ month, caption, images, onOpen }) {
  const [active, setActive] = useState(0);

  const hasPhotos = images.length > 0;
  const currentImage = images[active];
  const hasMultiple = images.length > 1;

  const changePhoto = (direction) => {
    setActive((current) =>
      (current + direction + images.length) % images.length
    );
  };

  return (
    <motion.li
      className="milestone-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-35px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="milestone-card-top">
        <span className="milestone-number">
          {String(month).padStart(2, '0')}
        </span>

        <div className="milestone-card-heading">
          <span className="milestone-kicker">A LITTLE CHAPTER</span>
          <h3>{month === 1 ? 'First Month' : `${month} Months`}</h3>
        </div>

        <span className="milestone-heart" aria-hidden="true">
          <Heart size={17} strokeWidth={1.5} />
        </span>
      </div>

      <div className="milestone-photo-shell">
        <button
          type="button"
          className={`milestone-photo-stage ${
            hasPhotos ? 'has-photo' : 'is-empty'
          }`}
          onClick={() => {
            if (hasPhotos) onOpen(images, active, month);
          }}
          disabled={!hasPhotos}
          aria-label={`Open month ${month} photo`}
        >
          {hasPhotos ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={`${month}-${currentImage}`}
                src={currentImage}
                alt={`Month ${month}, photo ${active + 1}`}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0.25, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.15, scale: 0.99 }}
                transition={{ duration: 0.28 }}
                className="milestone-photo-image"
              />
            </AnimatePresence>
          ) : (
            <div className="milestone-placeholder">
              <span className="milestone-placeholder-icon">
                <Camera size={25} strokeWidth={1.4} />
              </span>
              <span className="milestone-placeholder-title">
                A memory is waiting
              </span>
              <span className="milestone-placeholder-subtitle">
                Add a photo for this month
              </span>
            </div>
          )}
        </button>

        {hasMultiple && (
          <>
            <button
              type="button"
              className="milestone-photo-arrow previous"
              onClick={() => changePhoto(-1)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              className="milestone-photo-arrow next"
              onClick={() => changePhoto(1)}
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>

            <span className="milestone-photo-count">
              {active + 1} <span>/</span> {images.length}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="milestone-dots">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setActive(index)}
              className={`milestone-dot ${
                active === index ? 'active' : ''
              }`}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={active === index}
            />
          ))}
        </div>
      )}

      <div className="milestone-card-caption">
        <p>{caption}</p>
        {hasPhotos && <span>Tap the photo to view</span>}
      </div>
    </motion.li>
  );
}

const MILESTONE_CAPTIONS = [
  'The beginning of a beautiful little journey.',
  'Two months of smiles and little discoveries.',
  'Three months of growing sweeter every day.',
  'Four months filled with love and laughter.',
  'Five months of precious little moments.',
  'Six months of happiness and milestones.',
  'Seven months of curiosity and joy.',
  'Eight months of endless cuddles.',
  'Nine months of growing and glowing.',
  'Ten months of making memories.',
  'Eleven months of our sweetest adventure.',
  'Twelve months of pure happiness.',
];

export default function Milestones() {
  const [lightbox, setLightbox] = useState(null);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getImages = (month) => {
    const album = CONFIG.milestoneAlbums?.[month - 1];
    if (Array.isArray(album) && album.length) return album.filter(Boolean);
    const single = CONFIG.milestoneImages?.[month - 1];
    return single ? [single] : [];
  };

  const openPhoto = (images, index, month) => setLightbox({ images, index, month });

  const changePhoto = (direction) => {
    setLightbox((current) => {
      if (!current) return null;
      return {
        ...current,
        index: (current.index + direction + current.images.length) % current.images.length,
      };
    });
  };

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (event) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowLeft') changePhoto(-1);
      if (event.key === 'ArrowRight') changePhoto(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightbox]);

  return (
    <Section id="milestones" title="12 MONTHS OF PURE HAPPINESS">
      <div className="milestone-grid">
        {months.map((month) => (
          <MonthCard
            key={month}
            month={month}
            caption={MILESTONE_CAPTIONS[month - 1]}
            images={getImages(month)}
            onOpen={openPhoto}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="milestone-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="milestone-lightbox-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" onClick={() => setLightbox(null)}>
                <X size={23} />
              </button>
              <img
                src={lightbox.images[lightbox.index]}
                alt={`Month ${lightbox.month} photo ${lightbox.index + 1}`}
              />
              <p>Month {lightbox.month} · Photo {lightbox.index + 1} of {lightbox.images.length}</p>
              {lightbox.images.length > 1 && (
                <>
                  <button type="button" onClick={() => changePhoto(-1)}>
                    <ChevronLeft />
                  </button>
                  <button type="button" onClick={() => changePhoto(1)}>
                    <ChevronRight />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .milestone-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          max-width: 1100px;
          padding: 0;
          margin: 30px auto;
          list-style: none;
        }
        .milestone-card {
          min-width: 0;
          padding: 15px;
          border: 1px solid #e9deca;
          border-radius: 12px;
          background: #fffdf8;
          box-shadow: 0 8px 25px rgba(105,86,62,.06);
        }
        .milestone-card-top {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 14px;
        }
        .milestone-number {
          color: #b99a65;
          font: 26px Georgia, serif;
        }
        .milestone-card-heading { flex: 1; min-width: 0; }
        .milestone-kicker {
          color: #ad9978;
          font-size: 8px;
          letter-spacing: .16em;
        }
        .milestone-card-heading h3 {
          margin: 3px 0 0;
          color: #705b41;
          font: 400 17px Georgia, serif;
        }
        .milestone-heart { color: #c1a675; }
        .milestone-photo-shell {
          position: relative;
          width: 100%;
          overflow: hidden;
          border: 1px solid #eee3d1;
          background: #f8f2e8;
        }
        .milestone-photo-stage {
          display: grid;
          place-items: center;
          width: 100%;
          height: 290px;
          padding: 9px;
          background: #f8f2e8;
        }
        .milestone-photo-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
        .milestone-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          height: 100%;
          color: #a88f68;
          background: #f4ead9;
          text-align: center;
        }
        .milestone-placeholder-title { font: italic 15px Georgia, serif; }
        .milestone-placeholder-subtitle { color: #a89579; font-size: 10px; }
        .milestone-photo-arrow {
          position: absolute;
          top: 50%;
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border: 1px solid #e6d6b9;
          border-radius: 50%;
          color: #8f754e;
          background: rgba(255,253,248,.95);
          transform: translateY(-50%);
        }
        .milestone-photo-arrow.previous { left: 9px; }
        .milestone-photo-arrow.next { right: 9px; }
        .milestone-photo-count {
          position: absolute;
          right: 10px;
          bottom: 10px;
          padding: 5px 9px;
          border-radius: 20px;
          color: white;
          background: rgba(80,65,46,.65);
          font-size: 10px;
        }
        .milestone-dots {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }
        .milestone-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e5d9c5;
        }
        .milestone-dot.active {
          width: 18px;
          border-radius: 10px;
          background: #b99a65;
        }
        .milestone-card-caption { margin-top: 14px; text-align: center; }
        .milestone-card-caption p {
          margin: 0;
          color: #806d54;
          font: 13px/1.6 Georgia, serif;
        }
        .milestone-card-caption span {
          display: block;
          margin-top: 7px;
          color: #b3a287;
          font-size: 9px;
        }
        .milestone-lightbox {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(35,29,22,.92);
          backdrop-filter: blur(9px);
        }
        .milestone-lightbox-content {
          position: relative;
          width: min(90vw, 650px);
          padding: 12px;
          border: 1px solid #d7c29d;
          background: #fffdf8;
        }
        .milestone-lightbox-content img {
          display: block;
          width: 100%;
          height: min(72vh, 650px);
          object-fit: contain;
          background: #f8f2e8;
        }
        .milestone-lightbox-content p {
          color: #927950;
          font: 12px Georgia, serif;
          text-align: center;
        }
        @media (max-width: 850px) {
          .milestone-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
          .milestone-photo-stage { height: 260px; }
        }
        @media (max-width: 560px) {
          .milestone-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 17px;
            padding: 0 10px;
          }
          .milestone-card { padding: 13px; }
          .milestone-photo-stage { height: clamp(250px, 78vw, 390px); }
          .milestone-card-heading h3 { font-size: 18px; }
          .milestone-card-caption p { font-size: 14px; }
        }
      `}</style>
    </Section>
  );
}