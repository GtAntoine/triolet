/**
 * Motion and theming as CSS, with no animation library.
 *
 * `baseCss()` is shared by every icon: the colour derivation and the triggers. `iconCss()` is
 * what one icon adds: the pivot of each moving part, its keyframes, and the animation itself
 * stored in a custom property (`--tri-a`). The base sheet decides WHEN that animation runs, so
 * triggers live in one place:
 *
 *   - the icon is hovered, or an ancestor with the class `triolet-trigger` is hovered or
 *     focused from the keyboard;
 *   - the icon has the class `triolet-play` (set by `play()` or when it scrolls into view);
 *   - the icon loops by itself (`data-idle`).
 *
 * Nothing moves when the user asks for reduced motion.
 *
 * A part is transformed in this order, around its pivot: translate, rotate, skew, scale. The
 * keyframes use the individual `translate`, `rotate` and `scale` properties, which CSS applies
 * in that order, so tracks with different rhythms stay independent.
 */
import { themeDeclarations } from './colors.ts';
import { REST, type Ease, type IconModel, type Key, type Motion, type Prop } from './model.ts';
import { easeBezier, sampleTrack } from './motion.ts';
import { num, partClass } from './svg.ts';

/** Class of every part that has a motion: the base sheet animates these, and only these. */
export const MOVING_CLASS = 'tri-m';
/** Class of a stroked line that a `draw` track draws. */
export const DRAW_CLASS = 'tri-draw';
/** Class that plays an icon's gesture once (or keeps a loop running). */
export const PLAY_CLASS = 'triolet-play';
/** Class of an ancestor whose hover or keyboard focus plays the icons inside it. */
export const TRIGGER_CLASS = 'triolet-trigger';

/** Colours for a dark surface, as public custom properties. */
export const DARK_SURFACE_VARS = '--triolet-light: rgb(255 255 255 / 0.1); --triolet-shade: rgb(0 0 0 / 0.55);';

export function baseCss(): string {
  const playing = [
    '.triolet:not([data-trigger]):hover',
    `.triolet.${PLAY_CLASS}`,
    '.triolet[data-idle]',
    `:is(.${TRIGGER_CLASS}:hover, .${TRIGGER_CLASS}:focus-visible) .triolet:not([data-trigger])`,
  ].join(', ');
  return [
    `.triolet { ${themeDeclarations().join(' ')} flex: none; overflow: visible; }`,
    `.triolet-dark { ${DARK_SURFACE_VARS} }`,
    `.triolet .${DRAW_CLASS} { stroke-dasharray: 1; }`,
    `@media (prefers-reduced-motion: no-preference) { :is(${playing}) :is(.${MOVING_CLASS}, .${DRAW_CLASS}) { animation: var(--tri-a, none); } }`,
    '',
  ].join('\n');
}

function cssEase(ease: Ease): string {
  const b = easeBezier(ease);
  return b ? `cubic-bezier(${b.map(num).join(', ')})` : 'linear';
}

const sameEase = (a: Ease, b: Ease) => cssEase(a) === cssEase(b);

/** What a group of tracks declares at one moment: a CSS property and its value. */
interface Channel {
  css: string;
  props: Prop[];
  value: (v: Record<Prop, number>) => string;
}

function channels(motion: Motion): Channel[] {
  const has = (p: Prop) => motion.tracks[p] !== undefined;
  const out: Channel[] = [];
  if (has('x') || has('y')) out.push({ css: 'translate', props: ['x', 'y'], value: (v) => `${num(v.x)}px ${num(v.y)}px` });
  if (has('rotate')) out.push({ css: 'rotate', props: ['rotate'], value: (v) => `${num(v.rotate)}deg` });
  const scaleProps: Prop[] = ['scale', 'scaleX', 'scaleY'];
  const scaled = scaleProps.some(has);
  const scale = (v: Record<Prop, number>) => [num(v.scale * v.scaleX), num(v.scale * v.scaleY)];
  if (has('skewY')) {
    // Skew comes before scale, so both go in `transform`, which CSS applies last.
    out.push({
      css: 'transform',
      props: ['skewY', ...scaleProps],
      value: (v) => `skewY(${num(v.skewY)}deg)${scaled ? ` scale(${scale(v).join(', ')})` : ''}`,
    });
  } else if (scaled) {
    out.push({ css: 'scale', props: scaleProps, value: (v) => scale(v).join(' ') });
  }
  if (has('opacity')) out.push({ css: 'opacity', props: ['opacity'], value: (v) => num(v.opacity) });
  return out;
}

interface Frame {
  at: number;
  /** Curve of the segment LEAVING this frame, when it is not the motion's own. */
  ease?: Ease;
  decls: string[];
}

/** The frames of one channel: the moments any of its tracks has a key. */
function framesOf(motion: Motion, channel: Pick<Channel, 'props'> & { declare: (v: Record<Prop, number>) => string }): Frame[] {
  const tracks = channel.props.filter((p) => motion.tracks[p]).map((p) => [p, motion.tracks[p]!] as const);
  const times = [...new Set(tracks.flatMap(([, keys]) => keys.map((k) => k[0])))].sort((a, b) => a - b);
  // A key may name the curve of the segment arriving at it.
  const arriving = (at: number): Ease | undefined => {
    for (const [, keys] of tracks) {
      const key = keys.find((k) => k[0] === at);
      if (key?.[2] !== undefined) return key[2];
    }
    return undefined;
  };
  return times.map((at, i): Frame => {
    const values = { ...REST };
    for (const [prop, keys] of tracks) {
      // A step in a track (two keys at the same moment) keeps the later one.
      const exact = keys.findLast((k: Key) => k[0] === at);
      values[prop] = exact ? exact[1] : sampleTrack(keys, at, motion.ease);
    }
    const next = times[i + 1];
    const ease = next === undefined ? undefined : arriving(next);
    const frame: Frame = { at, decls: [channel.declare(values)] };
    if (ease !== undefined && !sameEase(ease, motion.ease)) frame.ease = ease;
    return frame;
  });
}

const percent = (at: number) => (at === 0 ? 'from' : at === 1 ? 'to' : `${num(at * 100)}%`);

function keyframes(name: string, frames: Frame[]): string {
  const body = frames
    .map((f) => `${percent(f.at)} { ${f.decls.join(' ')}${f.ease !== undefined ? ` animation-timing-function: ${cssEase(f.ease)};` : ''} }`)
    .join(' ');
  return `@keyframes ${name} { ${body} }`;
}

/** Frames of several channels with the same rhythm share one `@keyframes`. */
function mergeFrames(groups: Frame[][]): Frame[][] {
  const merged: Frame[][] = [];
  const signature = (frames: Frame[]) => frames.map((f) => `${f.at}:${f.ease === undefined ? '' : cssEase(f.ease)}`).join('|');
  const bySignature = new Map<string, Frame[]>();
  for (const frames of groups) {
    const known = bySignature.get(signature(frames));
    if (known) known.forEach((f, i) => f.decls.push(...frames[i]!.decls));
    else {
      bySignature.set(signature(frames), frames);
      merged.push(frames);
    }
  }
  return merged;
}

function timing(motion: Motion, name: string): string {
  const parts = [name, `${num(motion.duration / 1000)}s`, cssEase(motion.ease)];
  if (motion.delay) parts.push(`${num(motion.delay / 1000)}s`);
  if (motion.iterations !== 1) parts.push(String(motion.iterations));
  parts.push('backwards');
  return parts.join(' ');
}

/** The CSS of one icon's gesture: pivots, animations and keyframes. */
export function iconCss(model: IconModel): string {
  const root = `.triolet-${model.name}`;
  const rules: string[] = [];
  const frames: string[] = [];
  for (const motion of model.motion) {
    const part = `${root} .${partClass(motion.part)}`;
    const prefix = `tri-${model.name}-${motion.part}`;
    const groups = mergeFrames(channels(motion).map((c) => framesOf(motion, { props: c.props, declare: (v) => `${c.css}: ${c.value(v)};` })));
    const names = groups.map((_, i) => (groups.length === 1 ? prefix : `${prefix}-${i + 1}`));
    groups.forEach((g, i) => frames.push(keyframes(names[i]!, g)));
    const decls = [`transform-origin: ${num(motion.pivot[0])}px ${num(motion.pivot[1])}px;`];
    if (names.length) decls.push(`--tri-a: ${names.map((n) => timing(motion, n)).join(', ')};`);
    // A part that is only drawn still owns `--tri-a`, so that it does not inherit one.
    else decls.push('--tri-a: none;');
    rules.push(`${part} { ${decls.join(' ')} }`);
    if (motion.tracks.draw) {
      const name = `${prefix}-draw`;
      const drawn = framesOf(motion, { props: ['draw'], declare: (v) => `stroke-dashoffset: ${num(1 - v.draw)};` });
      frames.push(keyframes(name, drawn));
      rules.push(`${part} .${DRAW_CLASS} { --tri-a: ${timing(motion, name)}; }`);
    }
  }
  return [...rules, ...frames, ''].join('\n');
}
