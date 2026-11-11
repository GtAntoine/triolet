/**
 * Motion on the UI thread: the tracks of the icon model, read by Reanimated worklets.
 *
 * One clock per icon counts the milliseconds since the gesture started. Every moving part
 * derives its transform from that clock, so parts stay in step and nothing is scheduled per
 * property. The arithmetic mirrors `sampleMotion` in @triolet/core.
 */
import type { Ease, Motion, Prop } from '../../../../packages/core/src/model.ts';

type Curve = readonly [number, number, number, number];

const CURVES: Record<string, Curve | null> = {
  linear: null,
  out: [0.16, 1, 0.3, 1],
  inOut: [0.42, 0, 0.58, 1],
  outSoft: [0, 0, 0.58, 1],
};

const curveOf = (ease: Ease): Curve | null => (typeof ease === 'string' ? (CURVES[ease] ?? null) : ease);

/** A track flattened to plain arrays, which worklets copy cheaply. */
export interface Track {
  at: number[];
  value: number[];
  /** Curve of the segment arriving at each key (`null`: linear). */
  curve: (Curve | null)[];
}

export interface PartMotion {
  delay: number;
  duration: number;
  /** Time after which the part is at rest; `Infinity` for a loop. */
  end: number;
  tracks: Partial<Record<Prop, Track>>;
}

export function prepareMotion(motion: Motion): PartMotion {
  const tracks: Partial<Record<Prop, Track>> = {};
  for (const prop of Object.keys(motion.tracks) as Prop[]) {
    const keys = motion.tracks[prop]!;
    tracks[prop] = {
      at: keys.map((k) => k[0]),
      value: keys.map((k) => k[1]),
      curve: keys.map((k) => curveOf(k[2] ?? motion.ease)),
    };
  }
  return {
    delay: motion.delay,
    duration: motion.duration,
    end: motion.iterations === 'infinite' ? Infinity : motion.delay + motion.duration * motion.iterations,
    tracks,
  };
}

/** Progress through a cubic bezier, as CSS `cubic-bezier()` computes it. */
export function bezierAt(curve: Curve | null, p: number): number {
  'worklet';
  if (!curve || p <= 0 || p >= 1) return Math.min(1, Math.max(0, p));
  const cx = 3 * curve[0];
  const bx = 3 * (curve[2] - curve[0]) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * curve[1];
  const by = 3 * (curve[3] - curve[1]) - cy;
  const ay = 1 - cy - by;
  let lo = 0;
  let hi = 1;
  let t = p;
  // Newton first, bisection as soon as it leaves the interval.
  for (let i = 0; i < 12; i++) {
    const x = ((ax * t + bx) * t + cx) * t - p;
    if (Math.abs(x) < 1e-5) break;
    if (x < 0) lo = t;
    else hi = t;
    const slope = (3 * ax * t + 2 * bx) * t + cx;
    const next = slope > 1e-6 ? t - x / slope : -1;
    t = next > lo && next < hi ? next : (lo + hi) / 2;
  }
  return ((ay * t + by) * t + cy) * t;
}

/** The value of a track at progress `p` (0 to 1) through one run. */
export function trackAt(track: Track, p: number): number {
  'worklet';
  const n = track.at.length;
  if (p <= track.at[0]) return track.value[0];
  for (let i = 1; i < n; i++) {
    if (p <= track.at[i]) {
      const span = track.at[i] - track.at[i - 1];
      const local = span > 0 ? (p - track.at[i - 1]) / span : 1;
      return track.value[i - 1] + (track.value[i] - track.value[i - 1]) * bezierAt(track.curve[i], local);
    }
  }
  return track.value[n - 1];
}

/**
 * One property of a part, `t` milliseconds after the gesture started. Before the wait is over
 * the first key holds; after the last run the property is at `rest`.
 */
export function propAt(motion: PartMotion, track: Track | undefined, rest: number, t: number): number {
  'worklet';
  if (!track || t >= motion.end) return rest;
  const local = t - motion.delay;
  if (local <= 0) return track.value[0];
  return trackAt(track, (local % motion.duration) / motion.duration);
}

/** How long the gesture of an icon lasts, in milliseconds (`Infinity` if a part loops). */
export function gestureEnd(motions: readonly PartMotion[]): number {
  return motions.reduce((max, m) => Math.max(max, m.end), 0);
}
