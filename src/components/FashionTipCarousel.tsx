import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

interface FashionTipCarouselProps {
  darkMode: boolean;
}

export const FashionTipCarousel: React.FC<FashionTipCarouselProps> = ({ darkMode }) => {
  const [currentTip, setCurrentTip] = useState(0);

  const fashionTips = [
    {
      title: "Color Magic ✨",
      tip: "Monochromatic outfits create an instantly elevated and sophisticated look. Try different shades of the same color family!",
      emoji: "🎨"
    },
    {
      title: "Accessory Power 💫",
      tip: "One statement accessory can transform any basic outfit into a fashion moment. Less is often more!",
      emoji: "💎"
    },
    {
      title: "Fit is Everything 👑",
      tip: "Well-fitted basics will always look more expensive than ill-fitting designer pieces. Invest in tailoring!",
      emoji: "✂️"
    },
    {
      title: "Texture Play 🌟",
      tip: "Mix different textures within the same color palette to add visual interest without overwhelming your look.",
      emoji: "🧵"
    },
    {
      title: "Confidence Factor 💅",
      tip: "The best accessory you can wear is confidence. Own your style choices and wear them with pride!",
      emoji: "✨"
    },
    {
      title: "Seasonal Harmony 🌸",
      tip: "Choose colors that complement the season - earth tones for fall, pastels for spring, and jewel tones for winter.",
      emoji: "🍂"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % fashionTips.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [fashionTips.length]);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % fashionTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + fashionTips.length) % fashionTips.length);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lightbulb className={`w-8 h-8 ${darkMode ? 'text-pink-400' : 'text-pink-600'} animate-pulse`} />
          </div>
          <h2 className={`font-space-grotesk font-bold text-3xl md:text-4xl mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Fashion Tips & Tricks
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Styling secrets from your AI fashion guru
          </p>
        </div>

        <div className="relative">
          <div className={`${
            darkMode ? 'glassmorphism-dark' : 'glassmorphism'
          } rounded-3xl p-8 text-center min-h-[200px] flex flex-col justify-center`}>
            <div className="text-6xl mb-4 animate-float">
              {fashionTips[currentTip].emoji}
            </div>
            <h3 className={`font-bold text-2xl mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {fashionTips[currentTip].title}
            </h3>
            <p className={`text-lg leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {fashionTips[currentTip].tip}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTip}
            className="carousel-arrow absolute left-4 top-1/2 transform -translate-y-1/2"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextTip}
            className="carousel-arrow absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {fashionTips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTip(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTip
                    ? 'bg-pink-500 scale-125'
                    : darkMode
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};