import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { music, useMusic } from '../audio.js';
export default function MusicPlayer() {
  const { playing, muted } = useMusic();
  const live = playing && !muted;
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full border border-baby/60 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur">
      <button onClick={() => music.toggle()} aria-label={playing ? 'Pause music' : 'Play music'} className="rounded-full p-2 hover:bg-sky">
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button onClick={() => music.mute()} aria-label={muted ? 'Unmute' : 'Mute'} className="rounded-full p-2 hover:bg-sky">
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <div className="flex h-4 items-end gap-0.5 pr-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1 rounded bg-baby" style={{ height: 4, animation: live ? `bar 0.8s ${i * 0.15}s ease-in-out infinite alternate` : 'none' }} />
        ))}
      </div>
      <style>{'@keyframes bar{from{height:4px}to{height:16px}}'}</style>
    </div>
  );
}
