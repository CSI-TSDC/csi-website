"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-line").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el.parentElement, // overflow-hidden wrapper
              start: "top 85%",
            },
          }
        )
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f8f8f8] text-[#222] h-screen mt-10 md:mt-30 px-[5vw] font-satoshi font-bold overflow-hidden"
    >
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/Home/test.mp4" type="video/mp4" />
      </video>

      {/* Overlay text */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-[#222]">
        <p className="text-[3vh] font-poppins-regular uppercase tracking-widest opacity-80">
          <span className="block overflow-hidden">
            <span className="reveal-line block">Our Vision</span>
          </span>
        </p>

        <h2 className="mt-5 text-[5vw] leading-snug font-bold flex flex-col justify-center">
          <span className="block overflow-hidden">
            <span className="reveal-line block">For the students,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-line block">by the students</span>
          </span>
        </h2>
      </div>
    </section>
  )
}