/**
 * Folio-style image preloader: parallel Image() loads + damped RAF progress.
 */

const DAMP_RATE = 16;

export function damp(current, target, factor) {
  const t = 1 - Math.exp(Math.log(1 - factor) * DAMP_RATE);
  return current + (target - current) * t;
}

export function getPreloadState() {
  if (typeof window === "undefined") return null;
  return window.__CSI_PRELOAD__;
}

function markComplete(state, onProgress, onComplete) {
  state.done = true;
  state.prog = 100;
  onProgress?.(100, state.loaded, state.total);
  onComplete?.();
}

/**
 * Start preloading URLs. Mirrors folio app.js startLoad + loop.
 */
export function startImagePreload(urls, { onProgress, onComplete } = {}) {
  const total = urls.length;
  let loaded = 0;
  let prog = 0;
  let rafId = null;
  let completed = false;

  const state = {
    loaded: 0,
    total,
    prog: 0,
    done: false,
  };

  if (typeof window !== "undefined") {
    window.__CSI_PRELOAD__ = state;
  }

  const tick = () => {
    if (completed) return;

    const targetProg = total === 0 ? 100 : (loaded / total) * 100;
    prog = loaded >= total ? 100 : damp(prog, targetProg, 0.08);
    const display = Math.round(prog);

    state.loaded = loaded;
    state.prog = display;
    onProgress?.(display, loaded, total);

    if (loaded >= total) {
      completed = true;
      markComplete(state, onProgress, onComplete);
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (total === 0) {
      markComplete(state, onProgress, onComplete);
      return;
    }

    for (let i = 0; i < total; i++) {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        state.loaded = loaded;
      };
      img.src = urls[i];
    }

    rafId = requestAnimationFrame(tick);
  };

  const cancel = () => {
    if (rafId) cancelAnimationFrame(rafId);
  };

  return { start, cancel, getState: () => state };
}

/** Wait for an in-flight early preload (inline script) to finish */
export function waitForEarlyPreload({ onProgress, onComplete }) {
  const state = getPreloadState();
  if (!state) return null;

  let rafId = null;
  let lastProg = -1;
  let completed = false;

  const tick = () => {
    if (completed) return;

    if (state.prog !== lastProg) {
      lastProg = state.prog;
      onProgress?.(state.prog, state.loaded, state.total);
    }

    if (state.done || state.loaded >= state.total) {
      completed = true;
      state.done = true;
      state.prog = 100;
      onProgress?.(100, state.loaded, state.total);
      onComplete?.();
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    completed = true;
    if (rafId) cancelAnimationFrame(rafId);
  };
}
