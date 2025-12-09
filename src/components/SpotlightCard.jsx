import { useRef, useCallback } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef(null);
  const rafId = useRef(null);
  const rectRef = useRef(null);

  const updateSpotlight = useCallback((e) => {
    if (!divRef.current) return;

    // Cache rect to avoid repeated getBoundingClientRect calls
    if (!rectRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }

    const x = e.clientX - rectRef.current.left;
    const y = e.clientY - rectRef.current.top;

    // Cancel previous animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Use requestAnimationFrame to batch DOM updates
    rafId.current = requestAnimationFrame(() => {
      if (divRef.current) {
        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
        divRef.current.style.setProperty('--spotlight-color', spotlightColor);
      }
    });
  }, [spotlightColor]);

  const handleMouseMove = useCallback((e) => {
    updateSpotlight(e);
  }, [updateSpotlight]);

  const handleMouseEnter = useCallback(() => {
    // Recalculate rect when mouse enters
    if (divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Cancel any pending updates
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    // Reset rect cache
    rectRef.current = null;
  }, []);

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
