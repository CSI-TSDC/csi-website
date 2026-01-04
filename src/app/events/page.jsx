"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import EventCards from "@/components/Home/EventCards";

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

const filters = ["Envision", "HackVision", "Tea Tech Talks", "Smart India Hackathon"];

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
  "Aavishkar": {
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200&auto=format&fit=crop",
    date: "Ongoing",
    description: "The funniest, most memorable bloopers from our events. Because sometimes the best moments happen when things don't go as planned. Laugh along with us as we celebrate the human side of coding.",
    background: "#e6e6e6"
  }
};

export default function CSIGallery() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [spotlight, setSpotlight] = useState(photos[0]);
  
  // Refs for each article component
  const envisionRef = useRef(null);
  const hackvisionRef = useRef(null);
  const teaTechTalksRef = useRef(null);
  const sihRef = useRef(null);
  
  // Map filter names to article refs (in order: Envision, HackVision, Tea Tech Talks, Smart India Hackathon)
  const filterToRefMap = {
    "Envision": envisionRef,
    "HackVision": hackvisionRef,
    "Tea Tech Talks": teaTechTalksRef,
    "Smart India Hackathon": sihRef,
  };

  const filteredPhotos =
    activeFilter === null
      ? []
      : photos.filter((p) => p.tag === activeFilter);

  // Handle filter click with scroll to article
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    // Get the corresponding ref for this filter
    const targetRef = filterToRefMap[filter];
    
    // Scroll to the article after a short delay
    setTimeout(() => {
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  return (
    <main className="min-h-screen bg-csi-white text-csi-black relative px-4 sm:px-6 md:px-[5vw]">
      <div className="relative z-10 font-dm-sans-medium ">
      <section className="max-w-8xl mx-auto pb-12 sm:pb-16 md:pb-20 lg:pb-28 pt-24 sm:pt-32 md:pt-40 lg:pt-48 xl:pt-56 grid md:grid-cols-[1fr_1fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
        <div className="space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6 text-center md:text-left">
          <p className="uppercase text-xs sm:text-sm md:text-base tracking-[0.26em] text-gray-600 w-max overflow-hidden mx-auto md:mx-0">
            <span>
            CSI x TSDC Events
            </span>
          </p>

          <h1 className="text-[32px] sm:text-[48px] md:text-[5vw] font-semibold font-bespoke-sans-semibold leading-tight w-max mx-auto md:mx-0">
            <span className="block w-full overflow-hidden">
              <span><span className="text-csi-blue">Meet,</span> Build</span>
            </span>
            <span className="block w-full overflow-hidden">
              <span>and Compete</span>
            </span>
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 text-sm sm:text-base text-white justify-center md:justify-start">
            <span className="border border-gray-300 rounded-sm bg-yellow-300 text-csi-black px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm">
              #TechFests
            </span>
            <span className="border border-gray-300 rounded-sm bg-csi-blue px-2.5 sm:px-3 py-1 sm:py-1.5  text-xs sm:text-sm">
              #GameDev
            </span>
            <span className="border border-gray-300 rounded-sm bg-orange-500 px-2.5 sm:px-3 py-1 sm:py-1.5  text-xs sm:text-sm">
              #Workshops
            </span>
          </div>

          <p className="text-gray-600 text-left max-w-xl text-base sm:text-lg md:text-xl leading-relaxed mx-auto md:mx-0">
            A mix of learning, chaos, collaboration, and chai-powered breakthroughs. <br className="hidden sm:block" />
            Select the event you want to know more about below.
          </p>

          <div className="
            backdrop-blur-xl bg-gradient-to-br from-white/90 to-gray-50/90
            border border-gray-200/80
            rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50
            p-4 sm:p-5 md:p-6
            w-full md:max-w-[360px] lg:max-w-[400px]
            transition-all duration-300
            hover:shadow-2xl hover:shadow-gray-300/50
            sticky top-14 md:top-22 z-40
            mx-auto md:mx-0
          ">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                    onClick={() => handleFilterClick(f)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm whitespace-nowrap  font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                    activeFilter === f
                        ? "bg-gradient-to-r from-csi-blue-600 to-csi-blue-700 text-white shadow-lg shadow-csi-blue/30 border-2 border-csi-blue"
                        : "bg-csi-white text-gray-700 hover:text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative flex flex-row w-full items-stretch gap-2 sm:gap-3 md:gap-[14px] mt-6 md:mt-0 justify-center md:justify-start">
          <div className="flex flex-col w-max items-end gap-2 sm:gap-3 md:gap-[14px]">
            <div className="relative w-full md:w-[200px] lg:w-[250px] h-[100px] sm:h-[130px] md:h-[180px] lg:h-[220px]">
              <Image src="/assets/Events/Robot1.webp" className="w-12 sm:w-16 md:w-20 lg:w-24 h-auto top-2 sm:top-3 md:top-4 lg:top-5 -left-6 sm:-left-8 md:-left-10 lg:-left-12 absolute z-6" alt="" width={96} height={96} />
              <Image src="/assets/Events/Events3.webp" className="w-full h-full object-cover rounded-lg" alt="" fill />
            </div>
            <div className="relative w-[180px] flex-1 sm:w-[220px] md:w-[280px] lg:w-[350px] h-[140px] sm:h-[180px] md:h-[220px] lg:h-[280px]">
            <Image src="/assets/Events/space_invader.webp" className="w-12 sm:w-16 md:w-20 lg:w-24 bottom-0 left-0 absolute z-6" alt="" width={96} height={96} />
              <Image src="/assets/Events/Events2.webp" className="w-full h-full object-cover rounded-lg" alt="" fill />
            </div>
          </div>
          <div className="flex flex-col w-max justify-start gap-2 sm:gap-3 md:gap-[14px]">
            <div className="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px] h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px] relative">
              <Image src="/assets/Events/Events4.webp" className="w-full h-full object-cover rounded-lg" alt="" fill />
            </div>
            <div className="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px] h-[240px] sm:h-[280px] md:h-[320px] lg:h-[380px] relative">
              <Image src="/assets/Events/XO.webp" className="w-12 sm:w-16 md:w-20 lg:w-24 top-0 -left-10 sm:-left-12 md:-left-14 absolute -rotate-6 z-6" alt="" width={96} height={96} />
              <Image src="/assets/Events/geekcat.webp" className="w-12 sm:w-16 md:w-20 lg:w-24 h-auto bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 right-0 absolute rotate-6 z-6" alt="" width={96} height={96} />
              <Image src="/assets/Events/Events1.webp" className="w-full h-full object-cover rounded-lg" alt="" fill />
            </div>
          </div>
        </div>
      </section>
     
      <EventCards 
        envisionRef={envisionRef}
        hackvisionRef={hackvisionRef}
        teaTechTalksRef={teaTechTalksRef}
        sihRef={sihRef}
        cardClassName="w-full sm:w-[98%] md:w-[92%] lg:w-[88%] xl:w-[85%]"
      />
      <div className="text-center mt-12 md:mt-16">
          <p className="text-black/80 text-lg sm:text-xl md:text-2xl font-bespoke-sans-semibold">
            More events to come!
          </p>
      </div>
      </div>
    </main>
  );
}
