/**
 * Writes the control sheet of an icon: what to LOOK at before proposing it.
 *
 *   pnpm icon:sheet bell          out/sheets/bell.png
 *   pnpm icon:sheet bell cart     one sheet each
 *   pnpm icon:sheet --all         out/sheets/_all.png, every icon at 96 and 24 px
 *
 * A sheet shows the icon at every size (the relief changes at 40 and 24 px), on a dark
 * surface, flat, then its gesture as eight frames, then its three colours measured.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  GRID,
  deriveTheme,
  gestureDuration,
  motionPose,
  renderBody,
  tierForSize,
  type IconModel,
  type Pose,
  type Theme,
  type Tier,
} from '@triolet/core';
import { checkIcon } from './lib/check.ts';
import { keylineMarkup } from './lib/footprint.ts';
import { ROOT, loadIcons } from './lib/icons.ts';
import { png } from './lib/raster.ts';

const LIGHT = deriveTheme();
const DARK = deriveTheme({ base: '#2B3644', main: '#9FC3E8', accent: '#FF7A59', surface: '#141B24' });
const INK = '#1C2733';
const FONT = 'font-family="Segoe UI, Helvetica, Arial, sans-serif"';
const WIDTH = 1240;
const SIZES = [96, 64, 48, 40, 32, 24, 20, 16];

let cell = 0;
/** One icon placed on the sheet, with ids of its own. */
function place(model: IconModel, x: number, y: number, size: number, theme: Theme, tier: Tier = tierForSize(size), pose?: Pose): string {
  const body = renderBody(model, { colors: theme, tier, small: size < 24, uid: `c${cell++}`, pose });
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 ${GRID} ${GRID}" overflow="visible">${body}</svg>`;
}

const text = (x: number, y: number, value: string, options: { size?: number; fill?: string; weight?: number; anchor?: string } = {}) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${options.size ?? 13}" font-weight="${options.weight ?? 400}" fill="${options.fill ?? INK}" text-anchor="${options.anchor ?? 'start'}">${value.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`;

function sheet(model: IconModel, all: IconModel[]): string {
  const parts: string[] = [];
  const pad = 32;
  let y = 44;
  parts.push(text(pad, y, model.name, { size: 24, weight: 700 }), text(pad, y + 24, model.gesture, { size: 14, fill: '#51606F' }));
  y += 60;

  const sizesRow = (theme: Theme, ink: string, label: string) => {
    parts.push(text(pad, y, label, { size: 12, fill: ink, weight: 600 }));
    let x = pad;
    for (const size of SIZES) {
      parts.push(place(model, x, y + 14 + (96 - size), size, theme));
      parts.push(text(x + size / 2, y + 14 + 96 + 20, `${size} · ${tierForSize(size)}`, { size: 11, fill: ink, anchor: 'middle' }));
      x += size + 44;
    }
    y += 14 + 96 + 44;
  };
  const top = y;
  sizesRow(LIGHT, INK, 'Sizes: relief from 40 px, compact from 24, flat under 24');
  // The footprint, to the right of the sizes: the icon under the keyline shapes.
  const report = checkIcon(model, all);
  const [, , boxW, boxH] = report.footprint.box;
  parts.push(text(900, top, `Footprint: ${Math.round(boxW)} × ${Math.round(boxH)}, ${report.footprint.outside} % outside the keylines`, { size: 12, weight: 600 }));
  parts.push(place(model, 900, top + 12, 116, LIGHT, 'flat'));
  parts.push(`<svg x="900" y="${top + 12}" width="116" height="116" viewBox="0 0 ${GRID} ${GRID}">${keylineMarkup('#D6219C', 0.6)}</svg>`);
  parts.push(text(1032, top + 40, 'circle 72 · square 64', { size: 11, fill: '#51606F' }), text(1032, top + 57, 'tall 56 × 72 · wide 72 × 56', { size: 11, fill: '#51606F' }));
  parts.push(`<rect x="0" y="${y - 22}" width="${WIDTH}" height="${14 + 96 + 62}" fill="${DARK.surface}"/>`);
  sizesRow(DARK, '#E7EDF3', 'On a dark surface');
  y += 16;

  parts.push(text(pad, y, 'Flat finish', { size: 12, weight: 600 }));
  let x = pad;
  for (const size of [96, 48, 24]) {
    parts.push(place(model, x, y + 14 + (96 - size), size, LIGHT, 'flat'));
    x += size + 44;
  }
  // The colours, to the right of the flat row.
  const { base, main, accent } = report.ratio;
  const barX = 420;
  const barW = 520;
  parts.push(text(barX, y, `Three colours: base ${base} · main ${main} · accent ${accent}   (target 60 · 30 · 10)`, { size: 12, weight: 600 }));
  let bx = barX;
  for (const [share, fill] of [
    [base, LIGHT.base],
    [main, LIGHT.main],
    [accent, LIGHT.accent],
  ] as const) {
    const w = (barW * share) / 100;
    parts.push(`<rect x="${bx}" y="${y + 14}" width="${w}" height="18" fill="${fill}" stroke="#C9D1D9" stroke-width="1"/>`);
    bx += w;
  }
  for (const mark of [60, 90]) parts.push(`<path d="M${barX + (barW * mark) / 100} ${y + 10}v26" stroke="${INK}" stroke-width="1" stroke-dasharray="2 2"/>`);
  const notes = [...report.errors.map((e) => `error: ${e}`), ...report.warnings.map((w) => `warning: ${w}`)];
  if (notes.length === 0) notes.push('no error, no warning');
  notes.slice(0, 5).forEach((note, i) => parts.push(text(barX, y + 56 + i * 17, note, { size: 12, fill: note.startsWith('error') ? '#B3261E' : '#51606F' })));
  y += 14 + 96 + 40;

  const duration = gestureDuration(model.motion);
  const span = Number.isFinite(duration) ? duration : Math.max(...model.motion.map((m) => m.delay + m.duration));
  parts.push(text(pad, y, `Gesture: ${Number.isFinite(duration) ? `${duration} ms` : `loops every ${span} ms`}, eight frames`, { size: 12, weight: 600 }));
  x = pad;
  for (let frame = 0; frame < 8; frame++) {
    const t = (span * frame) / 7;
    parts.push(place(model, x, y + 18, 112, LIGHT, 'relief', motionPose(model.motion, Math.min(t, span - 1e-6))));
    parts.push(text(x + 56, y + 18 + 112 + 22, `${Math.round(t)} ms`, { size: 11, anchor: 'middle' }));
    x += 112 + 36;
  }
  y += 18 + 112 + 50;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${y}" viewBox="0 0 ${WIDTH} ${y}"><rect width="${WIDTH}" height="${y}" fill="${LIGHT.surface}"/>${parts.join('')}</svg>`;
}

function contactSheet(icons: IconModel[]): string {
  const columns = 8;
  const cellW = WIDTH / columns;
  const cellH = 170;
  const rows = Math.ceil(icons.length / columns);
  const parts = icons.map((model, i) => {
    const x = (i % columns) * cellW;
    const y = Math.floor(i / columns) * cellH + 20;
    return (
      place(model, x + 20, y, 96, LIGHT) +
      place(model, x + 20 + 96 + 10, y + 72, 24, LIGHT) +
      text(x + 20, y + 96 + 24, model.name, { size: 11 })
    );
  });
  const height = rows * cellH + 20;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${height}" viewBox="0 0 ${WIDTH} ${height}"><rect width="${WIDTH}" height="${height}" fill="${LIGHT.surface}"/>${parts.join('')}</svg>`;
}

const args = process.argv.slice(2);
const icons = await loadIcons();
const dir = join(ROOT, 'out/sheets');
mkdirSync(dir, { recursive: true });

if (args.includes('--all')) {
  const file = join(dir, '_all.png');
  writeFileSync(file, png(contactSheet(icons), WIDTH, undefined, true));
  console.log(file);
}
const names = args.filter((a) => !a.startsWith('--'));
if (names.length === 0 && !args.includes('--all')) {
  console.error('Usage: pnpm icon:sheet <name> [<name>…]   or   pnpm icon:sheet --all');
  process.exit(1);
}
for (const name of names) {
  const model = icons.find((m) => m.name === name);
  if (!model) {
    console.error(`No icon named "${name}".`);
    process.exit(1);
  }
  const file = join(dir, `${name}.png`);
  writeFileSync(file, png(sheet(model, icons), WIDTH * 2, undefined, true));
  console.log(file);
}
