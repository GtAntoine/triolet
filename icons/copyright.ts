import { circle, draw, icon, inset, part, plain, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'copyright',
  category: 'documents',
  keywords: ['copyright', 'rights', 'legal', 'license', 'author', 'intellectual', 'droits', 'auteur'],
  gesture: 'The C writes itself in its circle.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    inset(ring(48, 48, 25, 'main', 6)),
    part('letter', plain(stroke('M56.5 41A11 11 0 1 0 56.5 55', 'accent', 6))),
  ],
  motion: {
    letter: draw({ duration: 550 }),
  },
});
