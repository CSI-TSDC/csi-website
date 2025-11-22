'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Gallery = () => {

  const localImage = "https://images.unsplash.com/photo-1763063462165-94125cccf210?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const images = [
    localImage,
    "https://images.unsplash.com/photo-1762543787011-186cfe6f1019?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1763063462165-94125cccf210?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1763037152018-c1ba095c8532?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1762998577858-ceb61c5d4974?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];


  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  itemsRef.current = [];

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const imgs = itemsRef.current.map((card) => card.querySelector("img"));

    gsap.set(imgs, {
      filter: "grayscale(100%)",
      scale: 1,
    });
    gsap.set(itemsRef.current, { opacity: 0, y: 20 });

    gsap.to(itemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.07,
      ease: "power3.out",
    });

    gsap.to(imgs, {
      filter: "grayscale(100%)",
      duration: 0.3,
      stagger: 0.07,
    });

    const handleMouseEnter = (e) => {
      const img = e.currentTarget.querySelector("img");
      gsap.to(img, { filter: "grayscale(0%)", scale: 1.03, duration: 0.4, ease: "power2.out" });
    };
    const handleMouseLeave = (e) => {
      const img = e.currentTarget.querySelector("img");
      gsap.to(img, { filter: "grayscale(100%)", scale: 1, duration: 0.45, ease: "power2.out" });
    };

    itemsRef.current.forEach((card) => {
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      itemsRef.current.forEach((card) => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
      gsap.killTweensOf(imgs);
      gsap.killTweensOf(itemsRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 overflow-hidden" ref={containerRef}>
      <h2 className="text-[4vw] flex justify-center font-semibold mb-6 underline">Memories of hapiness</h2>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
        {images.map((src, i) => (
          <div
            ref={addToRefs}
            key={i}
            className="gallery-card break-inside-avoid rounded-xl mb-4 overflow-hidden bg-white shadow-lg"
            style={{
              display: "inline-block",
              width: "100%",
            }}
          >
            <img
              src={src}
              alt={`gallery-${i}`}
              className="w-full h-auto object-cover block"
              loading="lazy"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
