"use client";

import Image from "next/image";
import MasonryGallery from "@/components/gallery/MasonryGallery";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 pb-4 md:pb-8 pt-24 md:pt-34 w-full gallery-bg">
        <div id="showcase-bg"></div>
        <div className="grid mx-auto max-w-6xl md:grid-cols-[1.15fr_1fr] gap-8 md:gap-16 items-center">
        <div className="space-y-3 md:space-y-6 order-1 md:order-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bespoke-sans-bold font-bold mb-6 text-csi-black leading-tight">
            The <span className="text-csi-blue-400">CSI</span> Showcase
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-left text-csi-black/80 leading-relaxed">
            A look back at the energy, creativity, and people behind CSI x TSDC.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-left text-csi-black/70 leading-relaxed">
            Explore our collection of memories from events, workshops, hackathon, and other activities held every year.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-left text-csi-black/60 leading-relaxed hidden sm:block">
            From tech fests to coding competitions, every moment captured tells a story of innovation and collaboration.
          </p>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[540px] overflow-hidden md:block order-2 md:order-1 flex justify-center md:justify-end">
        <div className="absolute md:right-0 top-1/2 -translate-y-1/2 space-y-3 md:space-y-6
                max-w-[92vw] sm:max-w-none scale-[0.9] sm:scale-100 origin-center">
            {/* Row 1 */}
            <div className="flex gap-2 md:gap-4">
              <Image
                src="/assets/Gallery_Hero/Gallery_T1.webp"
                width={200}
                height={120}
                className="w-[120px] h-[80px] md:w-[200px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_T2.webp"
                width={160}
                height={120}
                className="w-[100px] h-[80px] md:w-[160px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_T3.webp"
                width={220}
                height={120}
                className="w-[130px] h-[80px] md:w-[220px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
            </div>

            {/* Row 2 */}
            <div className="flex gap-2 md:gap-4 translate-x-4 md:translate-x-14">
              <Image
                src="/assets/Gallery_Hero/Gallery_First.webp"
                width={180}
                height={145}
                className="w-[110px] h-[90px] md:w-[180px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_Middle.webp"
                width={240}
                height={145}
                className="w-[140px] h-[90px] md:w-[240px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_Last.webp"
                width={150}
                height={145}
                className="w-[90px] h-[90px] md:w-[150px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
            </div>

            {/* Row 3 — FIXED */}
            <div className="flex gap-2 md:gap-4 translate-x-2 md:translate-x-6">
              <Image
                src="/assets/Gallery_Hero/Gallery_B1.webp"
                width={210}
                height={135}
                className="w-[125px] h-[85px] md:w-[210px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_B2.webp"
                width={260}
                height={135}
                className="w-[150px] h-[85px] md:w-[260px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_B3.webp"
                width={190}
                height={135}
                className="w-[115px] h-[85px] md:w-[190px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
            </div>

          </div>
        </div>

        </div>
      </section>
      {/* Masonry Gallery */}
      <MasonryGallery />
    </div>
  );
}