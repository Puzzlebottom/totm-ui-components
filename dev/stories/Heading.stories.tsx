import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@puzzlebottom/totm-ui-components';
import { View } from 'react-native';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
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

Use Heading for all page titles, section headers, and content hierarchy. This component ensures proper semantic HTML (h1-h6 tags) for accessibility while maintaining consistent design system styling.

**Good for:**
- Page titles and main headings
- Major section headers
- Subsection titles within content
- Establishing visual and semantic hierarchy
- Ensuring proper HTML semantics for accessibility and SEO

**Avoid when:**
- Body text or paragraphs - Use \`Text\` component instead
- UI labels or form labels - Use \`Label\` component for better accessibility
- Emphasized text within paragraphs - Use \`Text\` with fontWeight prop
- Small sizes (below h6) - Use \`Text\` with appropriate fontSize

## Accessibility

- Maintain proper heading hierarchy (don't skip levels, e.g., h1 → h3)
- Each page should have exactly one h1 (typically the page title)
- Headings create an outline for screen reader users to navigate content
- Use semantic levels based on content structure, not just visual size
- Override fontSize if needed for design, but keep semantic level correct

## Best Practices

- Start with h1 for page title, h2 for major sections, h3 for subsections
- Don't choose heading level based on size alone - use fontSize prop for visual adjustments
- Keep headings concise and descriptive
- Use heading hierarchy to create clear content structure
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'Section Heading',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default h2 heading with consistent design system styling.',
      },
    },
  },
};

export const PageTitle: Story = {
  args: {
    level: 'h1',
    children: 'Welcome to Our App',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use h1 for the main page title. Each page should have exactly one h1 for accessibility and SEO.',
      },
    },
  },
};

export const SectionHeader: Story = {
  args: {
    level: 'h2',
    children: 'Account Settings',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use h2 for major section headers. This establishes clear content structure and navigation for screen readers.',
      },
    },
  },
};

export const Subsection: Story = {
  args: {
    level: 'h3',
    children: 'Privacy Preferences',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use h3 for subsections within h2 sections. Maintain proper hierarchy for accessibility.',
      },
    },
  },
};

export const ContentHierarchy: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Heading level="h1">User Profile</Heading>
      <Heading level="h2">Account Settings</Heading>
      <Heading level="h3">Privacy Preferences</Heading>
      <Heading level="h4">Data Collection</Heading>
      <Heading level="h5">Cookie Settings</Heading>
      <Heading level="h6">Technical Details</Heading>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all heading levels showing proper semantic hierarchy. Use this pattern to structure content logically.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <View style={{ gap: 16, flexDirection: 'column' }}>
      <Heading level="h1" fontSize="$8" lineHeight="$8" color="$purple7">
        Visually Smaller H1
      </Heading>
      <Heading level="h3" fontSize="$10" lineHeight="$10" color="$pink7">
        Visually Larger H3 That Wraps To Multiple Lines
      </Heading>
      <Heading level="h2" fontWeight="400">
        Lighter Weight H2
      </Heading>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Override visual styling while maintaining semantic HTML. IMPORTANT: When overriding fontSize, also override lineHeight to the same token. Tamagui handles proper spacing automatically.',
      },
    },
  },
};

export const HeroHeading: Story = {
  render: () => (
    <View style={{ alignItems: 'center', paddingVertical: 40, gap: 16, flexDirection: 'column' }}>
      <Heading level="h1" fontSize="$12" lineHeight="$12" style={{ textAlign: 'center' }}>
        Build Amazing Apps
      </Heading>
      <Heading level="h2" fontSize="$7" lineHeight="$7" fontWeight="400" style={{ textAlign: 'center' }}>
        Start creating beautiful experiences today
      </Heading>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use large, centered headings for hero sections. Maintain proper h1/h2 hierarchy even when both are visually prominent.',
      },
    },
  },
};

export const CardHeadings: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#e5e5e5',
        }}
      >
        <Heading level="h3">Featured Article</Heading>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#e5e5e5',
        }}
      >
        <Heading level="h3">Product Overview</Heading>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#e5e5e5',
        }}
      >
        <Heading level="h3">User Testimonial</Heading>
      </View>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use h3 for card titles within a section. If cards are under an h2 section header, h3 maintains proper hierarchy.',
      },
    },
  },
};

export const AllLevels: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Heading level="h1">Heading 1 - Page Title</Heading>
      <Heading level="h2">Heading 2 - Major Section</Heading>
      <Heading level="h3">Heading 3 - Subsection</Heading>
      <Heading level="h4">Heading 4 - Minor Heading</Heading>
      <Heading level="h5">Heading 5 - Small Heading</Heading>
      <Heading level="h6">Heading 6 - Smallest Heading</Heading>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all heading levels with default styling. Notice the progressive size reduction maintaining readability.',
      },
    },
  },
};

