import { circle, icon, inset, part, plain, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'clock',
  category: 'time',
  keywords: ['clock', 'time', 'hour', 'watch', 'schedule', 'duration', 'horloge', 'heure'],
  gesture: 'Time flies: the hour hand goes once around while the minute hand goes twelve times.',
  draw: [
    raised(circle(48, 48, 35, 'main')),
    inset(circle(48, 48, 27, 'base')),
    part('minute-hand', plain(stroke('M48 48V29', 'main', 5))),
    part('hour-hand', plain(stroke('M48 48L60 55', 'accent', 5))),
    plain(circle(48, 48, 4, 'main')),
  ],
  motion: {
    'minute-hand': spin({ turns: 12, duration: 1800, pivot: [48, 48] }),
    'hour-hand': spin({ turns: 1, duration: 1800, pivot: [48, 48] }),
  },
});
