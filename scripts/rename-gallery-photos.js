/**
 * Script to rename gallery photos to follow the convention:
 * {event}_{number}.{ext}
 * 
 * Example: SIH_1.jpg, SIH_2.jpg, Envision_1.jpg, etc.
 * 
 * This script should be run from the project root:
 * node scripts/rename-gallery-photos.js
 * 
 * Make sure to backup your photos before running!
 */

const fs = require('fs');
const path = require('path');

const GALLERY_PATH = path.join(__dirname, '../public/assets/Gallery');

function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip subdirectories that are years (like 2024, 2025 inside SIH)
      // Only process event folders directly
      getAllImageFiles(filePath, fileList);
    } else {
      // Check if it's an image file
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.heic', '.webp'].includes(ext)) {
        fileList.push({
          fullPath: filePath,
          dir: dir,
          filename: file,
          ext: ext
        });
      }
    }
  });
  
  return fileList;
}

function renamePhotos() {
  console.log('Starting gallery photo renaming...\n');
  
  if (!fs.existsSync(GALLERY_PATH)) {
    console.error(`Gallery path not found: ${GALLERY_PATH}`);
    return;
  }
  
  // Get all year folders (2024-25, 2025-26, etc.)
  const yearFolders = fs.readdirSync(GALLERY_PATH).filter(f => {
    const fullPath = path.join(GALLERY_PATH, f);
    return fs.statSync(fullPath).isDirectory();
  });
  
  let totalRenamed = 0;
  
  yearFolders.forEach(yearFolder => {
    const yearPath = path.join(GALLERY_PATH, yearFolder);
    console.log(`\nProcessing year: ${yearFolder}`);
    
    // Get all event folders
    const eventFolders = fs.readdirSync(yearPath).filter(f => {
      const fullPath = path.join(yearPath, f);
      return fs.statSync(fullPath).isDirectory();
    });
    
    eventFolders.forEach(eventFolder => {
      const eventPath = path.join(yearPath, eventFolder);
      console.log(`  Processing event: ${eventFolder}`);
      
      // Get all image files in this event folder
      // But skip subdirectories that might be years (like 2024, 2025)
      const files = fs.readdirSync(eventPath);
      const imageFiles = files.filter(f => {
        const fullPath = path.join(eventPath, f);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // Check if it's a year subfolder (like "2024", "2025")
          if (/^\d{4}$/.test(f)) {
            // Process images in year subfolders
            const subFiles = fs.readdirSync(fullPath);
            subFiles.forEach(subFile => {
              const subFilePath = path.join(fullPath, subFile);
              const subStat = fs.statSync(subFilePath);
              if (subStat.isFile()) {
                const subExt = path.extname(subFile).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.heic', '.webp'].includes(subExt)) {
                  processFile(subFilePath, fullPath, subFile, eventFolder, totalRenamed);
                  totalRenamed++;
                }
              }
            });
          }
          return false;
        }
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.heic', '.webp'].includes(ext);
      });
      
      // Rename files in the event folder
      imageFiles.forEach((file, index) => {
        const oldPath = path.join(eventPath, file);
        const ext = path.extname(file);
        const newName = `${eventFolder}_${index + 1}${ext}`;
        const newPath = path.join(eventPath, newName);
        
        // Skip if already named correctly
        if (file === newName) {
          console.log(`    ✓ ${file} (already correct)`);
          return;
        }
        
        // Check if new name already exists
        if (fs.existsSync(newPath)) {
          console.log(`    ⚠ Skipping ${file} - ${newName} already exists`);
          return;
        }
        
        try {
          fs.renameSync(oldPath, newPath);
          console.log(`    ✓ Renamed: ${file} → ${newName}`);
          totalRenamed++;
        } catch (error) {
          console.error(`    ✗ Error renaming ${file}:`, error.message);
        }
      });
    });
  });
  
  console.log(`\n✅ Renaming complete! Total files processed: ${totalRenamed}`);
}

function processFile(filePath, dir, filename, eventName, counter) {
  const ext = path.extname(filename);
  const newName = `${eventName}_${counter + 1}${ext}`;
  const newPath = path.join(dir, newName);
  
  if (filename === newName) {
    return;
  }
  
  if (fs.existsSync(newPath)) {
    console.log(`    ⚠ Skipping ${filename} - ${newName} already exists`);
    return;
  }
  
  try {
    fs.renameSync(filePath, newPath);
    console.log(`    ✓ Renamed: ${filename} → ${newName}`);
  } catch (error) {
    console.error(`    ✗ Error renaming ${filename}:`, error.message);
  }
}

// Run the script
if (require.main === module) {
  console.log('⚠️  WARNING: This will rename files in your gallery folder!');
  console.log('⚠️  Make sure you have a backup before proceeding!\n');
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  setTimeout(() => {
    renamePhotos();
  }, 5000);
}

module.exports = { renamePhotos };

