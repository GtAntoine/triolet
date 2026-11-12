// The example uses the packages of this repository as they are on disk, so Metro has to watch
// the folders above this one and be told where `triolet` and its siblings live.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

config.watchFolders = [path.join(root, 'packages')];
// Everything else (react, react-native, Skia, Reanimated) comes from this folder.
config.resolver.nodeModulesPaths = [path.join(__dirname, 'node_modules')];
config.resolver.extraNodeModules = {
  triolet: path.join(root, 'packages/triolet'),
  'triolet-react': path.join(root, 'packages/triolet-react'),
  'triolet-react-native': path.join(root, 'packages/triolet-react-native'),
};

module.exports = config;
