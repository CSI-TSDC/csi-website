"use client";

import { useEffect, useState, useRef, useMemo, memo } from "react";
import Image from "next/image";

// Memoized gallery item to prevent re-renders when layout shifts
const GalleryItem = memo(function GalleryItem({ 
  photo, 
  isLoaded, 
  hasFailed, 
  dimensions, 
  onLoad, 
  onError, 
  onClick 
}) {
  const aspectRatio = dimensions?.aspectRatio || 0.75;
  const baseWidth = 250;
  const estimatedHeight = Math.max(baseWidth / aspectRatio, 200);
  const uniqueKey = `${photo.id}-${photo.src}`;

  if (hasFailed) {
    return (
      <div 
        className="break-inside-avoid mb-2 sm:mb-4 md:mb-5 lg:mb-6 opacity-0 pointer-events-none"
        style={{ height: '1px' }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="break-inside-avoid mb-2 sm:mb-4 md:mb-5 lg:mb-6 group cursor-pointer"
      style={{
        contain: 'layout style paint',
      }}
      onClick={() => onClick(photo.src)}
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98] w-full">
        <div 
          className="relative w-full bg-neutral-900"
          style={{
            height: `${estimatedHeight}px`,
            minHeight: '200px',
            aspectRatio: aspectRatio
          }}
        >
          <Image
            key={uniqueKey}
            src={photo.src}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-300 group-hover:scale-110 ${
              !isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              willChange: 'opacity',
              transition: 'opacity 0.3s ease-in-out'
            }}
            alt={photo.event}
            unoptimized
            loading="lazy"
            onLoad={(e) => onLoad(photo.id, e)}
            onError={() => onError(photo.id)}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-csi-black/10 via-csi-white/50 to-csi-black/10 animate-pulse rounded-xl sm:rounded-2xl z-10" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-csi-black/90 via-csi-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
          <p className="text-xs sm:text-sm md:text-base font-semibold text-white mb-0.5 sm:mb-1">{photo.event}</p>
          <p className="text-[10px] sm:text-xs text-white/70">{photo.year}</p>
        </div>
      </div>
    </div>
  );
});

export default function MasonryGallery({
  photos,
  selectedYear,
  imagesLoaded,
  imagesFailed,
  imageDimensions,
  onImageLoad,
  onImageError,
  onPreviewClick,
}) {
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const observerRef = useRef(null);
  const loadMoreTriggerRef = useRef(null);
  const batchSize = 20; // Load 20 images at a time

  // Filter photos by year (do NOT filter out failed images to keep array stable)
  const filteredPhotos = photos.filter((p) => {
    return selectedYear === "All" || p.year === selectedYear;
  });

  // Initialize visible photos when filtered photos change (year change or initial load)
  useEffect(() => {
    if (filteredPhotos.length > 0) {
      // Reset and load initial batch - always append from the start
      const initialBatch = filteredPhotos.slice(0, batchSize);
      setVisiblePhotos(initialBatch);
      setLoadedCount(initialBatch.length);
    } else {
      setVisiblePhotos([]);
      setLoadedCount(0);
    }
  }, [selectedYear]); // Only depend on selectedYear - filteredPhotos is derived from it

  // Intersection Observer for lazy loading more images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Wait for trigger element to be rendered
    const setupObserver = () => {
      if (!loadMoreTriggerRef.current) {
        // Retry after a short delay if trigger not ready
        setTimeout(setupObserver, 100);
        return;
      }

      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && loadedCount < filteredPhotos.length) {
              // Use requestAnimationFrame to batch DOM updates and prevent layout shifts
              requestAnimationFrame(() => {
                // Load next batch - append only, never re-sort
                const nextBatch = filteredPhotos.slice(loadedCount, loadedCount + batchSize);
                if (nextBatch.length > 0) {
                  setVisiblePhotos((prev) => [...prev, ...nextBatch]); // Append only
                  setLoadedCount((prev) => prev + nextBatch.length);
                }
              });
            }
          });
        },
        {
          rootMargin: '200px', // Start loading 200px before reaching the trigger
        }
      );

      observerRef.current.observe(loadMoreTriggerRef.current);
    };

    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadedCount, filteredPhotos.length, batchSize]);

  if (filteredPhotos.length === 0) {
    return (
      <div className="text-center py-16 md:py-32 px-4">
        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium">
          No photos found for the selected year.
        </p>
      </div>
    );
  }

  // Memoize items to prevent re-renders when layout shifts
  const memoizedItems = useMemo(() => {
    return visiblePhotos.map((photo) => ({
      photo,
      isLoaded: imagesLoaded[photo.id] || false,
      hasFailed: imagesFailed[photo.id] || false,
      dimensions: imageDimensions[photo.id],
      key: `${selectedYear}-${photo.id}` // Stable key based on photo.id, not index
    }));
  }, [visiblePhotos, imagesLoaded, imagesFailed, imageDimensions, selectedYear]);

  return (
    <div 
      className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4 md:gap-5 lg:gap-6"
      style={{ 
        contain: 'layout style paint',
      }}
    >
      {memoizedItems.map((item) => (
        <GalleryItem
          key={item.key}
          photo={item.photo}
          isLoaded={item.isLoaded}
          hasFailed={item.hasFailed}
          dimensions={item.dimensions}
          onLoad={onImageLoad}
          onError={onImageError}
          onClick={onPreviewClick}
        />
      ))}
      {/* Load more trigger - invisible element at the end */}
      {loadedCount < filteredPhotos.length && (
        <div
          ref={loadMoreTriggerRef}
          className="break-inside-avoid mb-2 sm:mb-4 md:mb-5 lg:mb-6"
          style={{ height: '1px', visibility: 'hidden' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
