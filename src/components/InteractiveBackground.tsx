import React, { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  darkMode: boolean;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create minimal gradient bubbles
    const createGradientBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'gradient-bubble';
      
      const size = Math.random() * 80 + 40;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const duration = Math.random() * 20 + 15;
      const opacity = Math.random() * 0.1 + 0.05;
      
      bubble.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${darkMode 
          ? `radial-gradient(circle, rgba(236, 72, 153, ${opacity}) 0%, rgba(147, 51, 234, ${opacity * 0.5}) 50%, transparent 100%)`
          : `radial-gradient(circle, rgba(147, 51, 234, ${opacity}) 0%, rgba(236, 72, 153, ${opacity * 0.5}) 50%, transparent 100%)`
        };
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 1;
        animation: bubbleFloat ${duration}s ease-in-out infinite;
        filter: blur(1px);
      `;
      
      container.appendChild(bubble);
      
      setTimeout(() => {
        if (container.contains(bubble)) {
          container.removeChild(bubble);
        }
      }, duration * 1000);
    };

    // Create scroll-responsive gradient waves
    const createScrollWave = () => {
      const wave = document.createElement('div');
      wave.className = 'scroll-wave';
      
      const width = Math.random() * 200 + 100;
      const height = Math.random() * 50 + 20;
      const x = Math.random() * window.innerWidth;
      const scrollY = window.scrollY;
      
      wave.style.cssText = `
        position: absolute;
        width: ${width}px;
        height: ${height}px;
        background: ${darkMode 
          ? 'linear-gradient(45deg, rgba(236, 72, 153, 0.08) 0%, rgba(147, 51, 234, 0.04) 100%)'
          : 'linear-gradient(45deg, rgba(147, 51, 234, 0.06) 0%, rgba(236, 72, 153, 0.03) 100%)'
        };
        border-radius: 50px;
        left: ${x}px;
        top: ${scrollY + Math.random() * window.innerHeight}px;
        pointer-events: none;
        z-index: 1;
        animation: waveFloat 8s ease-out forwards;
        filter: blur(0.5px);
      `;
      
      container.appendChild(wave);
      
      setTimeout(() => {
        if (container.contains(wave)) {
          container.removeChild(wave);
        }
      }, 8000);
    };

    // Initial bubbles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createGradientBubble(), i * 2000);
    }

    // Continuous bubble creation
    const bubbleInterval = setInterval(createGradientBubble, 6000);

    // Scroll-responsive waves
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (Math.random() < 0.3) { // 30% chance on scroll
          createScrollWave();
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(bubbleInterval);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
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