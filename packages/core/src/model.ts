/**
 * The icon model: what the build writes to `model/<name>.json` and what every renderer reads
 * (SVG string, CSS motion, React, React Native Skia).
 *
 * An icon is drawn on a 96 × 96 grid. Each SHAPE carries a colour role; each LAYER carries one
 * effect (raised, inset or plain) shared by its shapes; a PART names a group of layers that
 * moves as one piece.
 */

/** Side of the drawing grid, in units. */
export const GRID = 96;

/**
 * Colour roles.
 * - `base` (60), `main` (30) and `accent` (10) are the three colours a user sets.
 * - `soft` and `mid` are two tints of `main` in `base` (13 % and 24 %), for recessed details.
 * - `mainLight` is a lighter `main`, for a face of a dark object that catches the light.
 * - `on` is ink drawn on a colour (a check, a clock hand). White by default.
 * - `gap` is the ring that detaches a badge from what is behind it; it follows the surface.
 */
export type Role = 'base' | 'main' | 'accent' | 'soft' | 'mid' | 'mainLight' | 'on' | 'gap';

export const ROLES: readonly Role[] = ['base', 'main', 'accent', 'soft', 'mid', 'mainLight', 'on', 'gap'];

/** The colour a role is counted under for the 60:30:10 check (`null`: not counted). */
export const ROLE_FAMILY: Record<Role, 'base' | 'main' | 'accent' | null> = {
  base: 'base',
  soft: 'base',
  mid: 'base',
  on: 'base',
  main: 'main',
  mainLight: 'main',
  accent: 'accent',
  gap: null,
};

export interface StrokePaint {
  /** Stroke width, in grid units. Joins are always round. */
  width: number;
  /** Round by default; `butt` for dashed rings whose segments must end square. */
  cap?: 'butt';
  /** Dash and gap lengths, in grid units. */
  dash?: [number, number];
  dashOffset?: number;
}

interface ShapeBase {
  role: Role;
  /** Filled unless `false` (a stroke-only shape). */
  fill?: false;
  /** Stroked with the shape's own role. */
  stroke?: StrokePaint;
  /** Static rotation, in degrees around a point of the grid. */
  rotate?: [degrees: number, cx: number, cy: number];
}

export interface RectShape extends ShapeBase {
  kind: 'rect';
  x: number;
  y: number;
  w: number;
  h: number;
  /**
   * Corner radius, with the SVG rule: the horizontal radius is capped at w / 2 and the vertical
   * one at h / 2 independently (so a tall "pill" narrower than its radius is an ellipse).
   */
  r: number;
}

export interface CircleShape extends ShapeBase {
  kind: 'circle';
  cx: number;
  cy: number;
  r: number;
}

export interface EllipseShape extends ShapeBase {
  kind: 'ellipse';
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface PathShape extends ShapeBase {
  kind: 'path';
  /** SVG path data, in grid units. */
  d: string;
}

export type Shape = RectShape | CircleShape | EllipseShape | PathShape;

export type Effect = 'raised' | 'inset' | 'plain';

/**
 * How much a layer weighs in the drawing, which decides what happens to it at small sizes:
 * `major` keeps a relief between 24 and 39 px, `minor` goes flat there, and `fine` is also
 * hidden under 24 px.
 */
export type Weight = 'major' | 'minor' | 'fine';

export interface Layer {
  type: 'layer';
  effect: Effect;
  /** Raised layers only: `small` is the tighter relief of small pieces. */
  size?: 'small';
  /** Inset layers only: `dark` when the fill is a dark colour (main, accent, mainLight). */
  tone?: 'light' | 'dark';
  weight: Weight;
  shapes: Shape[];
}

export interface PartNode {
  type: 'part';
  name: string;
  children: Node[];
}

export interface ClipNode {
  type: 'clip';
  /** The clip region: geometry only, roles are ignored. */
  clip: Shape[];
  children: Node[];
}

export type Node = Layer | PartNode | ClipNode;

// --- Motion --------------------------------------------------------------------------------

/** What a track animates. Lengths are in grid units, angles in degrees. */
export type Prop = 'x' | 'y' | 'rotate' | 'scale' | 'scaleX' | 'scaleY' | 'skewY' | 'opacity' | 'draw';

export const PROPS: readonly Prop[] = ['x', 'y', 'rotate', 'scale', 'scaleX', 'scaleY', 'skewY', 'opacity', 'draw'];

/** The value of each property when nothing moves. */
export const REST: Record<Prop, number> = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  skewY: 0,
  opacity: 1,
  draw: 1,
};

/** A named curve or the four numbers of a cubic bezier. */
export type Ease = 'linear' | 'out' | 'inOut' | 'outSoft' | readonly [number, number, number, number];

/** A key: position in the motion (0 to 1), value, and the curve of the segment arriving here. */
export type Key = readonly [at: number, value: number, ease?: Ease];

export interface Motion {
  /** The part that moves. */
  part: string;
  /** The point it turns and scales around, in grid units. */
  pivot: [number, number];
  /** One run, in milliseconds. */
  duration: number;
  /** Wait before the first run, in milliseconds. The first key holds during the wait. */
  delay: number;
  /** Number of runs, or `infinite`. */
  iterations: number | 'infinite';
  /** Curve of every segment that does not name its own. */
  ease: Ease;
  /** One track per animated property. Every track ends at rest. */
  tracks: Partial<Record<Prop, Key[]>>;
}

/** Bounding box in grid units. */
export type Box = [x: number, y: number, w: number, h: number];

export interface IconModel {
  name: string;
  category: string;
  keywords: string[];
  aliases: string[];
  /** One sentence: what moves and what it tells. */
  gesture: string;
  nodes: Node[];
  /** Every named part, with the box of its geometry (strokes excluded, like the SVG fill box). */
  parts: Record<string, { box: Box }>;
  motion: Motion[];
  /** `true` when the gesture loops by itself instead of answering a trigger. */
  idle: boolean;
}
