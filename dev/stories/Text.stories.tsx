import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
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

Use Text for all non-heading text content including paragraphs, UI labels, captions, and inline text. This component provides consistent typography with size variants optimized for readability across different contexts.

**Good for:**
- Body paragraphs and article content
- UI labels and button text
- Captions, metadata, and timestamps
- Helper text and descriptions
- Inline text within other components

**Avoid when:**
- Page or section titles - Use \`Heading\` component
- Form field labels - Use \`Label\` component for accessibility
- Interactive text - Use \`Button\` or \`Link\` instead
- Gradient styling - Use \`GradientText\` sparingly

## Readability Notes

- Default 'body' size (16px) is optimal for reading
- Line height automatically adjusts per size
- Maintain sufficient color contrast (WCAG AA minimum: 4.5:1)

## Accessibility

- Ensure sufficient color contrast
- Avoid text smaller than 'caption' (12px) for body content
- Use appropriate semantic HTML via \`tag\` prop
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'This is standard body text optimized for reading.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default body text size (16px) provides optimal readability for most content.',
      },
    },
  },
};

export const BodyParagraph: Story = {
  render: () => (
    <View style={{ maxWidth: 600 }}>
      <Text tag="p" size="body">
        This is a paragraph of body text. Using the p tag ensures proper semantic HTML structure.
        Optimal line length is 45-75 characters for comfortable reading.
      </Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use tag="p" for paragraph text. Wrap in a container with maxWidth to maintain optimal line length.',
      },
    },
  },
};

export const IntroductionText: Story = {
  render: () => (
    <View style={{ gap: 16, maxWidth: 680 }}>
      <Text tag="p" size="large" color="$gray12">
        This introductory paragraph uses a larger size to draw attention and improve readability
        for the first impression. Use this for lead-ins or article introductions.
      </Text>
      <Text tag="p" size="body">
        Subsequent paragraphs use the standard body size. The consistent sizing and spacing
        creates a comfortable reading experience throughout the content.
      </Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use "large" size for introductory paragraphs to create visual hierarchy.',
      },
    },
  },
};

export const SizeVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text size="xlarge">Extra Large (20px) - Emphasis text</Text>
      <Text size="large">Large (18px) - Introductory text</Text>
      <Text size="body">Body (16px) - Default reading text</Text>
      <Text size="small">Small (14px) - Secondary information</Text>
      <Text size="caption">Caption (12px) - Metadata and timestamps</Text>
      <Text size="tiny">Tiny (11px) - Dense UI elements</Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all text sizes. Each size is optimized for its specific use case.',
      },
    },
  },
};

export const Metadata: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text size="caption" color="$gray10">
        Published 2 hours ago
      </Text>
      <Text size="caption" color="$gray10">
        Last updated: Nov 3, 2025
      </Text>
      <Text size="caption" color="$gray10">
        5 min read • 234 views
      </Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use "caption" size for timestamps, metadata, and supplementary information. Pair with muted color.',
      },
    },
  },
};

export const HelperText: Story = {
  render: () => (
    <View style={{ gap: 8, maxWidth: 400 }}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#e5e5e5',
        }}
      >
        <Text size="body" color="$gray12">
          Email Address
        </Text>
      </View>
      <Text size="small" color="$gray11">
        We'll never share your email with anyone else. Used only for account notifications.
      </Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use "small" size for helper text and descriptions supporting form inputs.',
      },
    },
  },
};

export const InlineEmphasis: Story = {
  render: () => (
    <View style={{ maxWidth: 500 }}>
      <Text size="body">
        Welcome back, <Text fontWeight="700">John Doe</Text>! You have{' '}
        <Text color="$purple7" fontWeight="600">
          3 new messages
        </Text>
        .
      </Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use inline Text with fontWeight and color for emphasis. Avoid changing size inline.',
      },
    },
  },
};

export const CardContent: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        maxWidth: 400,
      }}
    >
      <View style={{ gap: 12 }}>
        <Text size="caption" color="$gray10">
          Article • 5 min read
        </Text>
        <Text size="xlarge" fontWeight="600" color="$gray12">
          Getting Started with Design Systems
        </Text>
        <Text size="body" color="$gray11">
          Learn how to build consistent, scalable design systems that improve development
          velocity and user experience.
        </Text>
        <Text size="small" color="$purple7" fontWeight="600">
          Read more →
        </Text>
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper text hierarchy: caption for metadata, xlarge for title, body for description, small for actions.',
      },
    },
  },
};

export const ColorVariations: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text size="body" color="$gray12">
        Primary text color (high contrast)
      </Text>
      <Text size="body" color="$gray11">
        Secondary text color (medium contrast)
      </Text>
      <Text size="body" color="$gray10">
        Tertiary text color (low contrast)
      </Text>
      <Text size="body" color="$purple7">
        Branded text color (accent)
      </Text>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use appropriate color contrast ratios. Primary for main content, secondary for supporting text.',
      },
    },
  },
};
