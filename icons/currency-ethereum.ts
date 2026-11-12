import { circle, icon, inset, nudge, part, path, raised, ring } from '@triolet/core';

export default icon({
  name: 'currency-ethereum',
  aliases: ['ethereum'],
  category: 'finance',
  keywords: ['ethereum', 'crypto', 'eth', 'cryptocurrency', 'blockchain', 'coin', 'cryptomonnaie', 'monnaie'],
  gesture: 'The two halves of the diamond come apart, then close.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    inset(ring(48, 48, 28, 'mid', 3.5)),
    part('top', raised.small(path('M48 22L63 47L48 55L33 47Z', 'main', { outline: 2 }))),
    part('bottom', raised.small(path('M34 54L48 62L62 54L48 74Z', 'accent', { outline: 2 }))),
  ],
  motion: {
    top: nudge({ y: -3, duration: 600, ease: 'inOut' }),
    bottom: nudge({ y: 3, duration: 600, ease: 'inOut' }),
  },
});
