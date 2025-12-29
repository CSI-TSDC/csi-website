// Cloudinary utility functions for fetching images

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgeeamxpx';

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
    format = 'auto',
    quality = 'auto',
    width,
    height,
    crop,
    fetchFormat = 'auto'
  } = options;

  let url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  // Add transformations (only add crop if width/height are specified)
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);
  if (quality && quality !== 'auto') transformations.push(`q_${quality}`);
  if (fetchFormat && fetchFormat !== 'auto') transformations.push(`f_${fetchFormat}`);
  
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
    console.log(`[Cloudinary] Fetching images from folder: ${folderPath}`);
    const response = await fetch(`/api/cloudinary/list?folder=${folderPath}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[Cloudinary] API error (${response.status}):`, errorData);
      return [];
    }
    
    const data = await response.json();
    console.log(`[Cloudinary] Received ${data.resources?.length || 0} resources from ${folderPath}`);
    
    if (!data.success) {
      console.error(`[Cloudinary] API returned error:`, data.error);
      return [];
    }
    
    return data.resources || [];
  } catch (error) {
    console.error(`[Cloudinary] Error fetching images from ${folderPath}:`, error);
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
export function getTeamPhotoUrl(designationFolder, filename) {
  // Remove extension
  const baseName = filename.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  const folderPath = `Teams/${designationFolder}/${baseName}`;
  return getCloudinaryUrl(folderPath, {
    quality: 'auto',
    fetchFormat: 'auto',
    width: 500,
    height: 600,
    crop: 'fill'
  });
}

/**
 * Build Cloudinary URL from full path
 * @param {string} fullPath - Full path in Cloudinary (e.g., "Gallery/2024-25/Envision/Envision_1")
 * @returns {string} Cloudinary URL
 */
export function buildCloudinaryUrl(fullPath) {
  return getCloudinaryUrl(fullPath);
}

