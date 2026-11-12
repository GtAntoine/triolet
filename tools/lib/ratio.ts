/**
 * The 60:30:10 measure: how much of an icon each of the three colours covers.
 *
 * The icon is drawn flat with one witness colour per family (pure red, green, blue) and the
 * gap ring in black, then the pixels are counted. Partly covered pixels count for their share.
 */
import { ROLE_FAMILY, deriveTheme, renderStaticSvg, type IconModel, type Role, type Theme } from '@triolet/core';
import { rasterize } from './raster.ts';

const WITNESS = { base: '#FF0000', main: '#00FF00', accent: '#0000FF' } as const;

const witnessTheme: Theme = {
  ...deriveTheme(),
  ...(Object.fromEntries(
    (Object.keys(ROLE_FAMILY) as Role[]).map((role) => {
      const family = ROLE_FAMILY[role];
      return [role, family ? WITNESS[family] : '#000000'];
    }),
  ) as Record<Role, string>),
};

export interface Ratio {
  /** Shares in percent; they add up to 100. */
  base: number;
  main: number;
  accent: number;
  /** Part of the 96 × 96 grid the icon covers, in percent. */
  coverage: number;
}

export function measure(model: IconModel, size = 384): Ratio {
  const { pixels } = rasterize(renderStaticSvg(model, witnessTheme, 'flat'), size);
  let base = 0;
  let main = 0;
  let accent = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    const a = pixels[i + 3]! / 255;
    base += (pixels[i]! / 255) * a;
    main += (pixels[i + 1]! / 255) * a;
    accent += (pixels[i + 2]! / 255) * a;
  }
  const total = base + main + accent;
  const share = (v: number) => Math.round((v / total) * 1000) / 10;
  return { base: share(base), main: share(main), accent: share(accent), coverage: Math.round((total / (size * size)) * 1000) / 10 };
}

/**
 * The rule is on the SET: its icons together aim at 60 % base, 30 % main and 10 % accent.
 * One icon may lean one way (a bell is mostly `main`, a sheet mostly `base`), within these
 * bounds: outside them it is reported, and the icon is still accepted.
 */
export const BANDS = { base: [40, 80], main: [12, 50], accent: [5, 18] } as const;
/** Past this share of accent the icon is refused. */
export const ACCENT_MAX = 20;
/** The average of the whole set must stay this close to 60 / 30 / 10. */
export const SET_TOLERANCE = 5;
export const SET_TARGET = { base: 60, main: 30, accent: 10 } as const;

export interface Verdict {
  warnings: string[];
  errors: string[];
}

export function judge(ratio: Ratio): Verdict {
  const warnings: string[] = [];
  const errors: string[] = [];
  if (ratio.accent === 0) errors.push('no accent: every icon has one');
  if (ratio.accent > ACCENT_MAX) errors.push(`accent covers ${ratio.accent} %, more than ${ACCENT_MAX} %`);
  if (ratio.accent > ratio.main) errors.push(`accent (${ratio.accent} %) covers more than main (${ratio.main} %)`);
  for (const key of ['base', 'main', 'accent'] as const) {
    const [low, high] = BANDS[key];
    if (ratio[key] < low || ratio[key] > high) warnings.push(`${key} ${ratio[key]} % (band ${low}–${high})`);
  }
  return { warnings, errors };
}
