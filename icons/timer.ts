import { circle, icon, inset, part, path, pill, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'timer',
  category: 'time',
  keywords: ['timer', 'stopwatch', 'countdown', 'chronometer', 'time', 'duration', 'minuteur', 'chronomètre'],
  gesture: 'The hand makes one turn: time is counted.',
  draw: [
    raised.small(pill(40, 8, 16, 9, 'main')),
    raised(circle(48, 54, 31, 'main')),
    inset(circle(48, 54, 24, 'base')),
    inset(path('M48 54V34A20 20 0 0 1 68 54Z', 'accent')),
    part('hand', raised.small(stroke('M48 54V33', 'main', 6))),
  ],
  motion: {
    hand: spin({ turns: 1, duration: 900, pivot: [48, 54], ease: 'inOut' }),
  },
});
