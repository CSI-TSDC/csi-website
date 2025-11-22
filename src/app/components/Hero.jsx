'use client'

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedLetter = ({ children, delay = 200, isInView }) => {
  return (
    <motion.span
      initial={{ y: '110%' }}
      animate={isInView ? { y: '0%' } : { y: '110%' }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const isInViewHook = useInView(containerRef, { once: true, amount: 0.1 });
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Check if already in view on mount (for Hero section at top of page)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        setIsInView(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isInViewHook) {
      setIsInView(true);
    }
  }, [isInViewHook]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full h-[95vh] object-fit bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('/assets/images/bg1.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-20 text-white/50 stroke-white pt-20 md:pt-24 px-6 font-youth-bold flex-1">
        <div className="w-full flex flex-row items-center justify-center text-[18vw]/[14vw]" id="hero-text">
          <div className="">
              <span>
                <AnimatedLetter delay={0} isInView={isInView}>C</AnimatedLetter>
              </span>
              <span>
                <AnimatedLetter delay={0.1} isInView={isInView}>S</AnimatedLetter>
              </span>
              <span>
                <AnimatedLetter delay={0.2} isInView={isInView}>I</AnimatedLetter>
              </span>
            </div>
            <div>
              <span>
                <AnimatedLetter delay={0.3} isInView={isInView}>x</AnimatedLetter>
              </span>
            </div>
            <div>
              <span>
                <AnimatedLetter delay={0.4} isInView={isInView}>T</AnimatedLetter>
              </span>
              <span>
                <AnimatedLetter delay={0.5} isInView={isInView}>S</AnimatedLetter>
              </span>
              <span>
                <AnimatedLetter delay={0.6} isInView={isInView}>D</AnimatedLetter>
              </span>
              <span>
                <AnimatedLetter delay={0.7} isInView={isInView}>C</AnimatedLetter>
              </span>
            </div>
        </div>
        <h2 id="hero-line" className="text-5xl md:text-4xl font-bold leading-snug text-white">
          <span className="space-x-2">
            <span>
              <AnimatedLetter delay={0.8} isInView={isInView}>Together</AnimatedLetter>
            </span>
            {" "}
            <span>
              <AnimatedLetter delay={0.85} isInView={isInView}>We</AnimatedLetter>
            </span>
            {" "}
            <span className="relative inline-block">
              <motion.span
                className="absolute inset-0 bg-red-500 rounded-xl shadow-lg -rotate-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.4, 
                  ease: 'easeOut',
                  delay: 0.7 + 1.3
                }}
                style={{ zIndex: 0 }}
              />
              <span className="relative px-3 py-1 text-white" style={{ zIndex: 1 }}>
                <AnimatedLetter delay={0.9} isInView={isInView}>Code,</AnimatedLetter>
              </span>
            </span>
            {" "}
            <span className="relative inline-block">
              <motion.span
                className="absolute inset-0 bg-blue-500 rounded-xl shadow-lg -rotate-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.4, 
                  ease: 'easeOut',
                  delay: 0.8 + 1.3 
                }}
                style={{ zIndex: 0 }}
              />
              <span className="relative px-3 py-1 text-white" style={{ zIndex: 1 }}>
                <AnimatedLetter delay={1.0} isInView={isInView}>Create,</AnimatedLetter>
              </span>
            </span>
            {" "}
            <span>
              <AnimatedLetter delay={1.1} isInView={isInView}>and</AnimatedLetter>
            </span>
            {" "}
            <span className="relative inline-block">
              <motion.span
                className="absolute inset-0 bg-orange-500 rounded-xl shadow-lg -rotate-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.4, 
                  ease: 'easeOut',
                  delay: 0.9 + 1.3 
                }}
                style={{ zIndex: 0 }}
              />
              <span className="relative px-3 py-1 text-white" style={{ zIndex: 1 }}>
                <AnimatedLetter delay={1.15} isInView={isInView}>Conquer</AnimatedLetter>
              </span>
            </span>
          </span>
        </h2>
        <button
          className="px-8 py-4 mt-6 relative rounded-2xl text-white font-medium backdrop-blur-xl border border-white/10 transition-all duration-300 text-base md:text-lg hover:bg-white/20"
          style={{
            background: "rgba(255,255,255,0.08)",
          }}
        >
          Let's Explore
        </button>
      </div>
    </section>
  );
};

export default Hero;

