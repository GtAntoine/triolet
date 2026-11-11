/**
 * The SVG renderer: from a model to markup.
 *
 * Colours are either CSS custom properties (`var(--tri-main, #1D4A68)`: live theming on the
 * web, and the fallback keeps a copied SVG readable without the stylesheet) or the literal
 * colours of a theme (static files, rasterisers).
 *
 * Filters are either the icon's own (in its `<defs>`, ids suffixed with `uid`) or shared
 * (`sharedFilters()` once per page). A filter reads its colours where it is DEFINED, so shared
 * filters only see the colours set on the page; an icon whose colours are set closer than that
 * needs its own.
 */
import { deriveTheme, privateVar, type Theme, type ThemeKey } from './colors.ts';
import { pathLength, rectRadii } from './geometry.ts';
import { GRID, REST, type IconModel, type Layer, type Node, type Prop, type Role, type Shape } from './model.ts';
import { RELIEFS, RELIEF_REACH, layerHidden, layerRelief, type ReliefKey, type Tier } from './relief.ts';

export interface RenderOptions {
  /** `vars` (default): CSS custom properties. A theme: its literal colours. */
  colors?: 'vars' | Theme;
  /** Relief tier (default `relief`). */
  tier?: Tier;
  /** Hide `fine` layers (when the icon is flat because it is small). */
  small?: boolean;
  /** `own` (default): filters in the icon's `<defs>`. `shared`: the page provides them. */
  filters?: 'own' | 'shared';
  /** Suffix that makes the ids of this instance unique in the page. */
  uid?: string;
  /**
   * Freezes moving parts in a pose: the value of each animated property, by part (see
   * `motionPose`). For still images of a gesture; the result has no need of the stylesheet.
   */
  pose?: Pose;
}

/** The animated values of each moving part at one moment. */
export type Pose = Record<string, Partial<Record<Prop, number>>>;

export interface SvgOptions extends RenderOptions {
  /** Width and height, in pixels. Left out: the SVG has no size of its own. */
  size?: number;
  /** Text alternative. Without it the icon is decorative and hidden from assistive tech. */
  label?: string;
  /** Extra class names for the root. */
  class?: string;
}

const DEFAULTS = deriveTheme();

/** Trims float noise: at most three decimals. */
export function num(value: number): string {
  return String(Math.round(value * 1000) / 1000);
}

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function splitAlpha(color: string): [string, number] {
  return color.length === 9 ? [color.slice(0, 7), parseInt(color.slice(7), 16) / 255] : [color, 1];
}

function cssColor(color: string): string {
  const [hex, alpha] = splitAlpha(color);
  if (alpha === 1) return hex;
  const n = (i: number) => parseInt(hex.slice(i, i + 2), 16);
  return `rgb(${n(1)} ${n(3)} ${n(5)} / ${num(alpha)})`;
}

/** The value of a paint attribute for a theme colour. */
function paint(key: ThemeKey, colors: 'vars' | Theme): string {
  return colors === 'vars' ? `var(${privateVar(key)}, ${cssColor(DEFAULTS[key])})` : splitAlpha(colors[key])[0];
}

/** `flood-color` (and `flood-opacity` when the colour is literal and translucent). */
function flood(key: ThemeKey, colors: 'vars' | Theme): string {
  if (colors === 'vars') return `<feFlood flood-color="${paint(key, colors)}"/>`;
  const [hex, alpha] = splitAlpha(colors[key]);
  return `<feFlood flood-color="${hex}"${alpha === 1 ? '' : ` flood-opacity="${num(alpha)}"`}/>`;
}

const REGION = `filterUnits="userSpaceOnUse" x="${-RELIEF_REACH}" y="${-RELIEF_REACH}" width="${GRID + 2 * RELIEF_REACH}" height="${GRID + 2 * RELIEF_REACH}" color-interpolation-filters="sRGB"`;

export function filterId(key: ReliefKey, uid = ''): string {
  return `tri-${key}${uid ? `-${uid}` : ''}`;
}

/** One relief as an SVG filter. */
export function filterMarkup(key: ReliefKey, colors: 'vars' | Theme = 'vars', uid = ''): string {
  const { kind, offset, blur, dark } = RELIEFS[key];
  const d = num(offset);
  const open = `<filter id="${filterId(key, uid)}" ${REGION}>`;
  if (kind === 'raised') {
    return (
      open +
      `<feGaussianBlur in="SourceAlpha" stdDeviation="${num(blur)}" result="b"/>` +
      `<feOffset in="b" dx="${d}" dy="${d}" result="lo"/>` +
      flood('shade', colors) +
      `<feComposite in2="lo" operator="in" result="shade"/>` +
      `<feOffset in="b" dx="-${d}" dy="-${d}" result="hi"/>` +
      flood('light', colors) +
      `<feComposite in2="hi" operator="in" result="light"/>` +
      `<feMerge><feMergeNode in="shade"/><feMergeNode in="light"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`
    );
  }
  // The inverse of the shape, moved and blurred, then kept inside the shape.
  return (
    open +
    `<feFlood flood-color="#000"/>` +
    `<feComposite in2="SourceAlpha" operator="out" result="inv"/>` +
    `<feGaussianBlur in="inv" stdDeviation="${num(blur)}" result="b"/>` +
    `<feOffset in="b" dx="${d}" dy="${d}" result="hi"/>` +
    flood(dark ? 'insetShadeDark' : 'insetShade', colors) +
    `<feComposite in2="hi" operator="in"/>` +
    `<feComposite in2="SourceAlpha" operator="in" result="shade"/>` +
    `<feOffset in="b" dx="-${d}" dy="-${d}" result="lo"/>` +
    flood(dark ? 'insetLightDark' : 'insetLight', colors) +
    `<feComposite in2="lo" operator="in"/>` +
    `<feComposite in2="SourceAlpha" operator="in" result="light"/>` +
    `<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="shade"/><feMergeNode in="light"/></feMerge></filter>`
  );
}

/** The reliefs an icon uses at a tier, in a stable order. */
export function usedReliefs(model: IconModel, tier: Tier = 'relief', small = false): ReliefKey[] {
  const used = new Set<ReliefKey>();
  const walk = (nodes: Node[]) => {
    for (const node of nodes) {
      if (node.type !== 'layer') walk(node.children);
      else if (!layerHidden(node, tier, small)) {
        const key = layerRelief(node, tier);
        if (key) used.add(key);
      }
    }
  };
  walk(model.nodes);
  return (Object.keys(RELIEFS) as ReliefKey[]).filter((key) => used.has(key));
}

function shapeMarkup(shape: Shape, colors: 'vars' | Theme, inherited: Role | null, drawable: boolean, drawnTo?: number): string {
  const attrs: string[] = [];
  switch (shape.kind) {
    case 'rect': {
      const [rx, ry] = rectRadii(shape);
      attrs.push(`x="${num(shape.x)}" y="${num(shape.y)}" width="${num(shape.w)}" height="${num(shape.h)}"`);
      if (rx > 0 || ry > 0) attrs.push(rx === ry ? `rx="${num(rx)}"` : `rx="${num(rx)}" ry="${num(ry)}"`);
      break;
    }
    case 'circle':
      attrs.push(`cx="${num(shape.cx)}" cy="${num(shape.cy)}" r="${num(shape.r)}"`);
      break;
    case 'ellipse':
      attrs.push(`cx="${num(shape.cx)}" cy="${num(shape.cy)}" rx="${num(shape.rx)}" ry="${num(shape.ry)}"`);
      break;
    case 'path':
      attrs.push(`d="${shape.d}"`);
      break;
  }
  const color = paint(shape.role, colors);
  if (shape.fill === false) attrs.push('fill="none"');
  else if (shape.role !== inherited) attrs.push(`fill="${color}"`);
  if (shape.stroke) {
    const { width, cap, dash, dashOffset } = shape.stroke;
    attrs.push(`stroke="${color}" stroke-width="${num(width)}" stroke-linejoin="round"`);
    if (cap !== 'butt') attrs.push('stroke-linecap="round"');
    if (dash) attrs.push(`stroke-dasharray="${num(dash[0])} ${num(dash[1])}"`);
    if (dashOffset) attrs.push(`stroke-dashoffset="${num(dashOffset)}"`);
    if (drawable && shape.kind === 'path' && shape.fill === false) {
      if (drawnTo === undefined) attrs.push('pathLength="1" class="tri-draw"');
      else if (drawnTo < 1) {
        // A still image: the dash is measured, so it needs neither pathLength nor the stylesheet.
        const length = pathLength(shape.d);
        attrs.push(`stroke-dasharray="${num(length)} ${num(length)}" stroke-dashoffset="${num(length * (1 - drawnTo))}"`);
      }
    }
  }
  if (shape.rotate) attrs.push(`transform="rotate(${shape.rotate.map(num).join(' ')})"`);
  return `<${shape.kind} ${attrs.join(' ')}/>`;
}

/** Geometry of a clip shape: no paint. */
function clipShapeMarkup(shape: Shape): string {
  return shapeMarkup({ ...shape, stroke: undefined, fill: undefined } as Shape, 'vars', shape.role, false);
}

/** The class of a moving part. */
export function partClass(name: string): string {
  return `tri-${name}`;
}

/**
 * The inside of the `<svg>`: `<defs>` (own filters, clip paths) and the drawing.
 */
export function renderBody(model: IconModel, options: RenderOptions = {}): string {
  const colors = options.colors ?? 'vars';
  const tier = options.tier ?? 'relief';
  const small = options.small ?? false;
  const uid = options.uid ?? '';
  const filters = options.filters ?? 'own';
  const drawn = new Set(model.motion.filter((m) => m.tracks.draw).map((m) => m.part));
  const moving = new Set(model.motion.map((m) => m.part));
  // `tri-m` marks the parts the stylesheet animates (see css.ts).
  const classOf = (name: string) => (moving.has(name) ? `tri-m ${partClass(name)}` : partClass(name));
  const defs: string[] = [];
  if (filters === 'own') for (const key of usedReliefs(model, tier, small)) defs.push(filterMarkup(key, colors, uid));
  let clips = 0;

  const pose = options.pose;
  /** The attributes that freeze a part in its pose. */
  const posed = (name: string): string[] => {
    const values = pose?.[name];
    const motion = model.motion.find((m) => m.part === name);
    if (!values || !motion) return [];
    const v = { ...REST, ...values };
    const [px, py] = motion.pivot;
    const sx = v.scale * v.scaleX;
    const sy = v.scale * v.scaleY;
    const steps: string[] = [];
    if (v.x || v.y) steps.push(`translate(${num(v.x)} ${num(v.y)})`);
    if (v.rotate || v.skewY || sx !== 1 || sy !== 1) {
      steps.push(`translate(${num(px)} ${num(py)})`);
      if (v.rotate) steps.push(`rotate(${num(v.rotate)})`);
      if (v.skewY) steps.push(`skewY(${num(v.skewY)})`);
      if (sx !== 1 || sy !== 1) steps.push(`scale(${num(sx)} ${num(sy)})`);
      steps.push(`translate(${num(-px)} ${num(-py)})`);
    }
    const attrs: string[] = [];
    if (steps.length) attrs.push(`transform="${steps.join(' ')}"`);
    if (v.opacity !== 1) attrs.push(`opacity="${num(v.opacity)}"`);
    return attrs;
  };

  const layerMarkup = (layer: Layer, partName: string | null, drawable: boolean, drawnTo?: number): string => {
    if (layerHidden(layer, tier, small)) return '';
    const key = layerRelief(layer, tier);
    const roles = new Set(layer.shapes.filter((s) => s.fill !== false).map((s) => s.role));
    const shared = roles.size === 1 && layer.shapes.length > 1 ? [...roles][0]! : null;
    const attrs: string[] = [];
    if (partName) attrs.push(`class="${classOf(partName)}"`, ...posed(partName));
    if (shared) attrs.push(`fill="${paint(shared, colors)}"`);
    if (key) attrs.push(`filter="url(#${filterId(key, filters === 'own' ? uid : '')})"`);
    const inner = layer.shapes.map((s) => shapeMarkup(s, colors, shared, drawable, drawnTo)).join('');
    return attrs.length ? `<g ${attrs.join(' ')}>${inner}</g>` : inner;
  };

  const walk = (nodes: Node[], drawable: boolean, drawnTo?: number): string =>
    nodes
      .map((node): string => {
        if (node.type === 'layer') return layerMarkup(node, null, drawable, drawnTo);
        if (node.type === 'clip') {
          const id = `tri-clip-${model.name}-${clips++}${uid ? `-${uid}` : ''}`;
          defs.push(`<clipPath id="${id}">${node.clip.map(clipShapeMarkup).join('')}</clipPath>`);
          return `<g clip-path="url(#${id})">${walk(node.children, drawable, drawnTo)}</g>`;
        }
        const partDrawable = drawable || drawn.has(node.name);
        const partDrawnTo = pose ? (pose[node.name]?.draw ?? drawnTo ?? 1) : undefined;
        // A part made of one layer puts its class on the layer's own group.
        const only = node.children.length === 1 ? node.children[0]! : null;
        if (only?.type === 'layer' && !layerHidden(only, tier, small)) {
          return layerMarkup(only, node.name, partDrawable, partDrawnTo);
        }
        return `<g ${[`class="${classOf(node.name)}"`, ...posed(node.name)].join(' ')}>${walk(node.children, partDrawable, partDrawnTo)}</g>`;
      })
      .join('');

  const body = walk(model.nodes, false);
  return (defs.length ? `<defs>${defs.join('')}</defs>` : '') + body;
}

/** The class names of an icon's root element. */
export function rootClass(name: string, extra?: string): string {
  return `triolet triolet-${name}${extra ? ` ${extra}` : ''}`;
}

/** A complete `<svg>` element. */
export function renderSvg(model: IconModel, options: SvgOptions = {}): string {
  const attrs = [
    'xmlns="http://www.w3.org/2000/svg"',
    `viewBox="0 0 ${GRID} ${GRID}"`,
    ...(options.size !== undefined ? [`width="${num(options.size)}" height="${num(options.size)}"`] : []),
    `class="${rootClass(model.name, options.class)}"`,
    `data-tier="${options.tier ?? 'relief'}"`,
    'overflow="visible"',
    ...(model.idle ? ['data-idle=""'] : []),
    ...(options.label ? ['role="img"', `aria-label="${escapeAttr(options.label)}"`] : ['aria-hidden="true"']),
    'focusable="false"',
  ];
  return `<svg ${attrs.join(' ')}>${renderBody(model, options)}</svg>`;
}

/**
 * The filters of every relief, for a page that shares them between its icons: put the result
 * once in the page, in an `<svg>` that is not `display: none` (see `SHARED_DEFS_STYLE`).
 */
export function sharedFilters(colors: 'vars' | Theme = 'vars'): string {
  return (Object.keys(RELIEFS) as ReliefKey[]).map((key) => filterMarkup(key, colors)).join('');
}

/** Inline style that hides the shared `<svg>` without disabling its filters. */
export const SHARED_DEFS_STYLE = 'position:absolute;width:0;height:0;overflow:hidden';

/** A standalone file: literal colours, its own filters, nothing else needed. */
export function renderStaticSvg(model: IconModel, theme: Theme = DEFAULTS, tier: Tier = 'relief', pose?: Pose): string {
  const body = renderBody(model, { colors: theme, tier, uid: model.name, pose });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRID} ${GRID}">${body}</svg>\n`;
}
