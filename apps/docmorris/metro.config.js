const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const { assetExts } = require("metro-config/src/defaults/defaults");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = {
  projectRoot,
  watchFolders: [
    path.resolve(monorepoRoot), // workspace root
  ],
  resolver: {
    unstable_enableSymlinks: true,
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(monorepoRoot, "node_modules"),
    ],
    blockList: exclusionList([
      // Prevent Metro from mistakenly parsing react-native internals
      /.\/node_modules\/react-native\/./,
    ]),
    assetExts: [...assetExts, "ttf"],
  },
  transformer: {
    babelTransformerPath: require.resolve(
      "metro-react-native-babel-transformer",
    ),
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
