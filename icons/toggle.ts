import { circle, icon, inset, nudge, part, pill, raised } from '@triolet/core';

export default icon({
  name: 'toggle',
  category: 'interface',
  keywords: ['toggle', 'switch', 'on', 'off', 'setting', 'control', 'interrupteur', 'bascule'],
  gesture: 'The knob slides to the other side and back.',
  draw: [
    raised(pill(10, 28, 76, 40, 'base')),
    part('knob', raised.small(circle(64, 48, 15, 'main')), inset(circle(64, 48, 7.5, 'accent'))),
  ],
  motion: {
    knob: nudge({ x: -34, duration: 760, ease: 'inOut' }),
  },
});
