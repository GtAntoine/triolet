import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-down-dashed',
  aliases: ['arrow-narrow-down-dashed'],
  category: 'arrows',
  keywords: ['arrow', 'dashed', 'down', 'dotted', 'step', 'direction', 'pointillés', 'bas'],
  gesture: 'The arrow pushes down, pulling its dashes along.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'arrow',
      raised.small(stroke('M42 33L27 48L42 63M29 48H39', 'main', 8.5, { rotate: [270, 48, 48] })),
      raised.small(stroke('M51 48H55M66 48H68', 'accent', 8.5, { rotate: [270, 48, 48] })),
    ),
  ],
  motion: {
    arrow: nudge({ y: 6, settle: true, duration: 500 }),
  },
});
