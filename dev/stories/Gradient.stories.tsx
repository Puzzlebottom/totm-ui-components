import type { Meta, StoryObj } from '@storybook/react';
import { Gradient } from 'totm-ui-components';
import { View, Text } from 'react-native';

const meta: Meta<typeof Gradient> = {
  title: 'Example/Gradient',
  component: Gradient,
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

type Story = StoryObj<typeof meta>;

// Basic Gradient
export const Default: Story = {
  render: () => (
    <Gradient
      width={300}
      height={200}
      rounded="$4"
      items="center"
      justify="center"
    >
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Default</Text>
    </Gradient>
  ),
};

// With Custom Colors
export const Customized: Story = {
  render: () => (
    <Gradient
      colors={['#D3D3D3', '#000000']}
      locations={[0, 1]}
      start={[0, 0]}
      width={300}
      height={200}
      rounded="$4"
      justify="center"
      items="center"
    >
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Customized</Text>
    </Gradient>
  ),
};

