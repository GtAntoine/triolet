import { icon, part, path, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'umbrella',
  category: 'weather',
  keywords: ['umbrella', 'rain', 'weather', 'protection', 'insurance', 'cover', 'parapluie', 'pluie'],
  gesture: 'The umbrella sways in the wind, held by its handle.',
  draw: [
    part(
      'umbrella',
      // The handle is behind the canopy, with its hook.
      raised.small(stroke('M48 44V72A7 7 0 0 1 34 72', 'base', 6)),
      raised.small(stroke('M48 11V16', 'main', 5)),
      // The canopy: a dome with three scallops; its middle panel is the accent.
      raised(
        path('M12 48A36 34 0 0 1 84 48Q72 40 60 48Q48 40 36 48Q24 40 12 48Z', 'main'),
        path('M48 14C43 23 41 35 41 45.4Q48 42 55 45.4C55 35 53 23 48 14Z', 'accent'),
      ),
    ),
  ],
  motion: {
    umbrella: swing({ angles: [-9, 6, -3], pivot: [41, 79], duration: 900 }),
  },
});
