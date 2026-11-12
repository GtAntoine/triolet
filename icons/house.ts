import { icon, inset, nudge, part, path, raised, stroke } from '@triolet/core';

export default icon({
  name: 'house',
  aliases: ['reservation', 'home'],
  category: 'places',
  keywords: ['home', 'house', 'room', 'booking', 'venue', 'hall', 'maison', 'salle', 'réservation'],
  gesture: 'The roof lifts and settles back.',
  draw: [
    raised(path('M26 46L48 28L70 46V76A6 6 0 0 1 64 82H32A6 6 0 0 1 26 76Z', 'base')),
    part('door', inset(path('M41 82V67A7 7 0 0 1 55 67V82Z', 'accent'))),
    part('roof', raised(stroke('M17 47L48 21L79 47', 'main', 12))),
  ],
  motion: {
    roof: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
