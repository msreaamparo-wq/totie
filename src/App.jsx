import { useState } from 'react';
import Invitation from './sections/Invitation.jsx';
import Milestones from './sections/Milestones.jsx';
import Gallery from './sections/Gallery.jsx';
import Countdown from './sections/Countdown.jsx';
import Rsvp from './sections/Rsvp.jsx';
import Closing from './sections/Closing.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import { music } from './audio.js';
export default function App() {
  const [celebrationOpen, setCelebrationOpen] = useState(false);

  const openCelebration = () => {
    music.start();
    setCelebrationOpen(true);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  if (!celebrationOpen) return <Invitation onOpen={openCelebration} />;

  return (
    <>
      <main>
        <Milestones />
        <Gallery />
        <Countdown />
        <Rsvp />
        <Closing />
      </main>
      <MusicPlayer />
    </>
  );
}
