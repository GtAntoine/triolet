/**
 * The relief: its measurements, and which one a layer gets at a given size. Shared by the SVG
 * renderer and the Skia renderer, so both draw the same thing.
 *
 * A raised layer has a soft light on its upper left and a soft shadow on its lower right, both
 * outside the shape. An inset layer has them inside, reversed. Measurements are in grid units,
 * so they shrink with the icon: under 40 px the full relief is thinner than a pixel, hence the
 * three tiers.
 */
import type { Layer } from './model.ts';

/** `relief`: 40 px and more. `compact`: 24 to 39 px. `flat`: under 24 px, or by choice. */
export type Tier = 'relief' | 'compact' | 'flat';

export const TIERS: readonly Tier[] = ['relief', 'compact', 'flat'];

export function tierForSize(size: number): Tier {
  return size >= 40 ? 'relief' : size >= 24 ? 'compact' : 'flat';
}

export interface ReliefSpec {
  kind: 'raised' | 'inset';
  /** Distance of the light and the shadow from the shape, on both axes. */
  offset: number;
  /** Standard deviation of the blur. */
  blur: number;
  /** Inset only: the fill is dark, so the shadow is black and the light is faint. */
  dark?: boolean;
}

export type ReliefKey = 'r' | 'rs' | 'rc' | 'il' | 'id' | 'ilc' | 'idc';

export const RELIEFS: Record<ReliefKey, ReliefSpec> = {
  /** Raised, regular. */
  r: { kind: 'raised', offset: 1.4, blur: 1.5 },
  /** Raised, small pieces. */
  rs: { kind: 'raised', offset: 0.8, blur: 0.8 },
  /** Raised, compact tier: stronger, so it still reads at 24 to 39 px. */
  rc: { kind: 'raised', offset: 2, blur: 1.7 },
  /** Inset in a light fill. */
  il: { kind: 'inset', offset: 1.1, blur: 0.9 },
  /** Inset in a dark fill. */
  id: { kind: 'inset', offset: 1.1, blur: 0.9, dark: true },
  /** Inset, compact tier. */
  ilc: { kind: 'inset', offset: 1.7, blur: 1.3 },
  idc: { kind: 'inset', offset: 1.7, blur: 1.3, dark: true },
};

export const RELIEF_KEYS = Object.keys(RELIEFS) as ReliefKey[];

/** The relief a layer gets at a tier, or `null` when it is drawn flat. */
export function layerRelief(layer: Pick<Layer, 'effect' | 'size' | 'tone' | 'weight'>, tier: Tier): ReliefKey | null {
  if (layer.effect === 'plain' || tier === 'flat') return null;
  if (tier === 'compact') {
    if (layer.weight !== 'major') return null;
    return layer.effect === 'raised' ? 'rc' : layer.tone === 'dark' ? 'idc' : 'ilc';
  }
  if (layer.effect === 'raised') return layer.size === 'small' ? 'rs' : 'r';
  return layer.tone === 'dark' ? 'id' : 'il';
}

/** `fine` layers disappear when the icon is drawn flat because it is small. */
export function layerHidden(layer: Pick<Layer, 'weight'>, tier: Tier, small: boolean): boolean {
  return tier === 'flat' && small && layer.weight === 'fine';
}

/** How far a relief reaches outside its shape (offset plus three blurs), in grid units. */
export const RELIEF_REACH = 8;
