/**
 * Web-specific utilities for Gradient component
 */

import type { GradientDimensions } from './gradient-hooks'

/**
 * Converts normalized start/end points to CSS angle for linear-gradient.
 * 
 * CSS linear-gradient uses an angle in degrees where:
 * - 0deg = upward (to top)
 * - 90deg = rightward (to right)
 * - 180deg = downward (to bottom)
 * - 270deg = leftward (to left)
 */
export function pointsToCSSAngle(
  start: [number, number],
  end: [number, number],
  width: number,
  height: number
): number {
  // Convert normalized coordinates to pixel coordinates
  const startX = start[0] * width
  const startY = start[1] * height
  const endX = end[0] * width
  const endY = end[1] * height

  // Calculate direction vector
  const dx = endX - startX
  const dy = endY - startY

  // Convert to CSS angle (CSS uses different convention than our angle system)
  const angleRad = Math.atan2(-dy, dx)
  const angleDeg = (angleRad * 180) / Math.PI
  const cssAngle = 90 - angleDeg

  return cssAngle
}

/**
 * Calculates the stretch ratio needed to maintain consistent blended area width.
 * 
 * CSS linear-gradient always uses the full diagonal (hypotenuse) as its gradient line.
 * To keep the visual blended area width constant as the gradient rotates, we need
 * to stretch the color stops based on the perpendicular distance.
 * 
 * The blended area width is inversely proportional to the perpendicular distance:
 * - When perpendicular distance is large → blended area is wide → less stretch needed
 * - When perpendicular distance is small → blended area is narrow → more stretch needed
 * 
 * @param start - Normalized start point [x, y]
 * @param end - Normalized end point [x, y]
 * @param dimensions - Component dimensions
 * @returns Stretch ratio (>= 1, typically 1.0 to 2.0)
 */
export function calculateStretchRatio(
  start: [number, number],
  end: [number, number],
  dimensions: GradientDimensions
): number {
  const { width, height } = dimensions

  // Convert normalized points to pixel coordinates
  const startX = start[0] * width
  const startY = start[1] * height
  const endX = end[0] * width
  const endY = end[1] * height

  // Calculate gradient line angle
  const dx = endX - startX
  const dy = endY - startY
  const angleRad = Math.atan2(-dy, dx)

  // Calculate perpendicular distance: the distance across the component
  // perpendicular to the gradient line
  const perpAngleRad = angleRad + Math.PI / 2
  const perpCos = Math.abs(Math.cos(perpAngleRad))
  const perpSin = Math.abs(Math.sin(perpAngleRad))
  const perpendicularDistance = width * perpSin + height * perpCos

  // Target length is the hypotenuse (longest possible line in the rectangle)
  // This is what CSS linear-gradient uses as its gradient line length
  const targetLength = Math.sqrt(width * width + height * height)

  // Stretch ratio to keep blended width constant at the hypotenuse level
  // The blended area width should be proportional to targetLength, not perpendicularDistance
  // To achieve this: stretchRatio = targetLength / perpendicularDistance
  // This ensures the blended width is constant and matches the hypotenuse scale
  return targetLength / perpendicularDistance
}

/**
 * Resolves color tokens (e.g., "$purple11") to actual color values.
 * 
 * @param color - Color string (token starting with $ or actual color value)
 * @param theme - Tamagui theme object
 * @returns Resolved color value
 */
export function resolveGradientColor(
  color: string,
  theme: Record<string, any>
): string {
  if (typeof color !== 'string') {
    console.warn('Gradient: Invalid color value:', color)
    return '#000000'
  }

  if (color.startsWith('$')) {
    const tokenName = color.slice(1)
    const resolved = theme[tokenName]?.get()
    if (!resolved) {
      console.warn(`Gradient: Color token "${color}" not found in theme`)
      return color
    }
    return resolved
  }

  return color
}

/**
 * Creates a CSS linear-gradient string with stretched color stops.
 * 
 * The color stops are stretched beyond 0% and 100% to maintain consistent
 * blended area width as the gradient rotates.
 * 
 * @param cssAngle - CSS angle in degrees
 * @param colors - Array of resolved color values
 * @param locations - Array of color stop locations (0 to 1)
 * @param stretchRatio - Ratio to stretch the color stops (>= 1)
 * @returns CSS linear-gradient string
 */
export function createCSSGradient(
  cssAngle: number,
  colors: string[],
  locations: number[],
  stretchRatio: number
): string {
  // Create color stops with stretching applied
  // Stretch the stops by mapping from [0, 1] to a wider range based on stretchRatio
  // When stretchRatio > 1, we need to extend stops beyond 0% and 100%
  const colorStops = colors
    .map((color, i) => {
      const baseLocation = locations && locations[i] !== undefined
        ? locations[i]
        : i / Math.max(1, colors.length - 1)

      // Stretch the location: map from [0, 1] to [offset, offset + span]
      // where span = 100 * stretchRatio, and offset centers it
      const span = 100 * stretchRatio
      const offset = (100 - span) / 2
      const stretchedLocation = offset + baseLocation * span

      return `${color} ${stretchedLocation}%`
    })
    .join(', ')

  return `linear-gradient(${cssAngle}deg, ${colorStops})`
}

