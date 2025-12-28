"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GallerySkeleton from "@/components/ui/GallerySkeleton";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1763793927948-7faaa6adb479?q=80&w=687&auto=format&fit=crop",
    event: "HackVision",
    tag: "Hackathon",
    year: "2025",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop",
    event: "Web Dev Workshop",
    tag: "Workshop",
    year: "2026",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    event: "LAN Party",
    tag: "Game Night",
    year: "2025",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    event: "Code Jam",
    tag: "Hackathon",
    year: "2024",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    event: "Design Sprint",
    tag: "Workshop",
    year: "2024",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    event: "Tech Talk",
    tag: "Workshop",
    year: "2026",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
    event: "Hackathon Finals",
    tag: "Hackathon",
    year: "2025",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    event: "Networking Event",
    tag: "Workshop",
    year: "2024",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    event: "AI Workshop",
    tag: "Workshop",
    year: "2025",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    event: "Startup Pitch",
    tag: "Event",
    year: "2026",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    event: "Design Challenge",
    tag: "Workshop",
    year: "2024",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop",
    event: "Code Review",
    tag: "Workshop",
    year: "2025",
  },
];

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState("All");
  const highlightImages = photos.slice(0, 6);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});

  useEffect(() => {
    const id = setInterval(() => {
      setHighlightIndex((i) => (i + 1) % highlightImages.length);
    }, 3200);
    return () => clearInterval(id);
  }, [highlightImages.length]);

  const years = ["2024", "2025", "2026"];

  const filteredPhotos = photos.filter((p) => {
    return selectedYear === "All" || p.year === selectedYear;
  });

  // Handle year change with loading state
  const handleYearChange = (year) => {
    setIsLoading(true);
    setSelectedYear(year);
    // Reset loaded images for new filter
    setImagesLoaded({});
    
    // Auto-hide skeleton after a short delay (images will show as they load)
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Handle image load
  const handleImageLoad = (photoId) => {
    setImagesLoaded(prev => ({ ...prev, [photoId]: true }));
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 pb-12 pt-24 md:pb-8 md:pt-34 w-full gallery-bg">
        <div id="showcase-bg"></div>
        <div className="grid mx-auto max-w-6xl md:grid-cols-[1.15fr_1fr] gap-8 md:gap-16 items-center">
        <div className="space-y-3 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
            The CSI Showcase
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-black/80 leading-relaxed">
            A look back at the energy, creativity, and people behind CSI x TSDC.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-black/70 leading-relaxed">
            Explore our collection of memories from events, workshops, hackathon, and other activities held every year.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-black/60 leading-relaxed hidden sm:block">
            From tech fests to coding competitions, every moment captured tells a story of innovation and collaboration.
          </p>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[540px] overflow-hidden hidden md:block">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4 md:space-y-6">

            {/* Row 1 */}
            <div className="flex gap-2 md:gap-4">
              <Image
                src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
                width={200}
                height={120}
                className="w-[120px] h-[80px] md:w-[200px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
                width={160}
                height={120}
                className="w-[100px] h-[80px] md:w-[160px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
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
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                width={180}
                height={145}
                className="w-[110px] h-[90px] md:w-[180px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
                width={240}
                height={145}
                className="w-[140px] h-[90px] md:w-[240px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
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
                src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
                width={210}
                height={135}
                className="w-[125px] h-[85px] md:w-[210px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                width={260}
                height={135}
                className="w-[150px] h-[85px] md:w-[260px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
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
        {previewImage && (
          <div 
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 bg-black/95 z-[9999] animate-fadeIn flex items-center justify-center p-4 md:p-8"
          >
            {/* Close button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 md:p-3"
              aria-label="Close preview"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <Image 
              src={previewImage} 
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] md:max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              alt="Preview"
              unoptimized
              preload
            />
          </div>
        )}
      </section>

      {/* Year Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="text-center mb-1 md:mb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 md:mb-2">Filter by Year</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 px-4">Select a year to view photos from that time</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full px-4">
            <button
              onClick={() => handleYearChange("All")}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                selectedYear === "All"
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md active:scale-95"
              }`}
            >
              All Years
            </button>
            {years.filter(year => year !== "Year").map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                  selectedYear === year
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md active:scale-95"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-32">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 md:py-32 px-4">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium">No photos found for the selected year.</p>
            <button
              onClick={() => handleYearChange("All")}
              className="mt-4 px-5 py-2 sm:px-6 sm:py-2.5 bg-black text-white rounded-full hover:bg-gray-800 active:bg-gray-900 transition-colors cursor-pointer text-sm sm:text-base"
            >
              View All Photos
            </button>
          </div>
        ) : isLoading ? (
          <GallerySkeleton />
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-3 sm:mb-4 md:mb-5 lg:mb-6 group cursor-pointer"
                onClick={() => setPreviewImage(photo.src)}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98]">
                  <Image
                    src={photo.src}
                    width={1000}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={photo.event}
                    unoptimized
                    preload
                    onLoad={() => handleImageLoad(photo.id)}
                  />
                  {!imagesLoaded[photo.id] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl sm:rounded-2xl z-10 transition-opacity duration-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/90 mb-1 sm:mb-1.5 font-medium">
                      {photo.tag}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-white mb-0.5 sm:mb-1">{photo.event}</p>
                    <p className="text-[10px] sm:text-xs text-white/70">{photo.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}