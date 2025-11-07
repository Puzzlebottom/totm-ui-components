import { GetProps, Stack, useTheme } from "tamagui"
import { useMemo } from "react"
import { angleToGradientPoints, type LinearGradientPoint } from "./gradient-utils"
import {
  useGradientAnimation,
  useGradientDimensions,
  usePrefersReducedMotion,
} from "./gradient-hooks"
import {
  calculateStretchRatio,
  createCSSGradient,
  pointsToCSSAngle,
  resolveGradientColor,
} from "./gradient-web-utils"

type BaseStackProps = GetProps<typeof Stack>

// Helper type: if colors is provided, locations must be provided (and vice versa)
type GradientColorProps =
  | { colors?: never; locations?: never }
  | { colors: string[]; locations: number[] }

/**
 * Gradient creates a linear gradient background using pure CSS on web.
 * 
 * @remarks
 * This is the web implementation that matches the native version's behavior.
 * It uses CSS linear-gradient with the same start/end point calculations.
 */
export type GradientProps = Omit<BaseStackProps, 'colors' | 'locations' | 'start' | 'end'> &
  GradientColorProps & {
    start?: LinearGradientPoint | null
    end?: LinearGradientPoint | null
    animated?: boolean
    rotationDuration?: number
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
  const theme = useTheme()

  // Use shared hooks for common functionality
  const [dimensions, handleLayout] = useGradientDimensions(
    animated,
    typeof props.width === 'number' ? props.width : undefined,
    typeof props.height === 'number' ? props.height : undefined
  )
  const prefersReducedMotionRef = usePrefersReducedMotion()
  const angle = useGradientAnimation(
    animated,
    rotationDuration,
    initialAngle,
    dimensions,
    prefersReducedMotionRef.current
  )

  // Resolve color tokens to actual values
  const resolvedColors = useMemo(() => {
    const resolved = (colors || []).map((color) =>
      resolveGradientColor(color, theme)
    )

    if (resolved.length === 0) {
      console.warn('Gradient: No colors provided, using fallback')
      return ['#000000', '#ffffff']
    }

    return resolved
  }, [colors, theme])

  // Calculate gradient points from angle (when animated) or use provided points
  const gradientPoints = useMemo(() => {
    if (animated) {
      return angleToGradientPoints(angle, dimensions?.width, dimensions?.height)
    }
    return null
  }, [animated, angle, dimensions])

  // Determine start and end points
  const start: [number, number] = useMemo(() => {
    if (animated && gradientPoints) {
      return gradientPoints.start
    }
    if (propStart) {
      return Array.isArray(propStart) ? propStart : [propStart.x, propStart.y]
    }
    return [0, 1]
  }, [animated, gradientPoints, propStart])

  const end: [number, number] = useMemo(() => {
    if (animated && gradientPoints) {
      return gradientPoints.end
    }
    if (propEnd) {
      return Array.isArray(propEnd) ? propEnd : [propEnd.x, propEnd.y]
    }
    return [1, 0]
  }, [animated, gradientPoints, propEnd])

  // Calculate CSS gradient with adjusted color stops for consistent blended area
  const cssGradient = useMemo(() => {
    if (!resolvedColors || resolvedColors.length === 0) {
      console.warn('Gradient: No resolved colors available')
      return 'linear-gradient(45deg, #000000, #ffffff)'
    }

    // Convert start/end points to CSS angle
    let cssAngle = 45 // fallback
    if (dimensions?.width && dimensions?.height) {
      cssAngle = pointsToCSSAngle(start, end, dimensions.width, dimensions.height)
    } else if (animated) {
      cssAngle = angle
    }

    // Calculate stretch ratio to maintain consistent blended area width
    const stretchRatio = dimensions
      ? calculateStretchRatio(start, end, dimensions)
      : 1

    return createCSSGradient(cssAngle, resolvedColors, locations, stretchRatio)
  }, [start, end, dimensions, resolvedColors, locations, animated, angle])

  return (
    <Stack
      {...props}
      onLayout={handleLayout}
      style={[
        props.style,
        {
          // @ts-ignore - backgroundImage is a valid web CSS property
          backgroundImage: cssGradient,
        } as any,
      ]}
    >
      {children}
    </Stack>
  )
}
