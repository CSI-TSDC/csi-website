/**
 * Critical images to preload on first paint.
 * Keep in sync with above-the-fold / home route assets.
 */
export const PRELOAD_IMAGES = [
  "/assets/Logos/csi_logo.webp",
  "/assets/Logos/tsdc_logo.webp",
  "/assets/Home/homebg.webp",
  "/assets/Home/bgoverlay.webp",
  "/assets/Home/visionbg.webp",
  "/assets/Logos/envision_logo.webp",
  "/assets/Logos/hackvision_logo.webp",
  "/assets/Logos/teatechtalk_logo.webp",
];

/** First N images get <link rel="preload"> in document head */
export const PRELOAD_LINK_COUNT = 5;
