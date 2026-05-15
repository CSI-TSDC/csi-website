"use client";

import { useEffect } from "react";
import { PRELOAD_IMAGES } from "@/config/preloadImages";
import {
  startImagePreload,
  waitForEarlyPreload,
  getPreloadState,
} from "@/utils/imagePreloader";

function setLoaderProgress(progress) {
  const perc = document.getElementById("csi-load-perc");
  const bar = document.getElementById("csi-load-bar");
  const rounded = Math.round(progress);
  if (perc) perc.textContent = String(rounded);
  if (bar) bar.style.width = `${rounded}%`;
}

function hideLoader(scrollY, originalOverflow, originalPosition) {
  const loadEl = document.getElementById("csi-load");
  if (loadEl) loadEl.style.display = "none";

  document.body.style.overflow = originalOverflow;
  document.body.style.position = originalPosition;
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollY);
}

export default function LoadingProvider({ children }) {
  useEffect(() => {
    let cancelled = false;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const finish = () => {
      if (cancelled) return;
      setLoaderProgress(100);
      setTimeout(() => {
        if (!cancelled) hideLoader(scrollY, originalOverflow, originalPosition);
      }, 300);
    };

    const onProgress = (progress) => {
      if (!cancelled) setLoaderProgress(progress);
    };

    const earlyStateOnMount = getPreloadState();
    if (earlyStateOnMount?.prog) {
      setLoaderProgress(earlyStateOnMount.prog);
    }

    // Safety net if preload stalls (missing assets, damp never hits 100, etc.)
    const timeoutId = setTimeout(() => {
      const state = getPreloadState();
      if (state) {
        state.done = true;
        state.prog = 100;
      }
      finish();
    }, 12000);

    const clearWait = () => {
      clearTimeout(timeoutId);
    };

    const earlyState = getPreloadState();
    let cancelPreload = null;

    if (earlyState?.done) {
      clearWait();
      finish();
    } else if (earlyState && !earlyState.done) {
      cancelPreload = waitForEarlyPreload({
        onProgress,
        onComplete: () => {
          clearWait();
          finish();
        },
      });
    } else {
      const preloader = startImagePreload(PRELOAD_IMAGES, {
        onProgress,
        onComplete: () => {
          clearWait();
          finish();
        },
      });
      preloader.start();
      cancelPreload = preloader.cancel;
    }

    return () => {
      cancelled = true;
      clearWait();
      cancelPreload?.();
    };
  }, []);

  return children;
}
