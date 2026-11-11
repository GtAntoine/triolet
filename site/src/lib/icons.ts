/** The icons as the site sees them: models read from the repository, facts measured at build time. */
import { iconCss, iconSvg, type IconModel, type IconOptions } from '@triolet/core';
import facts from '../data/icons.json';

const files = import.meta.glob<IconModel>('../../../model/*.json', { eager: true, import: 'default' });

export const models: IconModel[] = Object.values(files).sort((a, b) => a.name.localeCompare(b.name));
const byName = new Map(models.map((m) => [m.name, m]));

export type Facts = (typeof facts)[number];
export const icons: Facts[] = facts;
export const factsOf = (name: string): Facts => icons.find((i) => i.name === name)!;
export const modelOf = (name: string): IconModel => {
  const model = byName.get(name);
  if (!model) throw new Error(`No icon named "${name}"`);
  return model;
};

/** Every gesture, for the one stylesheet of the site. */
export const gesturesCss = models.map(iconCss).join('');

let count = 0;
/** An inline icon. Filters are the ones shared by the page unless the icon has colours of its own. */
export function svg(name: string, options: IconOptions = {}): string {
  return iconSvg(modelOf(name), { filters: 'shared', uid: `s${count++}`, ...options });
}

export const categories = [...new Set(icons.map((i) => i.category))].sort();

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path}`;
