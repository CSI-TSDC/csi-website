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
    <section className="relative w-full h-screen header-top" ref={heroRef}>
      {/* Inline full-screen background images: base + overlay */}
      <div className="w-full h-full absolute top-0 left-0 z-2">
        <img
          src="/assets/Home/homebg.webp"
          alt="BG"
          className="w-full h-full absolute z-1 object-cover"
        />
        <img
          src="/assets/Home/bgoverlay2.webp"
          alt="BG"
          className="w-full h-full absolute z-2 object-cover"
        />
      </div>
      <div className="absolute left-[5vw] sm:left-[5vw] top-[25vw] md:top-auto md:bottom-[6vw] px-4 sm:px-0 z-3">
        <div className="flex flex-col w-full sm:w-max max-w-[90vw] sm:max-w-none">
          <div className="relative mb-2 sm:mb-2">
            <span className="block overflow-hidden">
              <span className="reveal-inner block text-[2vh] sm:text-[2.8vh] md:text-[2.5vw] lg:text-[2vw] font-kollektif-bold text-gray-200/90">
                WELCOME TO CSI X TSDC
              </span>
            </span>
          </div>
          <div className="relative text-[5.2vw] sm:text-[5.5vw] md:text-[3.3vw] leading-[1.1] sm:leading-[1.2] flex flex-col font-dm-sans-semibold">
            <span className="block overflow-hidden">
              <span className="reveal-inner block text-white/90 max-w-4xl">
                At the CSI Committee of TSDC,
              </span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-0">
              <span className="reveal-inner block text-white/90 max-w-4xl">
                we believe students grow best
              </span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-0">
              <span className="reveal-inner block text-white/90 max-w-4xl">
                by learning together.
              </span>
            </span>
          </div>
          {/* <div className="relative mt-4 sm:mt-6 flex flex-nowrap gap-2 sm:gap-4">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('about');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-block px-4 sm:px-8 md:px-10 py-2.5 sm:py-3.5 md:py-4 bg-gradient-to-r from-csi-blue-500 to-csi-blue-600 hover:from-csi-blue-600 hover:to-csi-blue-700 text-white rounded-full font-semibold text-xs sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Let's Explore!
            </a>
            <a
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('events');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-8 md:px-10 py-2.5 sm:py-3.5 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white rounded-full font-semibold text-xs sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-blue-500"></span>
              </span>
              <span>Upcoming Events</span>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}