"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import EventCards from "./EventCards"

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
      
        gsap.utils.toArray("article").forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
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
            duration: 0.2,
          })
        })
      
      }, sectionRef)
      
      return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#161616] text-white min-h-[50vh] pt-12 sm:pt-16 md:pt-48 px-4 sm:px-6 md:px-[5vw] pb-16 sm:pb-20 md:pb-32 font-bespoke-sans font-bold"
    >
      <div className="relative w-full">
        <div className="relative w-max flex flex-col mb-28">
                <div className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-snug font-bespoke-sans-semibold md:mx-15 flex md:flex-row flex-col md:justify-between justify-center w-full h-max gap-2 sm:gap-3">
                    <div className="relative">
                    <span className="block overflow-hidden">
                        <span className="block reveal-y">Thoughtfully curated events</span>
                    </span>
                    <span className="block text-csi-blue overflow-hidden">
                        <span className="block reveal-y">where students learn,</span>
                    </span>
                    <span className="block text-csi-blue overflow-hidden">
                        <span className="block reveal-y">build, and connect.</span>
                    </span>
                    </div>
                </div>
        </div>
        <EventCards 
          envisionRef={null}
          hackvisionRef={null}
          teaTechTalksRef={null}
          sihRef={null}
          hideSIH={true}
        />
        <div className="flex justify-center mb-8 md:mb-12">
          <a 
            href="/events"
            className="px-8 py-3 sm:px-10 sm:py-4 bg-csi-blue hover:bg-csi-blue-600 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            View More
          </a>
        </div>
        <div className="text-center mt-12 md:mt-16">
          <p className="text-white/80 text-lg sm:text-xl md:text-2xl font-bespoke-sans-semibold">
            Events more to come!
          </p>
        </div>
      </div>
    </section>
    )
}