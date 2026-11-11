/**
 * An icon for a web page, from the options a user gives: what the JS and React packages share.
 * Everything here returns strings or plain objects, so it also runs on a server.
 */
import { publicVar, type ThemeInput, type ThemeKey } from './colors.ts';
import { GRID, type IconModel } from './model.ts';
import { tierForSize, type Tier } from './relief.ts';
import { renderBody, rootClass } from './svg.ts';

export interface IconOptions {
  /** Width and height in pixels (default 48). It also picks the relief tier. */
  size?: number;
  /** Text alternative. Without it the icon is decorative and hidden from assistive tech. */
  label?: string;
  /** Colours of this icon alone. To colour a page or a block, set `--triolet-*` in CSS instead. */
  colors?: ThemeInput;
  /** `flat` draws without relief at any size (default `relief`, which adapts to the size). */
  finish?: 'relief' | 'flat';
  /**
   * What plays the gesture: `hover` (default: the icon, or an ancestor with the class
   * `triolet-trigger`, hovered or focused from the keyboard), `inview` (also once when the
   * icon scrolls into view) or `manual` (only `play()`).
   */
  trigger?: 'hover' | 'inview' | 'manual';
  /**
   * `own` (default): the icon carries its filters. `shared`: the page provides them once
   * (`sharedFilters()`); ignored when `colors` is set, since shared filters cannot see them.
   */
  filters?: 'own' | 'shared';
  /** Extra class names. */
  class?: string;
  /** Suffix that makes the ids of this instance unique in the page. */
  uid?: string;
}

export const DEFAULT_SIZE = 48;

export function iconTier(options: IconOptions): { tier: Tier; small: boolean } {
  const size = options.size ?? DEFAULT_SIZE;
  return { tier: options.finish === 'flat' ? 'flat' : tierForSize(size), small: size < 24 };
}

/** The custom properties that colour one icon, as an inline style. */
export function colorStyle(colors: ThemeInput | undefined): string {
  if (!colors) return '';
  return (Object.keys(colors) as ThemeKey[])
    .filter((key) => colors[key] !== undefined)
    .map((key) => `${publicVar(key)}:${colors[key]}`)
    .join(';');
}

/** The attributes of the root `<svg>`, as plain strings. */
export function iconAttributes(model: IconModel, options: IconOptions = {}): Record<string, string> {
  const size = String(options.size ?? DEFAULT_SIZE);
  const { tier } = iconTier(options);
  const attrs: Record<string, string> = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: `0 0 ${GRID} ${GRID}`,
    width: size,
    height: size,
    class: rootClass(model.name, options.class),
    'data-tier': tier,
    overflow: 'visible',
    focusable: 'false',
  };
  if (model.idle) attrs['data-idle'] = '';
  if (options.trigger === 'manual') attrs['data-trigger'] = 'manual';
  const style = colorStyle(options.colors);
  if (style) attrs.style = style;
  if (options.label) {
    attrs.role = 'img';
    attrs['aria-label'] = options.label;
  } else {
    attrs['aria-hidden'] = 'true';
  }
  return attrs;
}

/** The inside of the root `<svg>`. */
export function iconBody(model: IconModel, options: IconOptions = {}): string {
  const { tier, small } = iconTier(options);
  const shared = options.filters === 'shared' && !options.colors;
  return renderBody(model, { tier, small, filters: shared ? 'shared' : 'own', uid: options.uid });
}

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** A complete `<svg>` element as a string. */
export function iconSvg(model: IconModel, options: IconOptions = {}): string {
  const attrs = Object.entries(iconAttributes(model, options))
    .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
    .join(' ');
  return `<svg ${attrs}>${iconBody(model, options)}</svg>`;
}
