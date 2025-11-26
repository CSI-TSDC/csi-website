"use client";

import { useState, useRef } from "react";

// Parallax Image Container Component
function ParallaxImageContainer({ image, alt }) {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate normalized position (0 to 1)
    const normalizedX = x / rect.width;
    const normalizedY = y / rect.height;

    // Calculate offset (subtle movement, max 10px)
    // Moving opposite to mouse direction
    const offsetX = (normalizedX - 0.5) * -10;
    const offsetY = (normalizedY - 0.5) * -10;

    setTransform({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="flex-shrink-0 w-full md:w-[50vw] h-20 md:h-[19vw] rounded-3xl overflow-hidden shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: `scale(1.2) translate(${transform.x}px, ${transform.y}px)`,
        }}
      />
    </div>
  );
}

const caseStudies = [
  {
    number: "01",
    title: "bath & body works",
    tags: ["Product Discovery", "AI"],
    subtitle: "Fragrance Finder",
    description:
      "Product Discovery and exploration through conversation with AI. Design systems, Rapid Prototyping, Conversation UI",
    image:
      "https://images.unsplash.com/photo-1763493411066-48cc93cc82db?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "#",
  },
  {
    number: "02",
    title: "another case study",
    tags: ["Research", "UX"],
    subtitle: "User Experience Study",
    description:
      "Product Discovery and exploration through conversation with AI. Design systems, Rapid Prototyping, Conversation UI",
    image:
      "https://images.unsplash.com/photo-1763493411066-48cc93cc82db?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "#",
  },
];

export default function CaseStudies() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Projects,{" "}
          <span className="text-red-500">See What We Build..</span>
        </h2>

      <hr className="mb-12 border-gray-200" />

      <div className="space-y-24">
        {caseStudies.map((study, idx) => (
          <article key={idx} className="space-y-6">
            
            <div className="flex items-center gap-6">
              
              <div className="text-6xl font-extralight text-gray-300 select-none min-w-[4rem] text-center">
                {study.number}
              </div>

       
              <div className="flex items-center justify-between w-full">

                <h3 className="text-4xl font-semibold lowercase tracking-wide">
                  {study.title}
                </h3>

                
                <div className="flex items-center gap-3 mr-[10px]">
                  {study.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-200 rounded-full px-3 py-0.5 font-semibold text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}

                  <a
                    href={study.url}
                    className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    aria-label={`Go to ${study.title} details`}
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            
            


            <div className="flex flex-col md:flex-row md:items-start gap-8">

              <ParallaxImageContainer
                image={study.image}
                alt={study.title}
              />


              <div className="flex-1 text-gray-600 ">
                <p className="text-center flex justify-center mt-24">
                  {study.description}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-8"></div>
          </article>
        ))}
      </div>
    </section>
  );
}
