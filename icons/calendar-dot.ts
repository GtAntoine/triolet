import { circle, icon, inset, part, pop } from '@triolet/core';
import { calendar } from './_shared.ts';

export default icon({
  name: 'calendar-dot',
  aliases: ['rendez-vous'],
  category: 'time',
  keywords: ['appointment', 'booking', 'calendar', 'slot', 'date', 'meeting', 'rendez-vous', 'créneau'],
  gesture: 'The chosen slot lands in the calendar.',
  draw: [
    calendar(16, 18, 64, 62),
    [50, 66].flatMap((cy) =>
      [32, 48, 64].map((cx) => (cx === 64 && cy === 66 ? part('choice', inset(circle(cx, cy, 5.5, 'accent'))) : inset(circle(cx, cy, 5.5, 'soft')))),
    ),
  ],
  motion: {
    choice: pop({ duration: 500 }),
  },
});
