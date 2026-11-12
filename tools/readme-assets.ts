/**
 * The animated pictures of the README: standalone SVG files whose icons play their gesture in a
 * loop. GitHub shows an SVG used as an image with its CSS animations but without scripts or
 * hover, so each gesture is stretched into a cycle: the gesture, then a rest.
 *
 *   node tools/readme-assets.ts      writes docs/assets/icons.svg and docs/assets/palettes.svg
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GRID, REST, baseCss, deriveTheme, iconCss, renderBody, sampleTrack, type IconModel, type Key, type Motion, type Prop, type Theme } from '@triolet/core';
import { ROOT, loadIcon } from './lib/icons.ts';

const OUT = join(ROOT, 'docs/assets');
mkdirSync(OUT, { recursive: true });

/** Same icon, same gesture, repeated every `cycle` ms and starting `offset` ms late. */
function looped(model: IconModel, name: string, cycle: number, offset: number): IconModel {
  const motion = model.motion.map((m): Motion => {
    const runs = typeof m.iterations === 'number' ? m.iterations : 1;
    const lead = offset + m.delay;
    const length = lead + runs * m.duration;
    if (length > cycle) throw new Error(`${model.name}: a gesture of ${length} ms does not fit a cycle of ${cycle} ms`);
    const tracks: Motion['tracks'] = {};
    for (const prop of Object.keys(m.tracks) as Prop[]) {
      const keys = m.tracks[prop]!;
      const start = sampleTrack(keys, 0, m.ease);
      const out: Key[] = [[0, start]];
      let last = 0;
      const push = (at: number, value: number, ease?: Key[2]) => {
        // Two keys at one moment would be a jump: the later one goes a hair further.
        const time = Math.max(at, last + 0.00005);
        out.push(ease === undefined ? [time, value] : [time, value, ease]);
        last = time;
      };
      if (lead > 0) push(lead / cycle, start);
      for (let run = 0; run < runs; run++) {
        for (const [at, value, ease] of keys) {
          if (run === 0 && at === 0 && lead === 0) continue;
          push((lead + (run + at) * m.duration) / cycle, value, ease);
        }
      }
      if (last < 1) push(1, REST[prop]);
      tracks[prop] = out;
    }
    return { ...m, duration: cycle, delay: 0, iterations: 'infinite', ease: m.ease, tracks };
  });
  return { ...model, name, motion };
}

interface Cell {
  icon: IconModel;
  theme: Theme;
}

function cellSvg(cell: Cell, name: string, cycle: number, offset: number, x: number, y: number, size: number, uid: string): { svg: string; css: string } {
  const model = looped(cell.icon, name, cycle, offset);
  const body = renderBody(model, { colors: cell.theme, tier: 'relief', uid });
  return {
    svg: `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 ${GRID} ${GRID}" overflow="visible" class="triolet triolet-${name} triolet-play">${body}</svg>`,
    css: iconCss(model),
  };
}

function file(width: number, height: number, background: string, css: string, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Triolet icons playing their gestures"><style>${baseCss()}${css}</style>${background}${body}</svg>\n`;
}

// --- The icons, in the default colours ------------------------------------------------------

const HERO = ['bell-ring', 'calendar-check', 'shield', 'heart', 'camera', 'rocket', 'mail', 'lock', 'map-pin', 'trophy', 'settings', 'cloud', 'lightbulb', 'flame', 'truck', 'clock'];
const CYCLE = 4200;
{
  const theme = deriveTheme({ surface: '#f5f6f8' });
  const cols = 8;
  const cell = 80;
  const pad = 16;
  const width = cols * cell + pad * 2;
  const height = Math.ceil(HERO.length / cols) * cell + pad * 2;
  const parts: string[] = [];
  let css = '';
  for (const [i, name] of HERO.entries()) {
    const icon = await loadIcon(name);
    const made = cellSvg({ icon, theme }, `${name}-hero`, CYCLE, (i * 170) % 1500, pad + (i % cols) * cell + 12, pad + Math.floor(i / cols) * cell + 12, 56, `h${i}`);
    parts.push(made.svg);
    css += made.css;
  }
  const background = `<rect width="${width}" height="${height}" rx="22" fill="${theme.surface}"/>`;
  writeFileSync(join(OUT, 'icons.svg'), file(width, height, background, css, parts.join('')));
}

// --- The same icons in other palettes -------------------------------------------------------

const PALETTES = [
  { base: '#f1f2f4', main: '#1d4a68', accent: '#ee4b3b', surface: '#f5f6f8' },
  { base: '#eaf0e4', main: '#1f5a3d', accent: '#e8a13a', surface: '#f7f9f3' },
  { base: '#f3ebf2', main: '#5b2a6e', accent: '#f26b8a', surface: '#faf6fa' },
  { base: '#efe6d6', main: '#3b3a36', accent: '#d9562b', surface: '#faf6ee' },
  { base: '#e3eef2', main: '#0f5c73', accent: '#ffb000', surface: '#f3f8fa' },
  { base: '#2b3644', main: '#9fc3e8', accent: '#ff7a59', surface: '#141b24' },
];
const SHOWN = ['bell-ring', 'calendar-check', 'shield', 'heart'];
{
  const tileW = 212;
  const tileH = 76;
  const gap = 12;
  const width = 3 * tileW + 2 * gap;
  const height = 2 * tileH + gap;
  const parts: string[] = [];
  let css = '';
  const icons = await Promise.all(SHOWN.map((name) => loadIcon(name)));
  for (const [p, colors] of PALETTES.entries()) {
    const theme = deriveTheme(colors);
    const x0 = (p % 3) * (tileW + gap);
    const y0 = Math.floor(p / 3) * (tileH + gap);
    parts.push(`<rect x="${x0}" y="${y0}" width="${tileW}" height="${tileH}" rx="16" fill="${colors.surface}"/>`);
    for (const [i, icon] of icons.entries()) {
      const made = cellSvg({ icon, theme }, `${icon.name}-p${p}`, CYCLE, ((p * 4 + i) * 230) % 1500, x0 + 12 + i * 48, y0 + 14, 44, `p${p}i${i}`);
      parts.push(made.svg);
      css += made.css;
    }
  }
  writeFileSync(join(OUT, 'palettes.svg'), file(width, height, '', css, parts.join('')));
}
console.log('docs/assets/icons.svg, docs/assets/palettes.svg');
