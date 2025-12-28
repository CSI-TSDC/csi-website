"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-inner",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".line",
        { xPercent: -110 },
        {
          xPercent: -50,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="homebg" className="relative w-full h-screen" ref={heroRef}>
      <div id="bg-overlay"></div>
      <div className="absolute left-[5vw] sm:left-[5vw] bottom-[8vw] sm:bottom-[8vw] md:bottom-[6vw] px-4 sm:px-0">
        <div className="flex flex-col w-full sm:w-max max-w-[90vw] sm:max-w-none">
            <div className="relative mb-2 sm:mb-2">
                <span className="block overflow-hidden">
                    <span className="reveal-inner block text-[2.5vh] sm:text-[3vh] md:text-[2.5vw] lg:text-[2vw] font-poppins-bold text-white">
                        WELCOME TO CSI X TSDC
                    </span>
                </span>
            </div>
            <div className="relative mb-1.5 pb-2.5 flex flex-col">
                <span className="block overflow-hidden">
                    <span className="reveal-inner block text-[4vw] sm:text-[3.5vw] md:text-[3.3vw] leading-[1.1] sm:leading-[1.2] font-poppins-bold text-white/90 max-w-4xl">
                        At the CSI Committee of TSDC, 
                    </span>
                </span>
                <span className="block overflow-hidden mt-1 sm:mt-0">
                    <span className="reveal-inner block text-[4vw] sm:text-[3.5vw] md:text-[3.3vw] leading-[1.1] sm:leading-[1.2] font-poppins-bold text-white/90 max-w-4xl">
                        we believe students grow best
                    </span>
                </span>
                <span className="block overflow-hidden mt-1 sm:mt-0">
                    <span className="reveal-inner block text-[4vw] sm:text-[3.5vw] md:text-[3.3vw] leading-[1.1] sm:leading-[1.2] font-poppins-bold text-white/90 max-w-4xl">
                        by learning together.
                    </span>
                </span>
            </div>
        </div>
      </div>
    </section>
  );
}