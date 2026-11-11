import { circle, icon, nudge, part, path, plain, raised, stagger } from '@triolet/core';

const bubble = { y: -4, duration: 600, ease: 'inOut' } as const;

export default icon({
  name: 'forum',
  aliases: ['agora'],
  category: 'communication',
  keywords: ['forum', 'discussion', 'community', 'debate', 'people', 'chat', 'agora', 'débat'],
  gesture: 'The two speech bubbles answer each other.',
  draw: [
    [24, 72].map((cx) => raised(circle(cx, 57, 6.5, 'soft'), path(`M${cx - 12} 85V81A12 12 0 0 1 ${cx + 12} 81V85Z`, 'soft'))),
    raised(circle(48, 52, 8.5, 'main'), path('M31 86V81A17 17 0 0 1 65 81V86Z', 'main')),
    part('bubble-1', raised(path('M22 10H42A8 8 0 0 1 50 18V26A8 8 0 0 1 42 34H30L22 40V33.6A8 8 0 0 1 14 26V18A8 8 0 0 1 22 10Z', 'main'))),
    part(
      'bubble-2',
      raised(path('M54 12H76A8 8 0 0 1 84 20V30A8 8 0 0 1 76 38H62L54 44V37.6A8 8 0 0 1 46 30V20A8 8 0 0 1 54 12Z', 'accent')),
      plain([57, 65, 73].map((cx) => circle(cx, 25, 2.6, 'on'))),
    ),
  ],
  motion: {
    ...stagger(['bubble-1', 'bubble-2'], nudge(bubble), 180),
  },
});
