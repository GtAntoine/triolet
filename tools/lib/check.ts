/**
 * The checks an icon has to pass, beyond compiling: the three colours, its footprint on the
 * grid, legibility at 24 px, the gesture, and the catalogue (no two icons under one name).
 */
import { GRID, REST, gestureDuration, motionPose, shapeBox, type Box, type IconModel, type Node } from '@triolet/core';
import { footprint, judgeFootprint, type Footprint } from './footprint.ts';
import { judge, measure, type Ratio } from './ratio.ts';

export interface Report {
  name: string;
  ratio: Ratio;
  footprint: Footprint;
  errors: string[];
  warnings: string[];
}

/** Under this many grid units a detail is thinner than three quarters of a pixel at 24 px. */
export const THINNEST = 3;
/** A gesture answering a trigger should be over in this many milliseconds. */
export const LONGEST_GESTURE = 2000;
/** How far a moving part may leave the grid, in grid units (the React Native canvas has this margin). */
export const OVERSHOOT = 8;

/**
 * Icons allowed to break the colour bounds until they are redrawn: their colour errors are
 * reported as warnings. It is empty, and should stay so.
 */
export const KNOWN_COLOUR_FAULTS: readonly string[] = [];

function eachLayer(nodes: Node[], visit: (layer: Extract<Node, { type: 'layer' }>, parts: string[]) => void, parts: string[] = []): void {
  for (const node of nodes) {
    if (node.type === 'layer') visit(node, parts);
    else eachLayer(node.children, visit, node.type === 'part' ? [...parts, node.name] : parts);
  }
}

/** Corners of a box after a part's pose (translate, then rotate, skew and scale around the pivot). */
function posedBox(box: Box, pivot: [number, number], values: Partial<Record<keyof typeof REST, number>>): Box {
  const v = { ...REST, ...values };
  const rad = (v.rotate * Math.PI) / 180;
  const skew = Math.tan((v.skewY * Math.PI) / 180);
  const sx = v.scale * v.scaleX;
  const sy = v.scale * v.scaleY;
  const xs: number[] = [];
  const ys: number[] = [];
  for (const [cx, cy] of [
    [box[0], box[1]],
    [box[0] + box[2], box[1]],
    [box[0], box[1] + box[3]],
    [box[0] + box[2], box[1] + box[3]],
  ] as const) {
    let x = (cx - pivot[0]) * sx;
    let y = (cy - pivot[1]) * sy;
    y += x * skew;
    const rx = x * Math.cos(rad) - y * Math.sin(rad);
    const ry = x * Math.sin(rad) + y * Math.cos(rad);
    x = rx + pivot[0] + v.x;
    y = ry + pivot[1] + v.y;
    xs.push(x);
    ys.push(y);
  }
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
}

export function checkIcon(model: IconModel, all: readonly IconModel[] = [model]): Report {
  const errors: string[] = [];
  const warnings: string[] = [];

  // The three colours.
  const ratio = measure(model);
  const verdict = judge(ratio);
  if (KNOWN_COLOUR_FAULTS.includes(model.name)) warnings.push(...verdict.errors.map((e) => `${e} (known, to be redrawn)`));
  else errors.push(...verdict.errors);
  warnings.push(...verdict.warnings);

  // The footprint: the same apparent size as the other icons.
  const print = footprint(model);
  warnings.push(...judgeFootprint(print));

  // Legibility at 24 px: nothing thinner than three quarters of a pixel.
  eachLayer(model.nodes, (layer) => {
    if (layer.weight === 'fine') return;
    for (const shape of layer.shapes) {
      if (shape.role === 'gap') continue;
      if (shape.fill === false && shape.stroke && shape.stroke.width < THINNEST) {
        warnings.push(`a line is ${shape.stroke.width} units wide: under ${THINNEST} it disappears at 24 px`);
      }
      if (shape.fill !== false && (shape.kind === 'rect' || shape.kind === 'circle' || shape.kind === 'ellipse')) {
        const box = shapeBox(shape)!;
        const thin = Math.min(box[2], box[3]) + (shape.stroke?.width ?? 0);
        if (thin < THINNEST) warnings.push(`a ${shape.kind} is ${Math.round(thin * 10) / 10} units thick: under ${THINNEST} it disappears at 24 px`);
      }
    }
  });

  // The gesture.
  const duration = gestureDuration(model.motion);
  const loops = !Number.isFinite(duration);
  if (loops && !model.idle) errors.push('a part loops forever but the icon is not marked `idle: true`');
  if (!loops && model.idle) errors.push('the icon is marked `idle` but no part loops (`iterations: "infinite"`)');
  if (!loops && duration > LONGEST_GESTURE) warnings.push(`the gesture lasts ${duration} ms: keep it under ${LONGEST_GESTURE} ms`);
  const span = loops ? Math.max(...model.motion.map((m) => m.delay + m.duration)) : duration;
  for (const motion of model.motion) {
    const box = model.parts[motion.part]!.box;
    let worst = 0;
    for (let step = 0; step <= 40; step++) {
      const posed = posedBox(box, motion.pivot, motionPose([motion], (span * step) / 40)[motion.part]!);
      worst = Math.max(worst, -posed[0], -posed[1], posed[0] + posed[2] - GRID, posed[1] + posed[3] - GRID);
    }
    if (worst > OVERSHOOT) warnings.push(`"${motion.part}" leaves the grid by ${Math.round(worst)} units while it moves (more than ${OVERSHOOT} is cut off)`);
  }

  // The catalogue: a name or alias is taken once.
  const taken = new Map<string, string>();
  for (const other of all) {
    if (other.name === model.name) continue;
    taken.set(other.name, other.name);
    for (const alias of other.aliases) taken.set(alias, other.name);
  }
  for (const word of [model.name, ...model.aliases]) {
    const owner = taken.get(word);
    if (owner) errors.push(`"${word}" is already the name or an alias of "${owner}"`);
  }
  if (new Set(model.keywords).size !== model.keywords.length) warnings.push('a keyword is listed twice');
  if (model.keywords.length < 4) warnings.push('give at least four keywords, so that search finds the icon');

  return { name: model.name, ratio, footprint: print, errors, warnings };
}
