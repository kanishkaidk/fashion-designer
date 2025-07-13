import React, { useEffect, useState } from 'react';
import { Wand2 } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ darkMode }) => {
  const [typedText, setTypedText] = useState('');
  const [showWithAI, setShowWithAI] = useState(false);
  const fullText = 'Reimagining Fashion';


  useEffect(() => {
    let index = 0;
    const typingSpeed = 50; // faster typing
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowWithAI(true), 300); // delay before fade-in
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

  const scrollToPrompt = () => {
    document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
  id="home"
  className="h-screen w-full flex items-center justify-center text-center px-4"
>

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <div className="animate-float mb-8">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${
              darkMode 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                : 'bg-gradient-to-r from-pink-400 to-purple-400'
            } animate-pulse-slow`}>
              <Wand2 className="w-12 h-12 text-white" />
            </div>
          </div>
          
           {/* Typing + Fade-in Title */}
          <h1 className={`font-title font-bold text-4xl md:text-6xl lg:text-7xl mb-6 ${
            darkMode ? 'text-white' : 'text-gray-800'
          } tracking-wide text-center leading-tight`}>
            <span
              className="inline-block whitespace-nowrap overflow-hidden border-r-2 border-pink-500 animate-typing"
              style={{ animation: 'typing 2s steps(30, end), blink-caret 0.75s step-end infinite' }}
            >
              {typedText}
            </span>
            <br />
            {showWithAI && (
              <span className={`block mt-2 animate-blur-clear ${
                darkMode ? 'text-pink-400' : 'text-purple-600'
              }`}>
                with AI
              </span>
            )}
          </h1>





        </div>
        
        <p className={`font-main text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-medium ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Describe your <span className="text-pink-500 font-semibold">dream design</span>. 
          We'll bring it to life with the magic of AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={scrollToPrompt}
            className="neon-button px-8 py-4 rounded-full text-lg font-semibold ripple hover-scale group"
          >
            <span className="flex items-center gap-2 font-main">
              <Wand2 className="w-5 h-5 group-hover:animate-spin" />
              Start Creating
            </span>
          </button>
          
          <button className={`font-main px-6 py-3 rounded-full border-2 transition-all duration-300 hover-scale font-medium ${
            darkMode 
              ? 'border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-gray-900' 
              : 'border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
          }`}>
            View Gallery
          </button>
        </div>
        
        <div className={`font-main text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="mb-2">Powered by Advanced AI • Created by <span className="font-semibold text-pink-500">Group-101</span></p>
          <p>IGDTUW Internship • Domain: Generative AI</p>
        </div>
      </div>
      
      {/* Floating decoration elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className={`w-16 h-16 rounded-full ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
            : 'bg-gradient-to-r from-purple-300 to-pink-300'
        } opacity-20 animate-pulse-slow`}></div>
      </div>
      
      <div className="absolute top-40 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <div className={`w-12 h-12 rounded-full ${
          darkMode 
            ? 'bg-gradient-to-r from-pink-400 to-purple-400' 
            : 'bg-gradient-to-r from-pink-300 to-purple-300'
        } opacity-30 animate-pulse-slow`}></div>
      </div>
      
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className={`w-8 h-8 rounded-full ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
            : 'bg-gradient-to-r from-purple-300 to-pink-300'
        } opacity-25 animate-pulse-slow`}></div>
      </div>
    </section>
  );
};