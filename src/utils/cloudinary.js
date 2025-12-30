// Cloudinary utility functions for fetching images

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgeeamxpx';

/**
 * Check if we're running on localhost
 * @returns {boolean} True if on localhost
 */
export function isLocalhost() {
  if (typeof window === 'undefined') {
    // Server-side: check environment variable or default to false
    return process.env.NODE_ENV === 'development';
  }
  // Client-side: check hostname
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.startsWith('192.168.') ||
         window.location.hostname.startsWith('10.0.');
}

// Helper functions from galleryData
export function extractYear(folderName) {
  if (folderName.includes('-')) {
    return folderName.split('-')[0];
  }
  return folderName;
}

export function extractEventName(folderName) {
  return folderName;
}

export function extractTag(filename, eventName) {
  if (filename.includes('_')) {
    const parts = filename.split('_');
    return parts[0];
  }
  return eventName;
}

export function extractPhotoNumber(filename) {
  const match = filename.match(/_(\d+)\./);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Get Cloudinary image URL
 * @param {string} folderPath - Path to the image in Cloudinary (e.g., "Gallery/2024-25/Envision/Envision_1")
 * @param {object} options - Transformation options
 * @returns {string} Cloudinary URL
 */
export function getCloudinaryUrl(folderPath, options = {}) {
  const {
    quality,
    width,
    height,
    crop,
    fetchFormat
  } = options;

  let url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  // Only add transformations if explicitly provided (not undefined)
  const transformations = [];
  if (width !== undefined) transformations.push(`w_${width}`);
  if (height !== undefined) transformations.push(`h_${height}`);
  if (crop && width !== undefined && height !== undefined) transformations.push(`c_${crop}`);
  if (quality !== undefined && quality !== 'auto') transformations.push(`q_${quality}`);
  if (fetchFormat !== undefined && fetchFormat !== 'auto') transformations.push(`f_${fetchFormat}`);
  
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`;
  }
  
  // Add folder path - URL encode spaces and special characters
  // Cloudinary paths can have spaces like "Tea Tech Talks"
  const encodedPath = folderPath.split('/').map(part => encodeURIComponent(part)).join('/');
  url += `/${encodedPath}`;
  
  return url;
}

/**
 * Fetch all images from a Cloudinary folder
 * @param {string} folderPath - Path to the folder (e.g., "Gallery" or "Teams")
 * @returns {Promise<Array>} Array of image objects
 */
export async function fetchCloudinaryImages(folderPath) {
  try {
    const response = await fetch(`/api/cloudinary/list?folder=${folderPath}`);
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    if (!data.success) {
      return [];
    }
    
    return data.resources || [];
  } catch (error) {
    return [];
  }
}

/**
 * Get gallery photo URL from Cloudinary
 * @param {string} year - Year folder (e.g., "2024-25")
 * @param {string} event - Event folder (e.g., "Envision")
 * @param {string} filename - Image filename (e.g., "Envision_1.webp")
 * @returns {string} Cloudinary URL
 */
export function getGalleryPhotoUrl(year, event, filename) {
  // Remove extension and use Cloudinary's auto format
  const baseName = filename.replace(/\.(webp|jpg|jpeg|png|HEIC)$/i, '');
  const folderPath = `Gallery/${year}/${event}/${baseName}`;
  return getCloudinaryUrl(folderPath, {
    quality: 'auto',
    fetchFormat: 'auto'
  });
}

/**
 * Get team photo URL from Cloudinary
 * @param {string} designationFolder - Folder name (e.g., "Core", "Heads", "Members")
 * @param {string} filename - Image filename (e.g., "John_Doe.jpg")
 * @returns {string} Cloudinary URL
 */
/**
 * Fetch team images from Cloudinary and create a lookup map
 * Automatically discovers folder structure from Cloudinary API
 * @returns {Promise<Object>} Map of filename to Cloudinary URL
 */
export async function fetchTeamImagesMap() {
  try {
    // Fetch ALL resources and filter for team images
    // This way we don't need to know the exact folder structure
    const response = await fetch('/api/cloudinary/list?folder=');
    if (!response.ok) {
      return {};
    }
    
    const data = await response.json();
    const allResources = data.resources || [];
    
    // Filter resources that are team-related
    // Look for resources in folders containing: Teams, Team, Core, Heads, Members
    const teamResources = allResources.filter(resource => {
      const folder = resource.asset_folder || resource.folder || '';
      const publicId = resource.public_id || '';
      const fullPath = folder || publicId;
      
      // Check if it's a team image (not gallery)
      const isTeam = (
        fullPath.toLowerCase().includes('team') ||
        fullPath.toLowerCase().includes('core') ||
        fullPath.toLowerCase().includes('heads') ||
        fullPath.toLowerCase().includes('members')
      ) && !fullPath.toLowerCase().includes('gallery');
      
      return isTeam;
    });
    
    if (teamResources.length === 0) {
      return {};
    }
    
    // Create multiple maps for different lookup strategies
    const imageMap = {};
    
    teamResources.forEach(resource => {
      if (!resource.secure_url) return;
      
      // Strategy 1: Use filename from public_id (most common)
      let filename = resource.public_id || '';
      if (filename.includes('/')) {
        filename = filename.split('/').pop();
      }
      const baseName = filename.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
      
      if (baseName) {
        imageMap[baseName] = resource.secure_url;
      }
      
      // Strategy 2: Also map by display_name if available
      if (resource.display_name) {
        const displayBase = resource.display_name.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
        if (displayBase && displayBase !== baseName) {
          imageMap[displayBase] = resource.secure_url;
        }
      }
      
      // Strategy 3: Extract from asset_folder path
      if (resource.asset_folder) {
        const folderParts = resource.asset_folder.split('/');
        const lastPart = folderParts[folderParts.length - 1];
        if (lastPart && lastPart !== baseName) {
          const folderBase = lastPart.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
          if (folderBase) {
            imageMap[folderBase] = resource.secure_url;
          }
        }
      }
    });
    
    return imageMap;
  } catch (error) {
    return {};
  }
}

export function getTeamPhotoUrl(designationFolder, filename) {
  // Remove extension to get base name
  const baseName = filename.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  
  // Try both "Team" and "Teams" folder names
  const possiblePaths = [
    `Team/${designationFolder}/${baseName}`,
    `Teams/${designationFolder}/${baseName}`,
    `Gallery/Teams/${designationFolder}/${baseName}`,
    `Gallery/Team/${designationFolder}/${baseName}`
  ];
  
  // Return the first path (will be tried in order, component handles fallback)
  // No transformations - Cloudinary handles format automatically
  return getCloudinaryUrl(possiblePaths[0], {});
}

/**
 * Build Cloudinary URL from full path
 * @param {string} fullPath - Full path in Cloudinary (e.g., "Gallery/2024-25/Envision/Envision_1")
 * @returns {string} Cloudinary URL
 */
export function buildCloudinaryUrl(fullPath) {
  return getCloudinaryUrl(fullPath);
}

