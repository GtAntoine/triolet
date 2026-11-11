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

const RESERVED = new Set(
  'break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield await'.split(
    ' ',
  ),
);
const camelRaw = (name: string) => name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

const icons = await loadIcons();
const data = icons.map((model) => {
  const report = checkIcon(model, icons);
  const duration = gestureDuration(model.motion);
  const camel = camelRaw(model.name);
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
    js: RESERVED.has(camel) ? `${camel}Icon` : camel,
    react: camel.replace(/^./, (c) => c.toUpperCase()),
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
