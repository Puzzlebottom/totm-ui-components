import type { Meta, StoryObj } from '@storybook/react';
import { GradientText, type GradientTextProps } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';

const meta: Meta<typeof GradientText> = {
  title: 'Components/GradientText',
  component: GradientText,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'flex-start', padding: 20, gap: 10 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<GradientTextProps>;

// Default Gradient Text
export const Default: Story = {
  render: () => (
    <GradientText style={{ fontSize: 48, fontWeight: 'bold' }}>
      Gradient Text
    </GradientText>
  ),
};

// With Custom Colors and Direction
export const Customized: Story = {
  render: () => (
    <GradientText
      colors={['#D3D3D3', '#000000']}
      locations={[0, 1]}
      gradientStart={[0, 0]}
      gradientEnd={[0, 1]}
      style={{ fontSize: 48, fontWeight: 'bold' }}
    >
      Customized
    </GradientText>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom gradient colors and direction. Use `start` and `end` as objects `{ x, y }` or arrays `[x, y]` where values range from 0 to 1.',
      },
    },
  },
};

