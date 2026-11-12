import { circle, icon, inset, part, path, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'palette',
  category: 'design',
  keywords: ['palette', 'colour', 'color', 'paint', 'theme', 'design', 'nuancier', 'couleurs'],
  gesture: 'The dabs of paint appear one after the other.',
  draw: [
    raised(path('M48 13C70 13 85 28 85 46C85 58 76 62 67 60C59 58 54 63 56 70C58 78 54 84 46 84C26 84 11 68 11 48C11 28 27 13 48 13Z', 'base')),
    part('dab-1', inset(circle(29, 38, 6.5, 'main'))),
    part('dab-2', inset(circle(48, 28, 6.5, 'accent'))),
    part('dab-3', inset(circle(67, 39, 6.5, 'main'))),
    part('dab-4', inset(circle(27, 59, 6.5, 'main'))),
  ],
  motion: {
    ...stagger(['dab-4', 'dab-1', 'dab-2', 'dab-3'], pop({ scale: 1.3, duration: 400 }), 110),
  },
});
