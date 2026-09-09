/**
 * Event-Based Gallery Configuration & Data Modeling
 * 
 * Scalable event registry:
 * To add a new event in the future, simply add its metadata here.
 * The system automatically maps loaded photos to their matching event.
 */

export const EVENT_REGISTRY = {
  sih: {
    id: "sih",
    slug: "sih",
    title: "SMART INDIA HACKATHON",
    shortTitle: "SIH",
    tagline: "Nationwide Innovation • 36 Hours of Impact",
    description: "Students collaborating, prototyping, and competing in India's biggest open innovation hackathon to solve real-world government and industry problem statements.",
    badge: "National Hackathon",
    category: "Hackathon",
    dateRange: "2024 – 2026",
    accent: "#0251c1",
    layoutVariant: "feature-stagger", // Hero showcase + asymmetric staggered stream
  },
  envision: {
    id: "envision",
    slug: "envision",
    title: "ENVISION TECH FEST",
    shortTitle: "ENVISION",
    tagline: "Building • Learning • Competing",
    description: "CSI x TSDC's premier annual technology symposium featuring coding battles, robotics showcases, tech exhibitions, and guest sessions from industry visionaries.",
    badge: "Annual Flagship",
    category: "Tech Fest",
    dateRange: "2024 – 2025",
    accent: "#dc2626",
    layoutVariant: "editorial-offset", // Magazine offset rhythm with alternating focal anchors
  },
  "tea-tech-talks": {
    id: "tea-tech-talks",
    slug: "tea-tech-talks",
    title: "TEA TECH TALKS",
    shortTitle: "TEA TECH",
    tagline: "Byte-Sized Wisdom • High-Impact Sessions",
    description: "Informal, hands-on masterclasses where we decode complex engineering over chai — exploring React internals, REST APIs, Git workflows, and AI pipelines.",
    badge: "Technical Workshops",
    category: "Workshops",
    dateRange: "2025 – 2026",
    accent: "#0284c7",
    layoutVariant: "dynamic-mosaic", // Fluid mosaic with balanced portraits and landscape highlights
  },
  flashmob: {
    id: "flashmob",
    slug: "flashmob",
    title: "CSI FLASHMOB",
    shortTitle: "FLASHMOB",
    tagline: "Rhythm, Energy & Campus Spirit",
    description: "A burst of spontaneous energy uniting the campus through coordinated dance, music, and collective enthusiasm to kick off our festival season.",
    badge: "Campus Culture",
    category: "Culture",
    dateRange: "2024 – 2025",
    accent: "#7c3aed",
    layoutVariant: "feature-stagger",
  },
  "cl-meet": {
    id: "cl-meet",
    slug: "cl-meet",
    title: "CORE LEADERSHIP MEET",
    shortTitle: "CL MEET",
    tagline: "Vision, Roadmap & Team Alignment",
    description: "The leadership summit bringing together core leads and domain heads to architect initiatives, mentor talent, and steer the future of CSI x TSDC.",
    badge: "Leadership & Strategy",
    category: "Leadership",
    dateRange: "2024 – 2025",
    accent: "#059669",
    layoutVariant: "editorial-offset",
  },
  hackvision: {
    id: "hackvision",
    slug: "hackvision",
    title: "HACKVISION",
    shortTitle: "HACKVISION",
    tagline: "National Level Hackathon",
    description: "An intense 24-hour sprint of coding, design, and product thinking where multidisciplinary teams turn raw concepts into viable solutions.",
    badge: "Flagship Hackathon",
    category: "Hackathon",
    dateRange: "2026",
    accent: "#0251c1",
    layoutVariant: "feature-stagger",
  },
};

/**
 * Normalizes an event name/tag string into a standard event key
 */
export function normalizeEventKey(rawName = "") {
  if (!rawName) return "other";
  const cleaned = rawName.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (cleaned.includes("sih") || cleaned.includes("smartindia")) return "sih";
  if (cleaned.includes("envision")) return "envision";
  if (cleaned.includes("teatech") || cleaned.includes("teatalk")) return "tea-tech-talks";
  if (cleaned.includes("flashmob")) return "flashmob";
  if (cleaned.includes("clmeet") || cleaned.includes("leadership")) return "cl-meet";
  if (cleaned.includes("hackvision") || cleaned.includes("hackathon")) return "hackvision";

  // Fallback slug
  return rawName.toLowerCase().trim().replace(/\s+/g, "-");
}

/**
 * Groups an array of gallery photos by event and merges them with event metadata.
 * Returns only events that have at least one photo.
 * 
 * @param {Array} photos - Raw photos array from loadGalleryPhotos()
 * @returns {Array} Array of event objects containing event metadata and their photos
 */
export function groupGalleryPhotosByEvents(photos = []) {
  if (!photos || photos.length === 0) return [];

  // Map to hold photos grouped by normalized event key
  const eventBuckets = {};

  photos.forEach((photo) => {
    // Determine event key from photo.event or photo.tag
    const eventKey = normalizeEventKey(photo.event || photo.tag);

    if (!eventBuckets[eventKey]) {
      eventBuckets[eventKey] = [];
    }

    const eventPhotoIndex = eventBuckets[eventKey].length + 1;

    // Attach an event-scoped index and guaranteed unique id for React keys
    eventBuckets[eventKey].push({
      ...photo,
      uniqueId: `${eventKey}-${photo.id || photo.src}-${eventPhotoIndex}`,
      eventKey,
      eventPhotoIndex,
    });
  });

  // Build the ordered list of event sections
  // We prefer the registered events in predefined order, then any unknown dynamic events
  const registeredKeys = Object.keys(EVENT_REGISTRY);
  const allEncounteredKeys = Object.keys(eventBuckets);

  // Maintain preferred display order: SIH -> Envision -> Tea Tech Talks -> Flashmob -> CL Meet -> others
  const orderedKeys = [
    ...registeredKeys.filter(k => allEncounteredKeys.includes(k)),
    ...allEncounteredKeys.filter(k => !registeredKeys.includes(k)),
  ];

  return orderedKeys
    .map((key, index) => {
      const eventPhotos = eventBuckets[key] || [];
      if (eventPhotos.length === 0) return null;

      const registeredMeta = EVENT_REGISTRY[key];

      // Format event number (e.g. "01", "02", ...)
      const eventNumber = String(index + 1).padStart(2, "0");

      if (registeredMeta) {
        return {
          ...registeredMeta,
          eventNumber,
          photos: eventPhotos,
          totalPhotos: eventPhotos.length,
        };
      }

      // Dynamic fallback for any newly added event not yet in registry
      const rawEventName = eventPhotos[0]?.event || key.toUpperCase();
      return {
        id: key,
        slug: key,
        title: rawEventName.toUpperCase(),
        shortTitle: rawEventName,
        tagline: "CSI x TSDC Event Archive",
        description: `Visual archive and moments captured during ${rawEventName}.`,
        badge: "Event Archive",
        category: "Event",
        dateRange: eventPhotos[0]?.fullYear || eventPhotos[0]?.year || "Archive",
        accent: "#0251c1",
        layoutVariant: "feature-stagger",
        eventNumber,
        photos: eventPhotos,
        totalPhotos: eventPhotos.length,
      };
    })
    .filter(Boolean);
}
