import React, { useEffect, useState } from "react";

interface ScrollInteractiveBackgroundProps {
  darkMode: boolean;
}

export const ScrollInteractiveBackground: React.FC<
  ScrollInteractiveBackgroundProps
> = ({ darkMode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate dynamic values based on scroll position
  const scrollProgress = Math.min(
    scrollY / (document.documentElement.scrollHeight - window.innerHeight),
    1,
  );
  const hueRotation = scrollProgress * 60; // Rotate hue by up to 60 degrees
  const saturation = 0.8 + scrollProgress * 0.4; // Increase saturation as we scroll
  const brightness = 1 - scrollProgress * 0.3; // Slightly dim as we scroll

  // Mouse-based gradient positioning
  const gradientX = 50 + (mouseX - 0.5) * 20; // Move gradient 20% based on mouse
  const gradientY = 50 + (mouseY - 0.5) * 20;

  // Dynamic gradient colors based on scroll and theme
  const getGradientColors = () => {
    if (darkMode) {
      return {
        primary: `hsl(${280 + hueRotation}, ${saturation * 70}%, ${brightness * 25}%)`,
        secondary: `hsl(${320 + hueRotation}, ${saturation * 80}%, ${brightness * 35}%)`,
        tertiary: `hsl(${240 + hueRotation}, ${saturation * 60}%, ${brightness * 20}%)`,
        accent: `hsl(${300 + hueRotation}, ${saturation * 90}%, ${brightness * 15}%)`,
      };
    } else {
      return {
        primary: `hsl(${320 + hueRotation}, ${saturation * 40}%, ${85 + brightness * 10}%)`,
        secondary: `hsl(${280 + hueRotation}, ${saturation * 50}%, ${90 + brightness * 5}%)`,
        tertiary: `hsl(${340 + hueRotation}, ${saturation * 30}%, ${95 + brightness * 3}%)`,
        accent: `hsl(${260 + hueRotation}, ${saturation * 60}%, ${80 + brightness * 15}%)`,
      };
    }
  };

  const colors = getGradientColors();

  // Animated blob shapes that respond to scroll
  const blob1Scale = 1 + Math.sin(scrollProgress * Math.PI) * 0.3;
  const blob2Scale = 1 + Math.cos(scrollProgress * Math.PI * 1.5) * 0.2;
  const blob3Scale = 1 + Math.sin(scrollProgress * Math.PI * 0.7) * 0.4;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(
              ellipse at ${gradientX}% ${gradientY}%, 
              ${colors.primary} 0%, 
              ${colors.secondary} 25%, 
              ${colors.tertiary} 50%, 
              ${colors.accent} 100%
            )
          `,
        }}
      />

      {/* Animated gradient blobs */}
      <div className="absolute inset-0">
        {/* Blob 1 */}
        <div
          className={`absolute rounded-full blur-3xl transition-all duration-2000 ease-out ${
            darkMode ? "opacity-30" : "opacity-60"
          }`}
          style={{
            width: "40vw",
            height: "40vw",
            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
            left: `${20 + mouseX * 10}%`,
            top: `${10 + scrollProgress * 20}%`,
            transform: `scale(${blob1Scale}) rotate(${scrollProgress * 360}deg)`,
          }}
        />

        {/* Blob 2 */}
        <div
          className={`absolute rounded-full blur-2xl transition-all duration-3000 ease-out ${
            darkMode ? "opacity-25" : "opacity-50"
          }`}
          style={{
            width: "45vw",
            height: "45vw",
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
            right: `${10 + mouseY * 15}%`,
            top: `${30 + scrollProgress * 40}%`,
            transform: `scale(${blob2Scale}) rotate(${-scrollProgress * 180}deg)`,
          }}
        />

        {/* Blob 3 */}
        <div
          className={`absolute rounded-full blur-xl transition-all duration-2500 ease-out ${
            darkMode ? "opacity-20" : "opacity-40"
          }`}
          style={{
            width: "35vw",
            height: "35vw",
            background: `radial-gradient(circle, ${colors.tertiary} 0%, transparent 70%)`,
            left: `${40 + mouseX * 20}%`,
            bottom: `${20 + scrollProgress * 30}%`,
            transform: `scale(${blob3Scale}) rotate(${scrollProgress * 90}deg)`,
          }}
        />
      </div>

      {/* Subtle overlay for texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 30px 30px",
          backgroundPosition: `${mouseX * 10}px ${mouseY * 10}px, ${mouseX * -5}px ${mouseY * -5}px`,
        }}
      />

      {/* Scroll-based vignette effect */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at center, transparent 40%, ${darkMode ? "rgba(0,0,0," : "rgba(255,255,255,"} ${scrollProgress * 0.1}) 100%)`,
          opacity: scrollProgress,
        }}
      />
    </div>
  );
};
