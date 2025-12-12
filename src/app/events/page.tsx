"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import DotGrid from "../../components/ui/DotGrid";

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
      className="relative aspect-[4/5] md:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900"
    >
      <img
        ref={imgRef}
        src={spotlight?.src}
        className="w-full h-full object-cover scale-105 will-change-transform"
      />

    
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

     
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] md:text-xs z-20">
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

const filters = ["Hackathon", "Gaming Expo", "Tea Tech Talks",  "S.I.H.", "Blooper"];

const eventDetails = {
  "Hackathon": {
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=200&auto=format&fit=crop",
    date: "March 15-17, 2025",
    description: "Join us for an intense 48-hour coding marathon where innovation meets collaboration. Build groundbreaking projects, network with industry experts, and compete for exciting prizes. Whether you're a beginner or a seasoned developer, HackVision offers workshops, mentorship, and an unforgettable experience.",
    background: "#e6e6e6"
  },
  "Gaming Expo": {
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop",
    date: "Every Saturday, 10 AM - 2 PM",
    description: "Hands-on learning sessions covering the latest technologies and frameworks. Our workshops are designed for all skill levels, featuring expert instructors, real-world projects, and collaborative learning. Topics range from web development and mobile apps to AI/ML and cloud computing.",
    background: "#e6e6e6"
  },
  "Tea Tech Talks": {
    logo: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=200&auto=format&fit=crop",
    date: "April 5-6, 2025",
    description: "Dive into game development with Unity, Unreal Engine, and modern web technologies. Learn game design principles, create your own playable prototypes, and showcase your creations. Perfect for both aspiring game developers and experienced programmers looking to expand their skills.",
    background: "#e6e6e6"
  },
  "S.I.H.": {
    logo: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=200&auto=format&fit=crop",
    date: "Ongoing",
    description: "A collection of unforgettable moments from our events - from epic fails to breakthrough moments, late-night debugging sessions to celebration victories. These are the stories that make our community special.",
    background: "#e6e6e6"
  },
  "Blooper": {
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200&auto=format&fit=crop",
    date: "Ongoing",
    description: "The funniest, most memorable bloopers from our events. Because sometimes the best moments happen when things don't go as planned. Laugh along with us as we celebrate the human side of coding.",
    background: "#e6e6e6"
  }
};

export default function CSIGallery() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [spotlight, setSpotlight] = useState(photos[0]);

  const filteredPhotos =
    activeFilter === null
      ? []
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
      <section className="max-w-6xl mx-auto px-6 pb-20 pt-32 md:pb-28 md:pt-40 grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
        <div className="space-y-4">
          <p className="uppercase text-[11px] tracking-[0.26em] text-gray-600">
            CSI x TSDC Events
          </p>

          <h1 className="text-2xl md:text-4xl font-semibold leading-tight">
            Everything we host. <br />
            <span className="text-red-500">
              Everything we hustle for.
            </span>
          </h1>
          <div className="flex flex-wrap gap-2.5 text-base text-white">
            <span className="border border-gray-300 rounded-sm bg-yellow-300 text-black px-3 py-1.5">
              #TechFests
            </span>
            <span className="border border-gray-300 rounded-sm bg-blue-500 px-3 py-1.5">
              #GameDev
            </span>
            <span className="border border-gray-300 rounded-sm bg-orange-500 px-3 py-1.5">
              #Workshops
            </span>
          </div>

          <p className="text-gray-600 max-w-xl text-base">
            A mix of learning, chaos, collaboration, and chai-powered breakthroughs. <br />
            Select the event you want to know more about below.
          </p>
        </div>

        
        <div className="justify-self-center w-full max-w-sm sm:max-w-md md:max-w-[360px] lg:max-w-[420px]">
          <SpotlightImage spotlight={spotlight} />
        </div>
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

      {activeFilter && eventDetails[activeFilter] && (
        <section 
          className="max-w-6xl mx-auto px-6 pb-16 pt-8"
          style={{ backgroundColor: eventDetails[activeFilter].background }}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Event Logo */}
            <div className="flex justify-center">
              <img 
                src={eventDetails[activeFilter].logo} 
                alt={`${activeFilter} logo`}
                className="h-24 w-24 md:h-32 md:w-32 object-contain rounded-2xl"
              />
            </div>

            {/* Event Date */}
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold text-gray-800">
                {eventDetails[activeFilter].date}
              </p>
            </div>

            {/* Event Description */}
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {eventDetails[activeFilter].description}
              </p>
            </div>
          </div>
        </section>
      )}
      </div>
    </main>
  );
}
