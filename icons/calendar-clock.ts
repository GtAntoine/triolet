import { circle, icon, inset, part, plain, raised, spin, stroke } from '@triolet/core';
import { calendar } from './_shared.ts';

export default icon({
  name: 'calendar-clock',
  aliases: ['agenda'],
  category: 'time',
  keywords: ['calendar', 'schedule', 'clock', 'event', 'date', 'time', 'calendrier', 'horaire'],
  gesture: 'Time flies: the hour hand goes once around the clock while the minute hand goes twelve times.',
  draw: [
    calendar(12, 18, 62, 60),
    [49, 64].flatMap((cy) => [27, 42, 57].map((cx) => inset(circle(cx, cy, 5.5, 'soft')))),
    plain(circle(68, 67, 19, 'gap')),
    raised.small(circle(68, 67, 16, 'accent')),
    part('minute-hand', plain(stroke('M68 67V58', 'on', 3.4))),
    part('hour-hand', plain(stroke('M68 67L74 71', 'on', 3.4))),
  ],
  motion: {
    // Twelve turns of the minute hand for one of the hour hand, as on a real clock.
    'minute-hand': spin({ turns: 12, duration: 1800, pivot: [68, 67] }),
    'hour-hand': spin({ turns: 1, duration: 1800, pivot: [68, 67] }),
  },
});
