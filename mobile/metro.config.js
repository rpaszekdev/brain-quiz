// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// The quiz engine, generators and atlas data live one level up and are shared
// with the Next.js site. `@/*` → `../*` in tsconfig.json maps the imports;
// Metro still has to be told to watch files outside the project root.
config.watchFolders = [path.resolve(__dirname, "../lib")];

// Metro does not treat .glb as an asset by default, and the brain is one.
config.resolver.assetExts = [...config.resolver.assetExts, "glb"];

module.exports = config;
