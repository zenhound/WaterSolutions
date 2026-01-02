(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Strength can be tuned per device
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const strength = isMobile ? 0.06 : 0.16;

  let latestY = 0;
  let ticking = false;

  function update(){
    ticking = false;

    // Negative so the background drifts opposite scroll
    const offset = -(latestY * strength);

    // Optional clamp to prevent extreme values
    const clamped = Math.max(offset, -160);

    document.documentElement.style.setProperty('--parallaxY', clamped.toFixed(2) + 'px');
  }

  function onScroll(){
    latestY = window.scrollY || 0;
    if (!ticking){
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
