"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Existence() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Headings Y reveal
            gsap.utils.toArray(".reveal-i").forEach((el) => {
                gsap.fromTo(
                  el,
                  { yPercent: 110 },
                  {
                    yPercent: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                      trigger: el.parentElement, 
                      start: "top 80%",
                    },
                  }
                )
              })
            
              gsap.utils.toArray(".reveal-line").forEach((el) => {
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

            const lines = document.querySelectorAll(".para-line")

            lines.forEach((line) => {
                const text = line.textContent || ""
                line.textContent = ""

                ;[...text].forEach((char) => {
                    const span = document.createElement("span")
                    span.textContent = char
                    span.style.opacity = 0.3
                    line.appendChild(span)
                })

                gsap.to(line.children, {
                    opacity: 1,
                    stagger: 0.03,
                    ease: "none",
                    scrollTrigger: {
                        trigger: line,
                        start: "top 85%",
                        end: "bottom 60%",
                        scrub: true,
                    },
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#f8f8f8] text-[#222] min-h-[50vh] pt-10 md:pt-25 px-[5vw] font-satoshi font-bold"
        >
            <div className="relative w-full">
                <div className="relative w-max flex flex-col">
                    <div className="relative text-[3vh] font-poppins-regular overflow-hidden w-max pb-1.5 tracking-tighter mb-10">
                        <span className="block overflow-hidden">
                            <span className="reveal-i block">ABOUT</span>
                        </span>
                        <span className="absolute block h-px w-full bottom-0 overflow-hidden">
                            <span className="reveal-line line block absolute left-0 top-0 h-full w-full bg-black" />
                        </span>
                    </div>

                    <div className="text-[6vw] md:text-[5vw] font-satoshi-semibold md:mx-15 flex md:flex-row flex-col md:justify-between justify-center w-full h-max">
                        <div className="relative">
                            <span className="block overflow-hidden">
                                <span className="reveal-i block">
                                    Why <span className="text-blue-500">Computer Society Of</span>
                                </span>
                            </span>
                            <span className="block text-blue-500 overflow-hidden">
                                <span className="reveal-i block">
                                    India (C.S.I) <span className="text-black">exists?</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end md:px-15 md:pt-10 md:text-[1.8vw] font-satoshi-regular">
                    <div className="relative w-max pt-5 flex flex-col justify-start leading-snug paragraph">
                        <span className="absolute block h-px w-[10%] top-0 overflow-hidden">
                            <span className="reveal-line line block absolute left-0 top-0 h-full w-full bg-black" />
                        </span>

                        <span className="block overflow-hidden">
                            <span className="block para-line">We&apos;re a student-led tech community</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="block para-line">that brings builders, creatives, and</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="block para-line">curious minds together. We learn,</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="block para-line">collaborate, host events, and create a</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="block para-line">welcoming space where everyone can</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="block para-line">grow — no matter their skill level.</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}