/**
 * Geometry of shapes: bounding boxes (to place pivots and weigh layers) and a path parser.
 * Everything is in grid units. Curves are flattened by sampling, which is precise to a few
 * hundredths of a unit: enough for a pivot, not meant for rendering.
 */
import type { Box, Node, Shape } from './model.ts';

type Point = [number, number];

const NUMBER = /[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;
const ARITY: Record<string, number> = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

export interface Segment {
  /** Upper-case command, coordinates made absolute. */
  cmd: 'M' | 'L' | 'C' | 'Q' | 'A' | 'Z';
  /** Absolute numbers of the command (for A: rx, ry, rotation, large, sweep, x, y). */
  args: number[];
  from: Point;
  to: Point;
}

/** Parses SVG path data into absolute M, L, C, Q, A and Z segments. */
export function parsePath(d: string): Segment[] {
  const out: Segment[] = [];
  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  let i = 0;
  let cmd = '';
  let cur: Point = [0, 0];
  let start: Point = [0, 0];
  let lastCtrl: Point | null = null;
  let lastCmd = '';
  const isCommand = (t: string | undefined) => t !== undefined && /^[a-zA-Z]$/.test(t);
  const take = (n: number): number[] => {
    const values: number[] = [];
    for (let k = 0; k < n; k++) {
      const t = tokens[i++];
      if (t === undefined || isCommand(t)) throw new Error(`Path data ends in the middle of "${cmd}": ${d}`);
      values.push(Number(t));
    }
    return values;
  };
  while (i < tokens.length) {
    if (isCommand(tokens[i])) cmd = tokens[i++]!;
    else if (cmd === '') throw new Error(`Path data must start with a command: ${d}`);
    else if (cmd === 'M') cmd = 'L';
    else if (cmd === 'm') cmd = 'l';
    const upper = cmd.toUpperCase();
    const arity = ARITY[upper];
    if (arity === undefined) throw new Error(`Unknown path command "${cmd}" in: ${d}`);
    const rel = cmd !== upper;
    const a = take(arity);
    const from: Point = [cur[0], cur[1]];
    const ox = rel ? cur[0] : 0;
    const oy = rel ? cur[1] : 0;
    let seg: Segment;
    switch (upper) {
      case 'M':
        cur = [a[0]! + ox, a[1]! + oy];
        start = [cur[0], cur[1]];
        seg = { cmd: 'M', args: [cur[0], cur[1]], from, to: cur };
        break;
      case 'L':
        cur = [a[0]! + ox, a[1]! + oy];
        seg = { cmd: 'L', args: [cur[0], cur[1]], from, to: cur };
        break;
      case 'H':
        cur = [a[0]! + ox, cur[1]];
        seg = { cmd: 'L', args: [cur[0], cur[1]], from, to: cur };
        break;
      case 'V':
        cur = [cur[0], a[0]! + oy];
        seg = { cmd: 'L', args: [cur[0], cur[1]], from, to: cur };
        break;
      case 'C': {
        const abs = [a[0]! + ox, a[1]! + oy, a[2]! + ox, a[3]! + oy, a[4]! + ox, a[5]! + oy];
        lastCtrl = [abs[2]!, abs[3]!];
        cur = [abs[4]!, abs[5]!];
        seg = { cmd: 'C', args: abs, from, to: cur };
        break;
      }
      case 'S': {
        const reflect: Point =
          lastCtrl && (lastCmd === 'C' || lastCmd === 'S') ? [2 * cur[0] - lastCtrl[0], 2 * cur[1] - lastCtrl[1]] : [cur[0], cur[1]];
        const abs = [reflect[0], reflect[1], a[0]! + ox, a[1]! + oy, a[2]! + ox, a[3]! + oy];
        lastCtrl = [abs[2]!, abs[3]!];
        cur = [abs[4]!, abs[5]!];
        seg = { cmd: 'C', args: abs, from, to: cur };
        break;
      }
      case 'Q': {
        const abs = [a[0]! + ox, a[1]! + oy, a[2]! + ox, a[3]! + oy];
        lastCtrl = [abs[0]!, abs[1]!];
        cur = [abs[2]!, abs[3]!];
        seg = { cmd: 'Q', args: abs, from, to: cur };
        break;
      }
      case 'T': {
        const reflect: Point =
          lastCtrl && (lastCmd === 'Q' || lastCmd === 'T') ? [2 * cur[0] - lastCtrl[0], 2 * cur[1] - lastCtrl[1]] : [cur[0], cur[1]];
        lastCtrl = reflect;
        cur = [a[0]! + ox, a[1]! + oy];
        seg = { cmd: 'Q', args: [reflect[0], reflect[1], cur[0], cur[1]], from, to: cur };
        break;
      }
      case 'A':
        cur = [a[5]! + ox, a[6]! + oy];
        seg = { cmd: 'A', args: [Math.abs(a[0]!), Math.abs(a[1]!), a[2]!, a[3]!, a[4]!, cur[0], cur[1]], from, to: cur };
        break;
      default:
        cur = [start[0], start[1]];
        seg = { cmd: 'Z', args: [], from, to: cur };
    }
    lastCmd = upper;
    out.push(seg);
    if (upper === 'Z' && !isCommand(tokens[i]) && i < tokens.length) {
      throw new Error(`Numbers after "Z" in path data: ${d}`);
    }
  }
  return out;
}

/** Points along an elliptical arc (SVG endpoint form), end point included. */
function arcPoints(from: Point, args: number[], steps = 48): Point[] {
  let [rx, ry] = [args[0]!, args[1]!];
  const phi = (args[2]! * Math.PI) / 180;
  const large = args[3] !== 0;
  const sweep = args[4] !== 0;
  const to: Point = [args[5]!, args[6]!];
  if (rx === 0 || ry === 0 || (from[0] === to[0] && from[1] === to[1])) return [to];
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const dx = (from[0] - to[0]) / 2;
  const dy = (from[1] - to[1]) / 2;
  const x1 = cosPhi * dx + sinPhi * dy;
  const y1 = -sinPhi * dx + cosPhi * dy;
  const lambda = (x1 * x1) / (rx * rx) + (y1 * y1) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  const num = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1;
  const den = rx * rx * y1 * y1 + ry * ry * x1 * x1;
  const coef = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, num / den));
  const cxp = (coef * rx * y1) / ry;
  const cyp = (-coef * ry * x1) / rx;
  const cx = cosPhi * cxp - sinPhi * cyp + (from[0] + to[0]) / 2;
  const cy = sinPhi * cxp + cosPhi * cyp + (from[1] + to[1]) / 2;
  const angle = (ux: number, uy: number, vx: number, vy: number) => {
    const sign = ux * vy - uy * vx < 0 ? -1 : 1;
    const dot = (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy));
    return sign * Math.acos(Math.min(1, Math.max(-1, dot)));
  };
  const theta = angle(1, 0, (x1 - cxp) / rx, (y1 - cyp) / ry);
  let delta = angle((x1 - cxp) / rx, (y1 - cyp) / ry, (-x1 - cxp) / rx, (-y1 - cyp) / ry);
  if (!sweep && delta > 0) delta -= 2 * Math.PI;
  if (sweep && delta < 0) delta += 2 * Math.PI;
  const points: Point[] = [];
  for (let s = 1; s <= steps; s++) {
    const t = theta + (delta * s) / steps;
    const ex = rx * Math.cos(t);
    const ey = ry * Math.sin(t);
    points.push([cosPhi * ex - sinPhi * ey + cx, sinPhi * ex + cosPhi * ey + cy]);
  }
  points[points.length - 1] = to;
  return points;
}

/** The points a path goes through, curves flattened. */
export function flattenPath(d: string): Point[] {
  const points: Point[] = [];
  for (const seg of parsePath(d)) {
    const [x0, y0] = seg.from;
    switch (seg.cmd) {
      case 'M':
      case 'L':
      case 'Z':
        points.push(seg.to);
        break;
      case 'C': {
        const [x1, y1, x2, y2, x, y] = seg.args as [number, number, number, number, number, number];
        for (let s = 1; s <= 24; s++) {
          const t = s / 24;
          const u = 1 - t;
          points.push([
            u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x,
            u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y,
          ]);
        }
        break;
      }
      case 'Q': {
        const [x1, y1, x, y] = seg.args as [number, number, number, number];
        for (let s = 1; s <= 24; s++) {
          const t = s / 24;
          const u = 1 - t;
          points.push([u * u * x0 + 2 * u * t * x1 + t * t * x, u * u * y0 + 2 * u * t * y1 + t * t * y]);
        }
        break;
      }
      case 'A':
        points.push(...arcPoints(seg.from, seg.args));
        break;
    }
  }
  return points;
}

/** Length of a path, in grid units (jumps between sub-paths not counted). */
export function pathLength(d: string): number {
  let length = 0;
  let from: Point | null = null;
  for (const seg of parsePath(d)) {
    if (seg.cmd === 'M') {
      from = seg.to;
      continue;
    }
    const start: Point = from ?? seg.from;
    // Flatten this one segment, starting where the pen is.
    const points = flattenPath(`M${start[0]} ${start[1]}${seg.cmd}${seg.args.join(' ')}`);
    let previous = start;
    for (const point of points.slice(1)) {
      length += Math.hypot(point[0] - previous[0], point[1] - previous[1]);
      previous = point;
    }
    if (seg.cmd === 'Z') length += Math.hypot(seg.to[0] - previous[0], seg.to[1] - previous[1]);
    from = seg.to;
  }
  return length;
}

/** The radii a rounded rectangle really gets (SVG rule: each one capped at half its side). */
export function rectRadii(shape: { w: number; h: number; r: number }): [rx: number, ry: number] {
  return [Math.min(shape.r, shape.w / 2), Math.min(shape.r, shape.h / 2)];
}

function boxOfPoints(points: Point[]): Box | null {
  if (points.length === 0) return null;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX - minX, maxY - minY];
}

function rotatePoints(points: Point[], rotate: [number, number, number] | undefined): Point[] {
  if (!rotate) return points;
  const [deg, cx, cy] = rotate;
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return points.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]);
}

/** Outline points of a shape (strokes excluded), its static rotation applied. */
export function shapePoints(shape: Shape): Point[] {
  let points: Point[];
  switch (shape.kind) {
    case 'rect': {
      const { x, y, w, h } = shape;
      const [rx, ry] = rectRadii(shape);
      if (shape.rotate && (rx > 0 || ry > 0)) {
        // A rotated rounded rectangle is smaller than its rotated corners: follow the outline.
        points = [];
        const corners: [number, number, number][] = [
          [x + w - rx, y + ry, -90],
          [x + w - rx, y + h - ry, 0],
          [x + rx, y + h - ry, 90],
          [x + rx, y + ry, 180],
        ];
        for (const [cx, cy, startDeg] of corners) {
          for (let s = 0; s <= 8; s++) {
            const t = ((startDeg + (90 * s) / 8) * Math.PI) / 180;
            points.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
          }
        }
      } else {
        points = [
          [x, y],
          [x + w, y],
          [x + w, y + h],
          [x, y + h],
        ];
      }
      break;
    }
    case 'circle':
    case 'ellipse': {
      const rx = shape.kind === 'circle' ? shape.r : shape.rx;
      const ry = shape.kind === 'circle' ? shape.r : shape.ry;
      points = [];
      for (let s = 0; s < 72; s++) {
        const t = (s / 72) * 2 * Math.PI;
        points.push([shape.cx + rx * Math.cos(t), shape.cy + ry * Math.sin(t)]);
      }
      break;
    }
    case 'path':
      points = flattenPath(shape.d);
      break;
  }
  return rotatePoints(points, shape.rotate);
}

export function unionBox(boxes: (Box | null)[]): Box | null {
  let out: Box | null = null;
  for (const b of boxes) {
    if (!b) continue;
    if (!out) {
      out = [b[0], b[1], b[2], b[3]];
      continue;
    }
    const x0 = Math.min(out[0], b[0]);
    const y0 = Math.min(out[1], b[1]);
    const x1 = Math.max(out[0] + out[2], b[0] + b[2]);
    const y1 = Math.max(out[1] + out[3], b[1] + b[3]);
    out = [x0, y0, x1 - x0, y1 - y0];
  }
  return out;
}

/** Box of a shape's geometry, strokes excluded (the SVG "fill box"). */
export function shapeBox(shape: Shape): Box | null {
  return boxOfPoints(shapePoints(shape));
}

/** Box of everything under some nodes. A clip does not shrink it (as in SVG). */
export function nodesBox(nodes: Node[]): Box | null {
  return unionBox(
    nodes.map((node) => (node.type === 'layer' ? unionBox(node.shapes.map(shapeBox)) : nodesBox(node.children))),
  );
}

export function roundBox(box: Box, digits = 2): Box {
  const k = 10 ** digits;
  return box.map((v) => Math.round(v * k) / k) as Box;
}

// `NUMBER` is exported for tools that rewrite path data.
export { NUMBER };

/** Path data scaled by `k` around (cx, cy), then moved by (dx, dy). Numbers keep two decimals. */
export function scalePath(d: string, k: number, cx: number, cy: number, dx = 0, dy = 0): string {
  const n = (v: number) => String(Math.round(v * 100) / 100);
  const px = (x: number) => n(cx + (x - cx) * k + dx);
  const py = (y: number) => n(cy + (y - cy) * k + dy);
  let out = '';
  for (const seg of parsePath(d)) {
    const a = seg.args;
    switch (seg.cmd) {
      case 'M':
      case 'L':
        out += `${seg.cmd}${px(a[0]!)} ${py(a[1]!)}`;
        break;
      case 'C':
        out += `C${px(a[0]!)} ${py(a[1]!)} ${px(a[2]!)} ${py(a[3]!)} ${px(a[4]!)} ${py(a[5]!)}`;
        break;
      case 'Q':
        out += `Q${px(a[0]!)} ${py(a[1]!)} ${px(a[2]!)} ${py(a[3]!)}`;
        break;
      case 'A':
        out += `A${n(a[0]! * k)} ${n(a[1]! * k)} ${n(a[2]!)} ${a[3]} ${a[4]} ${px(a[5]!)} ${py(a[6]!)}`;
        break;
      case 'Z':
        out += 'Z';
        break;
    }
  }
  return out;
}
