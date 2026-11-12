import { circle, icon, inset, nudge, part, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'luggage',
  category: 'places',
  keywords: ['luggage', 'suitcase', 'travel', 'baggage', 'trip', 'holiday', 'valise', 'bagage'],
  gesture: 'The suitcase is lifted, then put down.',
  draw: [
    part(
      'case',
      raised.small(stroke('M38 22V15A5 5 0 0 1 43 10H53A5 5 0 0 1 58 15V22', 'main', 6)),
      raised.small(circle(32, 82, 5, 'main'), circle(64, 82, 5, 'main')),
      raised(rect(20, 22, 56, 58, 11, 'base')),
      inset(pill(31, 31, 7, 40, 'main'), pill(58, 31, 7, 40, 'main')),
      inset(pill(27, 46, 42, 9, 'accent')),
    ),
  ],
  motion: {
    case: nudge({ y: -6, settle: true, duration: 600 }),
  },
});
