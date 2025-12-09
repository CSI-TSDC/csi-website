"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import DotGrid from "@/components/DotGrid";

function SpotlightImage({ spotlight }) {
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;

    if (!container || !img) return;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        x: x * 30,
        y: y * 30,
        scale: 1.15,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1.07,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [spotlight]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900"
    >
      <img
        ref={imgRef}
        src={spotlight?.src}
        className="w-full h-full object-cover scale-105 will-change-transform"
      />

    
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

     
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs md:text-sm z-20">
        <div>
          <p className="font-medium">{spotlight?.event}</p>
          <p className="text-neutral-300">
            {spotlight?.year} · {spotlight?.tag}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] md:text-xs">
          Spotlight
        </span>
      </div>
    </div>
  );
}


const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1763793927948-7faaa6adb479?q=80&w=687&auto=format&fit=crop",
    event: "HackVision",
    tag: "Hackathon",
    year: "2025",
    size: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop",
    event: "Web Dev Workshop",
    tag: "Workshop",
    year: "2026",
    size: "wide",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    event: "LAN Party",
    tag: "Game Night",
    year: "2025",
    size: "square",
  },
];

const filters = ["All", "Hackathon", "Workshop", "Game Dev", "Mad Memories", "Blooper"];  


export default function CSIGallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [spotlight, setSpotlight] = useState(photos[0]);

  const filteredPhotos =
    activeFilter === "All"
      ? photos
      : photos.filter((p) => p.tag === activeFilter);

  return (
    <main className="min-h-screen bg-white text-black relative">
      <div className="fixed inset-0 z-0">
        <DotGrid 
          baseColor="#E5E7EB"
          activeColor="#EF4444"
          dotSize={4}
          gap={24}
          className="h-full w-full"
          style={{}}
        />
      </div>
      <div className="relative z-10">
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-16 grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
        <div>
          <p className="uppercase text-xs tracking-[0.3em] text-gray-600 mb-3">
            CSIxTTT · Gallery
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">
            Moments we{" "}
            <span className="text-red-500">
              broke <span className="text-black">&amp; fixed</span>
            </span>{" "}
            the web.
          </h1>

          <p className="text-gray-600 max-w-xl text-sm md:text-base mb-6">
            Hackathons, sleepless nights, chai breaks, debugging therapy
            sessions – a visual archive of what it feels like to build with
            CSIxTTT.
          </p>

          <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-700">
            <span className="border border-gray-300 rounded-full px-3 py-1">
              #Hackathons
            </span>
            <span className="border border-gray-300 rounded-full px-3 py-1">
              #Workshops
            </span>
            <span className="border border-gray-300 rounded-full px-3 py-1">
              #Memories
            </span>
          </div>
        </div>

        
        <SpotlightImage spotlight={spotlight} />
      </section>

     
      <section className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm whitespace-nowrap border transition-all ${
                activeFilter === f
                  ? "bg-black text-white border-black"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 bg-white/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

    =
      <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-[1.4fr,1fr] gap-10">
     
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              onMouseEnter={() => setSpotlight(photo)}
              className={`relative group overflow-hidden rounded-2xl bg-neutral-900 ${
                photo.size === "tall" ? "row-span-2 aspect-[3/4]" : ""
              } ${photo.size === "wide" ? "col-span-2 aspect-[16/9]" : ""} ${
                !photo.size || photo.size === "square" ? "aspect-square" : ""
              }`}
            >
              <img
                src={photo.src}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs uppercase tracking-[0.2em] text-white mb-1">
                  {photo.tag}
                </p>
                <p className="text-sm md:text-base font-medium text-white">{photo.event}</p>
                <p className="text-[11px] text-white/80">{photo.year}</p>
              </div>
            </button>
          ))}
        </div>

        
        <div className="space-y-6 hidden md:block">
          <h3 className="text-sm uppercase tracking-[0.25em] text-gray-500">
            curated moments
          </h3>
          <ul className="space-y-4 text-sm text-gray-700">
            {photos.slice(0, 5).map((p) => (
              <li
                key={p.id}
                className="flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-gray-300 cursor-pointer transition bg-white/50"
                onMouseEnter={() => setSpotlight(p)}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-200">
                  <img src={p.src} className="w-full h-full object-cover" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    {p.year} · {p.tag}
                  </p>
                  <p className="text-sm font-medium text-gray-900">{p.event}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </main>
  );
}
