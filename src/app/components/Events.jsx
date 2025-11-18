"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const originalBg = window.getComputedStyle(document.body).backgroundColor;

    sectionsRef.current.forEach((el) => {
      // Fade-in animation for event
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );

      // SMOOTH PAGE BACKGROUND TRANSITION
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: "#000",
            duration: 0.8,
            ease: "power1.inOut",
          });
        },
        onLeave: () => {
          gsap.to("body", {
            backgroundColor: originalBg,
            duration: 0.8,
            ease: "power1.inOut",
          });
        },
        onEnterBack: () => {
          gsap.to("body", {
            backgroundColor: "#000",
            duration: 0.8,
            ease: "power1.inOut",
          });
        },
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: originalBg,
            duration: 0.8,
            ease: "power1.inOut",
          });
        },
      });
    });
  }, []);

  return (
    <section className="w-full min-h-screen py-16 px-8 md:px-16 bg-transparent">

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-white">
        Events, <span className="text-red-500">Events Done by Us..</span>
      </h2>

      {/* EVENTS LIST */}
      <div className="flex flex-col gap-24 w-full">

        {/* EVENT 1 */}
        <div
          ref={(el) => (sectionsRef.current[0] = el)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">Event Title</h3>
            <p className="text-xl font-semibold mb-3">Event Description:</p>
            <p className="leading-relaxed opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <img
            src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
            alt="event"
            className="rounded-2xl w-[300px] justify-self-center md:justify-self-end"
          />
        </div>

        {/* EVENT 2 */}
        <div
          ref={(el) => (sectionsRef.current[1] = el)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL8KnEdIemiK4bUhR6HwHXf6Eo3BXXHsqHg&s"
            alt="event"
            className="rounded-2xl w-[300px] justify-self-center md:justify-self-start"
          />

          <div className="text-right">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">Event Title</h3>
            <p className="text-xl font-semibold mb-3">Event Description:</p>
            <p className="leading-relaxed opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Events;
