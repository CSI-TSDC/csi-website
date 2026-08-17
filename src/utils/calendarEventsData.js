/**
 * Calendar Events Data
 * ────────────────────
 * This is the SINGLE SOURCE OF TRUTH for the calendar card on the Events page.
 * To add/remove/update events, just edit this array — no other files need changes.
 *
 * Fields:
 *   id          – unique string identifier
 *   month       – 3-letter month code (JAN, FEB, …, DEC)
 *   name        – display name shown in the event row & detail popup
 *   date        – human-readable date string
 *   color       – hex accent color for the event row background
 *   image       – path to event image (local or Cloudinary URL)
 *   description – short paragraph shown in the detail popup
 *   link        – optional registration URL (null to show "Coming Soon")
 *   isClosed    – (optional) boolean to manually force "Registration Closed" status
 */

/**
 * Helper function to determine if an event's date has passed.
 * Returns true if registration is closed (date has passed or explicitly set to closed).
 */
export function isEventPassed(event) {
  if (!event) return false;

  // 1. Explicit flag check
  if (typeof event.isClosed === "boolean") {
    return event.isClosed;
  }

  // 2. Explicit endDate check (e.g. "2026-09-25")
  if (event.endDate) {
    const end = new Date(event.endDate);
    if (!isNaN(end.getTime())) {
      end.setHours(23, 59, 59, 999);
      return new Date() > end;
    }
  }

  // 3. Auto-parse from date string (e.g. "22–23 Jan 2026", "14 Aug 2026")
  if (event.date) {
    try {
      const yearMatch = event.date.match(/\b(20\d\d)\b/);
      const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();

      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let monthIndex = -1;
      if (event.month) {
        monthIndex = monthNames.indexOf(event.month.toUpperCase());
      }
      if (monthIndex === -1) {
        monthIndex = monthNames.findIndex((m) =>
          event.date.toUpperCase().includes(m)
        );
      }

      if (monthIndex !== -1) {
        const cleanDateStr = event.date.replace(/\b20\d\d\b/, "");
        const numbers = cleanDateStr.match(/\d+/g);
        if (numbers && numbers.length > 0) {
          const day = parseInt(numbers[numbers.length - 1], 10);
          const eventEndDate = new Date(year, monthIndex, day, 23, 59, 59, 999);
          return new Date() > eventEndDate;
        }
      }
    } catch (err) {
      console.error("Error parsing event date:", err);
    }
  }

  return false;
}

export const calendarEvents = [
  // ─── JANUARY ───
  {
    id: "hackvision-2026-1",
    month: "JAN",
    name: "HackVision 2.0",
    date: "22–23 Jan 2026",
    color: "#0251c1",
    image: "/assets/Home/events/hackvisionbg.webp",
    description:
      "A 24-hour hackathon where students team up to solve real-world problems with code, creativity, and caffeine. Mentored by industry professionals with prizes worth ₹50,000+.",
    link: null,
  },

  // ─── FEBRUARY ───
  {
    id: "tea-tech-feb-1",
    month: "FEB",
    name: "Tea Tech Talks — React Basics",
    date: "8 Feb 2026",
    color: "#ff0000d4",
    image: "/assets/Home/events/teatechtalkbg.webp",
    description:
      "Hands-on intro to React — components, props, state, and building your first interactive UI in 2 hours.",
    link: null,
  },
  {
    id: "workshop-python",
    month: "FEB",
    name: "Python for Data Science",
    date: "15 Feb 2026",
    color: "#0251c1",
    image: "",
    description:
      "Learn pandas, matplotlib, and scikit-learn through guided exercises on real datasets.",
    link: null,
  },

  // ─── MARCH ───
  {
    id: "envision-2026",
    month: "MAR",
    name: "Envision — Tech Fest",
    date: "14–15 Mar 2026",
    color: "#dc2626",
    image: "/assets/Events/Events2.webp",
    description:
      "CSI x TSDC's annual tech fest featuring coding competitions, robotics showcases, guest talks from industry leaders, and a grand expo.",
    link: null,
  },
  {
    id: "tea-tech-mar",
    month: "MAR",
    name: "Tea Tech Talks — APIs & REST",
    date: "1 Mar 2026",
    color: "#161616",
    image: "/assets/Home/events/teatechtalkbg.webp",
    description:
      "Demystifying APIs — learn how to build, consume, and test RESTful services with hands-on Postman exercises.",
    link: null,
  },

  // ─── APRIL ───
  

  // ─── AUGUST ───
  {
    id: "orientation-2026",
    month: "AUG",
    name: "CSI Orientation 2026–27",
    date: "10 Aug 2026",
    color: "#878787b9",
    image: "/assets/Events/Events3.webp",
    description:
      "Welcome to the CSI family! Meet the core team, learn about upcoming events, and sign up for your preferred department.",
    link: null,
  },
  {
    id: "tea-tech-aug",
    month: "AUG",
    name: "Tea Tech Talks — Git & GitHub",
    date: "14 Aug 2026",
    color: "#ff0000d4",
    image: "/assets/Home/events/teatechtalkbg.webp",
    description:
      "Demystifying Git — learn commands, branching strategies, and collaborative workflows on GitHub with hands-on exercises.",
    link: null,
  },

  // ─── SEPTEMBER ───
  // {
  //   id: "web-dev-sep",
  //   month: "SEP",
  //   name: "Full Stack Web Development Workshop",
  //   date: "15 Sep 2026",
  //   color: "#0251c1",
  //   image: "/assets/Events/Events2.webp",
  //   description:
  //     "Build full-stack applications with Next.js, Node.js, and MongoDB. Hands-on coding session with registration open now!",
  //   link: "https://csi-registration.example.com",
  // },

  // ─── OCTOBER ───
  // {
  //   id: "cyber-sec-oct",
  //   month: "OCT",
  //   name: "CyberSecurity & Ethical Hacking",
  //   date: "20 Oct 2026",
  //   color: "#161616",
  //   image: "/assets/Home/events/teatechtalkbg.webp",
  //   description:
  //     "Explore vulnerability assessment, network security, and ethical hacking fundamentals in this immersive session.",
  //   link: null,
  // },
];

/**
 * All month codes used by the calendar selector.
 * Order matters — this defines the display sequence.
 */
export const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];
