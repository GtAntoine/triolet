import { blink, circle, icon, inset, part, pill, raised, stroke } from '@triolet/core';

export default icon({
  name: 'brain',
  category: 'education',
  keywords: ['brain', 'mind', 'think', 'idea', 'intelligence', 'memory', 'cerveau', 'réflexion'],
  gesture: 'One fold of the brain flashes: an idea.',
  draw: [
    // The two hemispheres: round lobes that merge into one shape.
    raised(
      circle(34, 32, 15, 'base'),
      circle(26, 48, 15, 'base'),
      circle(33, 64, 15, 'base'),
      circle(62, 32, 15, 'base'),
      circle(70, 48, 15, 'base'),
      circle(63, 64, 15, 'base'),
      circle(48, 48, 22, 'base'),
    ),
    // The groove between them, and the folds that branch from it.
    inset(pill(45.5, 20, 5, 56, 'main')),
    inset(
      stroke('M46 37L35 30', 'main', 4.5),
      stroke('M50 37L61 30', 'main', 4.5),
      stroke('M25 47C30 43 36 44 38 49', 'main', 4.5),
      stroke('M46 60C40 58 34 61 32 68', 'main', 4.5),
      stroke('M50 60C56 58 62 61 64 68', 'main', 4.5),
    ),
    // One fold lights up: the idea.
    part('idea', inset(stroke('M58 49C60 44 66 43 71 47', 'accent', 6))),
  ],
  motion: {
    idea: blink({ to: 0.15, duration: 700, iterations: 2 }),
  },
});
