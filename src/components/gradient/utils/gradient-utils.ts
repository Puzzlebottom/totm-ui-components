/**
 * Shared utilities for Gradient components (web and native)
 */

// Internal type for gradient direction points
export type LinearGradientPoint =
  | { x: number; y: number }
  | [x: number, y: number]

/**
 * Converts an angle in degrees to gradient start and end points.
 * 
 * The gradient line is normalized to maintain consistent visual properties
 * (like blended area width) across different component dimensions and rotation angles.
 * 
 * @param angleDegrees - The angle in degrees (0° = top to bottom, 90° = left to right)
 * @param width - Component width (optional, for aspect ratio normalization)
 * @param height - Component height (optional, for aspect ratio normalization)
 * @returns Normalized start and end points in [0, 1] coordinate space
 */
export function angleToGradientPoints(
  angleDegrees: number,
  width?: number,
  height?: number
): { start: [number, number]; end: [number, number] } {
  // Convert degrees to radians (optimized: pre-calculate PI/180)
  const angleRad = angleDegrees * 0.017453292519943295 // Math.PI / 180

  // Calculate unit vector components for the gradient direction
  const x = Math.sin(angleRad)
  const y = -Math.cos(angleRad)

  let normalizedX = x
  let normalizedY = y

  // Normalize based on aspect ratio to maintain consistent visual properties
  if (width && height && width > 0 && height > 0) {
    // Use the hypotenuse (diagonal) as reference for consistent blended area width
    const referenceDistance = Math.sqrt(width * width + height * height)

    // Calculate the pixel-space length of the unit vector
    const widthX = width * x
    const heightY = height * y
    const unitPixelDistance = Math.sqrt(widthX * widthX + heightY * heightY)

    if (unitPixelDistance > 0) {
      // Scale to normalize the gradient line length to the reference distance
      const scale = referenceDistance / unitPixelDistance
      normalizedX = x * scale
      normalizedY = y * scale
    }
  }

  // Create start and end points centered at (0.5, 0.5) with consistent length
  const length = 0.5
  const startX = 0.5 - normalizedX * length
  const startY = 0.5 - normalizedY * length
  const endX = 0.5 + normalizedX * length
  const endY = 0.5 + normalizedY * length

  return {
    start: [startX, startY],
    end: [endX, endY],
  }
}

/**
 * Calculates the visual speed multiplier for consistent rotation appearance.
 * 
 * The visual speed of rotation depends on how the gradient line sweeps across
 * the component. When perpendicular to the long side, the gradient appears to
 * move faster. This function adjusts the angular speed to maintain constant
 * visual speed.
 * 
 * @param angleDegrees - Current gradient angle in degrees
 * @param width - Component width
 * @param height - Component height
 * @returns Speed multiplier (typically 0.5 to 2.0)
 */
export function calculateVisualSpeedMultiplier(
  angleDegrees: number,
  width: number,
  height: number
): number {
  const angleRad = (angleDegrees * Math.PI) / 180
  const sinAngle = Math.sin(angleRad)
  const cosAngle = Math.cos(angleRad)

  // Visual speed is proportional to how "steep" the gradient line is
  // relative to the component's aspect ratio
  const widthSin = width * sinAngle
  const heightCos = height * cosAngle
  const currentVisualSpeed = Math.sqrt(widthSin * widthSin + heightCos * heightCos)

  // Reference visual speed (average across all angles)
  const widthSq = width * width
  const heightSq = height * height
  const referenceVisualSpeed = Math.sqrt((widthSq + heightSq) * 0.5)

  if (currentVisualSpeed > 0 && referenceVisualSpeed > 0) {
    const raw = currentVisualSpeed / referenceVisualSpeed
    // Square the ratio to exaggerate the speed adjustment
    return Math.pow(raw, 2)
  }

  return 0.5 // Default fallback
}

