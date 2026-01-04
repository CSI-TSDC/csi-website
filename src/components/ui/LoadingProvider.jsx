"use client";

import { useEffect, useState, useRef } from "react";
import LoadingScreen from "./LoadingScreen";
import {
  preloadImages,
  getCriticalImages,
  isFirstVisitToday,
  clearOldCache,
} from "@/utils/imagePreloader";

export default function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const hasShownLoaderRef = useRef(false);
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    // Only show loader on initial mount (first page load), not on client-side navigation
    // Next.js App Router doesn't remount layout on navigation, so we check if this is the first render
    if (!isInitialMountRef.current) {
      // This is not the initial mount (likely a re-render from state change)
      setIsLoading(false);
      return;
    }
    
    isInitialMountRef.current = false;
    
    // Check if we've already shown the loader today
    if (hasShownLoaderRef.current) {
      setIsLoading(false);
      return;
    }

    async function handlePreload() {
      const isFirstVisit = isFirstVisitToday();
      const startTime = Date.now();
      
      // Mark that we've shown the loader
      hasShownLoaderRef.current = true;
      
      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Clear old cache on first visit
      if (isFirstVisit) {
        await clearOldCache();
      }

      const criticalImages = getCriticalImages();
      
      if (isFirstVisit) {
        // First visit: actually preload images
        await preloadImages(criticalImages, (loaded, total) => {
          const progress = Math.round((loaded / total) * 100);
          setLoadingProgress(progress);
        });
      } else {
        // Returning user: check cache and show fake loading
        let cachedCount = 0;
        if ('caches' in window) {
          try {
            const cache = await caches.open('csi-images-v1');
            for (const url of criticalImages) {
              try {
                const cached = await cache.match(url);
                if (cached) cachedCount++;
              } catch (error) {
                // Continue checking other images
              }
            }
          } catch (error) {
            // Cache not available, assume no cache
          }
        }
        
        // Simulate progress based on cache hits, but always show 2 seconds
        const cacheProgress = Math.round((cachedCount / criticalImages.length) * 100);
        setLoadingProgress(cacheProgress);
        
        // Animate to 100% over 2 seconds
        await new Promise((resolve) => {
          const animateProgress = () => {
            const elapsed = Date.now() - startTime;
            const targetProgress = Math.min(100, cacheProgress + (100 - cacheProgress) * (elapsed / 700));
            setLoadingProgress(targetProgress);
            
            if (elapsed < 700) {
              requestAnimationFrame(animateProgress);
            } else {
              setLoadingProgress(100);
              resolve();
            }
          };
          animateProgress();
        });
      }
      
      setLoadingProgress(100);
      
      // Small delay before hiding
      setTimeout(() => {
        setIsLoading(false);
        // Restore body scroll
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }, 300);
    }

    handlePreload();
  }, []); // Empty dependency array - only run on mount

  return (
    <>
      {isLoading && <LoadingScreen progress={loadingProgress} />}
      {children}
    </>
  );
}

