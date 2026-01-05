"use client";

import { useEffect, useState, useMemo, memo, useCallback } from "react";
import Image from "next/image";
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
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [imagesFailed, setImagesFailed] = useState({});
  const [imageDimensions, setImageDimensions] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  /* Load photos */
  useEffect(() => {
    loadGalleryPhotos().then(setPhotos);
  }, []);

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
    <div className="min-h-screen bg-[#f8f8f8] px-4 py-24">
      {/* Year Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              selectedYear === year
                ? "bg-black text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      {filteredPhotos.length === 0 ? (
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

      {/* Preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        >
          <Image
            src={previewImage}
            width={1920}
            height={1080}
            className="max-h-[90vh] object-contain"
            alt="Preview"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}