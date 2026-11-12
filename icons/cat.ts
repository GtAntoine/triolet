import { ellipse, icon, inset, part, path, pill, raised, tracks } from '@triolet/core';

export default icon({
  name: 'cat',
  category: 'social',
  keywords: ['cat', 'pet', 'animal', 'kitten', 'feline', 'meow', 'chat', 'animal de compagnie'],
  gesture: 'The cat blinks.',
  draw: [
    // The two ears, behind the head.
    raised(path('M20 42L22 18L44 30Z', 'main', { outline: 4 }), path('M76 42L74 18L52 30Z', 'main', { outline: 4 })),
    raised(ellipse(48, 54, 33, 27, 'base')),
    part('eyes', inset(pill(33, 44, 8, 13, 'main'), pill(55, 44, 8, 13, 'main'))),
    // The nose is the accent.
    raised.small(path('M43.5 60H52.5L48 65.5Z', 'accent', { outline: 3 })),
    inset(pill(18, 60, 13, 3.5, 'mid'), pill(65, 60, 13, 3.5, 'mid')),
  ],
  motion: {
    eyes: tracks({ duration: 700, ease: 'inOut' }, { scaleY: [[0.2, 0.1], [0.4, 1], [0.6, 0.1], [0.8, 1]] }),
  },
});
