'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'

const LenisContext = createContext(null)

export const useLenis = () => {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used within LenisProvider')
  }
  return context
}

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 0.8,
    })

    lenisRef.current = lenis

    // RAF loop - updates scroll and triggers state updates
    function raf(time) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
      
      // Update scroll values for context
      const currentScroll = lenis.scroll
      const currentProgress = lenis.progress
      
      setScrollY(currentScroll)
      setScrollProgress(currentProgress)
    }
    
    rafRef.current = requestAnimationFrame(raf)
    setIsReady(true)

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
    }
  }, [])

  const value = {
    lenis: lenisRef.current,
    scrollY,
    scrollProgress,
    isReady,
  }

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  )
}

