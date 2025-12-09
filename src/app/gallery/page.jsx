"use client";

import { useState } from "react";

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
  const years = ["All", "2024", "2025", "2026"];

  const filteredPhotos = photos.filter((p) => {
    return selectedYear === "All" || p.year === selectedYear;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-16">
        <div className="grid md:grid-cols-[1.2fr,1fr] gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-black">
              The gallery
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              The internet&apos;s source for visuals.
            </p>
            <p className="text-sm text-gray-500 mb-8 flex items-center gap-2">
              Powered by creators everywhere.
            </p>
            <div className="relative mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search photos and illustrations"
                className="w-full pl-12 pr-14 py-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white text-base transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center hover:border-gray-600 transition-colors">
                  <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex flex-col justify-center items-center text-white">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Gallery Awards 2025</h3>
              <p className="text-sm text-white/80 text-center">The results are in. Celebrate this year&apos;s finalists 🎉</p>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-black rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Unlock everything</h3>
                <p className="text-sm text-gray-600 mb-1">Gallery+ has to offer.</p>
                <p className="text-xs text-gray-500">Cancel anytime.</p>
              </div>
              <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                Upgrade to Gallery+
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Year Selector */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black text-sm font-medium cursor-pointer hover:border-gray-400 transition-colors"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-4 group cursor-pointer"
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