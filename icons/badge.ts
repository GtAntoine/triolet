import { circle, draw, icon, inset, part, plain, raised, stroke } from '@triolet/core';

const scallops = Array.from({ length: 8 }, (_, i) => {
  const angle = (Math.PI / 4) * i;
  return circle(Math.round((48 + 24 * Math.cos(angle)) * 10) / 10, Math.round((48 + 24 * Math.sin(angle)) * 10) / 10, 12, 'main');
});

export default icon({
  name: 'badge',
  category: 'security',
  keywords: ['badge', 'verified', 'check', 'certified', 'approved', 'official', 'vérifié', 'certifié'],
  gesture: 'The check draws itself on the badge.',
  draw: [
    // A scalloped disc: eight lobes around a centre, as one shape.
    raised(circle(48, 48, 27, 'main'), ...scallops),
    inset(circle(48, 48, 20, 'base')),
    part('check', plain(stroke('M39 48.5L45.5 55L57.5 42', 'accent', 6))),
  ],
  motion: {
    check: draw({ duration: 500 }),
  },
});
