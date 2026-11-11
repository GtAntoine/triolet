import { circle, icon, part, pop, raised, stagger, stroke, travel } from '@triolet/core';

export default icon({
  name: 'wifi',
  category: 'devices',
  keywords: ['wifi', 'wireless', 'network', 'internet', 'signal', 'connection', 'réseau', 'connexion'],
  gesture: 'The signal builds up from the dot, wave after wave.',
  draw: [
    part('wave-3', raised(stroke('M16 36A45 45 0 0 1 80 36', 'mid', 8))),
    part('wave-2', raised(stroke('M27 48A30 30 0 0 1 69 48', 'main', 8))),
    part('wave-1', raised(stroke('M38 60A15 15 0 0 1 58 60', 'main', 8))),
    part('dot', raised.small(circle(48, 72, 6, 'accent'))),
  ],
  motion: {
    dot: pop({ duration: 400 }),
    ...stagger(['wave-1', 'wave-2', 'wave-3'], travel({ from: [0, 5], fade: true, duration: 400, delay: 120, ease: 'outSoft' }), 130),
  },
});
