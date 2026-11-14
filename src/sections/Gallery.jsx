
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  X,
} from 'lucide-react';
import Section from '../components/Section.jsx';
import { CONFIG } from '../config.js';

const captions = [
  'The beginning of a beautiful little story.',
  'A smile that makes every day brighter.',
  'Little moments, endless happiness.',
  'Growing up surrounded by love.',
  'Our favorite little sunshine.',
  'One little boy, a whole lot of love.',
];

export default function Gallery() {
  const photos = CONFIG.photos || [];
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const total = photos.length;

  const previous = () => {
    setActive((current) => (current - 1 + total) % total);
  };

  const next = () => {
    setActive((current) => (current + 1) % total);
  };

  useEffect(() => {
    if (!viewer) return;

    const handleKey = (event) => {
      if (event.key === 'Escape') setViewer(false);
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [viewer, total]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: y * -5,
      y: x * 5,
    });
  };

  const resetRotation = () => setRotation({ x: 0, y: 0 });

  if (!total) return null;

  const currentPhoto = photos[active];
  const currentCaption = captions[active % captions.length];

  return (
    <Section id="gallery" title="">
      <div className="little-world">
        <style>{`
          .little-world {
            --ivory: #fffdf8;
            --cream: #f8f2e8;
            --champagne: #ead9bd;
            --gold: #b99a65;
            --dark-gold: #92784e;
            --brown: #69563e;
            position: relative;
            width: 100%;
            padding: 30px 0 45px;
            overflow: hidden;
            color: var(--brown);
          }

          .little-world * {
            box-sizing: border-box;
          }

          .lw-heading {
            position: relative;
            z-index: 1;
            text-align: center;
            margin-bottom: 35px;
          }

          .lw-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: var(--dark-gold);
            font-size: 9px;
            font-weight: 600;
            letter-spacing: .3em;
            text-transform: uppercase;
          }

          .lw-heading h2 {
            margin: 14px 0 9px;
            color: #705a40;
            font-family: Georgia, 'Times New Roman', serif;
            font-size: clamp(38px, 6vw, 62px);
            font-weight: 400;
            letter-spacing: -.045em;
            line-height: 1.1;
          }

          .lw-heading h2 em {
            color: var(--gold);
            font-weight: 400;
          }

          .lw-heading p {
            margin: 0 auto;
            color: #a59680;
            font-family: Georgia, serif;
            font-size: 14px;
            font-style: italic;
            line-height: 1.8;
          }

          .lw-decoration {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-top: 20px;
            color: var(--gold);
          }

          .lw-decoration span {
            width: 45px;
            height: 1px;
            background: #ddcba9;
          }

          .lw-gallery {
            position: relative;
            width: 100%;
            max-width: 650px;
            margin: 0 auto;
          }

          .lw-gallery::before {
            content: '';
            position: absolute;
            width: 85%;
            height: 75%;
            left: 7.5%;
            top: 12%;
            border-radius: 50%;
            background: radial-gradient(
              ellipse,
              rgba(226, 207, 171, .28),
              transparent 70%
            );
            filter: blur(18px);
            pointer-events: none;
          }

          .lw-feature-area {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 470px;
            perspective: 1200px;
          }

          .lw-frame {
            position: relative;
            width: min(78%, 355px);
            padding: 12px 12px 0;
            background: linear-gradient(145deg, #fffefa, #f7efdf);
            border: 1px solid rgba(185, 154, 101, .38);
            box-shadow:
              0 30px 65px rgba(95, 74, 43, .15),
              0 8px 20px rgba(95, 74, 43, .07),
              inset 0 0 0 3px rgba(255,255,255,.8);
            transform-style: preserve-3d;
            transition: transform .25s ease;
          }

          .lw-frame::before {
            content: '';
            position: absolute;
            inset: 6px;
            border: 1px solid rgba(185, 154, 101, .15);
            pointer-events: none;
          }

          .lw-image {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 4.65;
            overflow: hidden;
            background: linear-gradient(145deg, #f4ead8, #e8dac2);
          }

          .lw-image img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .8s cubic-bezier(.2,.7,.2,1);
          }

          .lw-frame:hover .lw-image img {
            transform: scale(1.035);
          }

          .lw-placeholder {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 13px;
            width: 100%;
            height: 100%;
            color: #a78e65;
            background:
              radial-gradient(circle at 50% 40%, #fffdf8, transparent 55%),
              linear-gradient(145deg, #f3e8d5, #e8dac2);
          }

          .lw-placeholder-icon {
            display: grid;
            place-items: center;
            width: 68px;
            height: 68px;
            border: 1px solid rgba(167,142,101,.45);
            border-radius: 50%;
          }

          .lw-placeholder span {
            font-family: Georgia, serif;
            font-size: 15px;
            font-style: italic;
          }

          .lw-placeholder small {
            font-size: 8px;
            letter-spacing: .2em;
          }

          .lw-frame-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 53px;
            padding: 0 6px;
            color: #a48b62;
          }

          .lw-frame-footer span {
            font-size: 8px;
            font-weight: 600;
            letter-spacing: .18em;
          }

          .lw-frame-footer strong {
            color: #94764c;
            font-family: Georgia, serif;
            font-size: 13px;
            font-weight: 400;
            font-style: italic;
          }

          .lw-open {
            position: absolute;
            right: -15px;
            bottom: 72px;
            display: grid;
            place-items: center;
            width: 43px;
            height: 43px;
            border: 1px solid rgba(185,154,101,.45);
            border-radius: 50%;
            color: #94764c;
            background: #fffdf8;
            box-shadow: 0 8px 20px rgba(95,74,43,.12);
            transition: .25s ease;
          }

          .lw-open:hover {
            color: white;
            background: var(--gold);
            transform: scale(1.08);
          }

          .lw-caption {
            position: relative;
            z-index: 1;
            min-height: 65px;
            margin: 0 auto 25px;
            padding: 0 15px;
            text-align: center;
          }

          .lw-caption p {
            margin: 0;
            color: #806b4e;
            font-family: Georgia, serif;
            font-size: clamp(15px, 2vw, 18px);
            font-style: italic;
          }

          .lw-caption small {
            display: block;
            margin-top: 9px;
            color: #b4a185;
            font-size: 8px;
            letter-spacing: .2em;
            text-transform: uppercase;
          }

          .lw-thumbnails {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 11px;
            margin: 0 auto;
            padding: 15px 12px;
          }

          .lw-thumb {
            position: relative;
            width: 62px;
            height: 76px;
            padding: 4px;
            border: 1px solid #e7d8bd;
            background: #fffdf8;
            box-shadow: 0 5px 12px rgba(95,74,43,.06);
            opacity: .65;
            transition: .3s ease;
            cursor: pointer;
          }

          .lw-thumb img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .lw-thumb.active {
            opacity: 1;
            border: 1px solid var(--gold);
            transform: translateY(-7px);
            box-shadow: 0 10px 22px rgba(95,74,43,.14);
          }

          .lw-thumb:hover {
            opacity: 1;
            transform: translateY(-5px);
          }

          .lw-thumb-placeholder {
            display: grid;
            place-items: center;
            width: 100%;
            height: 100%;
            color: #b39a71;
            background: #f1e7d6;
          }

          .lw-navigation {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 22px;
            margin-top: 18px;
          }

          .lw-nav-button {
            display: grid;
            place-items: center;
            width: 39px;
            height: 39px;
            border: 1px solid #d9c6a5;
            border-radius: 50%;
            color: #95794e;
            background: #fffdf8;
            transition: .25s ease;
          }

          .lw-nav-button:hover {
            color: white;
            background: var(--gold);
            border-color: var(--gold);
          }

          .lw-count {
            display: flex;
            align-items: baseline;
            gap: 5px;
            color: #a48d68;
            font-family: Georgia, serif;
          }

          .lw-count strong {
            color: #735d40;
            font-size: 21px;
            font-weight: 400;
          }

          .lw-count span {
            font-size: 12px;
          }

          .lw-bottom {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            margin-top: 32px;
            color: #a58c65;
            font-family: Georgia, serif;
            font-size: 12px;
            font-style: italic;
          }

          .lw-bottom svg {
            color: #c1a16b;
          }

          .lw-viewer {
            position: fixed;
            inset: 0;
            z-index: 100;
            display: grid;
            place-items: center;
            padding: 20px;
            background: rgba(36, 29, 21, .93);
            backdrop-filter: blur(12px);
          }

          .lw-viewer-content {
            position: relative;
            width: min(90vw, 520px);
            padding: 12px 12px 0;
            background: #fffdf8;
            box-shadow: 0 25px 80px rgba(0,0,0,.35);
          }

          .lw-viewer-content img {
            display: block;
            width: 100%;
            max-height: 72vh;
            object-fit: contain;
            background: #eee4d3;
          }

          .lw-viewer-close,
          .lw-viewer-arrow {
            position: absolute;
            z-index: 2;
            display: grid;
            place-items: center;
            width: 42px;
            height: 42px;
            border: 1px solid rgba(255,255,255,.4);
            border-radius: 50%;
            color: white;
            background: rgba(255,255,255,.13);
            backdrop-filter: blur(8px);
          }

          .lw-viewer-close {
            top: -52px;
            right: 0;
          }

          .lw-viewer-arrow {
            top: 48%;
          }

          .lw-viewer-arrow.left {
            left: -58px;
          }

          .lw-viewer-arrow.right {
            right: -58px;
          }

          .lw-viewer-label {
            padding: 15px 5px;
            color: #9c835b;
            font-family: Georgia, serif;
            font-size: 12px;
            font-style: italic;
            text-align: center;
          }

          @media (max-width: 640px) {
            .little-world {
              padding-top: 15px;
            }

            .lw-heading {
              margin-bottom: 18px;
            }

            .lw-feature-area {
              min-height: 390px;
            }

            .lw-frame {
              width: min(78%, 300px);
            }

            .lw-thumbnails {
              gap: 8px;
            }

            .lw-thumb {
              width: 49px;
              height: 62px;
            }

            .lw-viewer-arrow.left {
              left: 5px;
            }

            .lw-viewer-arrow.right {
              right: 5px;
            }

            .lw-viewer-content {
              width: min(85vw, 420px);
            }
          }
        `}</style>

        <div className="lw-heading">
          <div className="lw-eyebrow">
            <Sparkles size={12} />
            A collection of little moments
            <Sparkles size={12} />
          </div>

          <h2>
            My Little <em>World</em>
          </h2>

          <p>
            A little album filled with the moments
            <br />
            that make our hearts happiest.
          </p>

          <div className="lw-decoration">
            <span />
            <Heart size={13} fill="currentColor" />
            <span />
          </div>
        </div>

        <div className="lw-gallery">
          <div className="lw-feature-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="lw-frame"
                initial={{ opacity: 0, y: 22, scale: 0.96, rotateY: -8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateY: rotation.y,
                  rotateX: rotation.x,
                }}
                exit={{ opacity: 0, y: -15, scale: 0.97 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetRotation}
              >
                <button
                  type="button"
                  onClick={() => setViewer(true)}
                  className="block w-full text-left"
                  aria-label="Open featured memory"
                >
                  <div className="lw-image">
                    {currentPhoto ? (
                      <img src={currentPhoto} alt={`Shaun Matthew memory ${active + 1}`} />
                    ) : (
                      <div className="lw-placeholder">
                        <div className="lw-placeholder-icon">
                          <Heart size={27} strokeWidth={1.2} />
                        </div>
                        <span>A precious little memory</span>
                        <small>Photo {String(active + 1).padStart(2, '0')}</small>
                      </div>
                    )}
                  </div>

                  <div className="lw-frame-footer">
                    <span>SHAUN MATTHEW · {String(active + 1).padStart(2, '0')}</span>
                    <strong>With love</strong>
                  </div>
                </button>

                <button
                  type="button"
                  className="lw-open"
                  onClick={() => setViewer(true)}
                  aria-label="View photo fullscreen"
                >
                  <Sparkles size={17} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lw-caption">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p>“{currentCaption}”</p>
                <small>A little story of love</small>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lw-thumbnails">
            {photos.map((photo, index) => (
              <button
                type="button"
                key={index}
                className={`lw-thumb ${active === index ? 'active' : ''}`}
                onClick={() => setActive(index)}
                aria-label={`Show memory ${index + 1}`}
                aria-pressed={active === index}
              >
                {photo ? (
                  <img src={photo} alt="" />
                ) : (
                  <div className="lw-thumb-placeholder">
                    <Heart size={15} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="lw-navigation">
            <button
              type="button"
              className="lw-nav-button"
              onClick={previous}
              aria-label="Previous photo"
            >
              <ChevronLeft size={19} />
            </button>

            <div className="lw-count">
              <strong>{String(active + 1).padStart(2, '0')}</strong>
              <span>/ {String(total).padStart(2, '0')}</span>
            </div>

            <button
              type="button"
              className="lw-nav-button"
              onClick={next}
              aria-label="Next photo"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div className="lw-bottom">
          <Heart size={12} fill="currentColor" />
          Made of little moments and endless love
          <Heart size={12} fill="currentColor" />
        </div>
      </div>

      <AnimatePresence>
        {viewer && (
          <motion.div
            className="lw-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewer(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <motion.div
              className="lw-viewer-content"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="lw-viewer-close"
                onClick={() => setViewer(false)}
                aria-label="Close viewer"
              >
                <X size={20} />
              </button>

              {currentPhoto ? (
                <img src={currentPhoto} alt={`Shaun Matthew memory ${active + 1}`} />
              ) : (
                <div className="lw-placeholder" style={{ aspectRatio: '4 / 5' }}>
                  <Heart size={32} />
                  <span>A precious little memory</span>
                </div>
              )}

              <div className="lw-viewer-label">
                {captions[active % captions.length]}
              </div>

              <button
                type="button"
                className="lw-viewer-arrow left"
                onClick={previous}
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                className="lw-viewer-arrow right"
                onClick={next}
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
