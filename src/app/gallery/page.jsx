"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import GallerySkeleton from "@/components/ui/GallerySkeleton";
import { loadGalleryPhotos } from "@/utils/galleryData";

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState("All");
  const [photos, setPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [imagesFailed, setImagesFailed] = useState({});
  
  // Refs for cleanup and debouncing
  const timeoutRef = useRef(null);
  const previousYearRef = useRef("All");
  const isChangingYearRef = useRef(false);
  const activeYearChangeRef = useRef(null);

  // Load gallery photos on mount
  useEffect(() => {
    async function fetchPhotos() {
      setIsLoadingPhotos(true);
      const loadedPhotos = await loadGalleryPhotos();
      setPhotos(loadedPhotos);
      setIsLoadingPhotos(false);
      console.log(`[Gallery] Loaded ${loadedPhotos.length} photos`);
    }
    fetchPhotos();
  }, []);

  // Get unique years from photos
  const years = ["All", ...Array.from(new Set(photos.map(p => p.year))).sort()];

  const highlightImages = photos.slice(0, 6);
  
  useEffect(() => {
    if (highlightImages.length > 0) {
      const id = setInterval(() => {
        setHighlightIndex((i) => (i + 1) % highlightImages.length);
      }, 3200);
      return () => clearInterval(id);
    }
  }, [highlightImages.length]);

  const filteredPhotos = photos.filter((p) => {
    return (selectedYear === "All" || p.year === selectedYear) && !imagesFailed[p.id];
  });

  // Handle year change with proper cleanup and debouncing
  const handleYearChange = useCallback((year) => {
    // Prevent rapid consecutive changes to the same year
    if (year === previousYearRef.current) {
      return;
    }

    // Clear any pending timeouts from previous changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Track this specific year change
    const changeId = Date.now();
    activeYearChangeRef.current = changeId;
    isChangingYearRef.current = true;
    
    setIsLoading(true);
    setSelectedYear(year);
    
    // Reset loaded state for images that will be newly visible
    // Only preserve state for images that were already visible and will remain visible
    setImagesLoaded(prev => {
      const newState = {};
      photos.forEach(photo => {
        const willBeVisible = (year === "All" || photo.year === year);
        const wasVisible = (previousYearRef.current === "All" || photo.year === previousYearRef.current);
        // Only preserve if it was visible AND will remain visible AND was already loaded
        if (willBeVisible && wasVisible && prev[photo.id]) {
          newState[photo.id] = true;
        }
        // Otherwise, reset to unloaded state so skeleton shows
      });
      return newState;
    });
    
    // Reset failed state for newly visible images
    setImagesFailed(prev => {
      const newState = {};
      photos.forEach(photo => {
        const willBeVisible = (year === "All" || photo.year === year);
        const wasVisible = (previousYearRef.current === "All" || photo.year === previousYearRef.current);
        // Only preserve if it was visible AND will remain visible AND was already failed
        if (willBeVisible && wasVisible && prev[photo.id]) {
          newState[photo.id] = true;
        }
      });
      return newState;
    });
    
    // Auto-hide skeleton after a delay, but only if this is still the active change
    timeoutRef.current = setTimeout(() => {
      // Only update if this timeout is for the current change
      if (activeYearChangeRef.current === changeId) {
        setIsLoading(false);
        isChangingYearRef.current = false;
        timeoutRef.current = null;
      }
    }, 500);
  }, [photos]);

  // Sync previousYearRef when selectedYear actually changes
  useEffect(() => {
    previousYearRef.current = selectedYear;
  }, [selectedYear]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      isChangingYearRef.current = false;
    };
  }, []);

  // Prevent body scroll when preview is open
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

  // Handle image load
  const handleImageLoad = useCallback((photoId) => {
    setImagesLoaded(prev => {
      const newState = { ...prev, [photoId]: true };
      return newState;
    });
  }, []);

  // Handle image error - try alternative extensions or mark as failed
  const handleImageError = useCallback((photoId) => {
    console.warn(`[Gallery] Image failed to load: ${photoId}`);
    setImagesFailed(prev => ({ ...prev, [photoId]: true }));
    setImagesLoaded(prev => ({ ...prev, [photoId]: true })); // Mark as "loaded" to hide skeleton
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 pb-12 pt-24 md:pb-8 md:pt-34 w-full gallery-bg">
        <div id="showcase-bg"></div>
        <div className="grid mx-auto max-w-6xl md:grid-cols-[1.15fr_1fr] gap-8 md:gap-16 items-center">
        <div className="space-y-3 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-csi-black leading-tight">
            The CSI Showcase
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-csi-black/80 leading-relaxed">
            A look back at the energy, creativity, and people behind CSI x TSDC.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-csi-black/70 leading-relaxed">
            Explore our collection of memories from events, workshops, hackathon, and other activities held every year.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-csi-black/60 leading-relaxed hidden sm:block">
            From tech fests to coding competitions, every moment captured tells a story of innovation and collaboration.
          </p>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[540px] overflow-hidden hidden md:block">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-4 md:space-y-6">

            {/* Row 1 */}
            <div className="flex gap-2 md:gap-4">
              <Image
                src="/assets/Gallery_Hero/Gallery_T1.webp"
                width={200}
                height={120}
                className="w-[120px] h-[80px] md:w-[200px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_T2.webp"
                width={160}
                height={120}
                className="w-[100px] h-[80px] md:w-[160px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_T3.webp"
                width={220}
                height={120}
                className="w-[130px] h-[80px] md:w-[220px] md:h-[120px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
            </div>

            {/* Row 2 */}
            <div className="flex gap-2 md:gap-4 translate-x-4 md:translate-x-14">
              <Image
                src="/assets/Gallery_Hero/Gallery_First.webp"
                width={180}
                height={145}
                className="w-[110px] h-[90px] md:w-[180px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_Middle.webp"
                width={240}
                height={145}
                className="w-[140px] h-[90px] md:w-[240px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
                width={150}
                height={145}
                className="w-[90px] h-[90px] md:w-[150px] md:h-[145px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
            </div>

            {/* Row 3 — FIXED */}
            <div className="flex gap-2 md:gap-4 translate-x-2 md:translate-x-6">
              <Image
                src="/assets/Gallery_Hero/Gallery_B1.webp"
                width={210}
                height={135}
                className="w-[125px] h-[85px] md:w-[210px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_B2.webp"
                width={260}
                height={135}
                className="w-[150px] h-[85px] md:w-[260px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
              <Image
                src="/assets/Gallery_Hero/Gallery_B3.webp"
                width={190}
                height={135}
                className="w-[115px] h-[85px] md:w-[190px] md:h-[135px] object-cover rounded-xl md:rounded-2xl"
                alt=""
                unoptimized
                preload
              />
            </div>

          </div>
        </div>


        </div>
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
              preload
            />
          </div>
        )}
      </section>

      {/* Year Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <div className="text-center mb-1 md:mb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-csi-black mb-1 md:mb-2">Filter by Year</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 px-4">Select a year to view photos from that time</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full px-4">
            <button
              onClick={() => handleYearChange("All")}
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
                onClick={() => handleYearChange(year)}
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

      {/* Masonry Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-32">
        {isLoadingPhotos ? (
          <GallerySkeleton />
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-16 md:py-32 px-4">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium">No photos found for the selected year.</p>
            <button
              onClick={() => handleYearChange("All")}
              className="mt-4 px-5 py-2 sm:px-6 sm:py-2.5 bg-csi-black text-csi-white rounded-full hover:bg-csi-black/90 active:bg-csi-black transition-colors cursor-pointer text-sm sm:text-base"
            >
              View All Photos
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredPhotos.map((photo, index) => {
              // Skip rendering if image failed to load
              if (imagesFailed[photo.id]) {
                return null;
              }
              
              // Use src path as part of key to ensure uniqueness (handles duplicate IDs in manifest)
              const uniqueKey = `${photo.id}-${photo.src}-${index}`;
              
              return (
                <div
                  key={uniqueKey}
                  className="break-inside-avoid mb-3 sm:mb-4 md:mb-5 lg:mb-6 group cursor-pointer"
                  onClick={() => setPreviewImage(photo.src)}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98]">
                    <div className="relative w-full">
                    <Image
                      src={photo.src}
                      width={1000}
                      height={1000}
                        className={`w-full h-auto object-cover transition-all duration-300 group-hover:scale-110 ${!imagesLoaded[photo.id] && !imagesFailed[photo.id] ? 'opacity-0' : 'opacity-100'}`}
                      alt={photo.event}
                      unoptimized
                        loading="lazy"
                        onLoad={() => {
                          handleImageLoad(photo.id);
                        }}
                        onError={() => {
                          handleImageError(photo.id);
                        }}
                    />
                      {!imagesLoaded[photo.id] && !imagesFailed[photo.id] && (
                        <div className="absolute inset-0 bg-gradient-to-br from-csi-black/10 via-csi-white/50 to-csi-black/10 animate-pulse rounded-xl sm:rounded-2xl z-10" />
                    )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-csi-black/90 via-csi-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-white mb-0.5 sm:mb-1">{photo.event}</p>
                      <p className="text-[10px] sm:text-xs text-white/70">{photo.year}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}