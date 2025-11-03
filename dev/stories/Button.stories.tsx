import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'flex-start', padding: 20, gap: 10 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onPress: { action: 'pressed' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic variants
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => (
    <Button variant="primary" onPress={args.onPress}>
      <Button.Text>Primary Button</Button.Text>
    </Button >
  ),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => (
    <Button variant="secondary" onPress={args.onPress}>
      <Button.Text>Secondary Button</Button.Text>
    </Button>
  ),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => (
    <Button variant="outline" onPress={args.onPress}>
      <Button.Text>Outline Button</Button.Text>
    </Button>
  ),
};

// Different sizes
export const Small: Story = {
  args: {
    size: '$2',
  },
  render: (args) => (
    <Button size="$2" onPress={args.onPress}>
      <Button.Text>Small Button</Button.Text>
    </Button>
  ),
};

export const Medium: Story = {
  args: {
    size: '$4',
  },
  render: (args) => (
    <Button size="$4" onPress={args.onPress}>
      <Button.Text>Medium Button</Button.Text>
    </Button>
  ),
};

export const Large: Story = {
  args: {
    size: '$6',
  },
  render: (args) => (
    <Button size="$6" onPress={args.onPress}>
      <Button.Text>Large Button</Button.Text>
    </Button>
  ),
};

// All variants in one view
export const AllVariants: Story = {
  render: (args) => (
    <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
      <Button variant="primary" onPress={args.onPress}>
        <Button.Text>Primary</Button.Text>
      </Button>
      <Button variant="secondary" onPress={args.onPress}>
        <Button.Text>Secondary</Button.Text>
      </Button>
      <Button variant="outline" onPress={args.onPress}>
        <Button.Text>Outline</Button.Text>
      </Button>
    </View>
  ),
};

// All sizes in one view
export const AllSizes: Story = {
  render: (args) => (
    <View style={{ flex: 1, flexDirection: 'column', gap: 15 }}>
      <Button size="$2" onPress={args.onPress}>
        <Button.Text>Small ($2)</Button.Text>
      </Button>
      <Button size="$3" onPress={args.onPress}>
        <Button.Text>Medium Small ($3)</Button.Text>
      </Button>
      <Button size="$4" onPress={args.onPress}>
        <Button.Text>Medium ($4)</Button.Text>
      </Button>
      <Button size="$5" onPress={args.onPress}>
        <Button.Text>Medium Large ($5)</Button.Text>
      </Button>
      <Button size="$6" onPress={args.onPress}>
        <Button.Text>Large ($6)</Button.Text>
      </Button>
    </View>
  ),
};
