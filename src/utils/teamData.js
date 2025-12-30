// Utility to load and process team data from JSON files

const teamJsonFiles = [
  'Core.json',
  'Tech.json',
  'Design.json',
  'Events.json',
  'PR.json',
  'Social.json',
  'Documentation.json',
  'Logisitcs.json',
];

// Load all team data
export async function loadAllTeamData() {
  try {
    const allData = [];
    
    for (const file of teamJsonFiles) {
      try {
        const url = `/assets/Teams/data/${file}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          allData.push(...data);
        }
      } catch (error) {
        // Error loading file
      }
    }
    
    return allData;
  } catch (error) {
    return [];
  }
}

// Get photo path with fallback - now using Cloudinary
// Photos are in Teams/{designation}/ or Team/{designation}/ folder on Cloudinary
import { getCloudinaryUrl } from './cloudinary';

// Cache for team image map
let teamImageMapCache = null;
let teamImageMapPromise = null;

// Load team images map from Cloudinary
export async function loadTeamImageMap() {
  // Always use Cloudinary
  if (teamImageMapCache) {
    return teamImageMapCache;
  }
  
  if (teamImageMapPromise) {
    return teamImageMapPromise;
  }
  
  teamImageMapPromise = (async () => {
    const { fetchTeamImagesMap } = await import('./cloudinary');
    const map = await fetchTeamImagesMap();
    teamImageMapCache = map;
    return map;
  })();
  
  return teamImageMapPromise;
}

export function getPhotoPath(member, imageMap = null) {
  if (!member.photo) {
    return '/assets/Teams/img2.jpg';
  }
  
  // Always use Cloudinary - remove extension to get base name for lookup
  const baseName = member.photo.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  
  // Try to get from image map first (if provided)
  if (imageMap) {
    // Strategy 1: Exact match
    if (imageMap[baseName]) {
      return imageMap[baseName];
    }
    
    // Strategy 2: Case-insensitive exact match
    const lowerBaseName = baseName.toLowerCase();
    for (const key in imageMap) {
      if (key.toLowerCase() === lowerBaseName) {
        return imageMap[key];
      }
    }
    
    // Strategy 3: Partial match (handles Cloudinary suffixes like "Aaryan_Shukla_xyz")
    // Cloudinary might add suffixes, so "Aaryan_Shukla" should match "Aaryan_Shukla_abc123"
    for (const key in imageMap) {
      const keyLower = key.toLowerCase();
      const baseLower = lowerBaseName;
      
      // Check if baseName is a prefix of the key (handles Cloudinary suffixes)
      if (keyLower.startsWith(baseLower) || baseLower.startsWith(keyLower)) {
        // Also check if they're similar (same name, different suffix)
        const keyBase = keyLower.split('_').slice(0, -1).join('_'); // Remove last part (suffix)
        if (keyBase === baseLower || baseLower.startsWith(keyBase) || keyBase.startsWith(baseLower)) {
          return imageMap[key];
        }
      }
  }
  
    // Strategy 4: Try name variations
    const nameVariations = [
      baseName.replace(/_/g, ' '),
      baseName.replace(/ /g, '_'),
      member.name.replace(/ /g, '_'),
      member.name.replace(/ /g, ' ')
    ];
    
    for (const variation of nameVariations) {
      if (imageMap[variation]) {
        return imageMap[variation];
      }
    }
  }
  
  // Fallback: try to construct path (but this should rarely be needed if map is working)
  return '/assets/Teams/img2.jpg';
}

// Get signature path - signatures are in /assets/Teams/Signatures/
export function getSignaturePath(member) {
  if (!member.signature) {
    return null;
  }
  
  // Remove extension and add _S suffix, then try .png (actual files are .png, not .webp as in JSON)
  const baseName = member.signature.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  
  // Try .png first (actual file format), then .webp (as mentioned in JSON)
  const signaturePath = `/assets/Teams/Signatures/${baseName}.png`;
  
  return signaturePath;
}

// Check if image exists (will be handled by onError in component)
export function getImageWithFallback(member) {
  return {
    src: getPhotoPath(member),
    fallback: '/assets/Teams/img2.jpg',
  };
}

// Filter by designation
export function filterByDesignation(data, designations) {
  return data.filter(member => 
    designations.includes(member.designation)
  );
}

// Get heads (Head and Asst. Head)
export function getHeads(data) {
  const heads = filterByDesignation(data, ['Head', 'Asst. Head']);
  return heads;
}

// Get core members (team === "Core" or specific core designations)
export function getCore(data) {
  const core = data.filter(member => 
    member.team === 'Core' || 
    ['Student Chairperson', 'Student Vice-Chairperson', 'Secretary', 'Treasurer'].includes(member.designation)
  );
  return core;
}

// Get members (designation === "Member")
export function getMembers(data) {
  const members = filterByDesignation(data, ['Member']);
  return members;
}

