# Changelog

The three packages (`triolet`, `triolet-react`, `triolet-react-native`) are released together
and share a version number. Versions follow [semantic versioning](https://semver.org/); while
the major is 0, a minor version may still change the API.

## Unreleased

- 27 more icons (234): church, chef-hat, drone, scooter, tornado, sticker, axe, bone, cylinder,
  airplay, album, aperture, chart-scatter, desk, ear, elevator, equal, divide, asterisk,
  copyright, gif, angle, cards, clover, blender, avocado, binary.

## 0.1.0

First release.

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
