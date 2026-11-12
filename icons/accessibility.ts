import { circle, icon, part, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'accessibility',
  category: 'people',
  keywords: ['accessibility', 'a11y', 'person', 'inclusive', 'universal', 'access', 'accessibilité', 'inclusion'],
  gesture: 'The figure waves its arms.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    raised.small(stroke('M48 43V57M48 57L39 73M48 57L57 73', 'main', 6.5)),
    part('arms', raised.small(stroke('M29 38C40 43 56 43 67 38', 'main', 6.5))),
    raised.small(circle(48, 26, 8.5, 'accent')),
  ],
  motion: {
    arms: swing({ angles: [8, -8, 4, 0], duration: 800, pivot: [48, 42] }),
  },
});
