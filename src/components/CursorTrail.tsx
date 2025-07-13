import React, { useEffect, useRef } from 'react';

interface CursorTrailProps {
  darkMode: boolean;
}

export const CursorTrail: React.FC<CursorTrailProps> = ({ darkMode }) => {
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create trail element
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${e.clientX - 10}px`;
      trail.style.top = `${e.clientY - 10}px`;
      
      if (darkMode) {
        trail.style.background = 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)';
      } else {
        trail.style.background = 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)';
      }
      
      document.body.appendChild(trail);
      
      // Remove after animation
      setTimeout(() => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      }, 1000);
    };

    // Throttle mouse move events
    let lastCall = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall >= 50) {
        lastCall = now;
        handleMouseMove(e);
      }
    };

    document.addEventListener('mousemove', throttledMouseMove);

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
      // Clean up any remaining trails
      document.querySelectorAll('.cursor-trail').forEach(trail => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      });
    };
  }, [darkMode]);

  return null;
};