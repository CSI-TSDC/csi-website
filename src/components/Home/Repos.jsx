"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import { InertiaPlugin } from "gsap/InertiaPlugin"

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin)

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const projects = [
    {
      title: "Usbek & Rica",
      desc: "Understanding cyberattacks through real-world analysis.",
      img: "/assets/Home/mock/project-1.jpg",
    },
    {
      title: "TEDx",
      desc: "Managing the human factor in unpredictable environments.",
      img: "/assets/Home/mock/project-2.jpg",
    },
    {
      title: "Les Lueurs",
      desc: "Conversations where ideas become powerful tools.",
      img: "/assets/Home/mock/project-3.jpg",
    },
    {
      title: "In Cognita",
      desc: "Exploring technology, design, and human behavior.",
      img: "/Home/mock/project-4.jpg",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draggable
      Draggable.create(trackRef.current, {
        type: "x",
        inertia: true,
        bounds: {
          minX: -(trackRef.current.scrollWidth - window.innerWidth),
          maxX: 0,
        },
      })

      gsap.utils.toArray(".reveal-y").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 120 },
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

      // GitHub pill opacity
      gsap.fromTo(
        ".reveal-opacity",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-opacity",
            start: "top 85%",
          },
        }
      )

      // WORD opacity reveal INSIDE span > span
      gsap.utils.toArray(".word-opacity").forEach((el) => {
        const words = el.textContent.split(" ")
        el.textContent = ""

        words.forEach((word) => {
          const span = document.createElement("span")
          span.innerHTML = word + "&nbsp;"
          span.style.opacity = 0.3
          span.style.display = "inline-block"
          el.appendChild(span)
        })

        gsap.to(el.children, {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 65%",
            scrub: true,
          },
        })
      })

      // Project cards opacity
      gsap.fromTo(
        ".project-card",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".project-card",
            start: "top 85%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#161616] text-[#fff] min-h-[50vh] py-10 md:py-25 px-[5vw] font-satoshi font-bold"
    >
      {/* GitHub */}
      <div className="w-full px-15 flex justify-center text-[5vw] items-center border-t md:pt-25">
        <span className="block mr-5 overflow-hidden">
          <span className="block reveal-y">We are also on</span>
        </span>

        <div className="relative bg-[#010408] flex justify-center -rotate-1 items-center text-white w-max px-7 py-5 gap-4 rounded-full reveal-opacity">
            <span className="block relative w-[100px] h-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 256 256"
                    className="w-full h-full"
                    >
                    <g
                        fill="#ffffff"
                        fillRule="nonzero"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeDasharray=""
                        strokeDashoffset="0"
                        fontFamily="none"
                        fontWeight="none"
                        fontSize="none"
                        textAnchor="none"
                        style={{ mixBlendMode: "normal" }}
                    >
                        <g transform="scale(8.53333,8.53333)">
                        <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z" />
                        </g>
                    </g>
                </svg>
            </span>
            <span className="">
                <span>Github</span>
            </span>
        </div>
      </div>

      {/* Paragraph (SPAN-SPAN KEPT) */}
      <div className="relative flex flex-col px-15 justify-center items-center leading-snug text-[3vh] mt-10 text-center">
        <span className="block overflow-hidden">
          <span className="block word-opacity">
            A space where our Tech Team publishes
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="block word-opacity">
            tutorials and showcases projects built by students.
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="block word-opacity">
            Below is some of the recently uploaded content
          </span>
        </span>
      </div>

      {/* Recent Projects */}
      <div className="relative mt-25 flex flex-col">
        <div className="relative text-[3vh] font-poppins-regular w-max pb-1.5 tracking-tighter mb-16">
          <span className="block overflow-hidden">
            <span className="block reveal-y">RECENT PROJECTS</span>
          </span>
          <span className="absolute block h-px w-full bottom-0 overflow-hidden">
            <span className="block h-full w-full bg-white reveal-x" />
          </span>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-10 cursor-grab active:cursor-grabbing select-none"
          >
            {projects.map((item, i) => (
              <div
                key={i}
                className="project-card w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] flex-shrink-0"
              >
                <div className="w-full aspect-4/3 overflow-hidden bg-neutral-200 mb-6">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-poppins mb-2">{item.title}</h3>
                <p className="text-sm font-medium max-w-[30ch]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}