import { circle, icon, inset, part, path, pill, plain, pop, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'tag-off',
  aliases: ['aucune-revente'],
  category: 'security',
  keywords: ['no resale', 'price tag', 'forbidden', 'not for sale', 'privacy', 'ban', 'étiquette', 'interdit'],
  gesture: 'The no-entry sign closes on the price tag.',
  draw: [
    raised(path('M14 44L42 16H70A8 8 0 0 1 78 24V52L50 80A8 8 0 0 1 38.7 80L14 55.3A8 8 0 0 1 14 44Z', 'base')),
    inset(circle(62, 32, 6, 'main')),
    inset(pill(29, 49.5, 26, 7, 'main', { rotate: [-45, 42, 53] })),
    inset(pill(25, 40.5, 18, 7, 'main', { rotate: [-45, 34, 44] })),
    part(
      'ban',
      plain(circle(67, 67, 18, 'gap')),
      raised.small(ring(67, 67, 12.5, 'accent', 4), stroke('M58.2 75.8L75.8 58.2', 'accent', 4)),
    ),
  ],
  motion: {
    ban: pop({ duration: 500 }),
  },
});
