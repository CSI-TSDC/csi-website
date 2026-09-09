"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

export default function GalleryLightbox({
  isOpen,
  onClose,
  photos = [],
  currentIndex = 0,
  onNavigate,
  eventTitle = "",
}) {
  const [touchStartX, setTouchStartX] = useState(null);

  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    window.__lenis?.stop();
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (window.__lenis) {
        window.__lenis.scrollTo(scrollY, { immediate: true });
        window.__lenis.start();
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/95 backdrop-blur-md select-none transition-all duration-300"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div
        className="w-full flex items-center justify-between px-4 sm:px-8 py-4 z-10 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <span className="text-xs font-mono uppercase tracking-widest text-csi-blue-300">
            {eventTitle}
          </span>
          <span className="text-sm sm:text-base font-semibold text-white/90">
            Photo {currentIndex + 1} of {photos.length}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer active:scale-95"
          aria-label="Close preview"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-90 hover:scale-105"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Center Active Image */}
        <div className="relative max-w-full max-h-[80vh] flex items-center justify-center">
          <Image
            key={currentPhoto.fullSrc || currentPhoto.src}
            src={currentPhoto.fullSrc || currentPhoto.src}
            alt={currentPhoto.event || eventTitle || "Gallery photograph"}
            width={1920}
            height={1080}
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            priority
            unoptimized
          />
        </div>

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-90 hover:scale-105"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Bar / Thumbnail dots & caption */}
      <div
        className="w-full px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 z-10 bg-gradient-to-t from-black/80 to-transparent text-xs text-white/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span>{currentPhoto.year || currentPhoto.fullYear ? `Archive ${currentPhoto.fullYear || currentPhoto.year}` : ""}</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[80vw] py-1 px-2 scrollbar-none">
          {photos.slice(0, 20).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex ? "w-6 bg-csi-blue-400" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
          {photos.length > 20 && (
            <span className="text-[10px] text-white/40 pl-1">+{photos.length - 20}</span>
          )}
        </div>

        <div className="hidden sm:block">
          <span>Use ← → keys or swipe to navigate</span>
        </div>
      </div>
    </div>
  );
}
