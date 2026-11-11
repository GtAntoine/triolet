// The example reads the icon models and the shared core straight from the repository,
// so Metro has to watch the folders above this one.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

config.watchFolders = [path.join(root, 'model'), path.join(root, 'packages')];
// The files watched above import nothing but each other; packages come from this folder.
config.resolver.nodeModulesPaths = [path.join(__dirname, 'node_modules')];

module.exports = config;
