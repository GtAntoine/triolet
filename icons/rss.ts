import { circle, draw, icon, part, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'rss',
  category: 'communication',
  keywords: ['rss', 'feed', 'subscribe', 'news', 'blog', 'broadcast', 'flux', 'abonnement'],
  gesture: 'The two waves leave the dot, one after the other.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    raised.small(circle(33, 63, 7, 'accent')),
    part('wave-1', raised.small(stroke('M30 43A23 23 0 0 1 53 66', 'main', 8))),
    part('wave-2', raised.small(stroke('M30 27A39 39 0 0 1 69 66', 'main', 8))),
  ],
  motion: {
    ...stagger(['wave-1', 'wave-2'], draw({ duration: 450 }), 160),
  },
});
