/**
 * The footprint of an icon: how much room it takes on the grid, so that icons set side by
 * side read as the same size.
 *
 * Icons are drawn inside four keyline shapes centred on the grid, as in the Material and
 * Lucide grids: a round icon may be wider than a square one, because a square fills its
 * corners and looks larger. On the 96 grid:
 *
 *     circle      72 across
 *     square      64 × 64
 *     tall        56 × 72
 *     wide        72 × 56
 *
 * What an icon draws outside the union of the four makes it look bigger than its neighbours.
 * A small piece may stick out (a badge, a flag); a whole silhouette should not.
 */
import { GRID, deriveTheme, renderStaticSvg, shapeBox, unionBox, type Box, type IconModel, type Node, type Role, type Theme } from '@triolet/core';
import { rasterize } from './raster.ts';

export const KEYLINES = { circle: 72, square: 64, tall: [56, 72], wide: [72, 56] } as const;
/** More than this share of the grid outside the keylines is reported. */
export const OUTSIDE_MAX = 3;
/** The middle of the footprint may be this far from the middle of the grid, in units. */
export const OFF_CENTRE_MAX = 4;
/** An icon whose longest side is shorter than this looks small. */
export const SHORTEST = 56;

const CENTRE = GRID / 2;

export function insideKeylines(x: number, y: number): boolean {
  const dx = Math.abs(x - CENTRE);
  const dy = Math.abs(y - CENTRE);
  return (
    Math.hypot(dx, dy) <= KEYLINES.circle / 2 ||
    (dx <= KEYLINES.square / 2 && dy <= KEYLINES.square / 2) ||
    (dx <= KEYLINES.tall[0] / 2 && dy <= KEYLINES.tall[1] / 2) ||
    (dx <= KEYLINES.wide[0] / 2 && dy <= KEYLINES.wide[1] / 2)
  );
}

/** The keyline shapes as SVG markup, for overlays. */
export function keylineMarkup(stroke: string, width = 0.5): string {
  const rect = (w: number, h: number) => `<rect x="${CENTRE - w / 2}" y="${CENTRE - h / 2}" width="${w}" height="${h}"/>`;
  return (
    `<g fill="none" stroke="${stroke}" stroke-width="${width}">` +
    `<circle cx="${CENTRE}" cy="${CENTRE}" r="${KEYLINES.circle / 2}"/>` +
    rect(KEYLINES.square, KEYLINES.square) +
    rect(KEYLINES.tall[0], KEYLINES.tall[1]) +
    rect(KEYLINES.wide[0], KEYLINES.wide[1]) +
    `</g>`
  );
}

const SILHOUETTE: Theme = {
  ...deriveTheme(),
  ...(Object.fromEntries((['base', 'main', 'accent', 'soft', 'mid', 'mainLight', 'on', 'gap'] as Role[]).map((role) => [role, '#000000'])) as Record<Role, string>),
};

function boxOf(nodes: Node[]): Box | null {
  return unionBox(
    nodes.map((node) =>
      node.type === 'layer'
        ? unionBox(
            node.shapes.map((shape) => {
              const box = shapeBox(shape);
              if (!box) return null;
              const grow = (shape.stroke?.width ?? 0) / 2;
              return [box[0] - grow, box[1] - grow, box[2] + 2 * grow, box[3] + 2 * grow] as Box;
            }),
          )
        : boxOf(node.children),
    ),
  );
}

export interface Footprint {
  /** Box of everything drawn, strokes included, in grid units. */
  box: Box;
  /** Share of the grid the icon covers outside the keyline shapes, in percent. */
  outside: number;
}

export function footprint(model: IconModel, size = 192): Footprint {
  const { pixels } = rasterize(renderStaticSvg(model, SILHOUETTE, 'flat'), size);
  const k = size / GRID;
  let outside = 0;
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const alpha = pixels[(py * size + px) * 4 + 3]!;
      if (alpha && !insideKeylines((px + 0.5) / k, (py + 0.5) / k)) outside += alpha / 255;
    }
  }
  const box = boxOf(model.nodes)!;
  return { box: box.map((v) => Math.round(v * 10) / 10) as Box, outside: Math.round((outside / (size * size)) * 1000) / 10 };
}

export function judgeFootprint({ box, outside }: Footprint): string[] {
  const warnings: string[] = [];
  const [x, y, w, h] = box;
  if (outside > OUTSIDE_MAX) {
    warnings.push(
      `${outside} % of the grid is drawn outside the keyline shapes (more than ${OUTSIDE_MAX} %): at ${Math.round(w)} × ${Math.round(h)} the icon reads larger than its neighbours`,
    );
  }
  const offX = Math.round((x + w / 2 - CENTRE) * 10) / 10;
  const offY = Math.round((y + h / 2 - CENTRE) * 10) / 10;
  if (Math.abs(offX) > OFF_CENTRE_MAX || Math.abs(offY) > OFF_CENTRE_MAX) warnings.push(`off centre by ${offX} across and ${offY} down (more than ${OFF_CENTRE_MAX} units)`);
  if (Math.max(w, h) < SHORTEST) warnings.push(`its longest side is ${Math.round(Math.max(w, h))} units: under ${SHORTEST} the icon looks small`);
  return warnings;
}
