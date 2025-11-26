"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Events = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const [activeContent, setActiveContent] = useState({
    title: "EVENTS",
    description:
      "Explore our curated events that bring innovation, learning, and community together.",
  });

  
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.05 }
    );
  }, [activeContent]);


  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1763689389840-0afa417e0939",
      title: "WORKSHOP",
      description: "Hands-on learning experiences that empower participants with practical skills.",
      className: "absolute top-40 left-56 w-56 h-40",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1763667309360-30d7e3779382",
      title: "HACKATHON",
      description: "Innovation meets competition in our exciting coding challenges.",
      className: "absolute top-28 right-20 w-60 h-44",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1763742150863-1e1ce92195bc",
      title: "TECH TALK",
      description: "Engaging sessions with industry experts sharing cutting-edge insights.",
      className: "absolute bottom-16 left-24 w-72 h-48",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1763793927066-e737cd50bd1a",
      title: "NETWORKING",
      description: "Connect, collaborate, and build lasting relationships with peers.",
      className: "absolute bottom-24 right-32 w-64 h-52 mb-10",
    },
  ];


  const handleHover = (innerImg) => {
    gsap.to(innerImg, {
      scale: 1.25,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleHoverLeave = (innerImg) => {
    gsap.to(innerImg, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col py-20 px-6 overflow-hidden">
      {/* Header similar to Projects section */}
      <div className="w-full max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Events,{" "}
          <span className="text-red-500">Where Innovation Meets Community..</span>
        </h2>
        <hr className="mb-12 border-gray-200" />
      </div>

      {/* Interactive content area */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center min-h-[65vh]">
        {/* Middle content area */}
        <div className="text-center max-w-xl z-20">
          <h1 ref={titleRef} className="text-5xl font-light tracking-widest mb-4">
            {activeContent.title}
          </h1>
          <p ref={descRef} className="text-gray-600 text-lg">
            {activeContent.description}
          </p>
        </div>


        <div className="absolute inset-0 pointer-events-none cursor-pointer">
          {images.map((img) => (
            <div
              key={img.id}
              className={`${img.className} overflow-hidden shadow-lg pointer-events-auto`}
              style={{ position: "absolute" }}
              onMouseEnter={(e) => {
                const innerImage = e.currentTarget.querySelector("img");
                handleHover(innerImage);

                setActiveContent({ title: img.title, description: img.description });
              }}
              onMouseLeave={(e) => {
                const innerImage = e.currentTarget.querySelector("img");
                handleHoverLeave(innerImage);

                setActiveContent({
                  title: "EVENTS",
                  description:
                    "Explore our curated events that bring innovation, learning, and community together.",
                });
              }}
            >
              <img
                src={`${img.src}?auto=format&fit=crop&w=800&q=80`}
                alt={img.title}
                className="w-full h-full object-cover"
                style={{ transformOrigin: "center" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
