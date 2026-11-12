import { circle, icon, part, path, pop, raised, stagger, stroke, travel } from '@triolet/core';

export default icon({
  name: 'zap',
  category: 'weather',
  keywords: ['zap', 'lightning', 'bolt', 'energy', 'fast', 'electric', 'éclair', 'énergie'],
  gesture: 'The bolt strikes and sparks fly.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part('bolt', raised.small(path('M53 16L27 51H45L42 80L69 44H51Z', 'main', { outline: 4 }))),
    part('spark-1', raised.small(stroke('M70 22L77 16', 'accent', 5))),
    part('spark-2', raised.small(stroke('M19 76L26 70', 'accent', 5))),
  ],
  motion: {
    bolt: pop({ scale: 1.12, duration: 400 }),
    ...stagger(['spark-1', 'spark-2'], travel({ from: [0, 0], fade: true, duration: 300, delay: 150 }), 120),
  },
});
