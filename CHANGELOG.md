# Changelog

The three packages (`triolet`, `triolet-react`, `triolet-react-native`) are released together
and share a version number. Versions follow [semantic versioning](https://semver.org/); while
the major is 0, a minor version may still change the API.

## 0.1.4

No change to the packages' code. The release workflow publishes with npm Trusted Publishing (OIDC)
instead of an access token, so the three packages are published without any stored secret.

## 0.1.3

`triolet-react-native`:

- Reduced motion follows the system setting while the app runs. Before, the value was read once
  at start (Reanimated's `useReducedMotion()`), so an app started with "reduce motion" on kept
  its icons still after the setting was turned off, and the reverse. The icons now listen to
  `AccessibilityInfo` (`reduceMotionChanged`): turning the setting on stops a running gesture at
  once, turning it off lets the icons move again. Reanimated's value is still used until the
  first answer.
- The README says how to play a gesture for screen-reader users: a pressable icon plays on
  activation, and the host plays it from its own control with the `ref` (`play()`), because React
  Native has no cross-platform event for screen-reader focus.

## 0.1.2

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

Fixes:

- `triolet-react-native`: `motion.ts` compiles under `noUncheckedIndexedAccess` (12 type errors in
  `trackAt` and `propAt` for consumers with that option; no change of behaviour). The repo's
  `pnpm typecheck` now covers the code of the packages with the option on.
- Icons: `refresh` has a proper arrowhead, `axe` is redrawn, the blades of `aperture` stay inside
  the hexagon, and `pin-question` plays on hover like the others instead of looping by itself.

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
