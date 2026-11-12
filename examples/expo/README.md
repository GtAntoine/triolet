# Triolet example for Expo

The example app of `triolet-react-native`: every icon drawn by Skia, with a frame-rate readout.

It is a project of its own (npm, not part of the pnpm workspace) that reads the packages
straight from `../../packages/`.

```bash
# at the root of the repository: build the packages the app reads
pnpm install
pnpm build

# then here
npm install
npx expo start        # scan the QR code with Expo Go
```

- **Two icons**: Skia next to the same icons rasterised from the SVG, the size tiers, the flat finish.
- **Grid of 30** and **All**: tap an icon to play it; "Loop all" redraws every gesture every
  frame and shows the frames per second on the UI thread.

`npm run typecheck` checks the app together with the sources of `triolet-react-native`.

`npx expo start --web` shows the Skia renderer in a browser through CanvasKit. It only exists to
look at the renderer without a device: a browser allows about sixteen WebGL canvases a page, so
the web shows fewer icons, and the web packages of Triolet draw SVG instead.
