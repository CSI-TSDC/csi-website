"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const id = setInterval(() => {
      setHighlightIndex((i) => (i + 1) % highlightImages.length);
    }, 3200);
    return () => clearInterval(id);
  }, [highlightImages.length]);

  const years = ["Year", "2024", "2025", "2026"];

  const filteredPhotos = photos.filter((p) => {
    return selectedYear === "All" || p.year === selectedYear;
  });

  return (
    <div className="min-h-screen bg-[#E6E6E6]">
      {/* Hero Section */}
      <section className="px-6 pb-20 pt-32 md:pb-28 md:pt-40 w-full gallery-bg">
        <div id="showcase-bg"></div>
        <div className="grid mx-auto max-w-6xl md:grid-cols-[1.15fr,1fr] gap-10 items-center">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            The CSI Showcase
          </h1>

          <p className="text-lg md:text-xl text-white/80">
            A look back at the energy, creativity, and people behind CSI x TSDC.
          </p>

          <p className="text-base md:text-lg text-white/70">
            Explore our collection of memories from events, workshops, hackathon, and other activities held every year.
          </p>

          <p className="text-sm md:text-base text-white/60">
            From tech fests to coding competitions, every moment captured tells a story of innovation and collaboration.
          </p>
        </div>
          <div className="hidden md:block">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xl">
              <img
                key={highlightImages[highlightIndex].id}
                src={highlightImages[highlightIndex].src}
                alt={highlightImages[highlightIndex].event}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="space-y-1 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                    Recent Highlights
                  </p>
                  <p className="text-lg md:text-xl font-semibold">
                    {highlightImages[highlightIndex].event}
                  </p>
                  <p className="text-xs md:text-sm text-white/70">
                    {highlightImages[highlightIndex].year} · {highlightImages[highlightIndex].tag}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {highlightImages.map((item, i) => (
                    <span
                      key={item.id}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        i === highlightIndex ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {previewImage && (
          <div 
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 bg-white z-[9999] animate-fadeIn"
          >
            <img 
              src={previewImage} 
              className="absolute top-[50px] left-[50px] max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>

      {/* Year Selector */}
      <section className="max-w-7xl mx-auto my-14">
        <div className="flex justify-center items-center">
          <div className="relative inline-block">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-300 rounded-2xl px-8 py-4 pr-12 text-lg font-semibold text-gray-800 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md min-w-[200px]"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => setPreviewImage(photo.src)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-neutral-900">
                <img
                  src={photo.src}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={photo.event}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs uppercase tracking-[0.2em] text-white mb-1">
                    {photo.tag}
                  </p>
                  <p className="text-sm md:text-base font-medium text-white">{photo.event}</p>
                  <p className="text-[11px] text-white/80">{photo.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}