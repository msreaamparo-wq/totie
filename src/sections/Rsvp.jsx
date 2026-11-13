import { useState } from 'react';
import { Send } from 'lucide-react';
import Section from '../components/Section.jsx';
import { CONFIG } from '../config.js';
const field = 'w-full rounded-xl border border-baby bg-white px-4 py-3';
export default function Rsvp() {
  const [msg, setMsg] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const text = `RSVP for ${CONFIG.name}’s 1st Birthday\nName: ${f.name}\nGuests: ${f.guests}\nAttending: ${f.attend}\nMessage: ${f.note || '-'}`;
    if (CONFIG.rsvpEmail) window.location.href = `mailto:${CONFIG.rsvpEmail}?subject=${encodeURIComponent('RSVP – ' + f.name)}&body=${encodeURIComponent(text)}`;
    else setMsg(text);
  };
  return (
    <Section id="rsvp" title="RSVP">
      <form onSubmit={submit} className="mx-auto grid max-w-lg gap-4 rounded-3xl bg-white p-6 shadow-lg sm:p-8">
        <label className="grid gap-1 font-medium">Guest name<input required name="name" className={field} autoComplete="name" /></label>
        <label className="grid gap-1 font-medium">Number of guests<input required name="guests" type="number" min="1" max="20" defaultValue="1" className={field} /></label>
        <label className="grid gap-1 font-medium">Will you attend?
          <select name="attend" className={field}><option>Yes, I will be there!</option><option>Sorry, I can’t make it</option></select>
        </label>
        <label className="grid gap-1 font-medium">Message (optional)<textarea name="note" rows="3" className={field} /></label>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-ink/90"><Send size={18} /> Send RSVP</button>
        {msg && <div role="status" className="rounded-xl bg-sun/50 p-4 text-sm">
          <p className="font-semibold">This page has no server, so nothing was saved or sent. Copy this and send it to the family:</p>
          <pre className="mt-2 whitespace-pre-wrap font-sans">{msg}</pre>
        </div>}
      </form>
    </Section>
  );
}
