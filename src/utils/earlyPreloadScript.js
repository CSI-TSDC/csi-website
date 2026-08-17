import { PRELOAD_IMAGES } from "@/config/preloadImages";

/**
 * Inline script: preload images + track progress on window only (no DOM writes).
 * Avoids hydration mismatch — LoadingProvider updates the loader UI after mount.
 */
export function getEarlyPreloadScript() {
  const urls = JSON.stringify(PRELOAD_IMAGES);
  return `(function(){
var urls=${urls};
var s=window.__CSI_PRELOAD__={loaded:0,total:urls.length,prog:0,done:false};
function damp(c,t,f){return c+(t-c)*(1-Math.exp(Math.log(1-f)*16))}
function loop(){
if(s.done)return;
var tp=s.total?(s.loaded/s.total)*100:100;
s.prog=s.loaded>=s.total?100:Math.round(damp(s.prog,tp,0.08));
if(s.loaded>=s.total){s.done=true;s.prog=100;return}
requestAnimationFrame(loop);
}
if(!s.total){s.done=true;s.prog=100;return}
for(var i=0;i<urls.length;i++){
var img=new Image();
img.onload=img.onerror=function(){s.loaded++};
img.src=urls[i];
}
requestAnimationFrame(loop);
})();`;
}
