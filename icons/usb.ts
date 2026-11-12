import { circle, icon, inset, nudge, part, raised, rect } from '@triolet/core';

export default icon({
  name: 'usb',
  category: 'devices',
  keywords: ['usb', 'plug', 'key', 'drive', 'connector', 'port', 'clé', 'brancher'],
  gesture: 'The key pushes in, as it is plugged.',
  draw: [
    part(
      'key',
      // The metal tip and its two contacts.
      raised(rect(32, 10, 32, 30, 5, 'base')),
      inset(rect(38, 18, 7, 9, 2, 'main'), rect(51, 18, 7, 9, 2, 'main')),
      // The body, and its light.
      raised(rect(22, 36, 52, 50, 12, 'main')),
      inset(rect(31, 46, 34, 30, 7, 'base')),
      inset(circle(48, 61, 7, 'accent')),
    ),
  ],
  motion: {
    key: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
