import { circle, draw, icon, inset, part, path, plain, pop, raised, stroke } from '@triolet/core';

export default icon({
  name: 'map',
  category: 'places',
  keywords: ['map', 'route', 'directions', 'travel', 'location', 'navigation', 'carte', 'itinéraire'],
  gesture: 'The route draws itself to the pin.',
  draw: [
    raised(path('M12 26L36 18L60 26L84 18V70L60 78L36 70L12 78Z', 'base', { outline: 3 })),
    inset(path('M36 20L60 28V76L36 68Z', 'soft')),
    part('route', plain(stroke('M22 62C30 52 40 62 48 52C55 44 60 48 68 40', 'main', 7))),
    part('pin', raised.small(circle(70, 36, 6.5, 'accent'))),
  ],
  motion: {
    route: draw({ duration: 600 }),
    pin: pop({ scale: 1.4, duration: 400, delay: 550 }),
  },
});
