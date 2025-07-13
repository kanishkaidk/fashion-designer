import React from 'react';
import { Moon, Sun, Wand2 } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      darkMode 
        ? 'glassmorphism-dark' 
        : 'glassmorphism'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Wand2 className={`w-6 h-6 ${
              darkMode ? 'text-pink-400' : 'text-pink-600'
            } animate-pulse`} />
            <span className={`font-title font-bold text-xl ${
              darkMode ? 'text-white' : 'text-gray-800'
            } tracking-wide`}>
              FashNova<span className="text-pink-500">AI</span>
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8 font-main font-medium">
            <a href="#home" className={`hover:text-pink-500 transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Home
            </a>
            <a href="#create" className={`hover:text-pink-500 transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Create
            </a>
            <a href="#gallery" className={`hover:text-pink-500 transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Gallery
            </a>
            <a href="#about" className={`hover:text-pink-500 transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              About
            </a>
          </nav>
          
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};