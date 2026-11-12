import { circle, icon, inset, part, pill, pop, raised, rect, stroke, tracks, resize } from '@triolet/core';

export default icon({
  name: 'robot',
  category: 'development',
  keywords: ['robot', 'bot', 'ai', 'assistant', 'automation', 'android', 'ia', 'intelligence artificielle'],
  gesture: 'The robot blinks, and its antenna lights up.',
  draw: resize(
    [
    raised.small(stroke('M48 26V16', 'main', 5.5), rect(8, 40, 10, 20, 4, 'main'), rect(78, 40, 10, 20, 4, 'main')),
    part('antenna', raised.small(circle(48, 13, 6, 'accent'))),
    raised(rect(18, 26, 60, 52, 15, 'base')),
    part('eyes', inset(circle(36, 46, 7.5, 'main'), circle(60, 46, 7.5, 'main'))),
    inset(pill(35, 61, 26, 7, 'accent')),
    ],
    1,
    { move: [0, 5] },
  ),
  motion: {
    eyes: tracks({ duration: 700, ease: 'inOut' }, { scaleY: [[0.2, 0.1], [0.4, 1], [0.6, 0.1], [0.8, 1]] }),
    antenna: pop({ delay: 200, duration: 450 }),
  },
});
