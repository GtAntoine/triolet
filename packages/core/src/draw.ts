/**
 * The drawing language of an icon source (`icons/<name>.ts`).
 *
 *     export default icon({
 *       name: 'demarches',
 *       draw: [
 *         raised(path('M31 14H60L80 34V70…Z', 'base')),
 *         part('corner', raised.small(path('M60 14L80 34H65A5 5 0 0 1 60 29Z', 'accent'))),
 *         part('line-1', inset(pill(30, 50, 26, 9, 'main'))),
 *       ],
 *       motion: { 'line-1': reveal({ duration: 450 }) },
 *     });
 *
 * Shapes carry a colour role. `raised`, `inset` and `plain` wrap shapes in a layer with one
 * effect. `part` names what moves together; `clip` cuts what is inside to a shape.
 */
import type {
  CircleShape,
  ClipNode,
  EllipseShape,
  Layer,
  Node,
  PartNode,
  PathShape,
  RectShape,
  Role,
  Shape,
  Weight,
} from './model.ts';
import type { MotionSpec } from './gestures.ts';

export interface ShapeOptions {
  /** Also stroke the shape with its own colour, this wide (a thick rounded outline). */
  outline?: number;
  /** Static rotation: degrees, then the point to turn around. */
  rotate?: [degrees: number, cx: number, cy: number];
}

function withOptions<S extends Shape>(shape: S, options: ShapeOptions | undefined): S {
  if (options?.outline !== undefined) shape.stroke = { width: options.outline };
  if (options?.rotate) shape.rotate = options.rotate;
  return shape;
}

/** A rounded rectangle. */
export function rect(x: number, y: number, w: number, h: number, r: number, role: Role, options?: ShapeOptions): RectShape {
  return withOptions({ kind: 'rect', x, y, w, h, r, role }, options);
}

/** A rectangle with fully rounded ends (radius: half its height). */
export function pill(x: number, y: number, w: number, h: number, role: Role, options?: ShapeOptions): RectShape {
  return rect(x, y, w, h, h / 2, role, options);
}

export function circle(cx: number, cy: number, r: number, role: Role, options?: ShapeOptions): CircleShape {
  return withOptions({ kind: 'circle', cx, cy, r, role }, options);
}

export function ellipse(cx: number, cy: number, rx: number, ry: number, role: Role, options?: ShapeOptions): EllipseShape {
  return withOptions({ kind: 'ellipse', cx, cy, rx, ry, role }, options);
}

/** A filled path. */
export function path(d: string, role: Role, options?: ShapeOptions): PathShape {
  return withOptions({ kind: 'path', d, role }, options);
}

/** A line: a path that is stroked, not filled, with round ends and joins. */
export function stroke(d: string, role: Role, width: number): PathShape {
  return { kind: 'path', d, role, fill: false, stroke: { width } };
}

export interface RingOptions {
  /** Dash and gap lengths along the ring; segments end square. */
  dash?: [number, number];
  dashOffset?: number;
}

/** A circle that is stroked, not filled. */
export function ring(cx: number, cy: number, r: number, role: Role, width: number, options?: RingOptions): CircleShape {
  const shape: CircleShape = { kind: 'circle', cx, cy, r, role, fill: false, stroke: { width } };
  if (options?.dash) {
    shape.stroke = { width, cap: 'butt', dash: options.dash };
    if (options.dashOffset !== undefined) shape.stroke.dashOffset = options.dashOffset;
  }
  return shape;
}

/** A polygon drawn around the origin, turned, then placed at (cx, cy). Coordinates keep one decimal. */
export function turned(points: readonly (readonly [number, number])[], degrees: number, cx: number, cy: number): string {
  const a = (degrees * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return `M${points.map(([x, y]) => `${(cx + x * c - y * s).toFixed(1)} ${(cy + x * s + y * c).toFixed(1)}`).join('L')}Z`;
}

// --- Layers --------------------------------------------------------------------------------

/** A layer as written in a source: its weight is worked out at build time unless given. */
export type DrawLayer = Omit<Layer, 'weight'> & { weight?: Weight };
export type DrawNode = DrawLayer | DrawPart | DrawClip;
export interface DrawPart extends Omit<PartNode, 'children'> {
  children: DrawNode[];
}
export interface DrawClip extends Omit<ClipNode, 'children'> {
  children: DrawNode[];
}

type LayerArg = Shape | Shape[] | { weight: Weight };

function collect(args: LayerArg[]): { shapes: Shape[]; weight?: Weight } {
  const shapes: Shape[] = [];
  let weight: Weight | undefined;
  for (const arg of args) {
    if (Array.isArray(arg)) shapes.push(...arg);
    else if ('kind' in arg) shapes.push(arg);
    else weight = arg.weight;
  }
  if (shapes.length === 0) throw new Error('A layer needs at least one shape');
  return weight ? { shapes, weight } : { shapes };
}

const DARK_ROLES: readonly Role[] = ['main', 'accent', 'mainLight'];

/**
 * Shapes that stand out of the surface: a soft light on the upper left, a soft shadow on the
 * lower right. `raised.small` is the tighter relief of small pieces.
 */
export const raised: {
  (...shapes: LayerArg[]): DrawLayer;
  small: (...shapes: LayerArg[]) => DrawLayer;
} = Object.assign((...shapes: LayerArg[]): DrawLayer => ({ type: 'layer', effect: 'raised', ...collect(shapes) }), {
  small: (...shapes: LayerArg[]): DrawLayer => ({ type: 'layer', effect: 'raised', size: 'small', ...collect(shapes) }),
});

/**
 * Shapes pressed into what is under them: an inner shadow on the upper left, an inner light on
 * the lower right. The tone of the shadow follows the first shape's colour.
 */
export function inset(...shapes: LayerArg[]): DrawLayer {
  const layer = collect(shapes);
  const tone = DARK_ROLES.includes(layer.shapes[0]!.role) ? 'dark' : 'light';
  return { type: 'layer', effect: 'inset', tone, ...layer };
}

/** Shapes with no effect: ink on a colour, a ring that detaches a badge. */
export function plain(...shapes: LayerArg[]): DrawLayer {
  return { type: 'layer', effect: 'plain', ...collect(shapes) };
}

/** Forces the weight of a layer: `raised(shape, weight('fine'))`. */
export function weight(value: Weight): { weight: Weight } {
  return { weight: value };
}

type NodeArg = DrawNode | DrawNode[];

const flat = (nodes: NodeArg[]): DrawNode[] => nodes.flat();

/** A named piece that moves as one. Names are kebab-case and unique in the icon. */
export function part(name: string, ...children: NodeArg[]): DrawPart {
  return { type: 'part', name, children: flat(children) };
}

/** Cuts its children to a shape (a ballot entering a slot, a sun behind a frame). */
export function clip(shape: Shape | Shape[], ...children: NodeArg[]): DrawClip {
  return { type: 'clip', clip: Array.isArray(shape) ? shape : [shape], children: flat(children) };
}

// --- The icon ------------------------------------------------------------------------------

export interface IconSource {
  /** kebab-case, the file name without `.ts`. */
  name: string;
  category: string;
  /** Search words, lower case. */
  keywords: string[];
  /** Other names the icon answers to. */
  aliases?: string[];
  /** One sentence: what moves and what it tells. */
  gesture: string;
  draw: NodeArg[];
  /** The motion of each moving part, by part name. */
  motion: Record<string, MotionSpec>;
  /** `true` when the gesture loops by itself instead of answering a trigger. */
  idle?: boolean;
}

/** Declares an icon. The build turns it into the model (see `compileIcon`). */
export function icon(source: IconSource): IconSource {
  return source;
}

export type { Node };
