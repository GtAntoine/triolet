# Changelog

The three packages (`triolet`, `triolet-react`, `triolet-react-native`) are released together
and share a version number. Versions follow [semantic versioning](https://semver.org/); while
the major is 0, a minor version may still change the API.

## Unreleased

150 more icons: 435 in all. Every icon of itshover.com/icons now has its counterpart, by name or
by alias.

- Letters `letter-a` to `letter-z`, drawn as keys.
- Arrows: `arrow-big-*` (block arrows, plain and with a dash), `arrow-*-dashed`, and the sort
  arrows `arrow-down-0-1`, `arrow-down-1-0`, `arrow-down-a-z`.
- Off states and badges: camera-off, copy-off, plug-off, volume-x, battery-pause, alarm-plus,
  user-check, user-plus, badge-percent, double-check, scan-heart, brightness-down, unlink.
- Interface: more-vertical, expand, focus, mouse-pointer, keyframes, dialpad, subscript, ampersand,
  accessibility, align-vertical-space-around, four `layout-*` icons, chart-covariate,
  chart-histogram, and the faces angry, annoyed, meh.
- Objects: five `currency-*` coins, banana, candy-cane, earbuds, dino, drum, gauge, ghost,
  hand-heart, hotel, library, party-popper, passport, paw-print, rainbow, router, satellite-dish,
  soup, sparkles, washing-machine.
- 53 brand icons (`brand-*`, category `brands`): see "Brand icons" in the README for what they
  are and what the licence does not cover.
- About fifty aliases, so that common names find the icon (`home`, `gear`, `cart`, `pen`, `like`...).

## 0.1.1

78 more icons: 285 in all.

- Interface and states: menu, more, toggle, grid, layers, eye-off, lock-open, bell-off, wifi-off,
  login, logout, history, undo, redo, external-link, save, zoom-in, zoom-out, pin, at-sign, hash,
  percent, equal, divide, asterisk, copyright, angle, binary.
- Media and data: stop, fast-forward, skip-forward, skip-back, album, aperture, gif, airplay,
  trending-up, trending-down, chart-scatter.
- Devices and places: laptop, tv, watch, battery-charging, gamepad, plug, drone, timer, store,
  id-card, translate, church, desk, elevator, plane, train, bike, scooter, luggage, tent.
- Nature, food and the rest: tree, leaf, droplet, mountain, tornado, clover, pizza, avocado,
  blender, chef-hat, bone, cards, medal, megaphone, robot, sticker, axe, cylinder, ear.
- Closer to 60 / 30 / 10: the per-icon bounds are tighter (base 40-80, main 12-50, accent 5-18)
  and 45 icons were retouched (bigger accents on arrows, chevrons and signs; less `main` on key,
  heart, settings, map-pin, crown, trophy, umbrella and others).
- Cat, dog and skull are redrawn.
- `triolet-react-native` is unchanged apart from the new icons.

## 0.1.0

First release, 12 November 2026.

- 207 animated icons, each drawn in three colours (`base` 60 %, `main` 30 %, `accent` 10 %) with
  a soft relief that follows the size (full from 40 px, simplified from 24 px, flat below) or a
  flat finish on request. Every icon plays one gesture and comes back exactly to rest.
- `triolet`: plain JavaScript and CSS, no dependency. `createIcons()`, `createElement()`,
  `play()`, and `toSvg()` / `styles()` for a server. One module per icon, `triolet.css`, the
  still SVG of every icon, and `triolet/core` (the icon model and renderers).
- `triolet-react`: one component per icon, for React 18 and 19, with `TrioletProvider`.
- `triolet-react-native`: the same icons drawn with Skia and moved by Reanimated, for Expo SDK 58
  (React Native 0.88). Shipped as TypeScript sources. On the web it re-exports `triolet-react`.
- Colours through the `--triolet-base`, `--triolet-main`, `--triolet-accent` and
  `--triolet-surface` custom properties, or through props; a dark surface is detected.
- Not verified yet: real Safari, Android, frame rates on devices.
