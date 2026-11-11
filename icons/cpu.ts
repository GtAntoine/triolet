import { circle, icon, inset, part, pop, raised, rect, stroke } from '@triolet/core';

const pins = [34, 48, 62];

export default icon({
  name: 'cpu',
  category: 'devices',
  keywords: ['cpu', 'chip', 'processor', 'hardware', 'computing', 'ai', 'processeur', 'puce'],
  gesture: 'The core of the chip lights up.',
  draw: [
    raised.small(pins.flatMap((p) => [stroke(`M${p} 12V84`, 'main', 5), stroke(`M12 ${p}H84`, 'main', 5)])),
    raised(rect(22, 22, 52, 52, 10, 'base')),
    inset(rect(33, 33, 30, 30, 6, 'main')),
    part('core', inset(circle(48, 48, 6, 'accent'))),
  ],
  motion: {
    core: pop({ scale: 1.5, duration: 500 }),
  },
});
