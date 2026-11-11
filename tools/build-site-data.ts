/**
 * Writes what the website needs to know about each icon and cannot work out in the browser:
 * its measured colours and footprint, its standalone SVG, its export names.
 *
 *   node tools/build-site-data.ts     site/src/data/icons.json
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gestureDuration, renderStaticSvg } from '@triolet/core';
import { checkIcon } from './lib/check.ts';
import { ROOT, loadIcons } from './lib/icons.ts';
import { jsName, reactName } from './lib/names.ts';

const icons = await loadIcons();
const data = icons.map((model) => {
  const report = checkIcon(model, icons);
  const duration = gestureDuration(model.motion);
  return {
    name: model.name,
    category: model.category,
    keywords: model.keywords,
    aliases: model.aliases,
    gesture: model.gesture,
    idle: model.idle,
    /** Milliseconds, or `null` for a gesture that loops. */
    duration: Number.isFinite(duration) ? duration : null,
    parts: model.motion.map((m) => ({ name: m.part, tracks: Object.keys(m.tracks), duration: m.duration, delay: m.delay })),
    ratio: report.ratio,
    box: report.footprint.box,
    js: jsName(model.name),
    react: reactName(model.name),
    svg: renderStaticSvg(model).trim(),
  };
});

const dir = join(ROOT, 'site/src/data');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'icons.json'), JSON.stringify(data));
// The standalone files, to download from the site.
const files = join(ROOT, 'site/public/svg');
rmSync(files, { recursive: true, force: true });
cpSync(join(ROOT, 'svg'), files, { recursive: true });
console.log(`site data: ${data.length} icons`);
