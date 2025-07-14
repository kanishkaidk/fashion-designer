import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Sparkles } from 'lucide-react';

interface ChatbotIntroProps {
  darkMode: boolean;
}

export const ChatbotIntro: React.FC<ChatbotIntroProps> = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Show intro after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-24 right-6 z-40 transition-all duration-300 ${
      isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {/* Animated Arrow */}
      <div className="relative">
        <svg
          className="absolute -bottom-2 right-8 w-8 h-8 animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 13l3 3 7-7"
            stroke={darkMode ? '#ec4899' : '#a855f7'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 19V5"
            stroke={darkMode ? '#ec4899' : '#a855f7'}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Intro Box */}
        <div className={`${
          darkMode ? 'glassmorphism-dark' : 'glassmorphism'
        } rounded-2xl p-4 max-w-xs shadow-2xl border-2 ${
          darkMode ? 'border-pink-500/30' : 'border-purple-300/50'
        } relative`}>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className={`font-bold text-sm ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Chat with FashBot! ✨
              </h3>
            </div>
            
            <p className={`text-xs mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get personalized recommendations and have fun fashion conversations!
            </p>
            
            <div className="flex items-center gap-1 text-xs">
              <Sparkles className={`w-3 h-3 ${
                darkMode ? 'text-pink-400' : 'text-purple-500'
              }`} />
              <span className={`${
                darkMode ? 'text-pink-400' : 'text-purple-500'
              } font-medium`}>
                Try: "Create a cozy fall outfit"
              </span>
            </div>
          </div>

          {/* Animated Sparkles */}
          <div className="absolute -top-1 -left-1">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute -bottom-1 -right-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};