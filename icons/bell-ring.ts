import { circle, icon, part, path, raised, stroke, swing, travel } from '@triolet/core';

const left = ['M10 40L16 43', 'M8 54H15', 'M10 68L16 65'];
const right = ['M82 42L76 45', 'M84 56H77', 'M82 69L76 66'];

export default icon({
  name: 'bell-ring',
  aliases: ['alertes'],
  category: 'notifications',
  keywords: ['bell', 'alert', 'notification', 'ring', 'alarm', 'cloche', 'alerte', 'sonnerie'],
  gesture: 'The bell rings from its top and the sound waves leave on both sides.',
  draw: [
    part(
      'bell',
      raised(
        circle(46, 17, 4.5, 'main'),
        circle(46, 75, 7.5, 'main'),
        path('M46 20C34 20 28 30 28 42V56L20 66V71H72V66L64 56V42C64 30 58 20 46 20Z', 'main', { outline: 3 }),
      ),
    ),
    part('waves-left', raised.small(left.map((d) => stroke(d, 'accent', 4)))),
    part('waves-right', raised.small(right.map((d) => stroke(d, 'accent', 4)))),
  ],
  motion: {
    bell: swing({ angles: [14, -11, 7, -4], at: [0.15, 0.35, 0.55, 0.75], pivot: 'top', duration: 800 }),
    'waves-left': travel({ from: [4, 0], fade: true, duration: 400, ease: 'outSoft', iterations: 2 }),
    'waves-right': travel({ from: [-4, 0], fade: true, duration: 400, ease: 'outSoft', iterations: 2 }),
  },
});
