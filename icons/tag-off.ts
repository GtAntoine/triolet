import { circle, icon, inset, part, path, pill, plain, pop, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'tag-off',
  aliases: ['aucune-revente'],
  category: 'security',
  keywords: ['no resale', 'price tag', 'forbidden', 'not for sale', 'privacy', 'ban', 'étiquette', 'interdit'],
  gesture: 'The no-entry sign closes on the price tag.',
  draw: [
    raised(path('M14 44L42 16H70A8 8 0 0 1 78 24V52L50 80A8 8 0 0 1 38.7 80L14 55.3A8 8 0 0 1 14 44Z', 'base')),
    inset(circle(62, 32, 6, 'soft')),
    inset(pill(31, 50, 22, 6, 'mid', { rotate: [-45, 42, 53] })),
    part(
      'ban',
      plain(circle(67, 67, 21, 'gap')),
      raised.small(ring(67, 67, 14.5, 'accent', 5.5), stroke('M56.7 77.3L77.3 56.7', 'accent', 5.5)),
    ),
  ],
  motion: {
    ban: pop({ duration: 500 }),
  },
});
