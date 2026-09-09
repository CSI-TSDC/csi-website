"use client";

import { memo, useState } from "react";
import Image from "next/image";

/* ──────────────── Individual Photo Card ──────────────── */
const PhotoCard = memo(function PhotoCard({
  photo,
  index,
  className = "",
  onClick,
  priority = false,
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  // Pre-calculate aspect ratio so layout space is locked in advance
  const aspectRatio =
    photo.aspectRatio ||
    (photo.width && photo.height ? photo.width / photo.height : 1.5);

  return (
    <div
      onClick={() => onClick(index)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98] bg-black/5 ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={photo.src}
        alt={`${photo.event || "Event"} photograph ${index + 1}`}
        width={photo.width || 1200}
        height={photo.height || 800}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover block transition-transform duration-300 hover:scale-[1.03]"
      />
    </div>
  );
});

/* ──────────────── Layout Variant A: Feature Focus + Stagger ──────────────── */
function LayoutFeatureStagger({ photos, onPhotoClick, isFirstSection }) {
  if (!photos || photos.length === 0) return null;

  const heroPhoto = photos[0];
  const sidePhotos = photos.slice(1, 3);
  const remainingPhotos = photos.slice(3);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Feature Duo/Trio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Main Hero Photo (Large Focal Point) */}
        {heroPhoto && (
          <div className="md:col-span-7 lg:col-span-8">
            <PhotoCard
              photo={heroPhoto}
              index={0}
              onClick={onPhotoClick}
              priority={isFirstSection}
            />
          </div>
        )}

        {/* Stacked Side Column */}
        {sidePhotos.length > 0 && (
          <div className="md:col-span-5 lg:col-span-4 flex flex-col sm:flex-row md:flex-col gap-4 sm:gap-6">
            {sidePhotos.map((photo, i) => (
              <PhotoCard
                key={photo.uniqueId || `side-${photo.src}-${i}`}
                photo={photo}
                index={i + 1}
                onClick={onPhotoClick}
                priority={isFirstSection && i === 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* Asymmetric Staggered Photo Grid for Remaining Photos */}
      {remainingPhotos.length > 0 && (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 pt-2">
          {remainingPhotos.map((photo, i) => {
            const actualIndex = i + 3;
            return (
              <div key={photo.uniqueId || `rem-${photo.src}-${actualIndex}`} className="break-inside-avoid mb-4 sm:mb-6">
                <PhotoCard
                  photo={photo}
                  index={actualIndex}
                  onClick={onPhotoClick}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ──────────────── Layout Variant B: Editorial Magazine Offset ──────────────── */
function LayoutEditorialOffset({ photos, onPhotoClick, isFirstSection }) {
  if (!photos || photos.length === 0) return null;

  const group1 = photos.slice(0, 2);
  const group2 = photos.slice(2, 5);
  const remaining = photos.slice(5);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 2-Column Split: Asymmetrical 5-col / 7-col split */}
      {group1.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
          {group1[0] && (
            <div className="md:col-span-5">
              <PhotoCard
                photo={group1[0]}
                index={0}
                onClick={onPhotoClick}
                priority={isFirstSection}
              />
            </div>
          )}
          {group1[1] && (
            <div className="md:col-span-7">
              <PhotoCard
                photo={group1[1]}
                index={1}
                onClick={onPhotoClick}
                priority={isFirstSection}
              />
            </div>
          )}
        </div>
      )}

      {/* 3-Column Offset Rhythm */}
      {group2.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 sm:gap-6 pt-2">
          {group2.map((photo, i) => (
            <div key={photo.uniqueId || `g2-${photo.src}-${i}`} className="break-inside-avoid mb-4 sm:mb-6">
              <PhotoCard
                photo={photo}
                index={i + 2}
                onClick={onPhotoClick}
              />
            </div>
          ))}
        </div>
      )}

      {/* Remaining Stream in Clean Editorial Masonry Style */}
      {remaining.length > 0 && (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 pt-2">
          {remaining.map((photo, i) => {
            const actualIndex = i + 5;
            return (
              <div key={photo.uniqueId || `rem-${photo.src}-${actualIndex}`} className="break-inside-avoid mb-4 sm:mb-6">
                <PhotoCard
                  photo={photo}
                  index={actualIndex}
                  onClick={onPhotoClick}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ──────────────── Layout Variant C: Dynamic Mosaic ──────────────── */
function LayoutDynamicMosaic({ photos, onPhotoClick, isFirstSection }) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
      {photos.map((photo, index) => (
        <div key={photo.uniqueId || `mosaic-${photo.src}-${index}`} className="break-inside-avoid mb-4 sm:mb-6">
          <PhotoCard
            photo={photo}
            index={index}
            onClick={onPhotoClick}
            priority={isFirstSection && index < 2}
          />
        </div>
      ))}
    </div>
  );
}

/* ──────────────── Main Event Section Component ──────────────── */
export default function EventGallerySection({
  event,
  index,
  isFirst = false,
  onOpenLightbox,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_LIMIT = 9;
  const hasMore = event.photos && event.photos.length > INITIAL_LIMIT;
  const visiblePhotos = hasMore && !isExpanded ? event.photos.slice(0, INITIAL_LIMIT) : event.photos;

  const handlePhotoClick = (photoIndex) => {
    onOpenLightbox(event, photoIndex);
  };

  // Choose layout variant based on event configuration
  const renderLayout = () => {
    switch (event.layoutVariant) {
      case "editorial-offset":
        return (
          <LayoutEditorialOffset
            photos={visiblePhotos}
            onPhotoClick={handlePhotoClick}
            isFirstSection={isFirst}
          />
        );
      case "dynamic-mosaic":
        return (
          <LayoutDynamicMosaic
            photos={visiblePhotos}
            onPhotoClick={handlePhotoClick}
            isFirstSection={isFirst}
          />
        );
      case "feature-stagger":
      default:
        return (
          <LayoutFeatureStagger
            photos={visiblePhotos}
            onPhotoClick={handlePhotoClick}
            isFirstSection={isFirst}
          />
        );
    }
  };

  return (
    <div className="event-gallery-content relative pt-12 sm:pt-16 md:pt-24 pb-20 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* ── Event Chapter Header ── */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Top Metadata Row: Index, Category, Timeline */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Massive Chapter Index */}
              <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-csi-blue-500/80 tracking-tighter">
                {event.eventNumber}
              </span>
              <div className="h-6 w-[1.5px] bg-black/20" />
              {/* Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-csi-black text-white">
                {event.badge || event.category}
              </span>
            </div>

            {/* Date Range & Total Count Pill */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-csi-black/60">
              <span className="px-3 py-1 rounded-full bg-black/5 border border-black/10">
                {event.dateRange}
              </span>
              <span className="px-3 py-1 rounded-full bg-csi-blue-50 text-csi-blue-700 border border-csi-blue-200/60 font-mono font-semibold">
                {event.totalPhotos} Moments
              </span>
            </div>
          </div>

          {/* Headline Title */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 lg:gap-12 items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bespoke-sans-bold font-bold text-csi-black tracking-tight leading-[1.05] uppercase">
                {event.title}
              </h2>
              {event.tagline && (
                <p className="text-base sm:text-lg md:text-xl font-medium text-csi-blue-600 mt-2 sm:mt-3">
                  {event.tagline}
                </p>
              )}
            </div>

            {/* Narrative Description */}
            {event.description && (
              <p className="text-sm sm:text-base text-csi-black/70 leading-relaxed lg:border-l lg:border-black/15 lg:pl-6">
                {event.description}
              </p>
            )}
          </div>
        </div>

        {/* ── Event Photos Visual Chapter ── */}
        <div className="relative">
          {renderLayout()}

          {/* Show All / Show Less Toggle Button */}
          {hasMore && (
            <div className="mt-8 sm:mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-csi-black bg-white hover:bg-black/5 border border-black/15 shadow-sm hover:shadow transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>
                  {isExpanded
                    ? "Show Less"
                    : `View All ${event.totalPhotos || event.photos.length} Moments`}
                </span>
                <svg
                  className={`w-4 h-4 text-csi-blue-600 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
