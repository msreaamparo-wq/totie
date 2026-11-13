import { Camera } from 'lucide-react';
export default function Photo({ src, alt, className = '' }) {
  return src
    ? <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
    : <div className={`grid h-full w-full place-items-center bg-gradient-to-br from-sky to-sun/60 text-ink/40 ${className}`} role="img" aria-label={alt + ' (placeholder)'}><Camera size={32} /></div>;
}
