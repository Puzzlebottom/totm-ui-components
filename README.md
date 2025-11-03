# TOTM UI Components

A React Native component library built on Tamagui, designed for cross-platform applications.

> **Note:** This is a demo project for my professional portfolio.

## Installation

```bash
npm install @puzzlebottom/totm-ui-components
# or
yarn add @puzzlebottom/totm-ui-components
```

### Required Peer Dependencies

All platforms require:
```bash
npm install react tamagui @tamagui/config react-native-svg
```

### Platform-Specific Dependencies

**For React Native / Expo:**
```bash
npm install react-native @react-native-masked-view/masked-view expo-linear-gradient
```

**For Web:**
```bash
npm install react-dom react-native-web
```

## Usage

Wrap your app with the UIProvider:

```typescript
import { UIProvider, Button, GradientText } from '@puzzlebottom/totm-ui-components'

function App() {
  return (
    <UIProvider>
      <Button>Click me</Button>
      <GradientText>Beautiful gradient text</GradientText>
    </UIProvider>
  )
}
```

## Development Setup

```bash
# Install dependencies
yarn install

# Generate type declarations (watches for changes)
cd src
yarn dev

# Or build types once
yarn build
```

## Running Storybook

### Web

```bash
cd dev/web
yarn storybook
```

### Mobile (Expo)

```bash
cd dev/native
yarn start
```

## Built With

- [Tamagui](https://tamagui.dev/) - Universal UI components
- [React Native](https://reactnative.dev/) - Cross-platform framework
- [Expo](https://expo.dev/) - Development tooling
- [Storybook](https://storybook.js.org/) - Component development environment

## License

MIT

