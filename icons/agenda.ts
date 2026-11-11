import { circle, icon, inset, part, plain, raised, spin, stroke } from '@triolet/core';
import { calendar } from './_shared.ts';

export default icon({
  name: 'agenda',
  category: 'time',
  keywords: ['calendar', 'schedule', 'clock', 'event', 'date', 'time', 'calendrier', 'horaire'],
  gesture: 'The hand goes once around the clock.',
  draw: [
    calendar(12, 18, 62, 60),
    [49, 64].flatMap((cy) => [27, 42, 57].map((cx) => inset(circle(cx, cy, 5.5, 'soft')))),
    plain(circle(68, 67, 19, 'gap')),
    raised.small(circle(68, 67, 16, 'accent')),
    part('hand', plain(stroke('M68 58V67L74 71', 'on', 3.4))),
  ],
  motion: {
    hand: spin({ pivot: [68, 67] }),
  },
});
