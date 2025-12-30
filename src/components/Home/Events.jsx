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
      className="relative bg-[#161616] text-white min-h-[50vh] pt-12 sm:pt-16 md:pt-48 px-4 sm:px-6 md:px-[5vw] pb-16 sm:pb-20 md:pb-32 font-satoshi font-bold"
    >
      <div className="relative w-full">
        <div className="relative w-max flex flex-col">
                <div className="text-[5vw] sm:text-[5.5vw] md:text-[5vw] font-satoshi-semibold md:mx-15 flex md:flex-row flex-col md:justify-between justify-center w-full h-max gap-2 sm:gap-3">
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
        />
      </div>
    </section>
    )
}