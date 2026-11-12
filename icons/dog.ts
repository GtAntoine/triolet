import { circle, ellipse, icon, inset, part, pill, raised, rect, tracks } from '@triolet/core';

export default icon({
  name: 'dog',
  category: 'social',
  keywords: ['dog', 'pet', 'animal', 'puppy', 'canine', 'woof', 'chien', 'animal de compagnie'],
  gesture: 'The dog pants: its tongue goes in and out.',
  draw: [
    raised(rect(24, 14, 48, 66, 23, 'base')),
    // The two ears hang on each side of the head.
    raised.small(pill(12, 18, 21, 40, 'main', { rotate: [10, 22, 22] }), pill(63, 18, 21, 40, 'main', { rotate: [-10, 74, 22] })),
    inset(circle(39, 40, 4.5, 'main'), circle(57, 40, 4.5, 'main')),
    // The tongue, under the nose: the accent.
    part('tongue', raised.small(pill(42.5, 58, 11, 16, 'accent'))),
    raised.small(ellipse(48, 56, 8.5, 6, 'main')),
  ],
  motion: {
    tongue: tracks({ duration: 800, ease: 'inOut', pivot: 'top' }, { scaleY: [[0.2, 0.6], [0.4, 1], [0.6, 0.6], [0.8, 1]] }),
  },
});
