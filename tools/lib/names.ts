/** The names an icon is exported under. */

/** Words that cannot name an export, and names the JavaScript runtime already exports. */
const RESERVED = new Set(
  (
    'break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield await ' +
    'play stop styles styleTag toSvg createElement createIcons injectStyles injectSharedFilters nextUid'
  ).split(' '),
);

const camel = (name: string) => name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/** In plain JavaScript: `bell-ring` is `bellRing`; a name that is taken gets `Icon` (`playIcon`). */
export function jsName(name: string): string {
  return RESERVED.has(camel(name)) ? `${camel(name)}Icon` : camel(name);
}

/** In React: `bell-ring` is `BellRing` (and `BellRingIcon`). */
export function reactName(name: string): string {
  return camel(name).replace(/^./, (c) => c.toUpperCase());
}
