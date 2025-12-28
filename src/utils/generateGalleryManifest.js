/**
 * This script generates a JSON manifest of all gallery photos
 * Run this with: node src/utils/generateGalleryManifest.js
 * 
 * It will create a manifest.json file that can be imported in the gallery page
 */

const fs = require('fs');
const path = require('path');

const GALLERY_PATH = path.join(__dirname, '../../public/assets/Gallery');
const MANIFEST_PATH = path.join(__dirname, '../../public/assets/Gallery/manifest.json');

function extractYear(folderName) {
  if (folderName.includes('-')) {
    return folderName.split('-')[0];
  }
  return folderName;
}

function extractTag(filename, eventName) {
  if (filename.includes('_')) {
    const parts = filename.split('_');
    return parts[0];
  }
  return eventName;
}

function extractPhotoNumber(filename) {
  const match = filename.match(/_(\d+)\./);
  return match ? parseInt(match[1], 10) : null;
}

function scanGallery() {
  const photos = [];
  
  if (!fs.existsSync(GALLERY_PATH)) {
    console.error(`Gallery path not found: ${GALLERY_PATH}`);
    return photos;
  }
  
  // Get all year folders
  const yearFolders = fs.readdirSync(GALLERY_PATH).filter(f => {
    const fullPath = path.join(GALLERY_PATH, f);
    return fs.statSync(fullPath).isDirectory() && f !== 'manifest.json';
  });
  
  yearFolders.forEach(yearFolder => {
    const yearPath = path.join(GALLERY_PATH, yearFolder);
    const yearExtracted = extractYear(yearFolder);
    
    // Get all event folders
    const eventFolders = fs.readdirSync(yearPath).filter(f => {
      const fullPath = path.join(yearPath, f);
      return fs.statSync(fullPath).isDirectory();
    });
    
    eventFolders.forEach(eventFolder => {
      const eventPath = path.join(yearPath, eventFolder);
      
      // Process files in event folder
      const files = fs.readdirSync(eventPath);
      files.forEach(file => {
        const filePath = path.join(eventPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.heic', '.webp'].includes(ext)) {
            const relativePath = `/assets/Gallery/${yearFolder}/${eventFolder}/${file}`;
            const tag = extractTag(file, eventFolder);
            const photoNumber = extractPhotoNumber(file);
            
            photos.push({
              id: `${yearFolder}-${eventFolder}-${photoNumber || file}`,
              src: relativePath,
              event: eventFolder,
              tag: tag,
              year: yearExtracted,
              fullYear: yearFolder,
              photoNumber: photoNumber,
            });
          }
        } else if (stat.isDirectory() && /^\d{4}$/.test(file)) {
          // Handle year subfolders (like SIH/2024/, SIH/2025/)
          const subYearPath = path.join(eventPath, file);
          const subFiles = fs.readdirSync(subYearPath);
          
          subFiles.forEach(subFile => {
            const subFilePath = path.join(subYearPath, subFile);
            const subStat = fs.statSync(subFilePath);
            
            if (subStat.isFile()) {
              const ext = path.extname(subFile).toLowerCase();
              if (['.jpg', '.jpeg', '.png', '.heic', '.webp'].includes(ext)) {
                const relativePath = `/assets/Gallery/${yearFolder}/${eventFolder}/${file}/${subFile}`;
                const tag = extractTag(subFile, eventFolder);
                const photoNumber = extractPhotoNumber(subFile);
                
                photos.push({
                  id: `${yearFolder}-${eventFolder}-${file}-${photoNumber || subFile}`,
                  src: relativePath,
                  event: eventFolder,
                  tag: tag,
                  year: file, // Use subfolder year
                  fullYear: yearFolder,
                  photoNumber: photoNumber,
                });
              }
            }
          });
        }
      });
    });
  });
  
  return photos;
}

function generateManifest() {
  console.log('Scanning gallery folder...');
  const photos = scanGallery();
  
  console.log(`Found ${photos.length} photos`);
  
  // Sort by year, then event, then photo number
  photos.sort((a, b) => {
    if (a.year !== b.year) return a.year.localeCompare(b.year);
    if (a.event !== b.event) return a.event.localeCompare(b.event);
    if (a.photoNumber !== null && b.photoNumber !== null) {
      return a.photoNumber - b.photoNumber;
    }
    return a.src.localeCompare(b.src);
  });
  
  const manifest = {
    generated: new Date().toISOString(),
    total: photos.length,
    photos: photos
  };
  
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`✅ Manifest generated: ${MANIFEST_PATH}`);
  console.log(`   Total photos: ${photos.length}`);
  
  // Show breakdown by year
  const byYear = {};
  photos.forEach(photo => {
    byYear[photo.year] = (byYear[photo.year] || 0) + 1;
  });
  console.log('\nBreakdown by year:');
  Object.entries(byYear).forEach(([year, count]) => {
    console.log(`   ${year}: ${count} photos`);
  });
}

if (require.main === module) {
  generateManifest();
}

module.exports = { generateManifest, scanGallery };

