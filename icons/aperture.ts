import { circle, icon, inset, part, path, raised, spin, stroke } from '@triolet/core';
import { polygonPath } from './_shared.ts';

// Six blades: each edge of the opening runs on to the rim.
const blades = Array.from({ length: 6 }, (_, i) => {
  const from = ((60 * i - 90) * Math.PI) / 180;
  const to = ((60 * i - 90 + 52) * Math.PI) / 180;
  const point = (angle: number, radius: number) => `${(48 + radius * Math.cos(angle)).toFixed(1)} ${(48 + radius * Math.sin(angle)).toFixed(1)}`;
  return stroke(`M${point(from, 19)}L${point(to, 31)}`, 'base', 3.5);
});

export default icon({
  name: 'aperture',
  category: 'media',
  keywords: ['aperture', 'camera', 'lens', 'shutter', 'photo', 'focus', 'diaphragme', 'objectif'],
  gesture: 'The blades turn by one notch: the aperture closes and opens.',
  draw: [
    raised(circle(48, 48, 35, 'main')),
    part('blades', inset(path(polygonPath(48, 48, 19, 6), 'base', { outline: 2 })), inset(...blades)),
    inset(circle(48, 48, 7, 'accent')),
  ],
  motion: {
    blades: spin({ from: -60, duration: 650, pivot: [48, 48] }),
  },
});
