"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDESHOW_IMAGES = [
  "/assets/Home/Slideshow/Home_1.JPG",
  "/assets/Home/Slideshow/Home_2.JPG",
  "/assets/Home/Slideshow/Home_3.webp",
];

const SLIDESHOW_INTERVAL = 4000; // 4 seconds per image
const TRANSITION_DURATION = 800; // 800ms for smooth slide transition

export default function ImageSlideshow({ className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidePosition, setSlidePosition] = useState(0); // 0 = center, -100 = left (off-screen)

  useEffect(() => {
    const interval = setInterval(() => {
      // Change index first
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
      
      // Start new image from left (off-screen)
      setSlidePosition(-100);
      
      // After a brief moment, trigger slide-in animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlidePosition(0); // Slide to center
        });
      });
    }, SLIDESHOW_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {SLIDESHOW_IMAGES.map((src, index) => {
        const isCurrent = index === currentIndex;
        const prevIndex = (currentIndex - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length;
        const isPrevious = index === prevIndex;
        
        // Determine z-index: current (sliding in) > previous (staying) > others
        let zIndex = 0;
        if (isCurrent) {
          zIndex = 20; // Highest - sliding in on top
        } else if (isPrevious) {
          zIndex = 10; // Previous - stays visible underneath
        }
        
        // Determine transform
        let transform = 'translateX(0)';
        if (isCurrent) {
          transform = `translateX(${slidePosition}%)`;
        }
        
        return (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              zIndex,
              transform,
              transition: isCurrent 
                ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                : 'none',
            }}
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
        );
      })}
    </div>
  );
}
