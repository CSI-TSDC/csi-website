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
      <div className="absolute inset-0 bg-black/25"></div>
      
      <div className="relative z-10 flex flex-col justify-center px-12 md:px-20 lg:px-28 xl:px-32 h-full max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
            >
              WELCOME TO CSI X TSDC
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl"
            >
              At the CSI Committee of TSDC, we believe growth happens when students learn together. We host events, share knowledge, and create hands-on opportunities that help students discover what they&apos;re capable of.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-2 border-white rounded-lg p-4 md:p-5 hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-sm bg-white/5"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform">
                Build
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="md:row-span-2 border-2 border-white rounded-lg p-4 md:p-5 hover:bg-white/10 transition-colors cursor-pointer group flex items-center justify-center min-h-[150px] md:min-h-[240px] backdrop-blur-sm bg-white/5"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform">
                Learn
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="border-2 border-white rounded-lg p-4 md:p-5 hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-sm bg-white/5"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:scale-105 transition-transform">
                Organize
              </h3>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

