import { circle, icon, nudge, part, path, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'mail',
  aliases: ['mail-filled'],
  category: 'communication',
  keywords: ['mail', 'email', 'envelope', 'letter', 'message', 'inbox', 'courrier', 'enveloppe'],
  gesture: 'The envelope lifts and its seal pops.',
  draw: [
    part(
      'envelope',
      raised(rect(12, 24, 72, 50, 10, 'base')),
      // The flap, folded down to the middle.
      raised.small(path('M22 24H74A10 10 0 0 1 82 29L53 52A8 8 0 0 1 43 52L14 29A10 10 0 0 1 22 24Z', 'main')),
      part('seal', raised.small(circle(48, 53, 6.5, 'accent'))),
    ),
  ],
  motion: {
    envelope: nudge({ y: -5, settle: true, duration: 550 }),
    seal: pop({ duration: 450, delay: 200 }),
  },
});
