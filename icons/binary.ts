import { blink, icon, part, plain, raised, rect, stagger, stroke } from '@triolet/core';

const ZERO = (x: number, y: number) => `M${x} ${y + 5}A5.5 5.5 0 0 1 ${x + 11} ${y + 5}V${y + 11}A5.5 5.5 0 0 1 ${x} ${y + 11}Z`;

export default icon({
  name: 'binary',
  category: 'development',
  keywords: ['binary', 'code', 'bits', 'data', 'digital', 'zero', 'binaire', 'données'],
  gesture: 'The four digits flicker one after the other.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    part('digit-1', plain(stroke('M35 28V44M31 31L35 28', 'main', 5))),
    part('digit-2', plain(stroke(ZERO(52, 28), 'main', 5))),
    part('digit-3', plain(stroke(ZERO(30, 52), 'accent', 5))),
    part('digit-4', plain(stroke('M58 52V68M54 55L58 52', 'main', 5))),
  ],
  motion: {
    ...stagger(['digit-1', 'digit-2', 'digit-3', 'digit-4'], blink({ to: 0.15, duration: 350 }), 110),
  },
});
