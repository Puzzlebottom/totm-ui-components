import { UIProvider } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';
import type { Preview } from '@storybook/react-native-web-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <UIProvider defaultTheme="light">
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Story />
        </View>
      </UIProvider>
    ),
  ],
};

export default preview;