"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: "50", lines: ["Members"] },
  { num: "52", lines: ["Volunteers"] },
  { num: "10", lines: ["Events"] },
  { num: "10", lines: ["Projects"], suffix: "+" },
]

export default function Numbers() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
  
      // Y reveal for "IN NUMBERS"
      gsap.utils.toArray(".reveal-num").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el.parentElement, // overflow-hidden wrapper
              start: "top 85%",
            },
          }
        )
      })

      gsap.utils.toArray(".reveal-x").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -110 },
          {
            xPercent: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 80%",
            },
          }
        )
      })            
  
      // Count up — per number
      gsap.utils.toArray(".count").forEach((el) => {
        const end = Number(el.dataset.value)
        const suffix = el.dataset.suffix || ""
  
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: end,
            duration: 1.5,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            onUpdate: () => {
              el.innerText = Math.floor(el.innerText) + suffix
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
      className="relative bg-csi-white text-csi-black pt-10 md:pt-20 px-[5vw] font-bespoke-sans font-bold"
    >
      <div className="relative w-full pt-20">
        <div className="relative w-full flex flex-col">

          {/* Heading */}
          <div className="relative text-[2.5vh] sm:text-[2.8vh] md:text-[3vh] font-dm-sans-regular overflow-hidden w-max pb-1.5 tracking-tighter mb-12 sm:mb-16 md:mb-20">
            <span className="block overflow-hidden">
              <span className="block reveal-num">IN NUMBERS</span>
            </span>
            <span className="absolute block h-px w-full bottom-0 overflow-hidden">
              <span className="reveal-x block absolute left-0 top-0 h-full w-full bg-csi-black -translate-x-1/3" />
            </span>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full md:px-15">
            {stats.map((item, i) => (
              <li key={i} className="flex flex-col items-center md:items-start">

                <div className="text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] font-dm-sans leading-none mb-3 sm:mb-4">
                  <span className="block overflow-hidden">
                    <span
                      className="block count"
                      data-value={item.num}
                      data-suffix={item.suffix}
                    >
                      0
                    </span>
                  </span>
                </div>

                <div className="text-[1.8vh] sm:text-[2vh] md:text-[2.22vh] font-bespoke-sans font-medium leading-tight flex justify-center md:justify-start">
                  {item.lines.map((line, j) => (
                    <span key={j} className="block overflow-hidden">
                      <span className="block reveal-num">{line}</span>
                    </span>
                  ))}
                </div>

              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  )
}