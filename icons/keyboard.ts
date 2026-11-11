import { icon, inset, nudge, part, pill, raised, rect } from '@triolet/core';

const keys = [18, 30.2, 42.4, 54.6, 66.8];

export default icon({
  name: 'keyboard',
  category: 'devices',
  keywords: ['keyboard', 'type', 'keys', 'input', 'shortcut', 'typing', 'clavier', 'touches'],
  gesture: 'A key is pressed.',
  draw: [
    raised(rect(10, 24, 76, 48, 10, 'base')),
    keys.map((x) => inset(rect(x, 32, 9.5, 9, 3, 'main'))),
    keys.map((x, k) => (k === 3 ? part('key', inset(rect(x, 44.5, 9.5, 9, 3, 'accent'))) : inset(rect(x, 44.5, 9.5, 9, 3, 'main')))),
    inset(pill(28, 57, 40, 8, 'mid')),
  ],
  motion: {
    key: nudge({ y: 3, at: 0.35, duration: 350 }),
  },
});
