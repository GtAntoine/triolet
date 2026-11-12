import { blink, icon, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'code',
  category: 'development',
  keywords: ['code', 'developer', 'html', 'programming', 'brackets', 'source', 'programmation', 'développeur'],
  gesture: 'The brackets open and the slash blinks.',
  draw: [
    raised(rect(10, 18, 76, 60, 13, 'base')),
    part('left', raised.small(stroke('M34 33L20 48L34 63', 'main', 8))),
    part('right', raised.small(stroke('M62 33L76 48L62 63', 'main', 8))),
    part('slash', raised.small(stroke('M53 30L43 66', 'accent', 7))),
  ],
  motion: {
    left: nudge({ x: -4, duration: 500 }),
    right: nudge({ x: 4, duration: 500 }),
    slash: blink({ to: 0.2, duration: 400, delay: 150 }),
  },
});
