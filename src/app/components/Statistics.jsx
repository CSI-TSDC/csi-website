'use client'

import { useEffect, useRef, useState } from 'react'

export default function Statistics() {
  const stats = [
    { label: 'Members', value: 50 },
    { label: 'Volunteers', value: 52},
    { label: 'Events', value: 5 },
    { label: 'Projects', value: 7 },
    { label: 'Teams', value: 6 },
    { label: 'Github Repos', value: 3 },
  ]

  // Initial rotation angles (in degrees) - will animate to 0
  const initialRotations = [3, -2, 1, -3, 2, -1]
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Start animation when section is 20% from bottom of viewport
      const triggerPoint = windowHeight * 0.8
      
      if (rect.top <= triggerPoint && rect.bottom >= 0) {
        setIsInView(true)
        
        // Calculate progress (0 to 1) based on scroll position
        const sectionStart = rect.top
        const sectionEnd = rect.bottom
        const viewportCenter = windowHeight * 0.5
        
        // Progress from when section enters trigger point to when it's centered
        const animationRange = windowHeight * 0.6 // 60% of viewport for animation
        const progress = Math.min(
          Math.max((triggerPoint - rect.top) / animationRange, 0),
          1
        )
        
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getCardPosition = (index) => {
    // Determine if card is in left, center, or right column (0, 1, 2)
    const column = index % 3
    
    // Calculate parallax X movement
    let parallaxX = 0
    if (column === 0) {
      // Left column: move from left (-50px) to center (0)
      parallaxX = -50 * (1 - scrollProgress)
    } else if (column === 2) {
      // Right column: move from right (50px) to center (0)
      parallaxX = 50 * (1 - scrollProgress)
    }
    // Center column (column === 1): no parallax movement
    
    return parallaxX
  }

  return (
    <section 
      ref={sectionRef}
      id="statistics" 
      className="w-full min-h-screen pt-16 md:pt-20 bg-white p-10 font-youth-bold"
    >
      <div id="stat-text" className="flex flex-col items-center justify-center w-full mb-12">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 pb-10">
          <span>IN NUMBERS</span>
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {stats.map((stat, index) => {
            const initialRotation = initialRotations[index]
            const currentRotation = initialRotation * (1 - scrollProgress)
            const parallaxX = getCardPosition(index)
            const translateY = isInView ? -80 * (1 - scrollProgress) : -80
            const opacity = isInView ? scrollProgress : 0
            
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="aspect-square w-full max-w-[280px] md:max-w-[300px] rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-8 md:p-10 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  opacity: opacity,
                  transform: `translateY(${translateY}px) translateX(${parallaxX}px) rotate(${currentRotation}deg)`,
                  transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                }}
              >
                <div className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg font-semibold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}