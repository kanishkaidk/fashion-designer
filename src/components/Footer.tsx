import React from 'react';
import { Instagram, Github, Mail, Heart } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-12 px-4 ${
      darkMode 
        ? 'bg-gradient-to-r from-gray-900 to-black' 
        : 'bg-gradient-to-r from-gray-800 to-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-space-grotesk font-bold text-2xl text-white mb-4">
              FashNova<span className="text-pink-400">AI</span>
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Reimagining fashion through artificial intelligence. Create stunning designs 
              with the power of AI and bring your fashion dreams to life.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors hover:scale-110 transform"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors hover:scale-110 transform"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors hover:scale-110 transform"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#create" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Create Design
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-pink-400" />
                <span className="text-gray-300 text-sm">hello@fashnova.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="text-gray-300 text-sm">@fashnovaai</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl">
              <p className="text-white text-sm font-medium mb-1">IGDTUW Project</p>
              <p className="text-gray-300 text-xs">Generative AI Internship Program</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 FashNova AI. Built with{' '}
              <Heart className="inline w-4 h-4 text-pink-400" />{' '}
              by Group-101
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};