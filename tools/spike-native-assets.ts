/**
 * Writes the reference images of the Skia spike: the SVG of two icons rasterised at 450 px
 * (150 points at 3x), in the default colours, to compare with what Skia draws on the device.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderStaticSvg } from '@triolet/core';
import { ROOT, loadIcon } from './lib/icons.ts';
import { png } from './lib/raster.ts';

const dir = join(ROOT, 'examples/expo/assets/reference');
mkdirSync(dir, { recursive: true });
for (const name of ['calendar-clock', 'ballot-box']) {
  writeFileSync(join(dir, `${name}.png`), png(renderStaticSvg(await loadIcon(name)), 450));
}
console.log(`Reference images written to ${dir}`);
