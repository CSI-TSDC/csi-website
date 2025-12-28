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

// Get photo path with fallback
// Photos are in /assets/Teams/photos/{designation}/ folder
export function getPhotoPath(member) {
  if (!member.photo) {
    console.log(`[getPhotoPath] No photo for ${member.name}, using fallback`);
    return '/assets/Teams/img2.jpg';
  }
  
  // Map designation to folder name
  // Designations: "Head", "Asst. Head", "Member", "Student Chairperson", etc.
  let designationFolder = 'Member'; // default
  
  if (member.designation === 'Head' || member.designation === 'Asst. Head') {
    designationFolder = 'Heads';
  } else if (member.designation === 'Member') {
    designationFolder = 'Members';
  } else if (member.team === 'Core' || 
             ['Student Chairperson', 'Student Vice-Chairperson', 'Secretary', 'Treasurer'].includes(member.designation)) {
    designationFolder = 'Core';
  }
  
  // Get base filename without extension
  const baseName = member.photo.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  
  // Try different extensions (actual files might be .JPG, .PNG, .jpg, .png, etc.)
  // We'll use the original extension first, but the component will handle fallback
  const photoPath = `/assets/Teams/photos/${designationFolder}/${member.photo}`;
  
  console.log(`[getPhotoPath] ${member.name} (${member.designation}/${member.team}):`, photoPath, '| Base:', baseName);
  return photoPath;
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

