import { icon, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'expand',
  category: 'interface',
  keywords: ['expand', 'maximize', 'fullscreen', 'enlarge', 'resize', 'grow', 'agrandir', 'plein écran'],
  gesture: 'The two arrows pull apart, towards the corners.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    part('arrow-1', raised.small(stroke('M54 42L69 27M55 27H69V41', 'main', 8))),
    part('arrow-2', raised.small(stroke('M42 54L27 69M27 55V69H41', 'accent', 8))),
  ],
  motion: {
    'arrow-1': nudge({ x: 4, y: -4, settle: true, duration: 520 }),
    'arrow-2': nudge({ x: -4, y: 4, settle: true, duration: 520 }),
  },
});
