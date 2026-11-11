// In a browser Skia is CanvasKit (WebAssembly): it has to be loaded before any Skia code runs.
// This only exists to look at the Skia renderer without a device; the web packages of Triolet
// draw SVG and never load CanvasKit.
import '@expo/metro-runtime';
import { registerRootComponent } from 'expo';
import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';

LoadSkiaWeb({ locateFile: (file) => `/${file}` }).then(async () => {
  const { default: App } = await import('./App');
  registerRootComponent(App);
});
