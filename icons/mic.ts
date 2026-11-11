import { blink, circle, icon, inset, part, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'mic',
  category: 'media',
  keywords: ['microphone', 'mic', 'record', 'voice', 'audio', 'speak', 'micro', 'voix'],
  gesture: 'The light of the microphone blinks: it is listening.',
  draw: [
    raised(stroke('M27 44A21 21 0 0 0 69 44M48 66V80M36 82H60', 'main', 6)),
    raised(rect(35, 10, 26, 46, 13, 'base')),
    inset(pill(41, 20, 14, 5, 'mid')),
    inset(pill(41, 29, 14, 5, 'mid')),
    part('light', inset(circle(48, 44, 4.5, 'accent'))),
  ],
  motion: {
    light: blink({ to: 0.15, duration: 350, iterations: 2 }),
  },
});
