/**
 * Shared React hooks for Gradient components
 */

import { useEffect, useRef, useState } from 'react'
import { calculateVisualSpeedMultiplier } from '../utils/gradient-utils'
import { useMedia } from 'tamagui'

export interface GradientDimensions {
  width: number
  height: number
}

/**
 * Hook to manage component dimensions from props or layout measurement.
 * 
 * When animated, dimensions are needed for aspect ratio normalization.
 * Dimensions can come from:
 * 1. Width/height props (if provided and valid)
 * 2. onLayout event (measured at runtime)
 */
export function useGradientDimensions(
  animated: boolean,
  widthProp?: number | string,
  heightProp?: number | string
): [GradientDimensions | null, (event: any) => void] {
  const [dimensions, setDimensions] = useState<GradientDimensions | null>(null)

  // Use width/height props if available (for animated gradients)
  useEffect(() => {
    if (animated && widthProp && heightProp) {
      const width = typeof widthProp === 'number' ? widthProp : undefined
      const height = typeof heightProp === 'number' ? heightProp : undefined
      if (width && height && width > 0 && height > 0) {
        setDimensions({ width, height })
      }
    }
  }, [animated, widthProp, heightProp])

  // Handle layout measurement (works on both web and native)
  const handleLayout = (event: any) => {
    if (event?.nativeEvent?.layout) {
      const { width, height } = event.nativeEvent.layout
      if (width > 0 && height > 0) {
        setDimensions((prev) => {
          // Only update if dimensions actually changed to avoid unnecessary re-renders
          if (prev?.width === width && prev?.height === height) {
            return prev
          }
          return { width, height }
        })
      }
    }
  }

  return [dimensions, handleLayout]
}

/**
 * Hook to check for prefers-reduced-motion preference using Tamagui's media system.
 * 
 * Returns a boolean indicating if reduced motion is preferred.
 * On React Native, this will be false and animation will proceed normally.
 * 
 * Uses Tamagui's built-in `useMedia` hook which automatically handles
 * the `reduceMotion` media query defined in the Tamagui config.
 */
export function usePrefersReducedMotion(): boolean {
  const media = useMedia()
  return media.reduceMotion ?? false
}

/**
 * Hook to manage animated gradient rotation with consistent visual speed.
 * 
 * The animation adjusts angular speed based on the gradient's current angle
 * and component dimensions to maintain constant visual rotation speed.
 */
export function useGradientAnimation(
  animated: boolean,
  rotationDuration: number,
  initialAngle: number,
  dimensions: GradientDimensions | null,
  prefersReducedMotion: boolean
): number {
  const [angle, setAngle] = useState(initialAngle)
  const animationFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (prefersReducedMotion) {
      return
    }

    if (!animated) {
      // Clean up if animation is disabled
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      lastTimeRef.current = null
      return
    }

    // Reset angle to initial when animation starts or initialAngle changes
    setAngle(initialAngle)

    // Calculate base degrees per second from rotation duration
    const baseDegreesPerSecond = 360 / rotationDuration

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime
      }

      const deltaTime = currentTime - lastTimeRef.current

      setAngle((prevAngle) => {
        // Calculate speed multiplier for consistent visual rotation
        let speedMultiplier = 0.5 // Default fallback
        if (dimensions?.width && dimensions?.height) {
          speedMultiplier = calculateVisualSpeedMultiplier(
            prevAngle,
            dimensions.width,
            dimensions.height
          )
        }

        const deltaAngle = baseDegreesPerSecond * speedMultiplier * deltaTime * 0.001
        const newAngle = prevAngle + deltaAngle
        // Normalize to [0, 360)
        const normalized = newAngle % 360
        return normalized < 0 ? normalized + 360 : normalized
      })

      lastTimeRef.current = currentTime
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      lastTimeRef.current = null
    }
  }, [animated, rotationDuration, initialAngle, dimensions, prefersReducedMotion])

  return angle
}


