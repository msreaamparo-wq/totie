import Hero from './sections/Hero.jsx';
import Invitation from './sections/Invitation.jsx';
import Milestones from './sections/Milestones.jsx';
import Gallery from './sections/Gallery.jsx';
import Countdown from './sections/Countdown.jsx';
import Rsvp from './sections/Rsvp.jsx';
import Closing from './sections/Closing.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
export default function App() {
  return (<><Hero /><main><Invitation /><Milestones /><Gallery /><Countdown /><Rsvp /><Closing /></main><MusicPlayer /></>);
}
