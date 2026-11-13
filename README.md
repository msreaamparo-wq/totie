# Shaun Matthew Inson – First Birthday Invitation

React + Vite + Tailwind CSS + Framer Motion + React Three Fiber (Three.js) + Lucide.

## Run locally
Requires Node 18+.
```
npm install
npm run dev      # open the printed local address
npm run build    # production build in /dist
```

## Change the details
Everything is in `src/config.js`: name, date and time (`startsAt`, keep `+08:00` for Philippine Time), venue, RSVP email, photos, milestone captions.

## Photos
Put images in `public/images/` and list them in `config.js` (e.g. `'/images/photo1.jpg'`). Empty entries show a placeholder. Add or remove entries in `photos` to change the gallery size.

## Music
Default: a built-in original melody, started only after the visitor clicks. To use your own file, put it in `public/music/` and set `musicFile: '/music/birthday.mp3'`.

## RSVP
There is no backend. If `rsvpEmail` is set, the form opens the guest’s email app with the reply. If empty, it shows the reply to copy and send. Nothing is stored.

## 3D
Cake, bear, balloons and stars are built in code, so `public/models/` is empty. If WebGL is unavailable, an emoji fallback is shown.
