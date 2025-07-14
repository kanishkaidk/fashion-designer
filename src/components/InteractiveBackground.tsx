import React, { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  darkMode: boolean;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating fashion icons
    const createFashionIcon = () => {
      const icons = ['👗', '👠', '💄', '👜', '💍', '🕶️', '👒', '🧥', '👖', '✨'];
      const icon = document.createElement('div');
      icon.textContent = icons[Math.floor(Math.random() * icons.length)];
      icon.className = 'fashion-icon';
      
      const size = Math.random() * 20 + 15;
      const startPosition = Math.random() * window.innerWidth;
      const animationDuration = Math.random() * 15 + 10;
      const opacity = Math.random() * 0.3 + 0.1;
      
      icon.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${startPosition}px;
        bottom: -50px;
        opacity: ${opacity};
        pointer-events: none;
        z-index: 1;
        animation: fashionFloat ${animationDuration}s linear infinite;
      `;
      
      container.appendChild(icon);
      
      setTimeout(() => {
        if (container.contains(icon)) {
          container.removeChild(icon);
        }
      }, animationDuration * 1000);
    };

    // Create sparkle effects
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-effect';
      
      const size = Math.random() * 4 + 2;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      sparkle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${darkMode ? '#ec4899' : '#a855f7'};
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1;
        animation: sparkleAnimation 2s ease-out forwards;
      `;
      
      container.appendChild(sparkle);
      
      setTimeout(() => {
        if (container.contains(sparkle)) {
          container.removeChild(sparkle);
        }
      }, 2000);
    };

    // Create gradient orbs
    const createGradientOrb = () => {
      const orb = document.createElement('div');
      orb.className = 'gradient-orb';
      
      const size = Math.random() * 100 + 50;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const duration = Math.random() * 20 + 15;
      
      orb.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${darkMode 
          ? 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)'
          : 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(236, 72, 153, 0.04) 50%, transparent 100%)'
        };
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1;
        animation: orbFloat ${duration}s ease-in-out infinite;
        filter: blur(1px);
      `;
      
      container.appendChild(orb);
      
      setTimeout(() => {
        if (container.contains(orb)) {
          container.removeChild(orb);
        }
      }, duration * 1000);
    };

    // Initial creation
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createFashionIcon(), i * 2000);
      setTimeout(() => createGradientOrb(), i * 3000);
    }

    // Continuous creation
    const fashionInterval = setInterval(createFashionIcon, 3000);
    const sparkleInterval = setInterval(createSparkle, 1500);
    const orbInterval = setInterval(createGradientOrb, 8000);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.1) { // 10% chance on mouse move
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
          position: absolute;
          width: 3px;
          height: 3px;
          background: ${darkMode ? '#ec4899' : '#a855f7'};
          border-radius: 50%;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          pointer-events: none;
          z-index: 1;
          animation: mouseSparkle 1s ease-out forwards;
        `;
        container.appendChild(sparkle);
        
        setTimeout(() => {
          if (container.contains(sparkle)) {
            container.removeChild(sparkle);
          }
        }, 1000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(fashionInterval);
      clearInterval(sparkleInterval);
      clearInterval(orbInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
};