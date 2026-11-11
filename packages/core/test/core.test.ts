import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  IconError,
  ORIGINAL_THEME,
  bezierAt,
  circle,
  compileIcon,
  deriveTheme,
  flattenPath,
  icon,
  inset,
  layerRelief,
  mix,
  nodesBox,
  parseColor,
  parsePath,
  part,
  pill,
  plain,
  pop,
  raised,
  rect,
  rectRadii,
  renderBody,
  renderStaticSvg,
  renderSvg,
  reveal,
  sampleMotion,
  shapeBox,
  spin,
  stagger,
  stroke,
  swing,
  themeDeclarations,
  tierForSize,
  tracks,
  usedReliefs,
  type IconSource,
} from '../src/index.ts';

const near = (a: number, b: number, tolerance = 0.02) => assert.ok(Math.abs(a - b) <= tolerance, `${a} is not within ${tolerance} of ${b}`);

const sample = (over: Partial<IconSource> = {}): IconSource =>
  icon({
    name: 'sample',
    category: 'test',
    keywords: ['sample'],
    gesture: 'The dot pops.',
    draw: [raised(rect(10, 10, 60, 60, 8, 'base')), part('dot', inset(circle(40, 40, 6, 'accent')))],
    motion: { dot: pop() },
    ...over,
  });

// --- Geometry ------------------------------------------------------------------------------

test('parsePath makes relative and shorthand commands absolute', () => {
  const segs = parsePath('M21.5 26.3l3.2 3.2 6-6.4');
  assert.deepEqual(
    segs.map((s) => [s.cmd, ...s.to.map((v) => Math.round(v * 10) / 10)]),
    [
      ['M', 21.5, 26.3],
      ['L', 24.7, 29.5],
      ['L', 30.7, 23.1],
    ],
  );
  assert.deepEqual(parsePath('M0 0H10V5Z').map((s) => s.cmd), ['M', 'L', 'L', 'Z']);
  assert.throws(() => parsePath('M0 0L5'), /ends in the middle/);
  assert.throws(() => parsePath('10 10'), /must start with a command/);
});

test('an arc is followed, not cut straight', () => {
  // A half circle of radius 10 from (0,0) to (20,0), bulging upwards.
  const ys = flattenPath('M0 0A10 10 0 0 1 20 0').map(([, y]) => y);
  near(Math.min(...ys), -10);
});

test('the box of a shape ignores its stroke and follows its rotation', () => {
  assert.deepEqual(shapeBox(circle(48, 48, 10, 'main')), [38, 38, 20, 20]);
  assert.deepEqual(shapeBox(stroke('M17 47L48 21L79 47', 'main', 12)), [17, 21, 62, 26]);
  const turned = shapeBox(rect(38, 12, 20, 36, 0, 'accent', { rotate: [90, 48, 30] }))!;
  near(turned[2], 36);
  near(turned[3], 20);
});

test('a pill narrower than its radius is an ellipse, as SVG draws it', () => {
  assert.deepEqual(rectRadii(pill(28.7, 10, 7, 17, 'base')), [3.5, 8.5]);
  assert.deepEqual(rectRadii(pill(30, 50, 26, 9, 'main')), [4.5, 4.5]);
});

// --- Colours -------------------------------------------------------------------------------

test('colours parse from hex and rgb()', () => {
  assert.deepEqual(parseColor('#1D4A68'), [29, 74, 104, 1]);
  assert.deepEqual(parseColor('#fff'), [255, 255, 255, 1]);
  assert.deepEqual(parseColor('rgb(29 74 104 / 50%)'), [29, 74, 104, 0.5]);
  assert.deepEqual(parseColor('rgba(29, 74, 104, 0.5)'), [29, 74, 104, 0.5]);
  assert.throws(() => parseColor('navy'), /Not a colour/);
});

test('mix follows color-mix(in srgb)', () => {
  assert.equal(mix('#000000', '#FFFFFF', 0.5), '#808080');
  assert.equal(mix('#1D4A68', '#F1F2F4', 0), '#F1F2F4');
});

test('the derived theme stays close to the palette the first icons were drawn with', () => {
  const derived = deriveTheme();
  for (const key of ['soft', 'mid', 'mainLight', 'shade', 'insetShade'] as const) {
    const a = parseColor(derived[key]);
    const b = parseColor(ORIGINAL_THEME[key]);
    for (let i = 0; i < 3; i++) assert.ok(Math.abs(a[i]! - b[i]!) <= 10, `${key}: ${derived[key]} vs ${ORIGINAL_THEME[key]}`);
    near(a[3], b[3], 0.01);
  }
});

test('colours given by hand win over derived ones, and a dark surface softens the relief', () => {
  assert.equal(deriveTheme({ mid: '#123456' }).mid, '#123456');
  const dark = deriveTheme({ surface: '#101820' });
  assert.equal(dark.gap, '#101820');
  assert.ok(parseColor(dark.light)[3] < 0.3, 'the light is faint on a dark surface');
  assert.equal(deriveTheme().light, '#FFFFFF');
});

test('the CSS derivation declares every colour of the theme', () => {
  const css = themeDeclarations().join('\n');
  for (const name of ['base', 'main', 'accent', 'surface', 'soft', 'mid', 'main-light', 'on', 'gap', 'light', 'shade', 'inset-shade-dark']) {
    assert.match(css, new RegExp(`--tri-${name}: var\\(--triolet-${name}, `));
  }
});

// --- Compiling a source --------------------------------------------------------------------

test('compileIcon weighs layers, measures parts and places pivots', () => {
  const model = compileIcon(
    sample({
      motion: { dot: spin({ pivot: 'top' }) },
    }),
  );
  const body = model.nodes[0]!;
  const dot = model.nodes[1]!;
  assert.equal(body.type === 'layer' && body.weight, 'major');
  const inner = dot.type === 'part' ? dot.children[0]! : dot;
  assert.equal(inner.type === 'layer' && inner.weight, 'minor');
  assert.deepEqual(model.parts.dot, { box: [34, 34, 12, 12] });
  assert.deepEqual(model.motion[0]!.pivot, [40, 34]);
  assert.deepEqual(model.motion[0]!.tracks.rotate, [
    [0, 0],
    [1, 360],
  ]);
});

test('tracks are completed with rest at both ends', () => {
  const model = compileIcon(sample({ motion: { dot: pop({ scale: 1.2, at: 0.4 }) } }));
  assert.deepEqual(model.motion[0]!.tracks.scale, [
    [0, 1],
    [0.4, 1.2],
    [1, 1],
  ]);
});

test('compileIcon refuses what is malformed', () => {
  const bad = (over: Partial<IconSource>, pattern: RegExp) => assert.throws(() => compileIcon(sample(over)), (e) => e instanceof IconError && pattern.test(e.message));
  bad({ name: 'Sample' }, /kebab-case/);
  bad({ gesture: ' ' }, /describe the gesture/);
  bad({ keywords: [] }, /at least one keyword/);
  bad({ keywords: ['Dot'] }, /lower case/);
  bad({ motion: {} }, /every icon moves/);
  bad({ motion: { hand: pop() } }, /"hand", which is not a part/);
  bad({ motion: { dot: tracks({ duration: 300 }, { y: [[1, 5]] }) } }, /must end at rest/);
  bad({ motion: { dot: tracks({ duration: 300 }, { y: [[0.6, 5], [0.2, 0]] }) } }, /in order/);
  bad({ motion: { dot: tracks({ duration: 300 }, { draw: [[0, 0]] }) } }, /needs a stroked line/);
  bad({ draw: [raised(rect(60, 60, 60, 20, 4, 'base')), part('dot', plain(circle(5, 5, 2, 'on')))] }, /leaves the 96 × 96 grid/);
  bad({ draw: [part('dot', plain(circle(40, 40, 6, 'accent'))), part('dot', plain(circle(60, 40, 6, 'accent')))] }, /two parts are named "dot"/);
});

test('stagger delays each part after the one before', () => {
  const lines = stagger(['a', 'b', 'c'], reveal({ duration: 400, delay: 50 }), 100);
  assert.deepEqual([lines.a!.delay, lines.b!.delay, lines.c!.delay], [50, 150, 250]);
});

// --- Motion --------------------------------------------------------------------------------

test('bezierAt matches CSS cubic-bezier()', () => {
  near(bezierAt([0.42, 0, 0.58, 1], 0.5), 0.5, 1e-4);
  // ease-in-out at a quarter of the way: 0.1292 (value browsers compute).
  near(bezierAt([0.42, 0, 0.58, 1], 0.25), 0.1292, 1e-3);
  // The house curve halfway: t = 0.6955 on the curve, worked out by hand.
  near(bezierAt([0.16, 1, 0.3, 1], 0.5), 0.9717, 1e-3);
  assert.equal(bezierAt(null, 0.3), 0.3);
});

test('a motion holds its first key during the wait and rests when done', () => {
  const model = compileIcon(sample({ motion: { dot: reveal({ duration: 400, delay: 100 }) } }));
  const m = model.motion[0]!;
  assert.equal(sampleMotion(m, 0).scaleX, 0.12);
  assert.equal(sampleMotion(m, 100).scaleX, 0.12);
  assert.ok(sampleMotion(m, 300).scaleX! > 0.9, 'the house curve is nearly there halfway');
  assert.equal(sampleMotion(m, 500).scaleX, 1);
  assert.equal(sampleMotion(m, 5000).scaleX, 1);
});

test('a swing passes through its angles at the given moments', () => {
  const model = compileIcon(sample({ motion: { dot: swing({ angles: [14, -11], at: [0.25, 0.75], duration: 800 }) } }));
  const m = model.motion[0]!;
  near(sampleMotion(m, 200).rotate!, 14, 1e-6);
  near(sampleMotion(m, 600).rotate!, -11, 1e-6);
});

// --- Relief and SVG ------------------------------------------------------------------------

test('the tier follows the size', () => {
  assert.deepEqual([16, 23, 24, 39, 40, 96].map(tierForSize), ['flat', 'flat', 'compact', 'compact', 'relief', 'relief']);
});

test('only major layers keep a relief in the compact tier', () => {
  assert.equal(layerRelief({ effect: 'raised', weight: 'major' }, 'compact'), 'rc');
  assert.equal(layerRelief({ effect: 'raised', weight: 'minor' }, 'compact'), null);
  assert.equal(layerRelief({ effect: 'inset', tone: 'dark', weight: 'minor' }, 'relief'), 'id');
  assert.equal(layerRelief({ effect: 'raised', size: 'small', weight: 'minor' }, 'flat'), null);
});

test('an icon renders with CSS variables by default and literal colours on request', () => {
  const model = compileIcon(sample());
  const live = renderSvg(model, { size: 48, label: 'Sample', uid: 'a1' });
  assert.match(live, /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 96 96" width="48" height="48" class="triolet triolet-sample"/);
  assert.match(live, /role="img" aria-label="Sample"/);
  assert.match(live, /fill="var\(--tri-base, #F1F2F4\)"/);
  assert.match(live, /<filter id="tri-r-a1"/);
  assert.match(live, /<g class="tri-dot" filter="url\(#tri-id-a1\)">/);
  assert.match(renderSvg(model), /aria-hidden="true"/);

  const still = renderStaticSvg(model, ORIGINAL_THEME);
  assert.doesNotMatch(still, /var\(/);
  assert.match(still, /flood-color="#9DA3AB" flood-opacity="0.749"/);
});

test('shared filters leave the icon without defs, and tiers drop reliefs', () => {
  const model = compileIcon(sample());
  const shared = renderBody(model, { filters: 'shared' });
  assert.doesNotMatch(shared, /<filter/);
  assert.match(shared, /filter="url\(#tri-r\)"/);
  assert.deepEqual(usedReliefs(model, 'relief'), ['r', 'id']);
  assert.deepEqual(usedReliefs(model, 'compact'), ['rc']);
  assert.deepEqual(usedReliefs(model, 'flat'), []);
  assert.doesNotMatch(renderBody(model, { tier: 'flat' }), /filter/);
});

test('a drawn line is marked for the draw track', () => {
  const model = compileIcon(
    sample({
      draw: [raised(rect(10, 10, 60, 60, 8, 'base')), part('dot', plain(stroke('M30 40L38 48L52 32', 'on', 4)))],
      motion: { dot: tracks({ duration: 400 }, { draw: [[0, 0]] }) },
    }),
  );
  assert.match(renderBody(model), /pathLength="1" class="tri-draw"/);
  assert.deepEqual(nodesBox(model.nodes), [10, 10, 60, 60]);
});
