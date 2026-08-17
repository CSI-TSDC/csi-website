/**
 * Critical images to preload on first paint.
 * Keep in sync with above-the-fold / home route assets.
 */
export const PRELOAD_IMAGES = [
  "/assets/Logos/csi_logo.webp",
  "/assets/Logos/tsdc_logo.webp",
  "/assets/Logos/envision_logo.webp",
  "/assets/Logos/hackvision_logo.webp",
  "/assets/Logos/teatechtalk_logo.webp",
  "/assets/Logos/teatechtalk_logo.svg",
  "/assets/Home/homebg.webp",
  "/assets/Home/bgoverlay.webp",
  "/assets/Home/bgoverlay2.webp",
  "/assets/Home/visionbg.webp",
  "/assets/Home/events/envisionbg.webp",
  "/assets/Home/events/hackvisionbg.webp",
  "/assets/Home/events/SIHbg.webp",
  "/assets/Home/events/SIHoverlay.webp",
  "/assets/Home/events/teatechtalkbg.webp",
  "/assets/Home/events/sticker1.webp",
  "/assets/Home/events/computer.webp",
  "/assets/Home/events/among.webp",
  "/assets/Events/Events1.webp",
  "/assets/Events/Events2.webp",
  "/assets/Events/Events3.webp",
  "/assets/Events/Events4.webp",
  "/assets/Gallery_Hero/Gallery_T1.webp",
  "/assets/Gallery_Hero/Gallery_T2.webp",
  "/assets/Gallery_Hero/Gallery_T3.webp",
  "/assets/Gallery_Hero/Gallery_First.webp",
  "/assets/Gallery_Hero/Gallery_Middle.webp",
  "/assets/Gallery_Hero/Gallery_Last.webp",
  "/assets/Gallery_Hero/Gallery_B1.webp",
  "/assets/Gallery_Hero/Gallery_B2.webp",
  "/assets/Gallery_Hero/Gallery_B3.webp",
  "/assets/Teams/Hero/Team1.webp",
  "/assets/Teams/Hero/Team2.webp",
  "/assets/Teams/Hero/Team3.webp",
  "/assets/Teams/Hero/Team4.webp",
  "/assets/Teams/Hero/Team5.webp",
];

/** First N images get <link rel="preload"> in document head */
export const PRELOAD_LINK_COUNT = 8;
