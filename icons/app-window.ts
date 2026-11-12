import { circle, icon, inset, part, path, pill, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'app-window',
  category: 'interface',
  keywords: ['window', 'app', 'browser', 'application', 'page', 'frame', 'fenêtre', 'navigateur'],
  gesture: 'The content of the window appears, line after line.',
  draw: [
    // The window and its title bar, as one object.
    raised(rect(12, 18, 72, 60, 11, 'base'), path('M23 18H73A11 11 0 0 1 84 29V36H12V29A11 11 0 0 1 23 18Z', 'main')),
    // The close button is the accent.
    inset(circle(23, 27, 4, 'accent')),
    inset(circle(35, 27, 4, 'mainLight')),
    part('line-1', inset(pill(22, 45, 36, 7, 'mid'))),
    part('line-2', inset(pill(22, 58, 52, 7, 'mid'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2'], reveal({ duration: 400 }), 120),
  },
});
