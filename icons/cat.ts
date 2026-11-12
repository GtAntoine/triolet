import { circle, ellipse, icon, inset, part, path, pill, plain, raised, rect, tracks } from '@triolet/core';

export default icon({
  name: 'cat',
  category: 'social',
  keywords: ['cat', 'pet', 'animal', 'kitten', 'feline', 'meow', 'chat', 'animal de compagnie'],
  gesture: 'The cat blinks.',
  draw: [
    // The two pointed ears, dark, behind the head.
    raised.small(path('M16 46L18 12A4 4 0 0 1 24 9L44 30Z', 'main', { outline: 4 }), path('M80 46L78 12A4 4 0 0 0 72 9L52 30Z', 'main', { outline: 4 })),
    // The head: a soft rounded square.
    raised(rect(14, 30, 68, 52, 26, 'base')),
    // The big eyes and their shine.
    part('eyes', plain(circle(34, 52, 7.5, 'main'), circle(62, 52, 7.5, 'main'), circle(36, 50, 2.4, 'on'), circle(64, 50, 2.4, 'on'))),
    // The muzzle, with the nose: the accent.
    inset(ellipse(48, 68, 12, 8.5, 'soft')),
    raised.small(path('M44 62H52L48 67Z', 'accent', { outline: 2.5 })),
    inset(pill(16, 66, 13, 3.5, 'main'), pill(67, 66, 13, 3.5, 'main')),
  ],
  motion: {
    eyes: tracks({ duration: 700, ease: 'inOut' }, { scaleY: [[0.2, 0.1], [0.4, 1], [0.6, 0.1], [0.8, 1]] }),
  },
});
