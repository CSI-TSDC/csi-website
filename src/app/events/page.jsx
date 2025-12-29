"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import TechWeek from "@/components/ui/TechWeek";

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
  const techWeekRef = useRef(null);
  
  // Map filter names to article refs
  const filterToRefMap = {
    "Tech Week": techWeekRef,
    "Hackathon": hackvisionRef,
    "Gaming Expo": envisionRef,
    "Tea Tech Talks": teaTechTalksRef,
    "S.I.H.": sihRef,
    "Blooper": envisionRef,
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
    <main className="min-h-screen bg-white text-black relative px-4 sm:px-6 md:px-[5vw]">
      <div className="relative z-10">
      <section className="max-w-8xl mx-auto pb-12 sm:pb-16 md:pb-20 lg:pb-28 pt-20 sm:pt-24 md:pt-32 lg:pt-40 grid md:grid-cols-[1fr_1fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <p className="uppercase text-[10px] sm:text-[11px] tracking-[0.26em] font-poppins text-gray-600 w-max overflow-hidden">
            <span>
            CSI x TSDC Events
            </span>
          </p>

          <h1 className="text-[6vw] sm:text-[5.5vw] md:text-[5vw] font-semibold font-poppins leading-tight w-max">
            <span className="block w-full overflow-hidden">
              <span><span className="text-blue-500">Meet,</span> Build</span>
            </span>
            <span className="block w-full overflow-hidden">
              <span>and Compete</span>
            </span>
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 text-sm sm:text-base text-white">
            <span className="border border-gray-300 rounded-sm bg-yellow-300 text-black px-2.5 sm:px-3 py-1 sm:py-1.5 font-satoshi text-xs sm:text-sm">
              #TechFests
            </span>
            <span className="border border-gray-300 rounded-sm bg-blue-500 px-2.5 sm:px-3 py-1 sm:py-1.5 font-satoshi text-xs sm:text-sm">
              #GameDev
            </span>
            <span className="border border-gray-300 rounded-sm bg-orange-500 px-2.5 sm:px-3 py-1 sm:py-1.5 font-satoshi text-xs sm:text-sm">
              #Workshops
            </span>
          </div>

          <p className="text-gray-600 max-w-xl text-sm sm:text-base font-satoshi leading-relaxed">
            A mix of learning, chaos, collaboration, and chai-powered breakthroughs. <br className="hidden sm:block" />
            Select the event you want to know more about below.
          </p>

          <div className="
            backdrop-blur-xl bg-gradient-to-br from-white/90 to-gray-50/90
            border border-gray-200/80
            rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50
            p-4 sm:p-5 md:p-6
            w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]
            transition-all duration-300
            hover:shadow-2xl hover:shadow-gray-300/50
            sticky top-14 md:top-22 z-40
          ">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => handleFilterClick("Tech Week")}
                className="relative p-[2px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                <span className="
                  block px-4 sm:px-5 py-2 sm:py-2.5 rounded-full
                  bg-white text-gray-800 text-[10px] sm:text-xs md:text-sm
                  font-satoshi font-medium
                  hover:bg-gray-50
                ">
                  TECH WEEK
                </span>
              </button>
              {filters.map((f) => (
                <button
                  key={f}
                    onClick={() => handleFilterClick(f)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm whitespace-nowrap font-satoshi font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                    activeFilter === f
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 border-2 border-blue-600"
                        : "bg-white text-gray-700 hover:text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative hidden md:flex flex-row w-full items-stretch gap-2 sm:gap-3 md:gap-[14px]">
          <div className="flex flex-col w-max items-end gap-2 sm:gap-3 md:gap-[14px]">
            <div className="relative w-[200px] sm:w-[250px] md:w-[300px] h-[180px] sm:h-[200px] md:h-[250px]">
              <img src="/assets/Events/Robot1.png" className="w-20 sm:w-24 md:w-28 h-auto top-3 sm:top-4 md:top-5 -left-10 sm:-left-12 md:-left-14 absolute" alt="" />
              <img src="/assets/Events/Events3.webp" className="w-full h-full object-cover rounded-lg" alt="" />
            </div>
            <div className="relative w-[300px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[300px] md:h-[350px]">
            <img src="/assets/Events/space_invader.png" className="w-20 sm:w-24 md:w-28 bottom-0 left-0 absolute" alt="" />
              <img src="/assets/Events/Events2.webp" className="w-full h-full object-cover rounded-lg" alt="" />
            </div>
          </div>
          <div className="flex flex-col w-max justify-start gap-2 sm:gap-3 md:gap-[14px]">
            <div className="w-[200px] sm:w-[250px] md:w-[300px] h-[120px] sm:h-[130px] md:h-[150px]">
              <img src="/assets/Events/Events4.webp" className="w-full h-full object-cover rounded-lg" alt="" />
            </div>
            <div className="w-[200px] sm:w-[250px] md:w-[300px] h-[320px] sm:h-[380px] md:h-[450px] relative">
              <img src="/assets/Events/XO.png" className="w-20 sm:w-24 md:w-28 top-0 -left-14 absolute -rotate-6" alt="" />
              <img src="/assets/Events/geekcat.png" className="w-20 sm:w-24 md:w-28 h-auto bottom-3 sm:bottom-4 md:bottom-5 right-0 absolute rotate-6" alt="" />
              <img src="/assets/Events/Events1.webp" className="w-full h-full object-cover rounded-lg" alt="" />
            </div>
          </div>
        </div>
      </section>
     
      <div className="relative px-4 sm:px-8 md:px-15 mt-8 sm:mt-12 md:mt-15 pb-20 sm:pb-24 md:pb-32">
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                
                {/* Event Card 1 - Envision */}
                <article ref={envisionRef} className="relative w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] rounded-2xl sm:rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[280px] sm:min-h-[320px] md:min-h-[360px]">
                {/* Background image */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img 
                    className="w-full h-full object-cover" 
                    src="/assets/Home/events/envisionbg.png" 
                    alt="Envision Background" 
                    />
                </div>

                {/* Background pattern with stars */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                    <div className="absolute top-16 left-16 sm:top-32 sm:left-32 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-16 left-12 sm:bottom-32 sm:left-24 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-16 sm:bottom-20 sm:right-32 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-12 h-full">
                    <img 
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 flex-shrink-0 object-contain" 
                    src="/assets/Logos/envision_logo.png" 
                    alt="Envision Logo" 
                    />
                    <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl font-poppins-medium text-center sm:text-left leading-relaxed">
                    Envision is our Tech Fest held once a year that brings together innovators, creators, and visionaries from across the tech community. Join us for an unforgettable experience filled with inspiring talks, and networking opportunities.
                    </p>
                </div>

                {/* Among3 overlay on left side */}
                <div className="absolute -right-4 sm:-right-6 md:-right-8 lg:-right-12 bottom-0 z-20 pointer-events-none hidden sm:block">
                    <img 
                    src="/assets/Home/events/among.png" 
                    alt="Among3 decoration" 
                    className="w-12 sm:w-16 md:w-20 lg:w-24 h-auto scale-x-[-1]"
                    />
                </div>
                </article>

                {/* Event Card 2 - HackVision */}
                <article ref={hackvisionRef} className="relative w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] rounded-2xl sm:rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[280px] sm:min-h-[320px] md:min-h-[360px]">
                {/* Background image */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img 
                    className="w-full h-full object-cover" 
                    src="/assets/Home/events/hackvisionbg.png" 
                    alt="HackVision Background"
                    />
                </div>

                {/* Background pattern with stars */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                    <div className="absolute top-16 left-16 sm:top-32 sm:left-32 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-16 left-12 sm:bottom-32 sm:left-24 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-16 sm:bottom-20 sm:right-32 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
                </div>

                {/* Computer decoration on left */}
                <div className="absolute left-0 bottom-4 sm:bottom-6 -translate-x-1/3 sm:-translate-x-1/4 z-20 pointer-events-none hidden sm:block">
                    <img 
                    src="/assets/Home/events/computer.png" 
                    alt="Computer decoration" 
                    className="w-24 sm:w-32 md:w-40 lg:w-44 h-auto animate-float"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center">
                    {/* HackVision Logo - Centered and Big */}
                    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex justify-center">
                    <img 
                        className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:w-[65%] xl:w-[85%] h-auto" 
                        src="/assets/Logos/hackvision_logo.png" 
                        alt="HackVision Logo" 
                    />
                    </div>
                    
                    <div className="text-center px-2 sm:px-0">
                    {/* Calendar and Location in one line */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 flex-wrap">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white/90 font-medium font-satoshi uppercase text-xs sm:text-sm md:text-base">Coming Soon</span>
                        </div>

                        {/* Dot separator */}
                        <span className="text-white/80 text-sm sm:text-base md:text-lg">•</span>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-white/90 font-medium font-satoshi uppercase text-xs sm:text-sm md:text-base">At TSDC</span>
                        </div>
                    </div>

                    <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-satoshi uppercase leading-relaxed px-2">
                    24 hours of coding, creativity, and chaos.
                    </p>
                    </div>
                </div>
                </article>

                {/* Event Card 3 - Tea Tech Talks */}
                <article ref={teaTechTalksRef} className="relative w-full flex justify-center items-center sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] rounded-2xl sm:rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[280px] sm:min-h-[320px] md:min-h-[360px]">
                  
                  {/* Background image */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="/assets/Home/events/teatechtalkbg.png"
                      alt="Tea Tech Talks Background"
                    />
                  </div>

                  {/* Stars */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute top-24 left-28 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute top-12 right-20 w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="absolute bottom-28 left-20 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute bottom-16 right-32 w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Content — same layout as card 1 */}
                  <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full h-full">

                    {/* Logo */}
                    <img
                      className="w-24 sm:w-32 md:w-44 lg:w-52 flex-shrink-0 object-contain"
                      src="/assets/Logos/teatechtalk_logo.svg"
                      alt="Tea Tech Talks Logo"
                    />

                    {/* Text */}
                    <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl font-poppins-regular text-center sm:text-left leading-relaxed">
                      A student-led coding session held every working Saturday where students teach students. It&apos;s a casual,
                      interactive, and fun space to learn, build, and explore tech together — no faculty, no pressure,
                      just hands-on learning.
                    </p>

                  </div>

                  {/* Sticker */}
                  <div className="absolute -right-8 md:-right-10 -translate-y-4 top-0 z-20 pointer-events-none hidden sm:block">
                    <img
                      src="/assets/Home/events/sticker1.png"
                      alt="Decoration"
                      className="w-40 rotate-8"
                    />
                  </div>
                </article>

                {/* Event Card 4 - SIH */}
                <article ref={sihRef} className="relative text-black w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[280px] sm:min-h-[320px] md:min-h-[360px]">
                  
                  {/* Background image */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="/assets/Home/events/SIHbg.png"
                      alt="Smart India Hackathon Background"
                    />
                  </div>

                  {/* Stars */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute top-24 left-28 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute top-12 right-20 w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="absolute bottom-28 left-20 w-1 h-1 bg-white rounded-full" />
                    <div className="absolute bottom-16 right-32 w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Content — same layout as card 1 */}
                  <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">

                    <div className="flex flex-col w-full sm:w-2/3 relative sm:relative z-10">
                      <div className="">
                        <div className="flex items-center">
                          <img src="/assets/Home/events/SIH_logo.png" alt="SIH logo" className="w-16 h-auto mr-4 mb-4 object-contain" />
                          <span className="block text-xl">
                            <span>SMART INDIA HACKATHON</span>
                          </span>
                        </div>
                        <div>

                        </div>
                      </div>
                      <div className="flex-1">
                            {/* Text */}
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-poppins-regular text-left leading-relaxed">
                          Smart India Hackathon is a nationwide innovation challenge where students team up to solve real-world problems using technology and creativity. It&apos;s a high-energy platform that sparks out-of-the-box thinking, teamwork, and practical problem-solving.
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:block absolute top-0 right-0 h-full w-1/3">
                      <img src="/assets/Home/events/SIHoverlay.png" alt="SIH Picture" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </article>
            </div>
        </div>
      </div>
    </main>
  );
}
