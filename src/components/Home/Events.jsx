"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Events() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

        gsap.utils.toArray(".reveal-y").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top 85%",
              },
            }
          )
        })
      
        gsap.utils.toArray(".reveal-x").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: -100 },
            {
              xPercent: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top 85%",
              },
            }
          )
        })
      
        // Flicker / opacity settle — per article
        gsap.utils.toArray("article").forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          })
      
          tl.fromTo(
            card,
            { opacity: 0.3 },
            {
              opacity: 1,
              duration: 0.15,
              repeat: 4,
              yoyo: true,
              ease: "none",
            }
          ).to(card, {
            opacity: 1,
            duration: 0.3,
          })
        })
      
      }, sectionRef)
      
      return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#161616] text-[#fff] min-h-[50vh] pt-10 md:pt-25 px-[5vw] font-satoshi font-bold"
    >
      <div className="relative w-full">
        <div className="relative w-max flex flex-col">
                <div className="relative text-[3vh] font-poppins-regular w-max pb-1.5 tracking-tighter mb-10">
                    <span className="block overflow-hidden">
                    <span className="block reveal-y">EVENTS</span>
                    </span>

                    <span className="absolute block h-px w-full bottom-0 overflow-hidden">
                    <span className="block h-full w-full bg-white reveal-x" />
                    </span>
                </div>

                <div className="text-[6vw] md:text-[5vw] font-satoshi-semibold md:mx-15 flex md:flex-row flex-col md:justify-between justify-center w-full h-max">
                    <div className="relative">
                    <span className="block overflow-hidden">
                        <span className="block reveal-y">Thoughtfully curated events</span>
                    </span>
                    <span className="block text-blue-500 overflow-hidden">
                        <span className="block reveal-y">where students learn,</span>
                    </span>
                    <span className="block text-blue-500 overflow-hidden">
                        <span className="block reveal-y">build, and connect.</span>
                    </span>
                    </div>
                </div>
        </div>
        <div className="relative px-15 mt-15">
            <div className="flex flex-col items-center gap-8">
                {/* Event Card 1 - Envision */}
                <article className="relative w-[70%] rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[100px] max-h-[300px]">
                {/* Background image */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img 
                    className="w-full h-full object-cover" 
                    src="/assets/Home/events/envisionbg.png" 
                    alt="Envision Background" 
                    />
                </div>

                {/* Background pattern with stars */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-32 left-32 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-32 left-24 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 right-32 w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 md:p-6 flex flex-row items-center justify-center gap-8 h-full">
                    <img 
                    className="w-32 md:w-64 flex-shrink-0" 
                    src="/assets/Logos/envision_logo.png" 
                    alt="Envision Logo" 
                    />
                    <p className="text-white/90 text-lg md:text-xl font-satoshi text-left leading-relaxed">
                    Envision is our Tech Fest held once a year that brings together innovators, creators, and visionaries from across the tech community. Join us for an unforgettable experience filled with inspiring talks, and networking opportunities.
                    </p>
                </div>

                {/* Among3 overlay on left side */}
                <div className="absolute -right-8 md:-right-12 bottom-0 z-20 pointer-events-none">
                    <img 
                    src="/assets/Home/events/among.png" 
                    alt="Among3 decoration" 
                    className="w-16 md:w-24 h-auto scale-x-[-1]"
                    />
                </div>
                </article>

                {/* Event Card 2 - Moonshot */}
                <article className="relative w-[70%] rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[100px] max-h-[400px]">
                {/* Background image */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img 
                    className="w-full h-full object-cover" 
                    src="/assets/Home/events/hackvisionbg.png" 
                    alt="HackVision Background"
                    />
                </div>

                {/* Background pattern with stars */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-32 left-32 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-32 left-24 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 right-32 w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Computer decoration on left */}
                <div className="absolute left-0 bottom-6 -translate-x-1/4 z-20 pointer-events-none">
                    <img 
                    src="/assets/Home/events/computer.png" 
                    alt="Computer decoration" 
                    className="w-32 md:w-48 lg:w-44 h-auto animate-float"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 md:p-10 flex flex-col items-center justify-center">
                    {/* HackVision Logo - Centered and Big */}
                    <div className="mb-8 flex justify-center">
                    <img 
                        className="w-80 md:w-[65%] lg:w-[85%] h-auto" 
                        src="/assets/Logos/hackvision_logo.png" 
                        alt="HackVision Logo" 
                    />
                    </div>
                    
                    <div className="text-center">
                    {/* Calendar and Location in one line */}
                    <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                        <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white/90 font-medium font-satoshi uppercase">Coming Soon</span>
                        </div>

                        {/* Dot separator */}
                        <span className="text-white/80 text-lg">•</span>

                        <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-white/90 font-medium font-satoshi uppercase">At TSDC</span>
                        </div>
                    </div>

                    <p className="text-white/80 text-lg md:text-2xl font-satoshi uppercase leading-relaxed">
                    24 hours of coding, creativity, and chaos.
                    </p>
                    </div>
                </div>
                </article>
            </div>
        </div>
      </div>
    </section>
    )
}