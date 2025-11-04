import type { Meta, StoryObj } from '@storybook/react';
import { Card, Text, Box } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## When to Use

Use Card to group related information into a visually distinct container with consistent styling.

**Good for:**
- Grouping related content (profiles, items, posts)
- List items with clear visual separation
- Dashboard widgets and summaries
- Content previews
- Interactive containers

**Avoid when:**
- Simple dividers - use Divider or Box with borders
- Full-screen layouts - use Box for flexibility
- Buttons - use Button component
- Inline content without separation - use Box

## Visual Hierarchy

- **Default**: Subtle border, no shadow (flat design)
- **Elevated**: Border + shadow for prominence

## Accessibility

- Use semantic roles when appropriate
- Ensure color contrast for borders
- Add press handlers for interactive cards
- Include accessible labels for screen readers
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  render: () => (
    <Card>
      <Text fontWeight="bold" fontSize="$5">Card Title</Text>
      <Text>Basic card with default styling. Perfect for grouping related content.</Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default card with border, padding, and no shadow.',
      },
    },
  },
};

// Elevated card
export const Elevated: Story = {
  render: () => (
    <Card
      variant="elevated"
    >
      <Text fontWeight="bold" fontSize="$5">Featured Card</Text>
      <Text>Elevated card with shadow to stand out from the background.</Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with shadow/elevation for more prominence. Uses boxShadow for web compatibility.',
      },
    },
  },
};

// Interactive card
export const Interactive: Story = {
  render: () => (
    <Card
      variant="elevated"
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
      hoverStyle={{ borderColor: '$purple9' }}
      onPress={() => console.log('Card pressed')}
    >
      <Text fontWeight="bold" fontSize="$5">Tap Me!</Text>
      <Text>This card is interactive with press and hover effects.</Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive card with press and hover states.',
      },
    },
  },
};

// Profile card
export const ProfileCard: Story = {
  render: () => (
    <Card gap="$3">
      <Box
        width={60}
        height={60}
        rounded="$3"
        bg="$purple9"
        items="center"
        justify="center"
      >
        <Text color="white" fontSize="$8" fontWeight="bold">JD</Text>
      </Box>
      <Box gap="$1">
        <Text fontWeight="bold" fontSize="$5">John Doe</Text>
        <Text color="$gray11" fontSize="$3">Software Engineer</Text>
        <Text color="$gray10" fontSize="$2">San Francisco, CA</Text>
      </Box>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a profile card with avatar and user info.',
      },
    },
  },
};

// Content card with sections
export const ContentCard: Story = {
  render: () => (
    <Card gap="$4">
      <Box gap="$2">
        <Text fontWeight="bold" fontSize="$6">Article Title</Text>
        <Text color="$gray11" fontSize="$2">Posted on Nov 3, 2025</Text>
      </Box>
      <Text fontSize="$4" color="$gray12">
        This is a preview of the article content. Cards are perfect for displaying
        content summaries with multiple sections.
      </Text>
      <Box flexDirection="row" gap="$2">
        <Box
          px="$3"
          py="$2"
          bg="$gray4"
          rounded="$2"
        >
          <Text fontSize="$2" color="$gray11">React</Text>
        </Box>
        <Box
          px="$3"
          py="$2"
          bg="$gray4"
          rounded="$2"
        >
          <Text fontSize="$2" color="$gray11">TypeScript</Text>
        </Box>
      </Box>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content card with title, description, metadata, and tags.',
      },
    },
  },
};

// List of cards
export const CardList: Story = {
  render: () => (
    <Box gap="$3">
      <Card
        variant="elevated"
        onPress={() => console.log('Card 1')}
      >
        <Text fontWeight="bold">Encounter #1</Text>
        <Text color="$gray11">Dragon encounter in the mountains</Text>
      </Card>
      <Card
        variant="elevated"
        onPress={() => console.log('Card 2')}
      >
        <Text fontWeight="bold">Encounter #2</Text>
        <Text color="$gray11">Goblin ambush in the forest</Text>
      </Card>
      <Card
        variant="elevated"
        onPress={() => console.log('Card 3')}
      >
        <Text fontWeight="bold">Encounter #3</Text>
        <Text color="$gray11">Undead in the crypt</Text>
      </Card>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of cards in a list layout (like the TOTM app encounters).',
      },
    },
  },
};

// Card with actions
export const WithActions: Story = {
  render: () => (
    <Card gap="$3">
      <Box gap="$2">
        <Text fontWeight="bold" fontSize="$5">Character Name</Text>
        <Text color="$gray11">Level 5 Fighter</Text>
      </Box>
      <Box flexDirection="row" gap="$2">
        <Box
          flex={1}
          p="$2"
          bg="$purple9"
          rounded="$3"
          items="center"
          pressStyle={{ opacity: 0.8 }}
        >
          <Text color="white" fontWeight="bold" numberOfLines={1}>Edit</Text>
        </Box>
        <Box
          flex={1}
          p="$2"
          bg="$gray6"
          rounded="$3"
          items="center"
          pressStyle={{ opacity: 0.8 }}
        >
          <Text fontWeight="bold" numberOfLines={1}>Delete</Text>
        </Box>
      </Box>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with action buttons (edit, delete, etc.).',
      },
    },
  },
};

// Compact card
export const Compact: Story = {
  render: () => (
    <Card p="$2" gap="$1">
      <Text fontWeight="bold" fontSize="$3">Compact Card</Text>
      <Text fontSize="$2">Less padding for denser layouts</Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with reduced padding for compact layouts.',
      },
    },
  },
};

// Spacious card
export const Spacious: Story = {
  render: () => (
    <Card px="$6" py="$4" gap="$4">
      <Text fontWeight="bold" fontSize="$6">Spacious Card</Text>
      <Text fontSize="$4">More padding for breathing room and emphasis</Text>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with increased padding for more spacious layouts.',
      },
    },
  },
};

// Card variants comparison
export const AllVariants: Story = {
  render: () => (
    <Box gap="$4">
      <Card variant="default">
        <Text fontWeight="bold">Default Card</Text>
        <Text color="$gray11">Flat design with border only</Text>
      </Card>
      <Card variant="elevated">
        <Text fontWeight="bold">Elevated Card</Text>
        <Text color="$gray11">With shadow for prominence</Text>
      </Card>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all card variants.',
      },
    },
  },
};


