import { circle, icon, inset, nudge, part, pill, raised } from '@triolet/core';

const sliders = [
  { y: 17, cx: 36, role: 'main', travel: 20 },
  { y: 41, cx: 64, role: 'accent', travel: -22 },
  { y: 65, cx: 44, role: 'main', travel: 18 },
] as const;

export default icon({
  name: 'sliders',
  aliases: ['parametrage', 'sliders-horizontal'],
  category: 'settings',
  keywords: ['settings', 'sliders', 'adjust', 'preferences', 'controls', 'tune', 'paramètres', 'réglages'],
  gesture: 'The three sliders adjust themselves and come back.',
  draw: [sliders.flatMap((s, k) => [inset(pill(12, s.y, 72, 12, 'soft')), part(`knob-${k + 1}`, raised(circle(s.cx, s.y + 6, 10, s.role)))])],
  motion: Object.fromEntries(sliders.map((s, k) => [`knob-${k + 1}`, nudge({ x: s.travel, duration: 900, delay: k * 80, ease: 'inOut' })])),
});
