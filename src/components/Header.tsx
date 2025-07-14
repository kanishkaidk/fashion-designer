import React from "react";
import { Moon, Sun, Wand2, GalleryVertical } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onShowGallery: () => void;
  hasDesigns: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  onShowGallery,
  hasDesigns,
}) => {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        darkMode ? "glassmorphism-dark" : "glassmorphism"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Wand2
              className={`w-6 h-6 ${
                darkMode ? "text-pink-400" : "text-pink-600"
              } animate-pulse`}
            />
            <span
              className={`font-title font-bold text-xl ${
                darkMode ? "text-white" : "text-gray-800"
              } tracking-wide`}
            >
              FashNova<span className="text-pink-500">AI</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 font-main font-medium">
            <a
              href="#home"
              className={`hover:text-pink-500 transition-colors ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Home
            </a>
            <a
              href="#create"
              className={`hover:text-pink-500 transition-colors ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Create
            </a>
            <button
              onClick={onShowGallery}
              disabled={!hasDesigns}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                hasDesigns
                  ? darkMode
                    ? "bg-purple-600/80 hover:bg-purple-600 text-white backdrop-blur-sm"
                    : "bg-pink-500/80 hover:bg-pink-500 text-white backdrop-blur-sm"
                  : "opacity-50 cursor-not-allowed text-gray-400"
              } hover-scale`}
              title={
                hasDesigns ? "Open Gallery" : "Create designs to view gallery"
              }
            >
              <GalleryVertical className="w-4 h-4" />
              Gallery
              {hasDesigns && (
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    darkMode
                      ? "bg-pink-400 text-purple-900"
                      : "bg-purple-200 text-pink-700"
                  }`}
                >
                  New
                </span>
              )}
            </button>
            <a
              href="#about"
              className={`hover:text-pink-500 transition-colors ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              About
            </a>
          </nav>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
