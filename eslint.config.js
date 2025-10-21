const js = require("@eslint/js")
const prettierConfig = require("eslint-config-prettier")
const prettier = require("eslint-plugin-prettier")
const reactHooks = require("eslint-plugin-react-hooks")
const reactRefresh = require("eslint-plugin-react-refresh")
const reactNativeA11y = require("eslint-plugin-react-native-a11y")
const globals = require("globals")
const tseslint = require("typescript-eslint")

module.exports = tseslint.config(
  {
    ignores: [
      "dist",
      "eslint.config.js",
      "metro.config.js",
      "babel.config.js",
      "app.json",
      "expo-env.d.ts",
      "node_modules",
      ".expo",
      ".rnstorybook",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      prettierConfig,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-native-a11y": reactNativeA11y,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // All of these overrides ease getting into
      // TypeScript, and can be removed for stricter
      // linting down the line.

      // Only warn on unused variables, and ignore variables starting with `_`
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],

      // Allow escaping the compiler
      "@typescript-eslint/ban-ts-comment": "error",

      // Allow explicit `any`s
      "@typescript-eslint/no-explicit-any": "off",

      // START: Allow implicit `any`s
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      // END: Allow implicit `any`s

      // Allow async functions without await
      // for consistency (esp. Convex `handler`s)
      "@typescript-eslint/require-await": "off",

      // Prettier integration
      "prettier/prettier": "error",

      // Disable semicolon rules to match Prettier no-semicolon setting
      semi: "off",
      "@typescript-eslint/semi": "off",

      // Code quality rules (non-formatting)
      camelcase: ["error", { properties: "never" }],
      "no-var": "error",
      "prefer-const": "error",

      // React Native Accessibility rules
      "react-native-a11y/has-accessibility-hint": "error",
      "react-native-a11y/has-accessibility-props": "error",
      "react-native-a11y/has-valid-accessibility-actions": "error",
      "react-native-a11y/has-valid-accessibility-component-type": "error",
      "react-native-a11y/has-valid-accessibility-descriptors": "error",
      "react-native-a11y/has-valid-accessibility-ignores-invert-colors": "error",
      "react-native-a11y/has-valid-accessibility-live-region": "error",
      "react-native-a11y/has-valid-accessibility-role": "error",
      "react-native-a11y/has-valid-accessibility-state": "error",
      "react-native-a11y/has-valid-accessibility-states": "error",
      "react-native-a11y/has-valid-accessibility-traits": "error",
      "react-native-a11y/has-valid-accessibility-value": "error",
      "react-native-a11y/has-valid-important-for-accessibility": "error",
      "react-native-a11y/no-nested-touchables": "error",
    },
  }
)