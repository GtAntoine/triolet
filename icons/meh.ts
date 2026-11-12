import { circle, icon, inset, part, plain, raised, stroke, tracks } from '@triolet/core';

export default icon({
  name: 'meh',
  category: 'social',
  keywords: ['meh', 'neutral', 'face', 'emoji', 'indifferent', 'so-so', 'bof', 'neutre'],
  gesture: 'The face blinks, unimpressed.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    inset(circle(28, 56, 5.5, 'accent'), circle(68, 56, 5.5, 'accent')),
    part('eyes', inset(circle(37, 42, 6.5, 'main'), circle(59, 42, 6.5, 'main'))),
    plain(stroke('M35 62H61', 'main', 6.5)),
  ],
  motion: {
    eyes: tracks({ duration: 500 }, { scaleY: [[0.4, 0.15], [0.6, 0.15]] }),
  },
});
