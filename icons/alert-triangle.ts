import { inset, circle, icon, part, path, plain, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'alert-triangle',
  aliases: ['triangle-alert'],
  category: 'notifications',
  keywords: ['warning', 'alert', 'danger', 'caution', 'error', 'attention', 'avertissement', 'risque'],
  gesture: 'The warning sign jolts and its dot pops.',
  draw: [
    part(
      'sign',
      raised(path('M48 22L78 74H18Z', 'main', { outline: 10 })),
      inset(path('M48 29L70 69H26Z', 'base', { outline: 3 })),
      plain(rect(44.5, 40, 7, 15, 3.5, 'main')),
      part('dot', plain(circle(48, 63, 6, 'accent'))),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.08, duration: 450 }),
    dot: pop({ scale: 1.5, duration: 400, delay: 200 }),
  },
});
