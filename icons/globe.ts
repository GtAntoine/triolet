import { circle, clip, icon, inset, nudge, part, path, pop, raised } from '@triolet/core';

export default icon({
  name: 'globe',
  category: 'places',
  keywords: ['globe', 'world', 'earth', 'internet', 'language', 'international', 'monde', 'planète'],
  gesture: 'The globe turns a little and the place lights up.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The land slides inside the disc.
    clip(
      circle(48, 48, 34, 'base'),
      part(
        'land',
        inset(
          path('M30 22C40 17 50 24 48 34C47 40 40 40 40 48C40 58 34 65 26 59C17 52 19 30 30 22Z', 'main'),
          path('M58 45C66 41 75 47 73 57C71 67 62 73 56 67C52 63 52 49 58 45Z', 'main'),
        ),
      ),
    ),
    part('place', inset(circle(62, 30, 5, 'accent'))),
  ],
  motion: {
    land: nudge({ x: -7, duration: 800, ease: 'inOut' }),
    place: pop({ duration: 450, delay: 300 }),
  },
});
