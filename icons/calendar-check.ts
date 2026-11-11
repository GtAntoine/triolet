import { circle, icon, inset, part, path, pill, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'calendar-check',
  category: 'time',
  keywords: ['calendar', 'date', 'done', 'event', 'confirmed', 'booked', 'agenda', 'validé'],
  gesture: 'The check badge pops on the calendar.',
  draw: [
    // Body: a light square, 64 wide (the square keyline), with a band of the main colour on top.
    raised(rect(16, 20, 64, 60, 12, 'base'), path('M28 20H68A12 12 0 0 1 80 32V38H16V32A12 12 0 0 1 28 20Z', 'main')),
    // Recessed details in the light body.
    inset(pill(26, 48, 28, 7, 'mid')),
    inset(pill(26, 61, 18, 7, 'mid')),
    // The badge: gap, accent disc, ink. It is the part that moves.
    part('badge', plain(circle(66, 66, 17, 'gap')), raised.small(circle(66, 66, 14, 'accent')), plain(stroke('M59.5 66.5L64.5 71.5L73 62', 'on', 4))),
  ],
  motion: {
    badge: pop(),
  },
});
