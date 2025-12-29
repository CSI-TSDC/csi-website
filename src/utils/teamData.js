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
        console.log(`[teamData] Fetching: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(`[teamData] Loaded ${file}:`, data.length, 'members');
          allData.push(...data);
        } else {
          console.warn(`[teamData] Failed to load ${file}:`, response.status, response.statusText);
        }
      } catch (error) {
        console.warn(`[teamData] Error loading ${file}:`, error);
      }
    }
    
    console.log(`[teamData] Total members loaded:`, allData.length);
    return allData;
  } catch (error) {
    console.error('[teamData] Error loading team data:', error);
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
    console.log(`[getPhotoPath] No photo for ${member.name}, using fallback`);
    return '/assets/Teams/img2.jpg';
  }
  
  // Remove extension to get base name for lookup
  const baseName = member.photo.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  
  // Try to get from image map first (if provided)
  if (imageMap) {
    // Strategy 1: Exact match
    if (imageMap[baseName]) {
      console.log(`[getPhotoPath] Found exact match: ${member.name} (${baseName})`);
      return imageMap[baseName];
    }
    
    // Strategy 2: Case-insensitive exact match
    const lowerBaseName = baseName.toLowerCase();
    for (const key in imageMap) {
      if (key.toLowerCase() === lowerBaseName) {
        console.log(`[getPhotoPath] Found case-insensitive match: ${member.name} (${key})`);
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
          console.log(`[getPhotoPath] Found partial match: ${member.name} (${baseName} -> ${key})`);
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
        console.log(`[getPhotoPath] Found name variation: ${member.name} (${variation})`);
        return imageMap[variation];
      }
    }
    
    console.warn(`[getPhotoPath] ${member.name} - Not found in image map. Photo: ${member.photo}, Base: ${baseName}`);
    console.warn(`[getPhotoPath] Available keys (first 20):`, Object.keys(imageMap).slice(0, 20));
  }
  
  // Fallback: try to construct path (but this should rarely be needed if map is working)
  console.warn(`[getPhotoPath] ${member.name} - Using fallback URL construction`);
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
  console.log('[getHeads] Found', heads.length, 'heads:', heads.map(h => `${h.name} (${h.designation})`));
  return heads;
}

// Get core members (team === "Core" or specific core designations)
export function getCore(data) {
  const core = data.filter(member => 
    member.team === 'Core' || 
    ['Student Chairperson', 'Student Vice-Chairperson', 'Secretary', 'Treasurer'].includes(member.designation)
  );
  console.log('[getCore] Found', core.length, 'core members:', core.map(c => `${c.name} (${c.designation})`));
  return core;
}

// Get members (designation === "Member")
export function getMembers(data) {
  const members = filterByDesignation(data, ['Member']);
  console.log('[getMembers] Found', members.length, 'members:', members.map(m => `${m.name} (${m.team})`));
  return members;
}

