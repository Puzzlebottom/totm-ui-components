import { Stack, styled, GetProps } from 'tamagui'

/**
 * Card component - Container for grouped, related content with consistent styling.
 * 
 * @remarks
 * Use Card to group related information into a visually distinct, elevated container.
 * Cards provide consistent padding, borders, and optional shadows to create clear
 * content boundaries and visual hierarchy.
 * 
 * **When to use:**
 * - Grouping related content (user profiles, product items, posts)
 * - List items that need clear visual separation
 * - Dashboard widgets and summaries
 * - Content previews with images and text
 * - Interactive containers that can be tapped/clicked
 * 
 * **When NOT to use:**
 * - Simple dividers - use `Divider` or `Box` with borders
 * - Full-screen layouts - use `Box` for more flexibility
 * - Buttons - use `Button` component for actions
 * - Inline content without visual separation - use `Box`
 * 
 * **Visual hierarchy:**
 * - Default: Subtle border, no shadow (flat design)
 * - Elevated: Border + shadow/elevation for prominence
 * - Interactive: Use with hover/press states for tappable cards
 * 
 * **Accessibility:**
 * - Use semantic HTML roles when appropriate (article, section)
 * - Ensure sufficient color contrast for borders
 * - Add press handlers for interactive cards
 * - Include accessible labels for screen readers
 * 
 * **Performance:**
 * - Lightweight wrapper around Tamagui Stack
 * - Shadows may impact performance on lower-end devices
 * - Use sparingly in long lists (consider virtualization)
 * 
 * @example
 * Basic card:
 * ```tsx
 * <Card>
 *   <Text fontWeight="bold">Card Title</Text>
 *   <Text>Card content goes here</Text>
 * </Card>
 * ```
 * 
 * @example
 * Elevated card with shadow:
 * ```tsx
 * <Card variant="elevated">
 *   <Text fontWeight="bold">Featured Content</Text>
 *   <Text>This card stands out with elevation</Text>
 * </Card>
 * ```
 * 
 * @example
 * Interactive card (clickable):
 * ```tsx
 * <Card 
 *   variant="elevated"
 *   pressStyle={{ scale: 0.98 }}
 *   onPress={() => console.log('Card tapped')}
 * >
 *   <Text fontWeight="bold">Tap me</Text>
 *   <Text>This card is interactive</Text>
 * </Card>
 * ```
 * 
 * @example
 * Card with custom padding:
 * ```tsx
 * <Card padding="$6">
 *   <Text>More spacious card</Text>
 * </Card>
 * ```
 * 
 * @example
 * Profile card example:
 * ```tsx
 * <Card gap="$3">
 *   <Box 
 *     width={60} 
 *     height={60} 
 *     borderRadius={30} 
 *     backgroundColor="$purple9" 
 *   />
 *   <Box gap="$1">
 *     <Text fontWeight="bold" fontSize="$5">John Doe</Text>
 *     <Text color="$gray11">Software Engineer</Text>
 *   </Box>
 * </Card>
 * ```
 * 
 * @example
 * Card in a list:
 * ```tsx
 * <Box gap="$3">
 *   {items.map(item => (
 *     <Card key={item.id} onPress={() => handleSelect(item)}>
 *       <Text fontWeight="bold">{item.title}</Text>
 *       <Text>{item.description}</Text>
 *     </Card>
 *   ))}
 * </Box>
 * ```
 */
export const Card = styled(Stack, {
  name: 'Card',

  // Default card styling
  p: '$4',
  rounded: '$4',
  borderWidth: 2,
  borderColor: '$gray6',
  bg: '$background',
  gap: '$2',

  variants: {
    variant: {
      default: {
        // Flat card with border only
      },
      elevated: {
        // Card with shadow/elevation
        // Tamagui automatically converts these shadow props to CSS boxShadow on web
        // and uses native shadow rendering on iOS/Android
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 2 } as any,
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevationAndroid: 15,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
} as const)

export type CardProps = GetProps<typeof Card>

