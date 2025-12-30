"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection({ title, hasOverflow = true, children }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  //   const section = sectionRef.current;
  //   const title = titleRef.current;
  //   const content = contentRef.current;

  //   if (!section || !title || !content) return;

  //   // Get navbar height dynamically (h-14 on mobile = 56px, h-22 on desktop = 88px)
  //   const getNavbarHeight = () => {
  //     return window.innerWidth >= 768 ? 88 : 56;
  //   };

  //   // Create ScrollTrigger for pinning
  //   const scrollTrigger = ScrollTrigger.create({
  //     trigger: section,
  //     start: () => `top ${getNavbarHeight()}px`,
  //     end: () => `+=${content.offsetHeight}`,
  //     pin: title,
  //     pinSpacing: false,
  //     scrub: 1,
  //   });

  //   // Handle window resize to update navbar height
  //   const handleResize = () => {
  //     scrollTrigger.refresh();
  //   };
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     scrollTrigger.kill();
  //   };
  // }, [title, children]);

  return (
    <div 
      ref={sectionRef}
      className={`relative ${hasOverflow ? 'overflow-hidden' : ''} text-[5vw] sm:text-[5.6vw] md:text-[6.6vw] uppercase w-full`}
    >
      <div 
        ref={titleRef}
        className="w-full relative py-4 sm:py-4 md:py-5 font-bespoke-sans-semibold flex justify-center items-center overflow-hidden bg-[#f8f8f8] z-10"
      >
        <span>
          <span>{title}</span>
        </span>
        <div className="w-full h-px absolute bottom-0">
          <span className="w-full h-full relative bg-csi-black/30 block"></span>
        </div>
      </div>
      <div ref={contentRef} className="w-full h-max relative font-dm-sans-medium">
        {children}
      </div>
    </div>
  );
}

