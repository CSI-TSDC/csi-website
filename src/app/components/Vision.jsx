'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const Vision = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      id="what-we-are"
      className="w-full min-h-screen px-6 md:px-12 pt-16 md:pt-24 pb-12 font-youth-bold"
    >
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
        <motion.video
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/assets/test.mp4"
        />

        <div
          className="relative z-10 flex h-full w-full items-center justify-center text-center px-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="space-y-4 text-black drop-shadow-2xl">
            <h2 className="text-lg md:text-2xl uppercase tracking-[0.4em]">
              Our Vision
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight leading-tight">
              <span className="block">BY THE STUDENTS</span>
              <span className="block">FOR THE STUDENTS</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
