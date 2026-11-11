/** Pieces several icons share. Files starting with `_` are not icons. */
import { path, pill, raised, rect, type DrawNode } from '@triolet/core';

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
