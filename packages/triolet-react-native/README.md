# triolet-react-native

Animated icons in three colours for React Native and Expo, drawn with
[Skia](https://shopify.github.io/react-native-skia/) and moved by
[Reanimated](https://docs.swmansion.com/react-native-reanimated/) on the UI thread. Every icon
is drawn in `base` (about 60 %), `main` (30 %) and `accent` (10 %) with a soft relief, and
plays one small gesture when pressed. Nothing moves when the system asks for reduced motion.

**[Browse the 150+ icons →](https://gtantoine.github.io/triolet/)**

## Install

```bash
npx expo install @shopify/react-native-skia react-native-reanimated react-native-worklets
npm install triolet-react-native
```

Peer dependencies: `@shopify/react-native-skia` 2.14 or later, `react-native-reanimated` 4 or
later (with `react-native-worklets`), `react` 19, `react-native` 0.80 or later. The package is
tested with Expo SDK 58 (React Native 0.88, Skia 2.14, Reanimated 4.7); other versions inside
those ranges have not been tried.

The package ships TypeScript sources, which Metro compiles like your own code. A development
build or Expo Go both work: there is no native module of its own.

## Use

```tsx
import { BellRing, TrioletProvider } from 'triolet-react-native';

export function Header() {
  return (
    <TrioletProvider size={32} colors={{ main: '#1f5a3d', accent: '#e8a13a' }}>
      <BellRing label="Alerts" />
    </TrioletProvider>
  );
}
```

Components are named in PascalCase after the icon (`bell-ring` is `BellRing`); each also exists
with an `Icon` suffix. One icon per module: `import { Settings } from 'triolet-react-native/icons/settings'`.

| Prop | |
|---|---|
| `size` | width and height in points, 48 by default; also picks the relief (full from 40, simplified from 24, flat below) |
| `colors` | `{ base, main, accent, surface }` for this icon, over the provider's |
| `finish` | `"flat"` draws without relief at any size |
| `pressable` | plays the gesture when pressed, true by default |
| `loop` | repeats the gesture while true |
| `label` | text alternative; without it the icon is decorative |
| `style` | style of the wrapping view |

A `ref` gives `{ play() }` to play the gesture from code.

Each icon is its own Skia canvas. Frame rates on real devices have not been measured yet, so
for a long list render the icons lazily (`FlatList`) like any other row content.

## On the web

In a browser (React Native Web, Expo web) the package re-exports
[`triolet-react`](https://www.npmjs.com/package/triolet-react), the SVG components, because a
page cannot hold hundreds of WebGL canvases. Install `triolet-react` too if you target the web.

## Licence

MIT. Source and issues: <https://github.com/GtAntoine/triolet>.
