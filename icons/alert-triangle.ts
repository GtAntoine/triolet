import { circle, icon, part, path, plain, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'alert-triangle',
  category: 'notifications',
  keywords: ['warning', 'alert', 'danger', 'caution', 'error', 'attention', 'avertissement', 'risque'],
  gesture: 'The warning sign jolts and its dot pops.',
  draw: [
    part(
      'sign',
      raised(path('M48 22L78 74H18Z', 'main', { outline: 10 })),
      plain(rect(44.5, 36, 7, 22, 3.5, 'on')),
      part('dot', plain(circle(48, 67, 4.5, 'accent'))),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.08, duration: 450 }),
    dot: pop({ scale: 1.5, duration: 400, delay: 200 }),
  },
});
