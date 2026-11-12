import { icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'mouse',
  category: 'devices',
  keywords: ['mouse', 'click', 'scroll', 'pointer', 'computer', 'wheel', 'souris', 'clic'],
  gesture: 'The wheel rolls down and comes back: the mouse scrolls.',
  draw: [
    // The shell: a tall pill, 52 × 70 (the tall keyline), with its two buttons as a dark cap.
    // Two shapes in one raised layer: one object, one relief.
    raised(pill(22, 13, 52, 70, 'base'), path('M22 45V39A26 26 0 0 1 74 39V45Z', 'main')),
    // The groove between the two buttons, from the top of the shell to the edge of the cap.
    inset(rect(46.5, 13, 3, 32, 0, 'base')),
    // The wheel: the accent, and what moves.
    part('wheel', raised.small(pill(42, 22, 12, 16, 'accent'))),
  ],
  motion: {
    wheel: nudge({ y: 4, duration: 500 }),
  },
});
