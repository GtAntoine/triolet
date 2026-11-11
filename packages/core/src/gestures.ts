/**
 * Named gestures: short ways to write the tracks of a moving part. Each returns a plain
 * `MotionSpec`; the build resolves it to tracks (see `compileIcon`), so the model and the
 * players never hear of gesture names. When no gesture fits, write a `MotionSpec` by hand with
 * `tracks()`.
 */
import type { Ease, Key, Prop } from './model.ts';

/** Where a part turns and scales around: a side or corner of its box, or a point of the grid. */
export type Pivot =
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | readonly [x: number, y: number];

export interface Timing {
  /** One run, in milliseconds. */
  duration?: number;
  /** Wait before the first run, in milliseconds. */
  delay?: number;
  /** Number of runs, or `infinite`. */
  iterations?: number | 'infinite';
  ease?: Ease;
  pivot?: Pivot;
}

/** A track as written in a source: the keys at 0 and 1 may be left out (they are at rest). */
export interface MotionSpec extends Required<Pick<Timing, 'duration'>>, Omit<Timing, 'duration'> {
  tracks: Partial<Record<Prop, readonly Key[]>>;
}

function spec(timing: Timing, defaults: Required<Pick<Timing, 'duration' | 'ease'>> & Timing, tracks: MotionSpec['tracks']): MotionSpec {
  const out: MotionSpec = { duration: timing.duration ?? defaults.duration, ease: timing.ease ?? defaults.ease, tracks };
  const delay = timing.delay ?? defaults.delay;
  const iterations = timing.iterations ?? defaults.iterations;
  const pivot = timing.pivot ?? defaults.pivot;
  if (delay) out.delay = delay;
  if (iterations !== undefined && iterations !== 1) out.iterations = iterations;
  if (pivot !== undefined) out.pivot = pivot;
  return out;
}

/** Tracks written by hand, for a gesture no shortcut covers. */
export function tracks(timing: Timing & { duration: number }, value: MotionSpec['tracks']): MotionSpec {
  return spec(timing, { duration: timing.duration, ease: 'inOut' }, value);
}

/**
 * The part grows into place from one side, like a line being written or a bar rising.
 * `from` is the side it grows from; `amount` is the size it starts at.
 */
export function reveal(options: Timing & { from?: 'left' | 'right' | 'top' | 'bottom'; amount?: number } = {}): MotionSpec {
  const from = options.from ?? 'left';
  const horizontal = from === 'left' || from === 'right';
  const amount = options.amount ?? (horizontal ? 0.12 : 0.3);
  return spec(options, { duration: 450, ease: 'out', pivot: from }, { [horizontal ? 'scaleX' : 'scaleY']: [[0, amount]] });
}

/** The part swells and settles back: something lands, lights up or answers. */
export function pop(options: Timing & { scale?: number; at?: number; x?: number; y?: number } = {}): MotionSpec {
  const at = options.at ?? 0.45;
  const value: MotionSpec['tracks'] = { scale: [[at, options.scale ?? 1.35]] };
  if (options.x) value.x = [[at, options.x]];
  if (options.y) value.y = [[at, options.y]];
  return spec(options, { duration: 500, ease: 'out' }, value);
}

/**
 * The part moves a little and comes back: a roof lifting, a sheet coming out. With `settle` it
 * comes back slightly past its place before resting.
 */
export function nudge(options: Timing & { x?: number; y?: number; at?: number; settle?: boolean } = {}): MotionSpec {
  const x = options.x ?? 0;
  const y = options.y ?? (options.x === undefined ? -6 : 0);
  const settle = options.settle ?? false;
  const at = options.at ?? (settle ? 0.4 : 0.5);
  const keys = (v: number): Key[] => (settle ? [[at, v], [0.7, -v / 6]] : [[at, v]]);
  const value: MotionSpec['tracks'] = {};
  if (x) value.x = keys(x);
  if (y) value.y = keys(y);
  return spec(options, { duration: 550, ease: 'out' }, value);
}

/** The part jumps and lands with a small second hop. */
export function bounce(options: Timing & { height?: number } = {}): MotionSpec {
  const h = options.height ?? 8;
  return spec(options, { duration: 700, ease: 'outSoft' }, { y: [[0.3, -h], [0.55, 0], [0.75, -h * 0.3125]] });
}

/**
 * The part rocks around its pivot through a list of angles and comes to rest: a bell ringing,
 * a card tilting. `at` gives the moment of each angle (0 to 1); by default they are spread evenly.
 */
export function swing(options: Timing & { angles?: readonly number[]; at?: readonly number[] } = {}): MotionSpec {
  const angles = options.angles ?? [14, -11, 7, -4];
  const at = options.at ?? angles.map((_, i) => (i + 1) / (angles.length + 1));
  if (at.length !== angles.length) throw new Error('swing: `at` needs one moment per angle');
  return spec(options, { duration: 800, ease: 'inOut' }, { rotate: angles.map((a, i): Key => [at[i]!, a]) });
}

/** The part turns around its pivot: `turns` full turns, or from `from` degrees back to rest. */
export function spin(options: Timing & { turns?: number; from?: number } = {}): MotionSpec {
  const rotate: Key[] = options.from !== undefined ? [[0, options.from]] : [[1, 360 * (options.turns ?? 1)]];
  return spec(options, { duration: 1000, ease: 'inOut' }, { rotate });
}

/** The part dims and comes back: a light, a signal. */
export function blink(options: Timing & { to?: number } = {}): MotionSpec {
  return spec(options, { duration: 350, ease: 'inOut' }, { opacity: [[0, 1], [0.5, options.to ?? 0.25], [1, 1]] });
}

/** The lines of the part are drawn from their start: a check, a signature. */
export function draw(options: Timing = {}): MotionSpec {
  return spec(options, { duration: 450, delay: 100, ease: 'outSoft' }, { draw: [[0, 0]] });
}

/**
 * The part travels. With `from` it arrives from an offset (and fades in with `fade`); with
 * `via` it visits points and comes back: `[x, y, at]`, the moment between 0 and 1.
 */
export function travel(
  options: Timing & { from?: readonly [number, number]; fade?: boolean; via?: readonly (readonly [number, number, number])[] } = {},
): MotionSpec {
  const value: MotionSpec['tracks'] = {};
  if (options.via) {
    value.x = options.via.map(([x, , at]): Key => [at, x]);
    value.y = options.via.map(([, y, at]): Key => [at, y]);
  } else {
    const [x, y] = options.from ?? [0, 8];
    if (x) value.x = [[0, x]];
    if (y) value.y = [[0, y]];
    if (options.fade) value.opacity = [[0, 0]];
  }
  return spec(options, { duration: 700, ease: options.via ? 'inOut' : 'out' }, value);
}

/** The part ripples from its attached side, like a flag in the wind. */
export function wave(options: Timing = {}): MotionSpec {
  return spec(
    options,
    { duration: 900, ease: 'inOut', pivot: 'left' },
    {
      skewY: [[0.25, -9], [0.6, 6]],
      scaleX: [[0.25, 0.92], [0.6, 0.96]],
    },
  );
}

/** The same gesture on several parts, each starting `step` milliseconds after the one before. */
export function stagger(parts: readonly string[], gesture: MotionSpec, step: number): Record<string, MotionSpec> {
  return Object.fromEntries(parts.map((name, i) => [name, i === 0 ? gesture : { ...gesture, delay: (gesture.delay ?? 0) + i * step }]));
}

export const GESTURES = ['reveal', 'pop', 'nudge', 'bounce', 'swing', 'spin', 'blink', 'draw', 'travel', 'wave'] as const;
