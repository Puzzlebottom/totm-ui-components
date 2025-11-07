import { Box, Gradient, Text, type GradientProps } from '@puzzlebottom/totm-ui-components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Gradient> = {
  title: 'Components/Gradient',
  component: Gradient,
  decorators: [
    (Story) => (
      <Box flex={1} justify="flex-start" p={20} gap={10}>
        <Story />
      </Box>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<GradientProps>;

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

// Animated Rotating Gradient
export const Animated: Story = {
  render: () => (
    <Gradient
      animated
      rotationDuration={1}
      width={300}
      height={100}
      rounded="$4"
      items="center"
      justify="center"
    >
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Animated</Text>
    </Gradient>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gradient with continuously rotating angle. The gradient direction rotates smoothly using requestAnimationFrame for 60fps updates. rotationDuration specifies seconds for a complete 360° rotation.',
      },
    },
  },
};

