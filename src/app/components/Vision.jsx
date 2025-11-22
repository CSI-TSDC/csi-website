'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Vision = () => {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.2'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.7, 0.7, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.6, 0.6, 1])

  return (
    <section
      id="what-we-are"
      ref={sectionRef}
      className="w-full min-h-screen px-6 md:px-12 pt-16 md:pt-24 pb-12 font-youth-bold"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl md:text-7xl font-bold mb-4">
          Our Vision
        </h2>
        <p className="text-center text-xl md:text-3xl text-neutral-500 uppercase tracking-[0.2em] mb-10">
          For The Students, By The Students
        </p>
      </div>

      <motion.video
        style={{ scale, opacity }}
        className="w-full aspect-[16/9] object-cover rounded-3xl shadow-2xl"
        autoPlay
        muted
        loop
        playsInline
        src="/assets/test.mp4"
      />
    </section>
  )
}

export default Vision
