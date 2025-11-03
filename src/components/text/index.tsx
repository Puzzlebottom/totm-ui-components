import { styled, Text as TamaguiText, GetProps } from 'tamagui'

/**
 * Props for the Text component.
 * 
 * @remarks
 * Extends Tamagui's Text props with semantic size variants optimized for readability.
 */
export interface TextProps extends GetProps<typeof TamaguiText> {
  /**
   * Semantic size variant that determines font size, line height, and optimal readability.
   * 
   * @remarks
   * - xlarge: Large body text for emphasis or reduced density (20px)
   * - large: Slightly larger body text for readability (18px)
   * - body: Default body text, optimal for reading (16px) - DEFAULT
   * - small: Secondary information, less emphasis (14px)
   * - caption: Metadata, timestamps, helper text (12px)
   * - tiny: Minimal usage, dense UI elements (11px)
   * 
   * @default 'body'
   */
  size?: 'xlarge' | 'large' | 'body' | 'small' | 'caption' | 'tiny'
}

/**
 * Text - Semantic text component for body content and UI labels
 * 
 * @remarks
 * Use Text for all non-heading text content including paragraphs, UI labels, captions,
 * and inline text. This component provides consistent typography with size variants
 * optimized for readability across different contexts. Text uses the `<span>` element
 * by default but can be changed via the `tag` prop for semantic HTML.
 * 
 * **When to use:**
 * - Body paragraphs and article content (size="body")
 * - UI labels and button text (size="body" or "small")
 * - Captions, metadata, and timestamps (size="caption")
 * - Helper text and descriptions (size="small")
 * - Inline text within other components
 * - Any text content that isn't a heading or interactive element
 * 
 * **When NOT to use:**
 * - Page or section titles - use `Heading` component for proper semantics and hierarchy
 * - Form field labels - use `Label` component for accessibility (proper for/id associations)
 * - Interactive text that triggers actions - use `Button` or `Link` component instead
 * - Text that should render gradient styling - use `GradientText` for visual impact (sparingly)
 * - Error or validation messages - use dedicated form components with proper ARIA attributes
 * 
 * **Readability notes:**
 * - Default 'body' size (16px) is optimal for reading on most devices
 * - Line height automatically adjusts per size for readability
 * - For paragraphs, consider maxWidth to prevent overly long lines (45-75 characters ideal)
 * - Maintain sufficient color contrast (WCAG AA minimum: 4.5:1 for normal text, 3:1 for large text)
 * 
 * **Best practices:**
 * - Use 'body' size as default for most text content
 * - Reserve 'xlarge' and 'large' for emphasis or introductory paragraphs
 * - Use 'small' for secondary information that supports primary content
 * - Use 'caption' for metadata (dates, authors, categories)
 * - Avoid 'tiny' except for dense UI elements where space is critical
 * - For paragraphs, use tag="p" for semantic HTML
 * - For inline emphasis, use fontWeight or color props rather than changing size
 * 
 * **Accessibility notes:**
 * - Ensure sufficient color contrast against background
 * - Avoid text smaller than 'caption' (12px) for body content
 * - Use appropriate semantic HTML via `tag` prop (p, span, label, etc.)
 * - Don't rely on color alone to convey meaning
 * 
 * @example
 * Basic body text:
 * ```tsx
 * <Text>This is standard body text optimized for reading.</Text>
 * ```
 * 
 * @example
 * Paragraph with semantic HTML:
 * ```tsx
 * <Text tag="p" size="body" maxWidth={600}>
 *   This is a paragraph of body text. Using the p tag ensures proper
 *   semantic HTML structure. The maxWidth prevents overly long lines
 *   that reduce readability.
 * </Text>
 * ```
 * 
 * @example
 * Different text sizes for hierarchy:
 * ```tsx
 * <YStack gap="$2">
 *   <Text size="xlarge" fontWeight="600">
 *     Introduction text with more emphasis
 *   </Text>
 *   <Text size="body">
 *     Standard paragraph text that follows. This is the most common
 *     size and provides optimal readability.
 *   </Text>
 *   <Text size="small" color="$gray11">
 *     Additional context or secondary information in smaller text.
 *   </Text>
 * </YStack>
 * ```
 * 
 * @example
 * UI labels and metadata:
 * ```tsx
 * <Card>
 *   <Text size="caption" color="$gray10">
 *     Published 2 hours ago
 *   </Text>
 *   <Heading level="h3">Article Title</Heading>
 *   <Text size="body">
 *     Article summary or excerpt text...
 *   </Text>
 * </Card>
 * ```
 * 
 * @example
 * Inline text with emphasis:
 * ```tsx
 * <Text size="body">
 *   Welcome back, <Text fontWeight="700">John Doe</Text>!
 *   You have <Text color="$purple7">3 new messages</Text>.
 * </Text>
 * ```
 * 
 * @example
 * Helper text in forms:
 * ```tsx
 * <YStack gap="$2">
 *   <Input placeholder="Enter email" />
 *   <Text size="small" color="$gray11">
 *     We'll never share your email with anyone else.
 *   </Text>
 * </YStack>
 * ```
 * 
 * @example
 * Dense UI elements:
 * ```tsx
 * <XStack ai="center" gap="$2">
 *   <Badge>New</Badge>
 *   <Text size="tiny" color="$gray10" textTransform="uppercase">
 *     Limited Time
 *   </Text>
 * </XStack>
 * ```
 * 
 * @example
 * Maintaining readability in long-form content:
 * ```tsx
 * <YStack gap="$4" maxWidth={680} px="$4">
 *   <Text tag="p" size="large" color="$gray12">
 *     This introductory paragraph uses a larger size to draw
 *     attention and improve readability for the first impression.
 *   </Text>
 *   <Text tag="p" size="body">
 *     Subsequent paragraphs use the standard body size. The maxWidth
 *     on the container ensures lines don't exceed optimal reading length.
 *   </Text>
 *   <Text tag="p" size="body">
 *     Multiple paragraphs maintain consistent sizing and spacing for
 *     comfortable reading experience.
 *   </Text>
 * </YStack>
 * ```
 */
export const Text = styled(TamaguiText, {
  name: 'Text',
  color: '$color',
  fontFamily: '$body',

  variants: {
    size: {
      xlarge: {
        fontSize: '$7',      // 20px
        lineHeight: '$7',    // 30px
        fontWeight: '400',
      },
      large: {
        fontSize: '$6',      // 18px
        lineHeight: '$6',    // 27px
        fontWeight: '400',
      },
      body: {
        fontSize: '$5',      // 16px
        lineHeight: '$5',    // 24px
        fontWeight: '400',
      },
      small: {
        fontSize: '$4',      // 14px
        lineHeight: '$4',    // 21px
        fontWeight: '400',
      },
      caption: {
        fontSize: '$3',      // 12px
        lineHeight: '$3',    // 18px
        fontWeight: '400',
      },
      tiny: {
        fontSize: '$2',      // 11px
        lineHeight: '$2',    // 16px
        fontWeight: '400',
      },
    },
  } as const,

  defaultVariants: {
    size: 'body',
  },
})

