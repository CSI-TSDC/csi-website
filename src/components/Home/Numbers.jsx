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
      className="relative bg-[#f8f8f8] text-[#222] pt-10 md:pt-20 px-[5vw] font-satoshi font-bold"
    >
      <div className="relative w-full pt-20">
        <div className="relative w-full flex flex-col">

          {/* Heading */}
          <div className="relative text-[3vh] font-poppins-regular overflow-hidden w-max pb-1.5 tracking-tighter mb-10">
            <span className="block overflow-hidden">
              <span className="block reveal-num">IN NUMBERS</span>
            </span>
            <span className="absolute block h-px w-full bottom-0 overflow-hidden">
              <span className="reveal-x block absolute left-0 top-0 h-full w-full bg-black" />
            </span>
          </div>

          <ul className="flex justify-between w-full gap-10 md:px-15">
            {stats.map((item, i) => (
              <li key={i} className="flex flex-col">

                <div className="text-[8vw] md:text-[7vw] font-poppins leading-none mb-4">
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

                <div className="text-[2.22vh] font-satoshi font-medium leading-tight flex justify-center">
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