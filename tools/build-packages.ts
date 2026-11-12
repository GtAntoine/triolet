/**
 * Builds the published packages from the icon models.
 *
 *   node tools/build-packages.ts                 every package
 *   node tools/build-packages.ts triolet         one package
 *
 * For each package it writes the generated sources (one module per icon, never committed),
 * then compiles with tsc. `triolet` carries the core, compiled next to its own sources, so
 * the other packages reach it as `triolet/core` and nothing else has to be published.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { baseCss, iconCss, type IconModel } from '@triolet/core';
import { ROOT, loadIcons } from './lib/icons.ts';
import { jsName, reactName } from './lib/names.ts';

const camel = jsName;
const pascal = reactName;
const header = (name: string) => `// Generated from icons/${name}.ts by tools/build-packages.ts. Do not edit.\n`;

function writeDir(dir: string, files: Map<string, string>): void {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const [file, content] of files) writeFileSync(join(dir, file), content);
}

function tsc(pkg: string): void {
  const dir = join(ROOT, 'packages', pkg);
  rmSync(join(dir, 'dist'), { recursive: true, force: true });
  const bin = join(ROOT, 'node_modules/typescript/bin/tsc');
  execFileSync(process.execPath, [bin, '-p', join(dir, 'tsconfig.build.json')], { cwd: dir, stdio: 'inherit' });
}

const builders: Record<string, (icons: IconModel[]) => void> = {
  triolet(icons) {
    const dir = join(ROOT, 'packages/triolet');
    const files = new Map<string, string>();
    for (const model of icons) {
      const data = JSON.stringify({ model, css: iconCss(model) });
      files.set(`${model.name}.ts`, `${header(model.name)}import type { IconData } from '../types.ts';\n\nconst icon: IconData = ${data};\n\nexport default icon;\n`);
    }
    files.set('index.ts', icons.map((m) => `export { default as ${camel(m.name)} } from './${m.name}.ts';`).join('\n') + '\n');
    writeDir(join(dir, 'src/icons'), files);
    tsc('triolet');
    writeFileSync(join(dir, 'dist/triolet.css'), baseCss() + icons.map(iconCss).join(''));
    rmSync(join(dir, 'svg'), { recursive: true, force: true });
    cpSync(join(ROOT, 'svg'), join(dir, 'svg'), { recursive: true });
  },

  'triolet-react'(icons) {
    const dir = join(ROOT, 'packages/triolet-react');
    const files = new Map<string, string>();
    for (const model of icons) {
      const name = pascal(model.name);
      files.set(
        `${model.name}.ts`,
        `${header(model.name)}import data from 'triolet/icons/${model.name}';\nimport { createIcon } from '../icon.ts';\n\n/** ${model.gesture} */\nexport const ${name} = createIcon(data, '${name}');\n\nexport default ${name};\n`,
      );
    }
    // Each component also answers to its name followed by `Icon`: `Map` hides a global, `MapIcon` does not.
    files.set('index.ts', icons.map((m) => `export { ${pascal(m.name)}, ${pascal(m.name)} as ${pascal(m.name)}Icon } from './${m.name}.ts';`).join('\n') + '\n');
    writeDir(join(dir, 'src/icons'), files);
    tsc('triolet-react');
  },
};

builders['triolet-react-native'] = (icons) => {
  // Shipped as TypeScript sources, which Metro compiles: only the icon modules are generated.
  // Imports carry no file extension: a TypeScript app that reads these sources would otherwise
  // need `allowImportingTsExtensions`.
  const files = new Map<string, string>();
  for (const model of icons) {
    const name = pascal(model.name);
    files.set(
      `${model.name}.ts`,
      `${header(model.name)}import data from 'triolet/icons/${model.name}';
import { createIcon } from '../context';

/** ${model.gesture} */
export const ${name} = createIcon(data, '${name}');

export default ${name};
`,
    );
  }
  files.set('index.ts', icons.map((m) => `export { ${pascal(m.name)}, ${pascal(m.name)} as ${pascal(m.name)}Icon } from './${m.name}';`).join('\n') + '\n');
  writeDir(join(ROOT, 'packages/triolet-react-native/src/icons'), files);
};

const wanted = process.argv.slice(2);
const icons = await loadIcons();
for (const [name, build] of Object.entries(builders)) {
  if (wanted.length && !wanted.includes(name)) continue;
  build(icons);
  const count = readdirSync(join(ROOT, 'packages', name, 'src/icons')).length - 1;
  console.log(`${name}: ${count} icons built`);
}
