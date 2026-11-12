import { circle, icon, part, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'repeat',
  category: 'arrows',
  keywords: ['repeat', 'loop', 'again', 'cycle', 'recurring', 'replay', 'répéter', 'boucle'],
  gesture: 'The two arrows go half a turn round.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'arrows',
      raised.small(stroke('M28 46V42A9 9 0 0 1 37 33H66M59 26L66 33L59 40', 'main', 6)),
      raised.small(stroke('M68 50V54A9 9 0 0 1 59 63H30M37 56L30 63L37 70', 'main', 6)),
    ),
    raised.small(circle(48, 48, 5, 'accent')),
  ],
  motion: {
    arrows: spin({ from: -180, duration: 800, pivot: [48, 48] }),
  },
});
