import { circle, draw, icon, inset, part, pill, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'signature',
  category: 'documents',
  keywords: ['signature', 'sign', 'autograph', 'contract', 'handwriting', 'approve', 'signer', 'paraphe'],
  gesture: 'The signature writes itself on the line.',
  draw: [
    raised(rect(12, 22, 72, 52, 12, 'base')),
    inset(pill(22, 60, 52, 4, 'mid')),
    part('line', raised.small(stroke('M23 52C26 34 37 32 36 44C35 56 44 38 49 42C53 46 50 54 56 50C60 47 63 43 68 45', 'main', 5))),
    part('dot', raised.small(circle(72, 46, 5, 'accent'))),
  ],
  motion: {
    line: draw({ duration: 750 }),
    dot: pop({ delay: 750, duration: 350 }),
  },
});
