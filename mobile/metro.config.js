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

// three ≥0.18x ships `three.cjs` as a shim that calls process.emitWarning()
// and re-exports the ES module. Metro's `require` export condition picks that
// shim, and React Native's `process` has no emitWarning, so importing three
// throws "undefined is not a function" on the device. Resolve the ES build
// directly; everything (fiber, drei, three-stdlib, GLTFLoader) then shares it.
const THREE_ESM = path.resolve(__dirname, "node_modules/three/build/three.module.js");
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "three") {
    return { type: "sourceFile", filePath: THREE_ESM };
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
