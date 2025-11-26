"use client";

import { useState, useRef } from "react";

// Parallax Image Container Component
function ParallaxImageContainer({ image, alt, url }) {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !circleRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // ---------- PARALLAX (pure image ke liye same) ----------
    const normalizedX = mouseX / rect.width;
    const normalizedY = mouseY / rect.height;
    const offsetX = (normalizedX - 0.5) * -10;
    const offsetY = (normalizedY - 0.5) * -10;
    setTransform({ x: offsetX, y: offsetY });

    // ---------- CENTER SQUARE AREA LOGIC ----------
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // square size: image ke min(width,height) ka 50%
    // isko tu change kar sakta: 0.4 / 0.6 etc.
    const squareSize = Math.min(rect.width, rect.height) * 0.7;
    const halfSquare = squareSize / 2;

    const left = centerX - halfSquare;
    const right = centerX + halfSquare;
    const top = centerY - halfSquare;
    const bottom = centerY + halfSquare;

    const insideSquare =
      mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;

    if (insideSquare) {
      // circle dikhao + cursor follow
      setHover(true);
      const radius = 64; // circle radius (w-32/h-32 => 128/2)
      circleRef.current.style.transform = `translate(${mouseX - radius}px, ${
        mouseY - radius
      }px)`;
    } else {
      // square se bahar → circle hatao
      setHover(false);
      circleRef.current.style.transform = "translate(-9999px, -9999px)";
    }
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    setHover(false);

    if (circleRef.current) {
      circleRef.current.style.transform = "translate(-9999px, -9999px)";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-shrink-0 w-full md:w-[50vw] h-20 md:h-[19vw] rounded-3xl overflow-hidden shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: `scale(1.2) translate(${transform.x}px, ${transform.y}px)`,
        }}
      />

      {/* Cursor-follow Black Circle with marquee text (ONLY inside center square) */}
      <div
        ref={circleRef}
        className={`absolute top-0 left-0 w-48 h-48 rounded-full bg-black/80 text-white flex items-center justify-center pointer-events-none overflow-hidden will-change-transform transition-opacity duration-150 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: "translate(-9999px, -9999px)", // initial off-screen
        }}
      >
        <div className="whitespace-nowrap animate-marquee text-sm font-semibold px-4">
          GitHub Link • GitHub Link • GitHub Link • GitHub Link •
        </div>
      </div>

      {/* Click handler ONLY active while hover true */}
      {hover && (
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => window.open(url, "_blank")}
        />
      )}
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
    url: "https://github.com/",
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
    url: "https://github.com/",
  },
];

export default function CaseStudies() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
        Projects, <span className="text-red-500">See What We Build..</span>
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
                url={study.url}
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
