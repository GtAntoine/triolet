/** Pieces several icons share. Files starting with `_` are not icons. */
import { part, path, pill, raised, rect, type DrawNode } from '@triolet/core';

/** A wall calendar: light body, a band of the main colour on top, two binder rings. */
export function calendar(x: number, y: number, w: number, h: number): DrawNode[] {
  const right = x + w;
  const band = y + 17;
  const ring = (rx: number) => raised.small(pill(Math.round(rx * 10) / 10, y - 8, 7, 17, 'base'));
  return [
    raised(
      rect(x, y, w, h, 12, 'base'),
      path(`M${x + 12} ${y}H${right - 12}A12 12 0 0 1 ${right} ${y + 12}V${band}H${x}V${y + 12}A12 12 0 0 1 ${x + 12} ${y}Z`, 'main'),
    ),
    ring(x + w * 0.27),
    ring(x + w * 0.73 - 7),
  ];
}

/** A flag on its pole: three bands, the last one in the accent colour. The flag is the part `flag`. */
export function flag(x: number, y: number): DrawNode[] {
  const x0 = x + 3;
  return [
    raised.small(rect(x, y, 3, 28, 1.5, 'main')),
    part(
      'flag',
      raised.small(
        path(`M${x0} ${y}H${x0 + 6}V${y + 12}H${x0}Z`, 'main'),
        path(`M${x0 + 6} ${y}H${x0 + 12}V${y + 12}H${x0 + 6}Z`, 'base'),
        path(`M${x0 + 12} ${y}H${x0 + 16}A2 2 0 0 1 ${x0 + 18} ${y + 2}V${y + 10}A2 2 0 0 1 ${x0 + 16} ${y + 12}H${x0 + 12}Z`, 'accent'),
      ),
    ),
  ];
}

/** A heart 38 wide and 28 high, its middle at (48, 23): scale and move it with `resize`. */
export const HEART = 'M48 38C35 30 29 24 29 17.5A9.5 9.5 0 0 1 48 14A9.5 9.5 0 0 1 67 17.5C67 24 61 30 48 38Z';

/** A five-pointed star as path data. Give the shape an `outline` to round its points. */
export function starPath(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(1)} ${(cy + radius * Math.sin(angle)).toFixed(1)}`);
  }
  return `M${points.join('L')}Z`;
}

/** A regular polygon as path data, its first corner at the top. */
export function polygonPath(cx: number, cy: number, radius: number, sides: number, turn = 0): string {
  const points: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = ((Math.PI * 2) / sides) * i - Math.PI / 2 + (turn * Math.PI) / 180;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(1)} ${(cy + radius * Math.sin(angle)).toFixed(1)}`);
  }
  return `M${points.join('L')}Z`;
}
