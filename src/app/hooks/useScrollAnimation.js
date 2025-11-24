'use client'

import { useLenis } from '../contexts/LenisContext'
import { useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

/**
 * Hook to use Lenis scroll values with Framer Motion
 * Returns motion values that update based on Lenis scroll
 */
export const useScrollAnimation = () => {
  const { scrollY, scrollProgress, isReady } = useLenis()
  
  // Create motion values that will be updated by Lenis scroll
  const motionScrollY = useMotionValue(0)
  const motionScrollProgress = useMotionValue(0)

  // Update motion values when Lenis scroll changes
  useEffect(() => {
    if (isReady) {
      motionScrollY.set(scrollY)
      motionScrollProgress.set(scrollProgress)
    }
  }, [scrollY, scrollProgress, isReady, motionScrollY, motionScrollProgress])

  return {
    scrollY: motionScrollY,
    scrollProgress: motionScrollProgress,
    rawScrollY: scrollY,
    rawScrollProgress: scrollProgress,
    isReady,
  }
}

/**
 * Hook to create a scroll-based transform animation
 * @param {number} rangeStart - Start of scroll range
 * @param {number} rangeEnd - End of scroll range
 * @param {number[]} outputRange - Output values to map to
 * @param {string} clamp - 'clamp' to clamp values, or undefined
 */
export const useScrollTransform = (rangeStart, rangeEnd, outputRange, clamp = 'clamp') => {
  const { scrollProgress, scrollY, isReady } = useScrollAnimation()
  
  const transform = useTransform(
    scrollY,
    [rangeStart, rangeEnd],
    outputRange,
    clamp ? { clamp: true } : undefined
  )

  return { transform, isReady }
}









