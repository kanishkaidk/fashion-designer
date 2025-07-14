import React from 'react';

interface WingLogoProps {
  darkMode: boolean;
  size?: number;
}

export const WingLogo: React.FC<WingLogoProps> = ({ darkMode, size = 80 }) => {
  return (
    <div className="relative animate-float">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Left Wing */}
        <path
          d="M50 50 Q30 30, 10 35 Q15 45, 25 50 Q15 55, 10 65 Q30 70, 50 50"
          fill="none"
          stroke="url(#wingGradient)"
          strokeWidth="2"
          filter="url(#neonGlow)"
          className="animate-pulse"
          style={{
            animationDuration: '2s',
            transformOrigin: '50px 50px'
          }}
        />
        
        {/* Right Wing */}
        <path
          d="M50 50 Q70 30, 90 35 Q85 45, 75 50 Q85 55, 90 65 Q70 70, 50 50"
          fill="none"
          stroke="url(#wingGradient)"
          strokeWidth="2"
          filter="url(#neonGlow)"
          className="animate-pulse"
          style={{
            animationDuration: '2s',
            animationDelay: '0.5s',
            transformOrigin: '50px 50px'
          }}
        />
        
        {/* Wing Details */}
        <path
          d="M50 50 Q35 40, 20 42 Q25 48, 35 50"
          fill="none"
          stroke="url(#wingGradient)"
          strokeWidth="1"
          opacity="0.7"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        
        <path
          d="M50 50 Q65 40, 80 42 Q75 48, 65 50"
          fill="none"
          stroke="url(#wingGradient)"
          strokeWidth="1"
          opacity="0.7"
          className="animate-pulse"
          style={{ animationDuration: '3s', animationDelay: '1s' }}
        />
        
        {/* Center sparkle */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="url(#wingGradient)"
          className="animate-sparkle"
        />
      </svg>
      
      {/* Additional glow effect */}
      <div 
        className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
          darkMode 
            ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400' 
            : 'bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300'
        }`}
        style={{
          animation: 'pulse 2s infinite, float 4s ease-in-out infinite'
        }}
      />
    </div>
  );
};