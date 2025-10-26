import type { StorybookConfig } from "@storybook/react-native-web-vite";

import { join, dirname, resolve } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  "stories": [
    "../../stories/**/*.mdx",
    "../../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  "framework": {
    "name": "@storybook/react-native-web-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "viteFinal": async (config) => {
    // Merge with our custom Vite config
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          'react-native': 'react-native-web',
          // Point directly to source files for hot reload
          'totm-ui-components': resolve(__dirname, '../../../src/index.ts'),
        },
      },
      optimizeDeps: {
        include: [
          'react-native-web',
        ],
        exclude: ['markdown-to-jsx', 'totm-ui-components'],
      },
      server: {
        fs: {
          allow: ['../..'],
        },
      },
    });
  },
};
export default config;