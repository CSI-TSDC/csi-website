"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import TechWeek from "../ui/TechWeek"

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
      className="relative bg-[#161616] text-[#fff] min-h-[50vh] pt-12 sm:pt-16 md:pt-48 px-4 sm:px-6 md:px-[5vw] pb-16 sm:pb-20 md:pb-32 font-satoshi font-bold"
    >
      <div className="relative w-full">
        <div className="relative w-max flex flex-col">
                <div className="text-[5vw] sm:text-[5.5vw] md:text-[5vw] font-satoshi-semibold md:mx-15 flex md:flex-row flex-col md:justify-between justify-center w-full h-max gap-2 sm:gap-3">
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
        <div className="relative px-4 sm:px-8 md:px-15 mt-12 sm:mt-16 md:mt-20 lg:mt-28">
            <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                {/* Event Card 1 - Envision */}
                <article className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] rounded-2xl sm:rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[200px] sm:min-h-[150px] md:min-h-[100px] max-h-[400px] sm:max-h-[350px] md:max-h-[300px]">
                {/* Background image */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img 
                    className="w-full h-full object-cover" 
                    src="/assets/Home/events/envisionbg.png" 
                    alt="Envision Background" 
                    />
                </div>

                {/* Background pattern with stars */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                    <div className="absolute top-16 left-16 sm:top-32 sm:left-32 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-16 left-12 sm:bottom-32 sm:left-24 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-16 sm:bottom-20 sm:right-32 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-12 h-full">
                    <img 
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 flex-shrink-0 object-contain" 
                    src="/assets/Logos/envision_logo.png" 
                    alt="Envision Logo" 
                    />
                    <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl font-poppins-medium text-center sm:text-left leading-relaxed">
                    Envision is our Tech Fest held once a year that brings together innovators, creators, and visionaries from across the tech community. Join us for an unforgettable experience filled with inspiring talks, and networking opportunities.
                    </p>
                </div>

                {/* Among3 overlay on left side */}
                <div className="absolute -right-4 sm:-right-6 md:-right-8 lg:-right-12 bottom-0 z-20 pointer-events-none hidden sm:block">
                    <img 
                    src="/assets/Home/events/among.png" 
                    alt="Among3 decoration" 
                    className="w-12 sm:w-16 md:w-20 lg:w-24 h-auto scale-x-[-1]"
                    />
                </div>
                </article>

                {/* Event Card 2 - HackVision */}
                <article className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] rounded-2xl sm:rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[300px] sm:min-h-[250px] md:min-h-[200px] max-h-[500px] sm:max-h-[450px] md:max-h-[400px]">
                {/* Background image */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img 
                    className="w-full h-full object-cover" 
                    src="/assets/Home/events/hackvisionbg.png" 
                    alt="HackVision Background"
                    />
                </div>

                {/* Background pattern with stars */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                    <div className="absolute top-16 left-16 sm:top-32 sm:left-32 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-16 left-12 sm:bottom-32 sm:left-24 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-16 sm:bottom-20 sm:right-32 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                </div>

                {/* Computer decoration on left */}
                <div className="absolute left-0 bottom-4 sm:bottom-6 -translate-x-1/3 sm:-translate-x-1/4 z-20 pointer-events-none hidden sm:block">
                    <img 
                    src="/assets/Home/events/computer.png" 
                    alt="Computer decoration" 
                    className="w-24 sm:w-32 md:w-40 lg:w-44 h-auto animate-float"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center">
                    {/* HackVision Logo - Centered and Big */}
                    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex justify-center">
                    <img 
                        className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:w-[65%] xl:w-[85%] h-auto" 
                        src="/assets/Logos/hackvision_logo.png" 
                        alt="HackVision Logo" 
                    />
                    </div>
                    
                    <div className="text-center px-2 sm:px-0">
                    {/* Calendar and Location in one line */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 flex-wrap">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white/90 font-medium font-satoshi uppercase text-xs sm:text-sm md:text-base">Coming Soon</span>
                        </div>

                        {/* Dot separator */}
                        <span className="text-white/80 text-sm sm:text-base md:text-lg">•</span>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-white/90 font-medium font-satoshi uppercase text-xs sm:text-sm md:text-base">At TSDC</span>
                        </div>
                    </div>

                    <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-satoshi uppercase leading-relaxed px-2">
                    24 hours of coding, creativity, and chaos.
                    </p>
                    </div>
                </div>
                </article>

                {/* Event Card 3 - Tea Tech Talks */}
                <article className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] rounded-2xl sm:rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300">
                  
                  {/* Background image */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="/assets/Home/events/teatechtalkbg.png"
                      alt="Tea Tech Talks Background"
                    />
                  </div>

                  {/* Stars */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute top-24 left-28 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute top-12 right-20 w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="absolute bottom-28 left-20 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute bottom-16 right-32 w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Content — same layout as card 1 */}
                  <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">

                    {/* Logo */}
                    <img
                      className="w-24 sm:w-32 md:w-44 lg:w-52 flex-shrink-0 object-contain"
                      src="/assets/Logos/teatechtalk_logo.svg"
                      alt="Tea Tech Talks Logo"
                    />

                    {/* Text */}
                    <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl font-poppins-regular text-left leading-relaxed">
                      A student-led coding session held every working Saturday where students teach students. It&apos;s a casual,
                      interactive, and fun space to learn, build, and explore tech together — no faculty, no pressure,
                      just hands-on learning.
                    </p>

                  </div>

                  {/* Sticker */}
                  <div className="absolute -right-8 md:-right-10 -translate-y-4 top-0 z-20 pointer-events-none hidden sm:block">
                    <img
                      src="/assets/Home/events/sticker1.png"
                      alt="Decoration"
                      className="w-40 rotate-8"
                    />
                  </div>
                </article>

                {/* Event Card 4 - SIH */}
                <article className="relative text-black w-full sm:w-[85%] md:w-[75%] lg:w-[70%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                  
                  {/* Background image */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="/assets/Home/events/SIHbg.png"
                      alt="Smart India Hackathon Background"
                    />
                  </div>

                  {/* Stars */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute top-24 left-28 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute top-12 right-20 w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="absolute bottom-28 left-20 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute bottom-16 right-32 w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Content — same layout as card 1 */}
                  <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">

                    <div className="flex flex-col w-2/3">
                      <div className="">
                        <div className="flex items-center">
                          <img src="/assets/Home/events/SIH_logo.png" alt="SIH logo" className="w-16 h-auto mr-4 mb-4 object-contain" />
                          <span className="block text-xl">
                            <span>SMART INDIA HACKATHON</span>
                          </span>
                        </div>
                        <div>

                        </div>
                      </div>
                      <div className="flex-1">
                            {/* Text */}
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-poppins-regular text-left leading-relaxed">
                          Smart India Hackathon is a nationwide innovation challenge where students team up to solve real-world problems using technology and creativity. It&apos;s a high-energy platform that sparks out-of-the-box thinking, teamwork, and practical problem-solving.
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-1/3">
                      <img src="/assets/Home/events/SIHoverlay.png" alt="SIH Picture" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </article>
            </div>
        </div>
      </div>
    </section>
    )
}