"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Projects = () => {
  const sticker1Ref = useRef(null);
  const sticker2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating loop animation for sticker 1
      gsap.to(sticker1Ref.current, {
        y: -20,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power3",
      });

      // Floating loop animation for sticker 2
      gsap.to(sticker2Ref.current, {
        x: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full min-h-screen px-6 py-10 flex justify-center">
      <div className="w-full max-w-6xl p-10 shadow-sm">

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Projects,{" "}
          <span className="text-red-500">See What We Build..</span>
        </h2>

        <div className="flex flex-col gap-10">

          {/* Project Card 1 */}
          <div className="relative w-full bg-[url('/assets/P-image.avif')] bg-cover bg-center rounded-3xl p-10 text-white flex">
            <div className="w-3/4">
              <h3 className="text-4xl font-bold mb-4 text-black">Project 1</h3>

              <p className="text-xl font-semibold mb-2">Project Description:</p>

              <p className="leading-relaxed text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Sticker */}
            <div
              ref={sticker1Ref}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center"
            >
              <img
                src="/assets/sticker-pizza.png"
                alt="sticker"
                className="w-28 md:w-28 object-contain"
              />
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="relative w-full bg-[url('/assets/P-image.avif')] bg-cover bg-center rounded-3xl p-10 text-white flex">
            <div className="w-3/4">
              <h3 className="text-4xl font-bold mb-4 text-black">Project 2</h3>

              <p className="text-xl font-semibold mb-2">Project Description:</p>

              <p className="leading-relaxed text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Sticker */}
            <div
              ref={sticker2Ref}
              className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center pl-7 rotate-45"
            >
              <img
                src="/assets/sticker-anime.png"
                alt="sticker"
                className="w-24 md:w-28 object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
