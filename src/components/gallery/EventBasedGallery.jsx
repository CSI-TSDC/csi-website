"use client";

import { useEffect, useState, useCallback } from "react";
import GallerySkeleton from "@/components/ui/GallerySkeleton";
import { loadGalleryPhotos } from "@/utils/galleryData";
import { groupGalleryPhotosByEvents } from "@/data/galleryEvents";
import EventGallerySection from "./EventGallerySection";
import GalleryLightbox from "./GalleryLightbox";

export default function EventBasedGallery() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    event: null,
    photoIndex: 0,
  });

  /* Load and group photos */
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        const rawPhotos = await loadGalleryPhotos();
        if (!isMounted) return;

        const grouped = groupGalleryPhotosByEvents(rawPhotos);
        setEvents(grouped);
      } catch (err) {
        console.error("Failed to load gallery events:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* Lightbox Handlers */
  const handleOpenLightbox = useCallback((event, photoIndex) => {
    setLightboxState({
      isOpen: true,
      event,
      photoIndex,
    });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleNavigateLightbox = useCallback((newIndex) => {
    setLightboxState((prev) => ({ ...prev, photoIndex: newIndex }));
  }, []);

  return (
    <div className="relative w-full">
      {/* Main Content Area */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <GallerySkeleton />
        </div>
      ) : events.length === 0 ? (
        <div className="max-w-3xl mx-auto text-center py-32 px-4">
          <p className="text-xl font-semibold text-csi-black/60">
            No gallery events found.
          </p>
          <p className="text-sm text-csi-black/40 mt-2">
            Photos will appear here once uploaded to the gallery collection.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          {events.map((ev, index) => (
            <section
              key={ev.id}
              id={ev.slug}
              className="w-full border-t first:border-t-0 border-black/10"
            >
              <EventGallerySection
                event={ev}
                index={index}
                isFirst={index === 0}
                onOpenLightbox={handleOpenLightbox}
              />
            </section>
          ))}
        </div>
      )}

      {/* Event-Scoped Lightbox */}
      <GalleryLightbox
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        photos={lightboxState.event?.photos || []}
        currentIndex={lightboxState.photoIndex}
        onNavigate={handleNavigateLightbox}
        eventTitle={lightboxState.event?.title || ""}
      />
    </div>
  );
}
