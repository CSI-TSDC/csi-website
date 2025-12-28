// Utility to load gallery photos from folder structure
// Structure: /assets/Gallery/{year}/{event}/{photo}
// Photo naming: {event}_{number}.{ext} (e.g., SIH_1.jpg, SIH_2.jpg)

// This function will be called to get all gallery photos
// Since we can't directly read the file system in the browser,
// we'll need to create a JSON manifest or use a server-side approach
// For now, I'll create a structure that can be populated

export async function loadGalleryPhotos() {
  // In a real implementation, this would:
  // 1. Scan the /assets/Gallery folder structure
  // 2. Extract year from grandparent folder (2024-25, 2025-26)
  // 3. Extract event from parent folder (SIH, Envision, Tea Tech Talks)
  // 4. Extract tag from filename (SIH_1.jpg -> tag: "SIH" or just use event name)
  // 5. Return array of photo objects
  
  // For now, return empty array - will be populated by scanning
  return [];
}

// Helper to extract year from folder name
export function extractYear(folderName) {
  // "2024-25" -> "2024" or keep "2024-25"
  // "2025-26" -> "2025" or keep "2025-26"
  if (folderName.includes('-')) {
    return folderName.split('-')[0]; // Extract first part
  }
  return folderName;
}

// Helper to extract event name from folder
export function extractEventName(folderName) {
  // Clean up folder name if needed
  return folderName;
}

// Helper to extract tag from filename
export function extractTag(filename, eventName) {
  // If filename is like "SIH_1.jpg", extract "SIH"
  // Otherwise, use event name as tag
  if (filename.includes('_')) {
    const parts = filename.split('_');
    return parts[0];
  }
  return eventName;
}

// Helper to extract number from filename
export function extractPhotoNumber(filename) {
  // "SIH_1.jpg" -> 1
  const match = filename.match(/_(\d+)\./);
  return match ? parseInt(match[1], 10) : null;
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

