/**
 * From a source (`icons/<name>.ts`) to the model (`model/<name>.json`): weighs the layers,
 * measures the parts, places the pivots, completes the tracks and refuses what is malformed.
 */
import type { DrawNode, IconSource } from './draw.ts';
import type { MotionSpec, Pivot } from './gestures.ts';
import { nodesBox, roundBox, shapeBox, unionBox } from './geometry.ts';
import { GRID, PROPS, REST, ROLES, type Box, type IconModel, type Key, type Layer, type Motion, type Node, type Prop, type Weight } from './model.ts';

const NAME = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

/** A layer whose box (strokes included) covers at least this many square units is `major`. */
export const MAJOR_AREA = 600;

export class IconError extends Error {
  constructor(icon: string, message: string) {
    super(`${icon}: ${message}`);
    this.name = 'IconError';
  }
}

function layerWeight(layer: Omit<Layer, 'weight'>): Weight {
  const boxes = layer.shapes.map((shape) => {
    const box = shapeBox(shape);
    if (!box) return null;
    const grow = shape.stroke?.width ?? 0;
    return [box[0] - grow / 2, box[1] - grow / 2, box[2] + grow, box[3] + grow] as Box;
  });
  const box = unionBox(boxes);
  return box && box[2] * box[3] >= MAJOR_AREA ? 'major' : 'minor';
}

function resolvePivot(pivot: Pivot | undefined, box: Box): [number, number] {
  if (Array.isArray(pivot)) return [pivot[0] as number, pivot[1] as number];
  const side = (pivot ?? 'center') as string;
  const [x, y, w, h] = box;
  const px = side.includes('left') ? x : side.includes('right') ? x + w : x + w / 2;
  const py = side.includes('top') ? y : side.includes('bottom') ? y + h : y + h / 2;
  const round = (v: number) => Math.round(v * 100) / 100;
  return [round(px), round(py)];
}

function hasDrawableStroke(nodes: Node[]): boolean {
  return nodes.some((node) =>
    node.type === 'layer' ? node.shapes.some((s) => s.kind === 'path' && s.fill === false && s.stroke) : hasDrawableStroke(node.children),
  );
}

export function compileIcon(source: IconSource): IconModel {
  const fail = (message: string): never => {
    throw new IconError(source.name || '(unnamed)', message);
  };
  if (!NAME.test(source.name)) fail(`the name must be kebab-case (got "${source.name}")`);
  if (!source.category) fail('a category is required');
  if (!source.gesture?.trim()) fail('describe the gesture in one sentence (`gesture`)');
  if (!source.keywords?.length) fail('give at least one keyword');
  for (const word of [...source.keywords, ...(source.aliases ?? [])]) {
    if (word !== word.toLowerCase() || word !== word.trim() || !word) fail(`keywords and aliases are lower case, no stray spaces (got "${word}")`);
  }

  const parts: Record<string, { box: Box; children: Node[] }> = {};

  const build = (nodes: DrawNode[]): Node[] =>
    nodes.map((node): Node => {
      if (node.type === 'layer') {
        for (const shape of node.shapes) {
          if (!ROLES.includes(shape.role)) fail(`unknown colour role "${String(shape.role)}"`);
          if (shape.fill === false && !shape.stroke) fail('a shape is neither filled nor stroked');
          const box = shapeBox(shape);
          if (!box) fail('a shape has no geometry');
          const grow = (shape.stroke?.width ?? 0) / 2;
          const [x, y, w, h] = box!;
          if (x - grow < 0 || y - grow < 0 || x + w + grow > GRID || y + h + grow > GRID) {
            fail(`a shape leaves the ${GRID} × ${GRID} grid (box ${roundBox(box!).join(' ')}, stroke ${grow * 2})`);
          }
        }
        const { weight, ...rest } = node;
        return { ...rest, weight: weight ?? layerWeight(rest) };
      }
      if (node.type === 'clip') return { type: 'clip', clip: node.clip, children: build(node.children) };
      if (!NAME.test(node.name)) fail(`part names are kebab-case (got "${node.name}")`);
      if (parts[node.name]) fail(`two parts are named "${node.name}"`);
      const children = build(node.children);
      const box = nodesBox(children);
      if (!box) fail(`the part "${node.name}" is empty`);
      parts[node.name] = { box: roundBox(box!), children };
      return { type: 'part', name: node.name, children };
    });

  const nodes = build(source.draw.flat());
  if (nodes.length === 0) fail('nothing is drawn');

  const motion: Motion[] = [];
  for (const [name, m] of Object.entries(source.motion ?? {})) {
    const target = parts[name];
    if (!target) fail(`motion is given for "${name}", which is not a part (parts: ${Object.keys(parts).join(', ') || 'none'})`);
    motion.push(compileMotion(name, m, target!, fail));
  }
  if (motion.length === 0) fail('every icon moves: give at least one part a motion');
  // Parts in drawing order, for stable output.
  motion.sort((a, b) => Object.keys(parts).indexOf(a.part) - Object.keys(parts).indexOf(b.part));

  return {
    name: source.name,
    category: source.category,
    keywords: source.keywords,
    aliases: source.aliases ?? [],
    gesture: source.gesture.trim(),
    nodes,
    parts: Object.fromEntries(Object.entries(parts).map(([name, p]) => [name, { box: p.box }])),
    motion,
    idle: source.idle ?? false,
  };
}

function compileMotion(part: string, m: MotionSpec, target: { box: Box; children: Node[] }, fail: (message: string) => never): Motion {
  const where = `motion of "${part}"`;
  if (!(m.duration > 0)) fail(`${where}: the duration must be positive`);
  if ((m.delay ?? 0) < 0) fail(`${where}: the delay cannot be negative`);
  const iterations = m.iterations ?? 1;
  if (iterations !== 'infinite' && !(Number.isInteger(iterations) && iterations >= 1)) fail(`${where}: iterations is a whole number or "infinite"`);
  const tracks: Partial<Record<Prop, Key[]>> = {};
  const props = Object.keys(m.tracks) as Prop[];
  if (props.length === 0) fail(`${where}: no track`);
  for (const prop of props) {
    if (!PROPS.includes(prop)) fail(`${where}: unknown track "${prop}"`);
    const keys = [...m.tracks[prop]!].map((k): Key => (k[2] === undefined ? [k[0], k[1]] : [k[0], k[1], k[2]]));
    if (keys.length === 0) fail(`${where}: the "${prop}" track has no key`);
    for (let i = 0; i < keys.length; i++) {
      const [at, value] = keys[i]!;
      if (!(at >= 0 && at <= 1)) fail(`${where}: key moments go from 0 to 1 (got ${at} on "${prop}")`);
      if (!Number.isFinite(value)) fail(`${where}: "${prop}" has a key that is not a number`);
      if (i > 0 && at < keys[i - 1]![0]) fail(`${where}: the keys of "${prop}" must be in order`);
    }
    if (keys[0]![0] > 0) keys.unshift([0, REST[prop]]);
    if (keys[keys.length - 1]![0] < 1) keys.push([1, REST[prop]]);
    const last = keys[keys.length - 1]![1];
    const atRest = prop === 'rotate' ? Math.abs(last % 360) < 1e-9 : Math.abs(last - REST[prop]) < 1e-9;
    if (!atRest) fail(`${where}: the "${prop}" track must end at rest (${REST[prop]}), it ends at ${last}`);
    if (prop === 'draw' && !hasDrawableStroke(target.children)) fail(`${where}: "draw" needs a stroked line (stroke()) in the part`);
    if ((prop === 'opacity' || prop === 'draw') && keys.some(([, v]) => v < 0 || v > 1)) fail(`${where}: "${prop}" stays between 0 and 1`);
    tracks[prop] = keys;
  }
  return {
    part,
    pivot: resolvePivot(m.pivot, target.box),
    duration: m.duration,
    delay: m.delay ?? 0,
    iterations,
    ease: m.ease ?? 'inOut',
    tracks,
  };
}
