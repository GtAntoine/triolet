import { circle, icon, inset, part, pill, pop, raised, rect, stagger } from '@triolet/core';

export default icon({
  name: 'gamepad',
  category: 'devices',
  keywords: ['gamepad', 'game', 'controller', 'play', 'console', 'joystick', 'manette', 'jeu vidéo'],
  gesture: 'The two buttons are pressed, one after the other.',
  draw: [
    // The body and its two grips, as one shape.
    raised(rect(10, 26, 76, 38, 19, 'base'), circle(25, 58, 15, 'base'), circle(71, 58, 15, 'base')),
    inset(pill(18, 41, 24, 8, 'main'), pill(26, 33, 8, 24, 'main')),
    inset(circle(57, 51, 6, 'main'), circle(75, 51, 6, 'main')),
    part('button-1', inset(circle(66, 40, 6, 'accent'))),
    part('button-2', inset(circle(66, 62, 6, 'accent'))),
  ],
  motion: {
    ...stagger(['button-1', 'button-2'], pop({ scale: 1.4, duration: 380 }), 160),
  },
});
