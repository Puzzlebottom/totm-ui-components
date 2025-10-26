// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")
const withStorybook = require("@storybook/react-native/metro/withStorybook")

const path = require("path")

const workspaceRoot = path.resolve(__dirname, "../..")
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)

config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules")
]

config.resolver.disableHierarchicalLookup = true

// Resolve totm-ui-components from source files for hot reload
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'totm-ui-components') {
    return {
      filePath: path.resolve(workspaceRoot, 'src/index.ts'),
      type: 'sourceFile',
    }
  }

  // Fall back to default resolver
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = withStorybook(config)