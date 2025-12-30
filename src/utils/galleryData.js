// Utility to load gallery photos from Cloudinary
// Structure: Gallery/{year}/{event}/{photo}
// Photo naming: {event}_{number}.{ext} (e.g., SIH_1.jpg, SIH_2.jpg)

import { fetchCloudinaryImages, getCloudinaryUrl } from './cloudinary';
import { extractYear, extractEventName, extractTag, extractPhotoNumber } from './cloudinary';

export async function loadGalleryPhotos() {
  try {
    // Always fetch all images from Gallery folder in Cloudinary
    const resources = await fetchCloudinaryImages('Gallery');
    
    if (!resources || resources.length === 0) {
      // Fallback to manifest if Cloudinary fails
      try {
        const response = await fetch('/assets/Gallery/manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          return manifest.photos || [];
        }
      } catch (error) {
        // Failed to load manifest
      }
  return [];
}

    // Process Cloudinary resources into photo objects
    const photos = resources.map(resource => {
      // Cloudinary provides asset_folder which contains the full folder path
      // Format: "Gallery/2025-26/SIH" or "Gallery/2024-25/Envision"
      const assetFolder = resource.asset_folder || resource.folder || '';
      const publicId = resource.public_id || '';
      
      // Construct full path: asset_folder/public_id
      // Example: "Gallery/2025-26/SIH/SIH_23_exkxrk"
      let fullPath = '';
      
      if (assetFolder && publicId) {
        fullPath = `${assetFolder}/${publicId}`;
      } else if (publicId.includes('/')) {
        // If public_id already has the path
        fullPath = publicId;
      } else {
        // Fallback: try to extract from secure_url
        if (resource.secure_url) {
          const urlMatch = resource.secure_url.match(/\/image\/upload\/[^/]*\/(.+)$/);
          if (urlMatch) {
            fullPath = urlMatch[1];
          }
        }
      }
      
      // If still no path, skip this resource
      if (!fullPath) {
        return null;
}

      // Extract path components: Gallery/2024-25/Envision/Envision_1
      const pathParts = fullPath.split('/');
      
      let year, event, filename;
      
      if (pathParts.length >= 4 && pathParts[0] === 'Gallery') {
        // Full path: Gallery/2024-25/Envision/Envision_1_vvco42
        year = pathParts[1]; // 2024-25 (keep full year format)
        event = pathParts[2]; // Envision
        filename = pathParts[3]; // Envision_1_vvco42
      } else if (pathParts.length === 3 && pathParts[0] === 'Gallery') {
        // Path: Gallery/2024-25/Envision_1 (no event subfolder)
        year = pathParts[1]; // 2024-25
        filename = pathParts[2]; // Envision_1
        // Try to extract event from filename
        const eventMatch = filename.match(/^([A-Za-z\s]+)_/);
        event = eventMatch ? eventMatch[1].trim() : 'Gallery';
      } else {
        return null;
      }
      
      // Clean up filename - remove extension if present (but keep Cloudinary suffix like _njo8fq)
      filename = filename.split('.')[0];
      
      if (!year || !event || !filename) {
        return null;
      }
      
      const yearExtracted = extractYear(year); // Extract "2024" from "2024-25"
      const eventName = extractEventName(event);
      const tag = extractTag(filename, eventName);
      const photoNumber = extractPhotoNumber(filename);
      
      // Use secure_url directly from Cloudinary - it's guaranteed to work
      // This avoids any path reconstruction issues
      let imageUrl;
      
      if (resource.secure_url) {
        imageUrl = resource.secure_url;
      } else {
        // Fallback: construct URL from full path
        const cloudinaryPath = fullPath;
        imageUrl = getCloudinaryUrl(cloudinaryPath, {
          quality: 'auto',
          fetchFormat: 'auto'
        });
      }
      
      return {
        id: `${year}-${event}-${photoNumber || filename}`,
        src: imageUrl,
        event: eventName,
        tag: tag,
        year: yearExtracted, // Use extracted year "2024" for filtering
        fullYear: year, // Keep full year "2024-25"
        photoNumber: photoNumber,
      };
    }).filter(photo => photo !== null);
    
    return photos;
  } catch (error) {
    // Fallback to manifest
    try {
      const response = await fetch('/assets/Gallery/manifest.json');
      if (response.ok) {
        const manifest = await response.json();
        return manifest.photos || [];
      }
    } catch (fallbackError) {
      // Failed to load manifest
    }
    return [];
  }
}

// Structure for a gallery photo
export function createPhotoObject(filePath, year, event, filename) {
  const yearExtracted = extractYear(year);
  const eventName = extractEventName(event);
  const tag = extractTag(filename, eventName);
  const photoNumber = extractPhotoNumber(filename);
  
  return {
    id: `${year}-${event}-${photoNumber || filename}`,
    src: filePath,
    event: eventName,
    tag: tag,
    year: yearExtracted,
    fullYear: year, // Keep full year like "2024-25" if needed
    photoNumber: photoNumber,
  };
}

