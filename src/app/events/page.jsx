"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";


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
      <div className="relative z-10">
      <section className="max-w-8xl mx-auto px-[5vw] pb-20 pt-32 md:pb-28 md:pt-40 grid md:grid-cols-[1fr_1fr] gap-8 items-start">
        <div className="space-y-4">
          <p className="uppercase text-[11px] tracking-[0.26em] font-poppins text-gray-600 w-max overflow-hidden">
            <span>
            CSI x TSDC Events
            </span>
          </p>

          <h1 className="text-[5vw] font-semibold font-poppins leading-tight w-max">
            <span className="block w-full overflow-hidden">
              <span><span className="text-blue-500">Meet,</span> Build</span>
            </span>
            <span className="block w-full overflow-hidden">
              <span>and Compete</span>
            </span>
          </h1>
          <div className="flex flex-wrap gap-2.5 text-base text-white">
            <span className="border border-gray-300 rounded-sm bg-yellow-300 text-black px-3 py-1.5 font-satoshi">
              #TechFests
            </span>
            <span className="border border-gray-300 rounded-sm bg-blue-500 px-3 py-1.5 font-satoshi">
              #GameDev
            </span>
            <span className="border border-gray-300 rounded-sm bg-orange-500 px-3 py-1.5 font-satoshi">
              #Workshops
            </span>
          </div>

          <p className="text-gray-600 max-w-xl text-base font-satoshi">
            A mix of learning, chaos, collaboration, and chai-powered breakthroughs. <br />
            Select the event you want to know more about below.
          </p>

          <div className="
            backdrop-blur-xl bg-gradient-to-br from-white/90 to-gray-50/90
            border border-gray-200/80
            rounded-3xl shadow-xl shadow-gray-200/50
            p-6
            w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]
            transition-all duration-300
            hover:shadow-2xl hover:shadow-gray-300/50
          ">
            <div className="flex flex-wrap gap-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm whitespace-nowrap font-satoshi font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
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
        <div className="flex flex-row w-full items-stretch gap-[14px]">
          <div className="flex flex-col w-max items-end gap-[14px]">
            <div className="w-[300px] h-[250px]">
              <img src="/assets/Teams/img3.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="w-[500px] h-[350px]">
              <img src="/assets/Teams/img5.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            {/* <div>
              <img src="/assets/Teams/over1.jpg" alt="" />
            </div> */}
          </div>
          <div className="flex flex-col w-max justify-start gap-[14px]">
            <div className="w-[300px] h-[150px]">
              <img src="/assets/Teams/img6.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="w-[300px] h-[450px]">
              <img src="/assets/Teams/img2.jpg" className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>
      </section>
     
      <section className="max-w-6xl mx-auto px-6 mb-6">
        
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
              <p className="text-lg md:text-xl font-semibold font-poppins text-gray-800">
                {eventDetails[activeFilter].date}
              </p>
            </div>

            {/* Event Description */}
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-base md:text-lg font-satoshi text-gray-700 leading-relaxed">
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
