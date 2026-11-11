/**
 * Motion as data: curves, and the value of a motion at a given time.
 *
 * `sampleMotion` is the reference every player must agree with: the CSS keyframes the build
 * writes, and the Reanimated worklets of the React Native package.
 */
import { REST, type Ease, type Key, type Motion, type Prop } from './model.ts';

export type Bezier = readonly [number, number, number, number];

/** The named curves. `out` is the house curve: quick start, long soft landing. */
export const EASES: Record<Exclude<Ease, readonly number[]>, Bezier | null> = {
  linear: null,
  out: [0.16, 1, 0.3, 1],
  inOut: [0.42, 0, 0.58, 1],
  outSoft: [0, 0, 0.58, 1],
};

export function easeBezier(ease: Ease): Bezier | null {
  return typeof ease === 'string' ? EASES[ease] : ease;
}

/** Progress (0 to 1) through a cubic bezier curve, as CSS `cubic-bezier()` computes it. */
export function bezierAt(curve: Bezier | null, p: number): number {
  if (!curve || p <= 0 || p >= 1) return Math.min(1, Math.max(0, p));
  const [x1, y1, x2, y2] = curve;
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const xAt = (t: number) => ((ax * t + bx) * t + cx) * t;
  // Newton, then bisection where the slope is too flat.
  let t = p;
  for (let i = 0; i < 8; i++) {
    const dx = xAt(t) - p;
    if (Math.abs(dx) < 1e-7) break;
    const slope = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(slope) < 1e-6) break;
    t -= dx / slope;
  }
  if (t < 0 || t > 1 || Math.abs(xAt(t) - p) > 1e-5) {
    let lo = 0;
    let hi = 1;
    t = p;
    for (let i = 0; i < 40; i++) {
      const x = xAt(t);
      if (Math.abs(x - p) < 1e-7) break;
      if (x < p) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
  }
  return ((ay * t + by) * t + cy) * t;
}

/** The value of a track at progress `p` (0 to 1) through one run. */
export function sampleTrack(keys: readonly Key[], p: number, ease: Ease): number {
  const first = keys[0]!;
  if (p <= first[0]) return first[1];
  for (let i = 1; i < keys.length; i++) {
    const k1 = keys[i]!;
    if (p <= k1[0]) {
      const k0 = keys[i - 1]!;
      const span = k1[0] - k0[0];
      const local = span > 0 ? (p - k0[0]) / span : 1;
      return k0[1] + (k1[1] - k0[1]) * bezierAt(easeBezier(k1[2] ?? ease), local);
    }
  }
  return keys[keys.length - 1]![1];
}

/** Total time a motion takes, wait included. `Infinity` for a loop. */
export function motionEnd(motion: Motion): number {
  return motion.iterations === 'infinite' ? Infinity : motion.delay + motion.duration * motion.iterations;
}

/**
 * Every animated value of a motion `t` milliseconds after the trigger. Before the wait is over
 * the first keys hold; after the last run everything is at rest.
 */
export function sampleMotion(motion: Motion, t: number): Partial<Record<Prop, number>> {
  const out: Partial<Record<Prop, number>> = {};
  const done = t >= motionEnd(motion);
  const local = Math.max(0, t - motion.delay);
  const p = done ? 1 : local <= 0 ? 0 : (local % motion.duration) / motion.duration;
  for (const prop of Object.keys(motion.tracks) as Prop[]) {
    out[prop] = done ? REST[prop] : sampleTrack(motion.tracks[prop]!, p, motion.ease);
  }
  return out;
}

/** How long an icon's whole gesture lasts, in milliseconds (`Infinity` if a part loops). */
export function gestureDuration(motions: readonly Motion[]): number {
  return motions.reduce((max, m) => Math.max(max, motionEnd(m)), 0);
}
