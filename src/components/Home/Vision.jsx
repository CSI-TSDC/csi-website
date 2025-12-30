"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const videoWrapRef = useRef(null);

  useEffect(() => {
    const nav = document.getElementById("nav");
    const navHeight = nav ? nav.offsetHeight : 0;

    // Y reveal
    gsap.fromTo(
      ".reveal-line",
      { y: 110 },
      {
        y: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.to(textRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=80%",
        scrub: true,
        pin: textRef.current,
        pinSpacing: false,
      },
    });

    // Video scale (navbar-aware, correct)
    gsap.fromTo(
      videoWrapRef.current,
      { scale: 0.8 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: videoWrapRef.current,
          start: "top 75%",
          end: `top-=${navHeight} top`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-csi-black text-white min-h-screen mt-10 md:mt-20 font-satoshi font-bold overflow-hidden"
    >
      {/* TEXT */}
      <div
        ref={textRef}
        className="relative z-10 w-full min-h-[100svh] pt-20 sm:pt-24 md:pt-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-0"
      >
        <div className="grid-bg -z-1"></div>

        <span className="block overflow-hidden uppercase text-[2.5vh] sm:text-[2.8vh] md:text-[3vh] font-poppins-regular mb-4 sm:mb-5">
          <span className="reveal-line block">Our Vision</span>
        </span>

        <div className="flex flex-col items-center font-poppins-bold">
          <span className="block overflow-hidden text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw]">
            <span className="reveal-line block">For the students,</span>
          </span>
          <span className="block overflow-hidden text-[8vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw]">
            <span className="reveal-line block">by the students</span>
          </span>
        </div>
      </div>

      {/* VIDEO */}
      <div
        ref={videoWrapRef}
        className="relative z-20 w-full min-h-svh scale-80"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover rounded-4xl"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/Home/test.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}