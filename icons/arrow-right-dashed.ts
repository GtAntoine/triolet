import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-right-dashed',
  aliases: ['arrow-narrow-right-dashed'],
  category: 'arrows',
  keywords: ['arrow', 'dashed', 'right', 'dotted', 'step', 'direction', 'pointillés', 'droite'],
  gesture: 'The arrow pushes right, pulling its dashes along.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'arrow',
      raised.small(stroke('M42 33L27 48L42 63M29 48H39', 'main', 8.5, { rotate: [180, 48, 48] })),
      raised.small(stroke('M51 48H55M66 48H68', 'accent', 8.5, { rotate: [180, 48, 48] })),
    ),
  ],
  motion: {
    arrow: nudge({ x: 6, settle: true, duration: 500 }),
  },
});
