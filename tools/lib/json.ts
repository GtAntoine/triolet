/**
 * JSON for the committed models: an array or object made only of plain values (or of short
 * arrays of them) stays on one line, so a shape or a track is one line of a diff.
 */
const WIDTH = 140;

const isPlain = (v: unknown) => v === null || typeof v !== 'object';
const isFlat = (v: unknown): boolean =>
  isPlain(v) || (Array.isArray(v) && v.every((w) => isPlain(w) || (Array.isArray(w) && w.every(isPlain))));

function inline(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(inline).join(', ')}]`;
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    return entries.length ? `{ ${entries.map(([k, v]) => `${JSON.stringify(k)}: ${inline(v)}`).join(', ')} }` : '{}';
  }
  return JSON.stringify(value);
}

export function stringify(value: unknown, indent = ''): string {
  if (isPlain(value)) return JSON.stringify(value);
  const children = Array.isArray(value) ? value : Object.values(value as object).filter((v) => v !== undefined);
  if (children.every(isFlat)) {
    const line = inline(value);
    if (indent.length + line.length <= WIDTH) return line;
  }
  const inner = indent + '  ';
  if (Array.isArray(value)) return `[\n${value.map((v) => inner + stringify(v, inner)).join(',\n')}\n${indent}]`;
  const entries = Object.entries(value as object).filter(([, v]) => v !== undefined);
  return `{\n${entries.map(([k, v]) => `${inner}${JSON.stringify(k)}: ${stringify(v, inner)}`).join(',\n')}\n${indent}}`;
}
