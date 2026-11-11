/**
 * The catalogue: which icons to draw, in which order.
 *
 * It crosses the names of five open icon sets (Lucide, Tabler, Phosphor, Heroicons, Material
 * Symbols, read from the Iconify collections), keeps one name per idea (variants and styles
 * are folded into their root) and ranks ideas by the number of sets that have them: what every
 * set draws is what people look for first. The result is cut into lots.
 *
 *   node tools/catalogue.ts          writes catalogue/catalogue.json and prints the next lot
 *   node tools/catalogue.ts --lot 2  prints another lot
 *
 * The collections are downloaded once into out/catalogue-cache/ (not committed). Material's
 * popularity score is not in these collections, so the rank is the count of sets alone.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadIcons } from './lib/icons.ts';

const SETS = ['lucide', 'tabler', 'ph', 'heroicons', 'material-symbols'] as const;
const LOT_SIZES = [150, 100, 100, 100, 100, 100, 100, 100, 100, 150];

interface Collection {
  icons: Record<string, unknown>;
  aliases?: Record<string, unknown>;
  categories?: Record<string, string[]>;
}

/** Style suffixes: the same drawing in another weight is not another idea. */
const STYLES = /-(?:bold|fill|filled|duotone|light|thin|solid|outline|rounded|sharp|20|16|24|mini|micro)$/;
/** Different words for one idea, mapped to the name Triolet uses. */
const SAME: Record<string, string> = {
  house: 'home', 'magnifying-glass': 'search', 'search-rounded': 'search', gear: 'settings', cog: 'settings', 'cog-6-tooth': 'settings',
  'trash-can': 'trash', delete: 'trash', person: 'user', 'user-circle': 'user', account: 'user', envelope: 'mail', email: 'mail',
  favorite: 'heart', 'lock-closed': 'lock', 'x-mark': 'x', close: 'x', done: 'check', add: 'plus', remove: 'minus', edit: 'pencil', pen: 'pencil',
  'chat-bubble': 'message', chat: 'message', 'chat-circle': 'message', 'message-circle': 'message', photo: 'image', picture: 'image',
  'shopping-cart': 'shopping-cart', cart: 'shopping-cart', basket: 'shopping-basket', 'map-pin': 'map-pin', location: 'map-pin', 'location-on': 'map-pin',
  phone: 'phone', call: 'phone', 'device-mobile': 'smartphone', 'device-phone-mobile': 'smartphone', 'phone-android': 'smartphone',
  'computer-desktop': 'monitor', desktop: 'monitor', 'device-desktop': 'monitor', notification: 'bell', notifications: 'bell',
  'calendar-month': 'calendar', 'calendar-blank': 'calendar', 'clock-hour-4': 'clock', schedule: 'clock', time: 'clock',
  'arrow-down-tray': 'download', 'arrow-up-tray': 'upload', 'cloud-arrow-up': 'cloud-upload', 'cloud-arrow-down': 'cloud-download',
  'globe-alt': 'globe', world: 'globe', public: 'globe', language: 'globe', 'paper-airplane': 'send', 'paper-plane': 'send',
  'eye-slash': 'eye-off', 'visibility-off': 'eye-off', visibility: 'eye', bookmark: 'bookmark', 'credit-card': 'credit-card',
  'question-mark-circle': 'help-circle', help: 'help-circle', question: 'help-circle', info: 'info', 'information-circle': 'info',
  'exclamation-triangle': 'alert-triangle', warning: 'alert-triangle', 'warning-circle': 'alert-circle', 'exclamation-circle': 'alert-circle',
  'musical-note': 'music', 'music-note': 'music', 'speaker-wave': 'volume', 'volume-up': 'volume', 'speaker-high': 'volume',
  'wrench-screwdriver': 'tool', wrench: 'tool', tools: 'tool', build: 'tool', 'light-bulb': 'lightbulb', bulb: 'lightbulb',
  'academic-cap': 'graduation-cap', school: 'graduation-cap', 'shield-check': 'shield', security: 'shield', bolt: 'zap', lightning: 'zap', flash: 'zap',
  'face-smile': 'smile', 'mood-smile': 'smile', smiley: 'smile', truck: 'truck', 'local-shipping': 'truck', 'printer': 'printer', print: 'printer',
  'folder-open': 'folder-open', 'document-text': 'file-text', article: 'file-text', description: 'file-text', document: 'file', 'file-description': 'file-text',
  'rocket-launch': 'rocket', 'building-office': 'building', apartment: 'building', buildings: 'building', 'banknotes': 'banknote', cash: 'banknote', money: 'banknote', payments: 'banknote',
  'chart-bar': 'chart-bar', 'bar-chart': 'chart-bar', 'chart-pie': 'chart-pie', 'pie-chart': 'chart-pie', share: 'share', 'share-network': 'share',
  'thumb-up': 'thumbs-up', 'hand-thumb-up': 'thumbs-up', 'thumbs-up': 'thumbs-up', sun: 'sun', 'light-mode': 'sun', moon: 'moon', 'dark-mode': 'moon',
  'ellipsis-horizontal': 'more-horizontal', dots: 'more-horizontal', 'dots-three': 'more-horizontal', 'bars-3': 'menu', list: 'list', 'menu-2': 'menu',
  microphone: 'mic', 'video-camera': 'video', 'videocam': 'video', 'play-arrow': 'play', 'arrow-path': 'refresh', 'refresh-cw': 'refresh', 'arrows-clockwise': 'refresh', sync: 'refresh',
  funnel: 'filter', 'filter-list': 'filter', 'adjustments-horizontal': 'sliders', tune: 'sliders', 'sliders-horizontal': 'sliders', briefcase: 'briefcase', work: 'briefcase',
  'gift': 'gift', redeem: 'gift', 'key': 'key', 'vpn-key': 'key', fire: 'flame', 'local-fire-department': 'flame', 'tag': 'tag', sell: 'tag', label: 'tag',
  'link': 'link', 'paper-clip': 'paperclip', 'attach-file': 'paperclip', 'wifi': 'wifi', 'signal': 'signal', 'battery-full': 'battery', 'battery-50': 'battery',
  'clipboard': 'clipboard', 'content-paste': 'clipboard', 'inbox': 'inbox', 'archive-box': 'archive', 'inventory-2': 'archive', 'cube': 'box', package: 'box', 'package-2': 'box',
  'puzzle-piece': 'puzzle', extension: 'puzzle', 'cpu-chip': 'cpu', memory: 'cpu', 'server': 'server', dns: 'server', 'circle-stack': 'database', storage: 'database',
  'user-group': 'users', group: 'users', groups: 'users', 'user-plus': 'user-plus', 'person-add': 'user-plus', 'qr-code': 'qr-code', 'qrcode': 'qr-code',
  'trophy': 'trophy', 'emoji-events': 'trophy', 'beaker': 'flask', science: 'flask', 'scale': 'scale', balance: 'scale', 'hand-raised': 'hand', 'pan-tool': 'hand',
  'eye-dropper': 'pipette', colorize: 'pipette', 'paint-brush': 'paintbrush', brush: 'paintbrush', 'swatch': 'palette', 'scissors': 'scissors', 'content-cut': 'scissors',
};

async function collection(set: string): Promise<Collection> {
  const dir = join(ROOT, 'out/catalogue-cache');
  const file = join(dir, `${set}.json`);
  if (!existsSync(file)) {
    mkdirSync(dir, { recursive: true });
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@iconify-json/${set}/icons.json`);
    if (!response.ok) throw new Error(`Could not download the ${set} collection (${response.status})`);
    writeFileSync(file, await response.text());
  }
  return JSON.parse(readFileSync(file, 'utf8')) as Collection;
}

/** The ideas of one set: styles stripped, variants folded into their root, synonyms mapped. */
function ideas(c: Collection): Map<string, string | undefined> {
  const names = new Set<string>();
  for (const raw of Object.keys(c.icons)) {
    let name = raw;
    while (STYLES.test(name)) name = name.replace(STYLES, '');
    names.add(name);
  }
  const category = new Map<string, string>();
  for (const [cat, list] of Object.entries(c.categories ?? {})) for (const name of list) if (!category.has(name)) category.set(name, cat.toLowerCase());
  const out = new Map<string, string | undefined>();
  for (const name of names) {
    // `bell-ring` is a variant of `bell` when the set has `bell` too.
    const parts = name.split('-');
    let variant = false;
    for (let i = 1; i < parts.length; i++) if (names.has(parts.slice(0, i).join('-'))) variant = true;
    if (variant || /\d/.test(name)) continue;
    const idea = SAME[name] ?? name;
    if (!out.has(idea)) out.set(idea, category.get(name));
  }
  return out;
}

const perSet = new Map<string, Map<string, string | undefined>>();
for (const set of SETS) perSet.set(set, ideas(await collection(set)));

const drawn = await loadIcons();
const taken = new Set(drawn.flatMap((icon) => [icon.name, ...icon.aliases]));

const all = new Map<string, { sets: string[]; category?: string }>();
for (const [set, list] of perSet) {
  for (const [idea, category] of list) {
    const entry = all.get(idea) ?? { sets: [] };
    entry.sets.push(set);
    entry.category ??= category;
    all.set(idea, entry);
  }
}
const ranked = [...all.entries()]
  .filter(([, entry]) => entry.sets.length >= 2)
  .sort((a, b) => b[1].sets.length - a[1].sets.length || a[0].localeCompare(b[0]))
  .map(([name, entry]) => ({ name, sets: entry.sets.length, category: entry.category ?? 'other', drawn: taken.has(name) }));

// Lots: the first one is completed by what is already drawn.
let lot = 1;
let room = LOT_SIZES[0]! - drawn.length;
const catalogue = ranked.map((entry) => {
  if (entry.drawn) return { ...entry, lot: 0 };
  if (room === 0) {
    lot += 1;
    room = LOT_SIZES[lot - 1] ?? 100;
  }
  room -= 1;
  return { ...entry, lot };
});

const dir = join(ROOT, 'catalogue');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'catalogue.json'), JSON.stringify(catalogue, null, 1) + '\n');

const wanted = Number(process.argv[process.argv.indexOf('--lot') + 1]) || 1;
const next = catalogue.filter((entry) => entry.lot === wanted);
console.log(`${ranked.length} ideas found in at least two of the five sets; ${drawn.length} icons drawn.`);
console.log(`Lot ${wanted}: ${next.length} icons\n`);
for (const count of [5, 4, 3, 2]) {
  const names = next.filter((entry) => entry.sets === count).map((entry) => entry.name);
  if (names.length) console.log(`in ${count} sets (${names.length}): ${names.join(', ')}\n`);
}
