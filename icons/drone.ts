import { circle, icon, inset, part, pill, raised, rect, spin, stroke } from '@triolet/core';

const rotor = (name: string, cx: number, cy: number) =>
  part(name, raised.small(circle(cx, cy, 13, 'base')), inset(pill(cx - 10, cy - 2.5, 20, 5, 'main', { rotate: [35, cx, cy] })));

export default icon({
  name: 'drone',
  category: 'devices',
  keywords: ['drone', 'quadcopter', 'fly', 'aerial', 'camera', 'uav', 'quadricoptère', 'aérien'],
  gesture: 'The four rotors spin.',
  draw: [
    // The four arms, behind.
    raised.small(stroke('M40 42L24 26', 'main', 6), stroke('M56 42L72 26', 'main', 6), stroke('M40 54L24 70', 'main', 6), stroke('M56 54L72 70', 'main', 6)),
    rotor('rotor-1', 23, 25),
    rotor('rotor-2', 73, 25),
    rotor('rotor-3', 23, 71),
    rotor('rotor-4', 73, 71),
    // The body and its camera: the accent.
    raised(rect(33, 34, 30, 28, 9, 'main')),
    inset(circle(48, 48, 6, 'accent')),
  ],
  motion: {
    'rotor-1': spin({ turns: 2, duration: 800, pivot: [23, 25] }),
    'rotor-2': spin({ turns: 2, duration: 800, pivot: [73, 25] }),
    'rotor-3': spin({ turns: 2, duration: 800, pivot: [23, 71] }),
    'rotor-4': spin({ turns: 2, duration: 800, pivot: [73, 71] }),
  },
});
