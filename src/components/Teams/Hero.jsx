"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export default function TeamsGrid() {

  return (
    <section className="pt-20 sm:pt-24 md:pt-32 bg-csi-white text-csi-black w-full font-bespoke-sans-bold uppercase">
      <div className="text-[8vw] sm:text-[7vw] md:text-[6vw] text-[#4F77FF] flex justify-center mb-12 sm:mb-16 md:mb-20 px-4">
        <span>
          <span className="text-csi-black">meet the </span>team
        </span>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="teamsgrid"
          className="
          grid
          grid-cols-2
          auto-rows-[100px]
          gap-2
          md:grid-cols-9
          md:grid-rows-[repeat(5,minmax(120px,1fr))]
          md:gap-[12px]
        "
        >
          {/* Fan – desktop only */}
          <div className="hidden md:flex relative md:col-start-1 md:row-start-1 items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-full -translate-y-full w-[40px] h-[20px] scale-125">

              <div className="absolute inset-0 bg-[#F9E492] rounded-t-full origin-bottom-right"></div>

              <div className="absolute inset-0 bg-[#4F77FF] rounded-t-full origin-bottom-right rotate-90"></div>

              <div className="absolute inset-0 bg-[#F9E492] rounded-t-full origin-bottom-right rotate-180"></div>

              <div className="absolute inset-0 bg-[#4F77FF] rounded-t-full origin-bottom-right rotate-[270deg]"></div>

            </div>
          </div>

          {/* Black block – first row mobile */}
          <div
            className="
              bg-[#1b1b1b] rounded-[32px_8px]
              col-span-1 row-span-1
              md:col-start-1 md:row-start-2 md:row-end-5
            "
          />

          {/* Image 1 – beside black block on mobile */}
          <div
            className="
              relative overflow-hidden rounded-[32px_8px_8px_8px]
              col-span-1 row-span-1
              md:col-start-2 md:col-end-5 md:row-start-1 md:row-end-3
            "
          >
            <Image src="/assets/Teams/Hero/Team5.webp" alt="Team member" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>

          {/* Next 3 – full width column on mobile */}
          <div
            className="
              relative overflow-hidden rounded-[8px_8px_32px_8px]
              col-span-2 row-span-1
              md:col-start-2 md:col-end-6 md:row-start-3 md:row-end-5
            "
          >
            <Image src="/assets/Teams/Hero/Team2.webp" alt="Team member" fill priority sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
          </div>

          <div
            className="
              relative overflow-hidden rounded-[32px_8px_8px_8px]
              col-span-2 row-span-1
              md:col-start-5 md:col-end-8 md:row-start-1 md:row-end-3
            "
          >
            <Image src="/assets/Teams/Hero/Team3.webp" alt="Team member" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>

          <div
            className="
              relative overflow-hidden rounded-[8px_8px_32px_8px]
              col-span-2 row-span-1
              md:col-start-6 md:col-end-9 md:row-start-3 md:row-end-5
            "
          >
            <Image src="/assets/Teams/Hero/Team4.webp" alt="Team member" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          </div>

          {/* Last row – image + black block */}
          <div
            className="
              relative overflow-hidden rounded-[32px_8px]
              col-span-1 row-span-1
              md:col-start-8 md:col-end-10 md:row-start-1 md:row-end-3
            "
          >
            <Image src="/assets/Teams/Hero/Team1.webp" alt="Team member" fill sizes="(max-width: 768px) 50vw, 22vw" className="object-cover" />
          </div>

          <div
            className="
              bg-[#1b1b1b] rounded-[32px_8px]
              col-span-1 row-span-1
              md:col-start-9 md:row-start-3 md:row-end-5
            "
          />
        </div>
      </div>
    </section>
  );
}