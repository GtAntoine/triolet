import { circle, icon, inset, part, pill, pop, raised, rect } from '@triolet/core';

const keys = [25, 40, 55].flatMap((y) => [32, 48, 64].map((x) => circle(x, y, 5.5, 'main')));

export default icon({
  name: 'dialpad',
  category: 'communication',
  keywords: ['dialpad', 'keypad', 'phone', 'numbers', 'call', 'dial', 'clavier', 'composer'],
  gesture: 'The call key pops.',
  draw: [
    raised(rect(20, 10, 56, 76, 15, 'base')),
    inset(...keys),
    part('call', inset(pill(33, 66, 30, 12, 'accent'))),
  ],
  motion: {
    call: pop({ scale: 1.2, duration: 450 }),
  },
});
