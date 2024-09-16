const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")

const fs = require("fs")
const path = require("path")
const exclusionList = require("metro-config/src/defaults/exclusionList")

const rnwPath = fs.realpathSync(path.resolve(require.resolve("react-native-windows/package.json"), ".."))

//

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = {
  //
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (name === "@") {
            return path.join(__dirname, "src")
          }
          return path.join(__dirname, `node_modules/${name}`)
        }
      }
    ),
    blockList: exclusionList([
      // This stops "react-native run-windows" from causing the metro server to crash if its already running
      new RegExp(`${path.resolve(__dirname, "windows").replace(/[/\\]/g, "/")}.*`),
      // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
      new RegExp(`${rnwPath}/build/.*`),
      new RegExp(`${rnwPath}/target/.*`),
      /.*\.ProjectImports\.zip/
    ])
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true, // Change this to true
        inlineRequires: true
      }
    })
  },
  watchFolders: [path.resolve(__dirname)]
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
