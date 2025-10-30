import { UIProvider } from '@puzzlebottom/totm-ui-components';
import type { Preview } from '@storybook/react';
import { View } from 'react-native';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <UIProvider defaultTheme="light">
        <View style={{ flex: 1, alignItems: 'flex-start' }} >
          <Story />
        </View>
      </UIProvider>
    ),
  ],
};

export default preview;
