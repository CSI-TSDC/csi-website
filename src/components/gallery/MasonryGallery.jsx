"use client";

import { useEffect, useState, useMemo, memo, useCallback } from "react";
import Image from "next/image";
import GallerySkeleton from "@/components/ui/GallerySkeleton";
import { loadGalleryPhotos } from "@/utils/galleryData";

/* ------------------ GALLERY ITEM ------------------ */

const GalleryItem = memo(function GalleryItem({
  photo,
  isLoaded,
  hasFailed,
  dimensions,
  onLoad,
  onError,
  onClick,
  loading,
  priority,
}) {
  if (hasFailed) {
    return (
      <div
        className="break-inside-avoid mb-4 opacity-0 pointer-events-none"
        style={{ height: 1 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="break-inside-avoid mb-4 group cursor-pointer"
      onClick={() => onClick(photo.src)}
    >
      <div className="relative overflow-hidden rounded-xl bg-neutral-900 shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98]">
        {/* Aspect-ratio wrapper */}
        <div
          className="relative w-full bg-neutral-900"
          style={{ aspectRatio: dimensions?.aspectRatio || "3 / 4" }}
        >
          <Image
            src={photo.src}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-300 group-hover:scale-110 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            alt={photo.event}
            loading={loading}
            priority={priority}
            unoptimized
            onLoad={(e) => onLoad(photo.id, e)}
            onError={() => onError(photo.id)}
          />

          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/20 via-neutral-500/40 to-neutral-700/20 animate-pulse rounded-xl" />
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Text */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
          <p className="text-sm font-semibold text-white">{photo.event}</p>
          <p className="text-xs text-white/70">{photo.year}</p>
        </div>
      </div>
    </div>
  );
});

/* ------------------ PAGE ------------------ */

export default function GalleryPage() {
  const PRELOAD_COUNT = 10;

  const [photos, setPhotos] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [imagesFailed, setImagesFailed] = useState({});
  const [imageDimensions, setImageDimensions] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  /* Load photos */
  useEffect(() => {
    async function fetchPhotos() {
      setIsLoadingPhotos(true);
      const loadedPhotos = await loadGalleryPhotos();
      setPhotos(loadedPhotos);
      setIsLoadingPhotos(false);
    }
    fetchPhotos();
  }, []);

  /* Prevent body scroll when preview is open */
  useEffect(() => {
    if (previewImage) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Re-enable scroll and restore position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [previewImage]);

  /* Image handlers */
  const handleLoad = useCallback((id, e) => {
    const img = e.target;
    setImagesLoaded((p) => ({ ...p, [id]: true }));
    setImageDimensions((p) => ({
      ...p,
      [id]: {
        aspectRatio: img.naturalWidth / img.naturalHeight,
      },
    }));
  }, []);

  const handleError = useCallback((id) => {
    setImagesFailed((p) => ({ ...p, [id]: true }));
    setImagesLoaded((p) => ({ ...p, [id]: true }));
  }, []);

  /* Filter by year ONLY */
  const filteredPhotos = useMemo(() => {
    return photos.filter(
      (p) => selectedYear === "All" || p.year === selectedYear
    );
  }, [photos, selectedYear]);

  const years = useMemo(
    () => ["All", ...Array.from(new Set(photos.map((p) => p.year))).sort()],
    [photos]
  );

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Year Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="text-center mb-1 md:mb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-csi-black mb-1 md:mb-2">Filter by Year</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 px-4">Select a year to view photos from that time</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full px-4">
            <button
              onClick={() => setSelectedYear("All")}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                selectedYear === "All"
                  ? "bg-csi-black text-csi-white shadow-lg scale-105"
                  : "bg-csi-white text-csi-black/80 border-2 border-csi-black/10 hover:border-csi-black/20 hover:shadow-md active:scale-95"
              }`}
            >
              All Years
            </button>
            {years.filter(year => year !== "All" && year !== "Year").map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                  selectedYear === year
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md active:scale-95"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-32">
        {isLoadingPhotos ? (
          <GallerySkeleton />
        ) : filteredPhotos.length === 0 ? (
          <p className="text-center text-gray-500">No photos found.</p>
        ) : (
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <GalleryItem
                key={`${selectedYear}-${photo.id}-${index}`}
                photo={photo}
                isLoaded={imagesLoaded[photo.id]}
                hasFailed={imagesFailed[photo.id]}
                dimensions={imageDimensions[photo.id]}
                onLoad={handleLoad}
                onError={handleError}
                onClick={setPreviewImage}
                loading={index < PRELOAD_COUNT ? "eager" : "lazy"}
                priority={index < PRELOAD_COUNT}
              />
            ))}
          </div>
        )}
      </section>

      {/* Preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-csi-black/95 z-[9999] animate-fadeIn flex items-center justify-center p-4 md:p-8"
        >
          {/* Close button */}
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-csi-white hover:text-csi-white/70 transition-colors z-10 bg-csi-black/50 rounded-full p-2 md:p-3"
            aria-label="Close preview"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <Image
            src={previewImage}
            width={1920}
            height={1080}
            className="max-w-full max-h-[90vh] md:max-h-[85vh] w-auto h-auto object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            alt="Preview"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}