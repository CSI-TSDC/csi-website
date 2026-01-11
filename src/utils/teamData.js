// Utility to load and process team data from JSON files
import { getTeamPhotoUrl } from './cloudinary';

const teamJsonFiles = [
  'Core.json',
  'Tech.json',
  'Events.json',
  'Design.json',
  'Social.json',
  'PR.json',
  'Documentation.json',
  'Logisitcs.json',
  'HOD.json',
  'Chairperson.json',
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
let teamImageMapCache = null;
let teamImageMapPromise = null;

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
    return '/assets/Teams/img2.jpg';
  }

  // Always use Cloudinary - remove extension to get base name for lookup
  const baseName = member.photo.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');



  if (imageMap) {
    if (imageMap[baseName]) {
      return imageMap[baseName];
    }

    const lowerBaseName = baseName.toLowerCase();
    for (const key in imageMap) {
      if (key.toLowerCase() === lowerBaseName) {
        return imageMap[key];
      }
    }

    for (const key in imageMap) {
      const keyLower = key.toLowerCase();
      const baseLower = lowerBaseName;

      if (keyLower.startsWith(baseLower) || baseLower.startsWith(keyLower)) {
        const keyBase = keyLower.split('_').slice(0, -1).join('_');
        if (keyBase === baseLower || baseLower.startsWith(keyBase) || keyBase.startsWith(baseLower)) {
          return imageMap[key];
        }
      }
    }

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
  return '/assets/Teams/img2.jpg';
}

export function getSignaturePath(member) {
  if (!member.signature) {
    return null;
  }

  const baseName = member.signature.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');

  const signaturePath = `/assets/Teams/Signatures/${baseName}.png`;

  return signaturePath;
}

export function getImageWithFallback(member) {
  return {
    src: getPhotoPath(member),
    fallback: '/assets/Teams/img2.jpg',
  };
}

export function filterByDesignation(data, designations) {
  return data.filter(member =>
    designations.includes(member.designation)
  );
}
export function getHeads(data) {
  const heads = filterByDesignation(data, ['Head', 'Asst. Head']);
  return heads;
}

export function getCore(data) {
  const core = data.filter(member =>
    member.team === 'Core' ||
    ['Student Chairperson', 'Student Vice-Chairperson', 'Secretary', 'Treasurer'].includes(member.designation)
  );
  return core;
}

export function getMembers(data) {
  const members = filterByDesignation(data, ['Member']);
  return members;
}

