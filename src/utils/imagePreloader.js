/**
 * Image Preloader Utility
 * Handles preloading critical images with Cache Storage API support
 */

const CACHE_NAME = 'csi-images-v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Check if cache is supported
 */
function isCacheSupported() {
  return 'caches' in window && 'serviceWorker' in navigator;
}

/**
 * Get cache storage
 */
async function getCache() {
  if (!isCacheSupported()) {
    return null;
  }
  try {
    return await caches.open(CACHE_NAME);
  } catch (error) {
    console.warn('Cache API not available:', error);
    return null;
  }
}

/**
 * Check if image is already cached
 */
async function isImageCached(url) {
  const cache = await getCache();
  if (!cache) return false;
  
  try {
    const response = await cache.match(url);
    return !!response;
  } catch (error) {
    return false;
  }
}

/**
 * Preload a single image
 */
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    // Check if image is already in browser cache
    const img = new Image();
    
    img.onload = async () => {
      // Cache the image in Cache Storage
      const cache = await getCache();
      if (cache) {
        try {
          // Fetch and cache the image
          const response = await fetch(url, { mode: 'cors' });
          if (response.ok) {
            await cache.put(url, response.clone());
          }
        } catch (error) {
          // Silently fail - browser cache is still working
          console.warn('Failed to cache image:', url, error);
        }
      }
      resolve({ url, success: true });
    };
    
    img.onerror = () => {
      resolve({ url, success: false });
    };
    
    img.src = url;
  });
}

/**
 * Preload multiple images with progress tracking
 */
export async function preloadImages(imageUrls, onProgress) {
  const total = imageUrls.length;
  let loaded = 0;
  const results = [];
  
  // Process images in batches to avoid overwhelming the browser
  const batchSize = 5;
  for (let i = 0; i < imageUrls.length; i += batchSize) {
    const batch = imageUrls.slice(i, i + batchSize);
    const batchPromises = batch.map(async (url) => {
      // Check cache first
      const cached = await isImageCached(url);
      if (cached) {
        loaded++;
        if (onProgress) {
          onProgress(loaded, total);
        }
        return { url, success: true, cached: true };
      }
      
      // Preload image
      const result = await preloadImage(url);
      loaded++;
      if (onProgress) {
        onProgress(loaded, total);
      }
      return result;
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  return results;
}

/**
 * Get critical images to preload
 * Excludes gallery masonry images and teams page cloudinary images
 */
export function getCriticalImages() {
  const images = [
    // Logos
    '/assets/Logos/csi_logo.webp',
    '/assets/Logos/tsdc_logo.webp',
    '/assets/Logos/envision_logo.webp',
    '/assets/Logos/hackvision_logo.webp',
    '/assets/Logos/teatechtalk_logo.webp',
    '/assets/Logos/teatechtalk_logo.svg',
    
    // Gallery Hero Images
    '/assets/Gallery_Hero/Gallery_T1.webp',
    '/assets/Gallery_Hero/Gallery_T2.webp',
    '/assets/Gallery_Hero/Gallery_T3.webp',
    '/assets/Gallery_Hero/Gallery_First.webp',
    '/assets/Gallery_Hero/Gallery_Middle.webp',
    '/assets/Gallery_Hero/Gallery_Last.webp',
    '/assets/Gallery_Hero/Gallery_B1.webp',
    '/assets/Gallery_Hero/Gallery_B2.webp',
    '/assets/Gallery_Hero/Gallery_B3.webp',
    
    // Teams Hero Images
    '/assets/Teams/Hero/Team1.webp',
    '/assets/Teams/Hero/Team2.webp',
    '/assets/Teams/Hero/Team3.webp',
    '/assets/Teams/Hero/Team4.webp',
    '/assets/Teams/Hero/Team5.webp',
    
    // Home/Events Images (add more as needed)
    '/assets/Home/homebg.webp',
    '/assets/Home/bgoverlay.webp',
    '/assets/Home/bgoverlay2.webp',
    '/assets/Home/events/envisionbg.webp',
    '/assets/Home/events/hackvisionbg.webp',
    '/assets/Home/events/SIHbg.webp',
    '/assets/Home/events/SIHoverlay.webp',
    '/assets/Home/events/teatechtalkbg.webp',
    '/assets/Home/events/sticker1.webp',
    '/assets/Events/Events1.webp',
    '/assets/Events/Events2.webp',
    '/assets/Events/Events3.webp',
    '/assets/Events/Events4.webp',
  ];
  
  return images;
}

/**
 * Check if this is the first visit of the day
 */
export function isFirstVisitToday() {
  if (typeof window === 'undefined') return true;
  
  const lastVisitKey = 'csi_last_visit_date';
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem(lastVisitKey);
  
  if (lastVisit !== today) {
    localStorage.setItem(lastVisitKey, today);
    return true;
  }
  
  return false;
}

/**
 * Clear old cache entries (older than cache duration)
 */
export async function clearOldCache() {
  const cache = await getCache();
  if (!cache) return;
  
  try {
    const keys = await caches.keys();
    const oldCaches = keys.filter(key => 
      key.startsWith(CACHE_NAME) && key !== CACHE_NAME
    );
    
    await Promise.all(oldCaches.map(key => caches.delete(key)));
  } catch (error) {
    console.warn('Failed to clear old cache:', error);
  }
}

