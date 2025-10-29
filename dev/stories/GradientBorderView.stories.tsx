import type { Meta, StoryObj } from '@storybook/react';
import { GradientBorderView } from 'totm-ui-components';
import { View, Text } from 'react-native';

const meta: Meta<typeof GradientBorderView> = {
  title: 'Example/GradientBorderView',
  component: GradientBorderView,
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

// Basic GradientBorderView
export const Basic: Story = {
  render: () => (
    <GradientBorderView
      style={{
        width: 300,
        height: 200,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Gradient Border</Text>
    </GradientBorderView>
  ),
};

// With thicker border
export const ThickBorder: Story = {
  render: () => (
    <GradientBorderView
      style={{
        width: 300,
        height: 200,
        borderRadius: 16,
        borderWidth: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Thick Border</Text>
    </GradientBorderView>
  ),
};

