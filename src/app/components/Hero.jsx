'use client'

import React from "react";
import { useRef } from "react";
import { gsap } from "gsap";


const Hero = () => {

    const btnRef = useRef(null);

      const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.08,
      background:
        "linear-gradient(135deg, rgba(56,189,248,0.5), rgba(59,130,246,0.5))",
      boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(btnRef.current, {
      scale: 1,
      background: "rgba(255,255,255,0.08)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full h-[95vh] object-fit bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://wallpapercat.com/w/full/5/0/6/183908-2000x1333-desktop-hd-bts-background-photo.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white pt-20 md:pt-24 px-6 font-youth-bold flex-1">
        <h1 className="text-5xl md:text-6xl font-bold leading-snug">
          Together We{" "}
          <span className="bg-red-500 px-3 py-1 rounded-xl text-white shadow-lg inline-block -rotate-3">
            Code
          </span>
          ,{" "}
          <span className="bg-blue-500 px-3 py-1 rounded-xl text-white shadow-lg inline-block -rotate-3">
            Create
          </span>
          , and{" "}
          <span className="bg-orange-500 px-3 py-1 rounded-xl text-white shadow-lg inline-block -rotate-3">
            Conquer
          </span>
        </h1>

        <p className="max-w-2xl mt-6 text-gray-200 text-sm md:text-base leading-relaxed font-youth-bold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          since the 1500s. It has survived not only five centuries, but the
          leap into electronic typesetting, remaining essentially unchanged.
        </p>

        <button
          ref={btnRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="
        px-6 py-3 mt-6 relative rounded-2xl text-white font-medium backdrop-blur-xl border border-white/10 transition-colors duration-300
      "
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

