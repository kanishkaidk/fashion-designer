import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  darkMode: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 6 + 2;
      const startPosition = Math.random() * window.innerWidth;
      const animationDuration = Math.random() * 10 + 8;
      const opacity = Math.random() * 0.5 + 0.3;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${startPosition}px`;
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.opacity = `${opacity}`;
      
      if (darkMode) {
        particle.style.background = `radial-gradient(circle, rgba(236, 72, 153, ${opacity}) 0%, transparent 70%)`;
      } else {
        particle.style.background = `radial-gradient(circle, rgba(147, 51, 234, ${opacity}) 0%, transparent 70%)`;
      }
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, animationDuration * 1000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 500);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 800);

    return () => {
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [darkMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
};