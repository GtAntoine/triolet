import { circle, icon, inset, part, pill, pop, raised, rect, stroke, swing } from '@triolet/core';

export default icon({
  name: 'radio',
  category: 'media',
  keywords: ['radio', 'broadcast', 'fm', 'station', 'tuner', 'podcast', 'diffusion', 'antenne'],
  gesture: 'The aerial swings and the dial lights up.',
  draw: [
    part('aerial', raised.small(stroke('M28 34L56 14', 'main', 5))),
    raised(rect(12, 32, 72, 48, 10, 'base')),
    inset(circle(34, 56, 14, 'main')),
    inset(pill(56, 62, 20, 7, 'mid')),
    part('dial', inset(circle(66, 47, 6, 'accent'))),
  ],
  motion: {
    aerial: swing({ angles: [10, -6], pivot: 'bottom-left', duration: 600 }),
    dial: pop({ duration: 400, delay: 200 }),
  },
});
