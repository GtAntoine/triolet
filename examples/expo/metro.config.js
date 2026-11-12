// The example uses the packages of this repository as they are on disk, so Metro has to watch
// the folders above this one and be told where `triolet` and its siblings live.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

config.watchFolders = [path.join(root, 'packages')];
// Everything else (react, react-native, Skia, Reanimated) comes from this folder, and only from
// here: a copy installed next to a package for its own build (packages/triolet-react has react
// for its tests) must never reach the app, or there would be two Reacts.
config.resolver.nodeModulesPaths = [path.join(__dirname, 'node_modules')];
const own = /[\\/]packages[\\/][^\\/]+[\\/]node_modules[\\/](react|react-dom|react-native|react-native-reanimated|react-native-worklets|@shopify)[\\/].*/;
config.resolver.blockList = [].concat(config.resolver.blockList ?? [], own);
config.resolver.extraNodeModules = {
  triolet: path.join(root, 'packages/triolet'),
  'triolet-react': path.join(root, 'packages/triolet-react'),
  'triolet-react-native': path.join(root, 'packages/triolet-react-native'),
};

module.exports = config;

// In a browser `triolet-react-native` is the SVG components of triolet-react. To LOOK at the
// Skia renderer without a device (tools/native-preview-check.ts), TRIOLET_SKIA_WEB=1 serves
// the native entry to the browser instead.
if (process.env.TRIOLET_SKIA_WEB) {
  const skia = path.join(root, 'packages/triolet-react-native/src/index.ts');
  config.resolver.resolveRequest = (context, moduleName, platform) =>
    moduleName === 'triolet-react-native' ? { type: 'sourceFile', filePath: skia } : context.resolveRequest(context, moduleName, platform);
}
