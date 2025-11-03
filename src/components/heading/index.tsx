import { styled, H1, H2, H3, H4, H5, H6, GetProps } from 'tamagui'

/**
 * Props for the Heading component.
 * 
 * @remarks
 * Extends Tamagui's text props with semantic heading level variants.
 */
export interface HeadingProps extends GetProps<typeof H1> {
  /**
   * Semantic heading level that determines both HTML tag and default styling.
   * 
   * @remarks
   * - h1: Page title or main heading (largest)
   * - h2: Major section headings
   * - h3: Subsection headings
   * - h4: Minor headings
   * - h5: Small headings
   * - h6: Smallest headings
   * 
   * @default 'h2'
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const HeadingH1 = styled(H1, {
  name: 'Heading',
  fontSize: '$10',
  fontWeight: '700',
  lineHeight: '$10',
  letterSpacing: -0.5,
  color: '$color',
})

const HeadingH2 = styled(H2, {
  name: 'Heading',
  fontSize: '$9',
  fontWeight: '700',
  lineHeight: '$9',
  letterSpacing: -0.4,
  color: '$color',
})

const HeadingH3 = styled(H3, {
  name: 'Heading',
  fontSize: '$8',
  fontWeight: '600',
  lineHeight: '$8',
  letterSpacing: -0.3,
  color: '$color',
})

const HeadingH4 = styled(H4, {
  name: 'Heading',
  fontSize: '$7',
  fontWeight: '600',
  lineHeight: '$7',
  letterSpacing: -0.2,
  color: '$color',
})

const HeadingH5 = styled(H5, {
  name: 'Heading',
  fontSize: '$6',
  fontWeight: '600',
  lineHeight: '$6',
  letterSpacing: -0.1,
  color: '$color',
})

const HeadingH6 = styled(H6, {
  name: 'Heading',
  fontSize: '$5',
  fontWeight: '600',
  lineHeight: '$5',
  letterSpacing: 0,
  color: '$color',
})

/**
 * Heading - Semantic heading component for page and section titles
 * 
 * @remarks
 * Use Heading for all page titles, section headers, and content hierarchy. This component
 * ensures proper semantic HTML (h1-h6 tags) for accessibility while maintaining consistent
 * design system styling. Always consider heading hierarchy when structuring content - screen
 * readers and SEO rely on proper heading order.
 * 
 * **When to use:**
 * - Page titles and main headings (level="h1")
 * - Major section headers (level="h2")
 * - Subsection titles within content (level="h3" to "h6")
 * - Any content that establishes visual and semantic hierarchy
 * - When you need proper HTML semantics for accessibility and SEO
 * 
 * **When NOT to use:**
 * - Body text or paragraphs - use `Text` instead for readability
 * - UI labels or form labels - use `Label` component for better accessibility
 * - Emphasized text within paragraphs - use `Text` with fontWeight prop instead
 * - Buttons or interactive elements - use `Button` component instead
 * - Small sizes (below h6) - use `Text` with appropriate fontSize instead
 * 
 * **Accessibility notes:**
 * - Maintain proper heading hierarchy (don't skip levels, e.g., h1 → h3)
 * - Each page should have exactly one h1 (typically the page title)
 * - Headings create an outline for screen reader users to navigate content
 * - Use semantic levels based on content structure, not just visual size
 * - Override fontSize if needed for design, but keep semantic level correct
 * 
 * **Best practices:**
 * - Start with h1 for page title, h2 for major sections, h3 for subsections, etc.
 * - Don't choose heading level based on size alone - use fontSize prop for visual adjustments
 * - Keep headings concise and descriptive
 * - Use heading hierarchy to create clear content structure
 * 
 * @example
 * Basic page title:
 * ```tsx
 * <Heading level="h1">Welcome to Our App</Heading>
 * ```
 * 
 * @example
 * Section headings with hierarchy:
 * ```tsx
 * // Main page title
 * <Heading level="h1">User Profile</Heading>
 * 
 * // Major section
 * <Heading level="h2">Account Settings</Heading>
 * 
 * // Subsection within settings
 * <Heading level="h3">Privacy Preferences</Heading>
 * ```
 * 
 * @example
 * Custom styling while maintaining semantics:
 * ```tsx
 * // Visually smaller h1 for compact layouts
 * <Heading level="h1" fontSize="$8">
 *   Dashboard Overview
 * </Heading>
 * 
 * // Visually larger h3 for emphasis
 * <Heading level="h3" fontSize="$9" color="$purple7">
 *   Featured Content
 * </Heading>
 * ```
 * 
 * @example
 * In a card layout:
 * ```tsx
 * <Card>
 *   <Heading level="h3">Article Title</Heading>
 *   <Text>Article summary text goes here...</Text>
 * </Card>
 * ```
 * 
 * @example
 * Hero section:
 * ```tsx
 * // Large impactful heading for landing page
 * <YStack ai="center" jc="center" py="$10">
 *   <Heading level="h1" fontSize="$12" ta="center">
 *     Build Amazing Apps
 *   </Heading>
 *   <Text size="large" ta="center" color="$gray11">
 *     Start creating beautiful experiences today
 *   </Text>
 * </YStack>
 * ```
 */
export const Heading = ({ level = 'h2', ...props }: HeadingProps) => {
  switch (level) {
    case 'h1':
      return <HeadingH1 {...props} />
    case 'h2':
      return <HeadingH2 {...props} />
    case 'h3':
      return <HeadingH3 {...props} />
    case 'h4':
      return <HeadingH4 {...props} />
    case 'h5':
      return <HeadingH5 {...props} />
    case 'h6':
      return <HeadingH6 {...props} />
    default:
      return <HeadingH2 {...props} />
  }
}

