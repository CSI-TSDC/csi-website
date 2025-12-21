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
      <div className="absolute left-[5vw] bottom-[8vw]">
        <div className="flex flex-col w-max">
            <div className="relative mb-2">
                <span className="block overflow-hidden">
                    <span className="reveal-inner block text-[3vh] lg:text-[2vw] font-poppins-bold text-white">
                        WELCOME TO CSI X TSDC
                    </span>
                </span>
            </div>
            <div className="relative mb-1.5 pb-2.5 flex flex-col">
                <span className="block overflow-hidden float-left">
                    <span className="reveal-inner block text-[3.3vw]/[3.4w] font-poppins-bold text-white/90 max-w-4xl">
                        At the CSI Committee of TSDC, 
                    </span>
                </span>
                <span className="block overflow-hidden float-left">
                    <span className="reveal-inner block text-[3.3vw]/[4vw] font-poppins-bold text-white/90 max-w-4xl">
                        we believe students grow best
                    </span>
                </span>
                <span className="block overflow-hidden float-left">
                    <span className="reveal-inner block text-[3.3vw]/[4vw] font-poppins-bold text-white/90 max-w-4xl">
                        by learning together.
                    </span>
                </span>
                <div className="absolute h-px w-full bottom-0 overflow-hidden">
                    <span className="line block absolute left-0 top-0 h-full w-full bg-white" />
                </div>
            </div>
            <div className="relative">
                <span className="block overflow-hidden mt-2">
                    <span className="reveal-inner block font-satoshi-regular text-[2.5vh] text-white/90 leading-tight">
                        We host events, share knowledge, and create hands-on
                    </span>
                </span>
                <span className="block overflow-hidden mt-2">
                    <span className="reveal-inner block font-satoshi-regular text-[2.5vh] text-white/90 leading-tight">
                        opportunities that help students discover what they&apos;re capable of.
                    </span>
                </span>
            </div>
        </div>
      </div>
    </section>
  );
}