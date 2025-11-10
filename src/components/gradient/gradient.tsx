import { GetProps, Stack, useTheme } from "tamagui"
import { useMemo } from "react"
import { angleToGradientPoints, type LinearGradientPoint } from "./utils/gradient-utils"
import {
  useGradientAnimation,
  useGradientDimensions,
  usePrefersReducedMotion,
} from "./hooks/gradient-hooks"
import {
  calculateGradientProperties,
  createCSSGradient,
  resolveGradientColor,
} from "./utils/gradient-web-utils"

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
  const prefersReducedMotion = usePrefersReducedMotion()
  const angle = useGradientAnimation(
    animated,
    rotationDuration,
    initialAngle,
    dimensions,
    prefersReducedMotion
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

  // Determine start and end points
  // When animated: convert angle to points (with aspect ratio normalization)
  // When not animated: use provided points or defaults
  const { start, end } = useMemo(() => {
    if (animated && dimensions?.width && dimensions?.height) {
      const points = angleToGradientPoints(angle, dimensions.width, dimensions.height)
      return { start: points.start, end: points.end }
    }

    const startPoint: [number, number] = propStart
      ? Array.isArray(propStart) ? propStart : [propStart.x, propStart.y]
      : [0, 1]

    const endPoint: [number, number] = propEnd
      ? Array.isArray(propEnd) ? propEnd : [propEnd.x, propEnd.y]
      : [1, 0]

    return { start: startPoint, end: endPoint }
  }, [animated, angle, dimensions, propStart, propEnd])

  // Calculate CSS gradient with adjusted color stops for consistent blended area
  const cssGradient = useMemo(() => {
    if (!resolvedColors || resolvedColors.length === 0) {
      console.warn('Gradient: No resolved colors available')
      return 'linear-gradient(45deg, #000000, #ffffff)'
    }

    // Calculate both CSS angle and stretch ratio in one pass (avoids redundant calculations)
    let cssAngle = 45 // fallback
    let stretchRatio = 1
    if (dimensions?.width && dimensions?.height) {
      const props = calculateGradientProperties(start, end, dimensions)
      cssAngle = props.cssAngle
      stretchRatio = props.stretchRatio
    }

    return createCSSGradient(cssAngle, resolvedColors, locations, stretchRatio)
  }, [start, end, dimensions, resolvedColors, locations])

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
