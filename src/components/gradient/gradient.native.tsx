import { LinearGradient } from "@tamagui/linear-gradient"
import { GetProps } from "tamagui"
import { useMemo } from "react"
import { angleToGradientPoints, type LinearGradientPoint } from "./utils/gradient-utils"
import {
  useGradientAnimation,
  useGradientDimensions,
  usePrefersReducedMotion,
} from "./hooks/gradient-hooks"

type BaseLinearGradientProps = GetProps<typeof LinearGradient>

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
 * - Animated rotating gradients for eye-catching effects
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
 * - Animated gradients automatically respect `prefers-reduced-motion` (web only)
 * 
 * **Performance note:**
 * - Gradients have rendering cost compared to solid colors
 * - Use solid backgrounds for list items or frequently repeated elements
 * - Limit gradient complexity (3-4 colors max recommended)
 * - Animated gradients continuously update - use sparingly for performance
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
 * 
 * @example
 * Animated rotating gradient:
 * ```tsx
 * <Gradient
 *   animated
 *   rotationDuration={3}
 *   initialAngle={45}
 *   p="$6"
 *   rounded="$4"
 *   items="center"
 *   justify="center"
 * >
 *   <Text color="white" fontSize="$6">Rotating gradient</Text>
 * </Gradient>
 * ```
 */
export type GradientProps = Omit<BaseLinearGradientProps, 'colors' | 'locations' | 'start' | 'end'> & GradientColorProps & {
  start?: LinearGradientPoint | null
  end?: LinearGradientPoint | null
  /**
   * Enable animated rotation of the gradient angle.
   * When true, the gradient angle continuously rotates.
   * @default false
   */
  animated?: boolean
  /**
   * Duration in seconds for a complete 360° rotation.
   * Lower values = faster rotation.
   * @default 5
   */
  rotationDuration?: number
  /**
   * Initial angle in degrees for the gradient when animation starts.
   * @default 0
   */
  initialAngle?: number
}

export const Gradient = ({
  colors = ["$purple11", "$pink7", "$red7"],
  start: propStart,
  end: propEnd,
  locations = [0, 0.5, 1],
  animated = false,
  rotationDuration = 5,
  initialAngle = 0,
  children,
  ...props
}: GradientProps) => {
  // Use shared hooks for common functionality
  const [dimensions, handleLayout] = useGradientDimensions(
    animated,
    typeof props.width === 'number' ? props.width : undefined,
    typeof props.height === 'number' ? props.height : undefined
  )
  const prefersReducedMotion = usePrefersReducedMotion()
  const angle = useGradientAnimation(
    animated,
    rotationDuration,
    initialAngle,
    dimensions,
    prefersReducedMotion
  )

  // Determine start and end points
  // When animated: convert angle to points (with aspect ratio normalization)
  // When not animated: use provided points or defaults
  const { start, end } = useMemo(() => {
    if (animated && dimensions?.width && dimensions?.height) {
      const points = angleToGradientPoints(angle, dimensions.width, dimensions.height)
      return { start: points.start, end: points.end }
    }

    const startPoint: LinearGradientPoint = propStart
      ? (Array.isArray(propStart) ? propStart : [propStart.x, propStart.y])
      : [0, 1]

    const endPoint: LinearGradientPoint = propEnd
      ? (Array.isArray(propEnd) ? propEnd : [propEnd.x, propEnd.y])
      : [1, 0]

    return { start: startPoint, end: endPoint }
  }, [animated, angle, dimensions, propStart, propEnd])

  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      locations={locations}
      onLayout={handleLayout}
      {...props}
    >
      {children}
    </LinearGradient>
  )
}

