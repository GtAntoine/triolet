import { blink, icon, inset, part, path, pill, raised, rect, stagger } from '@triolet/core';

const rows = [22, 36, 50];

export default icon({
  name: 'building',
  category: 'places',
  keywords: ['building', 'office', 'company', 'tower', 'city', 'business', 'immeuble', 'bureau'],
  gesture: 'The windows light up floor by floor.',
  draw: [
    raised(rect(26, 12, 44, 70, 7, 'base')),
    rows.map((y, k) => part(`floor-${k + 1}`, inset(rect(34, y, 11, 9, 3, 'main'), rect(51, y, 11, 9, 3, 'main')))),
    inset(path('M42 82V72A6 6 0 0 1 54 72V82Z', 'accent')),
    raised(pill(14, 79, 68, 8, 'main')),
  ],
  motion: {
    ...stagger(['floor-3', 'floor-2', 'floor-1'], blink({ to: 0.2, duration: 350 }), 130),
  },
});
