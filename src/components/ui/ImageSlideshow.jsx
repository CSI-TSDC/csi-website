"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDESHOW_IMAGES = [
  "/assets/Home/Slideshow/Home_1.JPG",
  "/assets/Home/Slideshow/Home_2.JPG",
  "/assets/Home/Slideshow/Home_3.webp",
];

const SLIDESHOW_INTERVAL = 4000; // 4 seconds per image

export default function ImageSlideshow({ className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Wait for fade out, then change image
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
        setIsTransitioning(false);
      }, 300); // Half of transition duration
    }, SLIDESHOW_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {SLIDESHOW_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[600ms] ${
            index === currentIndex && !isTransitioning
              ? "opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            fill
            className="object-cover rounded-2xl"
            alt={`Slideshow image ${index + 1}`}
            priority={index === 0}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

