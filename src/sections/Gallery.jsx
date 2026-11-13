import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Section from '../components/Section.jsx';
import Photo from '../components/Photo.jsx';
import { CONFIG } from '../config.js';
export default function Gallery() {
  const [open, setOpen] = useState(null);
  const n = CONFIG.photos.length;
  useEffect(() => {
    if (open === null) return;
    const go = (d) => setOpen((o) => (o + d + n) % n);
    const k = (e) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open, n]);
  const step = (e, d) => { e.stopPropagation(); setOpen((o) => (o + d + n) % n); };
  return (
    <Section id="gallery" title="MY LITTLE WORLD">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {CONFIG.photos.map((src, i) => (
          <button key={i} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`} className={`overflow-hidden rounded-3xl shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-xl ${i % 5 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
            <Photo src={src} alt={`Photo ${i + 1}`} />
          </button>
        ))}
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 grid place-items-center bg-ink/90 p-4" onClick={() => setOpen(null)}>
          <div className="aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-3xl" onClick={(e) => e.stopPropagation()}><Photo src={CONFIG.photos[open]} alt={`Photo ${open + 1}`} className="object-contain" /></div>
          <button aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full bg-white p-3"><X /></button>
          <button aria-label="Previous photo" onClick={(e) => step(e, -1)} className="absolute left-4 rounded-full bg-white p-3"><ChevronLeft /></button>
          <button aria-label="Next photo" onClick={(e) => step(e, 1)} className="absolute right-4 rounded-full bg-white p-3"><ChevronRight /></button>
        </div>
      )}
    </Section>
  );
}
