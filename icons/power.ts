import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'power',
  category: 'interface',
  keywords: ['power', 'on', 'off', 'shutdown', 'start', 'switch', 'allumer', 'éteindre'],
  gesture: 'The switch is pushed in.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    raised.small(stroke('M35 35A19 19 0 1 0 61 35', 'main', 8)),
    part('switch', raised.small(stroke('M48 26V46', 'accent', 8))),
  ],
  motion: {
    switch: nudge({ y: 5, settle: true, duration: 500 }),
  },
});
