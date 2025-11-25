# Lenis + Framer Motion Scroll Integration

## How to Use Scroll Values in Components

### Option 1: Using `useScroll` from Framer Motion (Recommended)

```jsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function MyComponent() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Transform scroll progress to any value
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <div ref={ref}>
      <motion.div style={{ y, opacity }}>
        Content that moves based on scroll
      </motion.div>
    </div>
  )
}
```

### Option 2: Using `useScrollAnimation` Hook

```jsx
'use client'
import { motion, useTransform } from 'framer-motion'
import { useScrollAnimation } from '@/app/hooks/useScrollAnimation'

export default function MyComponent() {
  const { scrollY, scrollProgress, isReady } = useScrollAnimation()

  // Use with useTransform for animations
  const y = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <motion.div style={{ y }}>
      Content animated by global scroll
    </motion.div>
  )
}
```

### Option 3: Using Raw Scroll Values from Context

```jsx
'use client'
import { useLenis } from '@/app/contexts/LenisContext'

export default function MyComponent() {
  const { scrollY, scrollProgress } = useLenis()

  // Use for calculations or conditional rendering
  const isScrolled = scrollY > 500

  return (
    <div className={isScrolled ? 'scrolled' : ''}>
      Scroll position: {scrollY}
    </div>
  )
}
```

### Option 4: Opposite Scrolling Effect (Parallax)

```jsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ParallaxComponent() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Element moves down as you scroll
  const downMovement = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  
  // Element moves up as you scroll (opposite)
  const upMovement = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <section ref={sectionRef} className="min-h-screen">
      <motion.div style={{ y: downMovement }}>
        Moves down
      </motion.div>
      <motion.div style={{ y: upMovement }}>
        Moves up (opposite)
      </motion.div>
    </section>
  )
}
```












