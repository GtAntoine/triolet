import { bounce, circle, ellipse, icon, inset, part, path, raised, tracks } from '@triolet/core';

export default icon({
  name: 'map-pin',
  category: 'places',
  keywords: ['pin', 'location', 'place', 'address', 'map', 'marker', 'lieu', 'adresse'],
  gesture: 'The pin drops onto the map.',
  draw: [
    part('ground', inset(ellipse(48, 82, 16, 4.5, 'soft'))),
    part('pin', raised(path('M48 80C40 70 24 56 24 38A24 24 0 0 1 72 38C72 56 56 70 48 80Z', 'main')), inset(circle(48, 38, 10, 'accent'))),
  ],
  motion: {
    pin: bounce({ height: 9, duration: 700 }),
    ground: tracks({ duration: 700, ease: 'outSoft' }, { scaleX: [[0.3, 0.7], [0.55, 1], [0.75, 0.9]] }),
  },
});
