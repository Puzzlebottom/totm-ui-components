import { LinearGradient } from "@tamagui/linear-gradient"
import { GetProps, Stack } from "tamagui"

type BaseLinearGradientProps = GetProps<typeof LinearGradient>

// Internal type for gradient direction points
// Users can pass { x: number, y: number } or [number, number] directly
type LinearGradientPoint =
  | { x: number; y: number }
  | [x: number, y: number]

// Helper type: if colors is provided, locations must be provided (and vice versa)
type GradientColorProps =
  | { colors?: never; locations?: never } // Neither provided - use defaults
  | { colors: BaseLinearGradientProps['colors']; locations: BaseLinearGradientProps['locations'] } // Both provided

/**
 * Gradient creates a linear gradient background using Tamagui's LinearGradient.
 * 
 * @remarks
 * Use Gradient as a versatile background layer for containers, cards, or buttons.
 * This is a lower-level primitive component - consider using GradientText or
 * GradientBorderView for specific use cases with better ergonomics.
 * 
 * **When to use:**
 * - Custom gradient backgrounds for containers or cards
 * - Button backgrounds with dynamic gradient colors
 * - Hero sections or featured content backgrounds
 * - Creating custom gradient-based components
 * - When you need full control over gradient properties
 * 
 * **When NOT to use:**
 * - Text gradients - use `GradientText` for better text handling
 * - Border gradients - use `GradientBorderView` for proper border effects
 * - Repeated backgrounds in lists - use solid colors for performance
 * - Subtle backgrounds - gradients draw attention, use sparingly
 * 
 * **Accessibility:**
 * - Ensure sufficient contrast between gradient and overlaid text
 * - Test text readability at all gradient color stops
 * - Darker gradients work better with light text
 * - Lighter gradients work better with dark text
 * 
 * **Performance note:**
 * - Gradients have rendering cost compared to solid colors
 * - Use solid backgrounds for list items or frequently repeated elements
 * - Limit gradient complexity (3-4 colors max recommended)
 * 
 * @example
 * Basic gradient background:
 * ```tsx
 * <Gradient p="$4" rounded="$4" items="center" justify="center">
 *   <Text color="white">Content with gradient background</Text>
 * </Gradient>
 * ```
 * 
 * @example
 * Header layout with gradient:
 * ```tsx
 * <Gradient p="$4" flexDirection="row" justify="space-between" items="center">
 *   <Text color="white" fontSize="$8" fontWeight="bold">TOTM</Text>
 *   <Button variant="secondary">Sign Out</Button>
 * </Gradient>
 * ```
 * 
 * @example
 * Custom colors and direction:
 * ```tsx
 * <Gradient
 *   colors={['$blue10', '$purple10']}
 *   locations={[0, 1]}
 *   start={[0, 0]}
 *   end={[1, 1]}
 *   p="$6"
 *   rounded="$4"
 *   items="center"
 *   justify="center"
 * >
 *   <Text color="white" fontSize="$6">Diagonal gradient</Text>
 * </Gradient>
 * ```
 */
export type GradientProps = Omit<BaseLinearGradientProps, 'colors' | 'locations' | 'start' | 'end'> & GradientColorProps & {
  start?: LinearGradientPoint | null
  end?: LinearGradientPoint | null
}

export const Gradient = ({ colors = ["$purple11", "$pink7", "$red7"], start = [0, 1], end = [1, 0], locations = [0, 0.5, 1], children, ...props }: GradientProps) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      locations={locations}
      {...props}
    >
      {children}
    </LinearGradient>
  )
}
