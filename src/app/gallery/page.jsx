"use client";

import StackSpread from "@/components/ui/stack-spread";
import EventBasedGallery from "@/components/gallery/EventBasedGallery";

// CSI Showcase photos mapped to the 8 card spread positions
const CSI_CARDS = [
  // top-left: coding lab
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_B1.webp",
      alt: "CSI Coding Competition",
    },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: 0.9, w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // top-right: seminar hall
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_T3.webp",
      alt: "CSI Seminar & Workshop",
    },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: 0.9, w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // mid-left: felicitations
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_First.webp",
      alt: "CSI Felicitations & Awards",
    },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: 0.9, w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // top-centre: main stage showcase
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_Middle.webp",
      alt: "CSI Tech Fest Showcase",
    },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: 0.8, w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // mid-right: interactive team session
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_Last.webp",
      alt: "CSI Team Brainstorming",
    },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: 0.8, w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left: tech talks
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_B2.webp",
      alt: "CSI Tech Talks",
    },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: 0.9, w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // bottom-centre: smart board presentation
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_T2.webp",
      alt: "CSI Technical Presentation",
    },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: 0.8, w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // bottom-right: hackathon pair
  {
    item: {
      src: "/assets/Gallery_Hero/Gallery_T1.webp",
      alt: "CSI Hackathon Collaborators",
    },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: 0.9, w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Interactive Scroll-Driven Showcase Hero */}
      <StackSpread
        cards={CSI_CARDS}
        title={
          <h1 className="w-full whitespace-pre-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bespoke-sans-bold font-bold leading-tight tracking-tight text-csi-black">
            The <span className="text-csi-blue-400">CSI</span> Showcase
          </h1>
        }
        subtitle="A look back at the energy, creativity, and people behind CSI x TSDC. Explore our collection of memories from events, workshops, hackathons, and community initiatives."
        bgColor="#f8f8f8"
        textColor="#141414"
        scrollLength={300}
        stackScale={0.85}
        cardRadius={12}
      />

      {/* Event-Based Scroll Gallery */}
      <EventBasedGallery />
    </div>
  );
}