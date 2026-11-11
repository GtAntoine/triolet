/**
 * Writes the web spike: `spikes/web/index.html`, a page to open in Chrome, Safari and Firefox.
 *
 * It answers the risky questions of the web target before the packages are built on them:
 *   1. Can an SVG filter read a CSS custom property (flood-color), and how must it be written?
 *   2. Does the relief follow the three colours when they change live?
 *   3. Do filters shared by the page ignore colours set on a block, as expected?
 *   4. What do the three relief tiers look like from 16 to 96 px?
 *   5. Do the gestures play on hover, on keyboard focus of a parent, and not under reduced motion?
 *
 * The page probes what it can and prints the answers in a table (section "Results").
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  RELIEFS,
  SHARED_DEFS_STYLE,
  baseCss,
  deriveTheme,
  iconCss,
  renderSvg,
  sharedFilters,
  tierForSize,
  type IconModel,
  type Tier,
} from '@triolet/core';
import { ROOT, loadIcons } from './lib/icons.ts';

const icons = await loadIcons();
const byName = new Map(icons.map((m) => [m.name, m]));
const get = (name: string): IconModel => byName.get(name)!;

let uid = 0;
const own = (m: IconModel, size: number, tier: Tier = tierForSize(size), extra = '') =>
  renderSvg(m, { size, tier, small: size < 24, uid: `s${uid++}`, class: extra });
const shared = (m: IconModel, size: number) => renderSvg(m, { size, filters: 'shared' });

const SIZES = [96, 64, 48, 40, 39, 32, 24, 23, 20, 16];

const tierRows = icons
  .map((m) => {
    const row = (label: string, pick: (size: number) => Tier) =>
      `<div class="row"><span class="tag">${label}</span>${SIZES.map(
        (size) => `<figure>${own(m, size, pick(size))}<figcaption>${size}</figcaption></figure>`,
      ).join('')}</div>`;
    return `<div class="tiers"><h3>${m.name}</h3>${row('by size', tierForSize)}${row('full relief', () => 'relief')}${row('compact', () => 'compact')}${row('flat', () => 'flat')}</div>`;
  })
  .join('\n');

const defaults = deriveTheme();
const presets = {
  Original: { base: '#F1F2F4', main: '#1D4A68', accent: '#EE4B3B', surface: '#FFFFFF' },
  Forest: { base: '#EEF2EA', main: '#1F5A3D', accent: '#E8A13A', surface: '#FBFCF8' },
  Plum: { base: '#F4EEF3', main: '#5B2A6E', accent: '#F26B8A', surface: '#FFFFFF' },
  Sand: { base: '#F3ECE0', main: '#3B3A36', accent: '#D9562B', surface: '#FBF7EF' },
  Night: { base: '#2B3644', main: '#9FC3E8', accent: '#FF7A59', surface: '#141B24' },
};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Triolet web spike</title>
<style>
${baseCss()}
${icons.map(iconCss).join('\n')}
:root { color-scheme: light; }
body { margin: 0; padding: 28px 32px 80px; font: 14px/1.5 system-ui, sans-serif; color: #1c2733; background: var(--triolet-surface, #fff); transition: background 0.2s; }
body.dark { color: #e7edf3; }
h1 { font-size: 22px; margin: 0 0 4px; }
h2 { font-size: 16px; margin: 36px 0 10px; padding-top: 14px; border-top: 1px solid rgb(128 128 128 / 0.3); }
h3 { font-size: 13px; margin: 0 0 6px; font-weight: 600; }
p { margin: 4px 0 10px; max-width: 78ch; }
code { font: 12px ui-monospace, Consolas, monospace; background: rgb(128 128 128 / 0.14); padding: 1px 4px; border-radius: 4px; }
.controls { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; position: sticky; top: 0; padding: 10px 0; background: inherit; z-index: 2; }
.controls label { display: inline-flex; gap: 6px; align-items: center; }
button { font: inherit; padding: 5px 10px; border-radius: 8px; border: 1px solid rgb(128 128 128 / 0.5); background: rgb(128 128 128 / 0.08); color: inherit; cursor: pointer; }
.grid { display: flex; flex-wrap: wrap; gap: 28px; align-items: end; }
figure { margin: 0; text-align: center; font-size: 11px; opacity: 0.95; }
figcaption { margin-top: 4px; opacity: 0.7; }
.row { display: flex; gap: 18px; align-items: end; margin: 6px 0 14px; }
.row .tag { width: 76px; font-size: 11px; opacity: 0.7; align-self: center; }
.tiers { margin-bottom: 18px; }
.block { display: inline-flex; gap: 22px; padding: 14px 18px; border-radius: 14px; border: 1px dashed rgb(128 128 128 / 0.5); margin: 0 14px 10px 0; vertical-align: top; }
.triolet-trigger { display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px 8px 8px; border-radius: 12px; border: 1px solid rgb(128 128 128 / 0.4); background: none; color: inherit; font: inherit; }
.triolet-trigger:focus-visible { outline: 3px solid #4c9ffe; outline-offset: 2px; }
table { border-collapse: collapse; font-size: 13px; }
td, th { padding: 4px 10px; border-bottom: 1px solid rgb(128 128 128 / 0.25); text-align: left; vertical-align: top; }
.ok { color: #1a7f4b; font-weight: 600; } .ko { color: #c0392b; font-weight: 600; }
body.dark .ok { color: #58d68d; } body.dark .ko { color: #ff7a6b; }
/* Section 1: the three ways to hand a colour to feFlood. */
.probe-class { flood-color: var(--tri-shade); }
</style>
</head>
<body>
<h1>Triolet web spike</h1>
<p>Five icons ported from the original generator, rendered by <code>@triolet/core</code>. Change the three colours, hover the icons, tab to the buttons. Generated by <code>pnpm spike:web</code>.</p>

<div class="controls">
  <label>base <input type="color" data-var="base" value="${defaults.base}"></label>
  <label>main <input type="color" data-var="main" value="${defaults.main}"></label>
  <label>accent <input type="color" data-var="accent" value="${defaults.accent}"></label>
  <label>surface <input type="color" data-var="surface" value="${defaults.surface}"></label>
  ${Object.keys(presets)
    .map((name) => `<button type="button" data-preset="${name}">${name}</button>`)
    .join(' ')}
  <button type="button" id="play">Play all</button>
</div>

<svg class="triolet" aria-hidden="true" style="${SHARED_DEFS_STYLE}"><defs>${sharedFilters()}</defs></svg>

<h2>1. Motion: hover, keyboard focus of a parent, play()</h2>
<p>Hover an icon. Tab to a button: the icon inside plays when the button gets keyboard focus. "Play all" adds the class <code>triolet-play</code>.</p>
<div class="grid" id="motion">
  ${icons.map((m) => `<figure>${own(m, 112)}<figcaption>${m.name}</figcaption></figure>`).join('\n  ')}
</div>
<p style="margin-top:18px">
  ${icons.map((m) => `<button type="button" class="triolet-trigger">${own(m, 40)}<span>${m.name}</span></button>`).join('\n  ')}
</p>

<h2>2. Colours set on a block: own filters and shared filters</h2>
<p>Each dashed block sets its own <code>--triolet-*</code>. On the left of each block the icon has its own filters; on the right it uses the filters shared by the page. Expected: the flat colours follow the block in both; the relief shadow of the shared one keeps the page colours (a filter reads its colours where it is defined).</p>
<div>
  <div class="block" style="--triolet-base:#EEF2EA; --triolet-main:#1F5A3D; --triolet-accent:#E8A13A">
    <figure>${own(get('agenda'), 96)}<figcaption>own</figcaption></figure>
    <figure>${shared(get('agenda'), 96)}<figcaption>shared</figcaption></figure>
  </div>
  <div class="block" style="--triolet-base:#3A2230; --triolet-main:#F2C6D8; --triolet-accent:#FFD166">
    <figure>${own(get('voter'), 96)}<figcaption>own</figcaption></figure>
    <figure>${shared(get('voter'), 96)}<figcaption>shared</figcaption></figure>
  </div>
  <div class="block">
    <figure>${own(get('demarches'), 96)}<figcaption>own, page colours</figcaption></figure>
    <figure>${shared(get('demarches'), 96)}<figcaption>shared, page colours</figcaption></figure>
  </div>
</div>

<h2>3. The three relief tiers, 96 to 16 px</h2>
<p>"by size" is what the library picks: full relief from 40 px, compact relief (major shapes only, stronger) from 24 to 39 px, flat under 24 px. The other rows force one tier at every size, to compare.</p>
<p>
  <label>compact raised: offset <input type="range" id="rc-offset" min="0.5" max="4" step="0.1" value="${RELIEFS.rc.offset}"> <output id="rc-offset-out"></output></label>
  <label>blur <input type="range" id="rc-blur" min="0.3" max="4" step="0.1" value="${RELIEFS.rc.blur}"> <output id="rc-blur-out"></output></label>
</p>
${tierRows}

<h2>4. A grid of 30</h2>
<p>Thirty live icons at 48 px with their own filters, for a feel of the cost of filters on a page.</p>
<div class="grid" style="gap:16px">
  ${Array.from({ length: 30 }, (_, i) => own(icons[i % icons.length]!, 48)).join('')}
</div>

<h2>Results</h2>
<table id="results"><tbody></tbody></table>

<svg width="0" height="0" style="position:absolute" aria-hidden="true" class="triolet" id="probe">
  <defs>
    <filter id="probe-attr"><feFlood flood-color="var(--tri-shade, #010203)"/></filter>
    <filter id="probe-style"><feFlood style="flood-color: var(--tri-shade, #010203)"/></filter>
    <filter id="probe-class"><feFlood class="probe-class"/></filter>
  </defs>
  <rect id="probe-fill" width="1" height="1" fill="var(--tri-mid, #010203)"/>
</svg>

<script>
const presets = ${JSON.stringify(presets)};
const root = document.documentElement;
function setVar(name, value) {
  root.style.setProperty('--triolet-' + name, value);
  if (name === 'surface') {
    const n = parseInt(value.slice(1), 16);
    const lum = (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
    document.body.classList.toggle('dark', lum < 0.4);
    // On a dark surface the relief is a faint glow and a deep shadow.
    if (lum < 0.4) { root.style.setProperty('--triolet-light', 'rgb(255 255 255 / 0.1)'); root.style.setProperty('--triolet-shade', 'rgb(0 0 0 / 0.55)'); }
    else { root.style.removeProperty('--triolet-light'); root.style.removeProperty('--triolet-shade'); }
  }
}
document.querySelectorAll('input[data-var]').forEach((input) => input.addEventListener('input', () => { setVar(input.dataset.var, input.value); report(); }));
document.querySelectorAll('button[data-preset]').forEach((button) => button.addEventListener('click', () => {
  for (const [name, value] of Object.entries(presets[button.dataset.preset])) {
    setVar(name, value);
    document.querySelector('input[data-var="' + name + '"]').value = value;
  }
  report();
}));
document.getElementById('play').addEventListener('click', () => {
  document.querySelectorAll('.triolet').forEach((svg) => {
    svg.classList.remove('triolet-play');
    void svg.getBoundingClientRect();
    svg.classList.add('triolet-play');
  });
});

// Live tuning of the compact relief.
function tune() {
  const offset = document.getElementById('rc-offset').value;
  const blur = document.getElementById('rc-blur').value;
  document.getElementById('rc-offset-out').textContent = offset;
  document.getElementById('rc-blur-out').textContent = blur;
  document.querySelectorAll('filter[id^="tri-rc"]').forEach((filter) => {
    filter.querySelector('feGaussianBlur').setAttribute('stdDeviation', blur);
    const [lo, hi] = filter.querySelectorAll('feOffset');
    lo.setAttribute('dx', offset); lo.setAttribute('dy', offset);
    hi.setAttribute('dx', -offset); hi.setAttribute('dy', -offset);
  });
}
document.getElementById('rc-offset').addEventListener('input', tune);
document.getElementById('rc-blur').addEventListener('input', tune);
tune();

function report() {
  const rows = [];
  const add = (question, answer, ok) => rows.push([question, answer, ok]);
  const flood = (id) => getComputedStyle(document.querySelector('#' + id + ' feFlood')).floodColor;
  const fallback = 'rgb(1, 2, 3)';
  add('User agent', navigator.userAgent);
  add('color-mix() supported', String(CSS.supports('color', 'color-mix(in srgb, red 50%, blue)')), CSS.supports('color', 'color-mix(in srgb, red 50%, blue)'));
  add('Individual transforms (rotate, scale, translate)', String(CSS.supports('rotate', '10deg')), CSS.supports('rotate', '10deg'));
  const attr = flood('probe-attr'), style = flood('probe-style'), cls = flood('probe-class');
  add('flood-color="var(--x)" as an attribute', attr, attr !== fallback && attr !== 'rgb(0, 0, 0)');
  add('style="flood-color: var(--x)"', style, style !== fallback && style !== 'rgb(0, 0, 0)');
  add('flood-color: var(--x) from a class', cls, cls !== fallback && cls !== 'rgb(0, 0, 0)');
  const fill = getComputedStyle(document.getElementById('probe-fill')).fill;
  add('fill="var(--x)" as an attribute (derived tint)', fill, fill !== fallback);
  const scoped = document.querySelector('.block .triolet filter feFlood');
  const page = document.querySelector('#tri-r feFlood');
  if (scoped && page) {
    const a = getComputedStyle(scoped).floodColor, b = getComputedStyle(page).floodColor;
    add('Shadow colour of an icon with its own filters, in a coloured block', a);
    add('Shadow colour of the shared filter', b);
    add('Own filters follow the block, shared ones do not', a !== b ? 'yes: they differ' : 'no: same colour', a !== b);
  }
  add('prefers-reduced-motion', matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce (nothing should move)' : 'no-preference');
  const hand = document.querySelector('#motion .triolet-agenda .tri-hour-hand');
  add('Pivot of the clock hand (transform-origin)', getComputedStyle(hand).transformOrigin, getComputedStyle(hand).transformOrigin === '68px 67px');
  document.querySelector('#results tbody').innerHTML = rows.map(([q, a, ok]) =>
    '<tr><th>' + q + '</th><td>' + a + '</td><td class="' + (ok === undefined ? '' : ok ? 'ok' : 'ko') + '">' + (ok === undefined ? '' : ok ? 'OK' : 'FAIL') + '</td></tr>').join('');
}
report();
</script>
</body>
</html>
`;

const dir = join(ROOT, 'spikes/web');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'index.html'), html);
console.log(`Web spike written to ${join(dir, 'index.html')} (${Math.round(html.length / 1024)} KB)`);
