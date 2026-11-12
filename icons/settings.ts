import { circle, icon, inset, part, raised, rect, spin } from '@triolet/core';

export default icon({
  name: 'settings',
  category: 'interface',
  keywords: ['settings', 'gear', 'cog', 'preferences', 'options', 'configuration', 'paramètres', 'réglages'],
  gesture: 'The gear turns a quarter of a turn.',
  draw: [
    part(
      'gear',
      // Eight teeth around a disc, all one piece.
      raised(circle(48, 48, 25, 'main'), [0, 45, 90, 135, 180, 225, 270, 315].map((a) => rect(42, 12, 12, 16, 4, 'main', { rotate: [a, 48, 48] }))),
      inset(circle(48, 48, 21, 'base')),
      inset(circle(48, 48, 9, 'accent')),
    ),
  ],
  motion: {
    gear: spin({ from: -90, duration: 800, ease: 'out' }),
  },
});
