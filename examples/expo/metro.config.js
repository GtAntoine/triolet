// The example reads the icon models and the shared core straight from the repository,
// so Metro has to watch the folders above this one.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

config.watchFolders = [path.join(root, 'model'), path.join(root, 'packages')];
// Everything installed lives here: never pick a package from the workspace above.
config.resolver.nodeModulesPaths = [path.join(__dirname, 'node_modules')];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
