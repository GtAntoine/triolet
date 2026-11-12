/**
 * Triolet in a web page, with no framework.
 *
 *     import { createIcons, calendarClock, ballotBox } from 'triolet';
 *     createIcons({ icons: { calendarClock, ballotBox } });   // replaces <i data-triolet="calendar-clock"></i>
 *
 *     import { createElement, play } from 'triolet';
 *     const svg = createElement(calendarClock, { size: 64, label: 'Calendar' });
 *     play(svg);
 *
 * The styles an icon needs (colour derivation, triggers, its keyframes) are added to the page
 * the first time the icon is created. `toSvg` and `styles` return strings for a server.
 */
import { PLAY_CLASS, baseCss } from '../../core/src/css.ts';
import { SHARED_DEFS_STYLE, sharedFilters } from '../../core/src/svg.ts';
import { iconSvg, type IconOptions } from '../../core/src/web.ts';
import type { IconData } from './types.ts';

export type { IconData } from './types.ts';
export type { IconOptions } from '../../core/src/web.ts';
export type { ThemeInput } from '../../core/src/colors.ts';
export type { IconModel } from '../../core/src/model.ts';

const STYLE_ID = 'triolet-styles';
const DEFS_ID = 'triolet-defs';

let sequence = 0;
/** A short id, unique in this page load, for the filters and clip paths of one icon. */
export function nextUid(): string {
  return `t${(++sequence).toString(36)}`;
}

// --- Strings (usable on a server) ----------------------------------------------------------

/** The icon as an `<svg>` string. */
export function toSvg(icon: IconData, options: IconOptions = {}): string {
  return iconSvg(icon.model, options);
}

/** The CSS a page needs for these icons: the shared sheet, then each gesture. */
export function styles(icons: Iterable<IconData> = []): string {
  return baseCss() + [...icons].map((icon) => icon.css).join('');
}

/** A `<style>` element as a string; `createIcons` recognises it and adds to it. */
export function styleTag(icons: Iterable<IconData> = []): string {
  const list = [...icons];
  return `<style id="${STYLE_ID}" data-icons="${list.map((icon) => icon.model.name).join(' ')}">${styles(list)}</style>`;
}

// --- The page ------------------------------------------------------------------------------

/** Makes sure the page has the shared sheet, and the CSS of `icon` if one is given. */
export function injectStyles(icon?: IconData, doc: Document = document): void {
  let style = doc.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement('style');
    style.id = STYLE_ID;
    style.textContent = baseCss();
    doc.head.append(style);
  }
  if (!icon) return;
  const known = (style.dataset.icons ?? '').split(' ');
  if (known.includes(icon.model.name)) return;
  style.append(icon.css);
  style.dataset.icons = [...known, icon.model.name].join(' ').trim();
}

/** Adds the filters shared by icons created with `filters: 'shared'`. */
export function injectSharedFilters(doc: Document = document): void {
  if (doc.getElementById(DEFS_ID)) return;
  const holder = doc.createElement('template');
  holder.innerHTML = `<svg id="${DEFS_ID}" class="triolet" aria-hidden="true" style="${SHARED_DEFS_STYLE}"><defs>${sharedFilters()}</defs></svg>`;
  doc.body.prepend(holder.content);
}

let observer: IntersectionObserver | undefined;
function playWhenSeen(svg: Element): void {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer!.unobserve(entry.target);
        void play(entry.target);
      }
    },
    { threshold: 0.6 },
  );
  observer.observe(svg);
}

/** Creates the `<svg>` element of an icon. */
export function createElement(icon: IconData, options: IconOptions = {}): SVGSVGElement {
  injectStyles(icon);
  if (options.filters === 'shared' && !options.colors) injectSharedFilters();
  const holder = document.createElement('template');
  holder.innerHTML = iconSvg(icon.model, { ...options, uid: options.uid ?? nextUid() });
  const svg = holder.content.firstElementChild as SVGSVGElement;
  if (options.trigger === 'inview') playWhenSeen(svg);
  return svg;
}

const runs = new WeakMap<Element, number>();

/**
 * Plays the gesture of an icon once from the start. The promise resolves when it is over
 * (at once under reduced motion; never for a gesture that loops, until `stop`).
 */
export async function play(svg: Element): Promise<void> {
  const run = (runs.get(svg) ?? 0) + 1;
  runs.set(svg, run);
  svg.classList.remove(PLAY_CLASS);
  // Reading a box makes the browser notice the class left, so adding it back restarts the gesture.
  void svg.getBoundingClientRect();
  svg.classList.add(PLAY_CLASS);
  await Promise.allSettled(svg.getAnimations({ subtree: true }).map((animation) => animation.finished));
  // Without the class the icon answers hover again. A newer play() keeps it.
  if (runs.get(svg) === run) svg.classList.remove(PLAY_CLASS);
}

/** Stops a gesture started by `play`. */
export function stop(svg: Element): void {
  runs.set(svg, (runs.get(svg) ?? 0) + 1);
  svg.classList.remove(PLAY_CLASS);
}

export interface CreateIconsOptions extends IconOptions {
  /** The icons the page may use, e.g. `{ calendarClock, ballotBox }`. */
  icons: Record<string, IconData>;
  /** Where to look for placeholders (default: the whole document). */
  root?: ParentNode;
  /** The attribute that names an icon on a placeholder (default `data-triolet`). */
  attribute?: string;
}

function optionsOf(el: Element): IconOptions {
  const data = (el as HTMLElement).dataset;
  const options: IconOptions = {};
  if (data.size) options.size = Number(data.size);
  const label = data.label ?? el.getAttribute('aria-label');
  if (label) options.label = label;
  if (data.finish === 'flat' || data.finish === 'relief') options.finish = data.finish;
  if (data.trigger === 'hover' || data.trigger === 'inview' || data.trigger === 'manual') options.trigger = data.trigger;
  if (data.filters === 'shared' || data.filters === 'own') options.filters = data.filters;
  const colors: Record<string, string> = {};
  for (const key of ['base', 'main', 'accent', 'surface'] as const) if (data[key]) colors[key] = data[key]!;
  if (Object.keys(colors).length) options.colors = colors;
  return options;
}

/**
 * Replaces every placeholder (`<i data-triolet="calendar-clock" data-size="32"></i>`) with its icon.
 * A placeholder may set `data-size`, `data-label`, `data-finish`, `data-trigger`,
 * `data-filters` and the colours `data-base`, `data-main`, `data-accent`, `data-surface`;
 * its own classes are kept. Returns the icons created.
 */
export function createIcons({ icons, root = document, attribute = 'data-triolet', ...defaults }: CreateIconsOptions): SVGSVGElement[] {
  const byName = new Map<string, IconData>();
  for (const [key, icon] of Object.entries(icons)) {
    byName.set(key, icon);
    byName.set(icon.model.name, icon);
    for (const alias of icon.model.aliases) if (!byName.has(alias)) byName.set(alias, icon);
  }
  const created: SVGSVGElement[] = [];
  for (const el of root.querySelectorAll(`[${attribute}]`)) {
    const name = el.getAttribute(attribute) ?? '';
    const icon = byName.get(name);
    if (!icon) {
      console.warn(`Triolet: no icon named "${name}" was given to createIcons()`);
      continue;
    }
    const svg = createElement(icon, { ...defaults, ...optionsOf(el) });
    svg.classList.add(...el.classList);
    el.replaceWith(svg);
    created.push(svg);
  }
  return created;
}
