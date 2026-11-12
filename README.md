# Triolet

**Animated icons in three colours, for the web, React and React Native.**

Every Triolet icon is drawn in three colours you choose — `base` (about 60 %), `main` (30 %)
and `accent` (10 %) — with a soft relief, and every icon moves: one small gesture that says
what the icon is for. The bell rings, the ballot drops into the box, the lines write themselves.

<p align="center">
  <a href="https://gtantoine.github.io/triolet/"><img src="docs/assets/icons.svg" alt="Sixteen Triolet icons playing their gestures: a bell rings, a calendar is checked, a shield, a heart, a camera, a rocket..." width="672"></a>
</p>

**[See the icons →](https://gtantoine.github.io/triolet/)**

[![triolet on npm](https://img.shields.io/npm/v/triolet?label=triolet)](https://www.npmjs.com/package/triolet)
[![triolet-react on npm](https://img.shields.io/npm/v/triolet-react?label=triolet-react)](https://www.npmjs.com/package/triolet-react)
[![triolet-react-native on npm](https://img.shields.io/npm/v/triolet-react-native?label=triolet-react-native)](https://www.npmjs.com/package/triolet-react-native)

> Early days (0.x): the API may still change. Icons drawn after a release reach npm with the next
> one: see the [changelog](CHANGELOG.md).

```bash
npm install triolet            # plain JavaScript and CSS
npm install triolet-react      # React 18 and 19
npm install triolet-react-native @shopify/react-native-skia react-native-reanimated
```

## What you get

<p align="center">
  <img src="docs/assets/palettes.svg" alt="The same four icons in six palettes, one of them on a dark surface" width="660">
</p>

- **Three colours, yours.** Set `--triolet-base`, `--triolet-main` and `--triolet-accent`; the
  tints and the colours of the relief are derived from them.
- **Motion built in.** Each gesture is plain CSS on the web (no animation library) and runs on
  the UI thread in React Native. Nothing moves when the user asks for reduced motion.
- **Relief that follows the size.** Full relief from 40 px, a stronger simplified one from
  24 px, flat under 24 px. A flat finish is available at any size.
- **One source per icon.** `icons/<name>.ts` holds the drawing, the moving parts, the gesture
  and the keywords. Everything else is generated.

## Use

Plain JavaScript:

```html
<i data-triolet="bell-ring" data-size="32"></i>
<script type="module">
  import { createIcons, bellRing } from 'triolet';
  createIcons({ icons: { bellRing } });
</script>
```

React:

```tsx
import { BellRing } from 'triolet-react';

<button className="triolet-trigger">
  <BellRing size={32} /> Alerts
</button>;
```

The gesture plays when the icon is hovered, or when an ancestor with the class
`triolet-trigger` is hovered or focused from the keyboard. `trigger="inview"` also plays it
once when the icon scrolls into view; `play()` plays it from code.

Colours, for a page, a block or one icon:

```css
:root {
  --triolet-base: #eef2ea;
  --triolet-main: #1f5a3d;
  --triolet-accent: #e8a13a;
}
```

```tsx
<BellRing main="#5B2A6E" accent="#F26B8A" />
```

## Repository

```
icons/<name>.ts              the source of an icon
model/<name>.json            generated: the model every renderer reads
svg/<name>.svg               generated: a standalone file in the default colours
packages/core/               icon model, drawing language, colours, motion, SVG and CSS
packages/triolet/            plain JavaScript: one module per icon, createIcons()
packages/triolet-react/      one React component per icon
packages/triolet-react-native/   the same icons drawn with Skia, moved by Reanimated
site/                        the website
skills/triolet-icon/         a skill for AI assistants that draw icons with you
tools/                       build, checks, control sheets
```

## Develop

Node 24 or later (the sources are TypeScript, run as is) and pnpm.

```bash
pnpm install
pnpm build        # compile the icons, then the packages
pnpm test         # unit tests, generated files up to date, pixel comparison, packages in a browser
```

## Draw an icon

```bash
pnpm icon:new umbrella      # writes icons/umbrella.ts from a template
pnpm icons                  # compiles every icon into model/ and svg/
pnpm icon:check umbrella    # colours, footprint, legibility at 24 px, gesture, name
pnpm icon:sheet umbrella    # out/sheets/umbrella.png: every size, the gesture frame by frame
```

An icon is drawn on a 96 × 96 grid, inside four keyline shapes (a circle 72 across, a square
of 64, 56 × 72 and 72 × 56), from a few shapes that each name a colour role. See
[the drawing guide](skills/triolet-icon/references/drawing-guide.md).

## Brand icons

The icons named `brand-*` (GitHub, Google, Stripe, WhatsApp and about fifty others) show the
marks of companies and products, so that an interface can point to those services. The names
and logos are trademarks of their owners: the MIT licence of this repository does not cover
them, and each owner's brand guidelines apply. Most outlines come from
[Simple Icons](https://simpleicons.org) (CC0); `tools/brands/` holds the data and the script.
If you do not want them, import the other icons by name: nothing loads a brand icon for you.

## Licence

[MIT](LICENSE). Releases: [CHANGELOG](CHANGELOG.md), [how to publish](docs/releasing.md).
