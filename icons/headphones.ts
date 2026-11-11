import { circle, icon, inset, part, pop, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'headphones',
  category: 'media',
  keywords: ['headphones', 'audio', 'listen', 'music', 'headset', 'support', 'casque', 'écouter'],
  gesture: 'The two ear cups pulse with the sound.',
  draw: [
    raised(stroke('M21 54V46A27 27 0 0 1 75 46V54', 'main', 7)),
    part('cup-left', raised(rect(12, 50, 20, 32, 9, 'base')), inset(circle(22, 66, 4.5, 'accent'))),
    part('cup-right', raised(rect(64, 50, 20, 32, 9, 'base')), inset(circle(74, 66, 4.5, 'accent'))),
  ],
  motion: {
    ...stagger(['cup-left', 'cup-right'], pop({ scale: 1.12, duration: 450 }), 150),
  },
});
