import { Stack, styled, GetProps } from 'tamagui'

/**
 * Box component - Universal layout container for cross-platform applications.
 * 
 * @remarks
 * Box is the fundamental building block for layouts, replacing `<div>` on web and `<View>`
 * on native. Use Box for any container, wrapper, or layout structure. It provides consistent
 * styling and behavior across web and mobile platforms.
 * 
 * **When to use:**
 * - Any container or wrapper element (replaces `<div>` on web)
 * - Layout structures (rows, columns, grids)
 * - Grouping related content
 * - Creating sections with padding, margin, or background
 * - As the base for custom components
 * 
 * **When NOT to use:**
 * - For text content - use `Text` or `Heading` components instead
 * - For interactive buttons - use `Button` component
 * - For form inputs - use `Input`, `TextArea`, etc.
 * - For scrollable content - use `ScrollView` for better scroll behavior
 * 
 * **Cross-platform compatibility:**
 * - On web: Renders as `<div>` with full CSS support
 * - On native: Renders as React Native `View`
 * - All style props work identically on both platforms
 * - Enables true copy-paste of entire screens between web and mobile
 * 
 * **Accessibility:**
 * - Supports ARIA attributes on web
 * - Respects accessibility props on native
 * - Can be made focusable with appropriate props
 * 
 * **Performance:**
 * - Lightweight wrapper around Tamagui Stack
 * - No runtime overhead
 * - Optimized by Tamagui compiler
 * 
 * @example
 * Basic container:
 * ```tsx
 * <Box padding="$4" backgroundColor="$gray2">
 *   <Text>Content goes here</Text>
 * </Box>
 * ```
 * 
 * @example
 * Flex row layout:
 * ```tsx
 * <Box flexDirection="row" gap="$3" alignItems="center">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </Box>
 * ```
 * 
 * @example
 * Centered content:
 * ```tsx
 * <Box 
 *   flex={1} 
 *   alignItems="center" 
 *   justifyContent="center"
 * >
 *   <Text>Centered content</Text>
 * </Box>
 * ```
 * 
 * @example
 * Card-like container with border:
 * ```tsx
 * <Box 
 *   padding="$4" 
 *   borderWidth={2} 
 *   borderColor="$gray6"
 *   borderRadius="$4"
 *   backgroundColor="$background"
 * >
 *   <Text>Card content</Text>
 * </Box>
 * ```
 * 
 * @example
 * Responsive layout with media queries:
 * ```tsx
 * <Box 
 *   padding="$2"
 *   $gtSm={{ padding: "$4" }}
 *   $gtMd={{ padding: "$6" }}
 * >
 *   <Text>Responsive padding</Text>
 * </Box>
 * ```
 * 
 * @example
 * Grid-like layout:
 * ```tsx
 * <Box flexDirection="row" flexWrap="wrap" gap="$3">
 *   <Box width="48%"><Text>Item 1</Text></Box>
 *   <Box width="48%"><Text>Item 2</Text></Box>
 *   <Box width="48%"><Text>Item 3</Text></Box>
 *   <Box width="48%"><Text>Item 4</Text></Box>
 * </Box>
 * ```
 */
export const Box = styled(Stack, {
  name: 'Box',
  // No default styling - Box is a primitive that accepts any style
} as const)

export type BoxProps = GetProps<typeof Box>


