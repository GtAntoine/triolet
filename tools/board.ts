/**
 * Asks Codex for a reference board: one image of nine new icons in the house style, to draw
 * from. The board is a sketch of ideas (silhouettes, where the accent goes), never the source:
 * every icon is then drawn by code in `icons/<name>.ts`.
 *
 *   node tools/board.ts 2 users settings trash pencil bookmark folder clock cloud globe
 *
 * Writes out/boards/board-2.png. Needs the Codex CLI, signed in, with image generation; each
 * board spends some of the Codex quota of whoever runs it.
 */
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROOT } from './lib/icons.ts';

const [number, ...names] = process.argv.slice(2);
if (!number || names.length !== 9) {
  console.error('Usage: node tools/board.ts <number> <nine icon names>');
  process.exit(1);
}
const reference = join(ROOT, 'out/sheets/_all.png');
if (!existsSync(reference)) {
  console.error('Run "pnpm icon:sheet --all" first: the board is drawn in the style of that sheet.');
  process.exit(1);
}

// Codex works in a folder of its own, with nothing but the reference sheet.
const work = mkdtempSync(join(tmpdir(), 'triolet-board-'));
copyFileSync(reference, join(work, 'reference.png'));
const prompt = [
  'Look at reference.png in this folder: a sheet of icons in a house style (soft neumorphic relief, three colours only:',
  'light grey #F1F2F4, navy #1D4A68, red accent #EE4B3B; rounded geometric shapes; exactly one small red accent per icon;',
  'white background; thick shapes, no thin lines, no outlines, no text).',
  'Using your image generation tool, generate ONE square image: a 3 by 3 board of nine NEW icons in exactly this style,',
  `each centred in its cell, in this order, row by row: ${names.join(', ')}.`,
  'Save it as board.png in this folder. If you cannot generate images here, say so plainly.',
].join(' ');
// The prompt goes through standard input: as an argument it would be cut up by the shell.
const result = spawnSync('codex exec --skip-git-repo-check --sandbox workspace-write -', { cwd: work, shell: true, input: prompt, encoding: 'utf8', timeout: 600_000 });
const made = join(work, 'board.png');
if (!existsSync(made)) {
  console.error(`Codex did not write a board.\n${(result.stdout ?? '').split('\n').slice(-8).join('\n')}`);
  rmSync(work, { recursive: true, force: true });
  process.exit(1);
}
const dir = join(ROOT, 'out/boards');
mkdirSync(dir, { recursive: true });
copyFileSync(made, join(dir, `board-${number}.png`));
rmSync(work, { recursive: true, force: true });
console.log(`${join(dir, `board-${number}.png`)}: ${names.join(', ')}`);
