'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Vision = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(videoRef.current, { opacity: 0, height: "60%" });
      gsap.set(textRef.current, { opacity: 1 });

      containerRef.current.addEventListener("mouseenter", () => {
        gsap.to(textRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "easeInOut"
        });

        gsap.to(videoRef.current, {
          opacity: 1,
          height: "100%",
          duration: 0.6,
          ease: "easeInOut"
        });
      });

      containerRef.current.addEventListener("mouseleave", () => {
        gsap.to(textRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "easeInOut"
        });

        gsap.to(videoRef.current, {
          opacity: 0,
          height: "60%",
          duration: 0.6,
          ease: "easeInOut"
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="what-we-are"
      className="w-full min-h-screen pt-12 md:pt-20 p-10 font-youth-bold"
    >

      <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 pb-5">
        Vision, <span className="text-red-500">Our Aim is to..</span>
      </h2>

      <div
        ref={containerRef}
        className="relative flex justify-center items-center cursor-pointer p-20 w-full "
      >


        <h2
          ref={textRef}
          className="absolute text-2xl md:text-8xl font-bold text-center select-none"
        >
          For The Students,<br />By The Students
        </h2>

        <video
          ref={videoRef}
          className="rounded-2xl"
          style={{ width: "70.5vw" }}
          autoPlay
          muted
          loop
          src="/assets/test.mp4"
        />
      </div>
    </div>
  );
};

export default Vision;
