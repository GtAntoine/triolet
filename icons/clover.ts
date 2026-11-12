import { circle, icon, inset, part, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'clover',
  category: 'social',
  keywords: ['clover', 'luck', 'lucky', 'shamrock', 'leaf', 'fortune', 'trèfle', 'chance'],
  gesture: 'The clover turns by one leaf.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    inset(stroke('M49 50C51 62 57 68 64 72', 'main', 4.5)),
    part(
      'leaves',
      inset(circle(38, 36, 11.5, 'main'), circle(58, 36, 11.5, 'main'), circle(38, 56, 11.5, 'main'), circle(58, 56, 11.5, 'main')),
      inset(circle(48, 46, 5.5, 'accent')),
    ),
  ],
  motion: {
    leaves: spin({ from: -90, duration: 700, pivot: [48, 46] }),
  },
});
