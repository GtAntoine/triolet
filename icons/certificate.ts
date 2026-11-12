import { circle, icon, inset, part, path, pill, plain, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'certificate',
  category: 'education',
  keywords: ['certificate', 'diploma', 'award', 'degree', 'license', 'achievement', 'certificat', 'diplôme'],
  gesture: 'The seal is stamped on the certificate.',
  draw: [
    raised(rect(12, 18, 72, 52, 10, 'base')),
    inset(pill(22, 28, 34, 7, 'main')),
    inset(pill(22, 41, 46, 6, 'mid')),
    inset(pill(22, 52, 22, 6, 'mid')),
    // The seal and its two ribbons.
    part(
      'seal',
      raised.small(path('M57 62L54 83L63.5 77L73 83L70 62Z', 'main', { outline: 2 })),
      plain(circle(63.5, 58, 15, 'gap')),
      raised.small(circle(63.5, 58, 12, 'accent')),
      inset(circle(63.5, 58, 4.5, 'on')),
    ),
  ],
  motion: {
    seal: pop({ scale: 1.25, duration: 500 }),
  },
});
