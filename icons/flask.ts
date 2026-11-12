import { circle, clip, icon, inset, part, path, pill, raised, rect, stagger, travel } from '@triolet/core';

const body = 'M38 14H58V36L76 70A8 8 0 0 1 69 82H27A8 8 0 0 1 20 70L38 36Z';

export default icon({
  name: 'flask',
  category: 'education',
  keywords: ['flask', 'science', 'lab', 'experiment', 'chemistry', 'test', 'fiole', 'laboratoire'],
  gesture: 'Bubbles rise in the flask.',
  draw: [
    raised(path(body, 'base')),
    // The liquid fills the bottom of the flask.
    clip(path(body, 'base'), inset(rect(14, 60, 68, 28, 0, 'main'))),
    raised.small(pill(33, 10, 30, 8, 'main')),
    part('bubble-1', inset(circle(44, 50, 4.5, 'accent'))),
    part('bubble-2', inset(circle(53, 40, 3.5, 'accent'))),
  ],
  motion: {
    ...stagger(['bubble-1', 'bubble-2'], travel({ from: [0, 8], fade: true, duration: 500, ease: 'outSoft' }), 160),
  },
});
