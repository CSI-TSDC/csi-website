"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection({ title, hasOverflow = true, children }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const underline = underlineRef.current;
    const content = contentRef.current;

    if (!section || !title || !underline || !content) return;

    // Get navbar height dynamically (h-14 on mobile = 56px, h-22 on desktop = 88px)
    const getNavbarHeight = () => {
      return window.innerWidth >= 768 ? 88 : 56;
    };

    // Set initial state - underline at -100%
    gsap.set(underline, { x: "-100%" });

    // Create ScrollTrigger for pinning and animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: () => `top ${getNavbarHeight()}px`,
      end: () => `+=${content.offsetHeight}`,
      pin: title,
      pinSpacing: false,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Animate underline based on scroll progress
        // Progress goes from 0 to 1, we want:
        // 0 -> -100% (hidden left)
        // 1 -> 0% (fully visible, stays at 0%)
        // Smoothly animate from -100% to 0% over entire scroll
        const x = gsap.utils.mapRange(0, 1, -100, 0, progress);
        gsap.set(underline, { x: `${x}%` });
      },
    });

    // Handle window resize to update navbar height
    const handleResize = () => {
      scrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTrigger.kill();
    };
  }, [title, children]);

  return (
    <div 
      ref={sectionRef}
      className={`relative ${hasOverflow ? 'overflow-hidden' : ''} text-[5vw] sm:text-[5.6vw] md:text-[6.6vw] uppercase w-full`}
    >
      <div 
        ref={titleRef}
        className="w-full relative py-4 sm:py-4 md:py-5 flex justify-center items-center overflow-hidden bg-white z-10"
      >
        <span>
          <span>{title}</span>
        </span>
        <div className="w-full h-px absolute bottom-0">
          <span className="w-full h-full relative bg-black/30 block"></span>
        </div>
        <div className="w-full h-[2px] absolute bottom-0 overflow-hidden">
          <span 
            ref={underlineRef}
            className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 block"
          ></span>
        </div>
      </div>
      <div ref={contentRef} className="w-full h-max relative">
        {children}
      </div>
    </div>
  );
}

