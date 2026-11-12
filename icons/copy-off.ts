import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'copy-off',
  category: 'interface',
  keywords: ['copy', 'off', 'disabled', 'no copy', 'protected', 'blocked', 'copie', 'interdit'],
  gesture: 'The bar crosses out the copy.',
  draw: [
    raised(rect(34, 14, 48, 48, 11, 'main')),
    raised(rect(14, 34, 48, 48, 11, 'base')),
    inset(pill(24, 62, 28, 8, 'mid')),
    part('bar', plain(stroke('M18 80L78 18', 'gap', 12)), raised.small(stroke('M18 80L78 18', 'accent', 6))),
  ],
  motion: {
    bar: draw({ duration: 450 }),
  },
});
