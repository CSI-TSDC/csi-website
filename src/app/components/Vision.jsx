'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Vision() {
  const textRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!textRef.current || !videoRef.current) return

    // initial states
    // gsap.set(textRef.current, { opacity: 1, scale: 1, color: '#000000' })
    // gsap.set(videoRef.current, { opacity: 0, scale: 1 })
  }, [])

  const handleMouseEnter = () => {
    if (!textRef.current || !videoRef.current) return

    // Change text color to white on hover
    gsap.to(textRef.current, {
      color: '#ffffff',
      duration: 0.3,
      ease: 'power2.out',
    })

    // Fade in video behind text
    gsap.to(videoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!textRef.current || !videoRef.current) return

    // Fade out video
    gsap.to(videoRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Change text color back to black
    gsap.to(textRef.current, {
      color: '#000000',
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  return (
    <section
      id="what-we-are"
      className="w-full min-h-screen px-6 md:px-12 py-12 font-youth-bold flex flex-col items-center vision-bg"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-7xl font-bold">Our <span className='text-[#EF4444]'>Vision..</span></h2>
      </div>


      <div
        className="relative max-w-7xl w-full aspect-[16/9] flex items-center justify-center rounded-3xl overflow-hidden cursor-pointer"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >

        <p
          ref={el => (textRef.current = el)} 
          className="text-3xl md:text-9xl text-center uppercase tracking-tighter z-20 pointer-events-none relative text-white"
        >
          FOR THE STUDENTS,
          <br />
          BY THE STUDENTS
        </p>

        <video
          ref={el => (videoRef.current = el)} 
          className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl brightness-50"
          autoPlay
          muted
          loop
          playsInline
          src="/assets/test.mp4"
        />
      </div>
    </section>
  )
}
