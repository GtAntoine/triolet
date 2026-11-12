import { circle, ellipse, icon, inset, part, path, plain, raised, rect, tracks } from '@triolet/core';

export default icon({
  name: 'dog',
  category: 'social',
  keywords: ['dog', 'pet', 'animal', 'puppy', 'canine', 'woof', 'chien', 'animal de compagnie'],
  gesture: 'The dog pants: its tongue goes in and out.',
  draw: [
    // The two floppy ears, behind the head.
    raised.small(rect(14, 18, 22, 44, 11, 'main', { rotate: [10, 25, 28] }), rect(60, 18, 22, 44, 11, 'main', { rotate: [-10, 71, 28] })),
    // The head: a soft rounded square, a little wider at the cheeks.
    raised(rect(20, 16, 56, 62, 26, 'base')),
    // The eyebrow spots and the eyes, with their shine.
    inset(circle(36, 36, 5, 'mid'), circle(60, 36, 5, 'mid')),
    plain(circle(36, 42, 4.5, 'main'), circle(60, 42, 4.5, 'main'), circle(37.5, 40.5, 1.6, 'on'), circle(61.5, 40.5, 1.6, 'on')),
    // The muzzle, the nose, and the tongue: the accent.
    part('tongue', raised.small(path('M42 66H54V73A6 6 0 0 1 42 73Z', 'accent'))),
    inset(ellipse(48, 58, 14, 10, 'soft')),
    raised.small(ellipse(48, 53, 7, 5, 'main')),
  ],
  motion: {
    tongue: tracks({ duration: 800, ease: 'inOut', pivot: 'top' }, { scaleY: [[0.2, 0.6], [0.4, 1], [0.6, 0.6], [0.8, 1]] }),
  },
});
