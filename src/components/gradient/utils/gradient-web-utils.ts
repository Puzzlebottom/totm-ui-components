/**
 * Web-specific utilities for Gradient component
 */

import type { GradientDimensions } from '../hooks/gradient-hooks'

/**
 * Calculates both CSS angle and stretch ratio from gradient points in a single pass.
 * 
 * This avoids redundant calculations since both need the same direction vector.
 * 
 * @param start - Normalized start point [x, y]
 * @param end - Normalized end point [x, y]
 * @param dimensions - Component dimensions
 * @returns Object with cssAngle and stretchRatio
 */
export function calculateGradientProperties(
  start: [number, number],
  end: [number, number],
  dimensions: GradientDimensions
): { cssAngle: number; stretchRatio: number } {
  const { width, height } = dimensions

  // Convert normalized coordinates to pixel coordinates (done once)
  const startX = start[0] * width
  const startY = start[1] * height
  const endX = end[0] * width
  const endY = end[1] * height

  // Calculate direction vector (used for both angle and stretch ratio)
  const dx = endX - startX
  const dy = endY - startY
  const angleRad = Math.atan2(-dy, dx)

  // Convert to CSS angle (CSS uses different convention: 0deg = upward)
  const angleDeg = (angleRad * 180) / Math.PI
  const cssAngle = 90 - angleDeg

  // Calculate stretch ratio to maintain consistent blended area width
  // The perpendicular to the gradient line is rotated 90°
  const perpAngleRad = angleRad + Math.PI / 2
  const perpCos = Math.abs(Math.cos(perpAngleRad))
  const perpSin = Math.abs(Math.sin(perpAngleRad))
  const perpendicularDistance = width * perpSin + height * perpCos

  // Target length is the hypotenuse (what CSS linear-gradient uses)
  const targetLength = Math.sqrt(width * width + height * height)
  const stretchRatio = targetLength / perpendicularDistance

  return { cssAngle, stretchRatio }
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

