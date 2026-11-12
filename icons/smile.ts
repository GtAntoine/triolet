import { circle, draw, icon, inset, part, plain, raised, stroke, tracks } from '@triolet/core';

export default icon({
  name: 'smile',
  category: 'social',
  keywords: ['smile', 'happy', 'emoji', 'face', 'mood', 'satisfaction', 'sourire', 'content'],
  gesture: 'The face blinks and smiles.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    inset(circle(29, 55, 4, 'accent'), circle(67, 55, 4, 'accent')),
    part('eyes', inset(circle(37, 41, 5, 'main'), circle(59, 41, 5, 'main'))),
    part('mouth', plain(stroke('M35 57A14 13 0 0 0 61 57', 'main', 5))),
  ],
  motion: {
    eyes: tracks({ duration: 400 }, { scaleY: [[0.4, 0.15], [0.6, 0.15]] }),
    mouth: draw({ duration: 500, delay: 300 }),
  },
});
