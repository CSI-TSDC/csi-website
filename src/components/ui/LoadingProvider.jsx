"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function handlePreload() {
      const isFirstVisit = isFirstVisitToday();
      const startTime = Date.now();
      
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
            const targetProgress = Math.min(100, cacheProgress + (100 - cacheProgress) * (elapsed / 2000));
            setLoadingProgress(targetProgress);
            
            if (elapsed < 2000) {
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
      }, 300);
    }

    handlePreload();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen progress={loadingProgress} />}
      {children}
    </>
  );
}

