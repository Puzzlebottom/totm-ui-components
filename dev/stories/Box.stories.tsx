import type { Meta, StoryObj } from '@storybook/react';
import { Box, Text } from '@puzzlebottom/totm-ui-components';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## When to Use

Box is the fundamental building block for layouts, replacing \`<div>\` on web and \`<View>\` on native.
Use Box for any container, wrapper, or layout structure.

**Good for:**
- Any container or wrapper (replaces \`<div>\`)
- Layout structures (rows, columns, grids)
- Grouping related content
- Sections with padding, margin, or background

**Avoid when:**
- For text content - use Text or Heading
- For buttons - use Button component
- For form inputs - use Input, TextArea, etc.

## Cross-Platform Compatibility

- On web: Renders as \`<div>\`
- On native: Renders as React Native \`View\`
- All style props work identically on both platforms
- Enables copy-paste of entire screens between web and mobile

## Accessibility

- Supports ARIA attributes on web
- Respects accessibility props on native
- Can be made focusable with appropriate props
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic container
export const Default: Story = {
  render: () => (
    <Box p="$4" bg="$gray2" rounded="$4">
      <Text>Basic Box container with padding and background</Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Box with padding, background color, and border radius.',
      },
    },
  },
};

// Flex row layout
export const FlexRow: Story = {
  render: () => (
    <Box flexDirection="row" gap="$3" items="center" px="$4">
      <Box width={50} height={50} bg="$purple9" rounded="$2" />
      <Text>Row layout with gap</Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout using flexDirection="row" with gap between items.',
      },
    },
  },
};

// Flex column layout (default)
export const FlexColumn: Story = {
  render: () => (
    <Box flexDirection="column" gap="$3" py="$4">
      <Box height={50} width="100%" bg="$purple9" rounded="$2" />
      <Box height={50} width="100%" bg="$pink7" rounded="$2" />
      <Box height={50} width="100%" bg="$red7" rounded="$2" />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout using flexDirection="column" with gap between items.',
      },
    },
  },
};

// Centered content
export const Centered: Story = {
  render: () => (
    <Box
      width={300}
      height={200}
      items="center"
      justify="center"
      bg="$gray2"
      rounded="$4"
    >
      <Text>Centered content</Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content centered both horizontally and vertically.',
      },
    },
  },
};

// Card-like container
export const Card: Story = {
  render: () => (
    <Box
      p="$4"
      borderWidth={2}
      borderColor="$gray6"
      rounded="$4"
      bg="$background"
      gap="$2"
    >
      <Text fontWeight="bold">Card Title</Text>
      <Text>Card content with border and padding</Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card-like container with border, padding, and background.',
      },
    },
  },
};

// With shadows
export const WithShadow: Story = {
  render: () => (
    <Box
      p="$4"
      bg="$background"
      rounded="$4"
      shadowColor="rgba(0, 0, 0, 0.15)"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.25}
      shadowRadius={12}
      elevationAndroid={15}
    >
      <Text>Box with shadow/elevation</Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Box with shadow on web and elevation on native. Uses boxShadow for web and elevation for native.',
      },
    },
  },
};

// Grid-like layout
export const Grid: Story = {
  render: () => (
    <Box flexDirection="row" flexWrap="wrap" gap="$3" p="$4">
      <Box width="48%" p="$3" bg="$gray2" rounded="$3">
        <Text>Item 1</Text>
      </Box>
      <Box width="48%" p="$3" bg="$gray2" rounded="$3">
        <Text>Item 2</Text>
      </Box>
      <Box width="48%" p="$3" bg="$gray2" rounded="$3">
        <Text>Item 3</Text>
      </Box>
      <Box width="48%" p="$3" bg="$gray2" rounded="$3">
        <Text>Item 4</Text>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid-like layout using flex wrap with percentage widths.',
      },
    },
  },
};

// Nested boxes
export const Nested: Story = {
  render: () => (
    <Box p="$4" bg="$gray2" rounded="$4">
      <Text mb="$3">Outer Box</Text>
      <Box p="$3" bg="$background" rounded="$3">
        <Text mb="$2">Inner Box</Text>
        <Box p="$2" bg="$gray2" rounded="$2">
          <Text>Deeply nested Box</Text>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple levels of nested boxes for complex layouts.',
      },
    },
  },
};

// Spacing variations
export const SpacingVariations: Story = {
  render: () => (
    <Box flexDirection="column" gap="$4" p="$4">
      <Box p="$2" bg="$gray2" rounded="$3">
        <Text>Small padding ($2)</Text>
      </Box>
      <Box p="$4" bg="$gray2" rounded="$3">
        <Text>Medium padding ($4)</Text>
      </Box>
      <Box p="$6" bg="$gray2" rounded="$3">
        <Text>Large padding ($6)</Text>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding sizes using Tamagui spacing tokens.',
      },
    },
  },
};

// Form layout example
export const FormLayout: Story = {
  render: () => (
    <Box
      p="$4"
      gap="$4"
      bg="$background"
      rounded="$4"
      borderWidth={2}
      borderColor="$gray6"
      maxW={400}
    >
      <Text fontSize="$6" fontWeight="bold">Sign Up</Text>
      <Box gap="$2">
        <Text fontSize="$3" color="$gray11">Name</Text>
        <Box
          p="$3"
          borderWidth={2}
          borderColor="$gray6"
          rounded="$3"
          bg="$gray2"
        >
          <Text color="$gray10">Input placeholder</Text>
        </Box>
      </Box>
      <Box gap="$2">
        <Text fontSize="$3" color="$gray11">Email</Text>
        <Box
          p="$3"
          borderWidth={2}
          borderColor="$gray6"
          rounded="$3"
          bg="$gray2"
        >
          <Text color="$gray10">Input placeholder</Text>
        </Box>
      </Box>
      <Box
        p="$3"
        bg="$purple9"
        rounded="$3"
        items="center"
      >
        <Text color="white" fontWeight="bold">Submit</Text>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a form layout using nested Boxes.',
      },
    },
  },
};


