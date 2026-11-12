import { icon, inset, nudge, part, path, pill, raised, reveal, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'book',
  category: 'education',
  keywords: ['book', 'read', 'library', 'manual', 'guide', 'learn', 'livre', 'lecture'],
  gesture: 'The lines of the page write themselves and the ribbon slides.',
  draw: [
    raised(path('M10 26C22 20 36 20 48 28V78C36 70 22 70 10 76Z', 'base')),
    raised(path('M86 26C74 20 60 20 48 28V78C60 70 74 70 86 76Z', 'base')),
    raised.small(stroke('M48 30V76', 'main', 5)),
    part('line-1', inset(pill(18, 36, 22, 6, 'main'))),
    part('line-2', inset(pill(18, 48, 22, 6, 'main'))),
    part('line-3', inset(pill(18, 60, 16, 6, 'mid'))),
    part('ribbon', raised.small(path('M62 24H72V48L67 43L62 48Z', 'accent'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2', 'line-3'], reveal({ duration: 400 }), 100),
    ribbon: nudge({ y: 5, at: 0.45, duration: 550, delay: 200 }),
  },
});
