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
      className="w-full h-48 md:h-64 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: `scale(1.1) translate(${transform.x}px, ${transform.y}px)`,
        }}
      />
    </div>
  );
}

export default function ProjectCard({ project }) {
  const { number, title, tags, subtitle, description, image, githubUrl } = project;

  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <ParallaxImageContainer image={image} alt={title} />
        <div className="absolute top-4 left-4">
          <span className="text-4xl font-extralight text-white/80 select-none">
            {number}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-5 border-y py-2">
          <h3 className="text-2xl font-semibold tracking-wide mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {subtitle}
          </p>
        </div>

        <p className="text-gray-600 text-sm mb-5 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 rounded-full px-3 py-2.5 font-medium text-gray-700 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 flex-shrink-0 px-4 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
          >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

