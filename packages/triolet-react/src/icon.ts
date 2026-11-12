'use client';
/**
 * Triolet icons as React components.
 *
 *     import { CalendarClock, TrioletProvider } from 'triolet-react';
 *     <CalendarClock size={32} label="Calendar" />
 *     <button className="triolet-trigger"><CalendarClock /> Calendar</button>   // plays on hover and focus
 *     <CalendarClock main="#5B2A6E" accent="#F26B8A" />                       // colours of this icon alone
 *
 * To colour a page or a block, set `--triolet-base`, `--triolet-main`, `--triolet-accent` and
 * `--triolet-surface` in CSS, or wrap the icons in `<TrioletProvider colors={…}>`.
 *
 * The component renders an inline `<svg>`. Its styles (colour derivation, triggers, keyframes)
 * are emitted once per page: by React 19 itself during rendering, on the server too; with
 * React 18, in the browser when the icon mounts.
 */
import {
  Fragment,
  createContext,
  createElement,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useInsertionEffect,
  useMemo,
  useRef,
  version,
  type CSSProperties,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  type SVGProps,
} from 'react';
import { PLAY_CLASS, SHARED_DEFS_STYLE, baseCss, iconAttributes, iconBody, publicVar, sharedFilters, type IconOptions, type ThemeInput, type ThemeKey } from 'triolet/core';
import { injectStyles, play, type IconData } from 'triolet/runtime';

/** React 19 hoists and deduplicates `<style href precedence>`; earlier versions do not. */
const HOISTS_STYLES = Number.parseInt(version, 10) >= 19;

export interface TrioletDefaults {
  /** Default size of the icons inside, in pixels. */
  size?: number;
  /** Colours of the icons inside. */
  colors?: ThemeInput;
  finish?: IconOptions['finish'];
  trigger?: IconOptions['trigger'];
  /** `shared`: the provider renders the filters once and the icons inside reuse them. */
  filters?: IconOptions['filters'];
}

const TrioletContext = createContext<TrioletDefaults>({});

function colorVars(colors: ThemeInput | undefined): CSSProperties | undefined {
  if (!colors) return undefined;
  const style: Record<string, string> = {};
  for (const key of Object.keys(colors) as ThemeKey[]) if (colors[key] !== undefined) style[publicVar(key)] = colors[key]!;
  return style as CSSProperties;
}

function baseStyle(): ReactNode {
  // `href` and `precedence` are what make React 19 hoist the element to <head>, once.
  return HOISTS_STYLES ? createElement('style', { href: 'triolet-base', precedence: 'triolet' }, baseCss()) : null;
}

/**
 * Defaults for the icons inside. With `colors`, wraps its children in an element that carries
 * the colours (`display: contents`, so the layout does not change).
 */
export function TrioletProvider({ children, ...defaults }: TrioletDefaults & { children?: ReactNode }): ReactNode {
  const { size, colors, finish, trigger, filters } = defaults;
  const value = useMemo(() => ({ size, colors, finish, trigger, filters }), [size, colors, finish, trigger, filters]);
  useInsertionEffect(() => {
    if (!HOISTS_STYLES) injectStyles();
  }, []);
  const defs =
    filters === 'shared'
      ? createElement('svg', {
          className: 'triolet',
          'aria-hidden': true,
          style: Object.fromEntries(SHARED_DEFS_STYLE.split(';').map((d) => d.split(':'))) as CSSProperties,
          dangerouslySetInnerHTML: { __html: `<defs>${sharedFilters()}</defs>` },
        })
      : null;
  // The shared filters sit inside the coloured wrapper, so they read the provider's colours.
  const content = createElement(TrioletContext.Provider, { value }, baseStyle(), defs, children);
  return colors ? createElement('span', { style: { display: 'contents', ...colorVars(colors) } }, content) : content;
}

export interface TrioletProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'dangerouslySetInnerHTML' | 'ref'> {
  /** Width and height in pixels (default 48). It also picks the relief tier. */
  size?: number;
  /** Text alternative. Without it the icon is decorative and hidden from assistive tech. */
  label?: string;
  /** The dominant colour of this icon (60 %). */
  base?: string;
  /** The secondary colour of this icon (30 %). */
  main?: string;
  /** The accent colour of this icon (10 %). */
  accent?: string;
  /** What this icon sits on: the colour of the ring that detaches a badge. */
  surface?: string;
  /** Any colour of the theme, derived ones included. */
  colors?: ThemeInput;
  /** `flat` draws without relief at any size. */
  finish?: IconOptions['finish'];
  /** `hover` (default), `inview` (also once when scrolled into view) or `manual`. */
  trigger?: IconOptions['trigger'];
  filters?: IconOptions['filters'];
  /** Plays the gesture each time it turns true; a looping gesture runs while it is true. */
  playing?: boolean;
}

export type TrioletIcon = ForwardRefExoticComponent<TrioletProps & RefAttributes<SVGSVGElement>>;

const ATTRIBUTE_NAMES: Record<string, string> = { class: 'className' };

/** Makes the component of one icon. */
export function createIcon(icon: IconData, displayName: string): TrioletIcon {
  const Icon = forwardRef<SVGSVGElement, TrioletProps>(function Icon(props, ref) {
    const defaults = useContext(TrioletContext);
    const { size, label, base, main, accent, surface, colors, finish, trigger, filters, playing, className, style, ...rest } = props;
    const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
    const own = base || main || accent || surface || colors ? { ...colors, ...(base && { base }), ...(main && { main }), ...(accent && { accent }), ...(surface && { surface }) } : undefined;
    const options: IconOptions = {
      size: size ?? defaults.size,
      label,
      colors: own,
      finish: finish ?? defaults.finish,
      trigger: trigger ?? defaults.trigger,
      filters: filters ?? defaults.filters,
      uid,
    };
    const { size: resolvedSize, finish: resolvedFinish, filters: resolvedFilters } = options;
    const hasColors = own !== undefined;
    const html = useMemo(
      () => iconBody(icon.model, { size: resolvedSize, finish: resolvedFinish, filters: resolvedFilters, colors: hasColors ? {} : undefined, uid }),
      [resolvedSize, resolvedFinish, resolvedFilters, hasColors, uid],
    );

    const local = useRef<SVGSVGElement | null>(null);
    const setRef = (node: SVGSVGElement | null) => {
      local.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useInsertionEffect(() => {
      if (!HOISTS_STYLES) injectStyles(icon);
    }, []);

    const inview = options.trigger === 'inview';
    useEffect(() => {
      const node = local.current;
      if (!inview || !node || typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer.disconnect();
          void play(node);
        },
        { threshold: 0.6 },
      );
      observer.observe(node);
      return () => observer.disconnect();
    }, [inview]);

    const { style: _vars, class: rootClass, ...attributes } = iconAttributes(icon.model, { ...options, colors: undefined });
    const svgProps: Record<string, unknown> = {};
    for (const [name, value] of Object.entries(attributes)) svgProps[ATTRIBUTE_NAMES[name] ?? name] = value;
    const classes = [rootClass, playing && PLAY_CLASS, className].filter(Boolean).join(' ');
    const svg = createElement('svg', {
      ...rest,
      ...svgProps,
      className: classes,
      style: own || style ? { ...colorVars(own), ...style } : undefined,
      ref: setRef,
      dangerouslySetInnerHTML: { __html: html },
    });
    if (!HOISTS_STYLES) return svg;
    return createElement(
      Fragment,
      null,
      baseStyle(),
      createElement('style', { href: `triolet-${icon.model.name}`, precedence: 'triolet' }, icon.css),
      svg,
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
