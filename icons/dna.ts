import { icon, part, pill, pop, raised, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'dna',
  category: 'health',
  keywords: ['dna', 'genetics', 'helix', 'biology', 'gene', 'science', 'adn', 'génétique'],
  gesture: 'The rungs of the helix light up from top to bottom.',
  draw: [
    // One strand behind, the rungs, then the strand in front.
    raised.small(stroke('M64 12C64 30 32 32 32 48C32 64 64 66 64 84', 'base', 9)),
    part('rung-1', raised.small(pill(39, 19, 18, 6, 'accent'))),
    part('rung-2', raised.small(pill(39, 71, 18, 6, 'accent'))),
    raised.small(stroke('M32 12C32 30 64 32 64 48C64 64 32 66 32 84', 'main', 9)),
  ],
  motion: {
    ...stagger(['rung-1', 'rung-2'], pop({ scale: 1.3, duration: 400 }), 200),
  },
});
