"use client";

import React, { useRef, useEffect } from "react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATISTICS = [
  { label: "Members", value: 50 },
  { label: "Volunteers", value: 52 },
  { label: "Events", value: 5 },
  { label: "Projects", value: 7 },
];

const StatBox = ({ label, value }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      numberRef.current,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1.5,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [value]);

  return (
    <SpotlightCard className="aspect-square p-4 sm:p-6 flex flex-col items-center justify-center">
      <div ref={numberRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2" />
      <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-300 uppercase tracking-wide text-center">
        {label}
      </div>
    </SpotlightCard>
  );
};

const WhatWeAre = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    // Text + line reveal
    gsap.fromTo(
      ".reveal-y",
      { y: 110 },
      {
        y: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Image zoom
    gsap.fromTo(
      imageContainerRef.current.querySelector("img"),
      { scale: 1.5 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-are"
      className="w-full h-max py-12 sm:py-20 md:py-32 px-[5vw]"
    >
      <div className="w-full h-max flex flex-col md:flex-row justify-center font-dm-sans-medium items-stretch mx-auto max-w-5xl gap-8 md:gap-0">
        {/* LEFT */}
        <div className="flex flex-col w-full md:w-1/2 px-4 sm:px-8 justify-between space-y-6">
          <div
            ref={imageContainerRef}
            className="w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-2xl"
          >
            <img
              src="/assets/Teams/img2.jpg"
              className="w-full h-full object-cover rounded-2xl"
              alt="Team"
            />
          </div>

          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-bespoke-sans-bold text-[#2563EB] overflow-hidden">
              <span className="reveal-y block">What we do</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {[
                "Connect with other coders",
                "Host Tech Fest & Coding Events",
                "Participate in coding competitions",
                "Make friends & chill",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                  <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <span className="reveal-y text-sm sm:text-base md:text-lg font-semibold text-gray-800 block">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col w-full md:w-1/2 px-4 sm:px-8 justify-between space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bespoke-sans-bold overflow-hidden">
              <span className="reveal-y block">Who we are</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl font-normal opacity-80 space-y-1">
              {[
                "We're a student-led tech community that brings",
                "builders, creatives, and curious minds together.",
                "We learn, collaborate, host events, and",
                "create a welcoming space where everyone can grow.",
              ].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className="reveal-y block">{line}</span>
                </span>
              ))}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {STATISTICS.map((stat) => (
              <StatBox
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAre;