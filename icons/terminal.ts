import { blink, draw, icon, inset, part, path, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'terminal',
  category: 'development',
  keywords: ['terminal', 'console', 'command', 'shell', 'cli', 'prompt', 'ligne de commande', 'commande'],
  gesture: 'The prompt draws itself and the cursor blinks.',
  draw: [
    raised(rect(10, 16, 76, 64, 11, 'base'), path('M21 16H75A11 11 0 0 1 86 27V32H10V27A11 11 0 0 1 21 16Z', 'main')),
    part('prompt', plain(stroke('M24 44L36 54L24 64', 'main', 6))),
    part('cursor', inset(pill(44, 60, 20, 7, 'accent'))),
  ],
  motion: {
    prompt: draw({ duration: 400 }),
    cursor: blink({ to: 0.1, duration: 400, delay: 300, iterations: 2 }),
  },
});
