import { icon, inset, nudge, part, raised, rect } from '@triolet/core';

const xs = [28, 43, 58];
const ys = [42, 55, 68];

export default icon({
  name: 'calculator',
  category: 'finance',
  keywords: ['calculator', 'compute', 'math', 'numbers', 'budget', 'sum', 'calculatrice', 'calcul'],
  gesture: 'The equals key is pressed.',
  draw: [
    raised(rect(20, 10, 56, 76, 11, 'base')),
    inset(rect(28, 18, 40, 16, 5, 'main')),
    ys.flatMap((y, r) => xs.map((x, c) => (r === 2 && c === 2 ? part('key', inset(rect(x, y, 10, 9, 3, 'accent'))) : inset(rect(x, y, 10, 9, 3, 'mid'))))),
  ],
  motion: {
    key: nudge({ y: 3, at: 0.35, duration: 350 }),
  },
});
