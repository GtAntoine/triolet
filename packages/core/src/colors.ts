/**
 * The three colours and everything derived from them.
 *
 * A user sets `base` (60), `main` (30) and `accent` (10), plus `surface` (what the icon sits
 * on). The tints and the colours of the relief are derived, with the same arithmetic here (for
 * React Native and static files) and in CSS (`color-mix(in srgb, …)`, see `themeCss`). The
 * percentages were fitted on the palette the first 31 icons were drawn with; `ORIGINAL_THEME`
 * holds that palette exactly, for pixel comparison with the original files.
 */
import type { Role } from './model.ts';

export interface ThemeInput {
  base?: string;
  main?: string;
  accent?: string;
  surface?: string;
  /** Any derived colour can be set by hand. */
  soft?: string;
  mid?: string;
  mainLight?: string;
  on?: string;
  gap?: string;
  light?: string;
  shade?: string;
  insetLight?: string;
  insetShade?: string;
  insetLightDark?: string;
  insetShadeDark?: string;
}

/** Every colour a renderer needs, as `#RRGGBB` or `#RRGGBBAA`. */
export type Theme = Required<ThemeInput>;

export type ThemeKey = keyof Theme;

export const THEME_KEYS: readonly ThemeKey[] = [
  'base',
  'main',
  'accent',
  'surface',
  'soft',
  'mid',
  'mainLight',
  'on',
  'gap',
  'light',
  'shade',
  'insetLight',
  'insetShade',
  'insetLightDark',
  'insetShadeDark',
];

export const DEFAULT_COLORS = {
  base: '#F1F2F4',
  main: '#1D4A68',
  accent: '#EE4B3B',
  surface: '#FFFFFF',
} as const;

/** Share of `main` mixed into `base` for the two tints. */
export const SOFT = 0.13;
export const MID = 0.24;
/** Share of white mixed into `main` for its lighter face. */
export const MAIN_LIGHT = 0.07;
/** Relief shadow: `main` into `base`, then black into the result, then the opacity. */
export const SHADE = { main: 0.17, black: 0.23, alpha: 0.75 } as const;
/** Inner shadow of a recess in a light fill. */
export const INSET_SHADE = { main: 0.32, black: 0.19, alpha: 0.85 } as const;
/** On a dark surface the relief is a faint glow and a deep shadow. */
export const DARK_SURFACE = { light: 0.1, shade: 0.55 } as const;

export type Rgba = [r: number, g: number, b: number, a: number];

/** Parses `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()` and `rgba()`. */
export function parseColor(input: string): Rgba {
  const s = input.trim();
  if (s.startsWith('#')) {
    const h = s.slice(1);
    if (!/^[0-9a-f]+$/i.test(h) || ![3, 4, 6, 8].includes(h.length)) throw new Error(`Not a colour: "${input}"`);
    const full = h.length <= 4 ? [...h].map((c) => c + c).join('') : h;
    const n = (i: number) => parseInt(full.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), full.length === 8 ? n(6) / 255 : 1];
  }
  const m = /^rgba?\(([^)]+)\)$/i.exec(s);
  if (m) {
    const parts = m[1]!.split(/[\s,/]+/).filter(Boolean);
    if (parts.length === 3 || parts.length === 4) {
      const channel = (p: string) => (p.endsWith('%') ? (parseFloat(p) / 100) * 255 : parseFloat(p));
      const alpha = parts[3] === undefined ? 1 : parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
      const out: Rgba = [channel(parts[0]!), channel(parts[1]!), channel(parts[2]!), alpha];
      if (out.every((v) => Number.isFinite(v))) return out;
    }
  }
  throw new Error(`Not a colour Triolet can read (use #hex or rgb()): "${input}"`);
}

const hex2 = (v: number) =>
  Math.round(Math.min(255, Math.max(0, v)))
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

export function formatColor([r, g, b, a]: Rgba): string {
  return `#${hex2(r)}${hex2(g)}${hex2(b)}${a >= 1 ? '' : hex2(a * 255)}`;
}

/** `share` of `a` in `b`, channel by channel in sRGB: CSS `color-mix(in srgb, a share, b)`. */
export function mix(a: string, b: string, share: number): string {
  const ca = parseColor(a);
  const cb = parseColor(b);
  // color-mix works on premultiplied channels; the colours mixed here are opaque in practice.
  const alpha = ca[3] * share + cb[3] * (1 - share);
  const ch = (i: 0 | 1 | 2) => (alpha === 0 ? 0 : (ca[i] * ca[3] * share + cb[i] * cb[3] * (1 - share)) / alpha);
  return formatColor([ch(0), ch(1), ch(2), alpha]);
}

export function withAlpha(color: string, alpha: number): string {
  const [r, g, b, a] = parseColor(color);
  return formatColor([r, g, b, a * alpha]);
}

/** Relative luminance (WCAG), 0 to 1. */
export function luminance(color: string): number {
  const [r, g, b] = parseColor(color);
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function isDark(color: string): boolean {
  return luminance(color) < 0.18;
}

/** Fills in every colour of a theme from the ones given. */
export function deriveTheme(input: ThemeInput = {}): Theme {
  const base = input.base ?? DEFAULT_COLORS.base;
  const main = input.main ?? DEFAULT_COLORS.main;
  const accent = input.accent ?? DEFAULT_COLORS.accent;
  const surface = input.surface ?? DEFAULT_COLORS.surface;
  const dark = isDark(surface);
  return {
    base,
    main,
    accent,
    surface,
    soft: input.soft ?? mix(main, base, SOFT),
    mid: input.mid ?? mix(main, base, MID),
    mainLight: input.mainLight ?? mix('#FFFFFF', main, MAIN_LIGHT),
    on: input.on ?? '#FFFFFF',
    gap: input.gap ?? surface,
    light: input.light ?? (dark ? withAlpha('#FFFFFF', DARK_SURFACE.light) : '#FFFFFF'),
    shade:
      input.shade ??
      (dark
        ? withAlpha('#000000', DARK_SURFACE.shade)
        : withAlpha(mix('#000000', mix(main, base, SHADE.main), SHADE.black), SHADE.alpha)),
    // A recess is shaded for the fill it is cut in: a dark `base` takes the shading meant
    // for dark fills, a light `main` the one meant for light fills.
    insetLight: input.insetLight ?? withAlpha('#FFFFFF', isDark(base) ? 0.4 : 0.95),
    insetShade:
      input.insetShade ??
      (isDark(base)
        ? withAlpha('#000000', 0.55)
        : withAlpha(mix('#000000', mix(main, base, INSET_SHADE.main), INSET_SHADE.black), INSET_SHADE.alpha)),
    insetLightDark: input.insetLightDark ?? withAlpha('#FFFFFF', isDark(main) ? 0.4 : 0.95),
    insetShadeDark:
      input.insetShadeDark ?? (isDark(main) ? withAlpha('#000000', 0.55) : withAlpha(mix('#000000', main, 0.35), INSET_SHADE.alpha)),
  };
}

/** The palette of the first 31 icons, exactly as drawn: the reference for pixel comparison. */
export const ORIGINAL_THEME: Theme = {
  base: '#F1F2F4',
  main: '#1D4A68',
  accent: '#EE4B3B',
  surface: '#FFFFFF',
  soft: '#D3DCE4',
  mid: '#B9CAD8',
  mainLight: '#245A7C',
  on: '#FFFFFF',
  gap: '#FFFFFF',
  light: '#FFFFFF',
  shade: withAlpha('#9DA3AB', 0.75),
  insetLight: withAlpha('#FFFFFF', 0.95),
  insetShade: withAlpha('#8E97A3', 0.85),
  insetLightDark: withAlpha('#FFFFFF', 0.4),
  insetShadeDark: withAlpha('#000000', 0.55),
};

/** The theme colour a shape role is painted with. */
export function roleColor(theme: Theme, role: Role): string {
  return theme[role];
}

// --- CSS -----------------------------------------------------------------------------------

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** Public custom property a user sets: `--triolet-base`, `--triolet-main-light`… */
export function publicVar(key: ThemeKey): string {
  return `--triolet-${kebab(key)}`;
}

/** Private custom property the icons read: `--tri-base`, `--tri-main-light`… */
export function privateVar(key: ThemeKey): string {
  return `--tri-${kebab(key)}`;
}

const pct = (share: number) => `${Math.round(share * 1000) / 10}%`;

/**
 * The declarations that derive every colour in CSS, to put on each icon's root element: a
 * custom property is computed where it is declared, so the derivation has to sit on the icon
 * for a `--triolet-main` set on a parent block to reach the tints.
 */
export function themeDeclarations(): string[] {
  const v = (key: ThemeKey) => `var(${privateVar(key)})`;
  const input = (key: ThemeKey, fallback: string) => `${privateVar(key)}: var(${publicVar(key)}, ${fallback});`;
  const shadow = (m: { main: number; black: number; alpha: number }) =>
    `color-mix(in srgb, color-mix(in srgb, #000 ${pct(m.black)}, color-mix(in srgb, ${v('main')} ${pct(m.main)}, ${v('base')})) ${pct(m.alpha)}, transparent)`;
  return [
    input('base', DEFAULT_COLORS.base),
    input('main', DEFAULT_COLORS.main),
    input('accent', DEFAULT_COLORS.accent),
    input('surface', DEFAULT_COLORS.surface),
    input('soft', `color-mix(in srgb, ${v('main')} ${pct(SOFT)}, ${v('base')})`),
    input('mid', `color-mix(in srgb, ${v('main')} ${pct(MID)}, ${v('base')})`),
    input('mainLight', `color-mix(in srgb, #fff ${pct(MAIN_LIGHT)}, ${v('main')})`),
    input('on', '#fff'),
    input('gap', v('surface')),
    input('light', '#fff'),
    input('shade', shadow(SHADE)),
    input('insetLight', 'rgb(255 255 255 / 0.95)'),
    input('insetShade', shadow(INSET_SHADE)),
    input('insetLightDark', 'rgb(255 255 255 / 0.4)'),
    input('insetShadeDark', 'rgb(0 0 0 / 0.55)'),
  ];
}

/** The public custom properties that set a theme, as CSS declarations (for a `style` or a rule). */
export function themeVars(input: ThemeInput): string {
  return (Object.keys(input) as ThemeKey[])
    .filter((key) => input[key] !== undefined)
    .map((key) => `${publicVar(key)}: ${input[key]};`)
    .join(' ');
}
