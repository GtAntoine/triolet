# triolet-react

Animated icons in three colours, as React components. Every icon is drawn in `base` (about
60 %), `main` (30 %) and `accent` (10 %) with a soft relief, and plays one small gesture that
says what it is for. The motion is plain CSS, with no animation library, and nothing moves when
the user asks for reduced motion.

<p align="center">
  <a href="https://gtantoine.github.io/triolet/"><img src="https://raw.githubusercontent.com/GtAntoine/triolet/main/docs/assets/icons.svg" alt="Triolet icons playing their gestures" width="560"></a>
</p>

**[Browse the 200+ icons →](https://gtantoine.github.io/triolet/)**

## Install

```bash
npm install triolet-react
```

Works with React 18 and 19. It brings [`triolet`](https://www.npmjs.com/package/triolet) along.

## Use

```tsx
import { BellRing } from 'triolet-react';

<button className="triolet-trigger">
  <BellRing size={32} label="Alerts" /> Alerts
</button>;
```

Components are named in PascalCase after the icon (`bell-ring` is `BellRing`); each also exists
with an `Icon` suffix (`BellRingIcon`), for names that hide a global such as `Map`. One icon
per module is available too: `import { Settings } from 'triolet-react/icons/settings'`.

The gesture plays when the icon is hovered, or when an ancestor with the class
`triolet-trigger` is hovered or focused from the keyboard.

| Prop | |
|---|---|
| `size` | width and height in pixels, 48 by default; also picks the relief (full from 40 px, simplified from 24 px, flat below) |
| `label` | text alternative; without it the icon is decorative and hidden from assistive technology |
| `base` `main` `accent` `surface` | colours of this icon alone; `colors` takes any colour of the theme |
| `finish` | `"flat"` draws without relief at any size |
| `trigger` | `"hover"` (default), `"inview"` (also plays once when scrolled into view) or `"manual"` |
| `playing` | plays the gesture each time it turns true |

The component forwards a `ref` to the `<svg>` and accepts the usual SVG props.

## Colours

For a page or a block, set the custom properties in CSS:

```css
:root {
  --triolet-base: #eef2ea;
  --triolet-main: #1f5a3d;
  --triolet-accent: #e8a13a;
  --triolet-surface: #f7f9f3; /* what the icons sit on */
}
```

or wrap icons in `<TrioletProvider size={32} colors={{ main: '#5B2A6E' }}>`, which also takes
`finish`, `trigger` and `filters="shared"` (one set of filters for a page full of icons).

## Server rendering

With React 19 the styles an icon needs are hoisted and de-duplicated by React itself, on the
server too. With React 18 they are added in the browser when the first icon mounts; to have
them in the server HTML, render `<style>{styles(icons)}</style>` once, with `styles` from
`triolet`, or link `triolet/triolet.css`.

## Licence

MIT. Source and issues: <https://github.com/GtAntoine/triolet>.
