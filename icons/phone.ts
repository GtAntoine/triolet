import { circle, icon, part, raised, rect, stagger, stroke, swing, travel } from '@triolet/core';

export default icon({
  name: 'phone',
  aliases: ['telephone', 'phone-volume'],
  category: 'communication',
  keywords: ['phone', 'call', 'telephone', 'contact', 'ring', 'dial', 'téléphone', 'appel'],
  gesture: 'The handset rings and the waves leave.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'handset',
      raised.small(
        stroke('M36 37C37 50 46 59 59 60', 'main', 9),
        rect(26, 26, 16, 17, 6, 'main', { rotate: [-12, 34, 34] }),
        rect(52, 52, 17, 16, 6, 'main', { rotate: [-12, 60, 60] }),
      ),
    ),
    part('wave-1', raised.small(stroke('M54 33A10 10 0 0 1 63 42', 'accent', 5))),
    part('wave-2', raised.small(stroke('M56 22A21 21 0 0 1 74 40', 'accent', 5))),
  ],
  motion: {
    handset: swing({ angles: [-9, 7, -5, 3], duration: 600 }),
    ...stagger(['wave-1', 'wave-2'], travel({ from: [-3, 3], fade: true, duration: 400, ease: 'outSoft' }), 140),
  },
});
