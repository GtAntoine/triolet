import { circle, icon, inset, part, path, raised, travel } from '@triolet/core';

export default icon({
  name: 'mountain',
  category: 'places',
  keywords: ['mountain', 'peak', 'summit', 'hike', 'landscape', 'nature', 'montagne', 'sommet'],
  gesture: 'The sun rises behind the peaks.',
  draw: [
    part('sun', raised.small(circle(70, 26, 10, 'accent'))),
    raised(path('M10 78L38 26L66 78Z', 'base', { outline: 5 })),
    inset(path('M38 28L48 46L42 43L37 48L31 43L28 47Z', 'main')),
    raised(path('M44 78L64 46L84 78Z', 'main', { outline: 5 })),
  ],
  motion: {
    sun: travel({ from: [0, 14], fade: true, duration: 700 }),
  },
});
