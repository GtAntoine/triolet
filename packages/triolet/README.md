# triolet

Animated icons in three colours, for any web page. Every icon is drawn in `base` (about 60 %),
`main` (30 %) and `accent` (10 %) with a soft relief, and plays one small gesture that says
what it is for: the bell rings, the ballot drops into the box, the lines write themselves.

No dependency. The motion is plain CSS. Nothing moves when the user asks for reduced motion.

**[Browse the 150+ icons →](https://gtantoine.github.io/triolet/)**

For React use [`triolet-react`](https://www.npmjs.com/package/triolet-react), for React Native
[`triolet-react-native`](https://www.npmjs.com/package/triolet-react-native).

## Install

```bash
npm install triolet
```

## Use

Placeholders in the HTML, replaced by the icons you import:

```html
<i data-triolet="bell-ring" data-size="32"></i>
<script type="module">
  import { createIcons, bellRing } from 'triolet';
  createIcons({ icons: { bellRing } });
</script>
```

One icon from code:

```js
import { createElement, play, bellRing } from 'triolet';

const svg = createElement(bellRing, { size: 64, label: 'Alerts' });
document.body.append(svg);
play(svg); // plays the gesture once
```

Icons are named in kebab-case in HTML (`bell-ring`) and camelCase in JavaScript (`bellRing`).
Each icon is also its own module, for bundlers that want it: `import bellRing from 'triolet/icons/bell-ring'`.

The gesture plays when the icon is hovered, or when an ancestor with the class
`triolet-trigger` is hovered or focused from the keyboard. Options: `size` (also picks the
relief: full from 40 px, simplified from 24 px, flat below), `label` (without it the icon is
decorative), `colors`, `finish: 'flat'`, `trigger: 'hover' | 'inview' | 'manual'`.

## Colours

For a page, a block or one icon, set the custom properties:

```css
:root {
  --triolet-base: #eef2ea;
  --triolet-main: #1f5a3d;
  --triolet-accent: #e8a13a;
  --triolet-surface: #f7f9f3; /* what the icons sit on */
}
```

The tints and the colours of the relief are derived from these four.

## On a server

`toSvg(icon, options)` returns the `<svg>` as a string and `styles([icon, …])` the CSS the icons
need (or `styleTag([…])` as a `<style>` element). Add the CSS once per page.

## Also in the package

- `triolet/triolet.css`: the sheet for every icon, to link once instead of injecting styles.
- `triolet/svg/<name>.svg`: still images in the default colours.
- `triolet/core`: the icon model, colour derivation and renderers the packages are built on.

## Licence

MIT. Source, issues and the icon drawing guide: <https://github.com/GtAntoine/triolet>.
